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
    initializeVoiceDemo();
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
 * Voice Agent Demo — "Hear Healix in action".
 * Plays a simulated patient call turn-by-turn (typing indicator, animated
 * transcript, waveform, call timer) across three scenarios, and optionally
 * speaks Healix's lines via the browser SpeechSynthesis API. Honors
 * prefers-reduced-motion (renders the full transcript instantly).
 */
function initializeVoiceDemo() {
    const section = document.querySelector('.voicedemo');
    if (!section) return;

    const SCENARIOS = {
        scheduling: {
            label: 'Scheduling',
            outcome: 'Appointment booked · Tue 2:30 PM with Dr. Bose',
            turns: [
                { who: 'agent',  text: "Thanks for calling Lonestar Rheumatology, this is Healix. How can I help?" },
                { who: 'caller', text: "Hi — I'd like to book an appointment with Dr. Bose." },
                { who: 'agent',  text: "I can help with that. Are you an existing patient?" },
                { who: 'caller', text: "Yes, Maria Alvarez." },
                { who: 'agent',  text: "Found you, Maria. Dr. Bose has Tuesday at 2:30 PM or Thursday at 10 AM. Which works better?" },
                { who: 'caller', text: "Tuesday at 2:30 is perfect." },
                { who: 'agent',  text: "Booked — Tuesday at 2:30 PM. I'll text you a confirmation. Anything else?" },
                { who: 'caller', text: "That's all, thank you!" },
                { who: 'agent',  text: "You're all set. Take care, Maria!" }
            ]
        },
        rescheduling: {
            label: 'Rescheduling',
            outcome: 'Rescheduled · Monday 3:00 PM',
            turns: [
                { who: 'agent',  text: "Lonestar Rheumatology, this is Healix. How can I help?" },
                { who: 'caller', text: "I need to move my appointment tomorrow." },
                { who: 'agent',  text: "No problem. Can I get your name and date of birth to pull it up?" },
                { who: 'caller', text: "James Carter, April 12th, 1979." },
                { who: 'agent',  text: "Thanks, James. I see your visit tomorrow at 9 AM. When would you like to move it to?" },
                { who: 'caller', text: "Sometime next week, in the afternoon." },
                { who: 'agent',  text: "I have Monday at 3 PM or Wednesday at 1:30 PM open." },
                { who: 'caller', text: "Let's do Monday at 3." },
                { who: 'agent',  text: "Done — moved to Monday at 3 PM. I've texted you the update. Anything else?" },
                { who: 'caller', text: "Nope, thanks!" }
            ]
        },
        faq: {
            label: 'Answering FAQs',
            outcome: '3 questions answered · offered to book',
            turns: [
                { who: 'agent',  text: "Thanks for calling, this is Healix. How can I help?" },
                { who: 'caller', text: "Do you take Blue Cross insurance?" },
                { who: 'agent',  text: "Yes, we're in-network with Blue Cross Blue Shield PPO plans. I can verify your specific coverage if you'd like." },
                { who: 'caller', text: "Good to know. And where are you located?" },
                { who: 'agent',  text: "We're at 1200 Medical Parkway, Suite 300, with free parking in the garage next door." },
                { who: 'caller', text: "What are your hours?" },
                { who: 'agent',  text: "We're open Monday through Friday, 8 AM to 5 PM. Would you like me to book you a visit?" },
                { who: 'caller', text: "Maybe later — thanks for the help!" },
                { who: 'agent',  text: "Of course. Have a great day!" }
            ]
        }
    };

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canSpeak = 'speechSynthesis' in window;

    const tabs = section.querySelectorAll('.voicedemo-tab');
    const card = section.querySelector('.callcard');
    const transcript = section.querySelector('.callcard-transcript');
    const playBtn = section.querySelector('.callcard-play');
    const playLabel = section.querySelector('.callcard-play-label');
    const playIcon = playBtn.querySelector('i');
    const muteBtn = section.querySelector('.callcard-mute');
    const muteIcon = muteBtn.querySelector('i');
    const timerEl = section.querySelector('.callcard-timer');
    const scenarioLabel = section.querySelector('.callcard-scenario-label');
    const outcomeEl = section.querySelector('.callcard-outcome');
    const outcomeText = section.querySelector('.callcard-outcome-text');

    let current = 'scheduling';
    let runId = 0;
    let playing = false;
    let soundOn = canSpeak; // default on where supported
    let timerHandle = null;
    let seconds = 0;

    if (!canSpeak) {
        muteBtn.setAttribute('aria-pressed', 'false');
        muteIcon.className = 'fas fa-volume-xmark';
        muteBtn.disabled = true;
        muteBtn.title = 'Voice not supported in this browser';
    }

    function fmt(s) {
        const m = Math.floor(s / 60);
        const r = s % 60;
        return m + ':' + (r < 10 ? '0' : '') + r;
    }

    function stopSpeech() { if (canSpeak) window.speechSynthesis.cancel(); }

    function reset(showPlaceholder) {
        runId++;
        playing = false;
        clearInterval(timerHandle);
        seconds = 0;
        timerEl.textContent = '0:00';
        stopSpeech();
        card.classList.remove('is-playing');
        playIcon.className = 'fas fa-play';
        playLabel.textContent = 'Play call';
        outcomeEl.hidden = true;
        transcript.innerHTML = '';
        if (showPlaceholder) {
            const p = document.createElement('p');
            p.className = 'callcard-placeholder';
            p.textContent = 'Press play to hear how Healix handles a ' + SCENARIOS[current].label.toLowerCase() + ' call.';
            transcript.appendChild(p);
        }
    }

    function addTurn(turn) {
        const el = document.createElement('div');
        el.className = 'callcard-turn callcard-turn--' + turn.who;
        const who = document.createElement('span');
        who.className = 'callcard-turn-who';
        who.textContent = turn.who === 'agent' ? 'Healix' : 'Caller';
        el.appendChild(who);
        el.appendChild(document.createTextNode(turn.text));
        transcript.appendChild(el);
        transcript.scrollTop = transcript.scrollHeight;
    }

    function speak(text, onEnd) {
        if (!soundOn || !canSpeak) { onEnd && onEnd(); return; }
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 1.02; u.pitch = 1.0;
        if (onEnd) u.onend = onEnd;
        window.speechSynthesis.speak(u);
    }

    function finish(myRun) {
        if (myRun !== runId) return;
        playing = false;
        clearInterval(timerHandle);
        card.classList.remove('is-playing');
        playIcon.className = 'fas fa-rotate-right';
        playLabel.textContent = 'Replay call';
        outcomeText.textContent = SCENARIOS[current].outcome;
        outcomeEl.hidden = false;
    }

    function play() {
        const data = SCENARIOS[current];
        reset(false);
        const myRun = runId;
        playing = true;
        card.classList.add('is-playing');
        playIcon.className = 'fas fa-pause';
        playLabel.textContent = 'Playing…';
        timerHandle = setInterval(function () {
            if (myRun !== runId) return;
            seconds++; timerEl.textContent = fmt(seconds);
        }, 1000);

        // Reduced motion: render everything at once.
        if (reduce) {
            data.turns.forEach(addTurn);
            if (soundOn) data.turns.filter(t => t.who === 'agent').forEach(t => speak(t.text));
            finish(myRun);
            return;
        }

        let i = 0;
        function next() {
            if (myRun !== runId) return;
            if (i >= data.turns.length) { finish(myRun); return; }
            const turn = data.turns[i++];
            const gap = Math.min(2600, 700 + turn.text.length * 32);

            if (turn.who === 'agent') {
                const typing = document.createElement('div');
                typing.className = 'callcard-typing';
                typing.innerHTML = '<span></span><span></span><span></span>';
                transcript.appendChild(typing);
                transcript.scrollTop = transcript.scrollHeight;
                setTimeout(function () {
                    if (myRun !== runId) return;
                    typing.remove();
                    addTurn(turn);
                    // Advance exactly once — via speech end when speaking, otherwise a
                    // reading-time gap. A fallback timer guards against TTS that never
                    // fires onend (flaky/absent voices), so playback never stalls.
                    let advanced = false;
                    const advance = function () {
                        if (advanced || myRun !== runId) return;
                        advanced = true;
                        next();
                    };
                    if (soundOn && canSpeak) {
                        speak(turn.text, advance);
                        setTimeout(advance, gap + 3500);
                    } else {
                        setTimeout(advance, gap);
                    }
                }, 650);
            } else {
                setTimeout(function () {
                    if (myRun !== runId) return;
                    addTurn(turn);
                    setTimeout(next, Math.min(1400, 500 + turn.text.length * 18));
                }, 500);
            }
        }
        next();
    }

    playBtn.addEventListener('click', function () {
        if (playing) { reset(true); return; }
        play();
    });

    muteBtn.addEventListener('click', function () {
        if (!canSpeak) return;
        soundOn = !soundOn;
        muteBtn.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
        muteIcon.className = soundOn ? 'fas fa-volume-high' : 'fas fa-volume-xmark';
        if (!soundOn) stopSpeech();
    });

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            const scenario = tab.getAttribute('data-scenario');
            if (scenario === current && !playing) return;
            current = scenario;
            tabs.forEach(function (t) {
                const on = t === tab;
                t.classList.toggle('active', on);
                t.setAttribute('aria-selected', on ? 'true' : 'false');
            });
            scenarioLabel.textContent = SCENARIOS[current].label;
            reset(true);
        });
    });

    // Stop audio if the user scrolls away or leaves the page.
    document.addEventListener('visibilitychange', function () {
        if (document.hidden && playing) reset(true);
    });

    reset(true);
}

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
        '.chart-grid', '.numbered-features',
        '.agent-grid', '.agent-benefits', '.agent-cap-list'
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
