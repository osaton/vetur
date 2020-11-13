import { testNoDiagnostics } from '../../../diagnosticHelper';
import { getDocUri } from '../../path';

describe('Should find no error when <script> or <% %> is not present', () => {
  // todo: tests
  const docUri = getDocUri('diagnostics/noScriptRegion.stage');

  it('shows no diagnostics error for component without <script> or <% %> region', async () => {
    await testNoDiagnostics(docUri);
  });
});
