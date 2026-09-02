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

  // 6. Unified Decision Assistant Logic ("Encuentra tu cafetera ideal")
  const assistantState = {
    step: 1,
    drink: 'espresso',
    cups: '3-4',
    priority: 'value',
    budget: 'any'
  };

  const CATALOG = {
    'delonghi-magnifica-s': {
      id: 'delonghi-magnifica-s',
      brand: "De'Longhi",
      title: "De'Longhi Magnifica S (ECAM 22.110.B)",
      price: "299,99 €",
      img: "assets/img/delonghi-magnifica-s.jpg",
      affiliateUrl: "https://www.amazon.es/dp/B00400OMU0?tag=cafeteras-21",
      fichaUrl: "fichas/delonghi-magnifica-s.html",
      tag: "Espresso Puro • Durabilidad Legendaria",
      strengths: [
        "Molinillo cónico de acero templado con 13 pasos micrométricos de ajuste fino.",
        "Grupo infusor extraíble lavable directamente al grifo de agua sin pastillas químicas caras.",
        "Mecánica robusta y contrastada con repuestos universales accesibles durante años."
      ],
      limitations: "La leche se emulsiona de manera manual mediante lanza de vapor Panarello tradicional; no dispone de jarra automática para servir en taza.",
      alternativeId: "philips-3300-lattego",
      alternativeText: "Si tomas capuchinos o lattes a diario y prefieres no espumar leche a mano, compara la Philips 3300 con jarra LatteGo sin tubos."
    },
    'philips-3300-lattego': {
      id: 'philips-3300-lattego',
      brand: "Philips",
      title: "Philips 3300 LatteGo (EP3347/90)",
      price: "419,99 €",
      img: "assets/img/philips-3300-lattego.jpg",
      affiliateUrl: "https://www.amazon.es/dp/B0CDCFH17J?tag=cafeteras-21",
      fichaUrl: "fichas/philips-3300-lattego.html",
      tag: "Leche Automática • Máxima Higiene",
      strengths: [
        "Sistema de leche LatteGo sin tubos ni conductos ocultos: se desmonta en 2 piezas y se enjuaga en 15 segundos.",
        "Pantalla táctil intuitiva con 6 variedades de bebidas con un solo toque y tecnología acústica SilentBrew.",
        "Muelas 100% cerámicas que evitan transferir calor por fricción durante moliendas consecutivas."
      ],
      limitations: "Inversión inicial por encima de 400 € y altura superior que requiere verificar el espacio bajo muebles de cocina altos.",
      alternativeId: "philips-serie-2200",
      alternativeText: "Si buscas molinillo cerámico pero deseas un precio más ajustado y no te importa espumar la leche a mano, revisa la Philips Serie 2200."
    },
    'philips-serie-2200': {
      id: 'philips-serie-2200',
      brand: "Philips",
      title: "Philips Serie 2200 (EP2220/10)",
      price: "249,00 €",
      img: "assets/img/philips-serie-2200.jpg",
      affiliateUrl: "https://www.amazon.es/dp/B07MMSHC4R?tag=cafeteras-21",
      fichaUrl: "fichas/philips-serie-2200.html",
      tag: "Equilibrio Cerámico • Mejor Entrada",
      strengths: [
        "Muelas 100% cerámicas de 12 niveles a un coste muy competitivo en la gama de entrada.",
        "Panel SensorTouch fácil de usar con ajuste de intensidad My Coffee Choice.",
        "Compatibilidad con cartuchos de filtro AquaClean (hasta 5.000 tazas sin necesidad de descalcificar)."
      ],
      limitations: "Vaporizador de leche manual tipo Panarello y ciclos de aclarado automáticos algo frecuentes.",
      alternativeId: "delonghi-magnifica-s",
      alternativeText: "Si priorizas muelas de acero cónico de 13 pasos y el grupo infusor más fácil de mantener, la De'Longhi Magnifica S es la alternativa natural."
    },
    'cecotec-cremmaet-cube': {
      id: 'cecotec-cremmaet-cube',
      brand: "Cecotec",
      title: "Cecotec Cremmaet Compact Cube",
      price: "179,00 €",
      img: "assets/img/cecotec-cremmaet-cube.jpg",
      affiliateUrl: "https://www.amazon.es/dp/B0FP2HTVYR?tag=cafeteras-21",
      fichaUrl: "fichas/cecotec-cremmaet-cube.html",
      tag: "Ultra Compacta • Presupuesto Mínimo",
      strengths: [
        "Dimensiones reducidas pensadas específicamente para cocinas pequeñas y encimeras con fondo ajustado.",
        "Bomba de 19 bares y bloque térmico Thermoblock de calentamiento rápido.",
        "Coste de compra inferior a 200 € que permite amortizar la inversión frente a cápsulas en muy pocos meses."
      ],
      limitations: "No incorpora varilla de vapor ni jarra de leche; depósito de agua reducido (1,1L) y 5 posiciones de molienda.",
      alternativeId: "delonghi-magnifica-s",
      alternativeText: "Si dispones de algo más de espacio y quieres preparar capuchinos manuales con depósito de 1,8L, compensa dar el salto a la De'Longhi Magnifica S."
    }
  };

  const cupsMap = {
    '1-2': { daily: 1.5, label: 'Basado en 1–2 cafés al día en tu hogar', textCups: '~550 cafés' },
    '3-4': { daily: 3.5, label: 'Basado en 3–4 cafés al día (Media habitual de hogar)', textCups: '~1.277 cafés' },
    '5-6': { daily: 5.5, label: 'Basado en 5–6 cafés al día en tu hogar', textCups: '~2.007 cafés' },
    '6+':  { daily: 7.0, label: 'Basado en más de 6 cafés al día (Uso intensivo)', textCups: '~2.555 cafés' }
  };

  function computeRecommendation(drink, cups, priority, budget) {
    const scores = {
      'delonghi-magnifica-s': 0,
      'philips-3300-lattego': 0,
      'philips-serie-2200': 0,
      'cecotec-cremmaet-cube': 0
    };

    // 1. Drink preferences
    if (drink === 'daily-milk') {
      scores['philips-3300-lattego'] += 12;
      scores['cecotec-cremmaet-cube'] -= 20; // No milk system
      scores['delonghi-magnifica-s'] += 2;
      scores['philips-serie-2200'] += 2;
    } else if (drink === 'occasional-milk') {
      scores['delonghi-magnifica-s'] += 7;
      scores['philips-serie-2200'] += 7;
      scores['philips-3300-lattego'] += 4;
      scores['cecotec-cremmaet-cube'] -= 5;
    } else if (drink === 'espresso') {
      scores['delonghi-magnifica-s'] += 8;
      scores['cecotec-cremmaet-cube'] += 6;
      scores['philips-serie-2200'] += 5;
      scores['philips-3300-lattego'] += 2;
    } else { // versatile
      scores['delonghi-magnifica-s'] += 6;
      scores['philips-serie-2200'] += 6;
      scores['philips-3300-lattego'] += 6;
    }

    // 2. Priorities
    if (priority === 'auto-milk') {
      scores['philips-3300-lattego'] += 15;
      scores['cecotec-cremmaet-cube'] -= 20;
    } else if (priority === 'compact') {
      scores['cecotec-cremmaet-cube'] += 14;
    } else if (priority === 'durability') {
      scores['delonghi-magnifica-s'] += 10;
      scores['philips-serie-2200'] += 5;
    } else if (priority === 'easy-cleaning') {
      if (drink === 'daily-milk') {
        scores['philips-3300-lattego'] += 10; // LatteGo 15s clean
      } else {
        scores['delonghi-magnifica-s'] += 8; // Washable group
        scores['philips-3300-lattego'] += 6;
      }
    } else if (priority === 'value') {
      scores['philips-serie-2200'] += 8;
      scores['delonghi-magnifica-s'] += 8;
      scores['cecotec-cremmaet-cube'] += 6;
    }

    // 3. Budget tier constraint
    if (budget === 'under-250') {
      scores['cecotec-cremmaet-cube'] += 8;
      scores['philips-serie-2200'] += 8;
      scores['delonghi-magnifica-s'] -= 4;
      scores['philips-3300-lattego'] -= 25; // Over budget
    } else if (budget === '250-400') {
      scores['delonghi-magnifica-s'] += 8;
      scores['philips-serie-2200'] += 4;
      scores['philips-3300-lattego'] -= 10;
    } else if (budget === 'over-400') {
      scores['philips-3300-lattego'] += 10;
    }

    // 4. Usage intensity
    if (cups === '6+') {
      scores['delonghi-magnifica-s'] += 4;
      scores['philips-3300-lattego'] += 4;
      scores['cecotec-cremmaet-cube'] -= 6; // small water tank
    }

    // Determine winner with deterministic tie-breaker
    const tieOrder = ['delonghi-magnifica-s', 'philips-3300-lattego', 'philips-serie-2200', 'cecotec-cremmaet-cube'];
    let bestId = 'delonghi-magnifica-s';
    let bestScore = -999;

    tieOrder.forEach(id => {
      if (scores[id] > bestScore) {
        bestScore = scores[id];
        bestId = id;
      }
    });

    return CATALOG[bestId];
  }

  function renderAssistant() {
    const { step, drink, cups, priority, budget } = assistantState;
    const step1El = document.getElementById('step1');
    const step2El = document.getElementById('step2');
    const step3El = document.getElementById('step3');
    const resultEl = document.getElementById('assistantResult');
    const progressWrap = document.getElementById('assistantProgressWrap');
    const progressBar = document.getElementById('progressBar');
    const progressStepText = document.getElementById('progressStepText');
    const progressTopicText = document.getElementById('progressTopicText');

    if (!step1El || !step2El || !step3El || !resultEl) return;

    if (step <= 3) {
      if (progressWrap) progressWrap.style.display = 'block';
      resultEl.style.display = 'none';

      step1El.style.display = step === 1 ? 'block' : 'none';
      step2El.style.display = step === 2 ? 'block' : 'none';
      step3El.style.display = step === 3 ? 'block' : 'none';

      const progressWidth = step === 1 ? '33.33%' : step === 2 ? '66.66%' : '100%';
      if (progressBar) progressBar.style.width = progressWidth;
      if (progressStepText) progressStepText.textContent = `Paso ${step} de 3`;
      if (progressTopicText) {
        progressTopicText.textContent = step === 1 ? 'Tipo de bebida' : step === 2 ? 'Consumo diario' : 'Prioridad y presupuesto';
      }
    } else {
      // Step 4: Show Result
      if (progressWrap) progressWrap.style.display = 'none';
      step1El.style.display = 'none';
      step2El.style.display = 'none';
      step3El.style.display = 'none';
      resultEl.style.display = 'block';

      const model = computeRecommendation(drink, cups, priority, budget);
      const cupsData = cupsMap[cups] || cupsMap['3-4'];
      const yearlyCups = Math.round(cupsData.daily * 365);
      const capsuleCost = Math.round(yearlyCups * 0.42);
      const beanCost = Math.round(yearlyCups * 0.13);
      const netSavings = capsuleCost - beanCost;

      // Populate left pane (Product info)
      const resImg = document.getElementById('resImg');
      const resBrand = document.getElementById('resBrand');
      const resTitle = document.getElementById('resTitle');
      const resPrice = document.getElementById('resPrice');
      const resProfileTag = document.getElementById('resProfileTag');
      const resReasonsList = document.getElementById('resReasonsList');
      const resLimitText = document.getElementById('resLimitText');
      const resAltText = document.getElementById('resAltText');
      const resAltLink = document.getElementById('resAltLink');
      const resAmazonBtn = document.getElementById('resAmazonBtn');
      const resFichaBtn = document.getElementById('resFichaBtn');

      if (resImg) { resImg.src = model.img; resImg.alt = model.title; }
      if (resBrand) resBrand.textContent = model.brand;
      if (resTitle) resTitle.textContent = model.title;
      if (resPrice) resPrice.textContent = model.price;
      if (resProfileTag) resProfileTag.textContent = model.tag;

      if (resReasonsList) {
        resReasonsList.innerHTML = model.strengths.map(s => `<li>${s}</li>`).join('');
      }

      if (resLimitText) resLimitText.textContent = model.limitations;

      const altModel = CATALOG[model.alternativeId] || CATALOG['delonghi-magnifica-s'];
      if (resAltText) resAltText.textContent = model.alternativeText;
      if (resAltLink) {
        resAltLink.textContent = `Comparar con ${altModel.brand} en la matriz técnica →`;
        resAltLink.href = 'comparador.html';
      }

      if (resAmazonBtn) resAmazonBtn.href = model.affiliateUrl;
      if (resFichaBtn) resFichaBtn.href = model.fichaUrl;

      // Populate right pane (Savings breakdown)
      const savingsCupsBadge = document.getElementById('savingsCupsBadge');
      const savingsAnnualNet = document.getElementById('savingsAnnualNet');
      const sbYearlyCups = document.getElementById('sbYearlyCups');
      const sbCapsuleCost = document.getElementById('sbCapsuleCost');
      const sbBeanCost = document.getElementById('sbBeanCost');

      if (savingsCupsBadge) savingsCupsBadge.textContent = cupsData.label;
      if (savingsAnnualNet) savingsAnnualNet.textContent = `~${netSavings} €`;
      if (sbYearlyCups) sbYearlyCups.textContent = `${yearlyCups} tazas/año`;
      if (sbCapsuleCost) sbCapsuleCost.textContent = `~${capsuleCost} €/año`;
      if (sbBeanCost) sbBeanCost.textContent = `~${beanCost} €/año`;
    }
  }

  // Bind assistant events
  // Step 1 Options
  const step1Opts = document.querySelectorAll('#step1 .opt-card');
  step1Opts.forEach(btn => {
    btn.addEventListener('click', () => {
      step1Opts.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      assistantState.drink = btn.getAttribute('data-val');
      setTimeout(() => {
        assistantState.step = 2;
        renderAssistant();
      }, 120);
    });
  });

  // Step 2 Options
  const step2Opts = document.querySelectorAll('#step2 .opt-card');
  step2Opts.forEach(btn => {
    btn.addEventListener('click', () => {
      step2Opts.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      assistantState.cups = btn.getAttribute('data-val');
      setTimeout(() => {
        assistantState.step = 3;
        renderAssistant();
      }, 120);
    });
  });

  // Step 3 Priority Options
  const step3PriorityOpts = document.querySelectorAll('#step3 .grid-priority .opt-card');
  step3PriorityOpts.forEach(btn => {
    btn.addEventListener('click', () => {
      step3PriorityOpts.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      assistantState.priority = btn.getAttribute('data-val');
      setTimeout(() => {
        assistantState.step = 4;
        renderAssistant();
      }, 120);
    });
  });

  // Step 3 Budget Filter Pills
  const budgetPills = document.querySelectorAll('.budget-pill');
  budgetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      budgetPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      assistantState.budget = pill.getAttribute('data-budget');
    });
  });

  // Step Back Buttons
  const btnBackTo1 = document.getElementById('btnBackTo1');
  if (btnBackTo1) {
    btnBackTo1.addEventListener('click', () => {
      assistantState.step = 1;
      renderAssistant();
    });
  }

  const btnBackTo2 = document.getElementById('btnBackTo2');
  if (btnBackTo2) {
    btnBackTo2.addEventListener('click', () => {
      assistantState.step = 2;
      renderAssistant();
    });
  }

  // Restart Button
  const btnRestartAssistant = document.getElementById('btnRestartAssistant');
  if (btnRestartAssistant) {
    btnRestartAssistant.addEventListener('click', () => {
      assistantState.step = 1;
      renderAssistant();
    });
  }

  // Initialize assistant
  renderAssistant();

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

  // 9. Side-by-Side Interactive Comparator
  const sbsData = {
    'delonghi': {
      name: "De'Longhi Magnifica S",
      code: "ECAM 22.110.B",
      price: "299,99 €",
      img: "assets/img/delonghi-magnifica-s.jpg",
      muelas: "Acero Cónico (13 pasos)",
      presion: "15 Bares",
      leche: "Manual (Vaporizador Panarello)",
      higiene: "Infusor extraíble frontal",
      deposito: "1.8 Litros",
      score: "9.2 / 10 Global",
      link: "https://www.amazon.es/dp/B00400OMU0?tag=cafeteras-21",
      ficha: "fichas/delonghi-magnifica-s.html"
    },
    'philips3300': {
      name: "Philips 3300 LatteGo",
      code: "EP3347/90",
      price: "419,99 €",
      img: "assets/img/philips-3300-lattego.jpg",
      muelas: "100% Cerámico (12 pasos)",
      presion: "15 Bares (SilentBrew)",
      leche: "Automático (LatteGo sin tubos)",
      higiene: "Jarra 2 piezas apta lavavajillas",
      deposito: "1.8 Litros (AquaClean)",
      score: "9.0 / 10 Global",
      link: "https://www.amazon.es/dp/B0CDCFH17J?tag=cafeteras-21",
      ficha: "fichas/philips-3300-lattego.html"
    },
    'philips2200': {
      name: "Philips Serie 2200",
      code: "EP2220/10",
      price: "249,00 €",
      img: "assets/img/philips-serie-2200.jpg",
      muelas: "100% Cerámico (12 pasos)",
      presion: "15 Bares",
      leche: "Manual (Panarello clásico)",
      higiene: "Infusor extraíble lateral",
      deposito: "1.8 Litros (AquaClean)",
      score: "8.3 / 10 Global",
      link: "https://www.amazon.es/dp/B07MMSHC4R?tag=cafeteras-21",
      ficha: "fichas/philips-serie-2200.html"
    },
    'cecotec': {
      name: "Cecotec Cremmaet Cube",
      code: "Compact 1350W",
      price: "179,00 €",
      img: "assets/img/cecotec-cremmaet-cube.jpg",
      muelas: "Acero Cónico (5 pasos)",
      presion: "19 Bares (Thermoblock)",
      leche: "Sin leche (Espresso puro)",
      higiene: "Cajón compacto frontal",
      deposito: "1.2 Litros",
      score: "8.0 / 10 Global",
      link: "https://www.amazon.es/dp/B0FP2HTVYR?tag=cafeteras-21",
      ficha: "fichas/cecotec-cremmaet-cube.html"
    }
  };

  const sbsSelectA = document.getElementById('sbsSelectA');
  const sbsSelectB = document.getElementById('sbsSelectB');
  const sbsColA = document.getElementById('sbsColA');
  const sbsColB = document.getElementById('sbsColB');

  function renderSbsColumn(colEl, machineKey) {
    if (!colEl) return;
    const m = sbsData[machineKey] || sbsData['delonghi'];
    colEl.innerHTML = `
      <div class="sbs-card-top">
        <img src="${m.img}" alt="${m.name}" class="sbs-thumb">
        <div>
          <div class="sbs-name">${m.name}</div>
          <div class="sbs-code">${m.code}</div>
          <div class="sbs-price">${m.price}</div>
        </div>
      </div>
      <table class="sbs-specs-table">
        <tbody>
          <tr><td class="k">Molinillo:</td><td class="v">${m.muelas}</td></tr>
          <tr><td class="k">Presión:</td><td class="v font-mono">${m.presion}</td></tr>
          <tr><td class="k">Sistema de Leche:</td><td class="v">${m.leche}</td></tr>
          <tr><td class="k">Limpieza:</td><td class="v">${m.higiene}</td></tr>
          <tr><td class="k">Depósito Agua:</td><td class="v">${m.deposito}</td></tr>
          <tr><td class="k">Nota Técnica:</td><td class="v font-mono" style="color: var(--accent); font-weight:700;">${m.score}</td></tr>
        </tbody>
      </table>
      <div class="sbs-actions">
        <a href="${m.ficha}" class="btn btn-secondary btn-sm">Ver Ficha y Radar</a>
        <a href="${m.link}" target="_blank" rel="nofollow sponsored noopener noreferrer" class="btn btn-amazon btn-sm">
          <span>Ver Oferta en Amazon</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </a>
      </div>
    `;
  }

  if (sbsSelectA && sbsSelectB) {
    sbsSelectA.addEventListener('change', (e) => renderSbsColumn(sbsColA, e.target.value));
    sbsSelectB.addEventListener('change', (e) => renderSbsColumn(sbsColB, e.target.value));
    renderSbsColumn(sbsColA, sbsSelectA.value);
    renderSbsColumn(sbsColB, sbsSelectB.value);
  }

});