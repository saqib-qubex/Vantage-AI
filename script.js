document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeDropdowns();
    initializeHamburgerMenu();
    initializeSmoothScroll();
    initializeNavbarScroll();
    initializeHeroVideo();
    initializeCalButtons();

    // Bootstrap Dropdown Initialization
    function initializeDropdowns() {
        var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
        dropdownElementList.map(function (dropdownToggleEl) {
            return new bootstrap.Dropdown(dropdownToggleEl);
        });
    }

    // Hamburger Menu
    function initializeHamburgerMenu() {
        const hamburgerBtn = document.querySelector('.navbar-toggler');
        const hamburgerIcon = document.querySelector('.hamburger-icon');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (hamburgerBtn && hamburgerIcon && navbarCollapse) {
            let bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });

            hamburgerBtn.addEventListener('click', function(e) {
                e.preventDefault();
                hamburgerIcon.classList.toggle('active');
                bsCollapse.toggle();
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!hamburgerBtn.contains(e.target) && 
                    !navbarCollapse.contains(e.target) && 
                    navbarCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                    hamburgerIcon.classList.remove('active');
                }
            });

            // Close menu when clicking on a nav item
            const navItems = navbarCollapse.querySelectorAll('.nav-link');
            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    if (navbarCollapse.classList.contains('show')) {
                        bsCollapse.hide();
                        hamburgerIcon.classList.remove('active');
                    }
                });
            });

            // Handle window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 992 && navbarCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                    hamburgerIcon.classList.remove('active');
                }
            });
        }
    }

    // Smooth Scrolling
    function initializeSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return; // Skip empty links
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Navbar Scroll Behavior
    function initializeNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;
        let scrollThreshold = 50;

        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Hero Video Playback Handler
    function initializeHeroVideo() {
        const videoContainer = document.querySelector('.video-container');
        const video = document.querySelector('.product-demo-video');
        const playPauseBtn = document.querySelector('.play-pause-btn');
        
        if (videoContainer && video && playPauseBtn) {
            const playPauseIcon = playPauseBtn.querySelector('i');
            let isPlaying = true;

            function togglePlayPause() {
                if (video.paused) {
                    video.play();
                    playPauseIcon.classList.remove('fa-play');
                    playPauseIcon.classList.add('fa-pause');
                    isPlaying = true;
                } else {
                    video.pause();
                    playPauseIcon.classList.remove('fa-pause');
                    playPauseIcon.classList.add('fa-play');
                    isPlaying = false;
                }
            }

            playPauseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                togglePlayPause();
            });

            videoContainer.addEventListener('click', function(e) {
                if (e.target !== playPauseBtn && !playPauseBtn.contains(e.target)) {
                    togglePlayPause();
                }
            });

            // Handle video state changes
            video.addEventListener('play', () => {
                playPauseIcon.classList.remove('fa-play');
                playPauseIcon.classList.add('fa-pause');
            });

            video.addEventListener('pause', () => {
                playPauseIcon.classList.remove('fa-pause');
                playPauseIcon.classList.add('fa-play');
            });

            video.addEventListener('ended', () => {
                if (video.loop) {
                    video.play();
                }
            });

            // Handle visibility change
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    video.pause();
                } else if (isPlaying) {
                    video.play();
                }
            });
        }
    }

    // Cal.com Button Initialization
    function initializeCalButtons() {
        const bookButtons = document.querySelectorAll('[data-cal-link]');
        bookButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const namespace = this.getAttribute('data-cal-namespace');
                if (window.Cal && namespace) {
                    window.Cal.ns[namespace].showModal();
                }
            });
        });
    }
});