# MorpheaUTSW

# Sclerosing Skin Disease — Website

## File Structure
```
sclerosingskindoc/
├── index.html          ← START HERE (homepage / landing page)
├── css/
│   └── style.css       ← All styles (design tokens, layout, components)
├── js/
│   └── main.js         ← Shared JS (nav toggle, scroll reveal, active links)
└── pages/
    ├── patients.html   ← For Patients & Families
    ├── clinicians.html ← For Clinicians
    ├── products.html   ← Support Products (add product cards here)
    └── disclosures.html← Full COI / Compliance disclosures
```

## How to Preview Locally
1. Open VS Code
2. Install the **Live Server** extension (search "Live Server" in the Extensions panel)
3. Right-click `index.html` → **Open with Live Server**
4. Your browser will open automatically and refresh on every save ✅

## How to Add a Product (products.html)
1. Open `pages/products.html`
2. Find the comment block: `<!-- ── PRODUCT CARD TEMPLATE ──`
3. Copy one `.product-card` div block
4. Replace:
   - `product-card__category` → category label (e.g., "Moisturizers")
   - `product-card__name` → product name
   - `product-card__desc` → factual description (no promotional language)
   - `href="#"` → the actual product URL (Amazon, retailer, etc.)
5. Save — Live Server will refresh instantly

## Compliance Reminders
- Primary disclaimer must stay visible without scrolling on products.html ✅
- COI disclosure block must stay on products.html (verbatim) ✅
- Micro-disclosure ("Some items may generate revenue...") stays on each product card ✅
- Footer line "Views are my own..." must stay on every page ✅
- DO NOT add "recommend", "treat", or "cure" language to any page

## Hosting (when ready)
Easiest free options:
- **GitHub Pages** — push to a GitHub repo, enable Pages in Settings
- **Netlify** — drag and drop the folder at netlify.com/drop
Both are free, fast, and HTTPS by default.