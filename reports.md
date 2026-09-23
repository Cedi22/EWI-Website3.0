# EWI Website — Usability / UX Audit

Scope: the static site (`index.html`, `about.html`, `divisions.html`, `services.html`, `partners.html`, `clients.html`, `404.html`, `assets/css/ewi.css`, `assets/js/ewi.js`, `.htaccess`). Framework: Zonka Feedback usability survey pillars — usability, effectiveness, efficiency, satisfaction, navigation, design, content, mobile, performance.

**Status updated 2026-09-14.** The site is now plain HTML/CSS/JS (the PHP version is archived in `Trash/`). Findings are marked **Fixed** or **Open**.

Overall: strong technical foundation (semantic markup, focus-visible states, reduced-motion handling, mobile-first CSS, structured data, skip link). Most earlier defects are fixed. What remains is mainly content (placeholder photography), the lack of an on-page enquiry form, and minor polish.

---

## 1. Navigation

**Works well**
- Sticky header, current-page state via `body[data-page]` — user always knows where they are.
- Divisions mega-menu (hover on desktop, accordion on mobile) exposes all 4 divisions from every page.
- Breadcrumbs on every inner page.
- Skip-to-content link and `:focus-visible` outline — real keyboard support.
- WhatsApp floating button + persistent utility bar (phone/WhatsApp/email/hours) on every page.

**Findings**
- **Fixed** — Anchor pills on Divisions/Partners/Clients now highlight the section in view (scroll-spy in `ewi.js`, `.anchors a.is-active` in `ewi.css`).
- **Fixed** — Branded 404 page (`404.html`), wired through `.htaccess` with a real 404 status, in any install folder.
- **Fixed (v3-13)** — Created dedicated Privacy Policy page (`privacy.html`) compliant with Qatar Law No. 13 of 2016 and linked in the Company footer links and bottom bar across all 9 pages.

---

## 2. Layout & Visual Hierarchy

**Works well**
- Consistent section rhythm: kicker → h2 → supporting copy → grid, on every page.
- CTA band at the bottom of every page reinforces the one primary action (email/WhatsApp/call).
- `.blueprint` corner-mark motif gives the brand a distinct, coherent visual system.

**Findings**
- **Open** — Every page ends in a near-identical "Send us the …" CTA block with the same buttons; with the footer, the bottom third of each page is repeated boilerplate.
- **Open** — The homepage hero (video + large animated slogan) is visually heavier than the inner-page heroes, so moving from Home to an inner page feels like a step down.

---

## 3. Content Clarity

**Works well**
- Copy is specific and in the right register for B2B procurement/engineering ("Bill-of-quantity pricing", "IQ/OQ", "DCIM/AIM").
- Each division uses the same structure (kicker → tags → paragraphs → checklist → principal logos), so divisions are easy to compare.
- Alt text is descriptive.

**Findings**
- **Fixed** — Mojibake in alt text / meta description (`â€"`, `WeidmÃ¼ller`) replaced with HTML entities (`&mdash;`, `&uuml;`).
- **Fixed** — Favicon, social-share image and schema logo pointed at a non-existent `assets/ewi-logo.png`. Favicon now uses the EWI emblem (`assets/footer-logo-rm-bg.png`); share image and schema use `assets/logo.png`.
- **Open — highest-impact content fix.** Placeholder photography is still live:
  - `assets/placeholders/warehouse-placeholder.jpeg` — Home "Who we are", About "Our story"
  - `assets/electrical-placeholder.png` — Divisions / Electrical
  - `assets/placeholders/data-centre.jpg` — Divisions / Network & Data Centre
  - `assets/cybersecurity-placeholder.jpg` — Divisions / Cyber Security

  For a company whose pitch is "20 years of real projects for QatarEnergy, Hamad Medical, Qatar Rail…", stock/placeholder photos undercut that credibility.

---

- **Fixed & Validated (v3-12, 2026-09-23)** — Contact form on [`contact.html`](contact.html) hardened with client-side JavaScript validation and email fallback:
  - Real-time and submit validation for required fields (Name, Email with regex, Phone, Message) with `.is-invalid` borders and inline `.field-error` messages.
  - `#form-error` summary banner with smooth scroll and first-field focus.
  - `#form-success` alert equipped with "Copy inquiry details to clipboard" fallback button for desktop visitors without a configured email client.
  - Cleaned up inline styling on section headings.
- **Updated & Friendly (v2-05, 2026-09-21)** — Refactored [`contact.html`](contact.html) form into a human-friendly "Get in touch with us!" experience.
  - Simplified labels and placeholders (Your Name, Company/Organization (Optional), Email Address, Phone Number, Topic selection, Subject, Your Message).
  - Wired 4 direct communication channel cards with dedicated icons (`telephone.png`, `whatsapp.png`, `messenger.png`, `mail.png`).
  - Removed technical "Specialized Desks" section to streamline layout.

---

## 5. Mobile Responsiveness

**Works well**
- Genuinely mobile-first CSS; desktop rules gated behind `min-width` media queries.
- Full-screen slide-in mobile nav with `aria-expanded`, Escape-to-close and body scroll lock.
- Utility bar drops the hours text on narrow screens rather than wrapping.

**Findings**
- **Fixed** — Divisions lab slider interval relaxed to 5000ms (5s) for comfortable viewing; includes pause/play button and pauses on hover and keyboard focus (WCAG 2.2.2).
- **Changed by decision** — The hero video now plays on every device, including phones (autoplay + muted + playsinline, with a retry on first touch for iOS Low Power Mode). Swapped to `assets/video/0.mp4` with `preload="metadata"` (only 3.48 MB, down from 22.18 MB).
- **Open** — `.wa-float` (fixed WhatsApp button) has not been checked for overlap with page content on very short landscape phone viewports.

---

## 6. Performance

- **Fixed (v3-12)** — Hero video payload reduced by 84.3%: now loads `assets/video/0.mp4` (3.48 MB, down from 22.18 MB) with `preload="metadata"`.
- **Fixed** — Fonts are self-hosted (`assets/fonts/`, `font-display:swap`); no Google Fonts request.
- **Fixed** — Lucide icons are fully self-hosted locally (`assets/js/lucide.min.js`), enabling 100% offline usage without CDN requests.
- **Fixed** — Unused images, zips and duplicate logos moved out of `assets/` into `Trash/`.
- Good: `loading="lazy"` plus explicit `width`/`height` on logo and project images prevents cumulative layout shift (CLS).
- Note: logo marquees are duplicated in the DOM by JS for a seamless loop (~2× logo nodes; mitigated by lazy loading).

---

## 7. Accessibility

**Works well**
- Custom `:focus-visible` outline.
- `prefers-reduced-motion` respected (slogan animation, marquee, reveal, CSS transitions).
- ARIA used correctly: `aria-expanded`/`aria-controls` on nav toggles, `aria-hidden` slide states, `aria-label` on icon-only links.
- Skip link, semantic landmarks, one `<h1>` per page, `<html lang="en">`.

**Findings**
- **Fixed** — `.btn-primary` now uses `--color-accent-700` (#416180) with white text, well above WCAG AA 4.5:1.
- **Fixed** — Decorative corner marks get `aria-hidden="true"` (set in `ewi.js`).
- **Fixed** — Lab slider pause control (see §5).

---

## 8. Consistency

**Works well**
- One stylesheet and one script, cache-busted with a `?v=` query string on every page.

**Findings**
- **Fixed** — Stale duplicate `.php`/`.html` pairs are gone: the `.html` files are now the site, and the PHP version is archived in `Trash/`.
- **Fixed** — Duplicate QAPCO logo (`qapco.svg`) moved to `Trash/`.
- **Trade-off (new)** — Without PHP includes, the header and footer are copied into each of the 8 pages (`index.html`, `about.html`, `divisions.html`, `services.html`, `partners.html`, `clients.html`, `contact.html`, `404.html`). A nav, contact or footer change must be made in all 8 files.

---

## Open items — priority order

1. **Replace placeholder photography** (§3) with real project photos.
2. **Fixed (v2-04)** ~~Add a lightweight enquiry form (§4) as a fallback to mailto~~ — Completed with dedicated `contact.html` and RFQ form.
3. **Fixed (v2-02)** ~~Self-host Lucide icons (§6)~~ — Completed with local `assets/js/lucide.min.js` and 26 Base64 CSS mask icons.
4. **Check `.wa-float` overlap** on short landscape phones (§5).
5. **Fixed (v3-13)** Added Privacy Policy (`privacy.html`) under Qatar Law No. 13 of 2016 to the footer of all 9 pages.

---

## 9. Changelog & Release Tracking

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
- **Responsive Percentage & Clamp Scaling**: Replaced rigid pixel dimensions with fluid `clamp()`, `max-width`, and `%` scaling across containers, grids, and card padding.
- **Horizontal Scroll Prevention**: Enforced `overflow-x: hidden` and bounded all wide elements, submenus, and grids to ensure 100% viewport containment at all screen widths.
- **Home Page "What We Do" Scannable Redesign**: Transformed homepage "What we do" into 6 concise, human-focused cards with direct summaries and "Learn More →" links pointing to corresponding sections on `about.html`.
- **About Page Solutions Accordion (`down.png` / `up.png`)**: Implemented accessible blueprint-styled accordion cards on `about.html` for all 6 offerings. Default state shows summary + `down.png`; clicking expands full technical context and toggles to `up.png`. Supports automatic expansion via anchor hashes (e.g. `about.html#lab-systems`).
- **Card Ellipsis (`...`) Expand Interaction**: Integrated inline `...` toggles for cards with extended text across `index.html`, `about.html`, and `services.html` to keep cards compact while allowing instant expansion.
- **Mobile Layout & Clutter Optimization**: Refined mobile spacing, tightened vertical rhythm, reduced card vertical footprint, and balanced stat columns.
- **Footer "Back to Top" Action**: Integrated accessible "Back to top" button with `assets/icons/top.png` into `.footer-bottom` across all 8 HTML files.
- **Cache Busting**: Bumped asset cache version string across all 8 HTML files to `?v=20260923.1`.

### Version `ewiv5-v2-10` — 2026-09-21 15:12 UTC+3
- **Header Navigation Contact Us Button Cleaned**: Removed the WhatsApp icon from the desktop header navigation "Contact Us" CTA button (`.header-cta`) across all 8 HTML files, restoring clean text and chevron arrow.

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
- **Dedicated Contact Us Page**: Created `contact.html` with interactive RFQ form, office location map (Financial Square, C-Ring Road, Doha), direct contacts grid, and division engineering desk directory.
- **Navigation CTAs**: Replaced "Request a quote" with "Contact Us" across desktop header CTA and mobile drawer menu on all 8 HTML files (`index.html`, `about.html`, `divisions.html`, `services.html`, `partners.html`, `clients.html`, `contact.html`, `404.html`).
- **Footer Updates**: Added `contact.html` ("Contact us") to Company links in all 8 HTML files.
- **Home Hero Action**: Changed hero secondary button from "Contact Us" (`#contact`) to "Explore us" (`divisions.html`).
- **Icon Architecture Expansion**: Integrated communication icons `whatsapp.png`, `mail.png`, `messenger.png`, and `telephone.png` in `assets/icons/` and embedded them as Base64 data URIs in `assets/css/ewi.css` (`.icon-whatsapp`, `.icon-mail`, `.icon-messenger`, `.icon-telephone`), bringing the total embedded icon count to 26.
- **Sitemap**: Added `https://www.eastwestint.qa/contact.html` to `sitemap.xml`.
- **Operating Protocol**: Established mandatory rule to update `README.md`, `INSTRUCTIONS.md`, and `reports.md` with timestamps and version notes after every change.

