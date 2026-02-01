# Telefon Kezelő Alkalmazás - React + Vite

Egy modern React alkalmazás telefonok és gyártók kezeléséhez Vite build toolal.

## Gyors Telepítés

### Degit segítségével (ajánlott)

```bash
npx degit [GitHub-username]/react-starter my-app
cd my-app
npm install
npm run dev
```

Helyettesítsd a `[GitHub-username]` helyére a GitHub felhasználónevedet!

### Klasszikus klónozás

```bash
git clone https://github.com/[GitHub-username]/react-starter.git
cd react-starter
npm install
npm run dev
```

## Telepítési lépések

1. **Projekt klónozása/letöltése:**
   ```bash
   npx degit [GitHub-username]/react-starter my-app
   cd my-app
   ```

2. **Függőségek telepítése:**
   ```bash
   npm install
   ```

3. **Environment konfigurálása:**
   ```bash
   cp .env.example .env
   ```
   Szerkeszd a `.env` fájlt a szükséges API végpontokkal.

4. **Fejlesztési szerver indítása:**
   ```bash
   npm run dev
   ```

5. **Gyártáshoz való build:**
   ```bash
   npm run build
   ```

## Elérhető Parancsok

- `npm run dev` - Fejlesztési szerver indítása
- `npm run build` - Gyártási build készítése
- `npm run preview` - Build előnézetének megtekintése
- `npm run lint` - ESLint futtatása

## Projekt Struktúra

```
src/
├── components/
│   ├── TelefonForm.jsx          # Telefon felvételi form
│   ├── TelefonGrid.jsx          # Telefonok grid nézete
│   └── TelefonEditModal.jsx     # Telefon módosítási modal
├── services/
│   └── api.js                   # API hívások kezelése
├── App.jsx                      # Főkomponens
├── main.jsx                     # Belépési pont
└── index.css                    # Globális stílusok
```

## Konfiguráció

### .env fájl

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TELEFONOK=/telefonok
VITE_API_GYARTOK=/gyartok
```

## Szükséges Backend Végpontok

Az alkalmazás az alábbi API végpontokat igényli:

**Telefonok:**
- `GET /api/telefonok` - Összes telefon listázása
- `POST /api/telefonok` - Új telefon felvétele
- `PATCH /api/telefonok/:id` - Telefon módosítása
- `DELETE /api/telefonok/:id` - Telefon törlése

**Gyártók:**
- `GET /api/gyartok` - Összes gyártó listázása

## Technológiák

- **React 18** - UI framework
- **Vite** - Build tool
- **Formik** - Form kezelés
- **Bootstrap** - CSS framework
- **ESLint** - Kódminőség ellenőrzés

## Licensz

MIT
