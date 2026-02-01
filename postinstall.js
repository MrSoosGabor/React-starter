import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Az sg-frontend-starter modulban belül keresünk
const source = path.join(__dirname);
// A végső cél: a node_modules/sg-frontend-starter szülőjéhez képest (ahol az npm install fut)
const projectRoot = path.join(__dirname, '..', '..');

const targetPackageJson = path.join(projectRoot, 'package.json');
const sourcePackageJson = path.join(source, 'package.json');
const devPackageJson = path.join(projectRoot, 'package.json.dev');

// Az eredeti package.json tartalmát másoljuk package.json.dev néven, de postinstall script nélkül
if (fs.existsSync(sourcePackageJson)) {
  try {
    const raw = fs.readFileSync(sourcePackageJson, 'utf8');
    const pkg = JSON.parse(raw);
    
    // Eltávolítjuk a postinstall scriptet
    if (pkg.scripts && pkg.scripts.postinstall) {
      delete pkg.scripts.postinstall;
    }
    
    fs.writeFileSync(devPackageJson, JSON.stringify(pkg, null, 2) + '\n');
    console.log('✓ package.json.dev létrehozva');
  } catch (error) {
    console.error('Hiba a package.json.dev létrehozása során:', error);
  }
}

if (fs.existsSync(source)) {
    // Az sg-frontend-starter mappájában lévő összes fájlt és mappát másolja ki
    const files = fs.readdirSync(source);
    
    files.forEach(file => {
      // Kihagyja a node_modules-t, package.json-t és magát a postinstall.js-t
      if (file !== 'node_modules' && file !== 'package.json' && file !== 'postinstall.js') {
        const srcPath = path.join(source, file);
        const destPath = path.join(projectRoot, file);
        
        if (fs.existsSync(destPath)) {
          fs.rmSync(destPath, { recursive: true, force: true });
        }
        
        // Másolja a fájlt/mappát
        const stat = fs.statSync(srcPath);
        if (stat.isDirectory()) {
          copyDir(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    });
    
    console.log('✓ sg-frontend-starter tartalma sikeresen áthelyezve');
}

// Hozzunk létre egy setup.mjs fájlt a telepítés befejezéséhez
const setupScript = `import fs from 'fs';
import { execSync } from 'child_process';

console.log('📦 Package.json frissítése...');
fs.copyFileSync('package.json.dev', 'package.json');
fs.unlinkSync('package.json.dev');

console.log('📦 Függőségek telepítése...');
execSync('npm install', { stdio: 'inherit' });

console.log('🚀 Alkalmazás indítása...');
execSync('npm run dev', { stdio: 'inherit' });
`;

fs.writeFileSync(path.join(projectRoot, 'setup.mjs'), setupScript);
console.log('');
console.log('✓ Telepítés kész!');
console.log('');
console.log('⚡ A telepítés befejezéséhez futtasd: node setup.mjs');
console.log('');

// Segédfunkció a mappák rekurzív másolásához
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const files = fs.readdirSync(src);
  
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}