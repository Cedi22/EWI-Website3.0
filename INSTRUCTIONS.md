# EWI Website — Technical Context & Operating Instructions

This document is the source of truth for AI IDEs, agents, and developers working on the East West Trading International (EWI) website.

---

## 1. Project Overview & Architecture

- **Client**: East West Trading International (EWI) — Doha, Qatar (`https://www.eastwestint.qa/`).
- **Nature of Business**: Qatari distributor and engineering services provider for laboratory systems, electrical site materials, network & data centre infrastructure, and cyber security platforms.
- **Architecture**: **100% Pure Static Website** (HTML5, Vanilla CSS3, Vanilla JS).
- **Zero Runtime / Zero Build Step**: No Node.js, npm, Vite, Webpack, Parcel, Gulp, PHP runtime, CMS, or database.
- **Path Portability**: All internal paths (links, stylesheets, scripts, images, videos) are strictly relative. The site functions identically at a domain root or in any subfolder (e.g. `https://baalbaki.me/ewi5/`).

---

## 2. Hard Constraints (What NOT to Use)

- **NO Frameworks or Build Tools**: Do not install or introduce React, Vue, Next.js, Vite, npm, or build scripts.
- **NO CSS Frameworks**: Do not introduce Tailwind CSS, Bootstrap, or other utility frameworks. All styling lives in `assets/css/ewi.css`.
- **NO JS Libraries**: Do not introduce jQuery, Swiper, Slick, GSAP, or heavy external bundles. Use Vanilla JavaScript in `assets/js/ewi.js`.
- **NO Server-Side Processing**: The site was previously migrated away from PHP. The PHP version is archived in `Trash/` for historical reference only. Do not reintroduce PHP or server dependencies.
- **NO Hardcoded Absolute URLs**: Avoid absolute domain links like `https://www.eastwestint.qa/about.html` for internal assets or navigation; use relative paths (e.g., `about.html`, `assets/css/ewi.css`).

---

## 3. Directory & File Structure

```
ewi5/
├── index.html            # Homepage (hero video, 4 division cards, counters, marquee)
├── about.html            # Company history, values, milestones, Doha facilities
├── divisions.html        # Comprehensive breakdown of all 4 divisions
├── services.html         # Supply, turnkey fit-out, installation/commissioning, calibration
├── partners.html         # Principal partner directory categorized by division
├── clients.html          # Institutional and industrial client portfolio
├── contact.html          # Dedicated Contact Us page (RFQ form, office map, direct links)
├── 404.html              # Custom branded 404 error page
├── .htaccess             # Apache server configuration (subfolder detection, cache, 404)
├── robots.txt            # Crawl directives
├── sitemap.xml           # Search engine sitemap
├── INSTRUCTIONS.md       # Technical context & instructions for AI IDEs (this file)
├── README.md             # Developer & project overview documentation
├── reports.md            # UX/Usability audit log and tracking
├── assets/
│   ├── css/
│   │   └── ewi.css       # Unified site stylesheet (tokens, layout, components, media queries)
│   ├── js/
│   │   └── ewi.js        # Vanilla JS (nav drawer, reveals, counters, marquee, video, sliders)
│   ├── fonts/            # Self-hosted Barlow & Barlow Condensed (.woff2)
│   ├── video/            # Compressed & optimized hero video (0909_compress_optimized.mp4)
│   ├── logos/            # Partner and client logo images (organized in subfolders)
│   ├── icons/            # 26 division, service, sector, and communication mask icons (incl. whatsapp, mail, messenger, telephone)
│   ├── placeholders/     # Temporary stock photos pending authentic project photos
│   ├── slides/           # Hero and slide background assets
│   ├── logo.png          # Main header logo
│   └── footer-logo-rm-bg.png # Transparent footer emblem & favicon
├── Trash/                # ARCHIVE ONLY: Legacy PHP site and unused assets (DO NOT DEPLOY)
└── _ds/                  # ARCHIVE/REF ONLY: Source Industry design system bundle (DO NOT DEPLOY)
```

---

## 4. Design System & UI Rules

The site implements the **Industry Design System** (`_ds/industry-68391cf8-3edb-44b5-a372-58b11617ea31/`):
- **Aesthetic**: Technical wireframe/blueprint theme — clean hairline borders, square corners, and registration crosshair marks (`+`).
- **Corner Marks**: Elements with `.blueprint` require four corner mark child elements:
  ```html
  <div class="card blueprint reveal">
    <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
    ...
  </div>
  ```
  *(Note: Corner elements are automatically given `aria-hidden="true"` by `ewi.js`)*.
- **Colors**:
  - Ground / Background: `--color-bg` (`#f2f2f3`)
  - Surface: `--color-surface` (`#e9e9ea`)
  - Text: `--color-text` (`#1d1f20`)
  - Primary Accent: `--color-accent` (`#5980a6`)
  - Accent Tonal Ramp: Defined as `--color-accent-100` through `--color-accent-900` in `assets/css/ewi.css`.
  - Accessible Contrast: Dark buttons and key headings use `--color-accent-700` (`#416180`) or `--color-accent-900` (`#1d2d3d`) to ensure WCAG AA compliance (> 4.5:1).
- **Typography**:
  - Headings: `Barlow Condensed` (`font-weight: 600`, self-hosted in `assets/fonts/`).
  - Body: `Barlow` (`font-weight: 400`, self-hosted in `assets/fonts/`).
- **Logos (`.logo-cell`)**:
  - Must display in their **natural, original colors by default** (`filter: none; opacity: 1;`).
  - Hover provides a subtle lift (`translateY(-5px)`), border highlight, shadow, and `transform: scale(1.05)` (or `1.08` in grid). Do NOT apply default grayscale filters to logos.
- **Division Cards**:
  - On `divisions.html`, the four cards use `<a class="card blueprint reveal" href="#[division]">` to allow whole-card clicking and smooth scrolling to the division sections.
  - On `index.html`, the cards use `<a class="div-card blueprint reveal" href="divisions.html#[division]">`.

---

## 5. Website Divisions & Core Pages

EWI operates **four divisions** across Qatar:
1. **Lab Systems** (`#lab`) — Turnkey laboratories, analytical instrumentation, fume hoods, lab furniture, automation.
2. **Electrical Division** (`#electrical`) — Cable management, enclosures, terminal blocks, site materials, tools.
3. **Network & Data Centre** (`#network`) — Structured cabling, fibre optics, network switching, modular data centre infrastructure (BDCOM, FABNET).
4. **Cyber Security** (`#cyber`) — Network visibility and threat detection (NEOX Networks, Stamus Networks) delivered with engineering professional services.

---

## 6. JavaScript & CSS Behaviors

1. **Scroll Reveal**: Elements with class `.reveal` start with opacity 0 and translateY(22px). An `IntersectionObserver` in `ewi.js` adds `.is-in` when entering the viewport. Scoped to `html.js` so content remains 100% visible if JS is disabled.
2. **Stat Counters**: Elements with `[data-count]` animate numerical counts via requestAnimationFrame once observed.
3. **Logo Marquee**: Elements with `.marquee-track` are duplicated once in the DOM by `ewi.js` to create an infinite, seamless loop. The marquee automatically pauses on hover.
4. **Hero Video**: Autoplays inline muted (`assets/video/0909_compress_optimized.mp4`) with a poster fallback. `ewi.js` includes event listeners for touch/scroll to trigger playback on iOS Low Power Mode.
5. **Division Lab Slider**: Auto-advances with animated countdown dots. Includes a dedicated WCAG 2.2.2 pause/play toggle button and pauses on mouse hover or keyboard focus.
6. **Scroll-Spy**: Anchor pills (`.anchors a[href^="#"]`) on Divisions, Partners, and Clients track current scroll position and receive `.is-active`.
7. **Motion Sensitivity**: `@media (prefers-reduced-motion: reduce)` disables animations, replaces infinite marquee with a static grid, and removes transitions.

---

## 7. Editing & Maintenance Rules

1. **Shared Shell (Header & Footer)**:
   - Because the site is static HTML without server-side includes, the utility bar, primary navigation header, and site footer are mirrored across all **8 `.html` files** (`index.html`, `about.html`, `divisions.html`, `services.html`, `partners.html`, `clients.html`, `contact.html`, `404.html`).
   - **Crucial**: Whenever changing navigation links, phone numbers, WhatsApp links, emails, or footer text, you MUST update all 8 files.
2. **Cache Busting**:
   - `assets/css/ewi.css` and `assets/js/ewi.js` are linked with a version query string (current: `?v=20260921.3`).
   - Whenever updating CSS or JS, bump this version across all 8 HTML files so visitors and proxies fetch fresh assets.
3. **MANDATORY CHANGE LOGGING & DOCUMENTATION UPDATE RULE**:
   - **Crucial Requirement**: After **EVERY SINGLE CHANGE** made to the site (features, bug fixes, UI adjustments, asset updates), developers and AI agents MUST:
     1. Update `INSTRUCTIONS.md`, `README.md`, and `reports.md`.
     2. Add a clear, itemized entry in the Revision History / Changelog.
     3. Explicitly state the exact local timestamp (e.g. `2026-09-21 10:30 UTC+3`) and version identifier (e.g. `ewiv5-v2-03`, `ewiv5-v2-04`).
     4. Confirm parity across all 8 `.html` files and test on both desktop and mobile viewports.

---

## 8. Local Testing, Icon System & Offline Compatibility

- **Local Viewing**: Drag `index.html` directly into any modern web browser (`file:///`) or open it via a local static server (e.g. `http://localhost:8000/` or `python -m http.server`).
- **100% Offline Capability**: All fonts (`assets/fonts/`), images, video, CSS, Lucide JS (`assets/js/lucide.min.js`), and icon masks are fully self-hosted. Zero external network requests (`unpkg.com`, Google Fonts, CDNs) are made.
- **Icon Architecture & file:/// / Brave Browser Compatibility**:
  - *Root Cause*: Chromium/Brave strictly blocks `mask-image: url(../icons/...)` when loaded from local disk (`file:///`) due to file-origin CORS restrictions, rendering all CSS mask icons invisible. Additionally, Brave Shields or offline environments block `unpkg.com` for Lucide icons.
  - *Solution*:
    1. Lucide icons are self-hosted locally at `assets/js/lucide.min.js`.
    2. All **26 division, service, sector, and communication icons** (`assets/icons/`) are embedded directly into `assets/css/ewi.css` as optimized Base64 PNG data URIs (`-webkit-mask-image` and `mask-image`). This completely circumvents `file:///` CORS security blocks, renders crisply across high-DPI displays, and preserves dynamic CSS accent coloring (`var(--color-accent)`) and hover transitions.
    3. **Icon Inventory & Classes**:
       - *Divisions*: `.icon-lab` (`lab.png`), `.icon-electrical` (`electrical.png`), `.icon-cables` (`cables.png`), `.icon-cybersecurity` (`cybersecurity.png`).
       - *Services & Sectors*: `.icon-authorize`, `.icon-box`, `.icon-data-center`, `.icon-electrical-materials`, `.icon-gas`, `.icon-gauge`, `.icon-government`, `.icon-health`, `.icon-helmet`, `.icon-installation`, `.icon-lab-automation`, `.icon-lab-furniture`, `.icon-location`, `.icon-mortarboard`, `.icon-moving-truck`, `.icon-persons`, `.icon-stethoscope`, `.icon-turnkey`.
       - *Communication & Contact*:
         - `whatsapp.png` &rarr; `.icon-whatsapp` (WhatsApp chat & floating quick contact)
         - `mail.png` &rarr; `.icon-mail` (Official RFQ & enquiry email desk)
         - `messenger.png` &rarr; `.icon-messenger` (Direct chat & message action)
         - `telephone.png` &rarr; `.icon-telephone` (Direct landline / sales engineering hotline)
- **Accessibility & Contrast**:
  - In `.section--dark`, card icons are tinted with `var(--color-accent-300)` and headings styled in `#fff` to ensure WCAG AA contrast compliance (> 7:1 ratio against dark navy).
  - Heading hierarchy follows a strict semantic structure (`H1` &rarr; `H2` &rarr; `H3`) across all pages without visual disruption.
- **SEO & Structured Data**:
  - Every page includes unique, length-calibrated `<title>` (under 65 chars to avoid Google SERP truncation), targeted `<meta name="description">`, `canonical`, Open Graph, and Twitter Card metadata.
  - Local Qatar SEO geo-meta tags (`geo.region: QA-DA`, `geo.placename: Doha`, `geo.position`, `ICBM`) and `site.webmanifest` linked across all pages.
  - Critical fonts (`barlow-400.woff2` and `barlow-condensed-600.woff2`) preloaded in `<head>` to prevent CLS and boost Google Core Web Vitals.
  - `404.html` uses `<meta name="robots" content="noindex, follow">`.
  - JSON-LD structured data includes rich `WebSite`, `LocalBusiness` / `Corporation` (with GeoCoordinates, priceRange, contactPoint for English/Arabic sales), `FAQPage` (Google rich snippet eligible), `BreadcrumbList`, `AboutPage`, `CollectionPage` (with `OfferCatalog` and `Brand` list), and multi-entity `Service` schemas.
  - `sitemap.xml` contains production canonical URLs with `<changefreq>`, `<priority>`, Google Image XML extensions (`xmlns:image`), and `<lastmod>2026-09-21</lastmod>`.
  - `.htaccess` includes `mod_deflate` Gzip compression and security/referrer headers for Google PageSpeed optimization.

---

## 9. Deployment Guide (Virtualmin VPS / Apache)

Upload **only** production-ready assets to `public_html` or target subfolder (e.g. `public_html/ewi5/`):
```
.htaccess
index.html
about.html
divisions.html
services.html
partners.html
clients.html
contact.html
404.html
robots.txt
sitemap.xml
site.webmanifest
assets/          (entire directory)
```

**DO NOT UPLOAD**:
`Trash/`, `_ds/`, `.agents/`, `.claude/`, `.vscode/`, `.git/`, `reports.md`, `INSTRUCTIONS.md`, or `skills-lock.json`.
*(The `.htaccess` configuration is set up to block access with a 404 if any of these are uploaded accidentally).*

---

## 10. Known Unfinished Work & Future Backlog

Refer to [`reports.md`](reports.md) for full context:
1. **Placeholder Photography**: Replace temporary stock photos with real Qatar project photos:
   - `assets/placeholders/warehouse-placeholder.jpeg` (Home & About)
   - `assets/electrical-placeholder.png` (Divisions / Electrical)
   - `assets/placeholders/data-centre.jpg` (Divisions / Network & Data Centre)
   - `assets/cybersecurity-placeholder.jpg` (Divisions / Cyber Security)
2. **Dedicated Contact Us Page & Technical RFQ Form**: **COMPLETED (2026-09-21, v2-04)** — Built dedicated `contact.html` with on-page interactive form (Name, Organization, Email, Telephone, Division selector, BOQ reference, Scope), office map, and direct contacts.
3. **Self-Hosting Lucide Icons**: **COMPLETED (2026-09-16)** — Lucide v0.469.0 is now self-hosted in `assets/js/lucide.min.js`.

---

## 11. Revision History & Changelog

### Version `ewiv5-v2-10` — 2026-09-21 15:12 UTC+3
- **Header Navigation Contact Us Button Cleaned**: Removed the WhatsApp icon from the desktop header navigation "Contact Us" CTA button (`.header-cta`) across all 8 HTML files (`index.html`, `about.html`, `divisions.html`, `services.html`, `partners.html`, `clients.html`, `contact.html`, `404.html`), restoring the clean text and chevron arrow (`Contact Us <i data-lucide="arrow-right"></i>`).

### Version `ewiv5-v2-09` — 2026-09-21 15:10 UTC+3
- **Floating WhatsApp Icon Display Fix**: Fixed the `.wa-float` icon display bug where `.wa-float img` / `.wa-icon` rendered as a solid green square box. Removed `background-color: #25d366` from `.wa-float img` and `.wa-float .wa-icon` so the transparent PNG canvas of `assets/icons/whatsapp.png` remains transparent while CSS filter properly tints the authentic speech bubble and phone handset in brand `#25D366` WhatsApp green.
- **Floating Widget Proportions & Micro-Interactions**: Enhanced `.wa-float` with smooth border-color transition and subtle green hairline highlight on hover. Preserved responsive square badge mode (56x56) on mobile viewports (< 520px).
- **Cache Busting**: Bumped asset cache version string across all 8 HTML files to `?v=20260921.3`.

### Version `ewiv5-v2-08` — 2026-09-21 14:56 UTC+3
- **Direct WhatsApp.png Icon Integration**: Embedded the authentic high-resolution `assets/icons/whatsapp.png` image directly across all desktop Contact Us buttons, header CTA buttons, homepage hero actions, and the floating `.wa-float` WhatsApp widget on all 8 pages.
- **Button Micro-Styling & Color Tuning**: Added `.btn-wa-icon` styles in `assets/css/ewi.css` with automatic color inversion for dark primary buttons (`filter: brightness(0) invert(1)`) and authentic `#25D366` WhatsApp green tuning on floating and secondary buttons.

### Version `ewiv5-v2-07` — 2026-09-21 14:50 UTC+3
- **Preserved Core Slogan**: Restored EWI's signature animated slogan "Excellence through Innovation" on `index.html` with data attributes (`data-slogan-word="excellence"`, `through`, `innovation`) and animated keyframes in `ewi.css`.
- **Streamlined & Uncluttered Contact Us**: Re-engineered `contact.html` into a simple, unified, two-column layout ("Get in touch with us") without redundant floating cards; features quick form on the left and direct contact channels (Phone, WhatsApp, Email, Hours, Address) + Google Map on the right.
- **CTA Unified to Contact Us**: Replaced all remaining instances of "Request a Quote" with "Contact Us".
- **Floating WhatsApp Icon Update**: Updated `.wa-float` across all 8 HTML files to use the official WhatsApp mask icon (`.icon-whatsapp`) with dedicated `#25d366` WhatsApp green mask styling and hover micro-interaction.
- **Skim-Optimized UX**: Strengthened scannability across the site with prominent numbering, concise copy, and clear visual hierarchy for visitors seeking rapid answers.

### Version `ewiv5-v2-06` — 2026-09-21 14:38 UTC+3
- **Qatar Business Copywriting Overhaul**: Completely rewrote all page copy across all 8 HTML files (`index.html`, `about.html`, `divisions.html`, `services.html`, `partners.html`, `clients.html`, `contact.html`, `404.html`) to sound authentic, human, and grounded in local Qatar commercial trading reality.
- **Removed AI Buzzwords & Marketing Clichés**: Stripped out buzzwords ("seamless", "cutting-edge", "revolutionary", "innovative solutions", "unlock potential", "next level", "empower", "transform", "end-to-end", "bespoke", "leveraging", "robust", "scalable", "at the forefront", "redefining", "elevate", "navigate the landscape") and eliminated all em dashes.
- **Direct Practical Qatar Business Style**: Modeled after leading Doha corporate business styles (Helpline Translation, Alot Solutions) with short, clear sentences stating exactly what EWI does, its 4 divisions, procurement processes, Doha stock, and support for Qatar contractors and institutions.

### Version `ewiv5-v2-05` — 2026-09-21 11:00 UTC+3
- **User-Friendly Contact Us Experience**: Replaced technical RFQ form on `contact.html` with an inviting, accessible "Get in touch with us!" form featuring human-centered labels (Your Name, Company / Organization (Optional), Email Address, Phone Number, Topic dropdown, Subject, Your Message).
- **Communication Channel Icons**: Directly wired the 4 primary communication cards to dedicated icons in `assets/icons/` (`telephone.png`, `whatsapp.png`, `messenger.png`, `mail.png`) with interactive hover transitions and direct click-to-call, WhatsApp, direct form messaging, and email actions.
- **Removed Specialized Desks Section**: Eliminated the redundant division desk cards section from `contact.html` to streamline page focus and improve mobile readability.
- **Cache Busting**: Bumped asset cache string across all 8 HTML files to `?v=20260921.2`.

### Version `ewiv5-v2-04` — 2026-09-21 10:30 UTC+3
- **Dedicated Contact Us Page**: Created `contact.html` fully styled in Industry Design System wireframe/blueprint motifs, including interactive RFQ form with validation, Doha office Google Map embed (Financial Square, C-Ring Road), direct contact cards, and division engineering desk directory.
- **Navigation CTAs**: Replaced "Request a quote" with "Contact Us" linking to `contact.html` in desktop header CTA and mobile drawer menus across all 8 HTML files (`index.html`, `about.html`, `divisions.html`, `services.html`, `partners.html`, `clients.html`, `contact.html`, `404.html`).
- **Footer Updates**: Added `contact.html` ("Contact us") to Company links in all 8 HTML files.
- **Home Hero Action**: Changed hero secondary CTA from "Contact Us" (`#contact`) to "Explore us" (`divisions.html`).
- **Icon Architecture Expansion**: Integrated communication icons `whatsapp.png`, `mail.png`, `messenger.png`, and `telephone.png` in `assets/icons/` and embedded them as Base64 data URIs in `assets/css/ewi.css` (`.icon-whatsapp`, `.icon-mail`, `.icon-messenger`, `.icon-telephone`), bringing the total embedded icon count to 26.
- **Sitemap**: Added `https://www.eastwestint.qa/contact.html` to `sitemap.xml`.
- **Operating Protocol**: Formalized mandatory rule to update `INSTRUCTIONS.md`, `README.md`, and `reports.md` with timestamps and version notes after every change.

### Version `ewiv5-v2-03` — 2026-09-21 06:45 UTC+3
- **Media & Asset Optimization**: Hero background video compressed and optimized (`0909_compress_optimized.mp4`).
- **Brand Imagery**: Updated division brand marks in `assets/icons/` and refreshed logos.
- **SEO & Structured Data**: Refreshed metadata across all pages, updated sitemap lastmod timestamps to `2026-09-21`.

### Version `ewiv5-v2-02` — 2026-09-16 14:00 UTC+3
- **Offline Icon Compatibility**: Self-hosted Lucide icons in `assets/js/lucide.min.js` and embedded 22 Base64 data URI CSS mask icons into `assets/css/ewi.css` to fix Chromium/Brave local file origin CORS blocking.

### Version `ewiv5-v2-01` — 2026-09-14 11:30 UTC+3
- **Architecture Migration**: Completed migration from legacy PHP to 100% pure static HTML5/CSS3/JS architecture. Archived PHP codebase into `Trash/`.

