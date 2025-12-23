// script.js - 100% MOBILE RESPONSIVE GUPTA PROPERTIES WEBSITE
document.addEventListener('DOMContentLoaded', function () {

    console.log('🚀 Gupta Properties - Mobile Responsive Loaded! 📱💻');

    // ========================================
    // 1. PRELOADER
    // ========================================
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function () {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        });
    }

    // ========================================
    // 2. MOBILE HAMBURGER MENU
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    function toggleMobileMenu() {
        if (hamburger && navMenu) {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevent body scroll on mobile menu open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                hamburger.classList.remove('active');
                navMenu?.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close mobile menu on nav link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // ========================================
    // 3. SMOOTH SCROLLING
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length === 0) return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerOffset = window.innerWidth <= 768 ? 80 : 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // 4. NAVBAR SCROLL EFFECT
    // ========================================
    let ticking = false;
    function updateNavbar() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255,255,255,0.98)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(255,255,255,0.95)';
                header.style.backdropFilter = 'blur(15px)';
            }
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // ========================================
    // 5. SCROLL ANIMATIONS (IntersectionObserver)
    // ========================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: window.innerWidth <= 768 ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // ========================================
    // 6. PROPERTY TABS
    // ========================================
    window.showTab = function (tabName) {
        if (navigator.vibrate) navigator.vibrate(30);

        const buttons = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');

        buttons.forEach(btn => btn.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));

        const activeBtn = Array.from(buttons).find(btn =>
            btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabName)
        );
        if (activeBtn) activeBtn.classList.add('active');

        const targetTab = document.getElementById(tabName);
        if (targetTab) targetTab.classList.add('active');
    };

    // ========================================
    // 7. GLOBAL FUNCTIONS (SCROLL / CALL)
    // ========================================
    window.scrollToContact = function () {
        const contact = document.getElementById('contact');
        if (!contact) return;
        contact.scrollIntoView({
            behavior: 'smooth',
            block: window.innerWidth <= 768 ? 'start' : 'center'
        });
    };

    // sab call buttons yahi function use kar रहे हैं
    window.callNumber = function (phoneNumber) {
        window.location.href = `tel:${phoneNumber}`;
    };

    // ========================================
    // 8. CONTACT FORM -> WHATSAPP (9958119191)
    // ========================================
    const MAIN_WHATSAPP = '919958119191'; // 9958119191 with country code

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = this.querySelector('input[type="text"]').value.trim();
            const phone = this.querySelector('input[type="tel"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim() || 'N/A';
            const property = this.querySelector('select').value;
            const message = this.querySelector('textarea').value.trim();

            if (!name || !phone || !property || !message) {
                alert('Please fill all required fields.');
                return;
            }

            const whatsappMsg = `🏠 *GUPTA PROPERTIES ENQUIRY* 🏠

👤 *Name:* ${name}
📱 *Phone:* ${phone}
✉️ *Email:* ${email}
🏘️ *Interested:* ${property}
💬 *Details:* ${message}

📞 *CALL ME NOW: ${phone}*
*Mithilesh Gupta - Rohini Delhi*`;

            const whatsappUrl =
                `https://wa.me/${MAIN_WHATSAPP}?text=${encodeURIComponent(whatsappMsg)}`;

            window.open(whatsappUrl, '_blank');

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '✅ Sent to 9958119191!';
            btn.style.background = '#28a745';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                this.reset();
            }, 3000);
        });
    }

    // ========================================
    // 9. VIDEO CONTROLS (MOBILE + DESKTOP)
    // ========================================
    document.querySelectorAll('video').forEach(video => {
        // Mobile: tap to play/pause
        video.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }, { passive: false });

        // Desktop: hover play / leave stop (sirf un videos pe jinke controls nahi)
        video.addEventListener('mouseenter', () => {
            if (!video.hasAttribute('controls')) video.play();
        });

        video.addEventListener('mouseleave', () => {
            if (!video.hasAttribute('controls')) {
                video.pause();
                video.currentTime = 0;
            }
        });
    });

    // ========================================
    // 10. CARD HOVER / TOUCH EFFECTS
    // ========================================
    function addMobileHover() {
        const cards = document.querySelectorAll(
            '.property-card, .plot-card, .service-card, .office-card'
        );
        cards.forEach(card => {
            card.addEventListener('touchstart', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.style.transform = '';
                }, 120);
            });

            card.addEventListener('mouseenter', () => {
                if (window.innerWidth > 768) {
                    card.style.transform = 'translateY(-12px)';
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
    addMobileHover();

    // ========================================
    // 11. FLOATING WHATSAPP BUTTON (9958119191)
    // ========================================
    function createFloatingWhatsApp() {
        if (document.querySelector('.floating-whatsapp')) return;

        const whatsappBtn = document.createElement('a');
        whatsappBtn.href =
            `https://wa.me/${MAIN_WHATSAPP}?text=Hi%20Mithilesh%20Gupta,%20property%20details%20chahiye!`;
        whatsappBtn.target = '_blank';
        whatsappBtn.className = 'floating-whatsapp';
        whatsappBtn.innerHTML = `
            <i class="fab fa-whatsapp"></i>
            <span>9958119191</span>
        `;
        document.body.appendChild(whatsappBtn);
    }
    createFloatingWhatsApp();

    // ========================================
    // 12. BACK TO TOP BUTTON
    // ========================================
    function createBackToTop() {
        if (document.querySelector('.back-to-top')) return;

        const btn = document.createElement('button');
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.className = 'back-to-top';
        btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.appendChild(btn);
    }
    createBackToTop();

    // ========================================
    // 13. RESIZE HANDLER
    // ========================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.querySelectorAll('section').forEach(section => observer.observe(section));

            if (window.innerWidth > 768 && navMenu?.classList.contains('active')) {
                hamburger?.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }, 250);
    });

    // ========================================
    // 14. MOBILE CSS INJECTION (floating buttons etc.)
    // ========================================
    const mobileCSS = document.createElement('style');
    mobileCSS.id = 'mobile-responsive-css';
    mobileCSS.textContent = `
        .floating-whatsapp {
            position: fixed;
            bottom: ${window.innerWidth <= 480 ? '20px' : '25px'};
            right: ${window.innerWidth <= 480 ? '20px' : '25px'};
            background: #25D366;
            color: white;
            padding: 12px 18px;
            border-radius: 50px;
            font-weight: bold;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 8px 25px rgba(37,211,102,0.4);
            z-index: 10001;
            font-size: ${window.innerWidth <= 480 ? '0.9rem' : '1rem'};
            animation: bounce 2s infinite;
        }

        .floating-whatsapp i {
            font-size: 1.3rem;
        }

        .back-to-top {
            position: fixed;
            bottom: ${window.innerWidth <= 480 ? '85px' : '90px'};
            right: ${window.innerWidth <= 480 ? '20px' : '25px'};
            background: #28a745;
            color: white;
            border: none;
            border-radius: 50%;
            width: 52px;
            height: 52px;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 10000;
            display: none;
            box-shadow: 0 6px 20px rgba(40,167,69,0.4);
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-6px, 6px);
        }
        .hamburger.active span:nth-child(2) { opacity: 0; }
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }

        @keyframes bounce {
            0%,20%,50%,80%,100% { transform: translateY(0); }
            40% { transform: translateY(-12px); }
            60% { transform: translateY(-7px); }
        }

        @media (hover: none) and (pointer: coarse) {
            .property-card, .plot-card, .service-card, .office-card {
                transition: none;
            }
        }
    `;
    document.head.appendChild(mobileCSS);

    // ========================================
    // 15. BACK TO TOP VISIBILITY
    // ========================================
    window.addEventListener('scroll', () => {
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            backToTop.style.display =
                window.scrollY > (window.innerWidth <= 768 ? 300 : 400)
                    ? 'block'
                    : 'none';
        }
    });

    // ========================================
    // 16. PWA INSTALL PROMPT (READY)
    // ========================================
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });

    console.log('✅ 100% MOBILE RESPONSIVE - Ready for all devices!');
});
