/* Regression checks for publication status, shared facts and static readability. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
process.chdir(path.join(__dirname, '..'));
// Compile local TypeScript in this check process; production uses Next's compiler.
require.extensions['.ts'] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    fileName: filename,
  });
  module._compile(outputText, filename);
};
const { parseBibTeX } = require('../src/lib/bibtexParser.ts');
const { getPublications, getResearch } = require('../src/lib/publications.ts');
const { getTomlContent } = require('../src/lib/content.ts');
const bib = fs.readFileSync('content/publications.bib', 'utf8');
assert.throws(() => parseBibTeX(bib.replace('status = {published}', 'status = {publshed}')), /invalid publication status/);
assert.throws(() => parseBibTeX(bib.replace('status = {published},', '')), /invalid publication status/);
const english = getPublications('en');
const chinese = getPublications('zh');
assert.deepEqual(english.map(p => [p.id,p.title,p.doi,p.authors,p.status]), chinese.map(p => [p.id,p.title,p.doi,p.authors,p.status]));
assert.equal(english.filter(p => p.status === 'published').length, 2);
const review = english.find(p => p.id === 'cai2026pedialog');
assert.equal(review.type, 'manuscript');
assert.equal(review.status, 'under-review');
assert.equal(review.reviewVenue, 'Scientific Data');
assert.equal(review.journal, '');
const own = english[0].authors.find(a => a.name === 'Peng Cai');
assert.equal(own.isCoAuthor, true);
assert.equal(own.isCorresponding, false);
assert.equal(english[0].authors.find(a => a.name === 'Ximing Xu').isCorresponding, true);
for (const p of english) {
  assert.doesNotMatch(p.bibtex, /(?:status|summary|description|review_venue|abstract)\s*=/);
  assert.doesNotMatch(p.bibtex.match(/author = \{([^}]+)\}/)[1], /[*#]/);
}
for (const locale of ['en','zh']) {
  const research = getResearch(locale);
  assert.equal(research.themes.length, 3);
  assert.equal(research.themes.flatMap(t => t.works).filter(w => w.publication).length, 3);
  const ids = research.themes.flatMap(t => [t.id, ...t.works.map(w => w.id || w.publication_id)]);
  assert.equal(ids.length, new Set(ids).size);
  const cv = getTomlContent('cv.toml', locale);
  if (cv.pdf_url?.startsWith('/')) assert.ok(fs.existsSync(path.join('public', cv.pdf_url)), 'Configured CV PDF must exist');
}
for (const slug of ['', 'publications', 'projects', 'cv']) {
  const html = fs.readFileSync(path.join('out', slug, 'index.html'), 'utf8');
  const main = html.match(/<main\b[\s\S]*?<\/main>/)[0];
  assert.ok(main.includes('<h1'), `Static heading missing on ${slug}`);
  assert.doesNotMatch(html, /visibility:hidden|opacity:0/);
  assert.match(html, /noindex, nofollow/);
  assert.doesNotMatch(main, /RoentGen|TabDDPM|Preprint/);
  assert.doesNotMatch(html, /<link[^>]+(?:fonts\.googleapis|cdnjs|jsdelivr)/);
}
const publicationHtml = fs.readFileSync('out/publications/index.html','utf8').split('<main')[1].split('</main>')[0];
assert.equal((publicationHtml.match(/<details/g)||[]).length, 2);
assert.doesNotMatch(publicationHtml, /Abstract|<input/);
console.log('Passed: status rejection, bilingual bibliography, author markers, citation export, research references, static content, noindex and publication controls.');
