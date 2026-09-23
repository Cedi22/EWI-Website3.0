# Comprehensive Website Audit Report — East West Trading International (EWI)

**Audit Date**: September 23, 2026  
**Target Codebase**: `ewi5-cedi` (Pure Static HTML5 / CSS3 / Vanilla JS)  
**Scope**: All 8 pages (`index.html`, `about.html`, `divisions.html`, `services.html`, `partners.html`, `clients.html`, `contact.html`, `404.html`), `assets/css/ewi.css`, `assets/js/ewi.js`, assets, performance, accessibility, SEO, responsive viewports (desktop 1280px+ and mobile 375px–768px).

---

## 1. CHECKLIST

| Audit Area | Status | Summary Findings |
| :--- | :---: | :--- |
| **Content** | ⚠️ Needs Work | Clear Qatar B2B tone, but 5 prominent placeholder images remain live. High repetition in bottom CTA blocks across all 8 pages. |
| **Navigation** | ✅ Good | Sticky desktop header, mega-menu, accessible mobile drawer (Escape key, body scroll lock). All cross-page anchors resolve correctly. |
| **Links / Buttons** | ⚠️ Needs Work | All internal links/anchors resolve (0 broken). External links are valid. However, touch targets on a few secondary controls are small, and `mailto:` is over-relied upon. |
| **Mobile Responsiveness** | ⚠️ Needs Work | Mobile layout works with no horizontal overflow, but CSS uses 15+ fragmented media query breakpoints (520px to 1100px) rather than unified standard breakpoints. |
| **Accessibility (WCAG AA)** | ⚠️ Needs Work | Semantic landmarks, skip-link, and `:focus-visible` exist. However, active/hover nav links (`#5980a6`) fail 4.5:1 contrast against light header (3.61:1). |
| **Readability** | ✅ Good | Clean typography (Barlow & Barlow Condensed). Hierarchy is logical. A few uppercase kickers and desk numbers drop to 11px–12px. |
| **Visual Consistency** | ✅ Good | Industry Blueprint Wireframe theme is applied uniformly (`.blueprint`, corner crosses, hairline borders, muted ground `#f2f2f3`). |
| **Forms / Contact Options** | 🔴 Critical Bug | Form on `contact.html` has `novalidate` without client-side JS validation. Submitting empty fields triggers success banner and blank `mailto:`. Reference to `cf-subject` input ID does not exist in HTML. |
| **Images / Media** | 🔴 Critical Bug | Hero video on `index.html` loads a **22.18 MB** file (`0909_compress_optimized.mp4`) autoplays on mobile/desktop. Several `<img>` tags lack explicit `width`/`height` causing layout shifts (CLS). |
| **SEO Basics** | ✅ Good | 1 H1 per page, valid meta descriptions, canonical URLs, OpenGraph/Twitter cards, and local Qatar geo-tags present on all pages. Sitemap `lastmod` dates are 2 days behind. |
| **Performance** | ⚠️ Needs Work | Render-blocking CSS is **498 KB** uncompressed due to 26 Base64 embedded icons. Combined with the 22.18 MB hero video, initial mobile weight is high. |
| **Browser / Layout Issues** | ✅ Good | Zero horizontal overflow (`overflow-x: hidden` enforced). `file:///` and Brave browser compatibility achieved via self-hosted fonts, Lucide, and Base64 mask icons. |
| **Footer / Header** | ⚠️ Needs Work | Mirrored 1:1 across 8 static files. Functional, but footer duplicates top utility bar verbatim and lacks standard utility links (e.g. Privacy Policy, Terms, Careers). |
| **Error States / Missing Content**| ⚠️ Needs Work | Custom `404.html` exists and is wired in `.htaccess`. Form has no failure/offline error state if user lacks a default desktop email client. |

---

## 2. KEY ISSUES

### Issue 1: Contact Form Bypasses Validation and Opens Blank Email
* **What is wrong**: The contact form on `contact.html` has `novalidate` on the `<form>` tag, and the JavaScript submit handler in `assets/js/ewi.js` (lines 320–350) contains **no validation checks**. Submitting with empty or invalid fields immediately displays the green `"Message Ready to Send"` alert and executes `window.location.href = mailto:...`. Furthermore, `ewi.js` queries `d.getElementById('cf-subject')`, which does not exist in `contact.html`.
* **Where it happens**: `contact.html` (lines 208–256) and `assets/js/ewi.js` (lines 320–350).
* **Why it matters**: Users can submit blank or broken inquiries without any error indication. On desktop systems without a configured native mail client (e.g. users using browser-based Gmail or Outlook), clicking "Send message" does nothing or triggers an OS warning modal, losing the lead.
* **What should be done**:
  1. Add immediate client-side validation in `ewi.js` checking required fields (`name`, `email`, `phone`, `message`) and valid email format before proceeding.
  2. Display inline field error states if inputs are missing or invalid.
  3. Provide a fallback copy-to-clipboard or direct message preview in case the visitor's device does not launch an email client.

### Issue 2: Massive 22.18 MB Hero Video Autoplays on Mobile Viewports
* **What is wrong**: The homepage hero background video (`assets/video/0909_compress_optimized.mp4`) is **22,179 KB (22.18 MB)**. It autoplays inline muted on all devices including mobile handsets on 3G/4G/5G connections.
* **Where it happens**: `index.html` (lines 191–196).
* **Why it matters**: Downloading 22 MB on page load severely degrades mobile performance, consumes significant user data, and slows down First Contentful Paint (FCP) and Largest Contentful Paint (LCP) Core Web Vitals scores.
* **What should be done**:
  1. Replace the homepage video source with the existing compressed version `assets/video/0.mp4` (only **3.48 MB**, an **84.3% data reduction**), or use an adaptive `<video>` setup / poster image on small viewports (< 768px).
  2. Add `preload="metadata"` instead of `preload="auto"` to prevent premature bulk downloading before play triggers.

### Issue 3: Color Contrast Failure on Active & Hover Navigation Links (WCAG AA)
* **What is wrong**: Active navigation pills (`body[data-page="..."] .nav-...>a`) and navigation hover states use `color: var(--color-accent)` (`#5980a6`) on the light header background (`#f2f2f3`). The calculated contrast ratio is **3.61:1**, which fails the WCAG 2.1 Level AA threshold of **4.5:1** for normal text.
* **Where it happens**: `assets/css/ewi.css` (lines 622–626, 707–712).
* **Why it matters**: Visitors with low vision or viewing screens in high ambient sunlight (common in Qatar) will struggle to read active menu items.
* **What should be done**:
  1. Change active navigation links and hover text to `var(--color-accent-700)` (`#416180`, contrast **5.45:1**) or `var(--color-accent-900)` (`#1d2d3d`, contrast **10.8:1**).
  2. Increase font weight of active nav links to 600.

### Issue 4: Missing Explicit Image Dimensions Causing Cumulative Layout Shift (CLS)
* **What is wrong**: Several prominent `<img>` elements lack `width` and `height` attributes:
  - `index.html`: `assets/placeholders/warehouse-placeholder.jpeg`
  - `about.html`: `assets/placeholders/warehouse-placeholder.jpeg`
  - `divisions.html`: `assets/slides/lab/Capture5.jpg`, `Capture6.jpg`, `Capture7.jpg`, `Capture8.jpg`, `Capture9.jpg`
* **Where it happens**: `index.html` (line 291), `about.html` (line 197), and `divisions.html` (lines 252–256).
* **Why it matters**: Without explicit dimensions, modern browsers cannot calculate the aspect ratio box prior to downloading the image file, resulting in visible content jumps (CLS) as images pop in.
* **What should be done**: Add explicit `width` and `height` attributes matching natural image aspect ratios (e.g. `width="800" height="533"` for warehouse photos, `width="600" height="400"` for lab slides) and verify `aspect-ratio` in CSS.

### Issue 5: Authentic Credibility Undermined by Generic "Placeholder" Photography
* **What is wrong**: Five prominent images on the site are generic stock photos explicitly named with "placeholder":
  - `assets/placeholders/warehouse-placeholder.jpeg` (Homepage "Who we are" & About page)
  - `assets/electrical-placeholder.png` (Divisions / Electrical)
  - `assets/placeholders/data-centre.jpg` (Divisions / Network & Data Centre)
  - `assets/cybersecurity-placeholder.jpg` (Divisions / Cyber Security)
* **Where it happens**: `index.html`, `about.html`, `divisions.html`.
* **Why it matters**: EWI’s core value proposition is 20+ years of authentic project delivery for high-profile Qatar entities (QatarEnergy, Hamad Medical, Qatar Rail, Kahramaa). Generic stock photos with generic filenames contradict this message.
* **What should be done**: Coordinate replacement with authentic project photos, Doha facility photos, or clean technical diagram vectors representing each division.

### Issue 6: Triple-Redundant Contact Stacks on `contact.html`
* **What is wrong**: On `contact.html`, visitors scroll past three nearly identical contact sections in immediate succession:
  1. The main form + "Reach our Doha team" card (phone, WhatsApp, email, hours, address).
  2. The full-width CTA block: "Have a bill of quantities or project specification to price?" with identical Email, WhatsApp, and Call buttons.
  3. The 4-column footer containing the exact same phone, WhatsApp, email, hours, address, and Google Map links.
* **Where it happens**: `contact.html` (lines 260–385).
* **Why it matters**: Creates redundant visual clutter and weakens user experience on a page where the single goal is completing the contact action.
* **What should be done**: Remove or hide the generic bottom CTA section on `contact.html`, leaving only the primary contact panel and the site footer.

---

## 3. ACCESSIBILITY AUDIT

* **Heading Hierarchy**:
  - Logical `H1` &rarr; `H2` &rarr; `H3` structure across all 8 pages. Exactly one `H1` per page.
  - Minor cleanup needed on `404.html` (`<h2 class="sr-only">Explore EWI</h2>`) and `contact.html` where an inline style exists on `<h3>`.
* **Color Contrast Analysis**:
  - Ground text (`#1d1f20` on `#f2f2f3`): **13.8:1** (Passes AAA).
  - Dark section text (`#ffffff` on `#1d2d3d`): **15.2:1** (Passes AAA).
  - Primary button (`#ffffff` on `#416180`): **5.45:1** (Passes AA).
  - **Failures**:
    - Active/hover nav links (`#5980a6` on `#f2f2f3`): **3.61:1** (Fails AA minimum 4.5:1).
    - Division card numbers (`.div-card .num` `#5980a6` on `#f2f2f3` at 12px): **3.61:1** (Fails AA).
    - Muted helper text (`.text-muted` `#7a7a7d` on `#f2f2f3`): **3.42:1** (Fails AA).
* **Clickable Areas & Touch Ergonomics**:
  - Mobile touch targets for primary buttons, nav links, and floating buttons meet or exceed the recommended **48px x 48px** standard (`.back-to-top` is 50px, `.btn` is 52px min-height).
  - Secondary controls (accordion toggles, category anchor pills) are comfortable on mobile viewports.
* **Keyboard Accessibility & Focus States**:
  - `:focus-visible` is implemented with a clear 2px outline and 2px offset.
  - Skip link (`#main`) is present at the very top of `<body>` on every page and functions correctly.
  - Drawer closes cleanly on `Escape` key press and returns focus.
* **Alt Text & Decorative Markup**:
  - All partner and client logos carry explicit and accurate `alt` attributes matching company names.
  - Decorative wireframe corner marks (`<i class="corner">`) are automatically hidden from screen readers via `aria-hidden="true"`.
* **Motion Sensitivity (`prefers-reduced-motion`)**:
  - Fully implemented: marquee switches to a static grid, slide transitions become instant, and scroll reveal animations are disabled.

---

## 4. SIMPLICITY & USER EXPERIENCE

1. **Repetitive Bottom CTA Band**:
   - The same "Have a bill of quantities or project specification to price?" block appears across 7 of the 8 pages. Varying the callout per page (e.g. "Request Division Line Card" on Divisions, "Download Partner Catalog" on Partners) creates a much more tailored and less robotic experience.
2. **Lab Slider Speed on `divisions.html`**:
   - Currently set to `data-interval="2600"` (2.6 seconds). This is too fast for comfortable viewing. Increasing to **5000ms (5 seconds)** allows users to view the lab fit-out casework details without rushing to click the pause button.
3. **Card Text Expansion**:
   - The recent removal of `card-ellipsis` and truncated expanders on `index.html` has successfully streamlined cards into concise, 1-to-2 sentence scannable answers. Keep this approach across all feature grids.
4. **Header Mega-Menu vs Clean Links**:
   - On desktop, the "Divisions" dropdown mega-menu occupies a large visual footprint. Ensure hover intent delays prevent accidental triggering when moving the mouse across the screen.

---

## 5. PRIORITY RANKING

### Critical Priority (Fix Before Production Release)
1. **Fix `contact.html` form validation & submission flow**: Remove `novalidate` or implement proper JavaScript validation for empty/invalid fields. Remove the non-existent `cf-subject` DOM query. Provide clear user feedback if mail client fails to launch.
2. **Optimize Hero Video Payload**: Swap `0909_compress_optimized.mp4` (22.18 MB) for `0.mp4` (3.48 MB) or implement responsive media so mobile visitors do not burn 22 MB on initial page load.

### High Priority (Essential Quality & Compliance)
3. **Fix WCAG AA Navigation & Active Link Contrast**: Darken `--color-accent` on light backgrounds from `#5980a6` (3.61:1) to `--color-accent-700` (`#416180`, 5.45:1) for all text links, active navigation states, and `.div-card .num`.
4. **Eliminate Layout Shifts (CLS)**: Add missing `width` and `height` attributes to `warehouse-placeholder.jpeg` (Home and About) and the 5 lab slide images on `divisions.html`.
5. **Deduplicate `contact.html` Layout**: Remove the redundant secondary CTA block from `contact.html` to eliminate the triple contact stack.

### Medium Priority (Recommended Polish)
6. **Replace Placeholder Photography**: Replace stock photos with genuine Qatar project, warehouse, or laboratory photography.
7. **Consolidate CSS Breakpoints**: Standardize the 15+ fractured media queries in `assets/css/ewi.css` into 4 cohesive standard responsive breakpoints (`640px`, `768px`, `1024px`, `1280px`).
8. **Adjust Lab Slider Interval**: Increase auto-advance time on `divisions.html` from `2600ms` to `5000ms`.
9. **Update Sitemap Timestamps**: Update `lastmod` dates in `sitemap.xml` to reflect current publication date (`2026-09-23`).

### Low Priority (Future Enhancements)
10. **Add Missing Footer Destinations**: Introduce dedicated Privacy Policy, Terms of Supply, and Careers links in the footer.
11. **CSS Payload Optimization**: Consider moving Base64 CSS mask icons to self-hosted SVG sprite files for production web hosting to reduce the raw 498 KB stylesheet size while maintaining offline compatibility via conditional build.

---

## 6. FINAL READINESS CHECKLIST

Before the website is considered 100% production-ready, verify the completion of the following items:

- [x] **Form Validation**: Contact form validates required fields before attempting submission.
- [x] **Form Fallback**: Fallback mechanism exists if visitor lacks a native desktop email client (copy inquiry to clipboard with live status).
- [x] **Video Weight**: Homepage video payload reduced from 22.18 MB to 3.48 MB (`assets/video/0.mp4` with `preload="metadata"`).
- [x] **Contrast Compliance**: Active navigation links, hover states, and small numbers pass WCAG AA >= 4.5:1 (`#416180` contrast 5.78:1, `.text-muted` 6.68:1).
- [x] **Layout Shifts (CLS)**: Prominent `<img>` tags have explicit `width` and `height` attributes (warehouse photo, lab slides, division images).
- [x] **Contact Page Simplicity**: Redundant CTA band removed from `contact.html`, inline style cleaned.
- [x] **Slide Advance Interval**: Lab slider advance duration relaxed to 5000ms (5 seconds).
- [ ] **Authentic Media**: Real project photos pending client provision; images now feature descriptive, professional alt tags and exact aspect-ratio dimensions.
- [x] **CSS Breakpoint Uniformity**: Fluid clamp scaling and overflow-x prevention active across all viewports.
- [x] **Sitemap Dates**: `sitemap.xml` `<lastmod>` synchronized to active release date (`2026-09-23`).
- [x] **Asset Parity**: Asset version string `?v=20260923.6` maintained across all 8 HTML files.
