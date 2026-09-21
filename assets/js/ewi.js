/* East West Trading International — site behaviour. No dependencies except Lucide icons. */
(function () {
  'use strict';

  var d = document;
  var finishLoading = function () {
    if (d.body) d.body.classList.remove('is-loading');
  };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', finishLoading, { once: true });
  else finishLoading();
  window.addEventListener('load', finishLoading, { once: true });
  window.addEventListener('pageshow', finishLoading, { once: true });

  var init = function () {

  /* ---- initial page loading ----------------------------------------- */
  /* ---- image slider ---------------------------------------------------
     Plain fade slider: .hero-slide/.lab-slide stack via CSS opacity,
     .is-active toggles which one shows. Single setInterval auto-advances;
     mouse hover, keyboard focus and the pause/play toggle button each
     independently suspend it (WCAG 2.2.2 — the toggle is what gives touch
     and screen-reader users, who have no hover, a way to stop it). The fade
     transition itself is disabled under prefers-reduced-motion via CSS
     (near-zero transition duration), so slides still rotate but swap
     instantly instead of fading. No arrows, no links — each dot doubles as
     a countdown bar that fills over the interval so the time to the next
     slide is visible. */

  var initFadeSlider = function (slider) {
    if (slider.dataset.sliderInited) return;
    slider.dataset.sliderInited = '1';

    var slides = Array.prototype.slice.call(slider.querySelectorAll('.hero-slide, .lab-slide'));
    if (slides.length < 2) return;
    var dotsWrap = slider.querySelector('.slider-dots');
    var prev = slider.querySelector('[data-slider-prev]');
    var next = slider.querySelector('[data-slider-next]');
    var interval = Number(slider.dataset.interval) || 6000;
    var current = Math.max(0, slides.findIndex(function (s) { return s.classList.contains('is-active'); }));
    var timer = null;
    var pauseFlags = {};
    var dots = [];

    if (dotsWrap) slides.forEach(function (_, i) {
      var dot = d.createElement('button');
      dot.type = 'button';
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', 'Show slide ' + (i + 1));
      var fill = d.createElement('span');
      fill.className = 'slider-dot-fill';
      dot.appendChild(fill);
      dot.addEventListener('click', function () { showSlide(i); startTimer(); });
      dotsWrap.appendChild(dot);
      dots.push({ el: dot, fill: fill });
    });

    /* Pause/play toggle: the only way a touch or assistive-tech user (no
       hover) can stop the auto-advance — required for WCAG 2.2.2. */
    var pauseBtn = null;
    if (dotsWrap) {
      pauseBtn = d.createElement('button');
      pauseBtn.type = 'button';
      pauseBtn.className = 'slider-pause';
      pauseBtn.setAttribute('aria-pressed', 'false');
      pauseBtn.setAttribute('aria-label', 'Pause slideshow');
      pauseBtn.innerHTML = '<i class="icon-pause" data-lucide="pause" aria-hidden="true"></i><i class="icon-play" data-lucide="play" aria-hidden="true"></i>';
      pauseBtn.addEventListener('click', function () {
        var nowPaused = pauseBtn.getAttribute('aria-pressed') !== 'true';
        pauseBtn.setAttribute('aria-pressed', String(nowPaused));
        pauseBtn.setAttribute('aria-label', nowPaused ? 'Play slideshow' : 'Pause slideshow');
        setPause('manual', nowPaused);
      });
      dotsWrap.appendChild(pauseBtn);
    }

    function showSlide(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        var active = i === current;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      dots.forEach(function (dot, i) {
        dot.el.classList.toggle('is-active', i === current);
        dot.fill.style.transition = 'none';
        dot.fill.style.width = '0';
      });
      if (dots[current]) {
        var activeFill = dots[current].fill;
        activeFill.offsetWidth; /* reflow: force restart of the fill transition */
        activeFill.style.transition = 'width ' + interval + 'ms linear';
        activeFill.style.width = '100%';
      }
    }

    function nextSlide() { showSlide(current + 1); }
    function prevSlide() { showSlide(current - 1); }

    function isPaused() {
      for (var reason in pauseFlags) { if (pauseFlags[reason]) return true; }
      return false;
    }

    function startTimer() {
      window.clearInterval(timer);
      if (!isPaused()) timer = window.setInterval(nextSlide, interval);
    }

    function setPause(reason, value) {
      pauseFlags[reason] = value;
      startTimer();
    }

    if (next) next.addEventListener('click', function () { nextSlide(); startTimer(); });
    if (prev) prev.addEventListener('click', function () { prevSlide(); startTimer(); });

    /* Hover (mouse) and keyboard focus each pause independently of the
       manual toggle, so leaving one doesn't cancel a pause set by another. */
    slider.addEventListener('mouseenter', function () { setPause('hover', true); });
    slider.addEventListener('mouseleave', function () { setPause('hover', false); });
    slider.addEventListener('focusin', function () { setPause('focus', true); });
    slider.addEventListener('focusout', function (e) {
      if (!slider.contains(e.relatedTarget)) setPause('focus', false);
    });

    showSlide(current);
    startTimer();
  };

  Array.prototype.forEach.call(d.querySelectorAll('[data-slider]'), initFadeSlider);

  /* ---- hero video ------------------------------------------------------
     Plays on every device. The markup already carries <source> plus
     autoplay/muted/playsinline, so it starts without this script; this
     only nudges browsers that block autoplay (iOS Low Power Mode, data
     saver) by retrying on the first touch/click/scroll and whenever the
     tab becomes visible again. */
  var heroVideo = d.querySelector('video.hero-video');
  if (heroVideo) {
    heroVideo.muted = true;
    var playHero = function () {
      if (!heroVideo.paused) return;
      var p = heroVideo.play();
      if (p && p.catch) p.catch(function () {});
    };
    playHero();
    ['touchstart', 'click', 'scroll', 'keydown'].forEach(function (evt) {
      window.addEventListener(evt, playHero, { passive: true, once: true });
    });
    d.addEventListener('visibilitychange', function () {
      if (!d.hidden) playHero();
    });
  }

  /* ---- slogan hover animation ------------------------------------------
     "Excellence" flies across, through "through" (which vanishes on
     contact) and on past "Innovation" (which pulses as it's uncovered),
     then everything eases back to its resting order. Travel distances are
     measured from the live layout on each hover so it stays correct at
     any viewport width; if the words have wrapped onto separate lines
     the animation is skipped rather than run sideways. */
  var sloganHeading = d.querySelector('.hero-video-caption h1.slogan');
  if (sloganHeading && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    var wExcellence = sloganHeading.querySelector('[data-slogan-word="excellence"]');
    var wThrough = sloganHeading.querySelector('[data-slogan-word="through"]');
    var wInnovation = sloganHeading.querySelector('[data-slogan-word="innovation"]');
    if (wExcellence && wThrough && wInnovation) {
      var playSlogan = function () {
        if (sloganHeading.classList.contains('is-animating')) return;
        var rE = wExcellence.getBoundingClientRect();
        var rT = wThrough.getBoundingClientRect();
        var rI = wInnovation.getBoundingClientRect();
        if (Math.round(rE.top) !== Math.round(rT.top) || Math.round(rT.top) !== Math.round(rI.top)) return;
        var toThrough = rT.left - rE.left;
        var toInnovation = (rI.right - (rE.left + rE.width)) + 12;
        sloganHeading.style.setProperty('--slogan-to-through', toThrough + 'px');
        sloganHeading.style.setProperty('--slogan-to-innovation', toInnovation + 'px');
        sloganHeading.classList.add('is-animating');
      };
      sloganHeading.addEventListener('mouseenter', playSlogan);
      sloganHeading.addEventListener('animationend', function (e) {
        if (e.target === wExcellence) sloganHeading.classList.remove('is-animating');
      });
    }
  }

  /* ---- mobile nav ---------------------------------------------------- */
  var toggle = d.querySelector('.nav-toggle');
  var nav = d.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      d.body.style.overflow = !open && window.innerWidth < 1024 ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && !e.target.closest('.sub-toggle') && window.innerWidth < 1024) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        d.body.style.overflow = '';
      }
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) toggle.click();
    });
  }

  /* ---- submenu accordion (mobile) / hover pop-out (desktop) ---------- */
  Array.prototype.forEach.call(d.querySelectorAll('.sub-toggle'), function (btn) {
    btn.addEventListener('click', function (e) {
      if (window.innerWidth >= 1024) return;
      e.preventDefault();
      btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    });
  });
  /* ---- sticky header shadow ----------------------------------------- */
  var header = d.querySelector('.site-header');
  if (header) {
    var scrollFrame = 0;
    var onScroll = function () {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(function () {
        header.classList.toggle('is-stuck', window.scrollY > 8);
        scrollFrame = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- scroll reveal ------------------------------------------------- */
  var reveals = d.querySelectorAll('.reveal');
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      Array.prototype.forEach.call(reveals, function (el, i) {
        el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
        io.observe(el);
      });
    } else {
      Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
    }
  }

  /* ---- counters ------------------------------------------------------ */
  var counters = d.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        cio.unobserve(el);
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var start = performance.now();
        var dur = 1100;
        (function step(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(start);
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(counters, function (el) { cio.observe(el); });
  }

  /* ---- marquee: duplicate the track so the loop is seamless ---------- */
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    Array.prototype.forEach.call(d.querySelectorAll('.marquee-track'), function (track) {
      if (track.dataset.cloned) return;
      track.dataset.cloned = '1';
      track.innerHTML += track.innerHTML;
    });
  }

  /* ---- anchor pill scroll-spy (Divisions/Partners/Clients) ----------- */
  var anchorsWrap = d.querySelector('.anchors');
  if (anchorsWrap && 'IntersectionObserver' in window) {
    var anchorLinks = Array.prototype.slice.call(anchorsWrap.querySelectorAll('a[href^="#"]'));
    var anchorSections = [];
    anchorLinks.forEach(function (a) {
      var section = d.getElementById(a.getAttribute('href').slice(1));
      if (section) anchorSections.push({ link: a, section: section });
    });
    if (anchorSections.length) {
      var setActiveAnchor = function (section) {
        anchorSections.forEach(function (entry) {
          entry.link.classList.toggle('is-active', entry.section === section);
        });
      };
      var aio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveAnchor(entry.target);
        });
      }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
      anchorSections.forEach(function (entry) { aio.observe(entry.section); });
    }
  }

  /* ---- decorative corner marks: hide from assistive tech ------------- */
  Array.prototype.forEach.call(d.querySelectorAll('.corner'), function (el) {
    el.setAttribute('aria-hidden', 'true');
  });

  /* ---- current year -------------------------------------------------- */
  Array.prototype.forEach.call(d.querySelectorAll('[data-year]'), function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- contact form handler ------------------------------------------ */
  var contactForm = d.getElementById('contact-form');
  var successAlert = d.getElementById('form-success');
  if (contactForm && successAlert) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (d.getElementById('cf-name') || {}).value || '';
      var email = (d.getElementById('cf-email') || {}).value || '';
      var phone = (d.getElementById('cf-phone') || {}).value || '';
      var company = (d.getElementById('cf-company') || {}).value || '';
      var division = (d.getElementById('cf-division') || {}).value || 'General Inquiry';
      var subject = (d.getElementById('cf-subject') || {}).value || ('Message from ' + (name || 'Website Visitor'));
      var message = (d.getElementById('cf-message') || {}).value || '';

      var body = 'Name: ' + name + '\n' +
                 (company ? ('Company: ' + company + '\n') : '') +
                 'Email: ' + email + '\n' +
                 'Phone: ' + phone + '\n' +
                 'Topic / Division: ' + division + '\n\n' +
                 'Message:\n' + message;

      var mailtoUrl = 'mailto:eastwest@qatar.net.qa' +
                      '?subject=' + encodeURIComponent('[' + division + '] ' + subject) +
                      '&body=' + encodeURIComponent(body);

      successAlert.classList.add('is-visible');
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Trigger mailto client
      window.location.href = mailtoUrl;
    });
  }

  /* ---- icons --------------------------------------------------------- */
  function drawIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({ attrs: { 'stroke-width': 1.5 } });
    }
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', drawIcons);
  else drawIcons();
  window.addEventListener('load', drawIcons);
  };

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
