import { mkdir, readFile, writeFile } from 'node:fs/promises';

const path = process.env.GRAPHITY_CONTENT_FILE;
export const published = path ? JSON.parse(await readFile(path, 'utf8')) : null;
export let publishedHero = '';

export function safeText(value) {
  return String(value).replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char]);
}

if (published) {
  if (published.schema !== 1 || published.division !== 'solutions') throw new Error('Expected a published Graphity Solutions release.');
  for (const key of ['planned', 'logged', 'approvals', 'stock']) {
    const value = published.metrics?.[key];
    if (!Number.isInteger(value) || value < 0 || value > 999999) throw new Error('Invalid metric: ' + key);
  }
  for (const locale of ['en', 'ar']) {
    const data = published[locale];
    for (const key of ['project', 'date', 'overview', 'overviewBody']) {
      if (typeof data?.[key] !== 'string' || !data[key].trim() || data[key].length > 700) {
        throw new Error('Invalid release content: ' + locale + ' ' + key);
      }
    }
    for (const [key, count] of [['otherSteps', 4], ['moduleLabels', 8]]) {
      const values = data[key];
      if (values !== undefined && (!Array.isArray(values) || values.length !== count ||
          values.some(value => typeof value !== 'string' || !value.trim() || value.length > 100))) {
        throw new Error('Invalid release labels: ' + locale + ' ' + key);
      }
    }
  }
  if (published.hero) {
    const mime = { jpeg: 'jpg', png: 'png', webp: 'webp' };
    const extension = mime[published.hero.format];
    const encoded = published.hero.base64;
    if (!extension || typeof encoded !== 'string' || encoded.length > 1400000 || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) {
      throw new Error('Invalid approved hero asset.');
    }
    const bytes = Buffer.from(encoded, 'base64');
    const valid = {
      jpg: bytes.subarray(0, 3).equals(Buffer.from([255,216,255])),
      png: bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])),
      webp: bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP',
    };
    if (!valid[extension] || bytes.length > 1_000_000) throw new Error('Invalid image format or size.');
    const name = 'published-hero.' + extension;
    await mkdir('dist/assets/demo', { recursive: true });
    await writeFile('dist/assets/demo/' + name, bytes);
    publishedHero = '/assets/demo/' + name;
  }
}
