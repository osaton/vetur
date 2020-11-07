import { TextDocument } from 'vscode-languageserver-types';
import * as assert from 'assert';
import { parseDocumentParts, parsePartRegions } from '../documentRegionParser';
import { getSingleLanguageDocument, getSingleTypeDocument, getLanguageRangesOfType } from '../embeddedSupport';

suite('New Embedded Support', () => {
  const src = `
<template>
  <div>{{test}}</div>
  <script>const var1 = '1'</script>
  <div>2</div>
  <script>const var2 = '2'</script>
  <style>.class {}</style>
  <template>template</template>
  <div>last</div>
</template>
<template lang="query">
  SELECT * FROM <%+ 'table '%>
  WHERE pid > <%= some.value %>
</template>
<template>  
  <div>_2</div>
  <% test %>
  <style>.class_2 {}</style>
</template>
`;
  const srcStageCode = `<template><div>
<% 'test'; %></div>
<script> const test = 'joo'; <% 'tst2' %></script>
<%+ 'test2'; %>
</template>`;

  const complexStageCode = `<template><div class="<%= 'test' %>">
<% 'test';%></div>
<%+ 'test2'; %>
<script><% 'test' %></script>
text<% 'test' %>
<style><%+ 'test' %></style>
<script type="<%= 'text' %>">const test = '';</script>
<style data-param="<%= 'stuff' %>"> .class {} </style>
</template>`;

  test('Basic parts', () => {
    const { parts } = parseDocumentParts(TextDocument.create('test://test.stage', 'stage', 0, src));

    assert.equal(parts[0].languageId, 'stage-html');
    assert.equal(parts[1].languageId, 'query');
    assert.equal(parts[2].languageId, 'stage-html');
  });

  test('Basic regions', () => {
    const { parts } = parseDocumentParts(TextDocument.create('test://test.stage', 'stage', 0, src));

    const langs = ['html', 'javascript', 'html', 'javascript', 'html', 'css', 'html'];

    const regionLangs = parts[0].regions.map(region => region.languageId);
    assert.equal(JSON.stringify(regionLangs), JSON.stringify(langs));
  });

  test('Stage code region', () => {
    let doc = TextDocument.create('test://test.stage', 'stage', 0, srcStageCode);
    let { parts } = parseDocumentParts(doc);
    let langs = ['html', 'stage-code', 'html', 'javascript', 'stage-code', 'html', 'stage-code', 'html'];

    let regionLangs = parts[0].regions.map(region => region.languageId);
    assert.equal(JSON.stringify(regionLangs), JSON.stringify(langs));

    doc = TextDocument.create('test://test.stage', 'stage', 0, complexStageCode);
    const res = parseDocumentParts(doc);
    parts = res.parts;
    langs = [
      'html',
      'stage-code',
      'html',
      'stage-code',
      'html',
      'stage-code',
      'html',
      'stage-code',
      'html',
      'stage-code',
      'html',
      'stage-code',
      'html',
      'stage-code',
      'html',
      'javascript',
      'html',
      'stage-code',
      'html',
      'css',
      'html'
    ];

    regionLangs = parts[0].regions.map(region => region.languageId);
    assert.equal(JSON.stringify(regionLangs), JSON.stringify(langs));
  });

  test('Get Single Part Language Document', () => {
    const doc = TextDocument.create('test://test.stage', 'stage', 0, complexStageCode);
    const { parts } = parseDocumentParts(doc);
    const newDoc = getSingleLanguageDocument(doc, parts[0].regions, 'html');
    const htmlSrc =
      '<div class="             ">\n' +
      '            </div>\n' +
      '               \n' +
      '<script>            </script>\n' +
      'text            \n' +
      '<style>             </style>\n' +
      '<script type="             ">                </script>\n' +
      '<style data-param="              ">           </style>';

    assert.equal(doc.getText().length, newDoc.getText().length);
    assert.equal(newDoc.getText().trim(), htmlSrc);
  });

  test('Get Single part `stage-code` Document', () => {
    const doc = TextDocument.create('test://test.stage', 'stage', 0, srcStageCode);
    const { parts } = parseDocumentParts(doc);
    const newDoc = getSingleLanguageDocument(doc, parts[0].regions, 'stage-code');
    const htmlSrc = `'test';         
                                'tst2'            
    'test2'; ;`;

    assert.equal(doc.getText().length, newDoc.getText().length);
    assert.equal(newDoc.getText().trim(), htmlSrc);
  });

  /*
  test('Get Single RegionType Document', () => {
    const doc = TextDocument.create('test://test.stage', 'stage', 0, src);
    const { regions } = parseDocumentRegions(doc);

    const newDoc = getSingleTypeDocument(doc, regions, 'script');
    const jsSrc = `export default {
}`;
    assert.equal(doc.getText().length, newDoc.getText().length);
    assert.equal(newDoc.getText().trim(), jsSrc);
  });

  test('Get Ranges of Type', () => {
    const doc = TextDocument.create('test://test.stage', 'stage', 0, src);
    const { regions } = parseDocumentRegions(doc);

    const ranges = getLanguageRangesOfType(doc, regions, 'script');

    assert.equal(ranges.length, 1);
    assert.equal(ranges[0].languageId, 'javascript');
  });
});

suite('Double language blocks', () => {
  test('Basic', () => {
    const src = `
<template>

</template>

<style>
</style>

<style>
</style>
`;

    const { regions } = parseDocumentRegions(TextDocument.create('test://test.stage', 'stage', 0, src));

    assert.equal(regions[0].languageId, 'vue-html');
    assert.equal(regions[1].languageId, 'css');
    assert.equal(regions[2].languageId, 'css');
  });

  test('Double scss', () => {
    const src = `
<template>

</template>

<style lang="scss">
</style>

<style lang="scss">
</style>
`;

    const { regions } = parseDocumentRegions(TextDocument.create('test://test.stage', 'stage', 0, src));

    assert.equal(regions[0].languageId, 'vue-html');
    assert.equal(regions[1].languageId, 'scss');
    assert.equal(regions[2].languageId, 'scss');
  });

  test('Two langs for two styles block', () => {
    const src = `
<template>

</template>

<style lang="scss">
</style>

<style lang="stylus">
</style>
`;

    const { regions } = parseDocumentRegions(TextDocument.create('test://test.stage', 'stage', 0, src));

    assert.equal(regions[0].languageId, 'vue-html');
    assert.equal(regions[1].languageId, 'scss');
    assert.equal(regions[2].languageId, 'stylus');
  });
});

suite('External Source', () => {
  const src = `
<template>

</template>

<script src="./external.js">
</script>
`;

  test('Get Script Src', () => {
    const { importedScripts } = parseDocumentRegions(TextDocument.create('test://test.stage', 'stage', 0, src));

    assert.equal(importedScripts[0], './external.js');
  });
});

suite('Template region positions', () => {
  const htmlSrc = `
<template>
  <p>Test</p>
</template>
`;

  test('vue-html region positions', () => {
    const { regions } = parseDocumentRegions(TextDocument.create('test://test.stage', 'stage', 0, htmlSrc));

    assert.equal(regions[0].languageId, 'vue-html');
    assert.equal(
      htmlSrc.slice(regions[0].start, regions[0].end),
      [
        // prettier-ignore
        '',
        '  <p>Test</p>',
        ''
      ].join('\n')
    );
  });

  const pugSrc = `
<template lang="pug">
p Test
</template>
`;

  test('pug region positions', () => {
    const { regions } = parseDocumentRegions(TextDocument.create('test://test.stage', 'stage', 0, pugSrc));

    assert.equal(regions[0].languageId, 'pug');
    assert.equal(
      pugSrc.slice(regions[0].start, regions[0].end),
      [
        // prettier-ignore
        '',
        'p Test',
        ''
      ].join('\n')
    );
  });
});

suite('Embedded <template> ', () => {
  const htmlSrc = `
<template>
  <template>
    <p>Test</p>
  </template>
</template>
`;
  test('vue-html region positions', () => {
    const { regions } = parseDocumentRegions(TextDocument.create('test://test.stage', 'stage', 0, htmlSrc));

    assert.equal(regions[0].languageId, 'vue-html');
    assert.equal(
      htmlSrc.slice(regions[0].start, regions[0].end),
      [
        // prettier-ignore
        '',
        '  <template>',
        '    <p>Test</p>',
        '  </template>',
        ''
      ].join('\n')
    );
  });
  */
});
