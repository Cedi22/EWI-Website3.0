<?php
http_response_code(404);
$title = 'Page Not Found | East West Trading International';
$desc = 'The page you were looking for could not be found on the East West Trading International website.';
$page = '';
$canonical = 'https://www.eastwestint.qa/404.php';
include __DIR__ . '/partials/header.php';
?>

<section class="cta on-dark">
  <div class="wrap" style="text-align:center">
    <div class="reveal">
      <p class="kicker">Error 404</p>
      <h1>Page not found</h1>
      <p>The page you&rsquo;re looking for may have moved or no longer exists. Try one of our divisions or head back to the homepage.</p>
    </div>
    <div class="cta-actions reveal" style="align-items:center;margin-top:var(--space-8)">
      <a class="btn btn-primary btn-block" href="index.php">Back to home</a>
      <a class="btn btn-secondary btn-block" href="divisions.php">Browse divisions</a>
      <a class="btn btn-secondary btn-block" href="mailto:eastwest@qatar.net.qa">Contact us</a>
    </div>
  </div>
</section>

<?php include __DIR__ . '/partials/footer.php'; ?>
