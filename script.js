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

    const PRACTICE = 'Advanced Family Dental of Naperville';
    const AGENT = 'Mira';

    const SCENARIOS = {
        // Rescheduling = real recorded call. Transcript is verbatim from the recording.
        rescheduling: {
            label: 'Rescheduling',
            agent: AGENT,
            practice: PRACTICE,
            audio: 'assets/mira-rescheduling.wav',
            recorded: true,
            outcome: 'Rescheduled · Tuesday, Aug 11 at 6:30 (old Thursday slot cancelled)',
            turns: [
                { who: 'agent',  text: "Thanks for calling Advanced Family Dental of Naperville. This is Mira. How can I help you today?" },
                { who: 'caller', text: "I'm here. I need to reschedule my appointment." },
                { who: 'agent',  text: "Sure, let's get that moved. What's your first and last name?" },
                { who: 'caller', text: "Mike Ryan." },
                { who: 'agent',  text: "So that's Mike, M-I-K-E, Ryan, R-Y-A-N, right?" },
                { who: 'caller', text: "Yep." },
                { who: 'agent',  text: "Okay. What's your date of birth?" },
                { who: 'caller', text: "December thirteenth nineteen sixty five." },
                { who: 'agent',  text: "I see your checkup and cleaning on Thursday, August 6th at" },
                { who: 'caller', text: "Yeah. That's him. Yeah, that's the one I need to" },
                { who: 'agent',  text: "4:30. Is that the one you want to move?" },
                { who: 'caller', text: "move." },
                { who: 'agent',  text: "Okay. What day works better for you?" },
                { who: 'caller', text: "What's available? Next available?" },
                { who: 'agent',  text: "Let me check. Do you want the first opening, or should I just keep it to" },
                { who: 'caller', text: "Let me" },
                { who: 'agent',  text: "mornings or afternoons?" },
                { who: 'caller', text: "give you a date. Think I asked you before to find the first available and that didn't work. Do you have anything on on Tuesday. The eleventh of August." },
                { who: 'agent',  text: "Give me just a second to check Tuesday." },
                { who: 'caller', text: "Sure. Yeah. That works. Yeah. That" },
                { who: 'agent',  text: "I see an opening at 6:30. Does that work for you?" },
                { who: 'caller', text: "works. You move me?" },
                { who: 'agent',  text: "So that's Tuesday, August 11th at 6:30 for your checkup and cleaning. Should I go" },
                { who: 'caller', text: "Awesome." },
                { who: 'agent',  text: "ahead and book it?" },
                { who: 'caller', text: "Please. Yeah. Go ahead." },
                { who: 'agent',  text: "Perfect, I'll get that set" },
                { who: 'caller', text: "Thank you." },
                { who: 'agent',  text: "up. And I'll cancel the old Thursday spot right now. You're all set." },
                { who: 'caller', text: "Hey. Thanks, Neil." },
                { who: 'agent',  text: "You're all set. Bye." }
            ]
        },
        faq: {
            label: 'Answering FAQs',
            agent: AGENT,
            practice: PRACTICE,
            outcome: '3 questions answered · offered to book',
            turns: [
                { who: 'agent',  text: "Thanks for calling Advanced Family Dental of Naperville, this is Mira. How can I help?" },
                { who: 'caller', text: "Do you take Delta Dental insurance?" },
                { who: 'agent',  text: "Yes, we're in-network with Delta Dental PPO plans. I can verify your specific coverage if you'd like." },
                { who: 'caller', text: "Good to know. And where are you located?" },
                { who: 'agent',  text: "We're at 1516 North Naper Boulevard, Suite 200, with free parking right out front." },
                { who: 'caller', text: "What are your hours?" },
                { who: 'agent',  text: "We're open Monday through Friday, 8 AM to 5 PM, and Saturdays until noon. Would you like me to book you a cleaning?" },
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
    const subEl = section.querySelector('.callcard-sub');
    const noteEl = section.querySelector('.callcard-note');
    const outcomeEl = section.querySelector('.callcard-outcome');
    const outcomeText = section.querySelector('.callcard-outcome-text');

    let current = 'rescheduling';
    let runId = 0;
    let playing = false;
    let soundOn = true; // sound on by default (real audio or browser voice)
    let timerHandle = null;
    let seconds = 0;
    let audioEl = null; // active HTMLAudioElement for recorded scenarios

    function fmt(s) {
        s = Math.max(0, Math.floor(s));
        const m = Math.floor(s / 60);
        const r = s % 60;
        return m + ':' + (r < 10 ? '0' : '') + r;
    }

    function stopSpeech() { if (canSpeak) window.speechSynthesis.cancel(); }

    function stopAudio() {
        if (audioEl) { try { audioEl.pause(); } catch (e) {} audioEl.src = ''; audioEl = null; }
    }

    function updateHeader() {
        const d = SCENARIOS[current];
        subEl.innerHTML = 'Answered by <b></b> · <span></span>';
        subEl.querySelector('b').textContent = d.agent;
        subEl.querySelector('span').textContent = d.practice;
        noteEl.textContent = d.recorded
            ? 'Real recorded call · ' + d.practice + '. Tap the speaker to mute.'
            : 'Illustrative script, spoken by your browser. Tap the speaker to mute.';
    }

    function reset(showPlaceholder) {
        runId++;
        playing = false;
        clearInterval(timerHandle);
        seconds = 0;
        timerEl.textContent = '0:00';
        stopSpeech();
        stopAudio();
        card.classList.remove('is-playing');
        playIcon.className = 'fas fa-play';
        playLabel.textContent = SCENARIOS[current].recorded ? 'Play recording' : 'Play call';
        outcomeEl.hidden = true;
        transcript.innerHTML = '';
        if (showPlaceholder) {
            const p = document.createElement('p');
            p.className = 'callcard-placeholder';
            p.textContent = (SCENARIOS[current].recorded ? 'Press play to hear a real ' : 'Press play to hear a ')
                + SCENARIOS[current].label.toLowerCase() + ' call answered by ' + SCENARIOS[current].agent + '.';
            transcript.appendChild(p);
        }
    }

    function addTurn(turn) {
        const el = document.createElement('div');
        el.className = 'callcard-turn callcard-turn--' + turn.who;
        const who = document.createElement('span');
        who.className = 'callcard-turn-who';
        who.textContent = turn.who === 'agent' ? SCENARIOS[current].agent : 'Caller';
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
        playLabel.textContent = SCENARIOS[current].recorded ? 'Replay recording' : 'Replay call';
        outcomeText.textContent = SCENARIOS[current].outcome;
        outcomeEl.hidden = false;
    }

    // Recorded scenario: play the real audio and reveal transcript turns in sync.
    // Per-turn timing is estimated from cumulative text length against the audio's
    // duration (no per-line timestamps available), so it tracks closely but not to
    // the exact word.
    function playRecorded(data, myRun) {
        // Weight each turn by its length plus a fixed per-turn overhead (pauses).
        const weights = data.turns.map(t => t.text.length + 14);
        const total = weights.reduce((a, w) => a + w, 0) || 1;
        const startFrac = [];
        let acc = 0;
        for (let k = 0; k < weights.length; k++) { startFrac.push(acc / total); acc += weights[k]; }

        let revealed = 0;
        audioEl = new Audio(data.audio);
        audioEl.preload = 'metadata';
        audioEl.muted = !soundOn;

        audioEl.addEventListener('timeupdate', function () {
            if (myRun !== runId) return;
            const dur = audioEl.duration || 0;
            timerEl.textContent = fmt(audioEl.currentTime);
            if (!dur) return;
            while (revealed < data.turns.length && audioEl.currentTime >= startFrac[revealed] * dur) {
                addTurn(data.turns[revealed++]);
            }
        });
        audioEl.addEventListener('ended', function () {
            if (myRun !== runId) return;
            while (revealed < data.turns.length) addTurn(data.turns[revealed++]);
            finish(myRun);
        });
        audioEl.addEventListener('error', function () {
            if (myRun !== runId) return;
            // If the audio can't load/play, fall back to showing the full transcript.
            while (revealed < data.turns.length) addTurn(data.turns[revealed++]);
            finish(myRun);
        });

        if (reduce) data.turns.forEach(function (t) { addTurn(t); revealed++; });

        const p = audioEl.play();
        if (p && p.catch) {
            p.catch(function () {
                if (myRun !== runId) return;
                // Autoplay blocked: reveal the transcript so the call still "plays" visually.
                while (revealed < data.turns.length) addTurn(data.turns[revealed++]);
                finish(myRun);
            });
        }
    }

    // Scripted scenario: browser voice + timed reveal.
    function playScripted(data, myRun) {
        timerHandle = setInterval(function () {
            if (myRun !== runId) return;
            seconds++; timerEl.textContent = fmt(seconds);
        }, 1000);

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
                    let advanced = false;
                    const advance = function () {
                        if (advanced || myRun !== runId) return;
                        advanced = true; next();
                    };
                    if (soundOn && canSpeak) { speak(turn.text, advance); setTimeout(advance, gap + 3500); }
                    else { setTimeout(advance, gap); }
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

    function play() {
        const data = SCENARIOS[current];
        reset(false);
        const myRun = runId;
        playing = true;
        card.classList.add('is-playing');
        playIcon.className = 'fas fa-pause';
        playLabel.textContent = 'Playing…';
        if (data.audio) playRecorded(data, myRun);
        else playScripted(data, myRun);
    }

    playBtn.addEventListener('click', function () {
        if (playing) { reset(true); return; }
        play();
    });

    muteBtn.addEventListener('click', function () {
        soundOn = !soundOn;
        muteBtn.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
        muteIcon.className = soundOn ? 'fas fa-volume-high' : 'fas fa-volume-xmark';
        if (audioEl) audioEl.muted = !soundOn;
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
            updateHeader();
            reset(true);
        });
    });

    // Stop audio if the user leaves the tab.
    document.addEventListener('visibilitychange', function () {
        if (document.hidden && playing) reset(true);
    });

    updateHeader();
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
