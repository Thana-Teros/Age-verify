import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const script = await readFile(new URL('../age-verify.js', import.meta.url), 'utf8');
const entrypoint = await readFile(new URL('../entrypoint.sh', import.meta.url), 'utf8');
const dockerfile = await readFile(new URL('../Dockerfile', import.meta.url), 'utf8');
const nginxMain = await readFile(new URL('../nginx-main.conf', import.meta.url), 'utf8');

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
  assert.match(entrypoint, /target=\/tmp\/age-verify\.js/);
  assert.match(entrypoint, /umask 077/);
  assert.match(entrypoint, /mkdir -p[\s\\]+\/tmp\/nginx\/client_temp/);
});

test('the image stays rootless and writes only to its temporary filesystem', () => {
  assert.match(dockerfile, /USER nginx/);
  assert.match(nginxMain, /pid \/tmp\/nginx\.pid/);
  assert.match(nginxMain, /client_body_temp_path \/tmp\/nginx\/client_temp/);
});
