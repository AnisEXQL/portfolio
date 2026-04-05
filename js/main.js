// Menu mobile toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// 3D Tilt Effect - SMOOTH AND SLOW
function initTiltEffect(selector) {
    const cards = document.querySelectorAll(selector);
    
    cards.forEach(card => {
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        let animationId = null;
        
        const animate = () => {
            // Smooth interpolation (lerp) - lower value = slower
            currentX += (targetX - currentX) * 0.06;
            currentY += (targetY - currentY) * 0.06;
            
            card.style.transform = `perspective(1000px) rotateX(${currentY}deg) rotateY(${currentX}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Continue animation if not at target
            if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
                animationId = requestAnimationFrame(animate);
            }
        };
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            targetX = (x - centerX) / 12;
            targetY = (centerY - y) / 12;
            
            if (!animationId) {
                animationId = requestAnimationFrame(animate);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;
            
            if (!animationId) {
                animationId = requestAnimationFrame(animate);
            }
            
            // Reset after animation completes
            setTimeout(() => {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            }, 600);
        });
    });
}

// Apply tilt effect to project cards and competence cards
initTiltEffect('.project-card');
initTiltEffect('.competence-card');

// Form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Message envoyé ! (Formulaire de démonstration)');
        this.reset();
    });
}

// Effet de survol amélioré pour les cartes compétences cliquables
document.querySelectorAll('a.competence-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Animation d'entrée pour le tableau de compétences
const tableauObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

const tableauCompetences = document.querySelector('.tableau-competences');
if (tableauCompetences) {
    tableauCompetences.style.opacity = '0';
    tableauCompetences.style.transform = 'translateY(30px)';
    tableauCompetences.style.transition = 'all 0.8s ease';
    tableauObserver.observe(tableauCompetences);
}

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

document.addEventListener('keydown', (e) => {
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J')
    ) {
        e.preventDefault();
    }
});

document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
