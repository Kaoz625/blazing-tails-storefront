# Replit Agent Task: blazing-tails-storefront

## Goal
Build the Blazing Tails AI character merch storefront from its current bare Vite+React scaffold into a fully functional e-commerce site with a product grid, cart, and Stripe checkout — selling merch for the Blazing Tails AI dog character brand.

## Tasks
1. **Brand identity**: Blazing Tails is an AI dog character brand (think energetic, fun, NYC street-culture-meets-pet-lifestyle); color palette: flame orange (#FF6B00), deep black (#0a0a0a), white; font: Bebas Neue (headings) + Inter (body) via Google Fonts; logo placeholder: stylized dog silhouette with flames
2. **Product catalog** (`src/data/products.ts`): define 12 products as TypeScript objects (id, name, price, category, description, imageUrl, sizes, inStock): T-shirts (4 designs), hoodies (2), stickers (3), enamel pins (2), poster (1); use placeholder image URLs from `https://placehold.co/400x400/FF6B00/white?text={ProductName}`
3. **Home page**: hero section with full-width background (flame/gradient), "Blazing Tails" headline, tagline "Merch for the AI Dog That Never Stops Running", "Shop Now" CTA; below hero: 3 category cards (Apparel, Accessories, Art Prints); below that: "Featured Products" grid (4 items)
4. **Shop page** (`/shop`): full product grid (CSS Grid, 2-col mobile/3-col tablet/4-col desktop); filter sidebar or top filter chips by category (All, Apparel, Accessories, Art); sort dropdown (Price: Low→High, High→Low, Newest); each product card has image, name, price, "Add to Cart" button, and a hover overlay with "Quick View"
5. **Product detail page** (`/product/:id`): hero image, name, price, size selector (S/M/L/XL for apparel, N/A for accessories), quantity input, "Add to Cart" button, product description, "You might also like" row of 4 related products
6. **Cart**: use React Context + useReducer for cart state; persistent via localStorage; CartSidebar component (slides in from right) showing line items with quantity +/−, remove button, subtotal, and "Checkout" button; cart icon in header shows item count badge
7. **Stripe checkout**: on "Checkout" click, call a Cloudflare Worker endpoint (`/api/checkout`) that creates a Stripe Checkout Session using the cart items; redirect user to Stripe-hosted checkout page; read `STRIPE_SECRET_KEY` from Cloudflare Worker secret (never client-side); create `worker/index.ts` with the Stripe session creation logic
8. **Success/cancel pages**: `/success` shows order confirmation with confetti animation (use canvas-confetti CDN); `/cancel` shows "Payment cancelled" with a "Return to Cart" link
9. **Header**: sticky, Blazing Tails logo left, nav links (Home, Shop, About), cart icon right with item count; hamburger on mobile
10. **About page** (`/about`): Blazing Tails brand story ("Born in NYC, powered by AI, worn by dog lovers everywhere"), character origin story, Instagram CTA

## Tech Stack
- React 19 + TypeScript + Vite (existing scaffold)
- React Router v7 (already in package.json)
- Stripe Checkout (stripe-js client + Cloudflare Worker backend with stripe Node SDK)
- Cloudflare Worker for Stripe session creation
- canvas-confetti (CDN) for success page
- CSS Modules or plain CSS (no Tailwind needed)

## Deploy Target
Cloudflare Pages (static frontend, `npm run build` → `dist/`) + Cloudflare Worker (`worker/index.ts`) for Stripe API proxy. Never Vercel.

## Done When
- [ ] Home page renders with hero, category cards, and featured products grid
- [ ] Shop page shows all 12 products with working category filter and sort
- [ ] Product detail page renders with size selector and "Add to Cart"
- [ ] Cart sidebar opens/closes, shows correct items and subtotal, persists in localStorage
- [ ] Clicking "Checkout" calls Cloudflare Worker and redirects to Stripe Checkout (test mode key OK)
- [ ] Success page shows confetti; cancel page links back to cart
- [ ] `worker/index.ts` reads STRIPE_SECRET_KEY from env (never hardcoded)
- [ ] `wrangler.toml` present with worker config
- [ ] App is fully responsive at 375px mobile
- [ ] No TypeScript errors (`tsc --noEmit` passes)
