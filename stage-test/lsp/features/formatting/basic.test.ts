import * as assert from 'assert';
import * as fs from 'fs';
import * as vscode from 'vscode';
import { showFile, setEditorContent } from '../../../editorHelper';
import { getDocPath, getDocUri } from '../../path';

describe('Should format', () => {
  const fixturePath = getDocPath('formatting');
  const cases = fs
    .readdirSync(fixturePath)
    .filter(s => !s.includes('expected'))
    .map(s => s.slice(0, -'.stage'.length));

  it.skip('should format templates', () => {
    // This is better done as a custom plugin for prettier if there actually is need for it
  });

  /*
  for (let i = 0; i < cases.length; i++) {
    it(`formats ${cases[i]}.stage`, async () => {
      await testFormat(getDocUri(`formatting/${cases[i]}.stage`), getDocUri(`formatting/${cases[i]}.expected.stage`));
    });
  }*/
});

async function testFormat(docUri: vscode.Uri, expectedDocUri: vscode.Uri) {
  const editor = await showFile(docUri);
  const oldContent = editor.document.getText();

  const result = (await vscode.commands.executeCommand('vscode.executeFormatDocumentProvider', docUri, {
    tabSize: 2,
    insertSpaces: true
  })) as vscode.TextEdit[];

  if (result) {
    await editor.edit(b => result.forEach(f => b.replace(f.range, f.newText)));
  }

  const expected = await readFileAsync(expectedDocUri.fsPath);

  assert.equal(editor.document.getText(), expected);

  await setEditorContent(editor, oldContent);
}

function readFileAsync(path: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}
