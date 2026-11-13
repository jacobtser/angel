/**
 * One-off content migration.
 *
 * The previous static site already held 449 carefully worked WAEC items in
 * `js/guides/*.js`. Rather than retyping them (and risking new errors), this
 * script lifts them into the typed content layer and attaches the new PDF
 * paths. Run with: node scripts/build-past-papers.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

globalThis.window = {};
await import('../js/guides/english.js');
await import('../js/guides/mathematics.js');

const english = globalThis.window.GUIDES.english;
const mathematics = globalThis.window.GUIDES.mathematics;

const pdfs = {
  '2012': '/papers/english/waec-2012.pdf',
  '2016': '/papers/english/wassce-2016.pdf',
  '2020': '/papers/english/wassce-2020.pdf',
  '2023': '/papers/english/wassce-2023.pdf',
};

const englishPapers = english.papers.map((paper, index) => {
  const year = (paper.name.match(/\b(20\d{2})\b/) || [])[1] ?? '';
  return {
    id: `english-${year}-${index}`,
    subject: 'english',
    year,
    label: paper.name,
    source: `English Language/WASSCE — ${year} paper`,
    note: paper.note,
    pdf: pdfs[year],
    items: paper.questions.map((q) => ({
      n: String(q.n),
      q: String(q.q),
      a: String(q.a),
      why: q.why ? String(q.why) : undefined,
      steps: q.steps,
      tip: q.tip,
      flag: q.flag || undefined,
    })),
  };
});

const mathsPapers = [
  {
    id: 'mathematics-2021-chief',
    subject: 'mathematics',
    year: '2021',
    label: 'WAEC Chief Examiner’s Report 2021 — Paper 2 walkthrough',
    source: 'Core Mathematics/WASSCE/KUULCHAT_2021 Mathematics.pdf',
    note: mathematics.paperNote,
    pdf: '/papers/mathematics/chief-examiner-2021.pdf',
    items: mathematics.questions.map((q) => ({
      n: String(q.n),
      q: String(q.q),
      a: String(q.a),
      why: q.why ? String(q.why) : undefined,
      steps: q.steps,
      tip: q.tip,
      flag: q.flag || undefined,
    })),
  },
];

const all = [...englishPapers, ...mathsPapers];
const outPath = path.join('content', 'past-papers.json');
fs.writeFileSync(outPath, JSON.stringify(all, null, 2), 'utf8');

const text = JSON.stringify(all);
const bad = [...new Set(text.match(/[�]/g) ?? [])];
console.log(`Wrote ${outPath}`);
console.log(`Papers: ${all.length}`);
console.log(`Items: ${all.reduce((n, p) => n + p.items.length, 0)}`);
console.log(`Suspicious replacement characters: ${bad.length}`);
console.log(`Flagged items: ${all.reduce((n, p) => n + p.items.filter((i) => i.flag).length, 0)}`);

for (const paper of all) {
  console.log(`- ${paper.subject} ${paper.year}: ${paper.items.length} items`);
}
