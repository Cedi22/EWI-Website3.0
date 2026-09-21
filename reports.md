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
- **Open** — Footer duplicates the main nav 1:1 and adds no new destinations (no privacy/terms, no careers).

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

## 4. Forms

- **Updated & Friendly (v2-05, 2026-09-21)** — Refactored [`contact.html`](contact.html) form into a human-friendly "Get in touch with us!" experience.
  - Simplified labels and placeholders (Your Name, Company/Organization (Optional), Email Address, Phone Number, Topic selection, Subject, Your Message).
  - Wired 4 direct communication channel cards with dedicated icons (`telephone.png`, `whatsapp.png`, `messenger.png`, `mail.png`).
  - Removed technical "Specialized Desks" section to streamline layout.
- **Fixed (v2-04, 2026-09-21)** — Dedicated on-page enquiry and RFQ form built on [`contact.html`](contact.html).
  - Captures Full Name, Organization, Email, Telephone, Operating Division (dropdown), Project/BOQ reference, and Scope/Requirement textarea.
  - Includes client-side validation, visual feedback alert card, and instant mailto client launching without breaking the zero-runtime static architecture.
  - Complemented by direct click-to-call (`+974 4465 4878`), WhatsApp instant chat (`+974 7049 7307`), and interactive Google Map for Doha headquarters.

---

## 5. Mobile Responsiveness

**Works well**
- Genuinely mobile-first CSS; desktop rules gated behind `min-width` media queries.
- Full-screen slide-in mobile nav with `aria-expanded`, Escape-to-close and body scroll lock.
- Utility bar drops the hours text on narrow screens rather than wrapping.

**Findings**
- **Fixed** — Divisions lab slider now has a pause/play button and pauses on hover and keyboard focus (WCAG 2.2.2).
- **Changed by decision** — The hero video now plays on every device, including phones (autoplay + muted + playsinline, with a retry on first touch for iOS Low Power Mode). Cost: ~3.4 MB on mobile data per homepage visit.
- **Open** — `.wa-float` (fixed WhatsApp button) has not been checked for overlap with page content on very short landscape phone viewports.

---

## 6. Performance

- **Fixed** — Hero video uses the compressed `assets/video/0909_compress_optimized.mp4` (H.264, index at the start of the file so it streams immediately). The unused duplicate was moved to `Trash/`.
- **Fixed** — Fonts are self-hosted (`assets/fonts/`, `font-display:swap`); no Google Fonts request.
- **Fixed** — Unused images, zips and duplicate logos moved out of `assets/` into `Trash/`.
- **Open** — Lucide icons still load from `unpkg.com` (end of `<body>`, no local fallback). If unpkg is slow or blocked, icons appear late or not at all, including when the site is opened offline from disk.
- Good: `loading="lazy"` plus explicit `width`/`height` on logo images prevents layout shift.
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
5. Polish: vary the bottom CTA blocks per page; add privacy/terms to the footer.

---

## 9. Changelog & Release Tracking

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

