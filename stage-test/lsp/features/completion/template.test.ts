import { ConfigurationTarget, workspace } from 'vscode';
import { position } from '../../../util';
import { testCompletion } from '../../../completionHelper';
import { getDocUri } from '../../path';

describe('Should autocomplete for <template>', () => {
  const basicUri = getDocUri('completion/template/html.stage');

  it('completes html tags', async () => {
    await testCompletion(basicUri, position(1, 5), ['div']);
  });

  describe('Should autocomplete for <style>', () => {
    const basicUri = getDocUri('completion/template/style.stage');

    it('completes css properties for CSS', async () => {
      await testCompletion(basicUri, position(3, 5), ['width', 'word-wrap']);
    });
  });

  describe('Should autocomplete for <script>', () => {
    const basicUri = getDocUri('completion/template/script.stage');
    const multiScriptUri = getDocUri('completion/template/multipleScript.stage');

    it('completes DOM specific methods', async () => {
      await testCompletion(basicUri, position(3, 7), ['document']);
    });
    it('completes variables from previous script regions', async () => {
      await testCompletion(multiScriptUri, position(6, 20), ['test1']);
    });
  });

  describe('Should complete stage block (<% %>) sections', () => {
    const stageBlockUri = getDocUri('completion/template/stageBlock.stage');
    it('completes variables from other stage blocks', async () => {
      await testCompletion(stageBlockUri, position(6, 19), ['test1']);
    });

    it('completes imported variables from `require`', async () => {
      await testCompletion(stageBlockUri, position(5, 12), ['bar']);
    });
  });

  // todo: tests
  return;
  describe('Should complete <template> section', () => {
    it('completes directives such as v-if', async () => {
      await testCompletion(basicUri, position(1, 8), ['v-if', 'v-cloak']);
    });

    it('completes imported components', async () => {
      await testCompletion(basicUri, position(2, 6), ['item']);
    });

    it('completes event modifiers when attribute startsWith @', async () => {
      await testCompletion(basicUri, position(3, 17), ['stop', 'prevent', 'capture']);
    });

    it('completes event modifiers when attribute startsWith v-on', async () => {
      await testCompletion(basicUri, position(4, 21), ['stop', 'prevent', 'capture']);
    });

    it('completes key modifiers when keyEvent', async () => {
      await testCompletion(basicUri, position(5, 21), ['enter', 'space', 'right']);
    });

    it('completes system modifiers when keyEvent', async () => {
      await testCompletion(basicUri, position(6, 26), ['ctrl', 'shift', 'exact']);
    });

    it('completes mouse modifiers when MouseEvent', async () => {
      await testCompletion(basicUri, position(7, 19), ['left', 'right', 'middle']);
    });

    it('completes system modifiers when MouseEvent', async () => {
      await testCompletion(basicUri, position(8, 25), ['ctrl', 'shift', 'exact']);
    });

    it('completes prop modifiers when attribute startsWith :', async () => {
      await testCompletion(basicUri, position(9, 17), ['sync']);
    });

    it('completes prop modifiers when attribute startsWith v-bind', async () => {
      await testCompletion(basicUri, position(10, 23), ['sync']);
    });

    it('completes vModel modifiers when attribute startsWith v-model', async () => {
      await testCompletion(basicUri, position(11, 19), ['lazy', 'number', 'trim']);
    });

    it('completes modifiers when have attribute value', async () => {
      await testCompletion(basicUri, position(12, 19), ['stop', 'prevent', 'capture']);
    });
  });

  describe('Parent - Child component completion', () => {
    const parentUri = getDocUri('completion/template/childComponent/Parent.vue');

    it('completes tags/attributes for ChildComp', async () => {
      const c = workspace.getConfiguration();

      // test this in "vetur.completion.tagCasing": "initial"
      await c.update('vetur.completion.tagCasing', 'initial', ConfigurationTarget.Global);

      await testCompletion(parentUri, position(4, 6), ['ChildComp']);

      await testCompletion(parentUri, position(2, 15), [
        {
          label: ':attr-a',
          insertTextValue: ':attr-a="$1"'
        }
      ]);
      await testCompletion(parentUri, position(3, 16), [
        {
          label: ':attr-a',
          insertTextValue: 'attr-a="$1"'
        }
      ]);

      // set it back
      await c.update('vetur.completion.tagCasing', undefined, ConfigurationTarget.Global);
    });

    const parent1775Uri = getDocUri('completion/template/childComponent/Parent1775.vue');
    it('completes child when child `export default {}` ends with `;`', async () => {
      await testCompletion(parent1775Uri, position(1, 13), [':attr']);
    });

    const parent2143Uri = getDocUri('completion/template/childComponent/Parent2143.vue');
    it("completes child with some documentation when using simple props declaration `props: ['foo']`", async () => {
      await testCompletion(parent2143Uri, position(1, 9), [
        {
          label: ':foo',
          documentationFragment: `props: ['foo']`
        }
      ]);

      await testCompletion(parent2143Uri, position(1, 9), [
        {
          label: ':foo',
          documentationFragment: `my props documentation`
        }
      ]);
    });
  });
});
