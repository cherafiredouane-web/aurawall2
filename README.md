# AURA WALL — Premium Wall Art Website

A responsive, bilingual (English / Arabic RTL) React website for AURA WALL, a Moroccan premium plexiglass wall-art brand. The project uses the supplied AURA WALL logo, hero mark, category covers, custom-art examples, and 173 artwork files.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Vite will print the local development URL (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The static production website is generated in `dist/`.

## Deploy

The project is ready to push to GitHub. A GitHub Actions workflow is included at `.github/workflows/deploy.yml`; push to the `main` branch and enable **Settings → Pages → Build and deployment → Source: GitHub Actions** to publish it for free. The workflow adjusts the Vite base path to the repository name and includes a GitHub Pages 404 fallback for artwork deep links.

For a static host that supports SPA rewrites, deploy the `dist/` folder and route unknown paths to `/index.html`. A `public/_redirects` file is included for hosts such as Netlify. Vercel can use the following optional `vercel.json` if required:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

For GitHub Pages, the included workflow and `public/404.html` provide the deep-link fallback for clean artwork URLs.

## What's included

- Premium responsive homepage and editorial category panels
- Mobile-first, vertically stacked category covers; catalog artwork remains a two-column grid on mobile
- Category pages, anime subcategory filtering, searchable catalog, live search overlay, and artwork detail pages
- No prices shown anywhere; artwork CTAs use WhatsApp with a pre-filled message
- Personalized-art service page and five-step process
- English / Arabic language switcher with RTL layout and Almarai Arabic font
- Reduced-motion support, lazy image loading, semantic navigation, focus states, and descriptive image alt text
- Central product catalog in `src/data/products.js`
- Original provided imagery copied without image edits into `public/assets/`

## Add another artwork

1. Copy the new image into the appropriate folder under `public/assets/artworks/`.
2. Add an object to the `products` array in `src/data/products.js` with a unique `id`, searchable `title`, `category`, `subcategory`, `franchise`, `character`, `image` path, `description`, `tags`, and `slug`.
3. Use an artwork route that matches its category and subcategory, for example `/anime/naruto/itachi-uchiha-akatsuki`.

The catalog uses regular JavaScript objects so new items do not require editing page components.

## WhatsApp contact

All order/contact actions use `https://wa.me/212627025271` with a URL-encoded message. Update `WHATSAPP_NUMBER` in `src/components/utils.js` if the business number changes.

## Important notes

- There are intentionally no displayed prices.
- Category cover images and the hero image are used as supplied and are not transformed or re-exported.
- The product catalog names are descriptive starter labels; review them against your final approved product naming before publishing. Replace or refine names and tags in `src/data/products.js` whenever needed.
- Google Fonts are loaded remotely for DM Sans, Manrope, and Almarai; the system sans-serif fallback is used if the font service is unavailable.
