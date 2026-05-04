Working on: Blazing Tails storefront — React + Vite + Tailwind, 14 editions magazine viewer
Last action: Verified build passes (npm run build → 0 errors, 32 modules, 254.91 kB), confirmed git commit d518d56 on main
Next step: Deploy to Cloudflare Pages — run `gh repo create Kaoz625/blazing-tails-storefront --public --source=. --push` then connect repo in Cloudflare Pages dashboard, set build command `npm run build`, output dir `dist`
Key files:
  - src/data/editions.ts — 14 editions + QUANTITY_DISCOUNTS pricing
  - src/components/AgeGate.tsx — 18+ gate with NY AI Transparency Act disclosure
  - src/components/MagazineViewer.tsx — page viewer + mailto order panel
  - src/App.tsx — router + NSFW toggle state
  - dist/ — production build ready to deploy
Blockers: none — build is clean, no TypeScript errors
