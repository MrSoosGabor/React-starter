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

// Biztosítja, hogy a cél package.json tartalmazza a dev scriptet
ensureDevScript(targetPackageJson);

function ensureDevScript(packageJsonPath) {
  let pkg = null;
  let changed = false;

  if (fs.existsSync(packageJsonPath)) {
    try {
      const raw = fs.readFileSync(packageJsonPath, 'utf8');
      pkg = JSON.parse(raw);
    } catch (error) {
      console.error('Hiba a package.json beolvasása során:', error);
      return;
    }
  } else {
    pkg = { name: 'app', private: true, scripts: {} };
    changed = true;
  }

  try {
    if (!pkg.scripts) {
      pkg.scripts = {};
      changed = true;
    }

    if (!pkg.scripts.dev) {
      pkg.scripts.dev = 'vite';
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
      console.log('✓ dev script hozzáadva a package.json-hoz');
    }
  } catch (error) {
    console.error('Hiba a package.json frissítése során:', error);
  }
}

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