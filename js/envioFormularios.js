document.addEventListener('DOMContentLoaded', function () {
    // === FORMULARIO DE CONTACTO ===
    const contactForm = document.getElementById('contactForm');
    const contactBtn = document.getElementById('contactBtn');

    if (contactForm && contactBtn) {
        contactForm.setAttribute('action', 'https://formsubmit.co/gantia1999@gmail.com');
        contactForm.setAttribute('method', 'POST');

        // Campos ocultos
        const hiddenSubject = document.createElement('input');
        hiddenSubject.type = 'hidden';
        hiddenSubject.name = '_subject';
        hiddenSubject.value = 'Nuevo mensaje de contacto desde Prigma';
        contactForm.appendChild(hiddenSubject);

        const hiddenTemplate = document.createElement('input');
        hiddenTemplate.type = 'hidden';
        hiddenTemplate.name = '_template';
        hiddenTemplate.value = 'table';
        contactForm.appendChild(hiddenTemplate);

        const hiddenCaptcha = document.createElement('input');
        hiddenCaptcha.type = 'hidden';
        hiddenCaptcha.name = '_captcha';
        hiddenCaptcha.value = 'false';
        contactForm.appendChild(hiddenCaptcha);

        const hiddenNext = document.createElement('input');
        hiddenNext.type = 'hidden';
        hiddenNext.name = '_next';
        hiddenNext.value = 'http://127.0.0.1:5500/index.html#services'; // Cambia por tu URL
        contactForm.appendChild(hiddenNext);

        contactBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                alert('Por favor completa todos los campos requeridos');
                return;
            }

            if (!email.includes('@')) {
                alert('Por favor ingresa un correo válido');
                return;
            }

            contactForm.submit();
        });
    }

    // === FORMULARIO DE PRESUPUESTO ===
    const budgetForm = document.getElementById('budgetForm');
    const budgetBtn = document.getElementById('budgetBtn');

    if (budgetForm && budgetBtn) {
        budgetForm.setAttribute('action', 'https://formsubmit.co/gantia1999@gmail.com');
        budgetForm.setAttribute('method', 'POST');

        const hiddenSubject = document.createElement('input');
        hiddenSubject.type = 'hidden';
        hiddenSubject.name = '_subject';
        hiddenSubject.value = 'Nueva solicitud de presupuesto desde Prigma';
        budgetForm.appendChild(hiddenSubject);

        const hiddenTemplate = document.createElement('input');
        hiddenTemplate.type = 'hidden';
        hiddenTemplate.name = '_template';
        hiddenTemplate.value = 'table';
        budgetForm.appendChild(hiddenTemplate);

        const hiddenCaptcha = document.createElement('input');
        hiddenCaptcha.type = 'hidden';
        hiddenCaptcha.name = '_captcha';
        hiddenCaptcha.value = 'false';
        budgetForm.appendChild(hiddenCaptcha);

        const hiddenNext = document.createElement('input');
        hiddenNext.type = 'hidden';
        hiddenNext.name = '_next';
        hiddenNext.value = 'http://127.0.0.1:5500/index.html#services'; // Cambia por tu URL
        budgetForm.appendChild(hiddenNext);

        budgetBtn.addEventListener('click', function (e) {
            e.preventDefault();

            const name = budgetForm.querySelector('#budgetName').value.trim();
            const email = budgetForm.querySelector('#budgetEmail').value.trim();
            const description = budgetForm.querySelector('#budgetDescription').value.trim();

            if (!name || !email || !description) {
                alert('Por favor completa todos los campos requeridos');
                return;
            }

            if (!email.includes('@')) {
                alert('Por favor ingresa un correo válido');
                return;
            }

            budgetForm.submit();
        });
    }
});
