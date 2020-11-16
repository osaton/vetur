import * as vscode from 'vscode';
import { DiagnosticTag } from 'vscode-languageclient';
import { range, sameLineRange } from '../../../util';
import { testDiagnostics } from '../../../diagnosticHelper';
import { getDocUri } from '../../path';

describe('Should find common diagnostics for all regions', () => {
  const docUri = getDocUri('diagnostics/basic.stage');

  it('shows diagnostic errors for stage block (<% %>) region', async () => {
    const expectedDiagnostics: vscode.Diagnostic[] = [
      {
        range: sameLineRange(4, 11, 14),
        severity: vscode.DiagnosticSeverity.Error,
        message: "Argument of type '\"5\"' is not assignable to parameter of type 'number'"
      },
      {
        range: sameLineRange(6, 8, 11),
        severity: vscode.DiagnosticSeverity.Error,
        message: "'not' is declared but its value is never read.",
        tags: [DiagnosticTag.Unnecessary]
      },
      {
        range: sameLineRange(6, 22, 35),
        severity: vscode.DiagnosticSeverity.Error,
        message: "Cannot find module './not-found' or its corresponding type declarations."
      },
      {
        range: sameLineRange(8, 2, 19),
        severity: vscode.DiagnosticSeverity.Error,
        message: "Cannot find name 'undefinedVariable'."
      }
    ];

    await testDiagnostics(docUri, expectedDiagnostics);
  });
});
