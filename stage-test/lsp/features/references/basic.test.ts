import * as assert from 'assert';
import * as vscode from 'vscode';
import { showFile } from '../../../editorHelper';
import { location, position, sameLineLocation } from '../../../util';
import { getDocUri } from '../../path';

describe('Should find references', () => {
  const docUri = getDocUri('references/basic.stage');

  it('finds references for lodash', async () => {
    const lodashDtsUri = getDocUri('node_modules/@types/lodash/index.d.ts');
    await testReferences(docUri, position(2, 8), [
      location(docUri, 2, 14, 2, 15),
      sameLineLocation(lodashDtsUri, 243, 9, 10),
      sameLineLocation(lodashDtsUri, 246, 12, 13)
    ]);
  });
});

async function testReferences(docUri: vscode.Uri, position: vscode.Position, expectedLocations: vscode.Location[]) {
  await showFile(docUri);

  const result = (await vscode.commands.executeCommand(
    'vscode.executeReferenceProvider',
    docUri,
    position
  )) as vscode.Location[];

  expectedLocations.forEach(el => {
    assert.ok(
      result.some(l => {
        return l.range.isEqual(el.range) && l.uri.fsPath === el.uri.fsPath;
      })
    );
  });
}
