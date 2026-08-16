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
    initializeLeadForm();
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
        // FAQ = real recorded call. Transcript is verbatim from the recording.
        faq: {
            label: 'Answering FAQs',
            agent: AGENT,
            practice: PRACTICE,
            audio: 'assets/mira-faq.wav',
            recorded: true,
            outcome: 'Insurance, hours, provider & treatment questions answered · caller will call back',
            turns: [
                { who: 'agent',  text: "Thanks for calling Advanced Family Dental of Naperville. This is Mira. How can I help you today?" },
                { who: 'caller', text: "Amy, I need to check what kind of insurance you guys take" },
                { who: 'agent',  text: "We take most traditional plans. We don't do HMOs, but we can usually file claims for out-of-network plans. What insurance do you have?" },
                { who: 'caller', text: "Well, I have a PPO, so that's a good thing. I have couple of more questions before I make the appointment. Who are the dentists there?" },
                { who: 'agent',  text: "We only have one dentist here, Dr. Nasima Thobani. She's the main provider. What else did you want to know?" },
                { who: 'caller', text: "What are the office hours during the week and where you guys are located?" },
                { who: 'agent',  text: "We're at 609 South Route 59 in Aurora, right by Naperville. Weekdays are Monday nine to six, Tuesday nine to seven, Wednesday closed, Thursday nine to six, and Friday nine to four. Saturdays are eight to two." },
                { who: 'caller', text: "I see. And what else I have? How long he and Doctor. Tabani has been practicing here?" },
                { who: 'agent',  text: "She's been practicing since the nineteen nineties, and she bought the practice after working in Chicago. Want me to get you set up for a first visit?" },
                { who: 'caller', text: "One more questions I have. Does she does in the office Invisalign and braces." },
                { who: 'agent',  text: "She does Invisalign here. For traditional braces, that usually gets referred out. Want me to get a first visit set up?" },
                { who: 'caller', text: "One last question before. Do you guys kinda see kids Does doctor Mussavani sees kids and elderly patients like people in Medicaid," },
                { who: 'agent',  text: "She sees kids, adults, and older patients. The part to watch out for is Medicaid — we don't take those plans here. Want me to go ahead and get" },
                { who: 'caller', text: "And does she does, like," },
                { who: 'agent',  text: "you set up for a first visit?" },
                { who: 'caller', text: "a ventures and brace crowns and other those kind of treatments?" },
                { who: 'agent',  text: "Yeah, she does a lot of general work, including crowns, dentures, Invisalign, and braces. If something needs a specialist, they'll let you know upfront. Want me to go ahead and set up that" },
                { who: 'caller', text: "No." },
                { who: 'agent',  text: "first visit?" },
                { who: 'caller', text: "Let me think about it and call you back. But really appreciate your time and giving me all the addressing my questions. You so much." },
                { who: 'agent',  text: "No problem. Glad I could" },
                { who: 'caller', text: "Take care." },
                { who: 'agent',  text: "help. Have a good night." }
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

/**
 * Custom multi-step lead form ("Contact Us" / "Get Started").
 * Replaces the Typeform popup. One question at a time, keyboard-friendly,
 * posts to the CRM lead endpoint. Honors prefers-reduced-motion.
 */
function initializeLeadForm() {
    const triggers = document.querySelectorAll('[data-open-lead]');
    if (!triggers.length) return;

    const ENDPOINT = 'https://app.getvantage.tech/api/leads';

    const QUESTIONS = [
        { key: 'practiceName', type: 'text', eyebrow: "Let's get you set up", q: 'What’s your practice name?', placeholder: 'e.g. Advanced Family Dental', required: true },
        { key: 'contactName', type: 'text', q: 'And your name?', placeholder: 'First and last name', required: true },
        { key: 'workEmail', type: 'email', q: 'What’s your work email?', hint: 'We’ll reach out here — no spam, ever.', placeholder: 'you@practice.com', required: true },
        { key: 'practiceWebsite', type: 'url', q: 'Your practice website?', hint: 'Optional — helps us tailor the demo.', placeholder: 'https://', required: false },
        { key: 'practiceType', type: 'choice', q: 'What type of practice?', options: ['Dental', 'Primary care', 'Specialty clinic', 'Multi-specialty', 'Other'] },
        { key: 'providerCount', type: 'choice', q: 'How many providers?', options: ['1', '2-5', '6-10', '11+'] },
        { key: 'automationFocus', type: 'choice', q: 'Where would automation help most right now?', options: ['Answering calls', 'Scheduling & reminders', 'Follow-ups & reactivation', 'All of the above'] }
    ];

    const total = QUESTIONS.length;
    const answers = {};
    let step = 0;
    let source = '';
    let lastFocus = null;

    // Build the overlay once.
    const overlay = document.createElement('div');
    overlay.className = 'lead-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Get started with VantageAI');
    overlay.innerHTML = `
        <div class="lead-modal">
            <div class="lead-progress"><div class="lead-progress-fill"></div></div>
            <div class="lead-topbar">
                <span class="lead-step-count"></span>
                <button class="lead-close" type="button" aria-label="Close">&times;</button>
            </div>
            <div class="lead-body"></div>
            <p class="lead-legal">By submitting, you agree to our <a href="privacy.html" target="_blank" rel="noopener">Privacy Policy</a>. We’ll only use your details to contact you about VantageAI.</p>
            <input class="lead-hp" type="text" tabindex="-1" autocomplete="off" aria-hidden="true" name="company" placeholder="Company">
        </div>`;
    document.body.appendChild(overlay);

    const modal = overlay.querySelector('.lead-modal');
    const body = overlay.querySelector('.lead-body');
    const fill = overlay.querySelector('.lead-progress-fill');
    const countEl = overlay.querySelector('.lead-step-count');
    const closeBtn = overlay.querySelector('.lead-close');
    const honeypot = overlay.querySelector('.lead-hp');

    const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

    function open(src) {
        source = src || 'Website';
        step = 0;
        Object.keys(answers).forEach((k) => delete answers[k]);
        honeypot.value = '';
        lastFocus = document.activeElement;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        render();
    }

    function close() {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function setProgress() {
        fill.style.width = (step / total) * 100 + '%';
        countEl.textContent = 'Question ' + (step + 1) + ' of ' + total;
    }

    function render() {
        setProgress();
        const item = QUESTIONS[step];
        const isLast = step === total - 1;
        let inner = '';
        if (item.eyebrow) inner += `<p class="lead-eyebrow">${esc(item.eyebrow)}</p>`;
        inner += `<h3 class="lead-question">${item.q}</h3>`;
        if (item.hint) inner += `<p class="lead-hint">${esc(item.hint)}</p>`;

        if (item.type === 'choice') {
            inner += '<div class="lead-choices">';
            item.options.forEach((opt, i) => {
                const sel = answers[item.key] === opt ? ' selected' : '';
                inner += `<button class="lead-choice${sel}" type="button" data-opt="${esc(opt)}">
                    <span class="lead-choice-key">${i + 1}</span><span>${esc(opt)}</span></button>`;
            });
            inner += '</div>';
        } else {
            const val = answers[item.key] ? ' value="' + esc(answers[item.key]) + '"' : '';
            const it = item.type === 'email' ? 'email' : (item.type === 'url' ? 'url' : 'text');
            inner += `<input class="lead-input" type="${it}" inputmode="${item.type === 'email' ? 'email' : 'text'}" placeholder="${esc(item.placeholder || '')}"${val} autocomplete="off">`;
        }
        inner += '<p class="lead-error-msg"></p>';
        inner += `<div class="lead-nav">
            <button class="lead-back" type="button"${step === 0 ? ' hidden' : ''}>&larr; Back</button>
            <button class="lead-next btn-primary btn-lg" type="button">${isLast ? 'Submit' : 'Continue'}</button>
        </div>`;
        body.innerHTML = inner;

        const input = body.querySelector('.lead-input');
        const nextBtn = body.querySelector('.lead-next');
        const backBtn = body.querySelector('.lead-back');
        const errEl = body.querySelector('.lead-error-msg');

        if (input) {
            setTimeout(() => input.focus(), 50);
            input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); next(); } });
        }
        body.querySelectorAll('.lead-choice').forEach((btn) => {
            btn.addEventListener('click', () => {
                answers[item.key] = btn.getAttribute('data-opt');
                body.querySelectorAll('.lead-choice').forEach((b) => b.classList.remove('selected'));
                btn.classList.add('selected');
                errEl.textContent = '';
                setTimeout(next, 220);
            });
        });
        nextBtn.addEventListener('click', next);
        if (backBtn) backBtn.addEventListener('click', () => { if (step > 0) { step--; render(); } });
    }

    function validate() {
        const item = QUESTIONS[step];
        const errEl = body.querySelector('.lead-error-msg');
        if (item.type === 'choice') {
            if (!answers[item.key]) { if (errEl) errEl.textContent = 'Please pick an option.'; return false; }
            return true;
        }
        const input = body.querySelector('.lead-input');
        const v = (input.value || '').trim();
        answers[item.key] = v;
        if (item.required && !v) { errEl.textContent = 'This field is required.'; input.focus(); return false; }
        if (item.type === 'email' && v && !emailOk(v)) { errEl.textContent = 'Please enter a valid email.'; input.focus(); return false; }
        if (errEl) errEl.textContent = '';
        return true;
    }

    function next() {
        if (!validate()) return;
        if (step < total - 1) { step++; render(); }
        else submit();
    }

    function showState(kind, title, msg, retry) {
        fill.style.width = '100%';
        countEl.textContent = '';
        const icon = kind === 'ok' ? '✓' : '!';
        body.innerHTML = `<div class="lead-state">
            <div class="lead-state-icon ${kind}">${icon}</div>
            <h3>${esc(title)}</h3>
            <p>${msg}</p>
            <div class="lead-nav" style="justify-content:center;margin-top:1.5rem;">
                ${retry ? '<button class="lead-next btn-primary btn-lg" type="button" style="margin:0;">Try again</button>'
                        : '<button class="lead-close-cta btn-primary btn-lg" type="button" style="margin:0;">Done</button>'}
            </div></div>`;
        const retryBtn = body.querySelector('.lead-next');
        if (retryBtn) retryBtn.addEventListener('click', () => { step = total - 1; render(); });
        const doneBtn = body.querySelector('.lead-close-cta');
        if (doneBtn) doneBtn.addEventListener('click', close);
    }

    async function submit() {
        const nextBtn = body.querySelector('.lead-next');
        if (nextBtn) { nextBtn.disabled = true; nextBtn.textContent = 'Sending…'; }
        const payload = {
            practiceName: answers.practiceName || '',
            contactName: answers.contactName || '',
            workEmail: answers.workEmail || '',
            practiceWebsite: answers.practiceWebsite || '',
            practiceType: answers.practiceType,
            providerCount: answers.providerCount,
            automationFocus: answers.automationFocus,
            source: source,
            company: honeypot.value || ''
        };
        try {
            const res = await fetch(ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error('bad status ' + res.status);
            showState('ok', 'You’re all set!', 'Thanks, ' + esc((answers.contactName || '').split(' ')[0] || 'there') + '. Our team will reach out at <strong>' + esc(answers.workEmail) + '</strong> shortly.', false);
        } catch (err) {
            showState('err', 'Something went wrong', 'We couldn’t submit your details. Please try again, or email <a href="mailto:support@getvantage.tech">support@getvantage.tech</a>.', true);
        }
    }

    // Wire triggers.
    triggers.forEach((t) => {
        t.addEventListener('click', (e) => {
            e.preventDefault();
            const label = (t.textContent || '').trim();
            const page = (location.pathname.split('/').pop() || 'index.html');
            open(label + ' · ' + page);
        });
    });

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) close();
        if (overlay.classList.contains('open') && /^[1-9]$/.test(e.key)) {
            const choices = body.querySelectorAll('.lead-choice');
            const idx = parseInt(e.key, 10) - 1;
            if (choices[idx]) choices[idx].click();
        }
    });
}
