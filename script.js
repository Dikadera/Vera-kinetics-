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
            // Close mobile menu if open
            const menuToggle = document.getElementById('mobile-menu');
            const nav = document.querySelector('.nav-links');
            if (menuToggle && nav) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }

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

// Update all Social links with configured constants
    const allInstagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
    allInstagramLinks.forEach(link => link.href = instagramLink);

    // Handle reveal class in CSS via JS addition
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .reveal {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);

    // --- Custom Energy Cursor ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Adding a slight delay to the outline for a trailing effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effects to interactive elements
        const interactives = document.querySelectorAll('a, button, input, textarea');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            });
        });
    }

    // --- Kinetic Particle System ---
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const canvas = document.createElement('canvas');
        particlesContainer.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        // Increased interaction radius
        const mouse = { x: null, y: null, radius: 250 };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });
        
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y, dx, dy, size, color) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.size = size;
                this.color = color;
                this.baseX = this.x;
                this.baseY = this.y;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > width || this.x < 0) this.dx = -this.dx;
                if (this.y > height || this.y < 0) this.dy = -this.dy;

                // Mouse interactivity (Psychokinetic Vortex effect)
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (mouse.x != null && distance < mouse.radius) {
                    // Pull towards mouse (attraction)
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    
                    // Add a perpendicular force for the swirl/vortex
                    let swirlForceX = forceDirectionY * force * 25; // Increased for more visible motion
                    let swirlForceY = -forceDirectionX * force * 25;
                    
                    // Stronger attraction + swirl
                    let directionX = forceDirectionX * force * 8 + swirlForceX;
                    let directionY = forceDirectionY * force * 8 + swirlForceY;
                    
                    this.x += directionX;
                    this.y += directionY;
                    
                    // Dynamic coloring when manipulated
                    this.color = 'rgba(109, 40, 217, 0.8)'; // purple flash when manipulated
                    this.size = this.baseSize * 2;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 20; // slow return
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 20;
                    }
                    this.color = this.baseColor;
                    this.size = this.baseSize;
                }

                this.x += this.dx;
                this.y += this.dy;
                this.draw();
            }
        }

        function initParticles() {
            particles = [];
            let numberOfParticles = (width * height) / 5000; // Increased Density
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 3) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let dx = (Math.random() * 3) - 1.5;
                let dy = (Math.random() * 3) - 1.5;
                // Quantum Yellow/Gold mix
                let color = Math.random() > 0.5 ? 'rgba(253, 196, 53, 0.6)' : 'rgba(234, 179, 8, 0.4)';
                
                let p = new Particle(x, y, dx, dy, size, color);
                p.baseColor = color;
                p.baseSize = size;
                particles.push(p);
            }
        }

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connectParticles();
        }

        function connectParticles() {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) 
                                 + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    
                    if (distance < (width/7) * (height/7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(253, 196, 53, ${opacityValue * 0.4})`; // Brighter lines
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        initParticles();
        animateParticles();
    }

    // --- Psychokinetic 3D Tilt Effect on Elements ---
    const tiltElements = document.querySelectorAll('.service-card, .project-card, .testimonial-card, .hero-img, .about-img, .contact-card');
    
    tiltElements.forEach(el => {
        el.style.transformStyle = 'preserve-3d';
        el.style.transition = 'transform 0.1s ease'; // fast response
        
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Psychokinetic pull logic: element tilts towards the cursor
            const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg tilt
            const rotateY = ((x - centerX) / centerX) * 15;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            el.style.transition = 'transform 0.5s ease'; // slower reset
            setTimeout(() => {
                el.style.transition = 'transform 0.1s ease';
            }, 500);
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinksList = document.querySelector('.nav-links');

    if (menuToggle && navLinksList) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksList.classList.toggle('active');
        });
    }

    const closeMenuBtn = document.querySelector('.close-menu-btn');
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinksList.classList.remove('active');
        });
    }
});
