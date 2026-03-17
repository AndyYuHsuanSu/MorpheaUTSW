// ─── Mobile Nav Toggle ───────────────────────────────────────
const toggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ─── Scroll Reveal ───────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ─── Active Nav Link ─────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});