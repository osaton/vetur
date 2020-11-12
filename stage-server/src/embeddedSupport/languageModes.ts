import {
  CompletionItem,
  Location,
  SignatureHelp,
  Definition,
  TextEdit,
  TextDocument,
  Diagnostic,
  DocumentLink,
  Range,
  Hover,
  DocumentHighlight,
  CompletionList,
  Position,
  FormattingOptions,
  SymbolInformation,
  CodeActionContext,
  ColorInformation,
  Color,
  ColorPresentation,
  CodeAction,
  WorkspaceEdit,
  FoldingRange
} from 'vscode-languageserver-types';

import { getLanguageModelCache, LanguageModelCache } from './languageModelCache';
import {
  getStageDocumentRegions,
  VueDocumentRegions,
  LanguageId,
  LanguageRange,
  DocumentRegions
} from './embeddedSupport';
import { getVueMode } from '../modes/vue';
import { getStageMode } from '../modes/stage';
import { getCSSMode, getSCSSMode, getLESSMode, getPostCSSMode } from '../modes/style';
import { getJavascriptMode } from '../modes/script/javascript';
import { VueHTMLMode, StageHTMLMode } from '../modes/template';
import { getStylusMode } from '../modes/style/stylus';
import { DocumentContext, RefactorAction } from '../types';
import { VueInfoService } from '../services/vueInfoService';
import { DependencyService, State } from '../services/dependencyService';
import { nullMode } from '../modes/nullMode';
import { getServiceHost, IServiceHost } from '../services/typescriptService/serviceHost';
import { VLSFullConfig } from '../config';
import { SassLanguageMode } from '../modes/style/sass/sassLanguageMode';
import { getPugMode } from '../modes/pug';
import { VCancellationToken } from '../utils/cancellationToken';

export interface VLSServices {
  infoService?: VueInfoService;
  dependencyService?: DependencyService;
}

export interface LanguageMode {
  getId(): string;
  configure?(options: VLSFullConfig): void;
  updateFileInfo?(doc: TextDocument): void;

  doValidation?(document: TextDocument, cancellationToken?: VCancellationToken): Promise<Diagnostic[]>;
  getCodeActions?(
    document: TextDocument,
    range: Range,
    formatParams: FormattingOptions,
    context: CodeActionContext
  ): CodeAction[];
  getRefactorEdits?(doc: TextDocument, args: RefactorAction): WorkspaceEdit;
  doComplete?(document: TextDocument, position: Position): CompletionList;
  doResolve?(document: TextDocument, item: CompletionItem): CompletionItem;
  doHover?(document: TextDocument, position: Position): Hover;
  doSignatureHelp?(document: TextDocument, position: Position): SignatureHelp | null;
  findDocumentHighlight?(document: TextDocument, position: Position): DocumentHighlight[];
  findDocumentSymbols?(document: TextDocument): SymbolInformation[];
  findDocumentLinks?(document: TextDocument, documentContext: DocumentContext): DocumentLink[];
  findDefinition?(document: TextDocument, position: Position): Definition;
  findReferences?(document: TextDocument, position: Position): Location[];
  format?(document: TextDocument, range: Range, options: FormattingOptions): TextEdit[];
  findDocumentColors?(document: TextDocument): ColorInformation[];
  getColorPresentations?(document: TextDocument, color: Color, range: Range): ColorPresentation[];
  getFoldingRanges?(document: TextDocument): FoldingRange[];

  onDocumentChanged?(filePath: string): void;
  onDocumentRemoved(document: TextDocument): void;
  dispose(): void;
}

export interface LanguageModeRange extends LanguageRange {
  mode: LanguageMode;
}

export class LanguageModes {
  private modes: { [k in LanguageId]: LanguageMode } = {
    stage: nullMode,
    // We use vanilla html but need to use custom language, so we can register custom onEnterRules for indentation
    'stage-html': nullMode,
    'stage-javascript': nullMode,
    html: nullMode,
    vue: nullMode,
    pug: nullMode,
    css: nullMode,
    postcss: nullMode,
    scss: nullMode,
    less: nullMode,
    sass: nullMode,
    stylus: nullMode,
    javascript: nullMode,
    typescript: nullMode,
    tsx: nullMode
  };

  private documentRegions: LanguageModelCache<DocumentRegions>;
  private modelCaches: LanguageModelCache<any>[];
  private serviceHost: IServiceHost;

  constructor() {
    this.documentRegions = getLanguageModelCache<DocumentRegions>(10, 60, document =>
      getStageDocumentRegions(document)
    );

    this.modelCaches = [];
    this.modelCaches.push(this.documentRegions);
  }

  getRegionsAtPosition(document: TextDocument, position: Position) {
    return getLanguageModelCache(10, 60, document => {
      return this.documentRegions.refreshAndGet(document).getPartAtPosition(position)!.regions;
    });
  }

  async init(workspacePath: string, services: VLSServices, globalSnippetDir?: string) {
    let tsModule = await import('typescript');
    if (services.dependencyService) {
      const ts = services.dependencyService.getDependency('typescript');
      if (ts && ts.state === State.Loaded) {
        tsModule = ts.module;
      }
    }

    /**
     * Documents where everything outside `<script>` is replaced with whitespace
     */
    const scriptRegionDocuments = getLanguageModelCache(10, 60, document => {
      const doc = this.documentRegions.refreshAndGet(document);
      const typeDoc = doc.getSingleTypeDocument('script');
      return typeDoc;
    });

    /**
     * Documents where everything outside `<% %>` is replaced with whitespace
     */
    const stageBlockDocuments = getLanguageModelCache(10, 60, document => {
      const doc = this.documentRegions.refreshAndGet(document);
      const typeDoc = doc.getSingleTypeDocument('stage-block');
      return typeDoc;
    });

    this.serviceHost = getServiceHost(tsModule, workspacePath, scriptRegionDocuments, stageBlockDocuments);

    const vueHtmlMode = new StageHTMLMode(
      tsModule,
      this.serviceHost,
      this.documentRegions,
      workspacePath,
      services.infoService
    );

    const stageHtmlMode = new StageHTMLMode(
      tsModule,
      this.serviceHost,
      this.documentRegions,
      workspacePath,
      services.infoService
    );

    const jsMode = await getJavascriptMode(
      this.serviceHost,
      this.documentRegions,
      workspacePath,
      false,
      services.infoService,
      services.dependencyService
    );

    const stageJsMode = await getJavascriptMode(
      this.serviceHost,
      this.documentRegions,
      workspacePath,
      true,
      services.infoService,
      services.dependencyService
    );

    this.modes['vue'] = getVueMode(workspacePath, globalSnippetDir);
    this.modes['stage'] = getStageMode(workspacePath, globalSnippetDir);
    this.modes['stage-html'] = stageHtmlMode;
    this.modes['pug'] = getPugMode(workspacePath);
    this.modes['css'] = getCSSMode(workspacePath, this.documentRegions);
    this.modes['postcss'] = getPostCSSMode(workspacePath, this.documentRegions);
    this.modes['scss'] = getSCSSMode(workspacePath, this.documentRegions);
    this.modes['sass'] = new SassLanguageMode();
    this.modes['less'] = getLESSMode(workspacePath, this.documentRegions);
    this.modes['stylus'] = getStylusMode(this.documentRegions);
    this.modes['javascript'] = jsMode;
    this.modes['stage-javascript'] = stageJsMode;
    this.modes['typescript'] = jsMode;
    this.modes['tsx'] = jsMode;
  }

  getModeAtPosition(document: TextDocument, position: Position): LanguageMode | undefined {
    const languageId = this.documentRegions.refreshAndGet(document).getLanguageAtPosition(position);
    return this.modes[languageId];
  }

  getAllLanguageModeRangesInDocument(document: TextDocument): LanguageModeRange[] {
    const result: LanguageModeRange[] = [];

    const documentRegions = this.documentRegions.refreshAndGet(document);

    documentRegions.getAllLanguageRanges().forEach(lr => {
      const mode = this.modes[lr.languageId];
      if (mode) {
        result.push({
          mode,
          ...lr
        });
      }
    });

    return result;
  }

  getAllModes(): LanguageMode[] {
    const result = [];
    for (const languageId in this.modes) {
      const mode = this.modes[<LanguageId>languageId];
      if (mode) {
        result.push(mode);
      }
    }
    return result;
  }

  getMode(languageId: LanguageId): LanguageMode | undefined {
    return this.modes[languageId];
  }

  onDocumentRemoved(document: TextDocument) {
    this.modelCaches.forEach(mc => mc.onDocumentRemoved(document));
    for (const mode in this.modes) {
      this.modes[<LanguageId>mode].onDocumentRemoved(document);
    }
  }

  dispose(): void {
    this.modelCaches.forEach(mc => mc.dispose());
    this.modelCaches = [];
    for (const mode in this.modes) {
      this.modes[<LanguageId>mode].dispose();
    }
    this.serviceHost.dispose();
  }
}
