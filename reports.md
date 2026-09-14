# EWI Website — Usability / UX Audit

Scope: full static/PHP site (`index.php`, `about.php`, `divisions.php`, `services.php`, `partners.php`, `clients.php`, shared `partials/header.php` + `partials/footer.php`, `assets/css/ewi.css`, `assets/js/ewi.js`). Read-only review, no files changed. Framework: Zonka Feedback usability survey pillars — usability, effectiveness, efficiency, satisfaction, navigation, design, content, mobile, performance.

Overall: strong technical foundation (semantic markup, focus-visible states, reduced-motion handling, mobile-first CSS, structured data, skip link). Main gaps are content polish (placeholder imagery, encoding bug), one shipped performance regression (uncompressed hero video), and a few accessibility/interaction rough edges in custom JS widgets.

---

## 1. Navigation

**Works well**
- Sticky header, current-page state via `body[data-page]` (`partials/header.php:97-127`, `ewi.css:204-231`) — user always knows where they are.
- Divisions mega-menu (hover on desktop, accordion on mobile) exposes all 4 divisions from every page without a click-through — reduces path length (Zonka "page placement" principle).
- Breadcrumbs on every inner page (`Home / About` etc.) — good orientation, low effort to add elsewhere.
- Skip-to-content link (`partials/header.php:75`) and `:focus-visible` outline (`ewi.css:71-72`) — real keyboard support, not just a visual afterthought.
- WhatsApp floating button + persistent utility bar (phone/WhatsApp/email/hours) on every page — contact is never more than one glance away.

**Problems**
- No visible "You are here" state for anchor sub-sections (`divisions.php#lab`, `#electrical`...) — the anchor pills at the top of Divisions/Partners/Clients pages don't get an active/current style on scroll, so a user who scrolls past Lab into Electrical loses the pill-based progress cue.
- Footer duplicates the main nav 1:1 (Divisions + Company links) but adds no new destinations (no sitemap, no privacy/terms, no careers) — footer is currently just a scroll-shortcut, not an expansion of the site's information architecture.
- No 404 page found in repo — an unhandled path falls to Apache/PHP default error output, breaking the site's visual continuity for anyone who mistypes a URL or follows a stale link.

---

## 2. Layout & Visual Hierarchy

**Works well**
- Consistent section rhythm: kicker → h2 → supporting copy → grid, repeated across all 5 inner pages. Predictable scanning pattern (Zonka "design consistency").
- Clear F-pattern hero → stats bar → content split → CTA on every page; CTA band at the bottom of literally every page reinforces the one primary action (email/WhatsApp/call).
- `.blueprint` corner-mark motif and consistent card treatment give the brand a distinct, coherent visual system rather than generic template-blue.

**Problems**
- Every page ends in near-identical "Send us the [spec/scope/requirement]" CTA blocks with the same three buttons. Effective for conversion, but combined with the footer duplication above, roughly the bottom third of every page is repeated boilerplate — increases perceived scroll depth for content that's already been seen.
- Hero headline font size is `clamp(40px, 6vw, 72px)` for the animated slogan (`ewi.css:304-305`) but only on the homepage; inner-page `.page-hero h1` content is denser (a full sentence, e.g. "Two decades of getting technical scopes delivered in Qatar") set at the smaller `h1{clamp(34px,7.4vw,58px)}` scale — fine individually, but the visual "weight" of the homepage hero vs. inner-page heroes differs enough that navigating from Home to any other page feels like a step down in production value.

---

## 3. Content Clarity

**Works well**
- Copy is specific and jargon-appropriate for the audience (B2B procurement/engineering) — "Bill-of-quantity pricing," "IQ/OQ," "DCIM/AIM" are correct register, not marketing fluff.
- Each of the 4 divisions gets its own consistent structure: kicker → tags → 2 paragraphs → checklist → principal-brand grid. Easy to compare divisions against each other.

**Problems — confirmed in source**
- **Character-encoding bug**: several `alt` attributes contain literal mojibake (`â€"` where an em dash or `ü` should be), from double-encoded UTF-8. Confirmed at:
  - `clients.php:32` — `alt="Ashghal â€" Public Works Authority"`
  - `clients.php:33` — `alt="Kahramaa â€" Qatar General Electricity & Water"`
  - `clients.php:89` — `alt="College of the North Atlantic â€" Qatar"`
  - `partners.php:3` (meta description) and `index.php:192`, `partners.php:61`, `divisions.php:137` — `alt="WeidmÃ¼ller"` (should be "Weidmüller")
  This text is read aloud by screen readers exactly as broken, and is indexed by search engines as garbled alt text — a real accessibility and SEO defect, not just cosmetic.
- **Placeholder imagery in production**: figure images across About, Home, Services, Divisions use literal placeholder filenames — `warehouse-placeholder.jpg` (`index.php:111`, `about.php:31`), `electrical-placeholder.png` (`divisions.php:130`), `cybersecurity-placeholder.jpg` (`divisions.php:207`), plus a `data-centre.jpg` under `assets/placeholders/`. For a company whose entire pitch is "20 years of real projects for QatarEnergy, Hamad Medical, Qatar Rail..." (per the stats bar and Clients page), showing stock/placeholder photography directly undercuts the credibility argument the copy is making — this is the single highest-impact content fix available (Zonka "satisfaction/trust" pillar).
- Alt text quality is otherwise good (descriptive, not "image123.jpg"), and decorative images are correctly hidden from assistive tech (`index.php:12`, `hero-fallback-img ... hidden`).

---

## 4. Forms

- **There are no HTML forms anywhere in the site.** All "enquiry" paths are `mailto:`, `tel:`, or `wa.me` links (confirmed in `partials/footer.php`, every page's CTA band, and `INSTRUCTIONS.md:34`, which states this is intentional, not an oversight).
- This is a legitimate design choice for a B2B distributor, but it has real friction costs Zonka's "efficiency" pillar flags directly:
  - A `mailto:` link does nothing on a device with no configured desktop mail client (very common on shared/work PCs, Chromebooks, or anyone using Gmail/Outlook web only) — the click silently fails or opens an OS "choose an app" dialog with no fallback.
  - There's no way to capture a lead's name, company, or requirement in-page — every enquiry starts a blank email with only a `subject=` pre-fill, so the visitor must retype context the site already knows (which division, which page they were on).
  - No lead is captured if the click fails, so the business likely has no visibility into who tried to convert and couldn't.
- Recommendation: keep the `mailto`/WhatsApp options (they're genuinely fast for a phone-in-hand user) but add one lightweight on-page form (name, email, division dropdown pre-filled from the anchor the user came from, message) as a fallback path — this closes the biggest usability gap on the site without touching the site's design language.

---

## 5. Mobile Responsiveness

**Works well**
- Genuinely mobile-first CSS: base styles are unprefixed, desktop rules are gated behind `@media (min-width:1024px)` (`ewi.css:212` for nav, `:355/356` for division cards, `:402/403` for grids). This is the correct authoring direction and it shows — nothing here looks like a desktop site squeezed into a media query.
- Full-screen slide-in mobile nav with proper `aria-expanded`, `Escape`-to-close, and body-scroll lock while open (`assets/js/ewi.js:166-185`) — well-built, not just a CSS toggle.
- Utility bar intelligently drops the "hours" text and the flex spacer under 860px (`ewi.css:141-145`) rather than letting it wrap awkwardly.
- Hero video is explicitly skipped under `(max-width:767px)` in favour of a static fallback image (`ewi.js:112-119`) — correct call for mobile data/battery.

**Problems**
- The homepage hero video only skips on `max-width:767px`; **it does not check connection speed** (`navigator.connection.saveData` / `effectiveType`), so a phone in landscape (>767px reported width) or a small tablet still triggers the full video fetch.
- The lab image slider on Divisions (`divisions.php:79-88`) auto-advances every 2.6s and only pauses on `mouseenter`/`mouseleave` (`ewi.js:96-97`) — there is no touch/tap pause and no keyboard-focus pause, so on a touchscreen (the majority of real-world mobile traffic) the slide can change mid-read with no way to stop it. This is a WCAG 2.2.2 (Pause, Stop, Hide) miss specifically on mobile, where the hover escape hatch doesn't exist.
- `.wa-float` (floating WhatsApp button) collapses to an icon-only 56px button under 520px (`ewi.css:570`) — good density decision, but it sits fixed on screen for the entire visit and was not checked against the mobile nav toggle / header CTA for overlap on very short viewports (e.g. landscape phones ~375×667 rotated).

---

## 6. Performance

- **Confirmed shipped regression**: `index.php:11` points the hero `<video>` at `assets/video/0909.mp4`, a **6MB** file (the JS's own code comment at `ewi.js:106-109` says "The mp4 is 6MB, too heavy to fetch on mobile"). Two compressed alternates already exist on disk — `assets/video/0909_compress.mp4` and `0909_compress_optimized.mp4` (~3.4MB each, per `ls`) — but **neither is referenced anywhere in the codebase**. Every desktop visitor to the homepage is currently downloading the uncompressed original; the compression work was done but never wired up. This is the single highest-leverage, lowest-risk performance fix available (swap the `data-src` and delete/replace the old file).
- Icon library is pulled from a public CDN with **no version pin protection beyond the URL itself** (`https://unpkg.com/lucide@0.469.0/...`, `partials/footer.php:57`) and **no `defer`/`async`**, and it sits before `ewi.js` which calls `lucide.createIcons()` — a slow or blocked CDN request delays every icon on the page (nav, buttons, checklists) until it resolves, and there's no local fallback if unpkg is down.
- Google Fonts is loaded render-blocking via `<link rel="stylesheet">` with `preconnect` (`partials/header.php:35-37`) — reasonable mitigation, but `font-display:swap` relies on the Google-served CSS actually including it (not verified in this review since it's a remote resource).
- Images throughout use `loading="lazy"` and explicit `width`/`height` correctly on logo grids and marquees (prevents layout shift) — this is done well and consistently across all 5 pages.
- The client/partner logo marquees are duplicated in the DOM via JS (`track.innerHTML += track.innerHTML`, `ewi.js:257-262`) to fake a seamless CSS loop — doubles the image requests for every marquee on every page load (mitigated by `loading="lazy"` and the images being small, but worth knowing it's ~2x the logo count in the DOM).

---

## 7. Accessibility

**Works well**
- `:focus-visible` custom outline instead of suppressing focus entirely (`ewi.css:71-72`) — correct pattern (hides focus ring for mouse users, keeps it for keyboard).
- `prefers-reduced-motion` is respected in three separate places: the slogan animation (`ewi.js:141`), the marquee clone/scroll (`ewi.js:255-262`), and CSS transition overrides (`ewi.css:347`, `496`, `615`) — thorough, not a single blanket rule.
- ARIA is used correctly, not decoratively: `aria-expanded`/`aria-controls` on the nav toggle and sub-menu button, `aria-live`-equivalent slide state via `aria-hidden` toggling on slider slides (`ewi.js:60`), `aria-label` on icon-only social links and the WhatsApp float.
- Skip link, semantic `<header>/<nav>/<main>/<footer>`, and one `<h1>` per page are all present and correctly used.

**Problems**
- **Colour contrast is borderline on the primary button.** `.btn-primary` is `background: var(--color-accent) #5980a6` with white text (`ewi.css:109`) at 16px/600-weight — by rough sRGB luminance calculation this lands close to ~4.1–4.2:1, under the WCAG AA 4.5:1 minimum for normal-size text (16px/600 does not qualify as "large text," which needs ≥18.66px bold). This button is the primary CTA repeated on every single page — worth an exact contrast-checker pass and likely a one-shade darker accent (`--color-accent-700` is already defined and used elsewhere in the same file).
- The lab slider's auto-advance (`ewi.js:78-101`) has no pause/stop control exposed to assistive tech beyond hover — see Mobile section above; this repeats as a WCAG 2.2.2 concern independent of device.
- Decorative `<i class="corner tl/tr/bl/br">` elements are repeated 4× on nearly every card, section, and slider across all 5 pages — they're empty and untagged (no `aria-hidden="true"`). Most screen readers skip empty elements automatically, but this isn't guaranteed across all AT/browser combinations, and it costs nothing to add `aria-hidden="true"` explicitly.
- No `lang` attribute changes are needed (all content is English), and no `<html lang>` issues were found — this is correctly set to `en` in `partials/header.php:17`.

---

## 8. Consistency

**Works well**
- The shared `partials/header.php` / `partials/footer.php` pattern means nav, meta tags, JSON-LD schema, and footer are identical byte-for-byte across every page — no drift risk from copy-paste page authoring.
- `$asset_version` cache-busting query string (`partials/header.php:14`, currently `20260907.7`) is applied consistently to both CSS and JS includes.

**Problems**
- **Duplicate stale HTML mirrors exist for every page** (`about.html`, `clients.html`, `divisions.html`, `index.html`, `partners.html`, `services.html`). `INSTRUCTIONS.md:39` confirms these are "generated previews only" and that `.php` takes precedence via `DirectoryIndex` — but that only protects the *index* route. Diffing `about.html` against `about.php` shows the static file is pinned to an **older CSS version** (`ewi.css?v=20260907.3` vs. the live `20260907.7`), meaning `about.html` is a stale snapshot. If any of these `.html` files are directly reachable by URL (they are, unless the server explicitly blocks them) or ever got crawled/linked before `.php` existed, they represent duplicate, out-of-date content sitting at a different URL than the canonical page — worth either regenerating them on every deploy or removing them from the public web root entirely.
- Two versions of a client logo exist (`assets/logos/clients/qapco.png` and `assets/logos/qapco.png` per the earlier file listing) — a minor asset-hygiene item, low risk but worth a one-time cleanup pass to avoid future "which one is current" confusion.

---

## Priority Fix List (highest impact → lowest)

1. **Swap the homepage hero video to the already-compressed file.** `index.php:11` → point `data-src` at `assets/video/0909_compress_optimized.mp4` (or `_compress.mp4`) instead of `0909.mp4`. Cuts ~2.7MB off every desktop homepage load with zero visual cost — the compression work is already done and sitting unused.
2. **Replace placeholder photography** (`warehouse-placeholder.jpg`, `electrical-placeholder.png`, `cybersecurity-placeholder.jpg`, `data-centre.jpg`) with real project photos. This directly undermines the "20 years, real clients" trust argument the copy is making everywhere else.
3. **Fix the mojibake alt text** in `clients.php:32,33,89` and every `WeidmÃ¼ller` occurrence (`index.php:192`, `partners.php:3,61`, `divisions.php:137`) — re-save the affected strings as clean UTF-8.
4. **Add a pause control (or slow/stop on tap) to the Divisions lab slider**, or drop the auto-advance for a manual/dot-only slider — closes the WCAG 2.2.2 gap on touch devices.
5. **Recheck `.btn-primary` contrast** with an actual contrast-checker tool; if it fails AA, swap to `--color-accent-700` for the button background (already defined, already used elsewhere) or darken text.
6. **Add a lightweight fallback contact form** (even a single mailto-triggering form with structured fields) alongside the existing mailto/WhatsApp links, to capture visitors whose default mail client isn't configured.
7. **Regenerate or remove the stale root `.html` files** so they can't be indexed or linked as duplicate/out-of-date content.
8. Low-effort polish: `aria-hidden="true"` on decorative corner-mark icons; active-state styling for the anchor pills on Divisions/Partners/Clients as the user scrolls; a real 404 page.
