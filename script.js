/* ===================================
   WEDDING INVITATION - JAVASCRIPT
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeEnvelope();
    initializeCountdown();
    initializeScrollAnimations();
    initializeGalleryLightbox();
    initializeRSVP();
    initializeMusicControl();
    initializeNavigation();
    initializeBackToTop();
    initializeFloatingParticles();
});

/* ===================================
   ENVELOPE OPENING ANIMATION
   =================================== */

function initializeEnvelope() {
    const envelope = document.getElementById('envelope');
    const mainContent = document.getElementById('main-content');
    const envelopeSection = document.getElementById('envelope-section');
    const navbar = document.getElementById('navbar');

    envelope.addEventListener('click', function() {
        // Add open class for 3D transformation
        envelope.classList.add('open');

        // Create particles burst effect
        createEnvelopeParticles();

        // After flap animation, show main content
        setTimeout(() => {
            mainContent.classList.add('visible');
            navbar.classList.add('visible');
            
            // Hide envelope section with fade out
            setTimeout(() => {
                envelopeSection.style.opacity = '0';
                envelopeSection.style.pointerEvents = 'none';
                setTimeout(() => {
                    envelopeSection.style.display = 'none';
                }, 600);
            }, 400);
        }, 1000);
    });

    // Add keyboard trigger (Enter key)
    envelope.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            envelope.click();
        }
    });

    // Make envelope focusable
    envelope.setAttribute('tabindex', '0');
    envelope.style.cursor = 'pointer';
}

function createEnvelopeParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 6 + 2;
        const xPos = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
        const yPos = window.innerHeight / 2 + (Math.random() - 0.5) * 150;
        const duration = Math.random() * 1.5 + 1.5;
        const color = Math.random() > 0.5 ? '#D4AF6A' : '#0F6B50';

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = xPos + 'px';
        particle.style.top = yPos + 'px';
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        particle.style.animation = `burst-out ${duration}s ease-out forwards`;
        particle.style.opacity = '0.8';

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
}


/* ===================================
   COUNTDOWN TIMER
   =================================== */

function initializeCountdown() {
    const weddingDate = new Date('December 20, 2026 10:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        if (timeLeft < 0) {
            // Wedding has passed
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            document.getElementById('countdown-message').textContent = 'Today is the Day! ❤️';
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    // Update immediately
    updateCountdown();

    // Update every second
    setInterval(updateCountdown, 1000);
}

/* ===================================
   SCROLL ANIMATIONS
   =================================== */

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.getAttribute('data-animate');
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

/* ===================================
   GALLERY LIGHTBOX
   =================================== */

function initializeGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Expose for HTML onclick
window.closeLightbox = closeLightbox;

/* ===================================
   RSVP FORM VALIDATION
   =================================== */

function initializeRSVP() {
    const form = document.getElementById('rsvp-form');
    const confirmation = document.getElementById('rsvp-confirmation');
    const googleFormUrl = form.dataset.googleFormUrl || '';

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullname = document.getElementById('fullname').value.trim();
        const guests = document.getElementById('guests').value;
        const attendance = document.querySelector('input[name="attendance"]:checked');
        const message = document.getElementById('message').value.trim();

        if (!fullname || !guests || !attendance) {
            alert('Please fill in all required fields.');
            return;
        }

        if (!googleFormUrl || googleFormUrl === 'PASTE_YOUR_GOOGLE_FORM_LINK_HERE') {
            alert('Please add your Google Form URL in index.html on the RSVP form.');
            return;
        }

        const attendanceValue = attendance.value;
        form.classList.add('hidden');
        confirmation.classList.remove('hidden');
        confirmation.querySelector('.confirmation-message').textContent = 'Redirecting you to our Google Form...';

        const params = new URLSearchParams({
            fullname: fullname,
            guests: guests,
            attendance: attendanceValue,
            message: message
        });

        const fullUrl = googleFormUrl.includes('?')
            ? `${googleFormUrl}&${params.toString()}`
            : `${googleFormUrl}?${params.toString()}`;

        window.open(fullUrl, '_blank', 'noopener,noreferrer');

        console.log('RSVP redirecting to Google Form:', {
            name: fullname,
            guests: guests,
            attendance: attendanceValue,
            message: message,
            url: fullUrl,
            timestamp: new Date().toISOString()
        });
    });
}

/* ===================================
   MUSIC CONTROL
   =================================== */

function initializeMusicControl() {
    const musicBtn = document.getElementById('music-btn');
    const audio = document.getElementById('background-music');

    musicBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            musicBtn.classList.add('playing');
        } else {
            audio.pause();
            musicBtn.classList.remove('playing');
        }
    });

    // Note: Audio playback requires user interaction
    // Browsers block autoplay of audio with sound
}

/* ===================================
   NAVIGATION MENU
   =================================== */

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const section = document.querySelector(href);
            
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ===================================
   BACK TO TOP BUTTON
   =================================== */

function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ===================================
   FLOATING PARTICLES
   =================================== */

function initializeFloatingParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = window.innerWidth < 768 ? 15 : 30;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 8 + 3;
        const xPos = Math.random() * window.innerWidth;
        const yPos = window.innerHeight + 10;
        const duration = Math.random() * 8 + 10;
        const delay = Math.random() * 2;
        const opacity = Math.random() * 0.5 + 0.3;
        const color = Math.random() > 0.5 ? '#D4AF6A' : '#0F6B50';

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = xPos + 'px';
        particle.style.top = yPos + 'px';
        particle.style.opacity = opacity;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        particle.style.animation = `float ${duration}s linear ${delay}s infinite`;

        container.appendChild(particle);

        // Remove particle after animation completes
        setTimeout(() => {
            particle.style.opacity = '0';
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }, (duration + delay) * 1000);
    }

    // Create particles on intervals
    const particleInterval = setInterval(() => {
        if (container.children.length < particleCount) {
            createParticle();
        }
    }, 300);

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(particleInterval);
    });
}

/* ===================================
   LOCATION MAP POPUP
   =================================== */

window.showMap = function(type) {
    let venue, location;

    if (type === 'ceremony') {
        venue = 'The Emerald Garden';
        location = 'Laoag City, Ilocos Norte';
    } else {
        venue = 'The Emerald Ballroom';
        location = 'Laoag City, Ilocos Norte';
    }

    alert(`${venue}\n${location}\n\nIn a real website, this would open a map or directions app.`);
};

/* ===================================
   ADDITIONAL FEATURES
   =================================== */

// Smooth scroll on all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#envelope-section' && href !== '#home' && href !== '#' && !href.includes('nav')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Prevent default on location buttons
document.querySelectorAll('.location-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
    });
});

// Add console message
console.log('%cWelcome to Shannel & Randy\'s Wedding Invitation', 'font-family: serif; font-size: 24px; color: #0F6B50; font-weight: bold;');
console.log('%cMade with ❤️ using HTML, CSS, and vanilla JavaScript', 'font-family: sans-serif; font-size: 14px; color: #D4AF6A;');
