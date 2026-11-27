import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function exists(rel) {
  try { await stat(path.join(root, rel)); return true; } catch { return false; }
}

async function main() {
  const errors = [];
  const warnings = [];

  // Validate oral videos
  const oralVideosPath = path.join(root, 'content', 'oral-videos.ts');
  const src = await readFile(oralVideosPath, 'utf8');
  const ids = [...src.matchAll(/youtubeId:\s*'([^']+)'/g)].map((m) => m[1]);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) errors.push(`Duplicate youtubeId in oral-videos.ts: ${id}`);
    seen.add(id);
    const rel = path.join('public', 'videos', 'english', 'orals', `${id}.mp4`);
    if (!(await exists(rel))) errors.push(`Missing video file: ${rel}`);
  }

  // Validate past paper pdfs referenced in content/past-papers.json
  try {
    const papers = JSON.parse(await readFile(path.join(root, 'content', 'past-papers.json'), 'utf8'));
    for (const p of papers) {
      if (p.pdf) {
        const rel = p.pdf.replace(/^\//, '');
        if (!(await exists(path.join('public', rel)))) errors.push(`Missing past paper PDF: public/${rel}`);
      }
    }
  } catch (e) {
    warnings.push(`Could not validate past-papers.json: ${e.message}`);
  }

  // Basic check for captions referenced
  for (const m of src.matchAll(/captionsSrc:\s*'([^']+)'/g)) {
    const rel = m[1].replace(/^\//, '');
    if (!(await exists(path.join('public', rel)))) warnings.push(`Missing captions file: public/${rel}`);
  }

  if (warnings.length) {
    console.warn('Warnings:');
    for (const w of warnings) console.warn(' - ' + w);
  }
  if (errors.length) {
    console.error('Errors:');
    for (const e of errors) console.error(' - ' + e);
    process.exit(1);
  }
  console.log(`Content validation passed. ${ids.length} oral videos checked.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
