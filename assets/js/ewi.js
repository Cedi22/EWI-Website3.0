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
     .is-active toggles which one shows. Single setInterval auto-advances,
     runs continuously — not paused by hover/focus/dot clicks. The fade
     transition itself is disabled under prefers-reduced-motion via CSS
     (near-zero transition duration), so slides still rotate but swap
     instantly instead of fading — auto-advance keeps running either way.
     No arrows, no links — each dot doubles as a countdown bar that fills
     over the interval so the time to the next slide is visible. */

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
    var paused = false;
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

    function startTimer() {
      window.clearInterval(timer);
      if (!paused) timer = window.setInterval(nextSlide, interval);
    }

    function pauseSlider() {
      paused = true;
      window.clearInterval(timer);
    }

    function resumeSlider() {
      paused = false;
      startTimer();
    }

    if (next) next.addEventListener('click', function () { nextSlide(); startTimer(); });
    if (prev) prev.addEventListener('click', function () { prevSlide(); startTimer(); });

    slider.addEventListener('mouseenter', pauseSlider);
    slider.addEventListener('mouseleave', resumeSlider);

    showSlide(current);
    startTimer();
  };

  Array.prototype.forEach.call(d.querySelectorAll('[data-slider]'), initFadeSlider);

  /* ---- hero video ------------------------------------------------------ */
  var heroVideo = d.querySelector('.hero-video');
  if (heroVideo && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroVideo.removeAttribute('autoplay');
    heroVideo.pause();
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
      if (e.target.closest('a') && window.innerWidth < 1024) {
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

  /* ---- current year -------------------------------------------------- */
  Array.prototype.forEach.call(d.querySelectorAll('[data-year]'), function (el) {
    el.textContent = new Date().getFullYear();
  });

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
