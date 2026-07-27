/**
 * script.js — Enhanced Portfolio Interactivity Engine
 * 
 * Features:
 * - Preloader with smooth transition
 * - Particle network canvas with mouse interaction + glow
 * - Custom cursor & trail with glow
 * - 3D parallax tilt & radial glow on cards
 * - Smart sticky navbar (hide on scroll down, show on scroll up)
 * - Mobile hamburger menu with animated overlay
 * - Typewriter effect with role cycling
 * - Staggered scroll-reveal animations with varied entrances
 * - Active nav link highlighting via IntersectionObserver
 * - Scroll-to-top button
 * - Ambient background parallax
 * - Scroll-based card parallax
 */

document.addEventListener('DOMContentLoaded', () => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // ==========================================================================
    // 0. PRELOADER
    // ==========================================================================
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.loader-progress');

    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 25) + 10;
        if (progress >= 100) {
            progress = 100;
            progressBar.style.width = '100%';
            clearInterval(loadInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
                document.documentElement.classList.remove('js-loading');
                startReveals();
            }, 500);
        } else {
            progressBar.style.width = `${progress}%`;
        }
    }, 120);

    // ==========================================================================
    // 1. PARTICLE NETWORK CANVAS — ENHANCED
    // ==========================================================================
    const canvas = document.getElementById('particles');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let particles = [];
    let canvasMouseX = -1000;
    let canvasMouseY = -1000;

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        if (!canvas) return;
        const count = isTouchDevice ? 45 : 80;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 0.5,
                baseRadius: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2,
            });
        }
    }

    let frame = 0;

    function drawParticles() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame++;

        const connectDist = 160;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            // Pulsing radius
            p.radius = p.baseRadius + Math.sin(frame * p.pulseSpeed + p.pulsePhase) * 0.5;

            // Wrap around edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Mouse interaction (desktop)
            if (!isTouchDevice) {
                const dx = p.x - canvasMouseX;
                const dy = p.y - canvasMouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 0 && dist < 150) {
                    const force = (150 - dist) / 150;
                    p.x += (dx / dist) * force * 2.5;
                    p.y += (dy / dist) * force * 2.5;

                    // Mouse proximity glow — draw brighter
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(34, 211, 238, ${0.15 * force})`;
                    ctx.fill();
                }
            }

            // Draw particle with glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`;
            ctx.fill();

            // Optional: subtle glow halo
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity * 0.05})`;
            ctx.fill();

            // Draw lines between nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                if (dist2 < connectDist) {
                    const lineOpacity = 0.1 * (1 - dist2 / connectDist);
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(34, 211, 238, ${lineOpacity})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }

            // Draw line from particle to mouse if close (desktop)
            if (!isTouchDevice) {
                const dmx = p.x - canvasMouseX;
                const dmy = p.y - canvasMouseY;
                const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);
                if (mouseDist < 200) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(canvasMouseX, canvasMouseY);
                    ctx.strokeStyle = `rgba(34, 211, 238, ${0.08 * (1 - mouseDist / 200)})`;
                    ctx.lineWidth = 0.4;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(drawParticles);
    }

    if (canvas) {
        resizeCanvas();
        createParticles();
        drawParticles();

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                createParticles();
            }, 200);
        }, { passive: true });

        if (!isTouchDevice) {
            document.addEventListener('mousemove', (e) => {
                canvasMouseX = e.clientX;
                canvasMouseY = e.clientY;
            }, { passive: true });
        }
    }

    // ==========================================================================
    // 2. CUSTOM CURSOR & SMOOTH FOLLOWER
    // ==========================================================================
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (isTouchDevice) {
        // On touch devices, completely remove cursor elements so they never flash
        if (cursor) cursor.remove();
        if (follower) follower.remove();
    } else if (cursor && follower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        let cursorReady = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Use transform for GPU-accelerated movement
            cursor.style.transform = `translate(calc(-50% + ${mouseX}px), calc(-50% + ${mouseY}px))`;

            // Reveal cursor on first actual mouse move
            if (!cursorReady) {
                cursorReady = true;
                cursor.classList.add('cursor-visible');
                follower.classList.add('cursor-visible');
            }
        }, { passive: true });

        const renderFollower = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            follower.style.transform = `translate(calc(-50% + ${followerX}px), calc(-50% + ${followerY}px))`;
            requestAnimationFrame(renderFollower);
        };
        renderFollower();

        // Hover active states
        const hoverables = document.querySelectorAll('a, button, .bento-card, .pill');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                follower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // 3. HOVER GLOW & 3D PARALLAX TILT
    // ==========================================================================
    const cards = document.querySelectorAll('.bento-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.1s ease-out';
        });

        let tiltTicking = false;
        card.addEventListener('mousemove', (e) => {
            if (!tiltTicking) {
                requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const percentX = (x - centerX) / centerX;
                    const percentY = -((y - centerY) / centerY);

                    const maxTilt = 6;
                    const tiltX = maxTilt * percentY;
                    const tiltY = maxTilt * percentX;

                    card.style.setProperty('--tilt', `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`);
                    tiltTicking = false;
                });
                tiltTicking = true;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease';
            card.style.setProperty('--tilt', 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
            card.style.setProperty('--mouse-x', '-500px');
            card.style.setProperty('--mouse-y', '-500px');
        });
    });

    // ==========================================================================
    // 4. AMBIENT BACKGROUND PARALLAX
    // ==========================================================================
    const blob1 = document.querySelector('.blob-bg');
    const blob2 = document.querySelector('.blob-bg-2');

    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            const bgMouseX = e.clientX / window.innerWidth - 0.5;
            const bgMouseY = e.clientY / window.innerHeight - 0.5;
            if (blob1) blob1.style.transform = `translate3d(${bgMouseX * -80}px, ${bgMouseY * -80}px, 0)`;
            if (blob2) blob2.style.transform = `translate3d(${bgMouseX * 120}px, ${bgMouseY * 120}px, 0)`;
        }, { passive: true });
    }

    // ==========================================================================
    // 5. STAGGERED SCROLL-REVEAL ANIMATIONS
    // ==========================================================================
    const revealAnimations = [
        'reveal-up', 'reveal-left', 'reveal-right', 'reveal-scale',
        'reveal-up', 'reveal-right', 'reveal-left'
    ];

    function startReveals() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const idx = Array.from(cards).indexOf(card);
                    const animClass = revealAnimations[idx % revealAnimations.length];
                    const delay = idx * 120;

                    setTimeout(() => {
                        card.classList.add('revealed', animClass);
                    }, delay);

                    observer.unobserve(card);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -20px 0px'
        });

        cards.forEach(card => observer.observe(card));
    }

    // ==========================================================================
    // 6. SMART STICKY NAVBAR + SCROLL PROGRESS
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const scrollProgressEl = document.getElementById('scrollProgress');
    let lastScrollY = 0;
    let scrollTicking = false;

    function handleNavbar() {
        const currentScrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Scroll progress bar
        if (scrollProgressEl && docHeight > 0) {
            const pct = Math.min((currentScrollY / docHeight) * 100, 100);
            scrollProgressEl.style.width = `${pct}%`;
        }

        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;
        scrollTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(handleNavbar);
            scrollTicking = true;
        }
    }, { passive: true });

    // ==========================================================================
    // 7. MOBILE HAMBURGER MENU
    // ==========================================================================
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobileNavOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (hamburger && mobileOverlay) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('open');
            mobileOverlay.classList.toggle('open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileOverlay.classList.remove('open');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileOverlay.classList.contains('open')) {
                hamburger.classList.remove('open');
                mobileOverlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================================================
    // 8. TYPEWRITER EFFECT
    // ==========================================================================
    const typedTextEl = document.getElementById('typedText');
    const roles = [
        'Cybersecurity Enthusiast',
        'Frontend Engineer',
        'Problem Solver',
        'Security Researcher'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typewriter() {
        if (!typedTextEl) return;

        const currentRole = roles[roleIdx];

        if (!isDeleting) {
            charIdx++;
            typedTextEl.textContent = currentRole.substring(0, charIdx);

            if (charIdx === currentRole.length) {
                setTimeout(() => {
                    isDeleting = true;
                    typewriter();
                }, 2200);
                return;
            }
            setTimeout(typewriter, 70 + Math.random() * 50);
        } else {
            charIdx--;
            typedTextEl.textContent = currentRole.substring(0, charIdx);

            if (charIdx === 0) {
                isDeleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                setTimeout(typewriter, 500);
                return;
            }
            setTimeout(typewriter, 35);
        }
    }

    // Start typewriter after loader finishes
    const waitForLoaderTyping = setInterval(() => {
        if (loader.classList.contains('hidden')) {
            clearInterval(waitForLoaderTyping);
            setTimeout(typewriter, 700);
        }
    }, 100);

    // ==========================================================================
    // 9. ACTIVE NAV LINK HIGHLIGHTING
    // ==========================================================================
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('.bento-card[id]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('data-section') === id);
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -40% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));

    // ==========================================================================
    // 10. SCROLL-TO-TOP BUTTON
    // ==========================================================================
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================================
    // 11. SMOOTH SCROLL FOR ALL ANCHOR LINKS
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==========================================================================
    // 12. SCROLL-BASED CARD PARALLAX (subtle depth effect)
    // ==========================================================================
    if (!isTouchDevice) {
        let parallaxTicking = false;

        function applyScrollParallax() {
            const scrollY = window.scrollY;
            cards.forEach((card, i) => {
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;
                const viewCenter = window.innerHeight / 2;
                const offset = (cardCenter - viewCenter) / window.innerHeight;

                // Subtle vertical shift based on scroll position
                const shift = offset * -8 * (i % 2 === 0 ? 1 : -1);

                // Smoothly update parallax CSS variable
                card.style.setProperty('--parallax-y', `${shift}px`);
            });
            parallaxTicking = false;
        }

        window.addEventListener('scroll', () => {
            if (!parallaxTicking) {
                requestAnimationFrame(applyScrollParallax);
                parallaxTicking = true;
            }
        }, { passive: true });
    }
});
