import * as assert from 'assert';
import * as vscode from 'vscode';
import { showFile } from '../../../editorHelper';
import { sameLineRange } from '../../../util';
import { getDocUri } from '../../path';

describe('Should do documentLink', () => {
  // todo: tests
  const docUri = getDocUri('documentLink/basic.stage');

  it('shows all documentLinks for basic.stage', async () => {
    await testLink(docUri, [
      { target: vscode.Uri.parse('https://www.foo.com/img.jpg'), range: sameLineRange(2, 14, 41) },
      { target: getDocUri('documentLink/foo'), range: sameLineRange(3, 13, 18) }
    ]);
  });
});

async function testLink(docUri: vscode.Uri, expectedLinks: vscode.DocumentLink[]) {
  await showFile(docUri);

  const result = (await vscode.commands.executeCommand('vscode.executeLinkProvider', docUri)) as vscode.DocumentLink[];

  expectedLinks.forEach(el => {
    assert.ok(
      result.some(l => isEqualLink(l, el)),
      `Failed to find same link as ${el.target!.fsPath}. Seen links are:\n${JSON.stringify(result, null, 2)}`
    );
  });

  function isEqualLink(h1: vscode.DocumentLink, h2: vscode.DocumentLink) {
    return h1.target!.fsPath === h2.target!.fsPath && h1.range.isEqual(h2.range);
  }
}
