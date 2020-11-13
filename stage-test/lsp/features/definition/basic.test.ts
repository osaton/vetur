import { toUnicode } from 'punycode';
import { testDefinition } from '../../../definitionHelper';
import { location, position, sameLineLocation } from '../../../util';
import { getDocUri } from '../../path';

describe('Should find definition', () => {
  describe('Inside stage block (<% %>)', () => {
    const stageBlockUri = getDocUri('definition/basic.stage');

    it('finds definition for imported files', async () => {
      const itemUri = getDocUri('definition/foo.js');
      await testDefinition(stageBlockUri, position(2, 12), location(itemUri, 1, 2, 1, 5));
    });
  });

  // todo: tests
  return;
  const docUri = getDocUri('definition/Basic.vue');

  it('finds definition for this.msg', async () => {
    await testDefinition(docUri, position(32, 23), sameLineLocation(docUri, 22, 6, 9));
  });

  it('finds definition for lodash', async () => {
    const lodashDtsUri = getDocUri('node_modules/@types/lodash/index.d.ts');
    await testDefinition(docUri, position(16, 12), sameLineLocation(lodashDtsUri, 246, 12, 13));
  });

  it('finds definition for Vue#data', async () => {
    const vueOptionsDtsUri = getDocUri('node_modules/vue/types/options.d.ts');
    await testDefinition(docUri, position(20, 2), sameLineLocation(vueOptionsDtsUri, 73, 2, 6));
  });

  it('finds definition for imported Vue files', async () => {
    const itemUri = getDocUri('definition/Basic.Item.vue');
    await testDefinition(docUri, position(17, 7), location(itemUri, 5, 0, 7, 1));
  });
});
