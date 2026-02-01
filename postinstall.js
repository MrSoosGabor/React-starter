const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'node_modules', 'sg-frontend-starter');
const dest = path.join(__dirname, 'sg-frontend-starter');

// Ha létezik a modul a node_modules-ban
if (fs.existsSync(source)) {
  // Ha már létezik a célhelyen, töröld ki
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  // Mozgasd ki a node_modules-ból
  fs.renameSync(source, dest);
  console.log('sg-frontend-starter modul sikeresen áthelyezve');
}
