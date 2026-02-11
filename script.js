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

  // ---- GOOGLE REVIEWS ----
  const PLACE_ID = 'ChIJ2xWWN8DDlzMR-ZUMhTLoPK0';

  // =====================================================================
  // OPTION 1: Google Places API (requires API key)
  // To enable live Google Reviews, get a Google Places API key from
  // https://console.cloud.google.com and uncomment the line below:
  // =====================================================================
  // const GOOGLE_API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY_HERE';

  // =====================================================================
  // OPTION 2: Fallback reviews from your Google listing
  // Copy your real Google reviews here. These are displayed when no API
  // key is configured. Update these whenever you get new reviews.
  // =====================================================================
  const fallbackReviews = {
    rating: 5.0,
    total: 7,
    reviews: [
      {
        author_name: 'Tine',
        rating: 5,
        text: "You'll experience hassle free in this visa consultancy! Shawie was super friendly, patient, and always happy to answer questions. You'll be guided through every step and kept the process simple and stress-free. Highly recommended!",
        relative_time_description: '2 months ago',
        profile_photo_url: null
      },
      {
        author_name: 'Ruffa Jane Lagutin',
        rating: 5,
        text: "Shawie's expertise and personalized approach to visa applications are truly commendable. She guides you through the entire process, ensuring that all requirements are met and that the application is processed efficiently. What sets her apart is her patience and willingness to answer all your questions. Highly recommended!",
        relative_time_description: '3 months ago',
        profile_photo_url: null
      },
      {
        author_name: 'Carl Morgan',
        rating: 5,
        text: "Thank you Ms. Shawie for always being on hand to offer help. Your support recently with obtaining my 13a Permanent Visa has been nothing short of incredible, answering questions and being flexible with your time! I especially appreciate your patience and professionalism throughout the entire process.",
        relative_time_description: '3 months ago',
        profile_photo_url: null
      },
      {
        author_name: 'Catherine Villanueva',
        rating: 5,
        text: "You will never go wrong when you choose De Guzman International Visa Consultancy. The owner, Ms. Shawie is one of the most genuine and hardworking people I've met — very patient and always ready to answer your questions. She made the whole visa process smooth, easy, and stress-free!",
        relative_time_description: '3 months ago',
        profile_photo_url: null
      },
      {
        author_name: 'John Harvey Magos',
        rating: 5,
        text: "Applying for a visa used to feel overwhelming, but thanks to De Guzman International Visa Consultancy, the entire process became smooth, stress-free, and successful! She guided me step by step with professionalism and genuine care. Highly recommended for anyone needing visa assistance!",
        relative_time_description: '3 months ago',
        profile_photo_url: null
      },
      {
        author_name: 'Michelle Lapuz',
        rating: 5,
        text: "Shawie is one of the most dedicated and trustworthy people I know. She genuinely helps her clients and makes the whole visa process easier and clearer. You can really see her passion in what she does!",
        relative_time_description: '3 months ago',
        profile_photo_url: null
      },
      {
        author_name: 'Len Masallo',
        rating: 5,
        text: "Thank you so much Miss Shawie... since day 1 ng SRRV until now for renewal you never fail us. Smooth and easy process always. Highly recommended!",
        relative_time_description: '2 months ago',
        profile_photo_url: null
      }
    ]
  };

  function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<i class="fas fa-star"></i>';
      } else if (i - 0.5 <= rating) {
        stars += '<i class="fas fa-star-half-alt"></i>';
      } else {
        stars += '<i class="far fa-star"></i>';
      }
    }
    return stars;
  }

  function renderReviews(data) {
    const track = document.getElementById('reviewsTrack');
    if (!track) return;

    // Update header rating info
    const ratingNum = document.getElementById('googleRatingNumber');
    const starsEl = document.getElementById('googleStars');
    const countEl = document.getElementById('googleReviewCount');

    if (ratingNum) ratingNum.textContent = data.rating.toFixed(1);
    if (starsEl) starsEl.innerHTML = generateStars(data.rating);
    if (countEl) countEl.textContent = `(${data.total} reviews)`;

    // Build review cards
    track.innerHTML = data.reviews.map(review => {
      const avatar = review.profile_photo_url
        ? `<img src="${review.profile_photo_url}" alt="${review.author_name}" referrerpolicy="no-referrer" />`
        : `<span class="avatar-initials">${getInitials(review.author_name)}</span>`;

      return `
        <div class="review-card">
          <div class="review-stars">${generateStars(review.rating)}</div>
          <p class="review-text">"${review.text}"</p>
          <div class="review-time"><i class="fas fa-clock"></i> ${review.relative_time_description}</div>
          <div class="review-author">
            <div class="review-avatar">${avatar}</div>
            <div>
              <strong>${review.author_name}</strong>
              <span><i class="fab fa-google" style="margin-right:4px"></i> Google Review</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Initialize slider after reviews are rendered
    initReviewsSlider();
  }

  function loadGoogleReviews() {
    // Check if API key is configured
    if (typeof GOOGLE_API_KEY !== 'undefined' && GOOGLE_API_KEY && !GOOGLE_API_KEY.includes('YOUR_')) {
      // Load the Google Places library and fetch live reviews
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
      script.onload = () => {
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({
          placeId: PLACE_ID,
          fields: ['reviews', 'rating', 'user_ratings_total']
        }, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            renderReviews({
              rating: place.rating || 5.0,
              total: place.user_ratings_total || place.reviews.length,
              reviews: place.reviews.map(r => ({
                author_name: r.author_name,
                rating: r.rating,
                text: r.text,
                relative_time_description: r.relative_time_description,
                profile_photo_url: r.profile_photo_url
              }))
            });
          } else {
            renderReviews(fallbackReviews);
          }
        });
      };
      script.onerror = () => renderReviews(fallbackReviews);
      document.head.appendChild(script);
    } else {
      // Use fallback reviews
      renderReviews(fallbackReviews);
    }
  }

  loadGoogleReviews();

  // ---- REVIEWS SLIDER ----
  function initReviewsSlider() {
    const track = document.getElementById('reviewsTrack');
    const prevBtn = document.getElementById('reviewPrev');
    const nextBtn = document.getElementById('reviewNext');
    const dotsContainer = document.getElementById('reviewsDots');

    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const cards = track.querySelectorAll('.review-card');
    if (cards.length === 0) return;

    let currentIndex = 0;
    let cardsPerView = 3;
    let autoSlideInterval;

    const getCardsPerView = () => {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    };

    const getTotalSlides = () => Math.max(1, cards.length - cardsPerView + 1);

    const buildDots = () => {
      dotsContainer.innerHTML = '';
      const total = getTotalSlides();
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    };

    const goToSlide = (index) => {
      const total = getTotalSlides();
      currentIndex = Math.max(0, Math.min(index, total - 1));

      const cardEl = cards[0];
      const style = getComputedStyle(cardEl);
      const cardWidth = cardEl.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

      dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    };

    const nextSlide = () => goToSlide(currentIndex + 1 >= getTotalSlides() ? 0 : currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex - 1 < 0 ? getTotalSlides() - 1 : currentIndex - 1);

    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });

    const startAutoSlide = () => { autoSlideInterval = setInterval(nextSlide, 5000); };
    const resetAutoSlide = () => { clearInterval(autoSlideInterval); startAutoSlide(); };

    const handleResize = () => {
      cardsPerView = getCardsPerView();
      buildDots();
      goToSlide(Math.min(currentIndex, getTotalSlides() - 1));
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    startAutoSlide();

    // Touch / swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
        resetAutoSlide();
      }
    }, { passive: true });
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

  // ---- CONTACT FORM ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const wrapper = contactForm.parentElement;
      wrapper.innerHTML = `
        <div class="form-success">
          <i class="fas fa-check-circle"></i>
          <h3>Message Sent!</h3>
          <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
        </div>
      `;
      wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
