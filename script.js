// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateFollower() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top  = fy + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    follower.style.width  = '56px';
    follower.style.height = '56px';
    follower.style.opacity = '0.4';
    cursor.style.opacity = '0';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.width  = '36px';
    follower.style.height = '36px';
    follower.style.opacity = '0.6';
    cursor.style.opacity = '1';
  });
});

// ── STICKY NAV ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '1';
    spans[2].style.transform = '';
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '1';
    spans[2].style.transform = '';
  });
});

// ── INTRO ANIMATIONS (on load) ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('eyebrow').classList.add('visible');
    document.getElementById('line1').classList.add('visible');
    document.getElementById('line2').classList.add('visible');
    document.getElementById('line3').classList.add('visible');
    document.getElementById('introSub').classList.add('visible');
    document.getElementById('introCta').classList.add('visible');
    document.getElementById('introRight').classList.add('visible');
  }, 100);
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// Apply reveal to sections lazily
document.querySelectorAll('.projects__header, .tile, .contact__left, .contact__right, .cv__inner').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = (i * 0.07) + 's';
  observer.observe(el);
});

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'Sending…';

  setTimeout(() => {
    form.reset();
    successMsg.classList.add('show');
    btn.disabled = false;
    btn.querySelector('.btn-text').textContent = 'Send Message';
    setTimeout(() => successMsg.classList.remove('show'), 4000);
  }, 1200);
});

// ── CV BADGE pulse on scroll into view ──
const cvBadge = document.getElementById('cvBadge');
const badgeObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    cvBadge.style.animation = 'none';
    void cvBadge.offsetWidth;
    cvBadge.style.animation = '';
  }
}, { threshold: 0.5 });
if (cvBadge) badgeObserver.observe(cvBadge);

// ── SMOOTH ANCHOR SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
