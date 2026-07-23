import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const CORPUS_PATH = new URL('../eval/prompts.openai-gpt56.jsonl', import.meta.url);
const REQUIRED_CATEGORIES = new Set([
  'clear_task',
  'vague_task',
  'read_only_review',
  'authorized_local_change',
  'external_write',
  'retrieval_evidence',
  'output_length',
  'long_task',
  'codex_verification',
  'visual_deliverable',
]);

function loadCorpus() {
  return readFileSync(CORPUS_PATH, 'utf8')
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

test('GPT-5.6 review corpus covers the audited strategy contracts', () => {
  const cases = loadCorpus();
  const ids = new Set();
  const categories = new Set();

  assert.ok(cases.length >= 8 && cases.length <= 10);

  for (const item of cases) {
    assert.match(item.id, /^gpt56-/);
    assert.ok(!ids.has(item.id), `duplicate id: ${item.id}`);
    ids.add(item.id);

    assert.ok(['en', 'zh'].includes(item.lang), `${item.id}: unsupported language`);
    assert.equal(typeof item.domain, 'string');
    assert.ok(item.domain.trim(), `${item.id}: domain is empty`);
    assert.equal(typeof item.prompt, 'string');
    assert.ok(item.prompt.trim(), `${item.id}: prompt is empty`);
    assert.ok(REQUIRED_CATEGORIES.has(item.category), `${item.id}: unknown category`);
    categories.add(item.category);

    for (const field of ['expected_behaviors', 'forbidden_behaviors']) {
      assert.ok(Array.isArray(item[field]) && item[field].length > 0, `${item.id}: ${field} is empty`);
      assert.ok(item[field].every((value) => typeof value === 'string' && value.trim()));
    }
  }

  assert.deepEqual(categories, REQUIRED_CATEGORIES);
});
