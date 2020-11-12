import { position } from '../../../util';
import { testCompletion } from '../../../completionHelper';
import { getDocUri } from '../../path';

describe('Should autocomplete scaffold snippets', () => {
  // todo: tests
  return;
  const scriptDocUri = getDocUri('completion/script/Scaffold.vue');

  it('completes all scaffold snippets', async () => {
    await testCompletion(scriptDocUri, position(0, 1), [
      '<vue> with default.vue ✌',
      '<template> html.vue ✌',
      '<template> pug.vue ✌',
      '<style> css-scoped.vue ✌',
      '<style> css.vue ✌',
      '<style> less-scoped.vue ✌',
      '<style> less.vue ✌',
      '<style> postcss-scoped.vue ✌',
      '<style> postcss.vue ✌',
      '<style> sass-scoped.vue ✌',
      '<style> sass.vue ✌',
      '<style> scss-scoped.vue ✌',
      '<style> scss.vue ✌',
      '<style> stylus-scoped.vue ✌',
      '<style> stylus.vue ✌',
      '<script> javascript.vue ✌',
      '<script> typescript.vue ✌'
    ]);
  });

  it('completes project wide scaffold snippets', async () => {
    await testCompletion(scriptDocUri, position(0, 1), [
      {
        label: '<vue> with foo.vue 💼'
      }
    ]);
  });
});
