import { EmbeddedRegion } from '../../../embeddedSupport/documentRegionParser';

// `<% ... %>`
const blockRegex = /<%([^%>]*)%>/s;
const allowedCodeBlockDefiningChars = /\s/;
const blockInfo: Record<string, any> = {
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
const definingChars = Object.keys(blockInfo);

export function getStageBlockTypeId(definingChar: string) {
  if (definingChars.includes(definingChar)) {
    return definingChar;
    // \n \r etc
  } else if (allowedCodeBlockDefiningChars.test(definingChar)) {
    return ' ';
  }

  return null;
}

export function getStageBlockInfo(definingChar: string) {
  const id = getStageBlockTypeId(definingChar);

  return (id && blockInfo[id]) || null;
}
export class StageCodeScanner {
  private source: string;
  private position: number;
  private definingChars: string[];
  private allowedBlockDefiningChars = /\s/;

  constructor(src: string) {
    this.source = src;
    this.position = 0;
    this.definingChars = Object.keys(blockInfo);
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

    const info = blockInfo[typeId];

    const startPosition = this.position + match.index!;
    this.position = startPosition + match[0].length;

    const res: EmbeddedRegion = {
      languageId: 'stage-code',
      start: startPosition,
      type: info.type,
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
