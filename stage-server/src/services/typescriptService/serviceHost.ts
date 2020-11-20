import * as path from 'path';
import * as ts from 'typescript';
import { URI } from 'vscode-uri';
import { TextDocument } from 'vscode-languageserver-types';
import * as parseGitIgnore from 'parse-gitignore';

import { LanguageModelCache } from '../../embeddedSupport/languageModelCache';
import { createUpdater, parseStageModule, parseStageScript } from './preprocess';
import { getFileFsPath, getFilePath, normalizeFileNameToFsPath } from '../../utils/paths';
import * as bridge from './bridge';
import { T_TypeScript } from '../../services/dependencyService';
import { getVueSys } from './vueSys';
import { TemplateSourceMap, stringifySourceMapNodes } from './sourceMap';
import { isStageFile, isStageModule, isVirtualVueTemplateFile, isVueFile } from './util';
import { logger } from '../../log';
import { ModuleResolutionCache } from './moduleResolutionCache';
import { globalScope } from './transformTemplate';
import { inferVueVersion, VueVersion } from './vueVersion';
import { ChildComponent } from '../vueInfoService';

const NEWLINE = process.platform === 'win32' ? '\r\n' : '\n';

/**
 * For prop validation
 */
const allChildComponentsInfo = new Map<string, ChildComponent[]>();

function patchTS(tsModule: T_TypeScript) {
  // Patch typescript functions to insert `import Vue from 'vue'` and `new Vue` around export default.
  // NOTE: this is a global hack that all ts instances after is changed
  const { createLanguageServiceSourceFile, updateLanguageServiceSourceFile } = createUpdater(
    tsModule,
    allChildComponentsInfo
  );
  (tsModule as any).createLanguageServiceSourceFile = createLanguageServiceSourceFile;
  (tsModule as any).updateLanguageServiceSourceFile = updateLanguageServiceSourceFile;
}

function getDefaultCompilerOptions(tsModule: T_TypeScript) {
  const defaultCompilerOptions: ts.CompilerOptions = {
    allowNonTsExtensions: true,
    allowJs: true,
    lib: ['lib.es2017.d.ts'],
    target: tsModule.ScriptTarget.Latest,
    moduleResolution: tsModule.ModuleResolutionKind.NodeJs,
    module: tsModule.ModuleKind.CommonJS,
    jsx: tsModule.JsxEmit.Preserve,
    allowSyntheticDefaultImports: true,
    experimentalDecorators: true
  };

  return defaultCompilerOptions;
}

export const templateSourceMap: TemplateSourceMap = {};

export interface IServiceHost {
  queryVirtualFileInfo(fileName: string, currFileText: string): { source: string; sourceMapNodesString: string };
  updateCurrentVirtualVueTextDocument(
    doc: TextDocument,
    childComponents?: ChildComponent[]
  ): {
    templateService: ts.LanguageService;
    templateSourceMap: TemplateSourceMap;
  };
  updateCurrentStageTextDocument(
    doc: TextDocument,
    stageMode: Boolean
  ): {
    service: ts.LanguageService;
    scriptDoc: TextDocument;
  };
  updateExternalDocument(filePath: string): void;
  dispose(): void;
}

/**
 * Manges 4 set of files
 *
 * - `vue` files in workspace
 * - `js/ts` files in workspace
 * - `vue` files in `node_modules`
 * - `js/ts` files in `node_modules`
 */
export function getServiceHost(
  tsModule: T_TypeScript,
  workspacePath: string,
  updatedScriptRegionDocuments: LanguageModelCache<TextDocument>,
  updatedStageBlockDocuments: LanguageModelCache<TextDocument>
): IServiceHost {
  patchTS(tsModule);

  let currentScriptDoc: TextDocument;
  let currentStageDoc: TextDocument;

  let projectVersion = 1;
  const versions = new Map<string, number>();
  const localScriptRegionDocuments = new Map<string, TextDocument>();
  const localStageBlockDocuments = new Map<string, TextDocument>();
  const nodeModuleSnapshots = new Map<string, ts.IScriptSnapshot>();
  const projectFileSnapshots = new Map<string, ts.IScriptSnapshot>();
  const moduleResolutionCache = new ModuleResolutionCache();

  const parsedConfig = getParsedConfig(tsModule, workspacePath);
  /**
   * Only js/ts files in local project
   */
  const initialProjectFiles = parsedConfig.fileNames;
  logger.logDebug(
    `Initializing ServiceHost with ${initialProjectFiles.length} files: ${JSON.stringify(initialProjectFiles)}`
  );
  const scriptFileNameSet = new Set(initialProjectFiles);

  const vueSys = getVueSys(tsModule, scriptFileNameSet);

  const vueVersion = inferVueVersion(tsModule, workspacePath);
  const compilerOptions = {
    ...getDefaultCompilerOptions(tsModule),
    ...parsedConfig.options
  };
  compilerOptions.allowNonTsExtensions = true;

  function queryVirtualFileInfo(
    fileName: string,
    currFileText: string
  ): { source: string; sourceMapNodesString: string } {
    const program = templateLanguageService.getProgram();
    if (program) {
      const tsVirtualFile = program.getSourceFile(fileName + '.template');
      if (tsVirtualFile) {
        return {
          source: tsVirtualFile.getText(),
          sourceMapNodesString: stringifySourceMapNodes(
            templateSourceMap[fileName],
            currFileText,
            tsVirtualFile.getText()
          )
        };
      }
    }

    return {
      source: '',
      sourceMapNodesString: ''
    };
  }

  function updateCurrentVirtualVueTextDocument(doc: TextDocument, childComponents?: ChildComponent[]) {
    const fileFsPath = getFileFsPath(doc.uri);
    const filePath = getFilePath(doc.uri);
    // When file is not in language service, add it
    if (!localStageBlockDocuments.has(fileFsPath)) {
      if (fileFsPath.endsWith('.vue') || fileFsPath.endsWith('.vue.template')) {
        scriptFileNameSet.add(filePath);
      }
    }

    if (isVirtualVueTemplateFile(fileFsPath)) {
      localStageBlockDocuments.set(fileFsPath, doc);
      scriptFileNameSet.add(filePath);
      if (childComponents) {
        allChildComponentsInfo.set(filePath, childComponents);
      }
      versions.set(fileFsPath, (versions.get(fileFsPath) || 0) + 1);
      projectVersion++;
    }

    return {
      templateService: templateLanguageService,
      templateSourceMap
    };
  }

  function updateScriptDoc(doc: TextDocument, fileFsPath: string, filePath: string) {
    if (
      //stageMode &&
      !currentScriptDoc ||
      doc.uri !== currentScriptDoc.uri ||
      doc.version !== currentScriptDoc.version
    ) {
      //currentScriptDoc = updatedScriptRegionDocuments.refreshAndGet(doc)!;
      currentScriptDoc = updatedScriptRegionDocuments.refreshAndGet(doc)!;
      const localLastDoc = localScriptRegionDocuments.get(fileFsPath);
      if (localLastDoc && currentScriptDoc.languageId !== currentScriptDoc.languageId) {
        // if languageId changed, restart the language service; it can't handle file type changes
        jsDomLanguageService.dispose();
        jsDomLanguageService = tsModule.createLanguageService(jsHost);
      }
      localScriptRegionDocuments.set(fileFsPath, currentScriptDoc);
      scriptFileNameSet.add(filePath);
      versions.set(fileFsPath, (versions.get(fileFsPath) || 0) + 1);
      projectVersion++;
    }
  }

  function updateStageDoc(doc: TextDocument, fileFsPath: string, filePath: string) {
    if (
      //stageMode &&
      !currentStageDoc ||
      doc.uri !== currentStageDoc.uri ||
      doc.version !== currentStageDoc.version
    ) {
      //currentScriptDoc = updatedScriptRegionDocuments.refreshAndGet(doc)!;
      currentStageDoc = updatedStageBlockDocuments.refreshAndGet(doc)!;
      const localLastDoc = localStageBlockDocuments.get(fileFsPath);
      if (localLastDoc && currentStageDoc.languageId !== localLastDoc.languageId) {
        // if languageId changed, restart the language service; it can't handle file type changes
        jsLanguageService.dispose();
        jsLanguageService = tsModule.createLanguageService(jsHost);
      }
      localStageBlockDocuments.set(fileFsPath, currentStageDoc);
      scriptFileNameSet.add(filePath);
      versions.set(fileFsPath, (versions.get(fileFsPath) || 0) + 1);
      projectVersion++;
    }
  }

  function updateCurrentStageTextDocument(doc: TextDocument, stageMode: Boolean) {
    const fileFsPath = getFileFsPath(doc.uri);
    const filePath = getFilePath(doc.uri);

    // When file is not in language service, add it
    if (!scriptFileNameSet.has(filePath)) {
      if (isStageFile(filePath) || isStageModule(filePath)) {
        scriptFileNameSet.add(filePath);
      }
    }

    if (stageMode) {
      updateStageDoc(doc, fileFsPath, filePath);
    } else {
      updateScriptDoc(doc, fileFsPath, filePath);
    }

    return {
      service: stageMode ? jsLanguageService : jsDomLanguageService,
      scriptDoc: stageMode ? currentStageDoc : currentScriptDoc
    };
  }

  // External Documents: JS/TS, non Vue documents
  function updateExternalDocument(fileFsPath: string) {
    // respect tsconfig
    // use *internal* function
    const configFileSpecs = (parsedConfig as any).configFileSpecs;
    const isExcludedFile = (tsModule as any).isExcludedFile;
    if (
      isExcludedFile &&
      configFileSpecs &&
      isExcludedFile(fileFsPath, configFileSpecs, workspacePath, true, workspacePath)
    ) {
      return;
    }
    logger.logInfo(`update ${fileFsPath} in ts language service.`);

    const ver = versions.get(fileFsPath) || 0;
    versions.set(fileFsPath, ver + 1);
    projectVersion++;

    // Clear cache so we read the js/ts file from file system again
    if (projectFileSnapshots.has(fileFsPath)) {
      projectFileSnapshots.delete(fileFsPath);
    }
  }

  function createLanguageServiceHost(options: ts.CompilerOptions): ts.LanguageServiceHost {
    return {
      getProjectVersion: () => projectVersion.toString(),
      getCompilationSettings: () => options,
      getScriptFileNames: () => {
        const fileNames = Array.from(scriptFileNameSet);
        return fileNames;
      },
      getScriptVersion(fileName) {
        if (fileName.includes('node_modules')) {
          return '0';
        }

        if (fileName === bridge.fileName) {
          return '0';
        }

        const normalizedFileFsPath = normalizeFileNameToFsPath(fileName);
        const version = versions.get(normalizedFileFsPath);
        return version ? version.toString() : '0';
      },
      getScriptKind(fileName) {
        if (fileName.includes('node_modules')) {
          return (tsModule as any).getScriptKindFromFileName(fileName);
        }

        if (isStageFile(fileName)) {
          const uri = URI.file(fileName);
          const fileFsPath = normalizeFileNameToFsPath(fileName);
          let doc = localStageBlockDocuments.get(fileFsPath);
          if (!doc) {
            doc = updatedScriptRegionDocuments.refreshAndGet(
              TextDocument.create(uri.toString(), 'stage', 0, tsModule.sys.readFile(fileName) || '')
            );
            localStageBlockDocuments.set(fileFsPath, doc);
            scriptFileNameSet.add(fileName);
          }
          const kind = getScriptKind(tsModule, doc.languageId);
          return kind;
        } else if (isStageModule(fileName)) {
          const uri = URI.file(fileName);
          const fileFsPath = normalizeFileNameToFsPath(fileName);
          let doc = localStageBlockDocuments.get(fileFsPath);
          if (!doc) {
            doc = updatedScriptRegionDocuments.refreshAndGet(
              TextDocument.create(uri.toString(), 'javascript', 0, tsModule.sys.readFile(fileName) || '')
            );
            localStageBlockDocuments.set(fileFsPath, doc);
            scriptFileNameSet.add(fileName);
          }
          const kind = getScriptKind(tsModule, doc.languageId);
          return kind;
        } else if (isVirtualVueTemplateFile(fileName)) {
          return tsModule.ScriptKind.JS;
        } else {
          if (fileName === bridge.fileName) {
            return tsModule.ScriptKind.TS;
          }
          // NOTE: Typescript 2.3 should export getScriptKindFromFileName. Then this cast should be removed.
          return (tsModule as any).getScriptKindFromFileName(fileName);
        }
      },

      getDirectories: vueSys.getDirectories,
      directoryExists: vueSys.directoryExists,
      fileExists: vueSys.fileExists,
      readFile: vueSys.readFile,
      readDirectory(
        path: string,
        extensions?: ReadonlyArray<string>,
        exclude?: ReadonlyArray<string>,
        include?: ReadonlyArray<string>,
        depth?: number
      ): string[] {
        const allExtensions = extensions ? extensions.concat(['.stage', '.js']) : extensions;
        return vueSys.readDirectory(path, allExtensions, exclude, include, depth);
      },
      resolveModuleNames(moduleNames: string[], containingFile: string): (ts.ResolvedModule | undefined)[] {
        // in the normal case, delegate to ts.resolveModuleName
        // in the relative-imported.vue case, manually build a resolved filename
        const result: (ts.ResolvedModule | undefined)[] = moduleNames.map(name => {
          if (name === bridge.moduleName) {
            return {
              resolvedFileName: bridge.fileName,
              extension: tsModule.Extension.Ts,
              /* tslint:disable:max-line-length */
              // https://github.com/microsoft/TypeScript/blob/bcbe1d763823eacd4b252c904e77761a6b8636a1/src/compiler/types.ts#L6216
              isExternalLibraryImport: true
            };
          }
          const cachedResolvedModule = moduleResolutionCache.getCache(name, containingFile);
          if (cachedResolvedModule) {
            return cachedResolvedModule;
          }

          if (path.isAbsolute(name) || !isVueFile(name)) {
            const tsResolvedModule = tsModule.resolveModuleName(name, containingFile, options, tsModule.sys)
              .resolvedModule;

            if (tsResolvedModule) {
              moduleResolutionCache.setCache(name, containingFile, tsResolvedModule);
            }

            return tsResolvedModule;
          }

          const tsResolvedModule = tsModule.resolveModuleName(name, containingFile, options, vueSys).resolvedModule;
          if (!tsResolvedModule) {
            return undefined;
          }

          if (tsResolvedModule.resolvedFileName.endsWith('.vue.ts')) {
            const resolvedFileName = tsResolvedModule.resolvedFileName.slice(0, -'.ts'.length);
            const uri = URI.file(resolvedFileName);
            const resolvedFileFsPath = normalizeFileNameToFsPath(resolvedFileName);
            let doc = localStageBlockDocuments.get(resolvedFileFsPath);
            // Vue file not created yet
            if (!doc) {
              doc = updatedStageBlockDocuments.refreshAndGet(
                TextDocument.create(uri.toString(), 'stage', 0, tsModule.sys.readFile(resolvedFileName) || '')
              );
              localStageBlockDocuments.set(resolvedFileFsPath, doc);
              scriptFileNameSet.add(resolvedFileName);
            }

            const extension =
              doc.languageId === 'typescript'
                ? tsModule.Extension.Ts
                : doc.languageId === 'tsx'
                ? tsModule.Extension.Tsx
                : tsModule.Extension.Js;

            const tsResolvedVueModule = { resolvedFileName, extension };
            moduleResolutionCache.setCache(name, containingFile, tsResolvedVueModule);
            return tsResolvedVueModule;
          } else {
            moduleResolutionCache.setCache(name, containingFile, tsResolvedModule);
            return tsResolvedModule;
          }
        });

        return result;
      },
      getScriptSnapshot: (fileName: string) => {
        if (fileName.includes('node_modules')) {
          if (nodeModuleSnapshots.has(fileName)) {
            return nodeModuleSnapshots.get(fileName);
          }
          const fileText = tsModule.sys.readFile(fileName) || '';
          const snapshot: ts.IScriptSnapshot = {
            getText: (start, end) => fileText.substring(start, end),
            getLength: () => fileText.length,
            getChangeRange: () => void 0
          };
          nodeModuleSnapshots.set(fileName, snapshot);
          return snapshot;
        }

        if (fileName === bridge.fileName) {
          const text =
            vueVersion === VueVersion.VPre25
              ? bridge.preVue25Content
              : vueVersion === VueVersion.V25
              ? bridge.vue25Content
              : bridge.vue30Content;

          return {
            getText: (start, end) => text.substring(start, end),
            getLength: () => text.length,
            getChangeRange: () => void 0
          };
        }

        const fileFsPath = normalizeFileNameToFsPath(fileName);

        // .vue.template files are handled in pre-process phase
        if (isVirtualVueTemplateFile(fileFsPath)) {
          const doc = localStageBlockDocuments.get(fileFsPath);
          const fileText = doc ? doc.getText() : '';
          return {
            getText: (start, end) => fileText.substring(start, end),
            getLength: () => fileText.length,
            getChangeRange: () => void 0
          };
        }

        // js/ts files in workspace
        if (!isStageFile(fileFsPath) && !isStageModule(fileFsPath)) {
          if (projectFileSnapshots.has(fileFsPath)) {
            return projectFileSnapshots.get(fileFsPath);
          }
          const fileText = tsModule.sys.readFile(fileFsPath) || '';
          const snapshot: ts.IScriptSnapshot = {
            getText: (start, end) => fileText.substring(start, end),
            getLength: () => fileText.length,
            getChangeRange: () => void 0
          };
          projectFileSnapshots.set(fileFsPath, snapshot);
          return snapshot;
        }

        // stage files || modules in workspace
        const doc = localStageBlockDocuments.get(fileFsPath);
        let fileText = '';
        if (doc) {
          fileText = doc.getText();
        } else {
          // Note: This is required in addition to the parsing in embeddedSupport because
          // this works for .vue files that aren't even loaded by VS Code yet.
          const raw = tsModule.sys.readFile(fileFsPath) || '';
          if (isStageFile(fileFsPath)) {
            fileText = parseStageScript(raw);
          } else {
            fileText = parseStageModule(raw);
          }
        }

        return {
          getText: (start, end) => fileText.substring(start, end),
          getLength: () => fileText.length,
          getChangeRange: () => void 0
        };
      },
      getCurrentDirectory: () => workspacePath,
      getDefaultLibFileName: tsModule.getDefaultLibFilePath,
      getNewLine: () => NEWLINE,
      useCaseSensitiveFileNames: () => true
    };
  }

  function createDomScriptServiceHost(options: ts.CompilerOptions) {
    class ServiceHost implements ts.LanguageServiceHost {
      //files: { [fileName: string]: { file: ts.IScriptSnapshot; ver: number } } = {};

      getCompilationSettings = () => options;
      getScriptIsOpen = () => true;
      getSourceFile = (fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void) => {
        const sourceText = ts.sys.readFile(fileName);
        return sourceText !== undefined ? ts.createSourceFile(fileName, sourceText, languageVersion) : undefined;
      };
      getCurrentDirectory = () => workspacePath;
      getDefaultLibFileName = tsModule.getDefaultLibFilePath;
      getNewLine = () => NEWLINE;
      getDirectories = vueSys.getDirectories;
      directoryExists = vueSys.directoryExists;
      fileExists = vueSys.fileExists;
      readFile = vueSys.readFile;
      readDirectory(
        path: string,
        extensions?: ReadonlyArray<string>,
        exclude?: ReadonlyArray<string>,
        include?: ReadonlyArray<string>,
        depth?: number
      ): string[] {
        //const allExtensions = extensions ? extensions.concat(['.vue']) : extensions;
        return vueSys.readDirectory(path, extensions, exclude, include, depth);
      }
      getScriptFileNames() {
        const fileNames = Array.from(scriptFileNameSet);
        return fileNames;
      }
      getScriptVersion(fileName: string) {
        if (fileName.includes('node_modules')) {
          return '0';
        }

        if (fileName === bridge.fileName) {
          return '0';
        }

        const normalizedFileFsPath = normalizeFileNameToFsPath(fileName);
        const version = versions.get(normalizedFileFsPath);
        return version ? version.toString() : '0';
      }
      getScriptKind(fileName: string) {
        // For type libraries in this mode
        if (fileName.includes('node_modules')) {
          return (tsModule as any).getScriptKindFromFileName(fileName);
        }
        if (isStageFile(fileName)) {
          return getScriptKind(tsModule, 'javascript');
        }
        // NOTE: Typescript 2.3 should export getScriptKindFromFileName. Then this cast should be removed.
        return (tsModule as any).getScriptKindFromFileName(fileName);
      }
      getScriptSnapshot(fileName: string) {
        // For type libraries in this mode
        if (fileName.includes('node_modules')) {
          if (nodeModuleSnapshots.has(fileName)) {
            return nodeModuleSnapshots.get(fileName);
          }
          const fileText = tsModule.sys.readFile(fileName) || '';
          const snapshot: ts.IScriptSnapshot = {
            getText: (start, end) => fileText.substring(start, end),
            getLength: () => fileText.length,
            getChangeRange: () => void 0
          };
          nodeModuleSnapshots.set(fileName, snapshot);
          return snapshot;
        }

        const fileFsPath = normalizeFileNameToFsPath(fileName);

        // stage files in workspace
        const doc = localScriptRegionDocuments.get(fileFsPath);
        let fileText = '';
        if (doc) {
          fileText = doc.getText();
        } else {
          // Note: This is required in addition to the parsing in embeddedSupport because
          // this works for .vue files that aren't even loaded by VS Code yet.
          const rawVueFileText = tsModule.sys.readFile(fileFsPath) || '';
          fileText = parseStageScript(rawVueFileText);
        }

        return {
          getText: (start: number, end: number) => fileText.substring(start, end),
          getLength: () => fileText.length,
          getChangeRange: () => void 0
        };
      }
    }

    return new ServiceHost();
  }

  //const jsHost = createLanguageServiceHost(compilerOptions);
  /*const templateHost = createLanguageServiceHost({
    ...compilerOptions,
    noUnusedLocals: false,
    noUnusedParameters: false,
    allowJs: true,
    checkJs: true
  });*/

  const domJsHost = createDomScriptServiceHost({
    ...compilerOptions,
    lib: ['lib.dom.d.ts', 'lib.es2017.d.ts'],
    module: ts.ModuleKind.None
  });

  const typeDir = path.resolve(__dirname, '../../types');
  const jsHost = createLanguageServiceHost({
    ...compilerOptions,
    // Add global Stage types
    typeRoots: [typeDir]
  });

  const templateHost = createLanguageServiceHost({
    ...compilerOptions,
    noUnusedLocals: false,
    noUnusedParameters: false,
    allowJs: true,
    checkJs: true
  });

  const registry = tsModule.createDocumentRegistry(true);
  let jsLanguageService = tsModule.createLanguageService(jsHost, registry);
  let jsDomLanguageService = tsModule.createLanguageService(domJsHost, tsModule.createDocumentRegistry(true));
  const templateLanguageService = patchTemplateService(tsModule.createLanguageService(templateHost, registry));

  return {
    queryVirtualFileInfo,
    updateCurrentVirtualVueTextDocument,
    updateCurrentStageTextDocument,
    updateExternalDocument,
    dispose: () => {
      jsDomLanguageService.dispose();
      jsLanguageService.dispose();
    }
  };
}

function patchTemplateService(original: ts.LanguageService): ts.LanguageService {
  const allowedGlobals = new Set(globalScope);

  return {
    ...original,

    getCompletionsAtPosition(fileName, position, options) {
      const result = original.getCompletionsAtPosition(fileName, position, options);
      if (!result) {
        return;
      }

      if (result.isMemberCompletion) {
        return result;
      }

      return {
        ...result,

        entries: result.entries.filter(entry => {
          return allowedGlobals.has(entry.name);
        })
      };
    }
  };
}

function defaultIgnorePatterns(tsModule: T_TypeScript, workspacePath: string) {
  const nodeModules = ['node_modules', '**/node_modules/*'];
  const gitignore = tsModule.findConfigFile(workspacePath, tsModule.sys.fileExists, '.gitignore');
  if (!gitignore) {
    return nodeModules;
  }
  const parsed: string[] = parseGitIgnore(gitignore);
  const filtered = parsed.filter(s => !s.startsWith('!'));
  return nodeModules.concat(filtered);
}

function getScriptKind(tsModule: T_TypeScript, langId: string): ts.ScriptKind {
  return langId === 'typescript'
    ? tsModule.ScriptKind.TS
    : langId === 'tsx'
    ? tsModule.ScriptKind.TSX
    : tsModule.ScriptKind.JS;
}

function getParsedConfig(tsModule: T_TypeScript, workspacePath: string) {
  const configFilename =
    tsModule.findConfigFile(workspacePath, tsModule.sys.fileExists, 'tsconfig.json') ||
    tsModule.findConfigFile(workspacePath, tsModule.sys.fileExists, 'jsconfig.json');
  const configJson = (configFilename && tsModule.readConfigFile(configFilename, tsModule.sys.readFile).config) || {
    exclude: defaultIgnorePatterns(tsModule, workspacePath)
  };
  // existingOptions should be empty since it always takes priority
  return tsModule.parseJsonConfigFileContent(
    configJson,
    tsModule.sys,
    workspacePath,
    /*existingOptions*/ {},
    configFilename,
    /*resolutionStack*/ undefined,
    [
      {
        extension: 'stage',
        isMixedContent: true,
        // Note: in order for parsed config to include *.vue files, scriptKind must be set to Deferred.
        // tslint:disable-next-line max-line-length
        // See: https://github.com/microsoft/TypeScript/blob/2106b07f22d6d8f2affe34b9869767fa5bc7a4d9/src/compiler/utilities.ts#L6356
        scriptKind: ts.ScriptKind.Deferred
      }
    ]
  );
}
