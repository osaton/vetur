import { TextDocument, Position, Range } from 'vscode-languageserver-types';
import { parseDocumentParts, EmbeddedRegion, EmbeddedPart } from './documentRegionParser';

export type LanguageId =
  | 'stage'
  | 'stage-html'
  | 'html'
  | 'vue'
  | 'pug'
  | 'css'
  | 'postcss'
  | 'scss'
  | 'sass'
  | 'less'
  | 'stylus'
  | 'javascript'
  | 'typescript'
  | 'tsx';

export interface LanguageRange extends Range {
  languageId: LanguageId;
  attributeValue?: boolean;
}

export interface VueDocumentRegions {
  /**
   * Get a document where all regions of `languageId` is preserved
   * Whereas other regions are replaced with whitespaces
   */
  getSingleLanguageDocument(languageId: LanguageId): TextDocument;

  /**
   * Get a document where all regions of `type` RegionType is preserved
   * Whereas other regions are replaced with whitespaces
   */
  getSingleTypeDocument(type: RegionType): TextDocument;

  /**
   * Get a list of ranges that has `RegionType`
   */
  getLanguageRangesOfType(type: RegionType): LanguageRange[];

  /**
   * Get all language ranges inside document
   */
  getAllLanguageRanges(): LanguageRange[];

  /**
   * Get language for determining
   */
  getLanguageAtPosition(position: Position): LanguageId;

  getImportedScripts(): string[];
}

type RegionType = 'template' | 'script' | 'style' | 'custom';

const defaultLanguageIdForBlockTypes: { [type: string]: string } = {
  template: 'stage-html',
  script: 'javascript',
  style: 'css'
};

export function getStageDocumentRegions(document: TextDocument): VueDocumentRegions {
  const { parts } = parseDocumentParts(document);

  return {
    getSingleLanguageDocument: (languageId: LanguageId) => getSingleLanguageDocument(document, parts, languageId),
    getSingleTypeDocument: (type: RegionType) => getSingleTypeDocument(document, parts, type),

    getLanguageRangesOfType: (type: RegionType) => getLanguageRangesOfType(document, parts, type),

    getAllLanguageRanges: () => getAllLanguageRanges(document, parts),
    getLanguageAtPosition: (position: Position) => getLanguageAtPosition(document, parts, position),
    getImportedScripts: () => []
  };
}

function getAllLanguageRanges(document: TextDocument, regions: EmbeddedRegion[]): LanguageRange[] {
  return regions.map(r => {
    return {
      languageId: r.languageId,
      start: document.positionAt(r.start),
      end: document.positionAt(r.end)
    };
  });
}

function getLanguageAtPosition(document: TextDocument, regions: EmbeddedRegion[], position: Position): LanguageId {
  const offset = document.offsetAt(position);
  for (const region of regions) {
    if (region.start <= offset) {
      if (offset <= region.end) {
        return region.languageId;
      }
    } else {
      break;
    }
  }
  return 'vue';
}

/**
 * Get single document of specific language in `part`
 */
export function getSinglePartLanguageDocument(document:TextDocument, part:EmbeddedPart, languageId: LanguageId) {
  const oldContent = document.getText();
  let newContent = oldContent
    .split('\n')
    .map(line => ' '.repeat(line.length))
    .join('\n');

  for (const r of part.regions) {
    if (r.languageId === languageId) {
      newContent = newContent.slice(0, r.start) + oldContent.slice(r.start, r.end) + newContent.slice(r.end);
    }
  }

  return TextDocument.create(document.uri, languageId, document.version, newContent);
}

export function getSingleLanguageDocument(
  document: TextDocument,
  regions: EmbeddedRegion[],
  languageId: LanguageId
): TextDocument {
  const oldContent = document.getText();
  let newContent = oldContent
    .split('\n')
    .map(line => ' '.repeat(line.length))
    .join('\n');

  for (const r of regions) {
    if (r.languageId === languageId) {
      newContent = newContent.slice(0, r.start) + oldContent.slice(r.start, r.end) + newContent.slice(r.end);
    }
  }

  return TextDocument.create(document.uri, languageId, document.version, newContent);
}

export function getSinglePartDocument(document: TextDocument, part: EmbeddedPart) {
  if (part.type !== 'template') {
    throw Error(`Invalid type: ${part.type}`)
  }
  const oldContent = document.getText();
  let newContent = oldContent
    .split('\n')
    .map(line => ' '.repeat(line.length))
    .join('\n');

  let langId: string = defaultLanguageIdForBlockTypes[part.type];
  newContent = newContent.slice(0, part.start) + oldContent.slice(part.start, part.end) + newContent.slice(part.end);

  return TextDocument.create(document.uri, langId, document.version, newContent);
}
  

export function getSingleTypeDocument(
  document: TextDocument,
  regions: EmbeddedRegion[],
  type: RegionType
): TextDocument {
  const oldContent = document.getText();
  let newContent = oldContent
    .split('\n')
    .map(line => ' '.repeat(line.length))
    .join('\n');

  let langId: string = defaultLanguageIdForBlockTypes[type];

  for (const r of regions) {
    if (r.type === type) {
      newContent = newContent.slice(0, r.start) + oldContent.slice(r.start, r.end) + newContent.slice(r.end);
      langId = r.languageId;
    }
  }

  if (type === 'script' && newContent.trim().length === 0) {
    newContent = 'export default {};';
  }

  return TextDocument.create(document.uri, langId, document.version, newContent);
}

export function getLanguageRangesOfType(
  document: TextDocument,
  regions: EmbeddedRegion[],
  type: RegionType
): LanguageRange[] {
  const result = [];

  for (const r of regions) {
    if (r.type === type) {
      result.push({
        start: document.positionAt(r.start),
        end: document.positionAt(r.end),
        languageId: r.languageId
      });
    }
  }

  return result;
}
