import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

test('hardened skill makes DESIGN.md authoritative without automatic execution', () => {
  const source = read('skill/SKILL.src.md');
  const hermes = read('.hermes/skills/impeccable/SKILL.md');

  for (const [name, text] of [['source', source], ['hermes', hermes]]) {
    assert.match(text, /Safe mode — default in this fork/, `${name} must declare safe mode`);
    assert.match(text, /DESIGN\.md is authoritative/, `${name} must make DESIGN.md authoritative`);
    assert.match(text, /No automatic execution from this skill/, `${name} must block implicit execution`);
    assert.match(text, /Hooks are off by default|Hooks are \*\*disabled by default/, `${name} must default hooks off`);
    assert.match(text, /shape.*critique.*audit.*polish.*harden.*adapt/s, `${name} must preserve six-pass review`);
  }

  assert.doesNotMatch(source, /allowed-tools:\s*[\s\S]*Bash\(npx impeccable \*\)/);
  assert.doesNotMatch(source, /Run `node <skill-base-dir>\/scripts\/context\.mjs` once per session/);
  assert.doesNotMatch(hermes, /Run `node <skill-base-dir>\/scripts\/context\.mjs` once per session/);
});

test('future native-engine fetchers must fail closed when checksum is absent', () => {
  const rel = 'scripts/fetch-engine.mjs';
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) return;

  const text = fs.readFileSync(full, 'utf8');
  assert.doesNotMatch(
    text,
    /accept(?:s|ed)?\s+(?:the\s+)?download\s+as-is/i,
    'native engine fetcher must never accept an unverified download',
  );
  assert.match(
    text,
    /if\s*\(\s*!(?:checksum|expected)\s*\)[\s\S]{0,300}throw\s+new\s+Error/,
    'missing checksum must throw before installation',
  );
});
