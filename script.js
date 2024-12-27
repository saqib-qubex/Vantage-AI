document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeDropdowns();
    initializeHamburgerMenu();
    initializeSmoothScroll();
    initializeNavbarScroll();
    initializeHeroVideo();

    // Bootstrap Dropdown Initialization
    function initializeDropdowns() {
        var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
        var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
            return new bootstrap.Dropdown(dropdownToggleEl);
        });
    }

    // Hamburger Menu
    function initializeHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger-icon');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (hamburger && navbarCollapse) {
            // Add click event to hamburger
            hamburger.parentElement.addEventListener('click', function(e) {
                hamburger.classList.toggle('active');
            });
            
            // Handle navbar show/hide events
            navbarCollapse.addEventListener('show.bs.collapse', function () {
                hamburger.classList.add('active');
            });
            
            navbarCollapse.addEventListener('hide.bs.collapse', function () {
                hamburger.classList.remove('active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.navbar') && navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                    hamburger.classList.remove('active');
                }
            });

            // Handle window resize
            let resizeTimer;
            window.addEventListener('resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    if (window.innerWidth >= 992 && navbarCollapse.classList.contains('show')) {
                        bootstrap.Collapse.getInstance(navbarCollapse).hide();
                        hamburger.classList.remove('active');
                    }
                }, 250);
            });
        }
    }

    // Smooth Scrolling
    function initializeSmoothScroll() {
        const scrollToElement = (element) => {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        };

        // Handle all feature links
        document.querySelectorAll('a[href*="#features"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const featuresSection = document.querySelector('#features');
                if (featuresSection) {
                    scrollToElement(featuresSection);
                }
            });
        });

        // Handle other anchor links
        document.querySelectorAll('a[href^="#"]:not([href*="#features"])').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    scrollToElement(target);
                }
            });
        });
    }

    // Navbar Scroll Behavior
    function initializeNavbarScroll() {
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
    }

    // Hero Video Playback Handler
    function initializeHeroVideo() {
        const videoContainer = document.querySelector('.video-container');
        const video = document.querySelector('.product-demo-video');
        const playPauseBtn = document.querySelector('.play-pause-btn');
        
        if (!videoContainer || !video || !playPauseBtn) return;
        
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

        // Add click event to play/pause button
        playPauseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            togglePlayPause();
        });

        // Add click event to video container
        videoContainer.addEventListener('click', (e) => {
            if (e.target !== playPauseBtn && !playPauseBtn.contains(e.target)) {
                togglePlayPause();
            }
        });

        // Update play/pause button state when video state changes
        video.addEventListener('play', () => {
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause');
        });

        video.addEventListener('pause', () => {
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
        });

        // Ensure video restarts playing when it ends
        video.addEventListener('ended', () => {
            if (video.loop) {
                video.play();
            }
        });

        // Handle visibility change to pause/play video
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                video.pause();
            } else if (isPlaying) {
                video.play();
            }
        });
    }
});