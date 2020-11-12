import { position } from '../../../util';
import { testCompletion } from '../../../completionHelper';
import { getDocUri } from '../../path';

describe('Should autocomplete scaffold snippets', () => {
  const scriptDocUri = getDocUri('completion/script/Scaffold.stage');

  it('completes all scaffold snippets', async () => {
    await testCompletion(scriptDocUri, position(0, 1), ['<template> html.stage ✌']);
  });
});
