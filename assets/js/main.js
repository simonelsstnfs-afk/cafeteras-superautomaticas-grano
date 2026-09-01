/**
 * L'ATELIER DEL CAFFÈ — UI/UX PRO MAX INTERACTIVE SUITE
 * Dynamic Features:
 * 1. Calculadora Interactiva de Ahorro (Grano vs Cápsulas)
 * 2. Selector Barista Express (1-Click Matchmaker)
 * 3. Galería Interactiva de Fotografía de Producto
 * 4. FAQ Accordion accesible
 * 5. Sticky Floating Barista CTA
 */

document.addEventListener('DOMContentLoaded', () => {
  initSavingsCalculator();
  initBaristaSelector();
  initInteractiveGallery();
  initFaqAccordion();
  initStickyBaristaCta();
});

/* ==========================================================================
   1. CALCULADORA INTERACTIVA DE AHORRO (GRANO VS CÁPSULAS)
   ========================================================================== */
function initSavingsCalculator() {
  const slider = document.getElementById('coffee-slider');
  const countBadge = document.getElementById('coffee-count-val');
  const capsulesCostEl = document.getElementById('calc-capsules-cost');
  const beansCostEl = document.getElementById('calc-beans-cost');
  const netSavingsEl = document.getElementById('calc-net-savings');
  const amortizeBadge = document.getElementById('calc-amortize-months');

  if (!slider || !countBadge || !netSavingsEl) return;

  const COST_CAPSULE = 0.42; // € medio cápsula original Nespresso/Dolce Gusto
  const COST_BEAN = 0.11;    // € medio taza con café de especialidad 1kg

  function updateSavings() {
    const cupsPerDay = parseInt(slider.value, 10) || 3;
    countBadge.textContent = cupsPerDay + (cupsPerDay === 1 ? ' café / día' : ' cafés / día');

    const yearlyCapsules = Math.round(cupsPerDay * COST_CAPSULE * 365);
    const yearlyBeans = Math.round(cupsPerDay * COST_BEAN * 365);
    const yearlySavings = yearlyCapsules - yearlyBeans;

    if (capsulesCostEl) capsulesCostEl.textContent = yearlyCapsules + ' € / año';
    if (beansCostEl) beansCostEl.textContent = yearlyBeans + ' € / año';
    netSavingsEl.textContent = '+' + yearlySavings + ' €';

    if (amortizeBadge) {
      // Amortización calculada sobre la cafetera insignia (299€ De'Longhi Magnifica S)
      const months = Math.max(2, Math.ceil((299 / yearlySavings) * 12));
      amortizeBadge.innerHTML = `⏱️ Amortizas tu cafetera de grano en <strong>solo ${months} meses</strong> con tu consumo habitual`;
    }
  }

  slider.addEventListener('input', updateSavings);
  updateSavings();
}

/* ==========================================================================
   2. SELECTOR BARISTA EXPRESS (1-CLICK MATCHMAKER)
   ========================================================================== */
function initBaristaSelector() {
  const filterButtons = document.querySelectorAll('.barista-pill-btn');
  const cards = document.querySelectorAll('.catalog-card-item');

  if (!filterButtons.length || !cards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetFilter = btn.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const features = card.getAttribute('data-features') || '';

        let show = false;
        if (targetFilter === 'all') {
          show = true;
        } else if (targetFilter === 'espresso' && (category === 'INSIGNIA' || features.includes('espresso'))) {
          show = true;
        } else if (targetFilter === 'latte' && (category === 'PREMIUM' || features.includes('latte') || features.includes('leche'))) {
          show = true;
        } else if (targetFilter === 'compact' && (category === 'CALIDAD_PRECIO' || features.includes('compact'))) {
          show = true;
        } else if (targetFilter === 'cross' && category === 'CROSS_SELLING') {
          show = true;
        }

        if (show) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   3. GALERÍA INTERACTIVA DE FOTOGRAFÍA DE PRODUCTO
   ========================================================================== */
function initInteractiveGallery() {
  const thumbWrappers = document.querySelectorAll('.interactive-gallery-container');
  thumbWrappers.forEach(container => {
    const mainImg = container.querySelector('.gallery-main-img');
    const thumbs = container.querySelectorAll('.gallery-thumb-item');

    if (!mainImg || !thumbs.length) return;

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const newSrc = thumb.getAttribute('data-img-src') || thumb.getAttribute('src');
        if (newSrc && mainImg.src !== newSrc) {
          mainImg.style.opacity = '0.4';
          setTimeout(() => {
            mainImg.src = newSrc;
            mainImg.style.opacity = '1';
          }, 150);
          thumbs.forEach(t => t.classList.remove('active-thumb'));
          thumb.classList.add('active-thumb');
        }
      });
    });
  });
}

/* ==========================================================================
   4. FAQ ACCORDION ACCESIBLE
   ========================================================================== */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Cerrar otros
      faqButtons.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherBtn.nextElementSibling) otherBtn.nextElementSibling.style.display = 'none';
        }
      });

      if (isOpen) {
        btn.setAttribute('aria-expanded', 'false');
        if (answer) answer.style.display = 'none';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.style.display = 'block';
      }
    });
  });
}

/* ==========================================================================
   5. STICKY FLOATING BARISTA CTA
   ========================================================================== */
function initStickyBaristaCta() {
  const hero = document.querySelector('.hero-atelier');
  const stickyBar = document.getElementById('sticky-barista-bar');

  if (!hero || !stickyBar) return;

  window.addEventListener('scroll', () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      stickyBar.style.transform = 'translateY(0)';
      stickyBar.style.opacity = '1';
    } else {
      stickyBar.style.transform = 'translateY(120%)';
      stickyBar.style.opacity = '0';
    }
  }, { passive: true });
}
