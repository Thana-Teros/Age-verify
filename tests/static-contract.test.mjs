import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const script = await readFile(new URL('../age-verify.js', import.meta.url), 'utf8');
const entrypoint = await readFile(new URL('../entrypoint.sh', import.meta.url), 'utf8');

test('the browser code treats configurable copy as text, not HTML', () => {
  assert.doesNotMatch(script, /\.innerHTML\s*=/);
  assert.match(script, /\.textContent\s*=/);
  assert.match(script, /information barrier/);
});

test('the entrypoint serializes configuration without sed interpolation', () => {
  assert.doesNotMatch(entrypoint, /sed\s+-i/);
  assert.match(entrypoint, /base64_value/);
  assert.match(entrypoint, /valid_http_url/);
  assert.match(entrypoint, /valid_age/);
});
