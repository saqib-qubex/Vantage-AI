document.addEventListener('DOMContentLoaded', function() {
    // Typing effect for the hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && !heroTitle.getAttribute('data-typed')) {
        const heroText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.setAttribute('data-typed', 'true');
        let index = 0;

        function typeWriter() {
            if (index < heroText.length) {
                heroTitle.textContent += heroText.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }

        typeWriter();
    }

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle dropdown menu on mobile
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                dropdownMenu.classList.toggle('show');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar-nav')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });

    // Handle navbar background on scroll
    let navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});