// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      setTimeout(() => mobileMenu.classList.add('hidden'), 300);
    } else {
      mobileMenu.classList.remove('hidden');
      void mobileMenu.offsetWidth;
      mobileMenu.classList.add('active');
    }
  });
}

// Contact form submission
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    formMessage.classList.remove('hidden');
    formMessage.classList.add('text-green-600', 'py-2', 'px-4', 'bg-green-50', 'rounded-lg');

    const currentLang = document.documentElement.getAttribute('lang') || 'en';
    formMessage.textContent =
      currentLang === 'fr'
        ? "Merci ! Votre message a été envoyé avec succès."
        : "Thank you! Your message has been sent successfully.";

    contactForm.reset();

    setTimeout(() => formMessage.classList.add('hidden'), 5000);
    document.activeElement.blur();
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offset = window.innerWidth < 768 ? 60 : 80;
      window.scrollTo({ top: targetElement.offsetTop - offset, behavior: 'smooth' });

      if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        setTimeout(() => mobileMenu.classList.add('hidden'), 300);
      }
    }
  });
});

// Language Switcher
const langToggle = document.getElementById('lang-toggle');
const langDropdown = document.getElementById('lang-dropdown');
const langButtons = document.querySelectorAll('#lang-dropdown button');
const currentLangSpan = document.getElementById('current-lang');

if (langToggle) {
  langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
      langDropdown.classList.add('hidden');
    }
  });

  langButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const lang = button.getAttribute('data-lang');
      switchLanguage(lang);
      langDropdown.classList.add('hidden');
      button.classList.add('bg-blue-50');
      setTimeout(() => button.classList.remove('bg-blue-50'), 300);
    });
  });
}

function switchLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  currentLangSpan.textContent = lang === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN';

  document.querySelectorAll('[data-en][data-fr]').forEach((el) => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  if (lang === 'fr') {
    document.getElementById('name').placeholder = 'Votre nom';
    document.getElementById('email').placeholder = 'votre@email.com';
    document.getElementById('message').placeholder = 'Votre message...';
  } else {
    document.getElementById('name').placeholder = 'Your name';
    document.getElementById('email').placeholder = 'your@email.com';
    document.getElementById('message').placeholder = 'Your message...';
  }
}

// Fix for 100vh bug on mobile
function setViewportHeight() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);

// Prevent double-tap zoom on iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) e.preventDefault();
  lastTouchEnd = now;
}, false);
