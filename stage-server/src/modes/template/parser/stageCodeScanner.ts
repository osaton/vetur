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
const blockRegex = /<%([^%>]*)%>/s;
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
    const str = this.source.substr(this.position);
    const match = str.match(blockRegex);

    if (!match) {
      return null;
    }

    const content = match[1];

    const typeId = getStageBlockTypeId(content.charAt(0));

    // Malformed start tag. E.g. `<%2`
    if (!typeId) {
      return null;
    }

    const info = stageBlocks[typeId];

    const startPosition = this.position + match.index!;
    this.position = startPosition + match[0].length;

    const res: EmbeddedRegion = {
      languageId: 'stage-code',
      start: startPosition,
      type: 'script',
      stageBlockType: info.type,
      contentStart: startPosition + info.start,
      contentEnd: startPosition + match[0].length - info.end,
      end: startPosition + match[0].length
    };

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
