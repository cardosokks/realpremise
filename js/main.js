/* ==========================================================================
   REAL PREMISE - INTERACTIVE JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar & Mobile Drawer
  const navbar = document.querySelector('.navbar');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Portfolio Filters
  const tabBtns = document.querySelectorAll('.portfolio-tabs .tab-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 3. Scroll Reveal Animation Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Animate once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older devices
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // 4. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));

        // If clicked item wasn't active, open it
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 5. High-Precision 3D Physics Tilt & Specular Glare Tracking
  const card3d = document.querySelector('.hub-3d-platform');
  const specularGlare = document.getElementById('specularGlare');
  const heroVisualContainer = document.querySelector('.hero-visual');
  const n8nCounter = document.getElementById('n8nCounter');

  if (card3d && heroVisualContainer) {
    let targetX = 6;
    let targetY = -8;
    let currentX = 6;
    let currentY = -8;
    let isHovered = false;

    // Physics Lerp Loop
    function animate3dTilt() {
      // Smooth interpolation (linear interpolation / lerp dampening)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      let scale = isHovered ? 1.03 : 1;
      card3d.style.transform = `rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg) scale(${scale})`;

      requestAnimationFrame(animate3dTilt);
    }
    animate3dTilt();

    // Mouse Tracking
    heroVisualContainer.addEventListener('mousemove', (e) => {
      isHovered = true;
      const rect = heroVisualContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      targetX = -(y / (rect.height / 2)) * 14;
      targetY = (x / (rect.width / 2)) * 16;

      if (specularGlare) {
        let glareX = (x / rect.width) * 100 + 50;
        let glareY = (y / rect.height) * 100 + 50;
        specularGlare.style.transform = `translate(${glareX}px, ${glareY}px)`;
        specularGlare.style.opacity = '0.85';
      }
    });

    heroVisualContainer.addEventListener('mouseleave', () => {
      isHovered = false;
      targetX = 6;
      targetY = -8;
      if (specularGlare) {
        specularGlare.style.opacity = '0.4';
      }
    });

    // Android Touch Support with Lerp
    heroVisualContainer.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        isHovered = true;
        const touch = e.touches[0];
        const rect = heroVisualContainer.getBoundingClientRect();
        const x = touch.clientX - rect.left - rect.width / 2;
        const y = touch.clientY - rect.top - rect.height / 2;

        targetX = -(y / (rect.height / 2)) * 12;
        targetY = (x / (rect.width / 2)) * 14;
      }
    }, { passive: true });

    heroVisualContainer.addEventListener('touchend', () => {
      isHovered = false;
      targetX = 6;
      targetY = -8;
    });
  }

  // 6. Real-time Simulated Live Lead Counter
  if (n8nCounter) {
    let leadCount = 1482;
    setInterval(() => {
      leadCount += 1;
      n8nCounter.textContent = `+${leadCount.toLocaleString('pt-BR')} Leads`;
      n8nCounter.style.transform = 'scale(1.18)';
      n8nCounter.style.transition = 'transform 0.2s ease';
      setTimeout(() => {
        n8nCounter.style.transform = 'scale(1)';
      }, 200);
    }, 4500);
  }
});
