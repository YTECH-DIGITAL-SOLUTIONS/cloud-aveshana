<!-- @format -->

<<<<<<< HEAD

# 🌍 Cloud Aveshana – Monorepo Project

**Cloud Aveshana** is a monorepo project for _Bhumi Aveshana_, containing:

- 🖥️ `frontend/` — A React + TypeScript + Vite-based UI
- 🔧 `backend/` — Firebase Functions backend written in TypeScript

---

## 📁 Project Structure

```
bhumi-aveshana
├─ .DS_Store
├─ backend
│  ├─ .env
│  ├─ Dockerfile
│  ├─ dist
│  │  ├─ firebase.js
│  │  ├─ index.js
│  │  └─ routes
│  │     └─ places.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ src
│  │  ├─ firebase.js
│  │  ├─ firebase.ts
│  │  ├─ index.js
│  │  ├─ index.ts
│  │  └─ routes
│  │     ├─ places.js
│  │     └─ places.ts
│  └─ tsconfig.json
└─ frontend
   ├─ .DS_Store
   ├─ .firebase
   │  └─ hosting.ZGlzdA.cache
   ├─ .firebaserc
   ├─ README.md
   ├─ dist
   │  ├─ assets
   │  │  ├─ index-9_sxcfan.js
   │  │  ├─ index-D8b4DHJx.css
   │  │  └─ react-CHdo91hT.svg
   │  ├─ index.html
   │  └─ vite.svg
   ├─ eslint.config.js
   ├─ firebase.json
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ postcss.config.js
   ├─ public
   │  ├─ .DS_Store
   │  ├─ banner
   │  │  ├─ banner1.jpg
   │  │  ├─ banner2.jpg
   │  │  └─ banner3.jpg
   │  ├─ categories
   │  │  ├─ bp.jpg
   │  │  ├─ kl.jpg
   │  │  ├─ lp.jpg
   │  │  ├─ ta.jpg
   │  │  ├─ tm.jpeg
   │  │  ├─ tp.jpg
   │  │  ├─ tw.jpg
   │  │  └─ umkm.jpeg
   │  ├─ icons
   │  ├─ images
   │  │  ├─ aan.jpg
   │  │  ├─ angkut.webp
   │  │  ├─ ayamgeprek.jpg
   │  │  ├─ bakso.webp
   │  │  ├─ batu.jpeg
   │  │  ├─ bintang.jpg
   │  │  ├─ borobudur.jpeg
   │  │  ├─ bromo.webp
   │  │  ├─ danautoba.webp
   │  │  ├─ kampung.jpg
   │  │  ├─ kuta.webp
   │  │  ├─ malioboro.webp
   │  │  ├─ nasirina.jpg
   │  │  ├─ pandawa.jpeg
   │  │  ├─ pintar.jpg
   │  │  ├─ sewu.jpeg
   │  │  └─ soto.jpeg
   │  ├─ logo
   │  │  └─ lg.png
   │  └─ vite.svg
   ├─ src
   │  ├─ .DS_Store
   │  ├─ App.css
   │  ├─ App.tsx
   │  ├─ assets
   │  │  ├─ .DS_Store
   │  │  ├─ banner
   │  │  │  ├─ banner1.jpg
   │  │  │  ├─ banner2.jpg
   │  │  │  └─ banner3.jpg
   │  │  ├─ hero
   │  │  ├─ places
   │  │  │  ├─ borobudur.jpeg
   │  │  │  ├─ nasirina.jpg
   │  │  │  └─ pandawa.jpeg
   │  │  ├─ react.svg
   │  │  └─ user
   │  ├─ components
   │  │  ├─ admin
   │  │  │  ├─ BroadcastForm.tsx
   │  │  │  ├─ ChartCategory.tsx
   │  │  │  ├─ ChartTraffic.tsx
   │  │  │  ├─ ContentSection.tsx
   │  │  │  ├─ Header.tsx
   │  │  │  ├─ PlaceFormModal.tsx
   │  │  │  ├─ Sidebar.tsx
   │  │  │  ├─ StatsCard.tsx
   │  │  │  ├─ TablePlaces.tsx
   │  │  │  ├─ TableReviewApproval.tsx
   │  │  │  ├─ TableReviews.tsx
   │  │  │  ├─ TableUMKM.tsx
   │  │  │  ├─ TableUsers.tsx
   │  │  │  └─ UMKMFormModal.tsx
   │  │  ├─ common
   │  │  │  ├─ FilterBar.tsx
   │  │  │  ├─ Footer.tsx
   │  │  │  ├─ Navbar.tsx
   │  │  │  └─ ThemeToggle.tsx
   │  │  └─ user
   │  │     ├─ PlaceCard.tsx
   │  │     ├─ PlaceDetailCard.tsx
   │  │     └─ WishlistCard.tsx
   │  ├─ hooks
   │  │  └─ useTheme.ts
   │  ├─ index.css
   │  ├─ main.tsx
   │  ├─ pages
   │  │  ├─ admin
   │  │  │  ├─ BroadcastPanel.tsx
   │  │  │  ├─ DashboardAdmin.tsx
   │  │  │  ├─ LoginAdmin.tsx
   │  │  │  ├─ ManageContent.tsx
   │  │  │  ├─ ManagePlaces.tsx
   │  │  │  ├─ ManageReviews.tsx
   │  │  │  ├─ ManageUMKM.tsx
   │  │  │  ├─ ManageUsers.tsx
   │  │  │  └─ ReviewApproval.tsx
   │  │  └─ user
   │  │     ├─ Contact.tsx
   │  │     ├─ DashboardUser.tsx
   │  │     ├─ Explore.tsx
   │  │     ├─ Home.tsx
   │  │     ├─ Login.tsx
   │  │     ├─ PlaceDetail.tsx
   │  │     ├─ Profile.tsx
   │  │     ├─ RatingReview.tsx
   │  │     ├─ RecommendForm.tsx
   │  │     ├─ Register.tsx
   │  │     ├─ UserLayout.tsx
   │  │     └─ Wishlist.tsx
   │  ├─ routes.tsx
   │  ├─ styles
   │  │  └─ index.css
   │  ├─ utils
   │  │  ├─ api.ts
   │  │  └─ helpers.ts
   │  └─ vite-env.d.ts
   ├─ tailwind.config.js
   ├─ tsconfig.app.json
   ├─ tsconfig.json
   ├─ tsconfig.node.json
   └─ vite.config.ts

```

---

## ⚙️ Backend (Firebase Functions)

### Setup

````bash
cd backend/functions
npm install
firebase emulators:start
cd frontend
npm install
npm run dev

=======

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

> > > > > > > c11c92b (Initial frontend commit)
