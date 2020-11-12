import { position } from '../../../util';
import { testCompletion } from '../../../completionHelper';
import { getDocUri } from '../../path';

describe('Emmet', () => {
  const basicUri = getDocUri('completion/template/Emmet.stage');

  describe('Should do emmet in html region', () => {
    it('Should do emmet right after <% %>', async () => {
      await testCompletion(basicUri, position(3, 5), [
        {
          label: 'p',
          detail: 'Emmet Abbreviation',
          documentationStart: '<p>|</p>'
        }
      ]);
    });

    it('Should do emmet inside style="|"', async () => {
      await testCompletion(basicUri, position(1, 15), [
        {
          label: 'padding: ;',
          detail: 'Emmet Abbreviation',
          documentationStart: 'padding: |;'
        }
      ]);
    });

    it('Should complete at template root level', async () => {
      await testCompletion(basicUri, position(5, 4), [
        {
          label: 'abbr',
          detail: 'Emmet Abbreviation',
          documentationStart: '<abbr title="|">|</abbr>'
        }
      ]);
    });
  });

  describe('Should do emmet in style region', () => {
    it('Should complete in style region', async () => {
      await testCompletion(basicUri, position(8, 7), [
        {
          label: 'padding: ;',
          detail: 'Emmet Abbreviation',
          documentationStart: 'padding: |;'
        }
      ]);
    });
  });
});
