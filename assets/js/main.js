/**
 * Main Interactive JS for CafeterasSuperautomaticasGrano.es
 * Minimalist Nordic Warmth UX
 * Cache-buster: 20260901
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
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // 3. Image Gallery Switcher (Ficha & Clusters)
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

  // 4. Sticky CTA Bar on Scroll (Ficha pages)
  const stickyBar = document.getElementById('stickyCtaBar');
  if (stickyBar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    });
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
});