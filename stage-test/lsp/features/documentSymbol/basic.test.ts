import * as assert from 'assert';
import * as vscode from 'vscode';
import { showFile } from '../../../editorHelper';
import { range } from '../../../util';
import { getDocUri } from '../../path';

describe('Should do documentSymbol', () => {
  const docUri = getDocUri('documentSymbol/basic.stage');

  it('shows most documentSymbols', async () => {
    await testSymbol(docUri, [
      {
        name: 'template',
        kind: 7,
        range: range(0, 0, 14, 11),
        children: [
          {
            name: 'div.counter-wrapper',
            kind: 7,
            range: range(1, 2, 2, 8),
            children: []
          },
          {
            name: 'style',
            kind: 7,
            range: range(3, 2, 7, 10),
            children: [
              {
                name: '.counter-wrapper > *',
                kind: 4,
                range: range(4, 2, 6, 3),
                children: []
              }
            ]
          },
          {
            name: 'script',
            kind: 7,
            range: range(8, 2, 10, 11),
            children: [
              {
                name: 'foo',
                kind: 12,
                range: range(9, 10, 9, 21),
                children: []
              }
            ]
          },
          {
            name: 'stageFoo',
            kind: 12,
            range: range(12, 8, 12, 29),
            children: []
          }
        ]
      }
    ]);
  });

  // DocumentSymbol does not work correctly at the moment but good enough for now
  // Missing at least root node with file name and stageBlock support
  it.skip('shows all documentSymbols correctly', () => {
    // Should be something like
    /*
    await testSymbol(docUri, [
      {
        name: '"basic.stage"',
        kind: 7,
        range: range(0, 0, 21, 0),
        children: [
        {
          "name": "template",
          "kind": 7,
          "range": [
            {
              "line": 0,
              "character": 0
            },
            {
              "line": 7,
              "character": 11
            }
          ],
          "children": [
            { 
              "name": "stage-block",
              "kind": 7,
              "range:" [...],
              "children": [{
                "name": "stageStuff",
                "kind": 12,
                "range": [
                  {
                    "line": 2,
                    "character": 8
                  },
                  {
                    "line": 2,
                    "character": 27
                  }
                ],
                "children": []
              }]
            },
            {
              "name": "script",
              "kind": 7,
              "range": [
                {
                  "line": 4,
                  "character": 2
                },
                {
                  "line": 6,
                  "character": 11
                }
              ],
              "children": [
                {
                  "name": "scriptStuff",
                  "kind": 12,
                  "range": [
                    {
                      "line": 5,
                      "character": 10
                    },
                    {
                      "line": 5,
                      "character": 29
                    }
                  ],
                  "children": []
                }
              ]
            }
          ]
        }
      ]
      }
    ]);*/
  });
});

async function testSymbol(docUri: vscode.Uri, expectedSymbols: PartialDocumentSymbol[]) {
  await showFile(docUri);

  const result = (await vscode.commands.executeCommand(
    'vscode.executeDocumentSymbolProvider',
    docUri
  )) as vscode.DocumentSymbol[];

  const partialSymbols = result.map(convertToPartialDocumentSymbols);
  assertEqualSymbols(expectedSymbols, partialSymbols);
}

function assertEqualSymbols(expectedSymbols: PartialDocumentSymbol[], actualSymbols: PartialDocumentSymbol[]) {
  expectedSymbols.forEach((es, i) => {
    const as = actualSymbols[i];
    assert.equal(es.name, as.name);
    assert.equal(es.kind, as.kind);
    assert.deepStrictEqual(es.range, as.range);
    if (es.children && as.children) {
      assertEqualSymbols(es.children, as.children);
    }
  });
}

interface PartialDocumentSymbol {
  name: string;
  range: vscode.Range;
  kind: vscode.SymbolKind;
  children?: PartialDocumentSymbol[];
}

function convertToPartialDocumentSymbols(symbol: vscode.DocumentSymbol): PartialDocumentSymbol {
  const ps: PartialDocumentSymbol = {
    name: symbol.name,
    kind: symbol.kind,
    range: symbol.range
  };
  if (symbol.children) {
    ps.children = symbol.children.map(convertToPartialDocumentSymbols);
  }
  return ps;
}
