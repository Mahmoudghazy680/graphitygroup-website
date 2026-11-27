import { mkdir, readFile, writeFile } from 'node:fs/promises';

const path = process.env.GRAPHITY_PORTFOLIO_FILE;
const raw = path ? JSON.parse(await readFile(path, 'utf8')) : null;

const MAX_ITEMS = 12;
const MAX_TESTIMONIALS = 6;
const MAX_TEXT = 700;
const MAX_IMAGE_BYTES = 1_000_000;

function requireText(value, limit = MAX_TEXT) {
  if (typeof value !== 'string' || !value.trim() || value.length > limit) {
    throw new Error('Invalid published portfolio text field.');
  }
  return value.trim();
}

async function exportImage(item, index) {
  const mime = { jpeg: 'jpg', png: 'png', webp: 'webp' };
  const extension = mime[item.format];
  const encoded = item.base64;
  if (!extension || typeof encoded !== 'string' || encoded.length > 1_400_000 || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) {
    throw new Error('Invalid published portfolio image.');
  }
  const bytes = Buffer.from(encoded, 'base64');
  const valid = {
    jpg: bytes.subarray(0, 3).equals(Buffer.from([255, 216, 255])),
    png: bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
    webp: bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP',
  };
  if (!valid[extension] || bytes.length > MAX_IMAGE_BYTES) throw new Error('Invalid portfolio image format or size.');
  const name = `portfolio-${index}.${extension}`;
  await mkdir('dist/assets/portfolio', { recursive: true });
  await writeFile('dist/assets/portfolio/' + name, bytes);
  return '/assets/portfolio/' + name;
}

export let publishedPortfolio = null;

if (raw) {
  if (raw.schema !== 1 || raw.division !== 'studio') throw new Error('Expected a published Graphity Studio portfolio release.');
  const items = Array.isArray(raw.items) ? raw.items : [];
  const testimonials = Array.isArray(raw.testimonials) ? raw.testimonials : [];
  if (items.length > MAX_ITEMS) throw new Error('Too many portfolio items.');
  if (testimonials.length > MAX_TESTIMONIALS) throw new Error('Too many testimonials.');

  const resolvedItems = [];
  for (const [index, item] of items.entries()) {
    const entry = {
      titleEn: requireText(item.titleEn, 160), titleAr: requireText(item.titleAr, 160),
      summaryEn: requireText(item.summaryEn), summaryAr: requireText(item.summaryAr),
      resultEn: requireText(item.resultEn, 300), resultAr: requireText(item.resultAr, 300),
      cover: item.cover ? await exportImage(item.cover, index) : '',
    };
    resolvedItems.push(entry);
  }
  const resolvedTestimonials = testimonials.map(entry => ({
    quoteEn: requireText(entry.quoteEn), quoteAr: requireText(entry.quoteAr),
    authorName: requireText(entry.authorName, 120),
    authorRoleEn: requireText(entry.authorRoleEn, 120), authorRoleAr: requireText(entry.authorRoleAr, 120),
  }));

  publishedPortfolio = resolvedItems.length ? { items: resolvedItems, testimonials: resolvedTestimonials } : null;
}
