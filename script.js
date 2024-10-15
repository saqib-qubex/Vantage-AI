document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contactFormFields');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const emailSuggestions = document.getElementById('emailSuggestions');
    const headerContactBtn = document.createElement('button');
    headerContactBtn.className = 'btn btn-primary btn-sm ms-2';
    headerContactBtn.textContent = 'Contact';
    headerContactBtn.setAttribute('data-bs-toggle', 'modal');
    headerContactBtn.setAttribute('data-bs-target', '#contactForm');
    
    const navbarNav = document.querySelector('#navbarNav');
    const header = document.querySelector('header');

    const popularDomains = ['gmail.com', 'yahoo.com', 'hotmail.com'];

    // Phone number formatting
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : `${x[1]}-${x[2]}${x[3] ? `-${x[3]}` : ''}`;
    });

    // Email suggestions
    emailInput.addEventListener('input', function(e) {
        const inputValue = e.target.value;
        const atIndex = inputValue.indexOf('@');
        
        // Clear previous suggestions
        emailSuggestions.innerHTML = '';

        if (atIndex === -1) {
            popularDomains.forEach(domain => {
                const option = document.createElement('option');
                option.value = inputValue + '@' + domain;
                emailSuggestions.appendChild(option);
            });
        } else {
            const domainPart = inputValue.slice(atIndex + 1);
            popularDomains.forEach(domain => {
                if (domain.startsWith(domainPart)) {
                    const option = document.createElement('option');
                    option.value = inputValue.slice(0, atIndex) + '@' + domain;
                    emailSuggestions.appendChild(option);
                }
            });
        }
    });

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    });

    function validateForm() {
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
        if (!phonePattern.test(phoneInput.value)) {
            alert('Please enter a valid phone number in the format 123-456-7890');
            return false;
        }
        return true;
    }

    function submitForm() {
        fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Thank you for your submission!');
                form.reset();
                bootstrap.Modal.getInstance(document.getElementById('contactForm')).hide();
            } else {
                alert('Oops! There was a problem submitting your form');
            }
        }).catch(error => {
            alert('Oops! There was a problem submitting your form');
        });
    }

    // Dynamic header button
    const heroSection = document.querySelector('.hero');
    const heroButton = heroSection.querySelector('.btn');

    function toggleHeaderButton() {
        const headerBottom = header.getBoundingClientRect().bottom;
        const heroButtonTop = heroButton.getBoundingClientRect().top;

        if (heroButtonTop <= headerBottom) {
            if (!navbarNav.contains(headerContactBtn)) {
                navbarNav.appendChild(headerContactBtn);
            }
        } else {
            if (navbarNav.contains(headerContactBtn)) {
                navbarNav.removeChild(headerContactBtn);
            }
        }
    }

    window.addEventListener('scroll', toggleHeaderButton);
    window.addEventListener('resize', toggleHeaderButton);
    toggleHeaderButton(); // Initial check

    // AI-related animations
    const featureCards = document.querySelectorAll('.card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.05)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'none';
        });
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();
});