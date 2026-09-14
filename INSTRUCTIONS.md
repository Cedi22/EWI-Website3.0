# Testing Instructions (Local XAMPP)

## Setup

1. Open XAMPP Control Panel.
2. Start **Apache** and **MySQL** modules.
3. Confirm this project lives at `C:\xampp\htdocs\ewi-website-redesign\`.
4. Open a browser and go to:

   ```
   http://localhost/ewi-website-redesign/
   ```

No Vite, npm, or dev server is used. This is a plain PHP/HTML/CSS/JS site served directly by Apache. Do not run `npm run dev` or any build tool — edit files in place and reload the browser.

## Pages to test

| Page | URL |
|---|---|
| Home | `http://localhost/ewi-website-redesign/index.php` |
| About | `http://localhost/ewi-website-redesign/about.php` |
| Divisions | `http://localhost/ewi-website-redesign/divisions.php` |
| Services | `http://localhost/ewi-website-redesign/services.php` |
| Partners | `http://localhost/ewi-website-redesign/partners.php` |
| Clients | `http://localhost/ewi-website-redesign/clients.php` |

## What to check

- **Responsiveness** — resize/emulate desktop (1440px+), tablet (768px), and mobile (375px) widths. Confirm the nav collapses to a slide-in panel below 1024px.
- **Navigation** — header links, mega-menu/hover pop-outs, mobile nav toggle, footer links, logo click-to-home.
- **Links** — internal page links, external partner/client links, `mailto:`/WhatsApp/phone enquiry links.
- **Images** — logos, partner/client logo grids, hero/slide images, placeholder figures load correctly with no broken paths.
- **Animations** — scroll-reveal on sections, animated stat counters, infinite logo marquee (pauses on hover), and that all motion is suppressed under `prefers-reduced-motion`.
- **Forms** — any enquiry/contact interactions (this site uses `mailto:`/WhatsApp/phone links by design, not a server-side form).
- **Major interactions** — hover states on division/service cards and logo cells, mobile nav open/close, keyboard focus/tab order.

## Notes

- The `*.html` files at the project root are generated previews only — always test the `.php` versions above, since `.php` takes precedence via `DirectoryIndex`.
- Two optional CDN requests are used (Google Fonts, Lucide icons) — verify they load, or note if blocked offline.
