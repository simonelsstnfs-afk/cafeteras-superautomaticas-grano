/**
 * Unified Interactive JS for CafeterasSuperautomaticasGrano.es
 * Features:
 * 1. Mobile Menu Toggle
 * 2. FAQ Accordion (WAI-ARIA compliant)
 * 3. Image Gallery Switcher
 * 4. Sticky CTA Bar on Scroll (Ficha pages)
 * 5. Cookie Banner Management
 * 6. 2-Step Decision Wizard (Asistente Rápido)
 * 7. Mobile-responsive comparison cards auto-generation & synced filtering
 * 8. Header shadow elevation on scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // 2. FAQ Accordion
  const accordionItems = document.querySelectorAll('.accordion-item, .faq-item');
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger, .faq-question');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isExpanded = item.classList.contains('active') || item.classList.contains('open');
      
      // Close others
      accordionItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active', 'open');
          const otherTrig = other.querySelector('.accordion-trigger, .faq-question');
          if (otherTrig) otherTrig.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isExpanded) {
        item.classList.remove('active', 'open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active', 'open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 3. Image Gallery Switcher
  const thumbBtns = document.querySelectorAll('.thumb-btn, .cluster-thumb');
  thumbBtns.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const targetMainId = thumb.getAttribute('data-target') || 'mainProductImg';
      const mainImg = document.getElementById(targetMainId);
      const newSrc = thumb.getAttribute('data-src') || thumb.getAttribute('src');
      
      if (mainImg && newSrc) {
        mainImg.setAttribute('src', newSrc);
      }
      
      const parent = thumb.parentElement;
      if (parent) {
        parent.querySelectorAll('.thumb-btn, .cluster-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      }
    });
  });

  // 4. Sticky CTA Bar on Scroll
  const stickyBar = document.getElementById('stickyCtaBar');
  if (stickyBar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    }, { passive: true });
  }

  // 5. Cookie Banner Management
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('acceptCookies');
  const rejectBtn = document.getElementById('rejectCookies');

  if (cookieBanner) {
    const consent = localStorage.getItem('cookie_consent_cafeteras');
    if (!consent) {
      cookieBanner.style.display = 'block';
    }
    
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent_cafeteras', 'accepted');
        cookieBanner.style.display = 'none';
      });
    }
    
    if (rejectBtn) {
      rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent_cafeteras', 'essential_only');
        cookieBanner.style.display = 'none';
      });
    }
  }

  // 6. Decision Wizard Logic (Asistente Rápido)
  const wizardData = {
    step1: 'black',
    step2: 'balanced'
  };

  const recommendations = {
    'black-balanced': {
      title: "De'Longhi Magnifica S (ECAM 22.110.B)",
      reason: "La elección maestra para espresso puro: molinillo de acero cónico con 13 pasos micrométricos y el grupo infusor más fácil de mantener del mercado.",
      price: "299,99 €",
      img: "assets/img/delonghi-magnifica-s.jpg",
      link: "https://www.amazon.es/dp/B00400OMU0?tag=cafeteras-21",
      match: "98% Coincidencia de perfil"
    },
    'black-compact': {
      title: "Cecotec Cremmaet Cube Compacta",
      reason: "La solución idónea para cocinas estrechas: 19 bares y bloque térmico Thermoblock ultra rápido en la mitad de espacio que una cafetera convencional.",
      price: "179,00 €",
      img: "assets/img/cecotec-cremmaet-cube.jpg",
      link: "https://www.amazon.es/dp/B0FP2HTVYR?tag=cafeteras-21",
      match: "95% Coincidencia de perfil"
    },
    'black-premium': {
      title: "Philips Serie 2200 (EP2220/10)",
      reason: "Muelas 100% cerámicas que no transmiten calor por fricción y panel táctil SensorTouch con vaporizador manual Panarello.",
      price: "249,00 €",
      img: "assets/img/philips-serie-2200.jpg",
      link: "https://www.amazon.es/dp/B07MMSHC4R?tag=cafeteras-21",
      match: "94% Coincidencia de perfil"
    },
    'milk-balanced': {
      title: "De'Longhi Magnifica S con Vaporizador Manual",
      reason: "Te permite emulsionar leche a mano con su lanza Panarello tradicional manteniendo la máxima durabilidad mecánica y bajo presupuesto.",
      price: "299,99 €",
      img: "assets/img/delonghi-magnifica-s.jpg",
      link: "https://www.amazon.es/dp/B00400OMU0?tag=cafeteras-21",
      match: "91% Coincidencia de perfil"
    },
    'milk-premium': {
      title: "Philips 3300 LatteGo (EP3347/90)",
      reason: "El sistema de leche más higiénico del mercado: jarra sin tubos que se enjuaga en 10 segundos, tecnología SilentBrew y 6 recetas directas.",
      price: "419,99 €",
      img: "assets/img/philips-3300-lattego.jpg",
      link: "https://www.amazon.es/dp/B0CDCFH17J?tag=cafeteras-21",
      match: "99% Coincidencia de perfil"
    },
    'milk-compact': {
      title: "Cecotec Cremmaet Cube + Espumador Externo",
      reason: "Permite tener una cafetera de grano ultra estrecha en la encimera y combinarla con un espumador de leche magnético independiente.",
      price: "179,00 €",
      img: "assets/img/cecotec-cremmaet-cube.jpg",
      link: "https://www.amazon.es/dp/B0FP2HTVYR?tag=cafeteras-21",
      match: "88% Coincidencia de perfil"
    }
  };

  const wizardOptBtns = document.querySelectorAll('.wizard-opt-btn');
  const resultTitle = document.getElementById('wizardResultTitle');
  const resultReason = document.getElementById('wizardResultReason');
  const resultPrice = document.getElementById('wizardResultPrice');
  const resultImg = document.getElementById('wizardResultImg');
  const resultLink = document.getElementById('wizardResultLink');
  const resultMatch = document.querySelector('.result-match-rate');

  function updateWizard() {
    const key = `${wizardData.step1}-${wizardData.step2}`;
    const rec = recommendations[key] || recommendations['black-balanced'];

    if (resultTitle) resultTitle.textContent = rec.title;
    if (resultReason) resultReason.textContent = rec.reason;
    if (resultPrice) resultPrice.textContent = rec.price;
    if (resultImg) {
      resultImg.src = rec.img;
      resultImg.alt = rec.title;
    }
    if (resultLink) resultLink.href = rec.link;
    if (resultMatch) resultMatch.textContent = rec.match;
  }

  wizardOptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.getAttribute('data-step');
      const val = btn.getAttribute('data-val');

      if (step === '1') wizardData.step1 = val;
      if (step === '2') wizardData.step2 = val;

      const siblingBtns = btn.parentElement.querySelectorAll('.wizard-opt-btn');
      siblingBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      updateWizard();
    });
  });

  // 7. Mobile Comparison Cards Auto-Generation & Filter Sync
  const mobileContainer = document.getElementById('mobileCardsContainer');
  const tableRows = document.querySelectorAll('#tableBody tr');

  if (mobileContainer && tableRows.length > 0) {
    tableRows.forEach(row => {
      const category = row.getAttribute('data-category');
      const name = row.querySelector('.machine-name')?.textContent || '';
      const code = row.querySelector('.machine-code')?.textContent || '';
      const tagStatus = row.querySelector('.tag-status')?.textContent || '';
      const imgSrc = row.querySelector('.machine-thumb')?.getAttribute('src') || '';
      const muelas = row.children[1]?.querySelector('.spec-main')?.textContent || '';
      const presion = row.children[2]?.querySelector('.spec-main')?.textContent || '';
      const leche = row.children[3]?.querySelector('.spec-main')?.textContent || '';
      const higiene = row.children[4]?.querySelector('.badge-pill')?.textContent || '';
      const price = row.querySelector('.table-price')?.textContent || '';
      const linkHref = row.querySelector('.col-action a')?.getAttribute('href') || '#';

      const card = document.createElement('div');
      card.className = 'mobile-compare-card';
      card.setAttribute('data-category', category);
      card.innerHTML = `
        <div class="mobile-card-top">
          <img src="${imgSrc}" alt="${name}" class="machine-thumb">
          <div>
            <span class="tag-status">${tagStatus}</span>
            <div class="machine-name">${name}</div>
            <div class="machine-code font-mono">${code}</div>
          </div>
        </div>
        <div class="mobile-card-specs font-mono">
          <div><span class="spec-k">Muelas:</span> <strong>${muelas}</strong></div>
          <div><span class="spec-k">Presión:</span> <strong>${presion}</strong></div>
          <div><span class="spec-k">Leche:</span> <strong>${leche}</strong></div>
          <div><span class="spec-k">Higiene:</span> <strong>${higiene}</strong></div>
        </div>
        <div class="mobile-card-footer">
          <div class="table-price font-mono">${price}</div>
          <a href="${linkHref}" target="_blank" rel="nofollow sponsored noopener noreferrer" class="btn btn-amazon btn-compact">
            <span>Ver en Amazon</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
        </div>
      `;
      mobileContainer.appendChild(card);
    });
  }

  // Synced Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const mobileCards = document.querySelectorAll('.mobile-compare-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterVal = btn.getAttribute('data-filter');

        tableRows.forEach(row => {
          const category = row.getAttribute('data-category');
          row.style.display = (filterVal === 'all' || category === filterVal) ? '' : 'none';
        });

        mobileCards.forEach(card => {
          const category = card.getAttribute('data-category');
          card.style.display = (filterVal === 'all' || category === filterVal) ? 'flex' : 'none';
        });
      });
    });
  }

  // 8. Header Elevation on Scroll
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 20px rgba(14, 18, 23, 0.08)';
      } else {
        header.style.boxShadow = 'var(--shadow-sm)';
      }
    }, { passive: true });
  }
});