const rimraf = require('rimraf');
const { ncp } = require('ncp');
const { ensureDirSync } = require('fs-extra');

const PDIR = 'stage-server/dist/modes/stage';
const DIR = 'stage-server/dist/modes/stage/stageSnippets';

// Create parent dir and ensure clean snippet dir
ensureDirSync(PDIR);
rimraf.sync(DIR);

ncp('stage-server/src/modes/stage/stageSnippets', 'stage-server/dist/modes/stage/stageSnippets');
