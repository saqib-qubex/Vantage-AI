document.addEventListener('DOMContentLoaded', function() {
    // Dropdown handling
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    let activeDropdown = null;
    
    // Only apply click handling for mobile
    if (window.innerWidth < 992) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const menu = this.nextElementSibling;
                
                // Close previous dropdown
                if (activeDropdown && activeDropdown !== this) {
                    const activeMenu = activeDropdown.nextElementSibling;
                    activeMenu.classList.remove('show');
                    activeDropdown.setAttribute('aria-expanded', 'false');
                }

                // Toggle current dropdown
                if (this.getAttribute('aria-expanded') === 'true') {
                    menu.classList.remove('show');
                    this.setAttribute('aria-expanded', 'false');
                    activeDropdown = null;
                } else {
                    menu.classList.add('show');
                    this.setAttribute('aria-expanded', 'true');
                    activeDropdown = this;
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown') && activeDropdown) {
                const menu = activeDropdown.nextElementSibling;
                menu.classList.remove('show');
                activeDropdown.setAttribute('aria-expanded', 'false');
                activeDropdown = null;
            }
        });
    }

    // Handle navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const isMobile = window.innerWidth < 992;
            
            dropdowns.forEach(dropdown => {
                const menu = dropdown.nextElementSibling;
                
                if (!isMobile) {
                    // Remove all event listeners and classes for desktop
                    menu.classList.remove('show');
                    dropdown.setAttribute('aria-expanded', 'false');
                }
            });
            
            activeDropdown = null;
        }, 250);
    });

    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fix for Explore Features and Learn More buttons
    const exploreButton = document.querySelector('a[href="#features"]');
    const learnMoreButton = document.querySelector('a[href="#about"]');

    if (exploreButton) {
        exploreButton.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#features');
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#about');
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});