import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { lstat, mkdir, readFile, realpath, writeFile } from 'node:fs/promises';
import { isIP } from 'node:net';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';

const root = fileURLToPath(new URL('../', import.meta.url));
const loadJson = async path => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const schema = await loadJson('schema/catalog.schema.json');
const browserChains = new Set(await loadJson('schema/browser-chains.json'));
const catalogBytes = await readFile(resolve(root, 'data/catalog.json'));
assert.ok(catalogBytes.length <= 256 * 1024, 'catalog.json exceeds 256 KiB');
const catalog = JSON.parse(catalogBytes.toString('utf8'));
const validate = new Ajv({ allErrors: true }).compile(schema);
assert.ok(validate(catalog), JSON.stringify(validate.errors, null, 2));

function index(records) {
  const indexed = new Map(records.map(record => [record.id, record]));
  assert.equal(indexed.size, records.length, 'ID must be unique in each list');
  return indexed;
}

function validateDomain(value) {
  const url = new URL(value);
  const host = url.hostname.replace(/^\[|\]$/g, '');
  const publicName = /^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/.test(host)
    && host.split('.').length > 1 && !host.includes('..')
    && !/\.(?:localhost|local|internal|invalid|test|example|onion)$/.test(host);
  assert.ok(publicName && !isIP(host) && url.protocol === 'https:' && !url.port
    && !url.username && !url.password && !url.search && !url.hash && url.href === value,
  `Expected a canonical public HTTPS URL for ${host}`);
}

function imageSize(data, imagePath) {
  if (imagePath.endsWith('.png')) {
    assert.ok(data.length >= 33 && data.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))
      && data.toString('ascii', 12, 16) === 'IHDR' && data.readUInt32BE(8) === 13,
    `Invalid PNG file ${imagePath}`);
    for (let offset = 8; offset + 12 <= data.length;) {
      const size = data.readUInt32BE(offset);
      const type = data.toString('ascii', offset + 4, offset + 8);
      assert.notEqual(type, 'acTL', `Animated PNG ${imagePath}`);
      assert.ok(offset + size + 12 <= data.length, `Truncated PNG ${imagePath}`);
      if (type === 'IEND') return [data.readUInt32BE(16), data.readUInt32BE(20)];
      offset += size + 12;
    }
    throw new Error(`Missing PNG end chunk ${imagePath}`);
  }

  assert.ok(data.length >= 30 && data.toString('ascii', 0, 4) === 'RIFF' && data.toString('ascii', 8, 12) === 'WEBP'
    && data.readUInt32LE(4) + 8 === data.length, `Invalid WebP file ${imagePath}`);
  const chunk = data.toString('ascii', 12, 16);
  const chunkSize = data.readUInt32LE(16);
  assert.ok(20 + chunkSize <= data.length, `Truncated WebP ${imagePath}`);
  if (chunk === 'VP8X') {
    assert.ok(chunkSize === 10 && !(data[20] & 2), `Animated or malformed WebP ${imagePath}`);
    return [data.readUIntLE(24, 3) + 1, data.readUIntLE(27, 3) + 1];
  }
  if (chunk === 'VP8L') {
    assert.ok(chunkSize >= 5 && data[20] === 0x2f, `Invalid lossless WebP ${imagePath}`);
    const dimensions = data.readUInt32LE(21);
    return [(dimensions & 0x3fff) + 1, ((dimensions >> 14) & 0x3fff) + 1];
  }
  assert.ok(chunk === 'VP8 ' && chunkSize >= 10 && data.subarray(23, 26).equals(Buffer.from('9d012a', 'hex')),
    `Invalid lossy WebP ${imagePath}`);
  return [data.readUInt16LE(26) & 0x3fff, data.readUInt16LE(28) & 0x3fff];
}

const sourceAssets = await realpath(resolve(root, 'assets'));
const assets = new Map();
async function verifyImage(path, maxBytes, maxWidth, maxHeight, square = false) {
  const absolute = resolve(root, path);
  const real = await realpath(absolute);
  const file = await lstat(absolute);
  assert.ok(real === absolute && real.startsWith(sourceAssets + sep) && file.isFile() && file.size <= maxBytes,
    `Invalid image path or file size ${path}`);
  const bytes = await readFile(real);
  const [width, height] = imageSize(bytes, path);
  assert.ok(width >= 1 && height >= 1 && width <= maxWidth && height <= maxHeight && (!square || width === height),
    `Invalid image dimensions ${path}`);
  assets.set(path, bytes);
}

function utc(value) {
  if (!value) return;
  const time = new Date(value);
  assert.ok(!Number.isNaN(time.valueOf()) && time.toISOString().replace('.000Z', 'Z') === value, `Invalid UTC time ${value}`);
}

const categories = index(catalog.categories);
const apps = index(catalog.apps);
index(catalog.banners);
index(catalog.homeSections);
assert.ok(!categories.has('home') && !categories.has('favorites'), 'Client categories are reserved');
for (const app of catalog.apps) {
  assert.ok([...app.summary['zh-Hans']].filter(character => /\p{Script=Han}/u.test(character)).length >= 30,
    `App introduction needs at least 30 Chinese characters: ${app.id}`);
  validateDomain(app.url);
  assert.ok(app.categoryIds.every(id => categories.has(id)), `Unknown category in ${app.id}`);
  assert.ok(app.chains.every(chain => browserChains.has(chain)), `Unsupported browser chain in ${app.id}`);
  assert.ok(app.icon.startsWith('assets/apps/'), 'App icon path must start with assets/apps/');
  await verifyImage(app.icon, 128 * 1024, 512, 512, true);
}
for (const banner of catalog.banners) {
  assert.ok(apps.has(banner.appId), `Unknown app in ${banner.id}`);
  utc(banner.startsAt);
  utc(banner.endsAt);
  assert.ok(!banner.startsAt || !banner.endsAt || banner.startsAt < banner.endsAt, `End time precedes start in ${banner.id}`);
  assert.ok(banner.image.startsWith('assets/banners/'), 'Banner path must start with assets/banners/');
  await verifyImage(banner.image, 512 * 1024, 1600, 900);
}
for (const section of catalog.homeSections) {
  assert.ok(section.appIds.every(id => apps.has(id)), `Unknown app in ${section.id}`);
}
const previous = process.env.CATALOG_BASE_SHA;
if (previous && !/^0+$/.test(previous)) {
  assert.match(previous, /^[a-f0-9]{40}$/);
  const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
  const hasCatalog = git(['ls-tree', previous, '--', 'data/catalog.json']).trim();
  if (hasCatalog && git(['diff', '--name-only', previous, '--', 'data/catalog.json', 'assets']).trim()) {
    const old = JSON.parse(git(['show', `${previous}:data/catalog.json`]));
    assert.ok(catalog.revision > old.revision, 'Increase revision when changing the catalog or assets');
  }
}

if (process.argv.includes('--build')) {
  const site = resolve(root, 'site');
  for (const [name, data] of new Map([
    ...assets,
    ['catalog.json', catalogBytes],
    ['index.html', '<!doctype html><html lang="en"><meta charset="utf-8"><title>AST Wallet Dapp catalog</title><h1>AST Wallet Dapp catalog</h1><a href="catalog.json">Open catalog JSON</a></html>\n'],
  ])) {
    const path = resolve(site, name);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, data);
  }
}
console.log(`Catalog revision ${catalog.revision} validated with ${apps.size} apps and ${assets.size} images`);
