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

test('OpenAI strategy keeps prompts lean without deleting measured requirements', () => {
  const strategy = read('strategies/openai.md');

  assert.match(strategy, /state\s+each instruction once/i);
  assert.match(strategy, /examples?.*(?:product requirement|measured gap)/i);
});

test('OpenAI strategy defines completion and evidence-aware stop conditions', () => {
  const strategy = read('strategies/openai.md');

  assert.match(strategy, /success criteria[\s\S]{0,160}required\s+evidence/i);
  assert.match(strategy, /stop when[\s\S]{0,120}core request[\s\S]{0,120}evidence/i);
  assert.match(strategy, /smallest missing (?:fact|field)/i);
});
