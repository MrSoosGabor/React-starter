import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Az sg-frontend-starter modulban belül keresünk
const source = path.join(__dirname, 'node_modules', 'sg-frontend-starter');
// A végső cél: a projekt gyökeréhez képest
const projectRoot = path.join(__dirname, '..', '..');

if (fs.existsSync(source)) {
  // Az sg-frontend-starter mappájában lévő összes fájlt és mappát másolja ki
  const files = fs.readdirSync(source);
  
  files.forEach(file => {
    // Kihagyja a node_modules-t és package.json-t ha szükséges
    if (file !== 'node_modules' && file !== 'package.json') {
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