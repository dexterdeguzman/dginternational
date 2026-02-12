/* =========================================
   DE GUZMAN INTERNATIONAL VISA CONSULTANCY
   Main Script
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR ----
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleNavScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const setActiveNav = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  };
  window.addEventListener('scroll', setActiveNav, { passive: true });

  // ---- PARALLAX EFFECTS ----
  const heroBg = document.querySelector('.hero-parallax-bg');
  const parallaxBg = document.querySelector('.parallax-bg');

  let lastScrollY = window.scrollY;
  let parallaxTicking = false;

  const updateParallax = () => {
    if (heroBg) {
      heroBg.style.transform = `scale(1.1) translateY(${lastScrollY * 0.3}px)`;
    }
    if (parallaxBg) {
      const section = parallaxBg.parentElement;
      const rect = section.getBoundingClientRect();
      const maxOffset = 120;
      const start = window.innerHeight;
      const end = -rect.height;
      const progress = Math.min(Math.max((rect.top - start) / (end - start), 0), 1);
      const offset = (progress - 0.5) * 2 * maxOffset;
      parallaxBg.style.transform = `translateY(${offset}px)`;
    }
    parallaxTicking = false;
  };

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!parallaxTicking) {
      window.requestAnimationFrame(updateParallax);
      parallaxTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!parallaxTicking) {
      window.requestAnimationFrame(updateParallax);
      parallaxTicking = true;
    }
  });

  updateParallax();

  // ---- INTERSECTION OBSERVER (Scroll Animations) ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

  document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
    observer.observe(el);
  });

  // ---- COUNTER ANIMATION ----
  const counters = document.querySelectorAll('.stat-number');
  let counterStarted = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };
      updateCounter();
    });
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterStarted) {
        counterStarted = true;
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) statsObserver.observe(statsSection);

  // ---- REVIEWS CAROUSEL ----
  function initReviewCarousel(row) {
    const slider = row.querySelector('.rv-slider');
    const track = row.querySelector('.rv-track');
    const prevBtn = row.querySelector('.rv-arrow--prev');
    const nextBtn = row.querySelector('.rv-arrow--next');

    if (!slider || !track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.rv-card');
    if (cards.length === 0) return;

    let currentIndex = 0;
    const gap = 16; // margin: 6px 8px → 8px left + 8px right = 16px total

    const getCardsPerView = () => {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 900) return 2;
      return 3;
    };

    const sizeCards = () => {
      const perView = getCardsPerView();
      const sliderWidth = slider.offsetWidth;
      const cardWidth = (sliderWidth - gap * perView) / perView;
      cards.forEach(card => {
        card.style.minWidth = cardWidth + 'px';
        card.style.maxWidth = cardWidth + 'px';
      });
    };

    const getTotalSlides = () => Math.max(1, cards.length - getCardsPerView() + 1);

    const updateControls = () => {
      const total = getTotalSlides();
      const hasMultiple = total > 1;
      prevBtn.disabled = !hasMultiple;
      nextBtn.disabled = !hasMultiple;
    };

    const goToSlide = (index) => {
      const total = getTotalSlides();
      currentIndex = Math.max(0, Math.min(index, total - 1));

      const cardEl = cards[0];
      const cardWidth = cardEl.offsetWidth + gap;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      updateControls();
    };

    const nextSlide = () => {
      if (currentIndex + 1 >= getTotalSlides()) {
        goToSlide(0);
      } else {
        goToSlide(currentIndex + 1);
      }
    };

    const prevSlide = () => {
      if (currentIndex - 1 < 0) {
        return;
      }
      goToSlide(currentIndex - 1);
    };

    const carouselType = row.dataset.carousel || '';
    const autoIntervals = {
      facebook: 7000,
      google: 5500,
    };
    const autoIntervalMs = autoIntervals[carouselType] || 6000;
    let autoTimer = null;
    const stopAuto = () => {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    };
    const startAuto = () => {
      if (getTotalSlides() <= 1) return;
      stopAuto();
      autoTimer = setInterval(() => {
        nextSlide();
      }, autoIntervalMs);
    };
    const resetAuto = () => {
      stopAuto();
      startAuto();
    };

    prevBtn.addEventListener('click', () => { prevSlide(); resetAuto(); });
    nextBtn.addEventListener('click', () => { nextSlide(); resetAuto(); });

    const handleResize = () => {
      sizeCards();
      goToSlide(Math.min(currentIndex, getTotalSlides() - 1));
      startAuto();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    row.addEventListener('mouseenter', stopAuto);
    row.addEventListener('mouseleave', startAuto);

    // Touch / swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else goToSlide(currentIndex - 1 < 0 ? getTotalSlides() - 1 : currentIndex - 1);
        resetAuto();
      }
    }, { passive: true });
  }

  document.querySelectorAll('.rv-row[data-carousel]').forEach(row => {
    initReviewCarousel(row);
  });

  const reviewCards = document.querySelectorAll('.rv-card');
  if (reviewCards.length) {
    const updateClampState = () => {
      reviewCards.forEach((card, index) => {
        const text = card.querySelector('.rv-card-text');
        const btn = card.querySelector('.rv-card-more');
        if (!text || !btn) return;

        if (!text.id) {
          text.id = `rv-text-${index + 1}`;
        }
        btn.setAttribute('aria-controls', text.id);

        const isExpanded = card.classList.contains('rv-card--expanded');
        if (isExpanded) {
          btn.textContent = 'Show less';
          btn.setAttribute('aria-expanded', 'true');
          btn.style.display = 'inline';
          return;
        }

        btn.textContent = 'Show more';
        btn.setAttribute('aria-expanded', 'false');
        const isOverflowing = text.scrollHeight > text.clientHeight + 1;
        btn.style.display = isOverflowing ? 'inline' : 'none';
      });
    };

    reviewCards.forEach(card => {
      const btn = card.querySelector('.rv-card-more');
      const text = card.querySelector('.rv-card-text');
      if (!btn || !text) return;
      btn.addEventListener('click', () => {
        card.classList.toggle('rv-card--expanded');
        updateClampState();
      });
    });

    requestAnimationFrame(updateClampState);
    window.addEventListener('resize', updateClampState);
  }

  // ---- BACK TO TOP ----
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- SMOOTH ANCHOR SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

});
