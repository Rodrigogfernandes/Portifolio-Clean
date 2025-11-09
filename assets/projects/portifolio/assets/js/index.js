// Particles JS Config
document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#0066ff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
});

// Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Custom Cursor
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    document.addEventListener('mousedown', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.6)';
    });

    document.addEventListener('mouseup', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Cursor interaction with clickable elements
    const clickables = document.querySelectorAll('a, button, .tech-item, .project-card');
    clickables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.backgroundColor = 'rgba(0, 102, 255, 0.1)';
            cursorFollower.style.borderColor = 'transparent';
        });

        item.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.backgroundColor = 'transparent';
            cursorFollower.style.borderColor = 'var(--primary-color)';
        });
    });
});

// Skill Bars Animation
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    // Intersection Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Hero animation
        gsap.from('.hero-content h1', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.5
        });

        gsap.from('.hero-content p', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.8
        });

        gsap.from('.hero-btns', {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 1.1
        });

        // About section
        gsap.from('#sobre .section-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '#sobre',
                start: 'top 80%'
            }
        });

        gsap.from('.about-text', {
            x: -50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 80%'
            }
        });

        gsap.from('.profile-image', {
            x: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 80%'
            }
        });

        // Projects section
        gsap.from('#projetos .section-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '#projetos',
                start: 'top 80%'
            }
        });

        // Garante que os cards estejam visíveis inicialmente
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length > 0) {
            // Define estado inicial visível (fallback caso ScrollTrigger não dispare)
            gsap.set('.project-card', { opacity: 1, y: 0, visibility: 'visible' });
            
            // Cria timeline para animação dos cards usando fromTo para garantir estado final
            const cardsTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '#projetos',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
            
            cardsTimeline.fromTo('.project-card', 
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power2.out'
                }
            );
        }

        // Contact section
        gsap.from('#contato .section-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '#contato',
                start: 'top 80%'
            }
        });

        gsap.from('.contact-form', {
            x: -50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.contact-grid',
                start: 'top 80%'
            }
        });

        gsap.from('.contact-info', {
            x: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.contact-grid',
                start: 'top 80%'
            }
        });
    }
});

// Contact Form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio de formulário
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Aqui você pode adicionar a lógica para enviar os dados para um servidor
            console.log('Form data:', formData);
            
            // Simulação de sucesso
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }
});

// Loading Animation
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loading-bar').style.display = 'none';
    }, 2000);
});
