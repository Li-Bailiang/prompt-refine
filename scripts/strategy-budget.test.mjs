import test from 'node:test';
import assert from 'node:assert/strict';
import { measureStrategy } from './strategy-budget.mjs';

test('strategy budgets are independent of checkout line endings', () => {
  const lf = '# Strategy\n\nOne rule.\n';
  const expected = { chars: lf.length, lines: 4 };

  assert.deepEqual(measureStrategy(lf), expected);
  assert.deepEqual(measureStrategy(lf.replaceAll('\n', '\r\n')), expected);
  assert.deepEqual(measureStrategy(lf.replaceAll('\n', '\r')), expected);
});
