// Basic interactions for Madelyn Torff Portfolio

const instagramLink = 'https://www.instagram.com/yourusername/';

// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500); // Wait for transition to finish
        }, 1000); // 1 second delay
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .hero-btns a, .footer-social a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for sticky header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Form Submission Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            console.log('Form Submitted:', data);
            
            // Show success state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#4CAF50';
            submitBtn.style.color = 'white';
            submitBtn.disabled = true;
            
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // Scroll reveal animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add classes to animate elements on scroll
    const animateElements = document.querySelectorAll('.section-title, .project-card, .about-content, .about-visual');
    
    // Add base transition styles in JS to avoid flash
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

// Update Instagram buttons with the configured link
    const instagramButton = document.getElementById('instagramLink');
    const footerInstagramButton = document.getElementById('footerInstagramLink');
    if (instagramButton) instagramButton.href = instagramLink;
    if (footerInstagramButton) footerInstagramButton.href = instagramLink;

    // Handle reveal class in CSS via JS addition
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .reveal {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);
});
