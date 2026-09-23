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
├── contact.html          # Dedicated Contact Us page (RFQ form, office map, webmail/WhatsApp links)
├── privacy.html          # Legal Privacy Policy & Data Protection Notice (Qatar Law No. 13 of 2016)
├── 404.html              # Custom branded 404 error page
├── .htaccess             # Apache server configuration (CSP, clickjacking, subfolder detection, cache, 404)
├── robots.txt            # Crawl directives
├── sitemap.xml           # Search engine sitemap
├── QREPORT.md            # Concise quality & publication-readiness report
├── WEBSITE_QREPORT.md    # Detailed audit report & remediation verification log
├── INSTRUCTIONS.md       # Technical context & instructions for AI IDEs (this file)
├── README.md             # Developer & project overview documentation
├── reports.md            # UX/Usability audit log and tracking
├── REPORT_WEBSITE.md     # Comprehensive website audit report & readiness roadmap (September 2026)
├── assets/
│   ├── css/
│   │   └── ewi.css       # Unified site stylesheet (tokens, layout, components, media queries)
│   ├── js/
│   │   ├── ewi.js        # Vanilla JS (nav drawer, reveals, counters, marquee, video, sliders, accordion, back-to-top)
│   │   └── lucide.min.js # Self-hosted Lucide icons bundle (v0.469.0)
│   ├── fonts/            # Self-hosted Barlow & Barlow Condensed (.woff2)
│   ├── video/            # Optimized hero background video (0.mp4, 3.4 MB)
│   ├── logos/            # Partner and client logo images (organized in subfolders)
│   ├── icons/            # 30 division, service, sector, communication, and UI control icons
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
8. **Solutions & Capabilities Accordion (`about.html`)**: `.accordion-card` components for all 6 core engineering offerings. Accessible toggle button (`.accordion-toggle`) alternates dynamic state icons (`assets/icons/down.png` &rarr; `assets/icons/up.png`), updates `aria-expanded`, and supports direct URL hash deep linking (e.g. `about.html#lab-systems`) with auto-expansion and smooth scroll on load or hashchange.
9. **Floating Back-to-Top Button**: Dedicated `.back-to-top` floating utility control anchored at screen bottom-left (`assets/icons/top.png`). Managed by an `IntersectionObserver` on `.site-footer` (with scroll fallback) to emerge cleanly when approaching the footer, leaving bottom-right clear for WhatsApp.
10. **Responsive Label Utilities**: `.u-desktop-label` and `.u-mobile-label` utility classes allow button and CTA labels to be shortened for narrow mobile viewports without losing full desktop phrasing.
11. **Mobile Ergonomics & Blueprint Integration**: Category anchor pills (`.anchors a`, `.div-anchor`) adopt semi-transparent blueprint glass styling on mobile viewports with unified `var(--color-accent-700)` active indicators, enlarged touch targets (>= 50px for Back-to-Top, 36px min-height for accordion toggle), and subtle card borders/dividers.

---

## 7. Editing & Maintenance Rules

1. **Shared Shell (Header & Footer)**:
   - Because the site is static HTML without server-side includes, the utility bar, primary navigation header, and site footer are mirrored across all **9 `.html` files** (`index.html`, `about.html`, `divisions.html`, `services.html`, `partners.html`, `clients.html`, `contact.html`, `privacy.html`, `404.html`).
   - **Crucial**: Whenever changing navigation links, phone numbers, WhatsApp links, emails, or footer text, you MUST update all 9 files.
2. **Cache Busting**:
   - `assets/css/ewi.css` and `assets/js/ewi.js` are linked with a version query string (current: `?v=20260923.7`).
   - Whenever updating CSS or JS, bump this version across all 9 HTML files so visitors and proxies fetch fresh assets.
3. **MANDATORY CHANGE LOGGING & DOCUMENTATION UPDATE RULE**:
   - **Crucial Requirement**: After **EVERY SINGLE CHANGE** made to the site (features, bug fixes, UI adjustments, asset updates), developers and AI agents MUST:
     1. Update `INSTRUCTIONS.md`, `README.md`, and `reports.md`.
     2. Add a clear, itemized entry in the Revision History / Changelog.
     3. Explicitly state the exact local timestamp (e.g. `2026-09-23 12:15 UTC+3`) and version identifier (e.g. `ewiv5-v3-13`).
     4. Confirm parity across all 9 `.html` files and test on both desktop and mobile viewports.

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
       - *UI Control & Interaction Icons* (`assets/icons/`):
         - `top.png` &rarr; Back to Top floating utility button (`.back-to-top .top-icon`)
         - `down.png` &rarr; Collapsed indicator on Solutions accordion cards (`.accordion-icon`)
         - `up.png` &rarr; Expanded indicator on Solutions accordion cards (`.accordion-icon`)
         - `play-button-arrowhead.png` &rarr; Media/slider playback control indicator
- **Accessibility & Contrast**:
  - In `.section--dark`, card icons are tinted with `var(--color-accent-300)` and headings styled in `#fff` to ensure WCAG AA contrast compliance (> 7:1 ratio against dark navy).
  - Heading hierarchy follows a strict semantic structure (`H1` &rarr; `H2` &rarr; `H3`) across all pages without visual disruption.
- **SEO & Structured Data**:
  - Every page includes unique, length-calibrated `<title>` (under 65 chars to avoid Google SERP truncation), targeted `<meta name="description">`, `canonical`, Open Graph, and Twitter Card metadata.
  - Local Qatar SEO geo-meta tags (`geo.region: QA-DA`, `geo.placename: Doha`, `geo.position`, `ICBM`) and `site.webmanifest` linked across all pages.
  - Critical fonts (`barlow-400.woff2` and `barlow-condensed-600.woff2`) preloaded in `<head>` to prevent CLS and boost Google Core Web Vitals.
  - `404.html` uses `<meta name="robots" content="noindex, follow">`.
  - JSON-LD structured data includes rich `WebSite`, `LocalBusiness` / `Corporation` (with GeoCoordinates, priceRange, contactPoint for English/Arabic sales), `FAQPage` (Google rich snippet eligible), `BreadcrumbList`, `AboutPage`, `CollectionPage` (with `OfferCatalog` and `Brand` list), and multi-entity `Service` schemas.
  - `sitemap.xml` contains production canonical URLs with `<changefreq>`, `<priority>`, Google Image XML extensions (`xmlns:image`), and `<lastmod>2026-09-23</lastmod>`.
  - `.htaccess` includes `mod_deflate` Gzip compression, strict Content-Security-Policy (zero eval), clickjacking defenses, and security/referrer headers for Google PageSpeed optimization.

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
privacy.html
404.html
robots.txt
sitemap.xml
site.webmanifest
assets/          (entire directory, now 7.74 MB)
```

**DO NOT UPLOAD**:
`Trash/`, `_ds/`, `.agents/`, `.claude/`, `.vscode/`, `.git/`, `reports.md`, `INSTRUCTIONS.md`, or `skills-lock.json`.
*(The `.htaccess` configuration is set up to block access with a 404 if any of these are uploaded accidentally).*

---

## 10. Known Unfinished Work & Future Backlog

Refer to [`REPORT_WEBSITE.md`](REPORT_WEBSITE.md) and [`reports.md`](reports.md) for full audit context and readiness tracking:
1. **Contact Form Validation & Email Fallback (Critical)**: Implement JavaScript validation on `contact.html` (remove `novalidate` bypass, remove broken `cf-subject` DOM query, display inline field errors, provide clipboard/preview fallback if native mail client is unavailable).
2. **Hero Video Payload Optimization (Critical)**: Replace 22.18 MB hero video (`0909_compress_optimized.mp4`) with compressed version `0.mp4` (3.48 MB) or implement responsive poster/video on mobile viewports (< 768px).
3. **WCAG AA Navigation & Active Link Contrast (High)**: Darken `--color-accent` on light backgrounds from `#5980a6` (3.61:1) to `--color-accent-700` (`#416180`, 5.45:1) for active nav links and `.div-card .num`.
4. **Image Dimensions CLS Prevention (High)**: Add explicit `width` and `height` attributes to `warehouse-placeholder.jpeg` (Home and About) and the 5 lab slide images on `divisions.html`.
5. **Deduplicate `contact.html` Layout (High)**: Remove the redundant secondary CTA block from `contact.html` to eliminate the triple contact stack.
6. **Placeholder Photography Replacement (Medium)**: Replace temporary stock photos with real Qatar project photos:
   - `assets/placeholders/warehouse-placeholder.jpeg` (Home & About)
   - `assets/electrical-placeholder.png` (Divisions / Electrical)
   - `assets/placeholders/data-centre.jpg` (Divisions / Network & Data Centre)
   - `assets/cybersecurity-placeholder.jpg` (Divisions / Cyber Security)
7. **CSS Breakpoint Consolidation (Medium)**: Consolidate 15+ ad-hoc media queries in `assets/css/ewi.css` into unified breakpoints (`640px`, `768px`, `1024px`, `1280px`).
8. **Lab Slider Interval (Medium)**: Increase auto-advance duration on `divisions.html` from `2600ms` to `5000ms`.
9. **Dedicated Contact Us Page & Technical RFQ Form**: **COMPLETED (2026-09-21, v2-04)** — Built dedicated `contact.html` with on-page interactive form, office map, and direct contacts.
10. **Self-Hosting Lucide Icons**: **COMPLETED (2026-09-16)** — Lucide v0.469.0 is now self-hosted in `assets/js/lucide.min.js`.

---

## 11. Revision History & Changelog

### Version `ewiv5-v3-13` — 2026-09-23 12:15 UTC+3
- **Publication Readiness & Quality Audit Remediation (`WEBSITE_QREPORT.md`, `QREPORT.md`)**: Fully resolved all critical blockers from the quality report. Transitioned site publication status to **`READY FOR PUBLICATION`**.
- **Purged Dead Video Bloat & Confidential Data**: Deleted remaining obsolete video `assets/video/0909_compress_optimized.mp4` (21.7 MB). Confirmed removal of `videoplayback.mp4` (396.9 MB) and `Stamus_EWI_90-Day_GTM_Plan.pdf/.docx`. Reduced total `assets/` folder weight from 425+ MB down to **7.74 MB** (a **98.2% payload drop**).
- **Content Security Policy (CSP) & Zero-eval JavaScript Hardening (`.htaccess`, `ewi.js`)**: Verified zero use of `eval()`, `new Function()`, or string-based timers in `ewi.js` and `lucide.min.js`. Configured strict `Content-Security-Policy` header in `.htaccess` omitting `unsafe-eval`. Added progressive enhancement `document.documentElement.classList.add('js')` directly in `ewi.js`.
- **Contact Form Webmail & WhatsApp Delivery (`contact.html`, `ewi.js`)**: Added dynamic direct-action buttons for Gmail (Web), Outlook 365 (Web), direct prefilled WhatsApp chat, and clipboard copy in the `#form-success` panel to guarantee 100% lead delivery for desktop webmail users without native mail clients.
- **Mandatory Privacy Policy Created (`privacy.html`, `sitemap.xml`)**: Authored comprehensive Privacy Policy complying with Qatar Law No. 13 of 2016 (Personal Data Privacy Protection Law). Added `privacy.html` link to Company section and bottom footer across all 9 pages, and indexed in `sitemap.xml`.
- **Server Security & Markdown Blocking (`.htaccess`)**: Hardened `.htaccess` rewrite rule to `RewriteRule \.md$ - [R=404,NC,L]`, blocking all internal markdown files from public access. Added `X-Frame-Options: SAMEORIGIN` and `Permissions-Policy`.
- **XML Quotation & Footer Parity**: Escaped single quotes and ampersand in `divisions.html` line 7 meta description. Normalized address whitespace on line 438 to achieve 100% markup parity across all 9 HTML files.
- **Cache Busting Parity**: Bumped cache version string to `?v=20260923.7` across all 9 static HTML files.

### Version `ewiv5-v3-12` — 2026-09-23 11:30 UTC+3
- **Contact Form Validation & Clipboard Fallback (`contact.html`, `ewi.js`, `ewi.css`)**: Implemented client-side validation for name, email (with regex), phone, and message. Added inline input error states (`.is-invalid`, `.field-error`) and `#form-error` summary alert. Added fallback "Copy inquiry details to clipboard" action with live confirmation. Removed unused `cf-subject` query. Cleaned inline style on `<h3>Reach our Doha team</h3>`.
- **Hero Video Payload Optimization (`index.html`)**: Swapped 22.18 MB hero video (`0909_compress_optimized.mp4`) for optimized 3.48 MB video (`0.mp4`) with `preload="metadata"`, saving 18.7 MB (84.3% data reduction) on initial mobile and desktop page loads.
- **WCAG AA Navigation & Text Contrast Compliance (`ewi.css`)**: Darkened active navigation pill labels and hover states from `#5980a6` (3.61:1) to `var(--color-accent-700)` (`#416180`, 5.78:1 contrast). Darkened `.div-card .num` to `var(--color-accent-700)`. Darkened `.text-muted` from 58% to 74% opacity (6.68:1 contrast on `#f2f2f3`).
- **Cumulative Layout Shift (CLS) Image Dimensions**: Added explicit `width` and `height` attributes to `warehouse-placeholder.jpeg` (547x365) on `index.html` and `about.html`, all 5 lab slide images on `divisions.html` (815x401), and corrected dimensions and descriptive alt text for electrical (500x333), network, and cyber (678x452) division images.
- **Lab Slider Interval Relaxed (`divisions.html`)**: Increased auto-advance timer from `2600ms` to `5000ms` for comfortable reading of lab casework details.
- **Semantic Outline Cleanup (`404.html`)**: Removed misplaced sr-only heading outside `<main>` and removed WhatsApp icon from standard contact link.
- **Sitemap Timestamps (`sitemap.xml`)**: Updated all page `<lastmod>` tags to `2026-09-23`.
- **Cache Busting Parity**: Bumped cache version string to `?v=20260923.6` across all 8 static HTML files.

### Version `ewiv5-v3-11` — 2026-09-23 11:15 UTC+3
- **Comprehensive Website Audit Ingestion (`REPORT_WEBSITE.md`)**: Ingested full-site technical, accessibility, performance, and UX audit report covering all 8 pages, CSS, JS, and media assets.
- **Documented Critical Backlog Items**: Formalized action roadmap for contact form validation fallback, hero video mobile payload reduction (from 22.18 MB down to <= 3.5 MB via `0.mp4`), WCAG AA nav contrast adjustments, CLS image dimensions, and contact page deduplication.
- **Workspace File & Asset Verification**: Verified directory layout, parity across all 8 static pages (`?v=20260923.5`), and updated project documentation.

### Version `ewiv5-v3-10` — 2026-09-23 10:35 UTC+3
- **Mobile-Only Inconsistent Anchor Styling & Brand Alignment**: Replaced stark white ad-like anchor button styling on mobile (`.anchors a`, `.div-anchor`) in `divisions.html`, `partners.html`, and `clients.html` with integrated blueprint glass styling (`background: color-mix(in srgb, #fff 12%, transparent); border: 1px solid color-mix(in srgb, #fff 28%, transparent); color: #fff; box-shadow: none`). Unified `.is-active` state across all divisions (including **Lab Systems**) to brand accent `var(--color-accent-700)` with `var(--color-accent-400)` border and matching white mask icons. Desktop styling remains 100% unchanged.
- **Divisions Overview Mobile Link Styling**: Styled division card headers (`.grid a.card h3`) on mobile with `var(--color-accent-700)` to ensure clear visual affordance as interactive navigation links.
- **Shortened Mobile Button Labels**: Introduced `.u-desktop-label` and `.u-mobile-label` responsive utilities. Shortened overly long labels on mobile viewports while preserving exact full desktop text: "Request Technical Consultation" &rarr; "Request Consultation" on `index.html`; "Email eastwest@qatar.net.qa" &rarr; "Email Our Team" on `index.html` and `about.html`.
- **Enlarged Back to Top Button on Mobile**: Increased mobile tap target for `.back-to-top` from 44px to 50px with a 19px icon (up from 16px) for comfortable one-handed mobile ergonomics.
- **Enlarged Details Accordion Button on Mobile**: Increased `.accordion-toggle` on `about.html` from 12px font / 4px padding to 14px font, 7px 14px padding, 36px min-height, and 15px icon for effortless touch interaction on mobile.
- **Home Page 4 Cards Subtle Borders & Dividers**: Added subtle accent border lines (`border: 1px solid color-mix(in srgb, var(--color-accent-700) 24%, var(--color-divider))`), elevation shadows, and horizontal gradient divider lines between stacked cards in `.divisions-strip` on mobile for distinct visual separation.
- **Cache Busting & Parity**: Bumped asset cache version query string across all 8 HTML files to `?v=20260923.5`. Verified tag balance (0 unclosed tags) and brace parity.

### Version `ewiv5-v3-09` — 2026-09-23 09:55 UTC+3
- **Hero Caption for Immediate Brand Clarity**: Added a concise 4-word hero caption ("Engineering Qatar's Landmark Infrastructure") directly below the animated slogan "Excellence through Innovation" on `index.html`. Connects the Lusail Stadium and metro background footage to EWI's engineering and infrastructure scope within the first 3 seconds, avoiding generic marketing language.
- **CTA Hierarchy & Funnel Alignment**: Reordered and polished the homepage hero action buttons to align with the natural brand funnel (*What EWI does &rarr; What it offers &rarr; Where to explore/contact*). "View Our Divisions" is now positioned as the primary exploration CTA (`.btn-primary` with directional arrow), paired with "Contact Us" as the secondary action (`.btn-secondary`). Removed the misplaced WhatsApp icon from the contact page link.
- **High-Contrast White-on-Black Anchor Buttons**: Updated linked category buttons (`.anchors a`, `.div-anchor`) in `partners.html`, `clients.html`, and `divisions.html` to use a solid white background (`#ffffff`), crisp black text (`#111827`), matching black mask icons, and clean elevation shadows for 100% readability against page hero photography.
- **Mobile Spacing & CTA Ergonomics**: Polished mobile hero actions in `assets/css/ewi.css` to stack cleanly on viewports < 600px with comfortable touch targets and no horizontal overflow.
- **Cache Busting & Parity**: Bumped asset cache version string across all 8 HTML files to `?v=20260923.4`.

### Version `ewiv5-v3-08` — 2026-09-23 09:35 UTC+3
- **Hero Slogan Upward Shift**: Positioned "Excellence through Innovation" slightly higher in the hero viewport (`transform: translateY(-10px)`, adjusted clamp padding) for enhanced visual hierarchy over the background video.
- **Enlarged Main Buttons & Touch Usability**: Scaled `.btn` touch targets to `min-height: 52px`, `padding: 13px 24px`, and `font-size: 17px` (hero actions to `min-height: 54px; font-size: 18px`) for immediate visibility and comfortable mobile ergonomics.
- **Division Cards Spacing & Breathing Room**: Expanded gap and internal padding between the 4 division cards (`clamp(var(--space-6), 5vw, var(--space-8))` on mobile) to eliminate visual crowding.
- **Natural User Flow & Strategic Non-Pushy CTAs**: Integrated balanced consultation touchpoints along the page transition paths (e.g. "Request Technical Consultation" alongside "View all engineering services"), guiding visitors seamlessly through understand &rarr; trust &rarr; explore &rarr; contact.
- **Cache Busting & Parity**: Bumped asset cache version string across all 8 HTML files to `?v=20260923.3`.

### Version `ewiv5-v3-07` — 2026-09-23 09:15 UTC+3
- **Hero Slogan Caption Removal**: Removed the text caption below the animated "Excellence through Innovation" slogan on `index.html` to eliminate hero clutter and give the slogan and CTAs generous breathing room.
- **Simplified Cards & Elimination of Truncated "..." Expander**: Removed all `card-ellipsis`, `card-more`, and `card-expand-btn` elements across `index.html`, `about.html`, and `services.html`. Cards now provide short, direct 1-sentence answers that introduce each topic and direct visitors deeper with clear "Learn More →" links.
- **Mobile Whitespace & Responsive Rhythm**: Introduced responsive mobile section padding (`clamp(44px, 8vw, 64px)`), fluid card padding, and scaled grid gaps in `assets/css/ewi.css` to make the mobile view spacious and comfortable without shrinking fonts.
- **Compact Floating Back to Top Button (Bottom-Left)**: Redesigned the Back to Top button into a compact 44x44px floating utility control anchored at `bottom-left` of the screen (`left: clamp(16px, 4vw, 24px); bottom: clamp(16px, 4vw, 24px)`). Wired in `assets/js/ewi.js` to appear dynamically when approaching the footer, keeping the screen clean during normal scrolling and leaving the bottom-right clear for WhatsApp.
- **Mobile Navigation Drawer Decluttered**: Removed "WhatsApp Us" button from `.nav-cta` across all 8 HTML files (`index.html`, `about.html`, `divisions.html`, `services.html`, `partners.html`, `clients.html`, `contact.html`, `404.html`), preserving a concise, navigation-first drawer.
- **Cache Busting & Parity**: Bumped asset cache version string across all 8 HTML files to `?v=20260923.2`.

### Version `ewiv5-v3-06` — 2026-09-23 08:48 UTC+3
- **Responsive Layout & Percentage Scaling**: Replaced rigid fixed pixel boundaries with fluid percentages, `clamp()`, `max-width`, and `min-width` across `.wrap`, grids, cards, and section paddings while preserving the Industry Wireframe blueprint design system.
- **Horizontal Overflow Prevention**: Hardened `html` and `body` with `overflow-x: hidden`, bounded `.subnav` with `max-width: calc(100vw - 32px)` and fluid clamp widths to completely prevent horizontal scrolling across all viewports.
- **Home Page "What We Do" Scannable Cards**: Refactored homepage "What we do" section into 6 concise, human-centered solution cards (Lab Systems, Electrical Supplies, Network Infrastructure, Cyber Security, Site Installation, Maintenance & Calibration) featuring direct 1–2 sentence summaries and "Learn More →" links targeting dedicated sections on `about.html`.
- **About Page Solutions Accordion (`down.png` / `up.png`)**: Added dedicated "Solutions & Engineering Capabilities" section on `about.html` corresponding to all 6 core areas. Features default collapsed state with `down.png`, smooth expansion showing full technical scope, vendor certifications, and engineering workflows, dynamic arrow toggle to `up.png`, and automatic hash navigation expansion on load (`about.html#[id]`).
- **Card Ellipsis (`...`) Expand Interaction**: Enhanced cards across `index.html`, `about.html`, and `services.html` with inline `...` toggles to gracefully reveal extended text while reducing visual clutter on both desktop and mobile.
- **Mobile Clutter Reduction**: Optimized mobile vertical rhythm, tightened card padding, balanced stat items, and collapsed dense text by default.
- **Footer "Back to Top" Integration**: Added accessible blueprint-style "Back to top" action featuring authentic `assets/icons/top.png` with CSS color inversion across all 8 HTML files (`index.html`, `about.html`, `divisions.html`, `services.html`, `partners.html`, `clients.html`, `contact.html`, `404.html`).
- **Cache Busting & Parity**: Bumped asset cache version string across all 8 HTML files to `?v=20260923.1`.

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

