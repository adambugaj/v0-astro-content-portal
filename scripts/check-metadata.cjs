const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'src', 'pages');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.isFile() && ent.name.endsWith('.astro')) checkFile(full);
  }
}

const issues = [];
function checkFile(filePath) {
  const rel = path.relative(process.cwd(), filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const fm = content.match(/^---\s*([\s\S]*?)\s*---/);
  if (!fm) {
    issues.push({ file: rel, reason: 'missing frontmatter' });
    return;
  }
  const fmText = fm[1];
  const titleMatch = fmText.match(/^[ \t]*title:\s*(?:"([^"]+)"|'([^']+)'|([^\n]+))/m);
  const descMatch = fmText.match(/^[ \t]*description:\s*(?:"([^"]+)"|'([^']+)'|([^\n]+))/m);
  const title = titleMatch ? (titleMatch[1] || titleMatch[2] || titleMatch[3]).trim() : '';
  const description = descMatch ? (descMatch[1] || descMatch[2] || descMatch[3]).trim() : '';

  if (!title) issues.push({ file: rel, reason: 'missing title in frontmatter' });
  if (!description) issues.push({ file: rel, reason: 'missing description in frontmatter' });
  if (title && description && title === description) issues.push({ file: rel, reason: 'description equals title' });
}

walk(root);

if (issues.length === 0) {
  console.log('check-metadata: no issues found');
  process.exitCode = 0;
} else {
  console.log(`check-metadata: found ${issues.length} issue(s):`);
  for (const it of issues) console.log('- ' + it.file + ': ' + it.reason);
  console.log('\nSuggested fixes: add unique `title` and `description` YAML frontmatter to the listed files; description should not equal title.');
  process.exitCode = 0; // keep non-failing by default; change to 1 to fail CI
}
