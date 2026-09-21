                   # East West Trading International (EWI) — Website

Official corporate website for **East West Trading International** (`https://www.eastwestint.qa/`), a Qatari trading and engineering establishment operating in Doha since 2002.

The company distributes advanced systems and delivers engineering services across four primary sectors:
- **Lab Systems**: Turnkey laboratory fit-outs, scientific instrumentation, casework, and lab automation.
- **Electrical Division**: Cable management, industrial enclosures, terminal blocks, site materials, and tooling.
- **Network & Data Centre**: Structured cabling, optical fibre, network switching, and modular data centre solutions (BDCOM, FABNET).
- **Cyber Security**: Network visibility and threat detection platforms (NEOX Networks, Stamus Networks) delivered with professional engineering services.

------------
For Cedi & other devs
use this prompt for every new task
Read instructions.md and README.md first. Inspect the relevant files before making any changes. Then complete the task below.

note that Instructions.md is for AI and technical only. Do not over rely on it.
and that README is for the developpers only. and not for AI

-----------
---

## Technology Stack

- **Frontend**: Plain HTML5, Vanilla CSS3, Vanilla JavaScript (ES6+).
- **Fonts**: Self-hosted `Barlow` (body) and `Barlow Condensed` (headings) via WOFF2.
- **Icons**: Self-hosted [Lucide Icons](https://lucide.dev/) (`assets/js/lucide.min.js`, `stroke-width: 1.5`) + 26 self-contained Base64 CSS mask icons for divisions, services, sectors, and communication channels (`whatsapp.png`, `mail.png`, `messenger.png`, `telephone.png`).
- **Media**: Self-hosted, compressed H.264 video with fallback poster image.
- **Server / Routing**: Apache `.htaccess` with automated subfolder detection (`EWI_BASE`), long-term caching, and branded 404 error routing.
- **Dependencies & Build**: **None.** No Node.js, npm, Vite, Webpack, PHP runtime, CMS, or database. 100% offline capable.

---

## Running the Website Locally

Because the project uses standard web technologies with relative asset paths, no compilation is required:

1. **Direct Disk Launch (`file:///`)**: Double-click `index.html` or drag it into any modern web browser (including Brave Browser). All icons, fonts, styles, and scripts load 100% offline without CORS or security errors.
2. **Local HTTP Server** (e.g., `http://localhost/ewi-website-redesign/` or `python -m http.server 8000`):
   Navigate to `http://localhost:8000/`.

---

## Project Structure

```
ewi5/
├── index.html            # Home page (hero video, stats, divisions, client marquee)
├── about.html            # About EWI (company history, milestones, Doha facilities)
├── divisions.html        # Divisions overview and detailed division sections
├── services.html         # Engineering services, turnkey projects, maintenance
├── partners.html         # Principal partner brands directory by division
├── clients.html          # Institutional, energy, healthcare, and research clients
├── contact.html          # Dedicated Contact Us page (RFQ form, office map, direct links)
├── 404.html              # Branded 404 error page
├── .htaccess             # Apache configuration & caching rules
├── robots.txt            # Search engine crawler directives
├── sitemap.xml           # Search engine sitemap
├── assets/
│   ├── css/ewi.css       # Unified site stylesheet, tokens & 26 Base64 mask icons
│   ├── js/ewi.js         # Vanilla JS (navigation, reveals, counters, marquee, form)
│   ├── fonts/            # Self-hosted Barlow & Barlow Condensed WOFF2 fonts
│   ├── video/            # Optimized hero background video
│   ├── logos/            # Partner and client logo assets
│   ├── icons/            # 26 division, service, sector & communication mask icons (incl. whatsapp, mail, messenger, telephone)
│   └── placeholders/     # Temporary stock photos pending real project photos
├── INSTRUCTIONS.md       # Detailed technical reference for AI IDEs & contributors
├── reports.md            # Usability, accessibility, and UX audit findings
└── Trash/                # Archive of legacy PHP files (do not deploy to production)
```

---

## Key Features & Design System

- **Industry Wireframe Design System**: Built on technical blueprint motifs featuring square corners, hairline borders, and `+` registration crosshair marks (`.blueprint`).
- **Accessible Color Palette**: Grounded in neutral light gray (`#f2f2f3`) with a steel-blue accent palette (`#5980a6`, `#416180`). Text and button contrasts satisfy WCAG AA requirements (> 4.5:1).
- **Interactive Division Cards**: Entire cards on the Divisions page link directly to their corresponding sections with smooth scrolling and hover focus.
- **Original Color Logos**: Partner and client logos render in their authentic brand colors by default across all pages.
- **Responsive Navigation**: Desktop includes a multi-column mega-menu for divisions; mobile viewports (< 1024px) collapse into an accessible slide-in drawer with Escape-key handling and body scroll lock.
- **Accessibility & Motion Safety**: Respects `prefers-reduced-motion` by disabling infinite marquee loops, slide transitions, and scroll animations.

---

## Developer Guidelines

1. **Editing Shared Components**:
   The top utility bar, main navigation header, and footer are mirrored across all **8 `.html` files** (`index.html`, `about.html`, `divisions.html`, `services.html`, `partners.html`, `clients.html`, `contact.html`, `404.html`). When modifying navigation links, phone numbers, WhatsApp links, or footer copy, you MUST update all 8 files.
2. **Asset Versioning (Cache Busting)**:
   When modifying `assets/css/ewi.css` or `assets/js/ewi.js`, bump the version query parameter (current: `?v=20260921.2`) across all 8 `.html` files to ensure browsers load the latest version.
3. **No Frameworks**:
   Do not introduce heavy third-party CSS or JS frameworks (Tailwind, Bootstrap, jQuery, React, etc.). Maintain the lightweight, zero-dependency architecture.
4. **MANDATORY CHANGE LOGGING & DOCUMENTATION UPDATE RULE**:
   After **EVERY SINGLE CHANGE** made to the site (features, bug fixes, UI adjustments, asset updates), developers and AI agents MUST:
   - Update `README.md`, `INSTRUCTIONS.md`, and `reports.md`.
   - Add an itemized entry in the Revision History / Changelog.
   - Record the exact timestamp (e.g. `2026-09-21 10:30 UTC+3`) and project version tag (e.g. `ewiv5-v2-03`, `ewiv5-v2-04`).
   - Validate parity across all 8 `.html` files.

---

## Revision History & Changelog

### Version `ewiv5-v3-05` — 2026-09-21 11:00 UTC+3
- **User-Friendly Contact Us Experience**: Replaced technical RFQ form on `contact.html` with an inviting, accessible "Get in touch with us!" form featuring human-centered labels (Your Name, Company / Organization (Optional), Email Address, Phone Number, Topic dropdown, Subject, Your Message).
- **Communication Channel Icons**: Directly wired the 4 primary communication cards to dedicated icons in `assets/icons/` (`telephone.png`, `whatsapp.png`, `messenger.png`, `mail.png`) with interactive hover transitions and direct click-to-call, WhatsApp, direct form messaging, and email actions.
- **Removed Specialized Desks Section**: Eliminated the redundant division desk cards section from `contact.html` to streamline page focus and improve mobile readability.
- **Cache Busting**: Bumped asset cache string across all 8 HTML files to `?v=20260921.2`.
- **Logo Update**:
  - Replaced `assets/logo.png` with `assets/logo_transparent_upscaled.png` on all 8 HTML files.
  - Updated `width` attribute from `740` to `754`.

### Version `ewiv5-v3-04` — 2026-09-21 10:30 UTC+3
- **Dedicated Contact Us Page**: Added `contact.html` with interactive technical RFQ form, validation, Doha office Google Map embed (Financial Square, C-Ring Road), direct contact cards, and division engineering desk directory.
- **Navigation CTAs**: Changed "Request a quote" to "Contact Us" across desktop header CTA and mobile drawer menu on all 8 HTML files (`index.html`, `about.html`, `divisions.html`, `services.html`, `partners.html`, `clients.html`, `contact.html`, `404.html`).
- **Footer Updates**: Added `contact.html` ("Contact us") to Company links in all 8 HTML files.
- **Home Hero Action**: Changed hero secondary button from "Contact Us" (`#contact`) to "Explore us" (`divisions.html`).
- **Icon Architecture Expansion**: Integrated communication icons `whatsapp.png`, `mail.png`, `messenger.png`, and `telephone.png` in `assets/icons/` and embedded them as Base64 data URIs in `assets/css/ewi.css` (`.icon-whatsapp`, `.icon-mail`, `.icon-messenger`, `.icon-telephone`), bringing the total embedded icon count to 26.
- **Sitemap**: Added `https://www.eastwestint.qa/contact.html` to `sitemap.xml`.
- **Operating Protocol**: Established mandatory rule to update `README.md`, `INSTRUCTIONS.md`, and `reports.md` with timestamps and version notes after every change.

### Version `ewiv5-v3-03` — 2026-09-21 06:45 UTC+3
- **Media & Asset Optimization**: Hero background video compressed and optimized (`0909_compress_optimized.mp4`).
- **Brand Imagery**: Updated division brand marks in `assets/icons/` and refreshed logos.
- **SEO & Structured Data**: Refreshed metadata across all pages, updated sitemap lastmod timestamps to `2026-09-21`.

### Version `ewiv5-v3-02` — 2026-09-16 14:00 UTC+3
- **Offline Icon Compatibility**: Self-hosted Lucide icons in `assets/js/lucide.min.js` and embedded 22 Base64 data URI CSS mask icons into `assets/css/ewi.css` to fix Chromium/Brave local file origin CORS blocking.

### Version `ewiv5-v3-01` — 2026-09-14 11:30 UTC+3
- **Architecture Migration**: Completed migration from legacy PHP to 100% pure static HTML5/CSS3/JS architecture. Archived PHP codebase into `Trash/`.

