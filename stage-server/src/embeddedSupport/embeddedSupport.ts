import { TextDocument, Position, Range } from 'vscode-languageserver-types';
import { parseDocumentParts, EmbeddedRegion, EmbeddedPart } from './documentRegionParser';

export type LanguageId =
  | 'stage'
  | 'stage-code'
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

export interface DocumentRegions {
  /**
   * Get a document where all regions of `languageId` is preserved
   * Whereas other regions are replaced with whitespaces
   */
  getSingleLanguageDocument(languageId: LanguageId): TextDocument;
  getSinglePartLanguageDocument(languageId: LanguageId, position: Position): TextDocument;
  /**
   * Get a document where all regions of `type` RegionType is preserved
   * Whereas other regions are replaced with whitespaces
   */
  getSingleTypeDocument(type: RegionType): TextDocument;
  getSinglePartTypeDocument(type: RegionType, position: Position): TextDocument;
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

  getPartAtPosition(position: Position): EmbeddedPart | null;
  getAllRegions(): EmbeddedRegion[];
  getImportedScripts(): string[];
}

type RegionType = 'template' | 'script' | 'style' | 'custom';

const defaultLanguageIdForBlockTypes: { [type: string]: string } = {
  template: 'stage-html',
  script: 'javascript',
  style: 'css'
};

export function getStageDocumentRegions(document: TextDocument): DocumentRegions {
  const { parts } = parseDocumentParts(document);

  let activePart: EmbeddedPart = parts[0];

  function getAllRegions(parts: EmbeddedPart[]): EmbeddedRegion[] {
    return parts
      .map(part => {
        return part.regions;
      })
      .flat();
  }

  return {
    getSingleLanguageDocument: (languageId: LanguageId) => {
      return getSingleLanguageDocument(document, getAllRegions(parts), languageId);
    },
    getSinglePartLanguageDocument: (languageId: LanguageId, position: Position) => {
      const part = getPartAtPosition(document, parts, position);
      return getSingleLanguageDocument(document, part?.regions || [], languageId);
    },
    getSingleTypeDocument: (type: RegionType) => getSingleTypeDocument(document, getAllRegions(parts), type),
    getSinglePartTypeDocument: (type: RegionType, position: Position) => {
      const part = getPartAtPosition(document, parts, position);
      return getSingleTypeDocument(document, part?.regions || [], type);
    },
    /*getSingleTypeDocument: (type: RegionType) => {
      return getSingleTypeDocument(document, activePart.regions, type);
    },*/
    getLanguageRangesOfType: (type: RegionType) => getLanguageRangesOfType(document, parts, type),

    getAllLanguageRanges: () => getAllLanguageRanges(document, parts),
    getLanguageAtPosition: (position: Position) => getLanguageAtPosition(document, parts, position),
    getPartAtPosition: (position: Position) => {
      const part = getPartAtPosition(document, parts, position);
      if (part) {
        activePart = part;
      }
      return part;
    },
    getImportedScripts: () => [],
    getAllRegions: () => getAllRegions(parts)
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

function getPartAtPosition(document: TextDocument, parts: EmbeddedPart[], position: Position): EmbeddedPart | null {
  const offset = document.offsetAt(position);
  for (const part of parts) {
    if (part.start <= offset) {
      if (offset <= part.end) {
        return part;
      }
    } else {
      break;
    }
  }

  return null;
}

function getLanguageAtPosition(document: TextDocument, parts: EmbeddedPart[], position: Position): LanguageId {
  const part = getPartAtPosition(document, parts, position);
  if (!part) {
    return 'stage';
  }

  const offset = document.offsetAt(position);
  for (const region of part.regions) {
    if (region.start <= offset) {
      if (offset <= region.end) {
        return region.languageId;
      }
    } else {
      break;
    }
  }
  return 'stage';
}

/**
 * Get single document of specific language in `part`
 */
export function getSinglePartLanguageDocument(document: TextDocument, part: EmbeddedPart, languageId: LanguageId) {
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
    throw Error(`Invalid type: ${part.type}`);
  }
  const oldContent = document.getText();
  let newContent = oldContent
    .split('\n')
    .map(line => ' '.repeat(line.length))
    .join('\n');

  const langId: string = defaultLanguageIdForBlockTypes[part.type];
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
