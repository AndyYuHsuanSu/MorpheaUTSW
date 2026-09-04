/* Sclerosing Skin — minimal progressive enhancement.
   Two behaviours only: the small-screen nav disclosure, and marking the
   current section in the article rail. Nothing here is decorative. */

(function () {
  'use strict';

  /* ── Nav disclosure (small screens) ────────────────────────── */
  var toggle = document.querySelector('.navtoggle');
  var nav = document.getElementById('mainnav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });

    // Close on Escape, returning focus to the control that opened it.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
        toggle.focus();
      }
    });
  }

  /* ── Article rail: mark the section currently in view ──────── */
  var railLinks = Array.prototype.slice.call(document.querySelectorAll('.rail a[href^="#"]'));
  if (!railLinks.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  var targets = [];

  railLinks.forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    var section = document.getElementById(id);
    if (!section) return;
    byId[id] = link;
    targets.push(section);
  });

  function setCurrent(id) {
    railLinks.forEach(function (link) {
      var on = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-current', on);
      if (on) { link.setAttribute('aria-current', 'true'); }
      else { link.removeAttribute('aria-current'); }
    });
  }

  // Band runs from the top of the viewport down to ~35%, so a heading scrolled
  // flush to the top still counts as current.
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { seen[e.target.id] = e.isIntersecting; });
    // Of everything in the band, mark the one highest on the page.
    var inBand = targets.filter(function (t) { return seen[t.id]; });
    if (inBand.length) { setCurrent(inBand[0].id); return; }
    // Nothing in the band (long section, or the very bottom of the page):
    // fall back to the last heading that has scrolled past the top.
    var passed = targets.filter(function (t) { return t.getBoundingClientRect().top <= 120; });
    if (passed.length) { setCurrent(passed[passed.length - 1].id); }
  }, { rootMargin: '0px 0px -65% 0px', threshold: 0 });

  var seen = {};
  targets.forEach(function (t) { observer.observe(t); });
}());
