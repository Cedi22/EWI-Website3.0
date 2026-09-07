# East West Trading International — eastwestint.qa

A static HTML5 / PHP / CSS rebuild of the WordPress site, for a Virtualmin
LAMP stack. No CMS, no database, no server-side application logic — PHP is
used only to share the header and footer between pages.

## Deploying

Upload the contents of this folder to the domain's `public_html`:

```
index.php            Home
about.php            About EWI
divisions.php        Lab Systems / Electrical / Cyber Security (#lab #electrical #cyber)
services.php         Services + process
partners.php         Principals by division
clients.php          Clients by sector
partials/            header.php + footer.php (shared shell)
assets/css/ewi.css   The only stylesheet
assets/js/ewi.js     Nav, scroll reveal, counters, logo marquee
assets/logos/        Partner and client logos
assets/ewi-logo.png  Company logo
robots.txt, sitemap.xml
```

Requirements: PHP 7.4+ (only `include` is used). Set `index.php` as the
directory index. No write permissions, cron jobs or mail configuration needed.

The `*.html` files at the root are **generated previews** of the `.php` pages so
the site can be reviewed without a PHP runtime. They are not part of the
deployment — delete them before going live, or leave them; `.php` takes
precedence via DirectoryIndex.

### Recommended `.htaccess`

```apache
DirectoryIndex index.php
Options -Indexes

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/png  "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css   "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript image/svg+xml
</IfModule>
```

## Editing content

Each page is a plain PHP file: a short variable block (`$title`, `$desc`,
`$page`, `$canonical`) followed by ordinary HTML sections. Change copy directly
in the markup. To add a partner or client logo, drop the file into
`assets/logos/...` and copy one `<span class="logo-cell">` line.

Contact details, nav items and the footer live in `partials/header.php` and
`partials/footer.php` — change them once and every page updates.

## Design system

Built on the **Industry** design system: light technical ground (`#f2f2f3`),
single steel-blue accent (`#5980a6`), Barlow Condensed headings over Barlow
body, square corners, hairline borders and `+` registration marks on framed
objects. All colours, spacing and type are CSS custom properties at the top of
`assets/css/ewi.css` — retune there, never hard-code values in the pages.

## Behaviour

- Mobile-first; the nav becomes a full-height slide-in panel below 1024px and a
  hover pop-out mega-menu above it.
- Hover pop-out on division cards, service cards, logo cells and footer links.
- Scroll-reveal on sections, animated counters on the stats plate, and an
  infinite partner-logo marquee that pauses on hover.
- Everything degrades gracefully with JavaScript disabled, and all motion is
  suppressed under `prefers-reduced-motion`.

## Third-party dependencies

Two CDN requests, both optional:

- **Google Fonts** — Barlow + Barlow Condensed.
- **Lucide icons** (`unpkg.com/lucide@0.469.0`) — icons are `<i data-lucide="…">`
  placeholders replaced on load.

For a fully self-hosted site, download both and change the two `<link>`/`<script>`
tags in `partials/header.php` and `partials/footer.php` to local paths.

## Known gaps

- **Photography** — every image slot marked `PHOTO PLACEHOLDER` needs a real
  photo (office/warehouse, a completed lab fit-out, a site installation, a rack).
  Replace the `<figure class="figure …">` block with an `<img>`.
- **Enquiry form** — enquiries go to `mailto:` / WhatsApp / phone by design. If
  a real form is wanted later, it needs a small PHP handler plus spam protection.
- **Logo file** — `assets/ewi-logo.png` is a JPEG on a white background; the
  header uses `mix-blend-mode: multiply` to hide the white box. A transparent
  PNG or SVG would be cleaner.
- **Not carried over from the old site** — the placeholder "New York, USA /
  1010 Grand Avenue / mail@example.com" footer, dead Twitter/Facebook/
  Instagram/Google+ links, the three duplicate "home" pages, the eight-slide
  identical hero carousel, and Events/Gallery (no current content supplied).
