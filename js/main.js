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

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 2. Budget Simulator / Calculator Logic
  const typeOptions = document.querySelectorAll('.type-option');
  const extraCheckboxes = document.querySelectorAll('.calc-extras-list input[type="checkbox"]');
  const priceDisplay = document.getElementById('calc-total-price');
  const calcSummaryItems = document.getElementById('calc-summary-list');
  const calcWhatsappBtn = document.getElementById('calc-whatsapp-btn');

  let basePrices = {
    'landing-page': { name: 'Landing Page de Alta Conversão', price: 990 },
    'institucional': { name: 'Site Institucional Completo', price: 1790 },
    'ecommerce': { name: 'Loja Virtual / E-commerce', price: 2890 }
  };

  let selectedType = 'landing-page';

  function updateCalculator() {
    let currentBase = basePrices[selectedType];
    let total = currentBase.price;
    let selectedExtras = [];

    // Clear list
    calcSummaryItems.innerHTML = '';

    // Add base item to list
    const baseLi = document.createElement('li');
    baseLi.innerHTML = `<span>${currentBase.name}</span><strong>R$ ${currentBase.price.toLocaleString('pt-BR')}</strong>`;
    calcSummaryItems.appendChild(baseLi);

    // Add selected extras
    extraCheckboxes.forEach(cb => {
      if (cb.checked) {
        let price = parseInt(cb.dataset.price, 10);
        let name = cb.dataset.name;
        total += price;
        selectedExtras.push(name);

        const extraLi = document.createElement('li');
        extraLi.innerHTML = `<span>+ ${name}</span><strong>R$ ${price.toLocaleString('pt-BR')}</strong>`;
        calcSummaryItems.appendChild(extraLi);
      }
    });

    // Animate Price Number Change
    priceDisplay.textContent = `R$ ${total.toLocaleString('pt-BR')}`;

    // Generate WhatsApp Link with pre-filled message
    let whatsappPhone = '5511999999999'; // Default contact number placeholder
    let messageText = `Olá Real Premise! Montei uma simulação de site no seu simulador:\n\n`;
    messageText += `📌 *Tipo de Projeto:* ${currentBase.name}\n`;
    if (selectedExtras.length > 0) {
      messageText += `✨ *Recursos Extras:* ${selectedExtras.join(', ')}\n`;
    }
    messageText += `💰 *Estimativa Total:* R$ ${total.toLocaleString('pt-BR')}\n\nGostaria de agendar o projeto e alinhar os detalhes!`;

    let encodedMsg = encodeURIComponent(messageText);
    calcWhatsappBtn.href = `https://wa.me/${whatsappPhone}?text=${encodedMsg}`;
  }

  typeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      typeOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      selectedType = opt.dataset.type;
      updateCalculator();
    });
  });

  extraCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateCalculator);
  });

  // Initialize calculator
  if (priceDisplay) {
    updateCalculator();
  }

  // 3. Portfolio Filters
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

  // 4. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(i => i.classList.remove('active'));

      // If clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});
