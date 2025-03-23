// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS with optimized settings
  AOS.init({
    duration: 800,
    once: true,
    mirror: false,
    offset: 50,
    delay: 0,
    throttleDelay: 99,
    disable: 'mobile'
  });

  // Optimize AOS animations for better performance
  const aosElements = document.querySelectorAll('[data-aos]');
  const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  aosElements.forEach(element => {
    observer.observe(element);
  });

  // Update current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Preloader
  window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  });

  // Header scroll class
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile Navigation
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    // Prevent default behavior
    navbarToggler.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navbarCollapse.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
        navbarCollapse.classList.remove('show');
      }
    });

    // Prevent menu from closing when clicking inside
    navbarCollapse.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Close mobile menu only after navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(() => {
          navbarCollapse.classList.remove('show');
        }, 150);
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to top button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Counter animation
  function animateCounter(element) {
    const target = parseInt(element.textContent);
    let count = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(count);
      }
    }, 16);
  }

  // Intersection Observer for counter animation
  const counters = document.querySelectorAll('.count');
  if (counters.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  // Form handling with Web3Forms
  const contactForm = document.querySelector('.contact-form');
  const successAlert = document.getElementById('form-success');
  const errorAlert = document.getElementById('form-error');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = 'Sending...';
      submitButton.disabled = true;

      // Create form data
      const formData = new FormData(contactForm);

      // Submit form using fetch
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Show success message
          successAlert.style.display = 'block';
          errorAlert.style.display = 'none';
          contactForm.reset();

          // Hide success message after 5 seconds
          setTimeout(() => {
            successAlert.style.display = 'none';
          }, 5000);
        } else {
          // Show error message
          errorAlert.style.display = 'block';
          successAlert.style.display = 'none';
        }
      })
      .catch(error => {
        // Show error message
        errorAlert.style.display = 'block';
        successAlert.style.display = 'none';
      })
      .finally(() => {
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
      });
    });
  }

  // Image lazy loading
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Hero slider
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    
    function showSlide(index) {
      heroSlides.forEach(slide => slide.classList.remove('active'));
      heroSlides[index].classList.add('active');
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % heroSlides.length;
      showSlide(currentSlide);
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
  }

  // Initialize Product Slider
  $('.product-slider').slick({
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});

// Google Maps function (only initialize if map element exists)
function initMap() {
  const mapElement = document.getElementById("googleMap");
  if (mapElement) {
    const mapProp = {
      center: new google.maps.LatLng(40.712775, -74.005973),
      zoom: 18,
    };
    const map = new google.maps.Map(mapElement, mapProp);
  }
}