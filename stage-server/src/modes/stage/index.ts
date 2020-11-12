import { LanguageMode } from '../../embeddedSupport/languageModes';
import { SnippetManager, ScaffoldSnippetSources } from './snippets';
import { Range } from 'vscode-css-languageservice';

export function getStageMode(workspacePath: string, globalSnippetDir?: string): LanguageMode {
  let config: any = {};

  const snippetManager = new SnippetManager(workspacePath, globalSnippetDir);
  const scaffoldSnippetSources: ScaffoldSnippetSources = {
    workspace: '💼',
    user: '🗒️',
    stage: '✌'
  };

  return {
    getId() {
      return 'stage';
    },
    configure(c) {
      config = c;
      /*if (c.vetur.completion['scaffoldSnippetSources']) {
        scaffoldSnippetSources = c.vetur.completion['scaffoldSnippetSources'];
      }*/
    },
    doComplete(document, position) {
      if (
        scaffoldSnippetSources['workspace'] === '' &&
        scaffoldSnippetSources['user'] === '' &&
        scaffoldSnippetSources['stage'] === ''
      ) {
        return { isIncomplete: false, items: [] };
      }

      const offset = document.offsetAt(position);
      const lines = document.getText().slice(0, offset).split('\n');
      const currentLine = lines[position.line];

      const items = snippetManager ? snippetManager.completeSnippets(scaffoldSnippetSources) : [];

      // If a line starts with `<`, it's probably a starting region tag that can be wholly replaced
      if (currentLine.length > 0 && currentLine.startsWith('<')) {
        const replacementRange = Range.create(
          document.positionAt(offset - currentLine.length),
          document.positionAt(offset)
        );
        items.forEach(i => {
          if (i.insertText) {
            i.textEdit = {
              newText: i.insertText,
              range: replacementRange
            };
          }
        });
      }

      return {
        isIncomplete: false,
        items
      };
    },
    onDocumentRemoved() {},
    dispose() {}
  };
}
