<?php
/**
 * Shared page shell (top half).
 * Set these before including:
 *   $title     — <title> text
 *   $desc      — meta description
 *   $page      — home | about | divisions | services | partners | clients
 *   $canonical — absolute URL of this page
 */
if (!isset($title))     { $title = 'East West Trading International'; }
if (!isset($desc))      { $desc = 'Technology, laboratory, electrical, network &amp; data centre distribution in Qatar since 2002.'; }
if (!isset($page))      { $page = ''; }
if (!isset($canonical)) { $canonical = 'https://www.eastwestint.qa/'; }
$asset_version = '20260907.7';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php echo $title; ?></title>
<meta name="description" content="<?php echo $desc; ?>">
<link rel="canonical" href="<?php echo $canonical; ?>">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:site_name" content="East West Trading International">
<meta property="og:title" content="<?php echo $title; ?>">
<meta property="og:description" content="<?php echo $desc; ?>">
<meta property="og:url" content="<?php echo $canonical; ?>">
<meta property="og:image" content="https://www.eastwestint.qa/assets/ewi-logo.png">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1d2d3d">
<link rel="icon" href="assets/ewi-logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&amp;family=Barlow+Condensed:wght@400;500;600;700&amp;display=swap">
<link rel="stylesheet" href="assets/css/ewi.css?v=<?php echo $asset_version; ?>">
<script>document.documentElement.className += ' js';</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "East West Trading International",
  "alternateName": "EWI Qatar",
  "url": "https://www.eastwestint.qa/",
  "logo": "https://www.eastwestint.qa/assets/ewi-logo.png",
  "image": "https://www.eastwestint.qa/assets/ewi-logo.png",
  "description": "Qatari distributor of laboratory systems, electrical materials, network & data centre infrastructure and cyber security solutions. Established 2002.",
  "foundingDate": "2002",
  "telephone": "+974-4465-4878",
  "email": "eastwest@qatar.net.qa",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Office 2, First Floor, Tower 2, Financial Square, C-Ring Road",
    "postOfficeBoxNumber": "23340",
    "addressLocality": "Doha",
    "addressCountry": "QA"
  },
  "areaServed": { "@type": "Country", "name": "Qatar" },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Sunday","Monday","Tuesday","Wednesday","Thursday"],
    "opens": "08:00",
    "closes": "17:00"
  },
  "sameAs": ["https://www.linkedin.com/company/eastwest-trading-int-l/"]
}
</script>
</head>
<body class="is-loading" data-page="<?php echo $page; ?>">
<div class="page-loader" role="status" aria-label="Loading page">
  <span class="page-loader-mark" aria-hidden="true"></span>
</div>
<a class="skip" href="#main">Skip to content</a>

<div class="utility">
  <div class="wrap">
    <a href="tel:+97444654878"><i data-lucide="phone"></i>+974 4465 4878</a>
    <a href="https://wa.me/97470497307"><i data-lucide="message-circle"></i>+974 7049 7307</a>
    <a href="mailto:eastwest@qatar.net.qa"><i data-lucide="mail"></i>eastwest@qatar.net.qa</a>
    <span class="u-spacer"></span>
    <span class="u-hours"><i data-lucide="clock"></i>Sun&ndash;Thu, 8:00&ndash;17:00</span>
  </div>
</div>

<header class="site-header">
  <div class="wrap">
    <a class="brand" href="index.php" aria-label="East West Trading International — home">
      <img src="assets/logo.png" alt="East West Trading International" width="740" height="90">
    </a>

    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Menu">
      <span></span><span></span><span></span><i data-lucide="x" aria-hidden="true"></i>
    </button>

    <nav class="nav" id="primary-nav" aria-label="Primary">
      <ul class="nav-list">
        <li class="nav-home"><a href="index.php">Home</a></li>
        <li class="nav-about"><a href="about.php">About</a></li>
        <li class="nav-divisions">
          <button class="sub-toggle" type="button" aria-expanded="false">Divisions <i data-lucide="chevron-down"></i></button>
          <div class="subnav">
            <div>
              <a href="divisions.php#lab">
                <strong>Lab Systems</strong>
                <small>Turnkey laboratories, scientific instrumentation, furniture and automation.</small>
              </a>
              <a href="divisions.php#electrical">
                <strong>Electrical Division</strong>
                <small>Cable management, enclosures, tools and site materials for major projects.</small>
              </a>
              <a href="divisions.php#network">
                <strong>Network &amp; Data Centre</strong>
                <small>Structured cabling, fibre, switching and modular data centre infrastructure.</small>
              </a>
              <a href="divisions.php#cyber">
                <strong>Cyber Security</strong>
                <small>Network visibility and threat detection with NEOX and Stamus Networks.</small>
              </a>
            </div>
          </div>
        </li>
        <li class="nav-services"><a href="services.php">Services</a></li>
        <li class="nav-partners"><a href="partners.php">Partners</a></li>
        <li class="nav-clients"><a href="clients.php">Clients</a></li>
      </ul>
      <div class="nav-cta">
        <a class="btn btn-primary btn-block" href="mailto:eastwest@qatar.net.qa?subject=Enquiry%20from%20eastwestint.qa">Request a quote</a>
        <a class="btn btn-secondary btn-block" href="https://wa.me/97470497307">WhatsApp us</a>
      </div>
    </nav>

    <a class="btn btn-primary header-cta" href="mailto:eastwest@qatar.net.qa?subject=Enquiry%20from%20eastwestint.qa">
      Request a quote <i data-lucide="arrow-right"></i>
    </a>
  </div>
</header>

<main id="main">
