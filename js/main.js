// =============================================================================
// AITENES WEBSITE - MAIN.JS
// =============================================================================
// ÍNDICE:
// 1. NAVBAR SCROLL BEHAVIOR
// 2. MOBILE MENU TOGGLE
// 3. SMOOTH SCROLLING FOR ANCHOR LINKS
// 4. FADE-IN ANIMATIONS ON SCROLL (INTERSECTION OBSERVER)
// 5. ANIMATED COUNTER FOR METRICS
// 6. CTA FORM HANDLING
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {

  document.body.classList.remove('no-js');

  /**
   * 1. NAVBAR SCROLL BEHAVIOR
   * Agrega/quita una clase a la cabecera cuando el usuario hace scroll para
   * cambiar su apariencia (e.g., fondo sólido).
   */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /**
   * 2. MOBILE MENU TOGGLE
   * Controla la apertura y cierre del menú de navegación en dispositivos móviles.
   */
  const navbarToggle = document.querySelector('.navbar__toggle');
  const body = document.body;

  if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
      body.classList.toggle('mobile-menu-open');
      
      // Bloquear/desbloquear el scroll del body
      if (body.classList.contains('mobile-menu-open')) {
        body.style.overflow = 'hidden';
        navbarToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
      } else {
        body.style.overflow = '';
        navbarToggle.setAttribute('aria-label', 'Abrir menú de navegación');
      }
    });
  }

  /**
   * 3. SMOOTH SCROLLING FOR ANCHOR LINKS
   * Implementa un desplazamiento suave para todos los enlaces ancla (#) y
   * cierra el menú móvil si está abierto.
   */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'), 10) || 80;

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      // Asegurarse de que el target es un ID válido en la página
      if (targetId.length > 1 && document.querySelector(targetId)) {
        const targetElement = document.querySelector(targetId);
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }

      // Cerrar el menú móvil si está abierto después de hacer clic en un enlace
      if (body.classList.contains('mobile-menu-open')) {
        body.classList.remove('mobile-menu-open');
        body.style.overflow = '';
        navbarToggle.setAttribute('aria-label', 'Abrir menú de navegación');
      }
    });
  });

  /**
   * 4. FADE-IN ANIMATIONS ON SCROLL (INTERSECTION OBSERVER)
   * Anima los elementos para que aparezcan gradualmente cuando entran en el viewport.
   */
  const animatedElements = document.querySelectorAll('.fade-in');

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay) || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target); // Dejar de observar una vez que es visible
        }
      });
    }, {
      rootMargin: '0px',
      threshold: 0.1
    });

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  /**
   * 5. ANIMATED COUNTER FOR METRICS
   * Anima los números de las métricas cuando entran en el viewport.
   */
  const metricNumbers = document.querySelectorAll('.metric-card__number');

  if (metricNumbers.length > 0) {
    const animateCounter = (element, target, duration = 2000) => {
      const start = 0;
      const increment = target / (duration / 16); // 60fps
      let current = start;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          // Formatear con decimales si el target los tiene
          if (target % 1 !== 0) {
            element.textContent = current.toFixed(1);
          } else {
            element.textContent = Math.floor(current);
          }
          requestAnimationFrame(updateCounter);
        } else {
          // Asegurarse de que termina en el valor exacto
          if (target % 1 !== 0) {
            element.textContent = target.toFixed(1);
          } else {
            element.textContent = target;
          }
        }
      };

      updateCounter();
    };

    const metricsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseFloat(entry.target.dataset.target);
          animateCounter(entry.target, target);
          metricsObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px'
    });

    metricNumbers.forEach(number => {
      metricsObserver.observe(number);
    });
  }

  /**
   * 6. CTA FORM HANDLING
   * Gestiona el envío del formulario de solicitud de beta.
   */
  const betaForm = document.getElementById('beta-form');
  const formMessage = document.getElementById('form-message');

  if (betaForm && formMessage) {
    betaForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;

      // Validación simple de email
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        formMessage.textContent = 'Por favor, ingresá un email válido.';
        formMessage.className = 'form-message error';
        return;
      }

      // Simulación de envío exitoso
      formMessage.textContent = '¡Gracias! Te contactaremos pronto.';
      formMessage.className = 'form-message success';
      emailInput.value = '';

      // En un caso real, aquí iría la llamada a una API:
      // fetch('/api/beta-signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: email })
      // })
      // .then(response => response.json())
      // .then(data => { ... })
      // .catch(error => { ... });
    });
  }

});
