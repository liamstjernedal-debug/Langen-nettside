import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = new URL('../', import.meta.url);
const pages = (await readdir(root)).filter(file => file.endsWith('.html'));
let references = 0;
for (const page of pages) {
  const html = await readFile(new URL(page, root), 'utf8');
  assert.match(html, /<html lang="nb">/);
  assert.match(html, /<meta name="viewport"/);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${page}: one h1 required`);
  assert.match(html, /<main id="main">/);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${page}: duplicate id`);
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(value)) continue;
    const [file, fragment] = value.split('#');
    const target = file || page;
    await access(new URL(target, root));
    if (fragment) {
      const content = await readFile(new URL(target, root), 'utf8');
      assert(content.includes(`id="${fragment}"`), `${page}: missing anchor ${value}`);
    }
    references++;
  }
  for (const img of html.matchAll(/<img\b[^>]*>/g)) assert.match(img[0], /\balt="[^"]*"/, `${page}: missing alt`);
}
const gallery = await readFile(new URL('Bilder.html', root), 'utf8');
assert.equal((gallery.match(/id="prosjekt-/g) || []).length, 9);
const videos = await readFile(new URL('filmer.html', root), 'utf8');
assert.equal((videos.match(/class="video-cover"/g) || []).length, 9);
const reviews = await readFile(new URL('ommegogomtaler.html', root), 'utf8');
assert.equal((reviews.match(/aria-label="Les kundeomtale"/g) || []).length, 27);
console.log(`Checked ${pages.length} pages, ${references} local references, 9 projects, 9 videos and 27 reviews.`);
