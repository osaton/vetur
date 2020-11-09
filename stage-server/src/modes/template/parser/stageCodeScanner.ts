import { EmbeddedRegion } from '../../../embeddedSupport/documentRegionParser';

export type StageBlockType = 'code' | 'output' | 'output-safe' | 'localisation';
export type StageBlockTypeId = ' ' | '+' | '=' | '@';

export interface StageBlock {
  type: StageBlockType;
  start: number;
  end: number;
}
export type StageBlocks = { [k in StageBlockTypeId]: StageBlock };
// `<% ... %>`
//const blockRegex = /<%([^(%>)]*)%>/s;
const blockRegex = /(<%|%>)/g;
const openRegex = /<%/;
const closeRegex = /%>/;
const allowedCodeBlockDefiningChars = /\s/;
const stageBlocks: StageBlocks = {
  // `<% `
  ' ': {
    type: 'code',
    start: 2,
    end: 2
  },
  // `<%+`
  '+': {
    type: 'output',
    start: 3,
    end: 2
  },
  // `<%=`
  '=': {
    type: 'output-safe',
    start: 3,
    end: 2
  },
  // `<%=`
  '@': {
    type: 'localisation',
    start: 3,
    end: 2
  }
};
const definingChars: StageBlockTypeId[] = [' ', '+', '=', '@'];

export function getStageBlockTypeId(definingChar: string): StageBlockTypeId | null {
  if (definingChars.includes(definingChar as StageBlockTypeId)) {
    return definingChar as StageBlockTypeId;
    // \n \r etc
  } else if (allowedCodeBlockDefiningChars.test(definingChar)) {
    return ' ';
  }

  return null;
}

export function getStageBlockInfo(definingChar: string) {
  const id = getStageBlockTypeId(definingChar);

  // Return code block as default
  return (id && stageBlocks[id]) || stageBlocks[' '];
}
export class StageCodeScanner {
  private source: string;
  private position: number;
  private definingChars: string[];
  private allowedBlockDefiningChars = /\s/;

  constructor(src: string) {
    this.source = src;
    this.position = 0;
  }

  findNext() {
    let str = this.source.substr(this.position);
    const openMatch = str.match(openRegex);

    if (!openMatch) {
      return null;
    }

    const typeId = getStageBlockTypeId(str.charAt(openMatch.index! + openMatch[0].length));

    // Malformed start tag. E.g. `<%2`
    if (!typeId) {
      return null;
    }

    const info = stageBlocks[typeId];

    const startPosition = this.position + openMatch.index!;
    str = this.source.substr(startPosition);

    // Find end position
    const closeMatch = str.match(closeRegex);

    if (!closeMatch) {
      return null;
    }

    const res: EmbeddedRegion = {
      languageId: 'stage-javascript',
      start: startPosition,
      type: 'stage-block',
      stageBlockType: info.type,
      contentStart: startPosition + info.start,
      contentEnd: startPosition + closeMatch.index!,
      end: startPosition + closeMatch.index! + info.end
    };

    this.position = res.end;

    return res;
  }

  findAll() {
    const regions: EmbeddedRegion[] = [];
    let region = this.findNext();
    while (region) {
      regions.push(region);
      region = this.findNext();
    }

    return regions;
  }
}
