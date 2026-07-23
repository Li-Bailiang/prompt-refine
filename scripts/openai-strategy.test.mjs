import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFileSync(join(root, file), 'utf8').replace(/\r\n/g, '\n');

test('OpenAI strategy targets the current GPT-5.6 family', () => {
  const strategy = read('strategies/openai.md');

  assert.match(strategy, /^# OpenAI GPT-5\.6 Prompt Strategy/m);
  assert.match(strategy, /gpt-5\.6-sol/);
  assert.match(strategy, /gpt-5\.6-terra/);
  assert.match(strategy, /gpt-5\.6-luna/);
  assert.match(strategy, /prompt-guidance-gpt-5p6/);
  assert.doesNotMatch(strategy, /5\.1\s*\/\s*5\.2\s*\/\s*5\.5/);
  assert.doesNotMatch(strategy, /\b(?:Thinking|Instant)\b/);
});
