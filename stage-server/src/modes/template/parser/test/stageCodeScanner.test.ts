import { StageCodeScanner } from '../stageCodeScanner';
import * as assert from 'assert';

function compare(result: any, expected: any) {
  assert.strictEqual(JSON.stringify(result), JSON.stringify(expected));
}
suite('stageCodeScanner', () => {
  test('Localisation block type', () => {
    const scanner = new StageCodeScanner(`<%@ 'test' %>`);
    const res = scanner.findAll();
    compare(res, [
      {
        languageId: 'stage-javascript',
        start: 0,
        type: 'stage-block',
        stageBlockType: 'localisation',
        contentStart: 3,
        contentEnd: 11,
        end: 13
      }
    ]);
  });
  test('Output-safe block type', () => {
    const scanner = new StageCodeScanner(`<%= 'test' %>`);
    const res = scanner.findAll();

    compare(res, [
      {
        languageId: 'stage-javascript',
        start: 0,
        type: 'stage-block',
        stageBlockType: 'output-safe',
        contentStart: 3,
        contentEnd: 11,
        end: 13
      }
    ]);
  });
  test('Output block type', () => {
    const scanner = new StageCodeScanner(`<%+ 'test' %>`);
    const res = scanner.findAll();

    compare(res, [
      {
        languageId: 'stage-javascript',
        start: 0,
        type: 'stage-block',
        stageBlockType: 'output',
        contentStart: 3,
        contentEnd: 11,
        end: 13
      }
    ]);
  });
  test('Code block type', () => {
    const scanner = new StageCodeScanner(`<% function foo() { const x = () => {}; const y = x; } %>`);
    const res = scanner.findAll();
    compare(res, [
      {
        languageId: 'stage-javascript',
        start: 0,
        type: 'stage-block',
        stageBlockType: 'code',
        contentStart: 2,
        contentEnd: 55,
        end: 57
      }
    ]);
  });

  test('should work with arrow functions', () => {
    const scanner = new StageCodeScanner(`<% function foo() { const x = () => {}; const y = x; } %>`);
    const res = scanner.findAll();
    compare(res, [
      {
        languageId: 'stage-javascript',
        start: 0,
        type: 'stage-block',
        stageBlockType: 'code',
        contentStart: 2,
        contentEnd: 55,
        end: 57
      }
    ]);
  });

  test('Multiple blocks', () => {
    const scanner = new StageCodeScanner(`<template><div>
<%@ 'test'; %></div>
<script> const test = 'joo'; <%
  'tst2' 
%></script>
<%+ 'test2'; %>
<%= 'test2' %>
</template>`);
    const res = scanner.findAll();

    assert.strictEqual(res.length, 4);
    compare(res, [
      {
        languageId: 'stage-javascript',
        start: 16,
        type: 'stage-block',
        stageBlockType: 'localisation',
        contentStart: 19,
        contentEnd: 28,
        end: 30
      },
      {
        languageId: 'stage-javascript',
        start: 66,
        type: 'stage-block',
        stageBlockType: 'code',
        contentStart: 68,
        contentEnd: 79,
        end: 81
      },
      {
        languageId: 'stage-javascript',
        start: 91,
        type: 'stage-block',
        stageBlockType: 'output',
        contentStart: 94,
        contentEnd: 104,
        end: 106
      },
      {
        languageId: 'stage-javascript',
        start: 107,
        type: 'stage-block',
        stageBlockType: 'output-safe',
        contentStart: 110,
        contentEnd: 119,
        end: 121
      }
    ]);
  });
});
