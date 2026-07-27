/* ==========================================================================
   AYUSH VASHISHTH — PORTFOLIO INTERACTIVE LOGIC & ENGINE v4.0
   Features: Lerp Cursor, Vault Inspector, VAPT Scanner, Terminal CLI (History+Tab),
             Scroll Reveal, Button Ripple, Web3Forms, Scroll Spy, Skills Filter
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
    setupScrollReveal();
    setupButtonRipple();
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
                triggerReveal();
            }, 500);
        }, 300);
    });

    // Fallback: hide preloader if load event takes too long
    setTimeout(() => {
        if (preloader && preloader.style.display !== 'none') {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                triggerReveal();
            }, 500);
        }
    }, 2000);
}

// ==========================================================================
// 2. DARK/LIGHT THEME TOGGLE ENGINE
// ==========================================================================
function setupThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Apply saved theme preference
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
        themeIconSvg.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    } else {
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

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    // Close on Escape key
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

    const particleCount = Math.min(Math.floor(width / 20), 65);
    let particles = [];

    class Particle {
        constructor() { this.reset(); }
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

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
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
        if (window.innerWidth <= 992) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        blob1.style.transform = `translate(${x}px, ${y}px)`;
        blob2.style.transform = `translate(${-x}px, ${-y}px)`;
    });
}

// ==========================================================================
// 6. FLUID LERP CUSTOM TECH CURSOR ENGINE
// ==========================================================================
function setupCustomCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    if (!cursorDot || !cursorRing) return;

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY;
    let ringX = mouseX, ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

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

    const hoverables = document.querySelectorAll(
        'a, button, input, select, textarea, .skill-card, .project-card, .vault-step-node, .contact-card-link, .back-to-top, .filter-btn'
    );

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
// 7. BACK TO TOP BUTTON
// ==========================================================================
function setupBackToTopBtn() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================================================
// 8. SMOOTH SCROLLING FOR ALL ANCHOR LINKS
// ==========================================================================
function setupSmoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                const offset = window.innerWidth <= 992 ? 80 : 20;
                const top = targetSection.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// ==========================================================================
// 9. CLICK-TO-COPY CONTACT CARDS WITH TOAST
// ==========================================================================
function setupCopyableCards() {
    document.querySelectorAll('.copyable-card').forEach(card => {
        card.addEventListener('click', () => {
            const text = card.getAttribute('data-copy');
            if (!text) return;
            navigator.clipboard.writeText(text)
                .then(() => showToast(`✓ Copied: ${text}`))
                .catch(() => showToast(`Copied: ${text}`));
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
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3200);
}

// ==========================================================================
// 11. HASHICORP VAULT ARCHITECTURE NODE INSPECTOR
// ==========================================================================
const vaultData = {
    jenkins: {
        title: 'Node 1: Jenkins Pipeline Initiation',
        desc: 'Jenkins triggers build execution. Instead of hardcoding static passwords or API keys in repository files, Jenkins authenticates using a secure AppRole ID & Secret ID pair against HashiCorp Vault.',
        tags: ['AppRole Authentication', 'Zero Hardcoded Secrets', 'CI/CD Security', 'Groovy Shared Library']
    },
    vault: {
        title: 'Node 2: HashiCorp Vault Server Verification',
        desc: 'Vault verifies the AppRole credentials against strict RBAC policies. If authenticated, Vault authorizes access and prepares an encrypted secret engine response using AES-256 GCM encryption.',
        tags: ['RBAC Policy Engine', 'AES-256 GCM', 'Audit Logging', 'Secrets Engine (KV v2)']
    },
    token: {
        title: 'Node 3: Ephemeral Dynamic Token Generation',
        desc: 'Vault issues a short-lived, single-use token or dynamic credentials with a strict Time-To-Live (TTL). The token expires automatically, mitigating credential exposure risks.',
        tags: ['Dynamic Ephemeral Tokens', 'Auto-Revocation TTL', 'Zero Leakage', 'Short-lived Leases']
    },
    deploy: {
        title: 'Node 4: Secure Application & Figma Dashboards',
        desc: 'Jenkins injects the decrypted secret directly into build memory/environment variables at runtime. Application containers start securely with zero plaintext credentials saved to disk or git repositories.',
        tags: ['Production Isolation', 'Zero Plaintext Leaks', 'REST APIs Integration', 'Figma Dashboard']
    }
};

function selectVaultNode(nodeId) {
    const data = vaultData[nodeId];
    if (!data) return;

    document.querySelectorAll('.vault-step-node').forEach(n => n.classList.remove('active-node'));

    const activeNode = document.getElementById(`node-${nodeId}`);
    if (activeNode) activeNode.classList.add('active-node');

    const titleEl = document.getElementById('vault-node-title');
    const descEl = document.getElementById('vault-node-desc');
    const tagsEl = document.getElementById('vault-node-tags');

    if (titleEl && descEl && tagsEl) {
        // Fade out then in
        [titleEl, descEl, tagsEl].forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(6px)'; el.style.transition = 'none'; });

        setTimeout(() => {
            titleEl.innerText = data.title;
            descEl.innerText = data.desc;
            tagsEl.innerHTML = '';
            data.tags.forEach((tag, idx) => {
                const span = document.createElement('span');
                span.className = idx === 0 ? 'pill accent' : 'pill';
                span.innerText = tag;
                tagsEl.appendChild(span);
            });
            [titleEl, descEl, tagsEl].forEach(el => {
                el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }, 120);
    }
}

function setupVaultFlowInspector() {
    document.querySelectorAll('.vault-step-node').forEach(node => {
        node.addEventListener('click', () => {
            selectVaultNode(node.id.replace('node-', ''));
        });
    });
}

// ==========================================================================
// 12. ATLAS VAPT VULNERABILITY SCANNER SIMULATOR
// ==========================================================================
function setupVaptScannerSimulator() {
    const btn = document.getElementById('run-vapt-btn');
    if (!btn) return;

    let isScanning = false;

    btn.addEventListener('click', () => {
        if (isScanning) return;

        const targetInput = document.getElementById('vapt-target');
        const scanTypeSelect = document.getElementById('vapt-scan-type');
        const termBody = document.getElementById('vapt-term-body');
        const statusTag = document.getElementById('vapt-status-tag');

        if (!targetInput || !termBody || !statusTag) return;

        const target = targetInput.value.trim() || 'api.target-enterprise.internal';
        const scanType = scanTypeSelect ? scanTypeSelect.value : 'full';

        const scanProfiles = {
            full: [
                `[0.00s] Initializing ATLAS VAPT Engine v2.4 against: ${target}`,
                `[0.45s] Initiating TCP SYN-Scan on 65,535 ports...`,
                `[1.10s] Open ports detected: 80/tcp (HTTP), 443/tcp (HTTPS), 8080/tcp (Jenkins), 8200/tcp (Vault API)`,
                `[1.65s] Running service version ID & OS fingerprinting...`,
                `[2.20s] Auditing OWASP Top 10: Broken Access Control, Injection, Cryptographic Failures...`,
                `[2.85s] Vault API on :8200 — AppRole authentication enforced ✓`,
                `[3.30s] TLS 1.3 enforced. HSTS header: present. CSP header: present.`,
                `[3.70s] AUDIT COMPLETE: 0 Critical, 0 High, 2 Low (Header hardening recommended)`,
                `[4.00s] Report compiled & saved to ATLAS dashboard.`
            ],
            nmap: [
                `[0.00s] Initiating ATLAS Nmap scan against: ${target}`,
                `[0.40s] Starting TCP SYN Stealth Scan (-sS)...`,
                `[1.20s] PORT     STATE  SERVICE      VERSION`,
                `[1.21s] 22/tcp   open   ssh          OpenSSH 8.9`,
                `[1.22s] 80/tcp   open   http         nginx 1.24`,
                `[1.23s] 443/tcp  open   https        nginx 1.24 (TLS 1.3)`,
                `[1.24s] 8080/tcp open   http-proxy   Jenkins CI 2.414`,
                `[1.25s] 8200/tcp open   vaultapi     HashiCorp Vault 1.16`,
                `[2.60s] OS Detection: Ubuntu 22.04 LTS (Linux 5.15)`,
                `[3.00s] Nmap scan complete: 5 hosts up.`
            ],
            owasp: [
                `[0.00s] Initiating OWASP Top 10 Audit against: ${target}`,
                `[0.50s] A01 — Broken Access Control: Testing RBAC enforcement...`,
                `[1.10s] A01 — RBAC: Vault policies enforced correctly ✓`,
                `[1.60s] A02 — Cryptographic Failures: Checking TLS & key management...`,
                `[2.10s] A02 — TLS 1.3 with HSTS enforced ✓`,
                `[2.60s] A03 — Injection: Scanning SQL/Command injection vectors...`,
                `[3.10s] A03 — No injection vulnerabilities detected ✓`,
                `[3.50s] A05 — Security Misconfiguration: Checking headers...`,
                `[3.90s] A05 — X-Frame-Options: missing (Low severity) ⚠`,
                `[4.30s] OWASP AUDIT COMPLETE: 0 Critical, 0 High, 1 Low`
            ]
        };

        const logs = scanProfiles[scanType] || scanProfiles.full;

        isScanning = true;
        termBody.innerHTML = '';
        statusTag.className = 'vapt-status-scanning';
        statusTag.innerText = 'SCANNING...';
        btn.disabled = true;
        btn.querySelector('span').innerText = 'Scanning...';

        logs.forEach((log, index) => {
            setTimeout(() => {
                const p = document.createElement('p');
                if (log.includes('COMPLETE') || log.includes('AUDIT COMPLETE')) p.className = 'term-green';
                else if (log.includes('open') && log.includes('/tcp')) p.className = 'term-yellow';
                else if (log.includes('⚠')) p.className = 'term-yellow';
                else if (log.includes('✓')) p.className = 'term-green';
                else p.className = 'term-cyan';
                p.innerText = log;
                termBody.appendChild(p);
                termBody.scrollTop = termBody.scrollHeight;

                if (index === logs.length - 1) {
                    statusTag.className = 'vapt-status-complete';
                    statusTag.innerText = 'AUDIT COMPLETE';
                    showToast('✓ VAPT Vulnerability Scan Complete');
                    isScanning = false;
                    btn.disabled = false;
                    btn.querySelector('span').innerText = 'Execute VAPT Scan';
                }
            }, index * 420);
        });
    });
}

// ==========================================================================
// 13. SCROLL SPY, PROGRESS BAR & TELEMETRY BREADCRUMBS
// ==========================================================================
const sectionLocationMap = {
    'hero': 'HERO // OVERVIEW',
    'about': 'ABOUT // BACKGROUND',
    'skills': 'TECHNICAL SKILLS',
    'vault-demo': 'VAULT // SECRETS FLOW',
    'experience': 'EXPERIENCE // ANANTIXIA',
    'projects': 'FEATURED PROJECTS',
    'vapt-demo': 'ATLAS VAPT SCANNER',
    'research': 'CERTIFICATES & ACHIEVEMENTS',
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
        if (progressBar) {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const pct = (window.scrollY / Math.max(scrollTotal, 1)) * 100;
            progressBar.style.width = `${Math.min(Math.max(pct, 0), 100)}%`;
        }

        const scrollPos = window.scrollY + 140;
        sections.forEach(section => {
            const id = section.getAttribute('id');
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
                });
                if (telemetryLocText && sectionLocationMap[id]) {
                    telemetryLocText.innerText = sectionLocationMap[id];
                }
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
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

            skillCards.forEach((card, i) => {
                const cardCat = card.getAttribute('data-category');
                const match = category === 'all' || cardCat === category;

                if (match) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, i * 40);
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
const termHistory = [];
let termHistoryIndex = -1;
const allCommands = ['help', 'about', 'skills', 'experience', 'projects', 'certs', 'contact', 'vault', 'vapt', 'theme', 'neofetch', 'whoami', 'clear', 'sudo'];

function setupTerminal() {
    const input = document.getElementById('terminal-input');
    if (!input) return;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            if (cmd) {
                termHistory.unshift(cmd);
                if (termHistory.length > 50) termHistory.pop();
            }
            termHistoryIndex = -1;
            input.value = '';
            if (cmd) printTermLine(`ayush@vashishth:~$ ${cmd}`, 'term-cyan');
            handleTerminalCommand(cmd);

        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (termHistoryIndex < termHistory.length - 1) {
                termHistoryIndex++;
                input.value = termHistory[termHistoryIndex];
            }

        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (termHistoryIndex > 0) {
                termHistoryIndex--;
                input.value = termHistory[termHistoryIndex];
            } else {
                termHistoryIndex = -1;
                input.value = '';
            }

        } else if (e.key === 'Tab') {
            e.preventDefault();
            const partial = input.value.trim().toLowerCase();
            if (!partial) return;
            const matches = allCommands.filter(c => c.startsWith(partial));
            if (matches.length === 1) {
                input.value = matches[0];
            } else if (matches.length > 1) {
                printTermLine(`  Completions: ${matches.join('  ')}`, 'term-dim');
            }
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
            printTermLine('╔══════════════════════════════════════════╗', 'term-dim');
            printTermLine('  VASHISHTH SHELL  —  AVAILABLE COMMANDS   ', 'term-yellow');
            printTermLine('╚══════════════════════════════════════════╝', 'term-dim');
            printTermLine('  about       — Professional summary');
            printTermLine('  skills      — Technical skill stack');
            printTermLine('  experience  — Work history');
            printTermLine('  projects    — Engineering projects');
            printTermLine('  vault       — HashiCorp Vault architecture');
            printTermLine('  vapt        — ATLAS VAPT platform details');
            printTermLine('  certs       — Certifications & achievements');
            printTermLine('  contact     — Email, phone, LinkedIn, GitHub');
            printTermLine('  neofetch    — System info display');
            printTermLine('  whoami      — Current user info');
            printTermLine('  theme       — Toggle dark/light mode');
            printTermLine('  clear       — Clear terminal');
            printTermLine('  sudo        — Root access simulation');
            printTermLine('  ↑ / ↓      — Command history', 'term-dim');
            printTermLine('  Tab         — Auto-complete', 'term-dim');
            break;

        case 'about':
            printTermLine('┌─ AYUSH VASHISHTH ───────────────────────────────┐', 'term-dim');
            printTermLine('  Role:    Web Developer Intern — Security Engineering', 'term-green');
            printTermLine('  Org:     Anantixia Pvt. Ltd.');
            printTermLine('  Degree:  B.Tech CSE (Cyber Security & Forensics)');
            printTermLine('  Uni:     UPES Dehradun  |  CGPA: 7.95 / 10.0');
            printTermLine('  Status:  ● Available for Security Engineering roles', 'term-green');
            printTermLine('└─────────────────────────────────────────────────┘', 'term-dim');
            break;

        case 'skills':
            printTermLine('┌─ TECHNICAL SKILL STACK ─────────────────────────┐', 'term-dim');
            printTermLine('  SECURITY:    HashiCorp Vault, RBAC, VAPT, OWASP', 'term-green');
            printTermLine('  CI/CD:       Jenkins, Secure Pipelines, AppRole Auth');
            printTermLine('  PROGRAMMING: Java, Python (FastAPI), HTML5, CSS3');
            printTermLine('  APIs:        REST APIs, JSON Schemas, Async Backends');
            printTermLine('  TOOLS:       Git, GitHub, Linux, Jenkins, Nmap');
            printTermLine('  DATABASES:   MySQL, MongoDB');
            printTermLine('└─────────────────────────────────────────────────┘', 'term-dim');
            break;

        case 'experience':
            printTermLine('┌─ PROFESSIONAL EXPERIENCE ───────────────────────┐', 'term-dim');
            printTermLine('  Anantixia Pvt. Ltd.', 'term-yellow');
            printTermLine('  Web Developer Intern — Security Engineering');
            printTermLine('  Mar 2026 – Present');
            printTermLine('  · HashiCorp Vault + Jenkins secrets management');
            printTermLine('  · RBAC policy configuration & CI/CD hardening');
            printTermLine('  · Figma-to-code dashboards + REST API integration');
            printTermLine('  ─────────────────────────────────────────────────', 'term-dim');
            printTermLine('  Nauka Foundation', 'term-yellow');
            printTermLine('  Social Internship — Web Developer  |  Jun–Jul 2024');
            printTermLine('  · WordPress site development & donation page design');
            printTermLine('└─────────────────────────────────────────────────┘', 'term-dim');
            break;

        case 'projects':
            printTermLine('┌─ ENGINEERING PROJECTS ──────────────────────────┐', 'term-dim');
            printTermLine('  ATLAS — Advanced Testing Lab for App Security', 'term-yellow');
            printTermLine('  Stack: FastAPI + Nmap + OWASP Top 10 + REST APIs');
            printTermLine('  Automated vulnerability assessment with HTML/JSON');
            printTermLine('  security reporting dashboards.');
            printTermLine('  ─────────────────────────────────────────────────', 'term-dim');
            printTermLine('  ATS Resume Builder', 'term-yellow');
            printTermLine('  Full-stack: REST APIs, PDF export, ATS optimization,');
            printTermLine('  job description analysis & profile management.');
            printTermLine('└─────────────────────────────────────────────────┘', 'term-dim');
            break;

        case 'vault':
            printTermLine('┌─ HASHICORP VAULT ARCHITECTURE ──────────────────┐', 'term-dim');
            printTermLine('  [1] Jenkins Pipeline  →  Build Execution Trigger', 'term-yellow');
            printTermLine('  [2] HashiCorp Vault   →  Centralized Secrets Engine', 'term-green');
            printTermLine('  [3] Dynamic Token     →  Ephemeral RBAC Credentials');
            printTermLine('  [4] Secure App Deploy →  Zero Plaintext Secrets');
            printTermLine('  ─────────────────────────────────────────────────', 'term-dim');
            printTermLine('  Encryption: AES-256 GCM  |  Auth: AppRole');
            printTermLine('  TTL: Short-lived tokens auto-revoked on expiry');
            printTermLine('└─────────────────────────────────────────────────┘', 'term-dim');
            break;

        case 'vapt':
            printTermLine('┌─ ATLAS VAPT PLATFORM ───────────────────────────┐', 'term-dim');
            printTermLine('  Platform: ATLAS — Adv. Testing Lab for App Security', 'term-yellow');
            printTermLine('  Engine:   FastAPI v2.4 Async Scan Engine');
            printTermLine('  Modules:  Nmap Port Scanner, OWASP Top 10 Auditor');
            printTermLine('  Targets:  Web Applications & IoT Devices');
            printTermLine('  Output:   Automated HTML/JSON vulnerability reports');
            printTermLine('  Status:   ● ATLAS Platform — ACTIVE', 'term-green');
            printTermLine('└─────────────────────────────────────────────────┘', 'term-dim');
            break;

        case 'certs':
            printTermLine('┌─ CERTIFICATIONS & ACHIEVEMENTS ─────────────────┐', 'term-dim');
            printTermLine('  CERTIFICATES:', 'term-yellow');
            printTermLine('  · CodeSignal: Understanding LLMs & Basic Prompting');
            printTermLine('  · TEEX: Detecting & Responding to Cyber Attacks');
            printTermLine('  ─────────────────────────────────────────────────', 'term-dim');
            printTermLine('  ACHIEVEMENTS:', 'term-yellow');
            printTermLine('  · Published research on Post-Quantum Cryptography');
            printTermLine('    (Risk-based framework for hybrid enterprise networks)');
            printTermLine('  · Organized HyperVision Student Chapter Hackathon');
            printTermLine('└─────────────────────────────────────────────────┘', 'term-dim');
            break;

        case 'contact':
            printTermLine('┌─ CONTACT INFORMATION ───────────────────────────┐', 'term-dim');
            printTermLine('  Email:    ayushvs1201@gmail.com', 'term-green');
            printTermLine('  Phone:    +91-9045495707');
            printTermLine('  LinkedIn: linkedin.com/in/ayushvs1201');
            printTermLine('  GitHub:   github.com/Ayush-Vashishth');
            printTermLine('└─────────────────────────────────────────────────┘', 'term-dim');
            break;

        case 'neofetch':
            printTermLine('       ___       ayush@vashishth-shell', 'term-cyan');
            printTermLine('      /\\__\\      ─────────────────────────────', 'term-cyan');
            printTermLine('     /\\/__/      OS:     Ubuntu 22.04 LTS / Kali');
            printTermLine('    /\\  \\       Shell:  zsh 5.9 + oh-my-zsh');
            printTermLine('    \\/  /       Role:   Security Engineer Intern');
            printTermLine('     \\__/        Stack:  Vault · Jenkins · FastAPI');
            printTermLine('                 Uni:    UPES Dehradun', '');
            printTermLine('                 CGPA:   7.95 / 10.0', 'term-green');
            printTermLine('                 Status: ● Available', 'term-green');
            break;

        case 'whoami':
            printTermLine('ayush-vashishth  [Web Developer Intern — Security Engineering]', 'term-green');
            printTermLine('Groups: security, developers, vault-admins, jenkins-ci');
            break;

        case 'theme':
            const body = document.body;
            if (body.classList.contains('theme-light')) {
                body.classList.replace('theme-light', 'theme-dark');
                localStorage.setItem('vashishth_theme', 'dark');
                updateThemeIcon(false);
                printTermLine('Theme switched → Executive Dark Mode', 'term-green');
                showToast('Switched to Executive Dark Mode');
            } else {
                body.classList.replace('theme-dark', 'theme-light');
                localStorage.setItem('vashishth_theme', 'light');
                updateThemeIcon(true);
                printTermLine('Theme switched → Clean Light Mode', 'term-yellow');
                showToast('Switched to Clean Light Mode');
            }
            break;

        case 'clear':
            const out = document.getElementById('terminal-output');
            if (out) out.innerHTML = '';
            break;

        case 'sudo':
            printTermLine('[sudo] password for ayush: ••••••••••', 'term-dim');
            setTimeout(() => printTermLine('ACCESS GRANTED — Root privileges active for Ayush Vashishth.', 'term-highlight'), 700);
            setTimeout(() => printTermLine('Welcome, root. With great power comes great responsibility.', 'term-green'), 1200);
            break;

        default:
            if (cmd !== '') {
                printTermLine(`bash: command not found: '${cmd}'`, 'term-dim');
                printTermLine(`Type 'help' to see all available commands.`, 'term-dim');
            }
            break;
    }
}

// ==========================================================================
// 16. WEB3FORMS CONTACT FORM SUBMISSION HANDLER
// ==========================================================================
function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = document.getElementById('btn-submit-contact');
    if (!submitBtn) return;

    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `<svg class="svg-icon" viewBox="0 0 24 24" style="animation:spin 1s linear infinite"><circle cx="12" cy="12" r="9" stroke-dasharray="28 56" stroke-linecap="round"/></svg><span>Sending...</span>`;
    submitBtn.disabled = true;

    fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                showToast('✓ Message sent! I\'ll be in touch soon.');
                form.reset();
            } else {
                showToast('✗ Error. Please email ayushvs1201@gmail.com');
            }
        })
        .catch(() => showToast('✗ Network error. Please email ayushvs1201@gmail.com'))
        .finally(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        });
}

// ==========================================================================
// 17. SCROLL REVEAL ANIMATION ENGINE
// ==========================================================================
function setupScrollReveal() {
    const targets = [
        { selector: '.skill-card',        delays: true  },
        { selector: '.project-card',      delays: true  },
        { selector: '.timeline-item',     delays: true  },
        { selector: '.info-card',         delays: true  },
        { selector: '.edu-card',          delays: true  },
        { selector: '.vault-step-node',   delays: true  },
        { selector: '.contact-card-link', delays: true  },
        { selector: '.section-title',     delays: false },
        { selector: '.section-tag',       delays: false },
        { selector: '.section-desc',      delays: false },
        { selector: '.contact-form',      delays: false },
        { selector: '.vault-inspector-box', delays: false },
        { selector: '.vapt-sim-card',     delays: false },
        { selector: '.terminal-container', delays: false },
    ];

    targets.forEach(({ selector, delays }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add('reveal');
            if (delays && i < 4) el.classList.add(`reveal-delay-${i + 1}`);
        });
    });

    triggerReveal();
    window.addEventListener('scroll', triggerReveal, { passive: true });
}

function triggerReveal() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 60) {
            el.classList.add('visible');
        }
    });
}

// ==========================================================================
// 18. BUTTON RIPPLE MICRO-INTERACTION
// ==========================================================================
function setupButtonRipple() {
    // Inject ripple keyframe style once
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = '@keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }';
        document.head.appendChild(style);
    }

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position:absolute;border-radius:50%;
                width:${size}px;height:${size}px;
                left:${e.clientX - rect.left - size / 2}px;
                top:${e.clientY - rect.top - size / 2}px;
                background:rgba(255,255,255,0.22);
                transform:scale(0);animation:rippleAnim 0.55s linear;
                pointer-events:none;
            `;
            if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}
