// ============================================
// DOM Elements
// ============================================
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navbar = document.getElementById('navbar');
const menuOverlay = document.getElementById('menuOverlay');
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

// ============================================
// Mobile Menu Toggle
// ============================================
function toggleMenu() {
    const isActive = navbar.classList.contains('active');
    
    if (!isActive) {
        navbar.classList.add('active');
        menuOverlay.classList.add('active');
        hamburgerBtn.classList.add('active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    } else {
        closeMenu();
    }
}

function closeMenu() {
    navbar.classList.remove('active');
    menuOverlay.classList.remove('active');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMenu);
}

if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
}

// Close menu on window resize (if screen becomes desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navbar.classList.contains('active')) {
        closeMenu();
    }
});

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeMenu();
        }
    });
});

// ============================================
// Scroll Reveal Animation
// ============================================
function checkScrollReveal() {
    scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
}

// Initial check on load
window.addEventListener('load', () => {
    checkScrollReveal();
    
    // Set initial opacity for hero animations
    document.querySelectorAll('.animate-fade-up').forEach(el => {
        if (!el.classList.contains('animation-delay-1') && 
            !el.classList.contains('animation-delay-2')) {
            el.style.opacity = '1';
        }
    });
});

// Check on scroll with throttle for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        checkScrollReveal();
    });
});

// ============================================
// Form Validation Functions
// ============================================

// Helper function to show error
function showError(input, message, errorContainerId) {
    const errorElement = document.getElementById(errorContainerId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('visible');
    }
    input.classList.add('error');
    input.classList.remove('success');
}

// Helper function to show success
function showSuccess(input, errorContainerId) {
    const errorElement = document.getElementById(errorContainerId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('visible');
    }
    input.classList.remove('error');
    input.classList.add('success');
}

// Validate Name
function validateName(name, errorId) {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
    if (!name.value.trim()) {
        showError(name, 'Ce champ est requis', errorId);
        return false;
    }
    if (!nameRegex.test(name.value.trim())) {
        showError(name, 'Le nom doit contenir 2 à 50 lettres uniquement', errorId);
        return false;
    }
    showSuccess(name, errorId);
    return true;
}

// Validate Email
function validateEmail(email, errorId) {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'L\'adresse email est requise', errorId);
        return false;
    }
    if (!emailRegex.test(email.value.trim())) {
        showError(email, 'Veuillez entrer une adresse email valide (ex: nom@domaine.com)', errorId);
        return false;
    }
    showSuccess(email, errorId);
    return true;
}

// Validate Message
function validateMessage(message, errorId) {
    if (!message.value.trim()) {
        showError(message, 'Le message est requis', errorId);
        return false;
    }
    if (message.value.trim().length < 10) {
        showError(message, 'Le message doit contenir au moins 10 caractères', errorId);
        return false;
    }
    if (message.value.trim().length > 1000) {
        showError(message, 'Le message ne doit pas dépasser 1000 caractères', errorId);
        return false;
    }
    showSuccess(message, errorId);
    return true;
}

// Validate Subject
function validateSubject(subject, errorId) {
    if (!subject.value.trim()) {
        showError(subject, 'Le sujet est requis', errorId);
        return false;
    }
    if (subject.value.trim().length < 3) {
        showError(subject, 'Le sujet doit contenir au moins 3 caractères', errorId);
        return false;
    }
    showSuccess(subject, errorId);
    return true;
}

// ============================================
// Footer Form Validation (Index & About pages)
// ============================================
const footerForm = document.getElementById('contactForm');

if (footerForm) {
    footerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nom = document.getElementById('nom');
        const prenom = document.getElementById('prenom');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Get error containers
        const nomError = document.getElementById('nomError') || createErrorContainer('nom', footerForm);
        const prenomError = document.getElementById('prenomError') || createErrorContainer('prenom', footerForm);
        const emailError = document.getElementById('emailError') || createErrorContainer('email', footerForm);
        const messageError = document.getElementById('messageError') || createErrorContainer('message', footerForm);
        
        // Validate fields
        const isNomValid = validateName(nom, nomError.id);
        const isPrenomValid = validateName(prenom, prenomError.id);
        const isEmailValid = validateEmail(email, emailError.id);
        const isMessageValid = validateMessage(message, messageError.id);
        
        if (isNomValid && isPrenomValid && isEmailValid && isMessageValid) {
            // Simulate form submission
            const submitBtn = footerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Success message
                showNotification('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.', 'success');
                
                // Reset form
                footerForm.reset();
                
                // Remove validation styles
                [nom, prenom, email, message].forEach(input => {
                    input.classList.remove('success', 'error');
                });
                [nomError, prenomError, emailError, messageError].forEach(error => {
                    if (error) {
                        error.textContent = '';
                        error.classList.remove('visible');
                    }
                });
            }, 1500);
        }
    });
    
    // Add real-time validation for footer form
    addRealTimeValidation(footerForm);
}

// ============================================
// Contact Page Form Validation
// ============================================
const contactPageForm = document.getElementById('contactPageForm');

if (contactPageForm) {
    contactPageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nom = document.getElementById('contactNom');
        const email = document.getElementById('contactEmail');
        const sujet = document.getElementById('contactSujet');
        const message = document.getElementById('contactMessage');
        
        const isNomValid = validateName(nom, 'contactNomError');
        const isEmailValid = validateEmail(email, 'contactEmailError');
        const isSujetValid = validateSubject(sujet, 'contactSujetError');
        const isMessageValid = validateMessage(message, 'contactMessageError');
        
        if (isNomValid && isEmailValid && isSujetValid && isMessageValid) {
            const submitBtn = contactPageForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                showNotification('Votre message a été envoyé avec succès !', 'success');
                contactPageForm.reset();
                
                // Remove validation styles
                [nom, email, sujet, message].forEach(input => {
                    input.classList.remove('success', 'error');
                });
                ['contactNomError', 'contactEmailError', 'contactSujetError', 'contactMessageError'].forEach(errorId => {
                    const errorEl = document.getElementById(errorId);
                    if (errorEl) {
                        errorEl.textContent = '';
                        errorEl.classList.remove('visible');
                    }
                });
            }, 1500);
        }
    });
    
    // Add real-time validation for contact page form
    addRealTimeValidation(contactPageForm);
}

// ============================================
// Helper Functions
// ============================================

// Create error container dynamically if not exists
function createErrorContainer(fieldName, form) {
    const inputElement = document.getElementById(fieldName);
    if (!inputElement) return null;
    
    const errorId = `${fieldName}Error`;
    let errorElement = document.getElementById(errorId);
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.id = errorId;
        inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    }
    
    return errorElement;
}

// Add real-time validation
function addRealTimeValidation(form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const id = this.id;
            const errorId = `${id}Error`;
            
            if (id === 'nom' || id === 'contactNom' || id === 'prenom') {
                validateName(this, errorId);
            } else if (id === 'email' || id === 'contactEmail') {
                validateEmail(this, errorId);
            } else if (id === 'message' || id === 'contactMessage') {
                validateMessage(this, errorId);
            } else if (id === 'contactSujet') {
                validateSubject(this, errorId);
            }
        });
        
        input.addEventListener('input', function() {
            // Remove error styling while typing
            if (this.classList.contains('error')) {
                const errorId = `${this.id}Error`;
                const errorEl = document.getElementById(errorId);
                if (errorEl) {
                    errorEl.classList.remove('visible');
                }
                this.classList.remove('error');
            }
        });
    });
}

// Show notification
function showNotification(message, type = 'success') {
    // Check if notification container exists
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        // Add styles for notification
        const style = document.createElement('style');
        style.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .notification {
                padding: 16px 24px;
                border-radius: 12px;
                color: white;
                font-weight: 500;
                animation: slideIn 0.3s ease;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                max-width: 350px;
            }
            .notification.success {
                background: #48bb78;
            }
            .notification.error {
                background: #f56565;
            }
            .notification.info {
                background: #4299e1;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            .notification.hide {
                animation: slideOut 0.3s ease forwards;
            }
        `;
        document.head.appendChild(style);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notificationContainer.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Add active class to current page in navigation
// ============================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index_3.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

setActiveNavLink();

// ============================================
// Header Scroll Effect
// ============================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (header && !header.classList.contains('hero-small')) {
        if (currentScroll > 100) {
            header.style.backgroundAttachment = 'scroll';
        } else {
            header.style.backgroundAttachment = 'fixed';
        }
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Lazy Loading Images with Intersection Observer
// ============================================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.loading = 'lazy';
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Prevent form resubmission on page refresh
// ============================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ============================================
// Add touch support for mobile devices
// ============================================
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// ============================================
// Console log for development (remove in production)
// ============================================
console.log('CS Le Verger - Site web moderne chargé avec succès !');


// ============================================
// Newsletter Form Validation
// ============================================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email) {
            showNotification('Veuillez entrer votre adresse email', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        showNotification('Merci pour votre abonnement ! 🎉', 'success');
        emailInput.value = '';
    });
}