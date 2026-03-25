#!/usr/bin/env node

import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function fetchLatestVersion(packageName) {
  const encoded = packageName.replace('/', '%2F');
  return new Promise((resolve) => {
    https.get(
      `https://registry.npmjs.org/${encoded}/latest`,
      { headers: { Accept: 'application/json' } },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data).version ?? null);
          } catch {
            resolve(null);
          }
        });
      }
    ).on('error', () => resolve(null));
  });
}

async function resolveLatestVersions(pkgPath) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const depGroups = ['dependencies', 'devDependencies'];

  for (const group of depGroups) {
    if (!pkg[group]) continue;
    const names = Object.keys(pkg[group]);
    const versions = await Promise.all(names.map(fetchLatestVersion));
    names.forEach((name, i) => {
      if (versions[i]) pkg[group][name] = `^${versions[i]}`;
    });
  }

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

async function main() {
  const projectName = process.argv[2];
  const targetDir = projectName
    ? path.resolve(process.cwd(), projectName)
    : process.cwd();

  if (projectName) {
    if (fs.existsSync(targetDir)) {
      console.error(`❌ A(z) "${projectName}" mappa már létezik.`);
      process.exit(1);
    }
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`📁 Mappa létrehozva: ${projectName}`);
  }

  console.log('📋 Fájlok másolása...');
  const templateDir = path.join(__dirname, '..', 'template');
  copyDir(templateDir, targetDir);
  console.log('✓ Fájlok sikeresen másolva');

  const pkgPath = path.join(targetDir, 'package.json');

  if (projectName) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.name = projectName;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  }

  // npm renames .gitignore to .npmignore during publish — stored without dot, rename back
  const gitignoreSrc = path.join(targetDir, 'gitignore');
  const gitignoreDest = path.join(targetDir, '.gitignore');
  if (fs.existsSync(gitignoreSrc)) {
    fs.renameSync(gitignoreSrc, gitignoreDest);
  }

  console.log('🔍 Legfrissebb csomagverziók lekérdezése...');
  await resolveLatestVersions(pkgPath);
  console.log('✓ Függőségek frissítve a legújabb verziókra');

  console.log('📦 Függőségek telepítése...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: targetDir });
  } catch {
    console.log('');
    console.log('⚠️  Peer dependency konfliktus, --legacy-peer-deps opcióval próbálom...');
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit', cwd: targetDir });
  }

  console.log('');
  console.log('✅ Projekt sikeresen létrehozva!');
  if (projectName) {
    console.log(`\nKövetkező lépések:\n  cd ${projectName}\n  npm run dev`);
  } else {
    console.log('\nKövetkező lépés:\n  npm run dev');
  }
}

main().catch((err) => {
  console.error('❌ Hiba:', err.message);
  process.exit(1);
});
