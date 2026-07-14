/**
 * VANTAGE AI - MODERN HEALTHCARE CRM
 * JavaScript for interactions and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavbar();
    initializeMobileMenu();
    initializeTabs();
    initializeEmailForm();
    initializeSpecialtyTabs();
    initializeCalButtons();
    initializeSmoothScroll();
    initializeHeroEffects();
    initializeStatCounters();
    initializeScrollAnimations();
    initializeAutoMotion();
});

/**
 * Navbar Scroll Behavior
 */
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
}

/**
 * Mobile Menu Toggle
 */
function initializeMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!toggle || !mobileMenu) return;

    // Keep the toggle's accessible state in sync with the menu
    function setMenuOpen(isOpen) {
        toggle.classList.toggle('active', isOpen);
        mobileMenu.classList.toggle('active', isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    toggle.addEventListener('click', function() {
        setMenuOpen(!mobileMenu.classList.contains('active'));
    });

    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            setMenuOpen(false);
        }
    });

    // Close menu on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            setMenuOpen(false);
            toggle.focus();
        }
    });

    // Close menu when clicking links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            setMenuOpen(false);
        });
    });

    // Close menu on window resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            setMenuOpen(false);
        }
    });
}

/**
 * Feature Tabs
 */
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length === 0 || tabContents.length === 0) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.querySelector(`.tab-content[data-tab="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Add fade-in animation
            if (targetContent) {
                targetContent.style.animation = 'none';
                setTimeout(() => {
                    targetContent.style.animation = 'fadeInUp 0.6s ease-out';
                }, 10);
            }
        });
    });
}

/**
 * Email Form Handler
 */
function initializeEmailForm() {
    const emailForms = document.querySelectorAll('.email-form');

    emailForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('.email-input');
            const email = emailInput.value.trim();

            if (email && isValidEmail(email)) {
                // Here you would typically send to your backend
                console.log('Email submitted:', email);

                // Show success message (you can customize this)
                alert('Thank you! We\'ll be in touch soon.');

                // Clear the form
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });
}

/**
 * Email Validation Helper
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Specialty Tabs (in feature section #02)
 */
function initializeSpecialtyTabs() {
    const specialtyTabs = document.querySelectorAll('.specialty-tab');

    if (specialtyTabs.length === 0) return;

    specialtyTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            specialtyTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');
        });
    });
}

/**
 * Cal.com Button Initialization
 */
function initializeCalButtons() {
    const calButtons = document.querySelectorAll('[data-cal-link]');

    calButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const namespace = this.getAttribute('data-cal-namespace');

            // Check if Cal is loaded
            if (window.Cal && namespace && window.Cal.ns && window.Cal.ns[namespace]) {
                try {
                    window.Cal.ns[namespace]('ui', {
                        styles: {inline: false},
                        hideEventTypeDetails: false,
                        layout: 'month_view'
                    });
                } catch (error) {
                    console.error('Cal.com error:', error);
                }
            } else {
                // Fallback if Cal.com not loaded
                console.warn('Cal.com not loaded yet');
            }
        });
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initializeSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#"
            if (targetId === '#') {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Intersection Observer for Fade-in Animations (Optional Enhancement)
 */
function initializeScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/**
 * Hero pointer + parallax effects
 */
function initializeHeroEffects() {
    const hero = document.querySelector('.hero-premium');
    const parallaxTarget = document.querySelector('[data-hero-parallax]');

    if (!hero) return;

    hero.addEventListener('pointermove', function(e) {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        hero.style.setProperty('--hero-mouse-x', x.toFixed(3));
        hero.style.setProperty('--hero-mouse-y', y.toFixed(3));
    });

    window.addEventListener('scroll', function() {
        if (!parallaxTarget) return;

        const rect = hero.getBoundingClientRect();
        const parallax = Math.max(-40, Math.min(40, rect.top * -0.08));
        parallaxTarget.style.setProperty('--hero-parallax', `${parallax}px`);
    });
}

/**
 * Animate number counters when visible
 */
function initializeStatCounters() {
    const counters = document.querySelectorAll('[data-count]');

    if (counters.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            animateCounter(entry.target);
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.45
    });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = Number(element.getAttribute('data-count'));

    if (Number.isNaN(target)) return;

    const originalText = element.textContent.trim();
    const suffix = originalText.replace(String(target), '');
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);

        element.textContent = `${value}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(tick);
        }
    }

    requestAnimationFrame(tick);
}

// Optional: Uncomment to enable scroll animations
// initializeScrollAnimations();

/**
 * Dropdown Accessibility - Keyboard Navigation
 */
function initializeDropdownAccessibility() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const content = dropdown.querySelector('.dropdown-content');

        if (!toggle || !content) return;

        // Keyboard support
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                content.style.opacity = content.style.opacity === '1' ? '0' : '1';
                content.style.visibility = content.style.visibility === 'visible' ? 'hidden' : 'visible';
            }
        });

        // Close on Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
            }
        });
    });
}

initializeDropdownAccessibility();

/**
 * Site-wide scroll motion.
 * Auto-tags common sections/cards and fades + slides them into view as the
 * user scrolls, with a light stagger for grid children. Progressive
 * enhancement: tags are only added when JS runs, and reduced-motion is honored.
 */
function initializeAutoMotion() {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const groups = [
        '.outcomes-grid', '.testimonials-grid', '.feature-grid', '.integration-grid',
        '.footer-grid', '.faq-list', '.proof-band-grid', '.pricing-grid',
        '.chart-grid', '.numbered-features'
    ];
    const singles = [
        '.section-title', '.section-eyebrow', '.section-label',
        '.cta-section h2', '.cta-section p'
    ];

    function tag(el, index) {
        if (!el || el.hasAttribute('data-animate') || el.classList.contains('reveal')) return;
        if (el.closest('.hero')) return; // hero uses .reveal already; avoid a flash
        if (!el.getClientRects().length) return; // skip hidden/zero-box (e.g. inactive tabs)
        el.setAttribute('data-animate', '');
        if (index) el.style.setProperty('--motion-delay', (Math.min(index, 6) * 70) + 'ms');
    }

    singles.forEach(sel => document.querySelectorAll(sel).forEach(el => tag(el, 0)));
    groups.forEach(sel => document.querySelectorAll(sel).forEach(group => {
        Array.prototype.forEach.call(group.children, (child, i) => tag(child, i));
    }));

    const targets = document.querySelectorAll('[data-animate]');

    if (reduce || !('IntersectionObserver' in window)) {
        targets.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));
}

/**
 * Performance: Debounce Helper
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Performance: Throttle Helper
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for potential use in other scripts
window.VantageAI = {
    initializeNavbar,
    initializeMobileMenu,
    initializeTabs,
    initializeEmailForm,
    initializeSpecialtyTabs,
    initializeCalButtons,
    initializeSmoothScroll,
    debounce,
    throttle
};
