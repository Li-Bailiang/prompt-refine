import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFileSync(join(root, file), 'utf8').replace(/\r\n/g, '\n');
const normalizeMarkdown = (value) => value.replace(/^>\s?/gm, '').replace(/\s+/g, ' ').trim();
const staleOpenAIReferences =
  /\bGPT-5\.[1-5]\b|\b(?:Thinking|Instant)\s+(?:mode|model|variant)\b|\bGPT-5\s*\((?:Thinking|Instant)\)/i;
const hasLeanPromptRule = (value) => {
  const normalized = normalizeMarkdown(value);
  return (
    /(?:^|[.!?]\s+)State each instruction once\./.test(normalized) &&
    /(?:^|[.!?]\s+)Keep examples only when they encode a product requirement or fix a measured gap\./.test(
      normalized,
    )
  );
};

test('OpenAI strategy conditionally applies current GPT-5.6 guidance', () => {
  const strategy = read('strategies/openai.md');
  const normalized = normalizeMarkdown(strategy);

  assert.match(strategy, /^# OpenAI GPT Prompt Strategy \(GPT-5\.6 guidance\)$/m);
  assert.match(normalized, /OpenAI GPT-family model/);
  assert.match(normalized, /Preserve the runtime's actual model identity/);
  assert.match(normalized, /only when the host identifies itself as GPT-5\.6/i);
  assert.match(strategy, /gpt-5\.6-sol/);
  assert.match(strategy, /gpt-5\.6-terra/);
  assert.match(strategy, /gpt-5\.6-luna/);
  assert.match(strategy, /prompt-guidance-gpt-5p6/);
  assert.doesNotMatch(strategy, staleOpenAIReferences);
});

test('stale OpenAI reference detector is limited to model and mode labels', () => {
  for (const stale of [
    'GPT-5.1',
    'gpt-5.2',
    'GPT-5.3',
    'GPT-5.4',
    'GPT-5.5',
    'Thinking mode',
    'instant model',
    'GPT-5 (Thinking)',
  ]) {
    assert.match(stale, staleOpenAIReferences);
  }
  for (const currentOrProse of [
    'GPT-5.6',
    'Section 5.1',
    'thinking about the answer',
    'instant feedback',
    'reasoning effort',
  ]) {
    assert.doesNotMatch(currentOrProse, staleOpenAIReferences);
  }
});

test('OpenAI strategy keeps prompts lean without deleting measured requirements', () => {
  const strategy = read('strategies/openai.md');

  assert.equal(hasLeanPromptRule(strategy), true);
});

test('lean prompt matcher tolerates wrapping and rejects reversed guidance', () => {
  assert.equal(
    hasLeanPromptRule(
      'State each instruction\nonce. Keep examples only when they encode a product\nrequirement or fix a measured gap.',
    ),
    true,
  );
  assert.equal(
    hasLeanPromptRule(
      'Do not state each instruction once. Keep every example, whether or not it addresses a measured gap.',
    ),
    false,
  );
});

test('OpenAI strategy defines completion and evidence-aware stop conditions', () => {
  const strategy = normalizeMarkdown(read('strategies/openai.md'));

  assert.match(strategy, /success criteria.{0,160}required evidence/i);
  assert.match(strategy, /stop when.{0,120}core request.{0,120}evidence/i);
  assert.match(strategy, /smallest missing (?:fact|field)/i);
});
