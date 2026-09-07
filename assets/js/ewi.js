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
  /* ---- image sliders ------------------------------------------------- */
  Array.prototype.forEach.call(d.querySelectorAll('[data-slider]'), function (slider) {
    var slides = slider.querySelectorAll('.hero-slide, .lab-slide');
    var dots = slider.querySelector('.slider-dots');
    var timerBar = slider.querySelector('.slider-timer span');
    if (slides.length < 2 || !dots) return;
    var index = 0;
    var timer;
    Array.prototype.forEach.call(slides, function (slide, i) {
      var dot = d.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Show slide ' + (i + 1));
      dot.addEventListener('click', function () { show(i); restart(); });
      dots.appendChild(dot);
    });
    var show = function (next) {
      index = (next + slides.length) % slides.length;
      Array.prototype.forEach.call(slides, function (slide, i) { slide.classList.toggle('is-active', i === index); });
      Array.prototype.forEach.call(dots.children, function (dot, i) { dot.classList.toggle('is-active', i === index); });
    };
    var restart = function () {
      window.clearTimeout(timer);
      if (timerBar) {
        timerBar.style.transition = 'none';
        timerBar.style.width = '0%';
        void timerBar.offsetWidth;
      }
      if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        var interval = Number(slider.dataset.interval) || 6000;
        if (timerBar) {
          window.requestAnimationFrame(function () {
            timerBar.style.transition = 'width ' + interval + 'ms linear';
            timerBar.style.width = '100%';
          });
        }
        timer = window.setTimeout(function () { show(index + 1); restart(); }, interval);
      } else if (timerBar) {
        timerBar.style.width = '100%';
      }
    };
    var previous = slider.querySelector('.slider-prev');
    var next = slider.querySelector('.slider-next');
    if (previous) previous.addEventListener('click', function () { show(index - 1); restart(); });
    if (next) next.addEventListener('click', function () { show(index + 1); restart(); });
    show(0);
    restart();
  });

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
      if (track.dataset.cloned || track.closest('.marquee--clients')) return;
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
