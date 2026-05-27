    const header = document.getElementById('header');
    const menuBtn = document.getElementById('menuBtn');
    const links = document.getElementById('links');
    const backTop = document.getElementById('backTop');
    const revealElements = document.querySelectorAll('.reveal');
    const counters = document.querySelectorAll('[data-count]');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const toast = document.getElementById('toast');
    const orderButtons = document.querySelectorAll('.order-btn');
    const cartButtons = document.querySelectorAll('.cart-btn');

    menuBtn.addEventListener('click', () => {
      links.classList.toggle('open');
      menuBtn.textContent = links.classList.contains('open') ? '×' : '☰';
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        menuBtn.textContent = '☰';
      });
    });

    function revealOnScroll() {
      revealElements.forEach(element => {
        const top = element.getBoundingClientRect().top;
        if (top < window.innerHeight - 90) {
          element.classList.add('active');
        }
      });
    }

    let countersStarted = false;

    function animateCounters() {
      if (countersStarted || counters.length === 0) return;
      if (counters[0].getBoundingClientRect().top > window.innerHeight - 120) return;

      countersStarted = true;

      counters.forEach(counter => {
        const target = Number(counter.dataset.count);
        let current = 0;
        const increment = target / 70;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current);
          }
        }, 20);
      });
    }

    function handleScroll() {
      header.classList.toggle('scrolled', window.scrollY > 40);
      backTop.classList.toggle('show', window.scrollY > 500);
      revealOnScroll();
      animateCounters();
    }

    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    orderButtons.forEach(button => {
      button.addEventListener('click', () => {
        const product = button.dataset.product;
        const message = encodeURIComponent(`Hello NovaCare Pharmacy, I want to order: ${product}. Is it available?`);
        window.open(`https://wa.me/970590000000?text=${message}`, '_blank');
      });
    });

    cartButtons.forEach(button => {
      button.addEventListener('click', () => {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1800);
      });
    });

    contactForm.addEventListener('submit', event => {
      event.preventDefault();

      const data = Object.fromEntries(new FormData(contactForm).entries());
      console.log('Pharmacy Request:', data);

      formMessage.classList.add('show');
      contactForm.reset();

      setTimeout(() => {
        formMessage.classList.remove('show');
      }, 4500);
    });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);