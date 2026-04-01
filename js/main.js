// ─── Mobile Nav Toggle ───────────────────────────────────────
const toggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
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

// ─── Scroll Reveal ───────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));


// ─── Active Nav Link ─────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});