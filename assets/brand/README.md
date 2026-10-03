# HIPE brand assets

`originals/` preserves the two supplied PNGs used by the website and asset generation scripts. Web variants trim transparent margins and keep the original artwork and colours; no logos have been redrawn.

- `hipe-black.webp`: current website header on light backgrounds.
- `hipe-black.png`: social cards and Organization structured data.
- `symbol-red.png`: symbol used by the social card generator.

`../icons/` contains favicons at 16 and 32 pixels, the 180-pixel Apple touch icon, and 192/512-pixel manifest icons. The multi-resolution ICO is `/favicon.ico`.

`../social/` contains page-specific JPG share cards at 1200 × 630 pixels.

Regenerate web and icon assets with `python3 scripts/prepare-brand-assets.py` (Pillow required). Regenerate share cards with `node scripts/render-social-cards.cjs` (Playwright required; optionally set `PLAYWRIGHT_MODULE_PATH` and `CHROME_PATH`).

SEO uses `https://www.hipeagency.es` as the public canonical origin. Update canonical, OG, JSON-LD, `sitemap.xml` and `robots.txt` together if the public domain or page URLs change. Language switching is a client-side preference; there are no separate language URLs or hreflang declarations.
