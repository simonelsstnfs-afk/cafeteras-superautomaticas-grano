/**
 * Comparison Engine for CafeterasSuperautomaticasGrano.es
 * Side-by-Side Matrix, Spec Filters, Diff Highlighter & Dual Radar Chart
 * Cache-buster: 20260901
 */

const PRODUCTS_DATA = [
  {
    asin: 'B00400OMU0',
    slug: 'delonghi-magnifica-s',
    name: "De'Longhi Magnifica S [ECAM 22.110.B]",
    brand: "De'Longhi",
    price: '299,99 €',
    price_num: 299.99,
    rating: 4.2,
    reviews: 49703,
    bares: '15 Bares',
    bares_num: 15,
    molinillo: 'Acero inoxidable cónico (13 niveles)',
    molinillo_tipo: 'acero',
    leche: 'Espumador manual tradicional Panarello de acero',
    leche_tipo: 'manual',
    variedades: 'Espresso corto, Espresso lungo, Café regular, Vapor / Agua',
    deposito_agua: '1.8 Litros (frontal extraíble)',
    deposito_grano: '250 gramos con tapa protectora aroma',
    grupo_infusor: 'Completamente extraíble y lavable bajo el grifo',
    potencia: '1450 W (Thermoblock rápido)',
    dimensiones: '23.8 x 43.0 x 35.1 cm',
    peso: '9.0 kg',
    limpieza: 'Enjuague automático al encendido/apagado + infusor lavable',
    special: 'Referencia histórica en durabilidad con 13 ajustes de molienda calibrados',
    img: 'assets/img/delonghi-magnifica-s.jpg',
    affiliate_url: 'https://www.amazon.es/dp/B00400OMU0?tag=cafeteras-21',
    radar: {
      calidad_espresso: 9.5,
      molienda_ajuste: 9.6,
      facilidad_limpieza: 9.1,
      rapidez_ruido: 8.7,
      calidad_precio: 9.8
    }
  },
  {
    asin: 'B0CDCFH17J',
    slug: 'philips-3300-lattego',
    name: 'PHILIPS 3300 LatteGo [EP3347/90]',
    brand: 'Philips',
    price: '419,99 €',
    price_num: 419.99,
    rating: 4.2,
    reviews: 2128,
    bares: '15 Bares',
    bares_num: 15,
    molinillo: '100% Cerámico de precisión (12 niveles)',
    molinillo_tipo: 'ceramico',
    leche: 'Sistema LatteGo automático sin tubos (limpieza 10s)',
    leche_tipo: 'automatico',
    variedades: '6 bebidas a 1 toque (Espresso, Café, Cappuccino, Latte Macchiato, Café Helado, Agua caliente)',
    deposito_agua: '1.8 Litros (compatible filtro AquaClean)',
    deposito_grano: '275 gramos con Aroma Seal hermético',
    grupo_infusor: 'Extraíble lateral lavable',
    potencia: '1500 W',
    dimensiones: '24.6 x 37.1 x 43.3 cm',
    peso: '8.0 kg',
    limpieza: 'Depósito de leche sin recovecos ni tubos apto lavavajillas',
    special: 'Tecnología acústica SilentBrew (-40% ruido) y jarra de leche más fácil de limpiar del mercado',
    img: 'assets/img/philips-3300-lattego.jpg',
    affiliate_url: 'https://www.amazon.es/dp/B0CDCFH17J?tag=cafeteras-21',
    radar: {
      calidad_espresso: 9.4,
      molienda_ajuste: 9.3,
      facilidad_limpieza: 9.8,
      rapidez_ruido: 9.5,
      calidad_precio: 9.0
    }
  },
  {
    asin: 'B07MMSHC4R',
    slug: 'philips-serie-2200',
    name: 'PHILIPS Serie 2200 SensorTouch [EP2220/10]',
    brand: 'Philips',
    price: '249,00 €',
    price_num: 249.00,
    rating: 4.4,
    reviews: 14850,
    bares: '15 Bares',
    bares_num: 15,
    molinillo: '100% Cerámico para 20.000 tazas (12 niveles)',
    molinillo_tipo: 'ceramico',
    leche: 'Espumador de leche clásico Panarello (2 piezas)',
    leche_tipo: 'manual',
    variedades: 'Espresso clásico, Café largo, Agua caliente',
    deposito_agua: '1.8 Litros (con filtro AquaClean)',
    deposito_grano: '275 gramos con Aroma Seal',
    grupo_infusor: 'Totalmente extraíble',
    potencia: '1500 W',
    dimensiones: '24.6 x 37.1 x 43.3 cm',
    peso: '7.5 kg',
    limpieza: 'Filtro AquaClean hasta 5.000 tazas sin descalcificar',
    special: 'Panel táctil intuitivo SensorTouch y muelas cerámicas por menos de 250€',
    img: 'assets/img/philips-serie-2200.jpg',
    affiliate_url: 'https://www.amazon.es/dp/B07MMSHC4R?tag=cafeteras-21',
    radar: {
      calidad_espresso: 9.2,
      molienda_ajuste: 9.4,
      facilidad_limpieza: 9.0,
      rapidez_ruido: 8.9,
      calidad_precio: 9.4
    }
  },
  {
    asin: 'B0FP2HTVYR',
    slug: 'cecotec-cremmaet-cube',
    name: 'Cecotec Cremmaet Cube Compacta [1350 W]',
    brand: 'Cecotec',
    price: '179,00 €',
    price_num: 179.00,
    rating: 4.1,
    reviews: 613,
    bares: '19 Bares',
    bares_num: 19,
    molinillo: 'Acero inoxidable cónico integrado (5 niveles)',
    molinillo_tipo: 'acero',
    leche: 'Sin espumador de leche (enfocada a espresso puro)',
    leche_tipo: 'manual',
    variedades: 'Espresso, Americano, Agua Caliente',
    deposito_agua: '1.2 Litros',
    deposito_grano: '150 gramos',
    grupo_infusor: 'Extraíble para limpieza',
    potencia: '1350 W (Thermoblock ultrarrápido <30s)',
    dimensiones: '18.5 x 39.5 x 31.5 cm (Ultra estrecha)',
    peso: '6.8 kg',
    limpieza: 'Auto-limpieza y enjuague rápido',
    special: 'Bomba italiana de 19 bares con pre-infusión en formato ultra compacto por menos de 180€',
    img: 'assets/img/cecotec-cremmaet-cube.jpg',
    affiliate_url: 'https://www.amazon.es/dp/B0FP2HTVYR?tag=cafeteras-21',
    radar: {
      calidad_espresso: 8.9,
      molienda_ajuste: 8.5,
      facilidad_limpieza: 8.8,
      rapidez_ruido: 9.2,
      calidad_precio: 9.7
    }
  }
];

let selectedAsins = ['B00400OMU0', 'B0CDCFH17J', 'B07MMSHC4R'];
let showOnlyDiffs = false;

document.addEventListener('DOMContentLoaded', () => {
  initComparator();
});

function initComparator() {
  renderPickerChips();
  renderComparisonTable();
  drawDualRadar();

  const diffCheckbox = document.getElementById('diffToggle');
  if (diffCheckbox) {
    diffCheckbox.addEventListener('change', (e) => {
      showOnlyDiffs = e.target.checked;
      renderComparisonTable();
    });
  }

  setupFilter('filterBares', (val, p) => val === 'all' || (val === '15' && p.bares_num === 15) || (val === '19' && p.bares_num === 19));
  setupFilter('filterMolinillo', (val, p) => val === 'all' || p.molinillo_tipo === val);
  setupFilter('filterLeche', (val, p) => val === 'all' || p.leche_tipo === val);
  setupFilter('filterPrecio', (val, p) => {
    if (val === 'all') return true;
    if (val === 'sub200') return p.price_num < 200;
    if (val === '200-300') return p.price_num >= 200 && p.price_num <= 300;
    if (val === 'over300') return p.price_num > 300;
    return true;
  });
}

function setupFilter(containerId, predicate) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      container.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const val = pill.getAttribute('data-val');
      const filtered = PRODUCTS_DATA.filter(prod => predicate(val, prod)).map(prod => prod.asin);

      if (filtered.length > 0) {
        selectedAsins = filtered.slice(0, 3);
        renderPickerChips();
        renderComparisonTable();
        drawDualRadar();
      } else {
        alert('No hay modelos que coincidan con este criterio específico.');
      }
    });
  });
}

function renderPickerChips() {
  const container = document.getElementById('productChips');
  if (!container) return;

  container.innerHTML = PRODUCTS_DATA.map(p => {
    const isSelected = selectedAsins.includes(p.asin);
    return '<div class="picker-chip ' + (isSelected ? 'selected' : '') + '" data-asin="' + p.asin + '">' +
           '<span>' + (isSelected ? '✓ ' : '+ ') + p.name + '</span>' +
           '</div>';
  }).join('');

  container.querySelectorAll('.picker-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const asin = chip.getAttribute('data-asin');
      if (selectedAsins.includes(asin)) {
        if (selectedAsins.length > 1) {
          selectedAsins = selectedAsins.filter(a => a !== asin);
        } else {
          alert('Debes mantener al menos 1 modelo seleccionado para comparar.');
          return;
        }
      } else {
        if (selectedAsins.length >= 4) {
          alert('Puedes comparar hasta un máximo de 4 modelos simultáneamente.');
          return;
        }
        selectedAsins.push(asin);
      }
      renderPickerChips();
      renderComparisonTable();
      drawDualRadar();
    });
  });
}

function renderComparisonTable() {
  const container = document.getElementById('comparisonMatrix');
  if (!container) return;

  const currentProducts = PRODUCTS_DATA.filter(p => selectedAsins.includes(p.asin));
  if (currentProducts.length === 0) return;

  const rows = [
    { key: 'price', label: 'Precio de Referencia' },
    { key: 'bares', label: 'Presión Bomba de Agua' },
    { key: 'molinillo', label: 'Tipo y Ajustes de Molinillo' },
    { key: 'leche', label: 'Sistema de Espumado de Leche' },
    { key: 'variedades', label: 'Variedades de Café' },
    { key: 'deposito_agua', label: 'Capacidad Depósito Agua' },
    { key: 'deposito_grano', label: 'Capacidad Tolva de Grano' },
    { key: 'grupo_infusor', label: 'Grupo Infusor Extraíble' },
    { key: 'potencia', label: 'Potencia y Calentamiento' },
    { key: 'dimensiones', label: 'Dimensiones (Ancho x Fondo x Alto)' },
    { key: 'limpieza', label: 'Mantenimiento y Filtro' },
    { key: 'special', label: 'Ventaja Diferencial Clave' }
  ];

  let html = '<table class="comp-table">' +
             '<thead>' +
             '<tr>' +
             '<th class="th-spec">Especificación Técnica</th>';

  currentProducts.forEach(p => {
    html += '<th style="min-width: 240px;">' +
            '<div class="comp-prod-header">' +
            '<img src="' + p.img + '" alt="' + p.name + '" class="comp-prod-img">' +
            '<div class="comp-prod-name">' + p.name + '</div>' +
            '<div class="comp-prod-price font-mono">' + p.price + '</div>' +
            '<a href="' + p.affiliate_url + '" target="_blank" rel="nofollow sponsored noopener noreferrer" class="btn btn-amazon btn-sm" style="width: 100%; margin-bottom: 8px;">' +
            '<span>Ver en Amazon</span>' +
            '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>' +
            '</a>' +
            '<a href="fichas/' + p.slug + '.html" class="btn btn-secondary btn-sm" style="width: 100%; font-size: 0.78rem;">' +
            'Ficha y Análisis ↗' +
            '</a>' +
            '</div>' +
            '</th>';
  });

  html += '</tr></thead><tbody>';

  rows.forEach(r => {
    const values = currentProducts.map(p => p[r.key]);
    const hasDiff = new Set(values).size > 1;

    if (showOnlyDiffs && !hasDiff) return;

    html += '<tr class="' + (hasDiff ? 'has-difference' : '') + '">' +
            '<td class="td-label">' + r.label + '</td>';

    currentProducts.forEach(p => {
      html += '<td>' + p[r.key] + '</td>';
    });

    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

function drawDualRadar() {
  const canvas = document.getElementById('dualRadarCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.36;

  ctx.clearRect(0, 0, w, h);

  const categories = [
    { key: 'calidad_espresso', label: 'Calidad Espresso' },
    { key: 'molienda_ajuste', label: 'Molienda y Ajuste' },
    { key: 'facilidad_limpieza', label: 'Limpieza' },
    { key: 'rapidez_ruido', label: 'Rapidez / Ruido' },
    { key: 'calidad_precio', label: 'Calidad / Precio' }
  ];
  const numAxes = categories.length;

  for (let level = 0.2; level <= 1.0; level += 0.2) {
    ctx.beginPath();
    for (let i = 0; i < numAxes; i++) {
      const angle = (Math.PI * 2 / numAxes) * i - (Math.PI / 2);
      const px = cx + Math.cos(angle) * (radius * level);
      const py = cy + Math.sin(angle) * (radius * level);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.font = "600 11px 'Plus Jakarta Sans', system-ui, sans-serif";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#4B5563';

  for (let i = 0; i < numAxes; i++) {
    const angle = (Math.PI * 2 / numAxes) * i - (Math.PI / 2);
    const ax = cx + Math.cos(angle) * radius;
    const ay = cy + Math.sin(angle) * radius;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(ax, ay);
    ctx.strokeStyle = '#D1D5DB';
    ctx.setLineDash([2, 2]);
    ctx.stroke();
    ctx.setLineDash([]);

    const lx = cx + Math.cos(angle) * (radius + 26);
    const ly = cy + Math.sin(angle) * (radius + 26);
    ctx.fillText(categories[i].label, lx, ly);
  }

  const colors = [
    { fill: 'rgba(217, 83, 30, 0.22)', stroke: '#D9531E' },
    { fill: 'rgba(17, 24, 39, 0.18)', stroke: '#111827' }
  ];

  const currentProducts = PRODUCTS_DATA.filter(p => selectedAsins.includes(p.asin)).slice(0, 2);

  currentProducts.forEach((prod, pIdx) => {
    ctx.beginPath();
    categories.forEach((cat, cIdx) => {
      const score = prod.radar[cat.key] || 8.5;
      const angle = (Math.PI * 2 / numAxes) * cIdx - (Math.PI / 2);
      const dist = (score / 10) * radius;
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;

      if (cIdx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fillStyle = colors[pIdx].fill;
    ctx.fill();
    ctx.strokeStyle = colors[pIdx].stroke;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  });

  const legendDiv = document.getElementById('radarLegend');
  if (legendDiv) {
    legendDiv.innerHTML = currentProducts.map((p, idx) => {
      return '<div class="radar-legend-item" style="color: ' + colors[idx].stroke + ';">' +
             '<span class="radar-legend-dot" style="background: ' + colors[idx].stroke + ';"></span>' +
             '<span>' + p.name + '</span>' +
             '</div>';
    }).join('');
  }
}
