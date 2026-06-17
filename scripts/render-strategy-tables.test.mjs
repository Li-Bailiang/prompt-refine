import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  loadManifest,
  renderReadmeTable,
  renderSkillTable,
} from './render-strategy-tables.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFileSync(join(root, file), 'utf8').replace(/\r\n/g, '\n');

test('strategy manifest renders the SKILL.md routing table', () => {
  const manifest = loadManifest();
  const table = renderSkillTable(manifest);

  assert.match(table, /\| GPT \/ GPT-5 \(OpenAI\) \| `strategies\/openai\.md` \|/);
  assert.match(table, /\| DeepSeek V4 \(\+ R1\) \| `strategies\/deepseek\.md` \|/);
  assert.ok(read('SKILL.md').includes(table));
});

test('strategy manifest renders consistent English and Chinese README tables', () => {
  const manifest = loadManifest();
  const enTable = renderReadmeTable(manifest, 'en');
  const zhTable = renderReadmeTable(manifest, 'zh');

  assert.ok(read('README.md').includes(enTable));
  assert.ok(read('README.en.md').includes(enTable));
  assert.ok(read('README.zh.md').includes(zhTable));
  assert.match(zhTable, /OpenAI GPT（GPT-5 系列）/);
  assert.match(zhTable, /DeepSeek V4（含 R1）/);
});

test('strategy manifest includes Perplexity as a source-grounded model family', () => {
  const manifest = loadManifest();
  const perplexity = manifest.find((entry) => entry.id === 'perplexity');

  assert.ok(perplexity);
  assert.equal(perplexity.file, 'strategies/perplexity.md');
  assert.match(perplexity.sourceEn, /Perplexity/i);
});

test('strategy manifest includes Kimi as an official model family', () => {
  const manifest = loadManifest();
  const kimi = manifest.find((entry) => entry.id === 'kimi');

  assert.ok(kimi);
  assert.equal(kimi.file, 'strategies/kimi.md');
  assert.match(kimi.sourceEn, /Kimi/i);
});

test('strategy manifest includes Z.ai GLM as an official model family', () => {
  const manifest = loadManifest();
  const glm = manifest.find((entry) => entry.id === 'zai-glm');

  assert.ok(glm);
  assert.equal(glm.file, 'strategies/zai-glm.md');
  assert.match(glm.sourceEn, /Z\.ai|GLM/i);
});

test('strategy manifest includes MiniMax as an official model family', () => {
  const manifest = loadManifest();
  const minimax = manifest.find((entry) => entry.id === 'minimax');

  assert.ok(minimax);
  assert.equal(minimax.file, 'strategies/minimax.md');
  assert.match(minimax.sourceEn, /MiniMax/i);
});

test('strategy manifest includes AI21 Jamba as an official model family', () => {
  const manifest = loadManifest();
  const ai21 = manifest.find((entry) => entry.id === 'ai21-jamba');

  assert.ok(ai21);
  assert.equal(ai21.file, 'strategies/ai21-jamba.md');
  assert.match(ai21.sourceEn, /AI21|Jamba/i);
});

test('AI21 Jamba strategy preserves current endpoint and JSON-mode guidance', () => {
  const text = read('strategies/ai21-jamba.md');

  assert.match(text, /jamba-large/);
  assert.match(text, /jamba-mini/);
  assert.match(text, /JSON mode/i);
});
