document.addEventListener('DOMContentLoaded', function() {
    // Dropdown handling
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    let activeDropdown = null;
    
    function closeDropdown(dropdown) {
        const menu = dropdown.nextElementSibling;
        menu.classList.remove('show');
        dropdown.setAttribute('aria-expanded', 'false');
        activeDropdown = null;
    }

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                e.stopPropagation();
                
                const menu = this.nextElementSibling;
                
                // Close previous dropdown
                if (activeDropdown && activeDropdown !== this) {
                    closeDropdown(activeDropdown);
                }

                // Toggle current dropdown
                if (this.getAttribute('aria-expanded') === 'true') {
                    closeDropdown(this);
                } else {
                    menu.classList.add('show');
                    this.setAttribute('aria-expanded', 'true');
                    activeDropdown = this;
                }
            }
        });
    });

    // Desktop hover handling
    if (window.innerWidth >= 992) {
        dropdowns.forEach(dropdown => {
            const menu = dropdown.nextElementSibling;
            
            dropdown.addEventListener('mouseenter', () => {
                menu.classList.add('show');
                dropdown.setAttribute('aria-expanded', 'true');
            });

            dropdown.addEventListener('mouseleave', () => {
                menu.classList.remove('show');
                dropdown.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && activeDropdown) {
            closeDropdown(activeDropdown);
        }
    });

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
            if (window.innerWidth >= 992) {
                dropdowns.forEach(dropdown => {
                    const menu = dropdown.nextElementSibling;
                    menu.classList.remove('show');
                    dropdown.setAttribute('aria-expanded', 'false');
                });
                activeDropdown = null;
            }
        }, 250);
    });

    // Smooth scrolling for navigation links
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
});