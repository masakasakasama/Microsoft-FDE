import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const sandbox = { window: {} };
vm.runInNewContext(readFileSync(new URL('../progress-validation.js', import.meta.url), 'utf8'), sandbox);
const parse = sandbox.window.FTE_PROGRESS.parse;
const fixture = () => ({ v: 1, answered: { q1: { correct: true, streak: 2, lastSelected: 1 } },
  modules: { 'gh300:0': true }, mock: { gh300: { score: 80, total: 20 } }, target: { gh300: '2026-11-01' } });
test('valid existing v1 backups retain answers modules mock results and targets', () => {
  const value = fixture();
  assert.equal(JSON.stringify(parse(value)), JSON.stringify(value));
  assert.equal(JSON.stringify(value), JSON.stringify(fixture()));
});
test('malformed imports cannot replace usable progress maps', () => {
  for (const value of [null, [], { v: 1 }, { ...fixture(), answered: null }, { ...fixture(), modules: [] },
    { ...fixture(), answered: { q1: { correct: 'yes' } } }, { ...fixture(), mock: { gh300: { score: 150 } } }]) {
    assert.throws(() => parse(value));
  }
});
test('unrecognized top-level data does not overwrite app internals', () => {
  assert.equal(parse({ ...fixture(), unexpected: 'ignored' }).unexpected, undefined);
});
