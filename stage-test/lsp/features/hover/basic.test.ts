import { testHover } from '../../../hoverHelper';
import { position, sameLineRange } from '../../../util';
import { getDocUri } from '../../path';

describe.only('Should do hover', () => {
  const docUri = getDocUri('hover/basic.stage');

  it('shows hover for <img> tag', async () => {
    await testHover(docUri, position(3, 8), {
      contents: ['An img element represents an image.'],
      range: sameLineRange(3, 7, 10)
    });
  });

  it('shows hover for `foo` in stage block (<% %>)', async () => {
    const hoverText = '\n```ts\n' + 'const foo: "variable"\n' + '```';

    await testHover(docUri, position(7, 8), {
      contents: [hoverText],
      range: sameLineRange(7, 8, 11)
    });
  });

  it('shows hover for `width` in <style>', async () => {
    const hoverText = `
Specifies the width of the content area, padding area or border area \\(depending on 'box\\-sizing'\\) of certain boxes\\.

Syntax: &lt;viewport\\-length&gt;\\{1,2\\}

[MDN Reference](https://developer.mozilla.org/docs/Web/CSS/width)
`.trim();

    await testHover(docUri, position(11, 4), {
      contents: [hoverText],
      range: sameLineRange(11, 4, 16)
    });
  });
});
