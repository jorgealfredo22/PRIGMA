document.addEventListener('DOMContentLoaded', function() {

    const navContainer = document.querySelector('.nav-container');
    const logo = document.querySelector('.logo');
    const logoIcon = document.querySelector('.logo-icon');
    const navHeight = 70; // Altura original en px
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navContainer.style.boxShadow = '0 10px 20px rgba(23, 22, 22, 0.84)';
 
      } else {
        navContainer.style.boxShadow = '0 10px 20px rgba(255, 255, 255, 0)';
      }
    });

    // Elementos del DOM
    const menuButton = document.getElementById('menuButton');
    const navList = document.getElementById('navList');
    const scrollTopButton = document.getElementById('scrollTop');
    const contactForm = document.getElementById('contactForm');
    
    // Toggle del menú móvil
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            navList.classList.toggle('open');
            menuButton.textContent = navList.classList.contains('open') ? '✕' : '☰';
        });
    }
    
    // Cierra el menú al hacer clic en un enlace
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navList.classList.remove('open');
                menuButton.textContent = '☰';
            }
        });
    });
    
    // Scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('active');
        } else {
            scrollTopButton.classList.remove('active');
        }
    });
    
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animaciones al aparecer en el viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
    
    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Manejo del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica para enviar el formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simulación de envío exitoso
            alert(`Gracias ${name}, hemos recibido tu mensaje. Nos pondremos en contacto contigo pronto en ${email}.`);
            contactForm.reset();
        });
    }
    
    // Efecto de hover en las tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'rotate(5deg) scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'rotate(0) scale(1)';
        });
    });
});

