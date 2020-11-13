import * as vscode from 'vscode';
import { DiagnosticTag } from 'vscode-languageclient';
import { sameLineRange } from '../../../util';
import { testDiagnostics } from '../../../diagnosticHelper';
import { getDocUri } from '../../path';

describe('Should find diagnostics for unused variables', () => {
  // todo: tests
  const docUri = getDocUri('diagnostics/unused.stage');

  it('shows diagnostic errors for unused variables', async () => {
    const expectedDiagnostics: vscode.Diagnostic[] = [
      {
        severity: vscode.DiagnosticSeverity.Error,
        message: "'lodash' is declared but its value is never read.",
        range: sameLineRange(2, 8, 14),
        tags: [DiagnosticTag.Unnecessary]
      },
      {
        severity: vscode.DiagnosticSeverity.Error,
        message: "'foo' is declared but its value is never read.",
        range: sameLineRange(3, 8, 11),
        tags: [DiagnosticTag.Unnecessary]
      }
    ];

    await testDiagnostics(docUri, expectedDiagnostics);
  });
});
