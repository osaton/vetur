import { EmbeddedRegion } from '../../../embeddedSupport/documentRegionParser';

// `<% ... %>`
const blockRegex = /<%([^%>]*)%>/s;
const blockTypes: Record<string, any> = {
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

export class StageCodeScanner {
  private source: string;
  private position: number;
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

    const startPosition = this.position + match.index!;
    this.position = startPosition + match[0].length;

    const content = match[1];
    const info = blockTypes[content.charAt(0)];

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
