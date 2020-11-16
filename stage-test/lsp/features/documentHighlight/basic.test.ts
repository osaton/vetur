import * as assert from 'assert';
import * as vscode from 'vscode';
import { showFile } from '../../../editorHelper';
import { position, sameLineRange } from '../../../util';
import { getDocUri } from '../../path';

describe('Should do documentHighlight', () => {
  const docUri = getDocUri('documentHighlight/basic.stage');

  it('shows highlights for <div> tags', async () => {
    await testHighlight(docUri, position(2, 6), [
      { kind: vscode.DocumentHighlightKind.Read, range: sameLineRange(2, 5, 8) },
      { kind: vscode.DocumentHighlightKind.Read, range: sameLineRange(2, 29, 32) }
    ]);
  });

  it('shows highlights for `_`', async () => {
    await testHighlight(docUri, position(7, 4), [
      { kind: vscode.DocumentHighlightKind.Write, range: sameLineRange(5, 10, 11) },
      { kind: vscode.DocumentHighlightKind.Text, range: sameLineRange(7, 4, 5) }
    ]);
  });
});

async function testHighlight(
  docUri: vscode.Uri,
  position: vscode.Position,
  expectedHighlights: vscode.DocumentHighlight[]
) {
  await showFile(docUri);

  const result = (await vscode.commands.executeCommand(
    'vscode.executeDocumentHighlights',
    docUri,
    position
  )) as vscode.DocumentHighlight[];

  expectedHighlights.forEach(eh => {
    assert.ok(result.some(h => isEqualHighlight(h, eh)));
  });

  function isEqualHighlight(h1: vscode.DocumentHighlight, h2: vscode.DocumentHighlight) {
    return h1.kind === h2.kind && h1.range.isEqual(h2.range);
  }
}
