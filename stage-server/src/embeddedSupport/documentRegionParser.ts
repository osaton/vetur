import { partial } from 'lodash';
import { tokenToString } from 'typescript';
import { TextDocument } from 'vscode-languageserver-types';
import { createScanner, TokenType, Scanner } from '../modes/template/parser/htmlScanner';
import { StageCodeScanner } from '../modes/template/parser/stageCodeScanner';
import { removeQuotes } from '../utils/strings';
import { getSinglePartDocument, LanguageId } from './embeddedSupport';

export type RegionType = 'template' | 'script' | 'style' | 'content';

export interface EmbeddedRegion {
  languageId: LanguageId;
  start: number;
  end: number;
  type: RegionType;
  contentStart?: number;
  contentEnd?: number;
}
export interface EmbeddedPart {
  languageId: LanguageId;
  start: number;
  end: number;
  type: RegionType;
  regions: EmbeddedRegion[];
}

const defaultScriptLang = 'javascript';
const defaultCSSLang = 'css';

export function parsePartRegions(document:TextDocument, part:EmbeddedPart) {
  const doc = getSinglePartDocument(document, part);
  const text = doc.getText();
  return parseRegions(text, part);
}

export function parseDocumentParts(document: TextDocument) {
  const text = document.getText();
  const res = parseParts(text);

  res.parts.forEach(part => {
    const doc = getSinglePartDocument(document, part);
    const text = doc.getText();
    
    const { regions: stageRegions} = parsePartStageCodeRegions(text, part);
    const { regions } = parsePartRegions(document, part);

  
    part.regions = mergeRegions(regions, stageRegions);
  });

  return res;
}

/**
 * Merge Stage blocks with other language blocks
 * 
 * @param regions 
 * @param stageRegions 
 */
function mergeRegions(regions:EmbeddedRegion[], stageRegions:EmbeddedRegion[]) {
  const mergedRegions:EmbeddedRegion[] = [];

  if (!stageRegions.length) {
    return regions;
  }

  // This mergin could probably be done wiser
  stageRegions.forEach(stageRegion => {
    let currentRegion = 0;
    let region = regions[currentRegion];
    while(region) {

      // If stageRegion is inside this region
      if (stageRegion.start > region.start && stageRegion.start < region.end) {
        const solvedRegion = {
          languageId: region.languageId,
          start: region.start,
          end: stageRegion.start,
          type: region.type
        };

        mergedRegions.push(solvedRegion);

        if (stageRegion.end < region.end) {
          mergedRegions.push(stageRegion);
          mergedRegions.push({
            languageId: region.languageId,
            type: region.type,
            start: stageRegion.end,
            end: region.end
          });
        }
      } else {
        
      }

      currentRegion++;
      region = regions[currentRegion];
    }
  });

  return mergedRegions;
}

function parsePartStageCodeRegions(text: string, part:EmbeddedPart) {
  const scanner = new StageCodeScanner(text);

  const regions = scanner.findAll();

  return {
    regions
  };
}
/**
 * Parse regions (template, script, styles) of text block
 * 
 * @param text 
 */
function parseRegions(text:string, part:EmbeddedPart) {
  const regions: EmbeddedRegion[] = [];
  const scanner = createScanner(text);
  const lastTagName = '';
  let lastAttributeName = '';
  let languageIdFromType: LanguageId | '' = '';
  const importedScripts: string[] = [];
  const contentLanguage = part.languageId === 'stage-html' ? 'html' : part.languageId;
  let token = scanner.scan();

  while (token !== TokenType.EOS) {
    switch (token) {
      case TokenType.Styles:
        regions.push({
          languageId: /^(sass|scss|less|postcss|stylus)$/.test(languageIdFromType)
            ? (languageIdFromType as LanguageId)
            : defaultCSSLang,
          start: scanner.getTokenOffset(),
          end: scanner.getTokenEnd(),
          type: 'style'
        });
        languageIdFromType = '';
        break;
      case TokenType.Script:
        regions.push({
          languageId: languageIdFromType ? languageIdFromType : defaultScriptLang,
          start: scanner.getTokenOffset(),
          end: scanner.getTokenEnd(),
          type: 'script'
        });
        languageIdFromType = '';
        break;
      /*case TokenType.StartTag:
        const tagName = scanner.getTokenText();
        if (tagName === 'template') {
          const templateRegion = scanTemplateRegion(scanner, text);
          if (templateRegion) {
            regions.push(templateRegion);
          }
        }
        lastTagName = tagName;
        lastAttributeName = '';
        break;*/
      case TokenType.AttributeName:
        lastAttributeName = scanner.getTokenText();
        break;
      case TokenType.AttributeValue:
        if (lastAttributeName === 'lang') {
          languageIdFromType = getLanguageIdFromLangAttr(scanner.getTokenText());
        } else {
          if (lastAttributeName === 'src' && lastTagName.toLowerCase() === 'script') {
            let value = scanner.getTokenText();
            if (value[0] === "'" || value[0] === '"') {
              value = value.slice(1, value.length - 1);
            }
            importedScripts.push(value);
          }
        }
        lastAttributeName = '';
        break;
      case TokenType.EndTagClose:
        lastAttributeName = '';
        languageIdFromType = '';
        break;
    }
    token = scanner.scan();
  }

  // Add default language to missing empty spaces
  const finalizedRegions:EmbeddedRegion[] = [];

  let contentStart = part.start;
  regions.forEach(region => {
    // todo: proper type
    finalizedRegions.push({ languageId: contentLanguage, start: contentStart, end: region.start, type: 'content' });
    finalizedRegions.push(region);
    contentStart = region.end;
  });

  if (contentStart < part.end) {
    finalizedRegions.push({ languageId: contentLanguage, start: contentStart, end: part.end, type: 'content' });
  }

  return {
    regions: finalizedRegions
  };
}

/**
 * Parse regions (template, script, styles) of text block
 * 
 * @param text 
 */
function parseParts(text:string) {
  const regions: EmbeddedPart[] = [];
  const scanner = createScanner(text);
  let lastTagName = '';
  let lastAttributeName = '';
  let languageIdFromType: LanguageId | '' = '';
  const importedScripts: string[] = [];

  let token = scanner.scan();
  while (token !== TokenType.EOS) {
    switch (token) {
      /*
      Not supported at the moment at least
      case TokenType.Styles:
        regions.push({
          languageId: /^(sass|scss|less|postcss|stylus)$/.test(languageIdFromType)
            ? (languageIdFromType as LanguageId)
            : defaultCSSLang,
          start: scanner.getTokenOffset(),
          end: scanner.getTokenEnd(),
          type: 'style',
          regions: []  
        });
        languageIdFromType = '';
        break;
      case TokenType.Script:
        regions.push({
          languageId: languageIdFromType ? languageIdFromType : defaultScriptLang,
          start: scanner.getTokenOffset(),
          end: scanner.getTokenEnd(),
          type: 'script',
          regions: []
        });
        languageIdFromType = '';
        break;*/
      case TokenType.StartTag:
        const tagName = scanner.getTokenText();
        if (tagName === 'template') {
          const templateRegion = scanTemplateRegion(scanner, text);
          if (templateRegion) {
            regions.push({
              languageId: templateRegion.languageId,
              start: templateRegion.start,
              end: templateRegion.end,
              type: templateRegion.type,
              regions: []
            });
          }
        }
        lastTagName = tagName;
        lastAttributeName = '';
        break;
      case TokenType.AttributeName:
        lastAttributeName = scanner.getTokenText();
        break;
      case TokenType.AttributeValue:
        if (lastAttributeName === 'lang') {
          languageIdFromType = getLanguageIdFromLangAttr(scanner.getTokenText());
        } else {
          if (lastAttributeName === 'src' && lastTagName.toLowerCase() === 'script') {
            let value = scanner.getTokenText();
            if (value[0] === "'" || value[0] === '"') {
              value = value.slice(1, value.length - 1);
            }
            importedScripts.push(value);
          }
        }
        lastAttributeName = '';
        break;
      case TokenType.EndTagClose:
        lastAttributeName = '';
        languageIdFromType = '';
        break;
    }
    token = scanner.scan();
  }

  return {
    parts: regions
  };
}
function scanTemplateRegion(scanner: Scanner, text: string): EmbeddedRegion | null {
  let languageId: LanguageId = 'stage-html';

  let token = -1;
  let start = 0;
  let end: number;

  // Scan until finding matching template EndTag
  // Also record immediate next StartTagClose to find start
  let unClosedTemplate = 1;
  let lastAttributeName = null;
  while (unClosedTemplate !== 0) {
    // skip parsing on non html syntax, just search terminator
    if (token === TokenType.AttributeValue && languageId !== 'stage-html') {
      while (token !== TokenType.StartTagClose) {
        token = scanner.scan();
      }
      start = scanner.getTokenEnd();

      token = scanner.scanForRegexp(/<\/template>/);
      if (token === TokenType.EOS) {
        return null;
      }

      // scan to `EndTag`, past `</` to `template`
      while (token !== TokenType.EndTag) {
        token = scanner.scan();
      }
      break;
    }

    token = scanner.scan();

    if (token === TokenType.EOS) {
      return null;
    }

    if (start === 0) {
      if (token === TokenType.AttributeName) {
        lastAttributeName = scanner.getTokenText();
      } else if (token === TokenType.AttributeValue) {
        if (lastAttributeName === 'lang') {
          languageId = getLanguageIdFromLangAttr(scanner.getTokenText());
        }
        lastAttributeName = null;
      } else if (token === TokenType.StartTagClose) {
        start = scanner.getTokenEnd();
      }
    } else {
      if (token === TokenType.StartTag && scanner.getTokenText() === 'template') {
        unClosedTemplate++;
      } else if (token === TokenType.EndTag && scanner.getTokenText() === 'template') {
        unClosedTemplate--;
        // test leading </template>
        const charPosBeforeEndTag = scanner.getTokenOffset() - 3;
        if (text[charPosBeforeEndTag] === '\n') {
          break;
        }
      } else if (token === TokenType.Unknown) {
        if (scanner.getTokenText().charAt(0) === '<') {
          const offset = scanner.getTokenOffset();
          const unknownText = text.substr(offset, 11);
          if (unknownText === '</template>') {
            unClosedTemplate--;
            // test leading </template>
            if (text[offset - 1] === '\n') {
              return {
                languageId,
                start,
                end: offset,
                type: 'template'
              };
            }
          }
        }
      }
    }
  }

  // In EndTag, find end
  // -2 for </
  end = scanner.getTokenOffset() - 2;

  return {
    languageId,
    start,
    end,
    type: 'template'
  };
}

function getLanguageIdFromLangAttr(lang: string): LanguageId {
  let languageIdFromType = removeQuotes(lang);
  if (languageIdFromType === 'jade') {
    languageIdFromType = 'pug';
  }
  if (languageIdFromType === 'ts') {
    languageIdFromType = 'typescript';
  }
  return languageIdFromType as LanguageId;
}
