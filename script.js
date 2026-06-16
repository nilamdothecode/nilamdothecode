// ===== PAGE LOADER =====
(function () {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  const start = Date.now();
  const minVisible = 2800; // satu kitaran penuh animasi = 2.5s, jadi tunggu ~2.8s supaya nampak 4 flip habis

  function hideLoader() {
    const elapsed = Date.now() - start;
    const wait = Math.max(0, minVisible - elapsed);
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, wait);
  }

  document.body.style.overflow = 'hidden'; // kunci scroll masa loading
  window.addEventListener('load', hideLoader);
  // fallback: kalau 'load' tak cetus dalam 6s, sorok juga supaya tak tersangkut
  setTimeout(hideLoader, 6000);
})();

// ===== THEME TOGGLE (light / dark) =====
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

function getSavedTheme() {
  try {
    return localStorage.getItem('theme');
  } catch (e) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    // localStorage blocked (e.g. some browsers on file://) — ignore, theme still applies for this session
  }
}

const savedTheme = getSavedTheme() || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  saveTheme(next);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) {
      current = s.id;
    }
  });

  navItems.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
});

// ===== HERO TEXT REVEAL =====
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal-text').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 200);
  });
});

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ===== PARALLAX =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroContent = document.querySelector('.hero-content');

  if (heroContent) {
    heroContent.style.transform = `translateY(${scrollY * 0.22}px)`;
  }
});

// ===== FOOTER YEAR =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();