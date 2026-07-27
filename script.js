/**
 * AYUSH VASHISHTH — INDUSTRY STANDARD PORTFOLIO ENGINE
 * Includes:
 * 1. Fluid Lerp Custom Tech Cursor (Smooth Inertia Tracking & Click Scale)
 * 2. Interactive 2D Canvas Particle Network & Mouse Tracking
 * 3. Radial Glow Blob Mouse Parallax
 * 4. Auto-Collapsing Left Sidebar Header Engine
 * 5. ATLAS VAPT Scanner Simulator
 * 6. HashiCorp Vault Architecture Node Inspector
 * 7. Resume PDF Preview Modal
 * 8. Web3Forms AJAX Contact Handler (key: 36d2d4db-0377-420e-9152-baf59f1992e9)
 * 9. Smooth Jump to Top Arrow Controller
 */

// Global Setup
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    setupCustomCursor();
    initParticleNetwork();
    setupBlobParallax();
    setupThemeSwitcher();
    setupResumeModal();
    setupVaptSimulator();
    setupScrollSpy();
    setupSkillsFilter();
    setupTerminal();
    setupCopyableCards();
    setupBackToTop();
    setupSkillBarObserver();
});

// ==========================================================================
// 1. FLUID LERP CUSTOM TECH CURSOR (Inspiration: ayushvs.me)
// ==========================================================================
function setupCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    // Smooth Lerp loop for trailing outer ring inertia
    function renderCursor() {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Click & Hover microinteractions
    window.addEventListener('mousedown', () => {
        dot.classList.add('clicking');
        ring.classList.add('clicking');
    });

    window.addEventListener('mouseup', () => {
        dot.classList.remove('clicking');
        ring.classList.remove('clicking');
    });

    const interactiveEls = document.querySelectorAll('a, button, input, select, textarea, .btn, .skill-card, .project-card, .vault-step-node, .contact-card-link, .filter-btn, .nav-link, .back-to-top');
    interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('active'));
        el.addEventListener('mouseleave', () => ring.classList.remove('active'));
    });
}

// ==========================================================================
// 2. INTERACTIVE CANVAS PARTICLE NETWORK
// ==========================================================================
function initParticleNetwork() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);

    const mouse = { x: null, y: null, radius: 180 };

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 1.8 + 1.2;
            this.baseAlpha = Math.random() * 0.45 + 0.25;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 2.5;
                    this.y -= (dy / dist) * force * 2.5;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(34, 211, 238, ${this.baseAlpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(34, 211, 238, 0.6)';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 140) {
                    const alpha = (1 - dist / 140) * 0.22;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        if (mouse.x !== null && mouse.y !== null) {
            for (let i = 0; i < particles.length; i++) {
                const dx = mouse.x - particles[i].x;
                const dy = mouse.y - particles[i].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 160) {
                    const alpha = (1 - dist / 160) * 0.35;
                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                    ctx.lineTo(particles[i].x, particles[i].y);
                    ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ==========================================================================
// 3. RADIAL GLOW BLOB MOUSE PARALLAX
// ==========================================================================
function setupBlobParallax() {
    const blob1 = document.getElementById('blob-bg-1');
    const blob2 = document.getElementById('blob-bg-2');
    if (!blob1 || !blob2) return;

    window.addEventListener('mousemove', (e) => {
        const xPct = (e.clientX / window.innerWidth - 0.5) * 50;
        const yPct = (e.clientY / window.innerHeight - 0.5) * 50;

        blob1.style.transform = `translate(${xPct}px, ${yPct}px)`;
        blob2.style.transform = `translate(${-xPct}px, ${-yPct}px)`;
    });
}

// ==========================================================================
// 4. PRELOADER
// ==========================================================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => { preloader.classList.add('fade-out'); }, 400);
    });

    setTimeout(() => {
        if (preloader && !preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
        }
    }, 1500);
}

// ==========================================================================
// 5. SVG THEME SWITCHER
// ==========================================================================
function setupThemeSwitcher() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const iconSvg = document.getElementById('theme-icon-svg');
    if (!toggleBtn || !iconSvg) return;

    const moonPath = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    const sunPath = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';

    const savedTheme = localStorage.getItem('ayush_theme') || 'theme-dark';

    if (savedTheme === 'theme-light') {
        document.body.classList.add('theme-light');
        iconSvg.innerHTML = sunPath;
    } else {
        document.body.classList.remove('theme-light');
        iconSvg.innerHTML = moonPath;
    }

    toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('theme-light');
        iconSvg.innerHTML = isLight ? sunPath : moonPath;
        localStorage.setItem('ayush_theme', isLight ? 'theme-light' : 'theme-dark');
        showToast(`Switched to ${isLight ? 'Light' : 'Dark'} Mode`);
    });
}

// ==========================================================================
// 6. RESUME PDF PREVIEW MODAL
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

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

// ==========================================================================
// 7. ATLAS VAPT VULNERABILITY SCANNER SIMULATOR
// ==========================================================================
function setupVaptSimulator() {
    const runBtn = document.getElementById('run-vapt-btn');
    if (!runBtn) return;

    runBtn.addEventListener('click', () => {
        runVaptScan();
    });
}

function runVaptScan() {
    const target = document.getElementById('vapt-target')?.value.trim() || 'api.target-enterprise.internal';
    const termBody = document.getElementById('vapt-term-body');
    const statusTag = document.getElementById('vapt-status-tag');
    const runBtn = document.getElementById('run-vapt-btn');

    if (!termBody || !statusTag) return;

    termBody.innerHTML = '';
    statusTag.className = 'vapt-status-scanning';
    statusTag.innerText = 'SCANNING...';
    if (runBtn) runBtn.disabled = true;

    function log(msg, cls = '') {
        const p = document.createElement('p');
        if (cls) p.className = cls;
        p.innerText = msg;
        termBody.appendChild(p);
        termBody.scrollTop = termBody.scrollHeight;
    }

    log(`[ATLAS v2.4] Initializing scan sequence for target: ${target}...`, 'term-cyan');

    setTimeout(() => {
        log(`[NMAP ROUTINE] Executing port discovery and service banner audit...`, 'term-yellow');
    }, 600);

    setTimeout(() => {
        log(`[NMAP RESULT] Port 80/tcp OPEN (HTTP/Nginx)`, 'term-green');
        log(`[NMAP RESULT] Port 443/tcp OPEN (HTTPS/TLS 1.3 - Vault Endpoint)`, 'term-green');
        log(`[NMAP RESULT] Port 8080/tcp OPEN (FastAPI REST Service)`, 'term-green');
    }, 1400);

    setTimeout(() => {
        log(`[OWASP AUDIT] Testing SQL Injection, XSS, and RBAC Token Enforcement...`, 'term-yellow');
    }, 2200);

    setTimeout(() => {
        log(`[OWASP RESULT] SQLi Vulnerability: PASSED (Parameterized Queries)`, 'term-green');
        log(`[OWASP RESULT] JWT Secret Security: PASSED (HS256 Vault Tokens)`, 'term-green');
        log(`[OWASP RESULT] RBAC Enforcement: PASSED (Vault AppRole Active)`, 'term-green');
        log(`[VAPT COMPLETE] 0 High, 0 Critical Vulnerabilities Detected. Compliance Score: 100%`, 'term-highlight');

        statusTag.className = 'vapt-status-complete';
        statusTag.innerText = 'AUDIT PASSED';
        if (runBtn) runBtn.disabled = false;
        showToast('VAPT Security Scan Complete!');
    }, 3200);
}

// ==========================================================================
// 8. HASHICORP VAULT ARCHITECTURE NODE INSPECTOR
// ==========================================================================
const vaultNodeData = {
    jenkins: {
        title: "Node 1: Jenkins CI/CD Pipeline Trigger",
        desc: "Jenkins triggers automated build execution. Instead of embedding static credentials or passwords inside code repositories, Jenkins authenticates against HashiCorp Vault using a secure AppRole ID & Secret ID pair.",
        tags: ["AppRole Auth", "Zero Hardcoded Secrets", "Jenkins Integration"]
    },
    vault: {
        title: "Node 2: HashiCorp Vault Authentication & Policy Enforcement",
        desc: "Vault verifies the AppRole credentials and checks fine-grained Role-Based Access Control (RBAC) policies. All secrets are encrypted in transit and at rest using AES-256 GCM encryption.",
        tags: ["AES-256 Encryption", "RBAC Policies", "Secrets Management"]
    },
    token: {
        title: "Node 3: Ephemeral Dynamic Token Generation",
        desc: "Vault issues a short-lived dynamic lease token specific to this exact build job. The token automatically expires after the pipeline completes, eliminating long-term credential leakage risks.",
        tags: ["Short-Lived Leases", "Dynamic Credentials", "Auto-Revocation"]
    },
    deploy: {
        title: "Node 4: Secure Production Deployment",
        desc: "The deployment routine uses the dynamic token to inject database credentials and API keys directly into RAM. Zero secrets are ever written to disk or logs.",
        tags: ["RAM Secret Injection", "Zero Disk Leakage", "Production Verified"]
    }
};

function selectVaultNode(nodeId) {
    document.querySelectorAll('.vault-step-node').forEach(n => n.classList.remove('active-node'));
    const selected = document.getElementById(`node-${nodeId}`);
    if (selected) selected.classList.add('active-node');

    const data = vaultNodeData[nodeId];
    if (!data) return;

    const titleEl = document.getElementById('vault-node-title');
    const descEl = document.getElementById('vault-node-desc');
    const tagsEl = document.getElementById('vault-node-tags');

    if (titleEl) titleEl.innerText = data.title;
    if (descEl) descEl.innerText = data.desc;
    if (tagsEl) {
        tagsEl.innerHTML = data.tags.map(t => `<span class="pill accent">${t}</span>`).join(' ');
    }
}

// ==========================================================================
// 9. TOAST NOTIFICATIONS & COPY TO CLIPBOARD
// ==========================================================================
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;

    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
}

function setupCopyableCards() {
    const copyCards = document.querySelectorAll('.copyable-card');
    copyCards.forEach(card => {
        card.addEventListener('click', () => {
            const textToCopy = card.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied "${textToCopy}" to clipboard!`);
                }).catch(() => {
                    showToast('Failed to copy to clipboard.');
                });
            }
        });
    });
}

// ==========================================================================
// 10. BACK TO TOP JUMP ARROW BUTTON
// ==========================================================================
function setupBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 250) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================================================
// 11. ANIMATED SKILL METERS ON SCROLL
// ==========================================================================
function setupSkillBarObserver() {
    const skillCards = document.querySelectorAll('.skill-card');
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.skill-fill');
                if (fill) {
                    const targetWidth = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => { fill.style.width = targetWidth; }, 50);
                }
            }
        });
    }, { threshold: 0.2 });

    skillCards.forEach(card => observer.observe(card));
}

// ==========================================================================
// 12. SCROLL SPY & STICKY NAVBAR ACTIVE LINKS
// ==========================================================================
function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function onScroll() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', onScroll);
}

// ==========================================================================
// 13. INTERACTIVE SKILLS MATRIX CATEGORY FILTER
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
                    card.style.display = 'block';
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
// 14. INTERACTIVE DEVELOPER TERMINAL CLI
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
// 15. WEB3FORMS AJAX FORM SUBMISSION HANDLER
// ==========================================================================
function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = document.getElementById('btn-submit-contact');
    const formData = new FormData(form);

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending Message...';
    }

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(async (response) => {
        const json = await response.json();
        if (response.status === 200) {
            showToast('Thank you! Your message has been sent successfully.');
            form.reset();
        } else {
            showToast(json.message || 'Error submitting message.');
        }
    })
    .catch(() => {
        showToast('Something went wrong. Please try again or email directly.');
    })
    .finally(() => {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span>';
        }
    });
}
