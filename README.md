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
- **Icons**: Self-hosted [Lucide Icons](https://lucide.dev/) (`assets/js/lucide.min.js`, `stroke-width: 1.5`) + 26 self-contained Base64 CSS mask icons for divisions, services, sectors, and communication channels (`whatsapp.png`, `mail.png`, `messenger.png`, `telephone.png`) + 4 UI control icons (`top.png`, `down.png`, `up.png`, `play-button-arrowhead.png`).
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
├── about.html            # About EWI (company history, milestones, Doha facilities, solutions accordion)
├── divisions.html        # Divisions overview and detailed division sections
├── services.html         # Engineering services, turnkey projects, maintenance
├── partners.html         # Principal partner brands directory by division
├── clients.html          # Institutional, energy, healthcare, and research clients
├── contact.html          # Dedicated Contact Us page (RFQ form, office map, webmail/WhatsApp links)
├── privacy.html          # Legal Privacy Policy & Data Protection Notice (Qatar Law No. 13 of 2016)
├── 404.html              # Branded 404 error page
├── .htaccess             # Apache configuration, security headers (CSP, clickjacking), caching rules
├── robots.txt            # Search engine crawler directives
├── sitemap.xml           # Search engine sitemap
├── QREPORT.md            # Concise quality & publication-readiness report
├── WEBSITE_QREPORT.md    # Detailed audit report & remediation verification log
├── assets/
│   ├── css/ewi.css       # Unified site stylesheet, tokens & 26 Base64 mask icons
│   ├── js/ewi.js         # Vanilla JS (navigation, reveals, counters, marquee, accordion, back-to-top)
│   ├── fonts/            # Self-hosted Barlow & Barlow Condensed WOFF2 fonts
│   ├── video/            # Optimized hero background video (0.mp4, 3.4 MB)
│   ├── logos/            # Partner and client logo assets
│   ├── icons/            # 30 division, service, sector, communication & UI control icons
│   └── placeholders/     # Temporary stock photos pending real project photos
├── INSTRUCTIONS.md       # Detailed technical reference for AI IDEs & contributors
├── reports.md            # Usability, accessibility, and UX audit findings
├── REPORT_WEBSITE.md     # Comprehensive website audit report & readiness roadmap (September 2026)
└── Trash/                # Archive of legacy PHP files (do not deploy to production)
```

---

## Key Features & Design System

- **Industry Wireframe Design System**: Built on technical blueprint motifs featuring square corners, hairline borders, and `+` registration crosshair marks (`.blueprint`).
- **Accessible Color Palette**: Grounded in neutral light gray (`#f2f2f3`) with a steel-blue accent palette (`#5980a6`, `#416180`). Text and button contrasts satisfy WCAG AA requirements (> 4.5:1).
- **Solutions & Capabilities Accordion**: Accessible toggleable cards on `about.html` covering all 6 offerings with state icons (`down.png`/`up.png`) and URL hash deep linking.
- **Floating Back to Top Button**: Compact 50px floating button on mobile / 44px on desktop anchored at screen bottom-left (`assets/icons/top.png`), triggered via IntersectionObserver on the footer.
- **Mobile Ergonomics & Responsive Labels**: Semi-transparent blueprint glass styling for anchor filters, enlarged touch targets, and `.u-desktop-label` / `.u-mobile-label` responsive text helpers.
- **Interactive Division Cards**: Entire cards on the Divisions page link directly to their corresponding sections with smooth scrolling and hover focus.
- **Original Color Logos**: Partner and client logos render in their authentic brand colors by default across all pages.
- **Responsive Navigation**: Desktop includes a multi-column mega-menu for divisions; mobile viewports (< 1024px) collapse into an accessible slide-in drawer with Escape-key handling and body scroll lock.
- **Accessibility & Motion Safety**: Respects `prefers-reduced-motion` by disabling infinite marquee loops, slide transitions, and scroll animations.

---

## Developer Guidelines

1. **Editing Shared Components**:
   The top utility bar, main navigation header, and footer are mirrored across all **9 `.html` files** (`index.html`, `about.html`, `divisions.html`, `services.html`, `partners.html`, `clients.html`, `contact.html`, `privacy.html`, `404.html`). When modifying navigation links, phone numbers, WhatsApp links, or footer copy, you MUST update all 9 files.
2. **Asset Versioning (Cache Busting)**:
   When modifying `assets/css/ewi.css` or `assets/js/ewi.js`, bump the version query parameter (current: `?v=20260923.7`) across all 9 `.html` files to ensure browsers load the latest version.
3. **No Frameworks**:
   Do not introduce heavy third-party CSS or JS frameworks (Tailwind, Bootstrap, jQuery, React, etc.). Maintain the lightweight, zero-dependency architecture.
4. **MANDATORY CHANGE LOGGING & DOCUMENTATION UPDATE RULE**:
   After **EVERY SINGLE CHANGE** made to the site (features, bug fixes, UI adjustments, asset updates), developers and AI agents MUST:
   - Update `README.md`, `INSTRUCTIONS.md`, and `reports.md`.
   - Add an itemized entry in the Revision History / Changelog.
   - Record the exact timestamp (e.g. `2026-09-23 12:15 UTC+3`) and project version tag (e.g. `ewiv5-v3-13`).
   - Validate parity across all 9 `.html` files.

---

## Revision History & Changelog

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
- **Communication Channel Icons**: Wired direct communication cards to dedicated icons in `assets/icons/` (`telephone.png`, `whatsapp.png`, `messenger.png`, `mail.png`).
- **Streamlined Layout**: Removed specialized division desk cards from `contact.html` to optimize page clarity.

### Version `ewiv5-v3-03` — 2026-09-21 06:45 UTC+3
- **Media & Asset Optimization**: Hero background video compressed and optimized (`0909_compress_optimized.mp4`).
- **Brand Imagery**: Updated division brand marks in `assets/icons/` and refreshed logos.
- **SEO & Structured Data**: Refreshed metadata across all pages, updated sitemap lastmod timestamps to `2026-09-21`.

### Version `ewiv5-v3-02` — 2026-09-16 14:00 UTC+3
- **Offline Icon Compatibility**: Self-hosted Lucide icons in `assets/js/lucide.min.js` and embedded 22 Base64 data URI CSS mask icons into `assets/css/ewi.css` to fix Chromium/Brave local file origin CORS blocking.

### Version `ewiv5-v3-01` — 2026-09-14 11:30 UTC+3
- **Architecture Migration**: Completed migration from legacy PHP to 100% pure static HTML5/CSS3/JS architecture. Archived PHP codebase into `Trash/`.

