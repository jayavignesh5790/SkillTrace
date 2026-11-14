import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy index.html
if (fs.existsSync('index.html')) {
  fs.copyFileSync('index.html', path.join(distDir, 'index.html'));
}

// Copy assets, public, data
for (const folder of ['assets', 'public', 'data']) {
  if (fs.existsSync(folder)) {
    fs.cpSync(folder, path.join(distDir, folder), { recursive: true });
  }
}

console.log('SkillTrace production assets successfully bundled into dist/');
