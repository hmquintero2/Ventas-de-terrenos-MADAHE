// TierraViva Ecuador - main.js

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  // Cerrar al hacer clic en enlace
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// ---- GALERÍA DE PROYECTOS (thumbnail click) ----
const thumbs = document.querySelectorAll('.gallery-thumbs img');
const mainImg = document.querySelector('.gallery-main img');
if (thumbs.length && mainImg) {
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      mainImg.src = thumb.src.replace('w=120', 'w=800');
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
}

// ---- SCROLL REVEAL (simple) ----
const revealElements = document.querySelectorAll('.project-card, .stat-item, .team-card, .valor-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ---- ACTIVE NAV LINK ----
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ---- CONTACT FORM ----
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '¡Mensaje enviado! Te contactaremos pronto.';
    btn.style.background = '#455f4962';
    setTimeout(() => {
      btn.textContent = 'Enviar Consulta';
      btn.style.background = '';
      form.reset();
    }, 4000);
  });
}

// ---- NOTIFICACIÓN FLOTANTE (wa-notification) ----
window.addEventListener('load', function() {
  const notif = document.querySelector('.wa-notification');
  if (!notif) return;

  // ensure initial style
  notif.style.opacity = '1';
  notif.style.transition = 'opacity 0.5s ease';

  function hideNotif() {
    notif.style.opacity = '0';
  }
  function showNotif() {
    notif.style.opacity = '1';
    // retrigger animation
    notif.style.animation = 'none';
    // force reflow
    void notif.offsetWidth;
    notif.style.animation = 'notifBounce 0.6s cubic-bezier(0.34, 1, 0.64, 1)';
  }

  // Start cycle: visible 30s, hidden 40s, repeat
  function startCycle() {
    setTimeout(() => {
      hideNotif();
      setTimeout(() => {
        showNotif();
        startCycle();
      }, 40000);
    }, 30000);
  }

  // Kickoff
  showNotif();
  startCycle();
});
