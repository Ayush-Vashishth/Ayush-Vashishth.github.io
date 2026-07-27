/* ==========================================================================
   AYUSH VASHISHTH — PORTFOLIO INTERACTIVE LOGIC & ENGINE v3.1
   Features: Multi-device Responsiveness, Lerp Custom Cursor, Vault Inspector,
            VAPT Scanner, Smooth Anchor Navigation, Web3Forms, CLI Shell
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    setupThemeToggle();
    setupResumeModal();
    setupParticlesCanvas();
    setupMouseParallax();
    setupCustomCursor();
    setupBackToTopBtn();
    setupSmoothScrollLinks();
    setupCopyableCards();
    setupVaultFlowInspector();
    setupVaptScannerSimulator();
    setupScrollSpy();
    setupSkillsFilter();
    setupTerminal();
});

// ==========================================================================
// 1. PRELOADER & INITIAL FADE OUT
// ==========================================================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 300);
    });

    // Fallback hide preloader if load event takes too long
    setTimeout(() => {
        if (preloader && preloader.style.display !== 'none') {
            preloader.classList.add('fade-out');
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }
    }, 2000);
}

// ==========================================================================
// 2. DARK/LIGHT THEME TOGGLE ENGINE
// ==========================================================================
function setupThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Check saved local theme preference
    const savedTheme = localStorage.getItem('vashishth_theme');
    if (savedTheme === 'light') {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        updateThemeIcon(true);
    }

    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
        const isLight = body.classList.contains('theme-light');
        if (isLight) {
            body.classList.remove('theme-light');
            body.classList.add('theme-dark');
            localStorage.setItem('vashishth_theme', 'dark');
            updateThemeIcon(false);
            showToast('Switched to Executive Dark Mode');
        } else {
            body.classList.remove('theme-dark');
            body.classList.add('theme-light');
            localStorage.setItem('vashishth_theme', 'light');
            updateThemeIcon(true);
            showToast('Switched to Clean Light Mode');
        }
    });
}

function updateThemeIcon(isLight) {
    const themeIconSvg = document.getElementById('theme-icon-svg');
    if (!themeIconSvg) return;

    if (isLight) {
        // Sun SVG icon for light theme
        themeIconSvg.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    } else {
        // Moon SVG icon for dark theme
        themeIconSvg.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    }
}

// ==========================================================================
// 3. RESUME PDF PREVIEW MODAL
// ==========================================================================
function setupResumeModal() {
    const openBtn = document.getElementById('open-resume-btn');
    const closeBtn = document.getElementById('close-modal-btn');
    const modal = document.getElementById('resume-modal');

    if (!modal) return;

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    // Close on clicking backdrop overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });
}

// ==========================================================================
// 4. DYNAMIC HIGH-PERFORMANCE PARTICLES CANVAS ENGINE
// ==========================================================================
function setupParticlesCanvas() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor(width / 20), 65);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5 + 0.8;
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(34, 211, 238, ${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw particle connections
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(34, 211, 238, ${0.12 * (1 - dist / 110)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }, 150);
    });
}

// ==========================================================================
// 5. MOUSE PARALLAX BLOB EFFECT (Desktop Only)
// ==========================================================================
function setupMouseParallax() {
    const blob1 = document.getElementById('blob-bg-1');
    const blob2 = document.getElementById('blob-bg-2');

    if (!blob1 || !blob2) return;

    window.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 992) return; // Skip on mobile/tablets
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;

        blob1.style.transform = `translate(${x}px, ${y}px)`;
        blob2.style.transform = `translate(${-x}px, ${-y}px)`;
    });
}

// ==========================================================================
// 6. ayushvs.me INSPIRED FLUID LERP CUSTOM TECH CURSOR ENGINE
// ==========================================================================
function setupCustomCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    if (!cursorDot || !cursorRing) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Lerp loop for silky fluid inertia cursor tracking
    function renderCursor() {
        if (window.innerWidth > 992) {
            dotX += (mouseX - dotX) * 0.5;
            dotY += (mouseY - dotY) * 0.5;
            ringX += (mouseX - ringX) * 0.16;
            ringY += (mouseY - ringY) * 0.16;

            cursorDot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
            cursorRing.style.transform = `translate3d(${ringX - 19}px, ${ringY - 19}px, 0)`;
        }

        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Hover Scaling & Click Shrink Feedback
    const hoverables = document.querySelectorAll('a, button, input, select, textarea, .skill-card, .project-card, .vault-step-node, .contact-card-link, .back-to-top, .filter-btn');

    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (window.innerWidth > 992) cursorRing.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            if (window.innerWidth > 992) cursorRing.classList.remove('active');
        });
    });

    window.addEventListener('mousedown', () => {
        if (window.innerWidth > 992) {
            cursorDot.classList.add('clicking');
            cursorRing.classList.add('clicking');
        }
    });

    window.addEventListener('mouseup', () => {
        if (window.innerWidth > 992) {
            cursorDot.classList.remove('clicking');
            cursorRing.classList.remove('clicking');
        }
    });
}

// ==========================================================================
// 7. BACK TO TOP DIRECT JUMP ARROW BUTTON
// ==========================================================================
function setupBackToTopBtn() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================================================
// 8. SMOOTH SCROLLING FOR ALL ANCHOR LINKS Across Devices
// ==========================================================================
function setupSmoothScrollLinks() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                const offset = window.innerWidth <= 992 ? 80 : 20;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetSection.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================================
// 9. CLICK-TO-COPY CONTACT CARDS WITH TOAST FEEDBACK
// ==========================================================================
function setupCopyableCards() {
    const copyCards = document.querySelectorAll('.copyable-card');

    copyCards.forEach(card => {
        card.addEventListener('click', () => {
            const textToCopy = card.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copied to clipboard: ${textToCopy}`);
            }).catch(err => {
                showToast(`Copied: ${textToCopy}`);
            });
        });
    });
}

// ==========================================================================
// 10. TOAST NOTIFICATION ENGINE
// ==========================================================================
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;

    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// ==========================================================================
// 11. HASHICORP VAULT ARCHITECTURE NODE INSPECTOR WIDGET
// ==========================================================================
const vaultData = {
    jenkins: {
        title: "Node 1: Jenkins Pipeline Initiation",
        desc: "Jenkins triggers build execution. Instead of hardcoding static passwords or API keys in repository files, Jenkins authenticates using a secure AppRole ID & Secret ID pair against HashiCorp Vault.",
        tags: ["AppRole Authentication", "Zero Hardcoded Secrets", "CI/CD Security", "Groovy Shared Library"]
    },
    vault: {
        title: "Node 2: HashiCorp Vault Server Verification",
        desc: "Vault verifies the AppRole credentials against strict RBAC policies. If authenticated, Vault authorizes access and prepares an encrypted secret engine response using AES-256 GCM encryption.",
        tags: ["RBAC Policy Engine", "AES-256 GCM", "Audit Logging", "Secrets Engine (KV v2)"]
    },
    token: {
        title: "Node 3: Ephemeral Dynamic Token Generation",
        desc: "Vault issues a short-lived, single-use token or dynamic credentials with a strict Time-To-Live (TTL). The token expires automatically, mitigating credential exposure risks.",
        tags: ["Dynamic Ephemeral Tokens", "Auto-Revocation TTL", "Zero Leakage", "Short-lived Leases"]
    },
    deploy: {
        title: "Node 4: Secure Microservices Deployment",
        desc: "Jenkins injects the decrypted secret directly into build memory/environment variables at runtime. Application containers start securely with zero plaintext credentials saved to disk or git repositories.",
        tags: ["Production Isolation", "Zero Plaintext Leaks", "DevSecOps Pipeline", "Container Security"]
    }
};

function selectVaultNode(nodeId) {
    const data = vaultData[nodeId];
    if (!data) return;

    // Update active node styling
    document.querySelectorAll('.vault-step-node').forEach(node => {
        node.classList.remove('active-node');
    });

    const activeNode = document.getElementById(`node-${nodeId}`);
    if (activeNode) {
        activeNode.classList.add('active-node');
    }

    // Update Inspector content with smooth animation
    const titleEl = document.getElementById('vault-node-title');
    const descEl = document.getElementById('vault-node-desc');
    const tagsEl = document.getElementById('vault-node-tags');

    if (titleEl && descEl && tagsEl) {
        titleEl.innerText = data.title;
        descEl.innerText = data.desc;

        tagsEl.innerHTML = '';
        data.tags.forEach((tag, idx) => {
            const span = document.createElement('span');
            span.className = idx === 0 ? 'pill accent' : 'pill';
            span.innerText = tag;
            tagsEl.appendChild(span);
        });
    }
}

function setupVaultFlowInspector() {
    const nodes = document.querySelectorAll('.vault-step-node');
    nodes.forEach(node => {
        node.addEventListener('click', () => {
            const id = node.id.replace('node-', '');
            selectVaultNode(id);
        });
    });
}

// ==========================================================================
// 12. ATLAS VAPT VULNERABILITY SCANNER SIMULATOR
// ==========================================================================
function setupVaptScannerSimulator() {
    const btn = document.getElementById('run-vapt-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const targetInput = document.getElementById('vapt-target');
        const scanTypeSelect = document.getElementById('vapt-scan-type');
        const termBody = document.getElementById('vapt-term-body');
        const statusTag = document.getElementById('vapt-status-tag');

        if (!targetInput || !termBody || !statusTag) return;

        const target = targetInput.value.trim() || 'api.target-enterprise.internal';
        const scanType = scanTypeSelect ? scanTypeSelect.value : 'full';

        termBody.innerHTML = '';
        statusTag.className = 'vapt-status-scanning';
        statusTag.innerText = 'SCANNING...';

        const logs = [
            `[0.00s] Initializing ATLAS VAPT Engine v2.4 against target: ${target}...`,
            `[0.45s] Initiating TCP Syn-Scan on 65,535 ports...`,
            `[1.10s] Open ports detected: 80/tcp (HTTP), 443/tcp (HTTPS), 8080/tcp (Jenkins CI), 8200/tcp (Vault API).`,
            `[1.65s] Running Service Version Identification & OS Fingerprinting...`,
            `[2.20s] Auditing OWASP Top 10 Attack Vectors: Broken Access Control, Injection, Cryptographic Failures...`,
            `[2.85s] Auditing Vault API endpoint on port 8200: AppRole Authentication enforced.`,
            `[3.40s] AUDIT COMPLETE: 0 Critical, 0 High, 2 Low Warnings (Header hardening recommended).`,
            `[3.80s] Audit report compiled & saved to ATLAS dashboard.`
        ];

        logs.forEach((log, index) => {
            setTimeout(() => {
                const p = document.createElement('p');
                if (log.includes('COMPLETE')) p.className = 'term-green';
                else if (log.includes('Open ports')) p.className = 'term-yellow';
                else p.className = 'term-cyan';

                p.innerText = log;
                termBody.appendChild(p);
                termBody.scrollTop = termBody.scrollHeight;

                if (index === logs.length - 1) {
                    statusTag.className = 'vapt-status-complete';
                    statusTag.innerText = 'AUDIT COMPLETE';
                    showToast('VAPT Vulnerability Scan Complete');
                }
            }, index * 450);
        });
    });
}

// ==========================================================================
// 13. SCROLL SPY, TOP PROGRESS BAR & TELEMETRY BREADCRUMBS
// ==========================================================================
const sectionLocationMap = {
    'hero': 'HERO // OVERVIEW',
    'about': 'ABOUT // BACKGROUND',
    'skills': 'TECHNICAL ARSENAL',
    'vault-demo': 'VAULT // SECRETS FLOW',
    'experience': 'EXPERIENCE // ANANTIXIA',
    'projects': 'FEATURED PROJECTS',
    'vapt-demo': 'ATLAS VAPT SCANNER',
    'research': 'RESEARCH & HONORS',
    'education': 'ACADEMIC QUALIFICATIONS',
    'terminal': 'DEVELOPER CLI',
    'contact': 'GET IN TOUCH'
};

function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const progressBar = document.getElementById('scroll-progress-bar');
    const telemetryLocText = document.getElementById('telemetry-loc-text');

    function onScroll() {
        // 1. Update Reading Progress Bar
        if (progressBar) {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (window.scrollY / Math.max(scrollTotal, 1)) * 100;
            progressBar.style.width = `${Math.min(Math.max(scrollPercent, 0), 100)}%`;
        }

        // 2. Update Active Section Navigation & Telemetry Breadcrumb
        const scrollPos = window.scrollY + 140;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                // Active Nav Link Highlight
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });

                // Update Telemetry Location Text
                if (telemetryLocText && sectionLocationMap[id]) {
                    telemetryLocText.innerText = sectionLocationMap[id];
                }
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Run initial check on load
}

// ==========================================================================
// 14. INTERACTIVE SKILLS MATRIX CATEGORY FILTER
// ==========================================================================
function setupSkillsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            skillCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');

                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => { card.style.display = 'none'; }, 200);
                }
            });
        });
    });
}

// ==========================================================================
// 15. INTERACTIVE DEVELOPER TERMINAL CLI
// ==========================================================================
function setupTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');

    if (!input || !output) return;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            input.value = '';

            printTermLine(`ayush@vashishth:~$ ${cmd}`, 'term-cyan');
            handleTerminalCommand(cmd);
        }
    });
}

function printTermLine(text, className = '') {
    const output = document.getElementById('terminal-output');
    if (!output) return;

    const p = document.createElement('p');
    if (className) p.className = className;
    p.innerText = text;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
}

function handleTerminalCommand(cmd) {
    switch (cmd) {
        case 'help':
            printTermLine('AVAILABLE COMMANDS:', 'term-yellow');
            printTermLine('  about        - Summary of Ayush Vashishth');
            printTermLine('  skills       - HashiCorp Vault, Jenkins, FastAPI & stack');
            printTermLine('  experience   - Anantixia & Nauka Foundation details');
            printTermLine('  projects     - ATLAS VAPT & ATS Resume Builder');
            printTermLine('  certs        - CodeSignal & TEEX Certifications');
            printTermLine('  contact      - Email, phone, LinkedIn & GitHub');
            printTermLine('  clear        - Clear terminal output');
            printTermLine('  sudo         - Root access simulation');
            break;

        case 'about':
            printTermLine('AYUSH VASHISHTH | Security Engineer & Web Developer', 'term-green');
            printTermLine('B.Tech CSE (Cyber Security & Forensics) at UPES Dehradun | CGPA: 7.95/10');
            break;

        case 'skills':
            printTermLine('SECURITY: HashiCorp Vault, Jenkins CI/CD, Secrets Mgmt, RBAC, VAPT', 'term-green');
            printTermLine('PROGRAMMING & APIs: FastAPI, REST APIs, Java, HTML5/CSS3/JS');
            printTermLine('TOOLS: Git, GitHub, Linux, MySQL, MongoDB');
            break;

        case 'experience':
            printTermLine('Anantixia Pvt. Ltd. - DevOps Engineer & Web Developer Intern', 'term-yellow');
            printTermLine('Nauka Foundation - Web Developer Social Internship');
            break;

        case 'projects':
            printTermLine('ATLAS: Advanced Testing Lab for Application Security (FastAPI + Nmap + OWASP)', 'term-yellow');
            printTermLine('ATS Resume Builder: Full-stack ATS optimization & PDF exporter');
            break;

        case 'certs':
            printTermLine('CodeSignal: Understanding LLMs & Basic Prompting', 'term-green');
            printTermLine('TEEX: Detecting and Responding to a Cyber Attack');
            break;

        case 'contact':
            printTermLine('Email: ayushvs1201@gmail.com', 'term-green');
            printTermLine('Phone: +91-9045495707');
            printTermLine('LinkedIn: linkedin.com/in/ayushvs1201');
            printTermLine('GitHub: github.com/Ayush-Vashishth');
            break;

        case 'clear':
            document.getElementById('terminal-output').innerHTML = '';
            break;

        case 'sudo':
            printTermLine('ACCESS GRANTED: Root privileges granted for Ayush Vashishth.', 'term-highlight');
            break;

        default:
            if (cmd !== '') {
                printTermLine(`Command not recognized: '${cmd}'. Type 'help' for available commands.`, 'term-dim');
            }
            break;
    }
}

// ==========================================================================
// 16. WEB3FORMS AJAX FORM SUBMISSION HANDLER
// ==========================================================================
function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = document.getElementById('btn-submit-contact');

    if (!submitBtn) return;

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending Message...</span>';
    submitBtn.disabled = true;

    const formData = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showToast('Message Sent Successfully! I will get back to you soon.');
            form.reset();
        } else {
            showToast('Submission error. Please try emailing directly.');
        }
    })
    .catch(error => {
        showToast('Submission error. Please try emailing directly.');
    })
    .finally(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
}
