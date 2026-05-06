// ─── Nav Menu Toggle ─────────────────────────────────────────
const toggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
if (toggle && navLinks) {
  const setOpen = (open) => {
    navLinks.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(!navLinks.classList.contains('open')));
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });
  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) setOpen(false);
  });
  // Close when clicking outside the nav
  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('open')) return;
    const nav = document.querySelector('.nav');
    if (nav && !nav.contains(e.target)) setOpen(false);
  });
}

// ─── Nav Scroll Shadow ───────────────────────────────────────
const nav = document.querySelector('.nav');
if (nav) {
  const handleNavScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();
}

// ─── Reading Progress Bar ─────────────────────────────────────
const progressBar = document.getElementById('reading-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    progressBar.style.width = pct + '%';
  }, { passive: true });
}

// ─── Staggered Reveals on Card Grids ─────────────────────────
const staggerDelayClasses = ['reveal--d1', 'reveal--d2', 'reveal--d3', 'reveal--d4'];

document.querySelectorAll('.cards, .fire-meter, .fire-grid').forEach(grid => {
  const children = grid.querySelectorAll('.card, .fire-card, .fire-meter__item');
  children.forEach((el, i) => {
    el.classList.add('reveal', staggerDelayClasses[Math.min(i, staggerDelayClasses.length - 1)]);
  });
});

document.querySelectorAll('.mayo-grid').forEach(grid => {
  grid.querySelectorAll('.mayo-card').forEach((el, i) => {
    el.classList.add('reveal', staggerDelayClasses[Math.min(i, staggerDelayClasses.length - 1)]);
  });
});

// ─── Scroll Reveal ────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target); // fire once
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ─── Accordion ───────────────────────────────────────────────
document.querySelectorAll('.accordion__trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const acc = btn.closest('.accordion');
    const isOpen = acc.classList.contains('is-open');
    // Close others in same parent
    const siblings = acc.parentElement.querySelectorAll('.accordion.is-open');
    siblings.forEach(s => { if (s !== acc) s.classList.remove('is-open'); });
    acc.classList.toggle('is-open', !isOpen);
  });
});

// ─── TOC Active Highlight ─────────────────────────────────────
const tocLinks = document.querySelectorAll('.toc__list a');
if (tocLinks.length > 0) {
  const sections = Array.from(tocLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const tocObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        tocLinks.forEach(a => a.classList.remove('toc-active'));
        const link = document.querySelector(`.toc__list a[href="#${e.target.id}"]`);
        if (link) link.classList.add('toc-active');
      }
    });
  }, { threshold: 0, rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(s => tocObserver.observe(s));
}

// ─── Active Nav Link ─────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(link => {
  const href = link.getAttribute('href').split('/').pop();
  if (href === currentPage) link.classList.add('active');
});
