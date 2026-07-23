import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFileSync(join(root, file), 'utf8').replace(/\r\n/g, '\n');
const normalizeMarkdown = (value) => value.replace(/^>\s?/gm, '').replace(/\s+/g, ' ').trim();
const staleOpenAIFraming = [
  /\bGPT-5 family\s*(?:—|-|:)\s*5\.1\s*\/\s*5\.2\s*\/\s*5\.5\b/i,
  /\bReasoning\s*\(\s*["']?Thinking["']?\s*\)\s+variants?\b/i,
  /\b(?:current|latest)\s+(?:OpenAI\s+)?(?:GPT\s+)?(?:model|family)\s+(?:is|remains|uses)\s+GPT-5\.[1-5]\b/i,
];
const hasStaleOpenAIFraming = (value) =>
  staleOpenAIFraming.some((pattern) => pattern.test(normalizeMarkdown(value)));
const hasAuditedLeanCopy = (value) => {
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
  assert.equal(hasStaleOpenAIFraming(strategy), false);
});

test('stale OpenAI framing detector catches the removed current-model claims', () => {
  for (const stale of [
    'You are running as an OpenAI GPT model (GPT-5 family — 5.1 / 5.2 / 5.5).',
    'Reasoning ("Thinking") variants reason on their own.',
    'The current OpenAI model is GPT-5.5.',
  ]) {
    assert.equal(hasStaleOpenAIFraming(stale), true);
  }
  for (const historicalOrProse of [
    'Migrating from GPT-5.5 or GPT-5.4 to GPT-5.6 requires prompt review.',
    'Section 5.1',
    'thinking about the answer',
    'instant feedback',
    'reasoning effort',
  ]) {
    assert.equal(hasStaleOpenAIFraming(historicalOrProse), false);
  }
});

test('OpenAI strategy retains the audited lean-prompt copy contract', () => {
  const strategy = read('strategies/openai.md');

  assert.equal(hasAuditedLeanCopy(strategy), true);
});

test('audited lean copy matcher tolerates wrapping and rejects reversed guidance', () => {
  assert.equal(
    hasAuditedLeanCopy(
      'State each instruction\nonce. Keep examples only when they encode a product\nrequirement or fix a measured gap.',
    ),
    true,
  );
  assert.equal(
    hasAuditedLeanCopy(
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
