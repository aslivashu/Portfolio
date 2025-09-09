// Portfolio Website JavaScript
// Interactive functionality for the portfolio

// Custom Alert System
function showCustomAlert(message, type = 'info') {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create alert container
    const alertContainer = document.createElement('div');
    alertContainer.className = `custom-alert ${type}`;
    
    // Set icon based on type
    const icons = {
        success: '✓',
        error: '⚠',
        info: 'ℹ',
        warning: '⚡'
    };

    alertContainer.innerHTML = `
        <div class="alert-content">
            <div class="alert-icon">${icons[type] || icons.info}</div>
            <div class="alert-message">${message}</div>
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
        <div class="alert-progress"></div>
    `;

    // Add to document
    document.body.appendChild(alertContainer);

    // Animate in
    setTimeout(() => {
        alertContainer.classList.add('show');
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertContainer && alertContainer.parentElement) {
            alertContainer.classList.remove('show');
            setTimeout(() => {
                if (alertContainer && alertContainer.parentElement) {
                    alertContainer.remove();
                }
            }, 300);
        }
    }, 5000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Scroll Progress Bar
    const scrollProgress = document.querySelector('.scroll-progress');
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
    }
    
    // Update scroll progress on scroll
    window.addEventListener('scroll', updateScrollProgress);

    // Scroll Arrow visibility functionality with smooth scroll-based fade
    const scrollArrow = document.querySelector('.scroll-arrow');
    const aboutSection = document.getElementById('about');
    let lastScrollTop = 0;
    let ticking = false;

    function handleScrollArrow() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const aboutSectionTop = aboutSection ? aboutSection.offsetTop : 800;
        const homeHeight = aboutSectionTop;
        
        if (scrollArrow && currentScrollTop < homeHeight) {
            // Calculate smooth fade based on scroll amount
            const maxScrollForFade = homeHeight * 0.7; // Fade completely by 70% of home section
            
            // Calculate opacity based on how much user has scrolled
            let opacity = 1;
            if (currentScrollTop > 0) {
                opacity = Math.max(0, 1 - (currentScrollTop / maxScrollForFade));
            }
            
            // Apply the calculated opacity
            scrollArrow.style.opacity = opacity.toString();
            scrollArrow.style.visibility = opacity > 0.1 ? 'visible' : 'hidden';
            
            if (opacity <= 0.1) {
                scrollArrow.classList.add('hidden');
            } else {
                scrollArrow.classList.remove('hidden');
            }
        } else if (scrollArrow && currentScrollTop >= homeHeight) {
            // Completely hide when past home section
            scrollArrow.style.opacity = '0';
            scrollArrow.style.visibility = 'hidden';
            scrollArrow.classList.add('hidden');
        }
        
        lastScrollTop = currentScrollTop;
        ticking = false;
    }

    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(handleScrollArrow);
            ticking = true;
        }
    }

    // Add scroll event listener for arrow visibility
    window.addEventListener('scroll', requestScrollUpdate);
    
    // Form submission handling
    const netlifyContactForm = document.querySelector('form[name="contact"]');
    if (netlifyContactForm) {
        netlifyContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Create FormData
            const formData = new FormData(this);
            
            // Submit to Netlify
            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                // Success
                showCustomAlert('Message sent successfully! Thank you for reaching out.', 'success');
                this.reset();
            })
            .catch(() => {
                // Error
                showCustomAlert('Oops! Something went wrong. Please try again or contact me directly via email.', 'error');
            })
            .finally(() => {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Alert close button functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.alert-close')) {
            hideAlert();
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Skip external links (those starting with http or https)
            if (href.startsWith('http') || href.startsWith('https')) {
                return; // Let the browser handle external links normally
            }
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to dark theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    } else {
        body.classList.add('dark-theme');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('light-theme');
            body.classList.toggle('dark-theme');
            
            // Save theme preference
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
        });
    }

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Skill progress bars animation with intersection observer
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserverOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                if (width) {
                    setTimeout(() => {
                        skillBar.style.width = width;
                    }, 200);
                }
            }
        });
    }, skillObserverOptions);
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Testimonials slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
            card.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    // Auto-rotate testimonials
    if (testimonialCards.length > 0) {
        showTestimonial(currentTestimonial);
        setInterval(nextTestimonial, 5000);
    }

    // Particle canvas animation
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        // Resize canvas to fit screen
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Create a single particle with random properties
        function createParticle() {
            return {
                x: Math.random() * canvas.width,          // Random X position
                y: Math.random() * canvas.height,         // Random Y position
                vx: (Math.random() - 0.5) * 0.6,         // X velocity (-0.3 to 0.3)
                vy: (Math.random() - 0.5) * 0.6,         // Y velocity (-0.3 to 0.3)
                size: Math.random() * 3 + 1.5,           // Size (1.5-4.5 pixels)
                opacity: Math.random() * 0.5 + 0.3       // Opacity (0.3-0.8)
            };
        }

        // Create 65 particles
        function initParticles() {
            particles = [];
            for (let i = 0; i < 65; i++) {
                particles.push(createParticle());
            }
        }

        // Animation loop
        function animateParticles() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw each particle
            particles.forEach(particle => {
                // Move particle
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Draw the particle as a circle with subtle glow effect
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                
                // Add subtle glow effect
                ctx.shadowColor = `rgba(0, 255, 208, ${particle.opacity * 0.4})`;
                ctx.shadowBlur = particle.size * 1.2;
                
                ctx.fillStyle = `rgba(0, 255, 208, ${particle.opacity})`; // Cyan color
                ctx.fill();
                
                // Reset shadow for next particle
                ctx.shadowBlur = 0;
            });

            // Continue animation
            requestAnimationFrame(animateParticles);
        }

        // Start the animation
        resizeCanvas();
        initParticles();
        animateParticles();

        // Handle window resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !message) {
                showCustomAlert('Please fill in all fields.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.background = '#666';

            // Simulate sending (replace with actual form submission)
            setTimeout(() => {
                showCustomAlert(`Thank you ${name}! Your message has been sent successfully. I'll get back to you soon!`, 'success');
                this.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        });
    }

    // Add loading effect for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Navbar hide/show on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Active navigation highlighting
    const sectionsForNav = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(navLinks);
    
    window.addEventListener('scroll', function() {
        let current = '';
        sectionsForNav.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Counter animation for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat h4');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + '+';
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target + '+';
                }  
            };
            
            // Start animation when element is visible
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            });
            
            counterObserver.observe(counter);
        });
    };
    
    animateCounters();
});

// Add some typing effect for the hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const originalText = typingElement.textContent;
        typeWriter(typingElement, originalText, 150);
    }
});

// Add custom CSS for animations
const style = document.createElement('style');
style.textContent = `
    .nav-menu.active {
        left: 0;
    }
    
    .nav-menu a.active {
        color: var(--accent-primary) !important;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-effect 1s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);

// Individual Skills Hover Animation
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const progressFills = card.querySelectorAll('.progress-fill');
        
        // Set CSS custom properties for progress widths
        progressFills.forEach(fill => {
            const width = fill.getAttribute('data-width');
            fill.style.setProperty('--progress-width', width);
        });
        
        card.addEventListener('mouseenter', () => {
            // Animate progress bars on hover
            setTimeout(() => {
                progressFills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    fill.style.width = width;
                });
            }, 300); // Delay to sync with card scale animation
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset progress bars when hover ends
            progressFills.forEach(fill => {
                fill.style.width = '0%';
            });
        });
    });
});

// Scroll Arrow Click Functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});