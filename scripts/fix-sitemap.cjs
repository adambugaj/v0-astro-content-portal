const fs = require('fs');
const path = require('path');

const dist = path.join(process.cwd(), 'dist');
const sitemapXml = path.join(dist, 'sitemap.xml');
const sitemap0 = path.join(dist, 'sitemap-0.xml');
const sitemapIndex = path.join(dist, 'sitemap-index.xml');

function copyIfNeeded(src, dest) {
  if (!fs.existsSync(src)) return false;
  try {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${path.basename(src)} → ${path.basename(dest)}`);
    return true;
  } catch (err) {
    console.error('Failed to copy sitemap file:', err);
    return false;
  }
}

function deleteIfExists(file) {
  if (!fs.existsSync(file)) return false;
  try {
    fs.unlinkSync(file);
    console.log(`Deleted ${path.basename(file)}`);
    return true;
  } catch (err) {
    console.error(`Failed to delete ${path.basename(file)}:`, err);
    return false;
  }
}

if (!fs.existsSync(dist)) {
  console.warn('dist/ not found — run this script after build.');
  process.exit(0);
}

// If dist/sitemap.xml already exists, remove other sitemap files and exit.
if (fs.existsSync(sitemapXml)) {
  console.log('sitemap.xml already present in dist/ — removing other sitemap files if any.');
  deleteIfExists(sitemap0);
  deleteIfExists(sitemapIndex);
  process.exit(0);
}

// Prefer sitemap-0.xml (plugin sometimes emits sitemap-0.xml)
if (fs.existsSync(sitemap0)) {
  if (copyIfNeeded(sitemap0, sitemapXml)) {
    // remove duplicates after successful copy
    deleteIfExists(sitemap0);
    deleteIfExists(sitemapIndex);
  }
  process.exit(0);
}

// Fallback: if only sitemap-index.xml exists, copy it to sitemap.xml
if (fs.existsSync(sitemapIndex)) {
  if (copyIfNeeded(sitemapIndex, sitemapXml)) {
    deleteIfExists(sitemapIndex);
    deleteIfExists(sitemap0);
  }
  process.exit(0);
}

console.warn('No sitemap files found in dist/ to copy.');
process.exit(0);
