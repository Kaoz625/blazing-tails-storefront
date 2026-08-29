Working on: Blazing Tails — character/merch storefront (NOT a magazine viewer anymore)
Last action: [nyc-info] Verified the mid-rewrite state, untracked .omc/ runtime junk,
  merged a diverged remote (CNAME + Replit task spec), confirmed `npm run build`
  passes, and pushed everything. Repo is clean and up to date with origin/main
  at 52a72ed.
Next step: Get a real STRIPE key to Markus and wire it into Cart.tsx / CharacterDetail.tsx
  (checkout button is currently disabled with a TODO — see those two files).
Key files:
  - src/pages/Shop.tsx, CharacterDetail.tsx, Cart.tsx, About.tsx — the storefront
  - src/context/CharacterContext.tsx, CartContext.tsx — data + cart state
  - src/types/character.ts — Character/MerchItem types, MERCH_CATALOG pricing
  - public/data/cycle-001/*.json — 84 character records (12 AI-model archetypes
    x 7 user-group personas), fetched client-side
  - public/outputs/ — gitignored (old magazine-viewer image output, ~110MB, unused
    by the new storefront)
Blockers: none. Stripe checkout is a known TODO, not a blocker to committing/pushing.

REALITY CHECK (the org project list is WRONG — it says this storefront is "not
built"): It IS partly built. The old magazine viewer (101-page reader,
MagazineViewer.tsx, 168 editions) was DELETED. In its place is a half-built
character-driven merch storefront: browse 84 AI-model-archetype characters,
view detail pages, add tee/print/sticker merch to a cart. Checkout is stubbed
(no live Stripe key yet). This is real, committed, pushed code — not a plan.
