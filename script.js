// ================= MOBILE MENU TOGGLE =================
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        menuBtn.setAttribute('aria-label', 
            navLinks.classList.contains('open') ? 'Close navigation' : 'Open navigation'
        );
        menuBtn.textContent = navLinks.classList.contains('open') ? 'Close' : 'Menu';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuBtn.setAttribute('aria-label', 'Open navigation');
            menuBtn.textContent = 'Menu';
        });
    });
}

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without jumping
            history.pushState(null, '', targetId);
        }
    });
});

// ================= SCROLL ANIMATIONS =================
// Simple fade-in animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.querySelectorAll('.section, .hero-intro, .contact').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(section);
});

// Immediately show hero content
window.addEventListener('load', () => {
    const heroIntro = document.querySelector('.hero-intro');
    if (heroIntro) {
        setTimeout(() => {
            heroIntro.style.opacity = '1';
            heroIntro.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ================= ACTIVE NAV LINK HIGHLIGHTING =================
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinkItems.forEach(link => {
        link.style.color = '';
        link.style.borderBottom = '';
        
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#064e3b';
            link.style.borderBottom = '2px solid #064e3b';
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// ================= TYPING EFFECT (Optional) =================
// Add a subtle typing effect to the eyebrow text
const eyebrow = document.querySelector('.eyebrow');
if (eyebrow) {
    const originalText = eyebrow.textContent;
    const words = originalText.trim().split(' ');
    
    // Keep it simple - just animate the dot separator
    const dot = eyebrow.querySelector('span');
    if (dot) {
        setInterval(() => {
            dot.style.opacity = dot.style.opacity === '0' ? '1' : '0';
        }, 1000);
    }
}

// ================= CURRENT YEAR IN FOOTER =================
const footerYear = document.querySelector('footer span:first-child');
if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.textContent = `© ${year} SHARON GATUGI GIKUNDI`;
}

// ================= BACK TO TOP BUTTON (Optional) =================
// Create a back-to-top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

// Style the button
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #064e3b;
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.background = '#043d2e';
    backToTopBtn.style.transform = 'translateY(-4px)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.background = '#064e3b';
    backToTopBtn.style.transform = 'translateY(0)';
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show/hide back-to-top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// ================= KEYBOARD NAVIGATION =================
// Add keyboard shortcut for menu (Press 'M' to toggle menu)
document.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
        if (menuBtn && navLinks) {
            navLinks.classList.toggle('open');
            menuBtn.setAttribute('aria-label', 
                navLinks.classList.contains('open') ? 'Close navigation' : 'Open navigation'
            );
        }
    }
    
    // Escape key closes menu
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuBtn.textContent = 'Menu';
    }
});

// ================= PRINT FRIENDLY =================
// Add print functionality
window.addEventListener('beforeprint', () => {
    // Show all sections before printing
    document.querySelectorAll('.section, .hero-intro, .contact').forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'none';
    });
});

console.log('Website loaded successfully - Sharon Gatugi Gikundi');
