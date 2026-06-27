/* ============================================================
   Portfolio — main.js
   Port dari resources/js/app.js + semua modules (Laravel/Vite)
   ke vanilla JS supaya bisa jalan langsung di static hosting
   (GitHub Pages) tanpa proses build.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initProgressBar();
    initTypingAnimation();
    initParticles();
    initRevealOnScroll();
    initCounters();
    initSkillBars();
    initFlipBook();
    initContactForm();
    initThemeToggle();
    initLangSwitcher();
    initMobileMenu();
    initSmoothAnchorScroll();
});

/* ── Custom cursor (desktop only) ── */
function initCursor() {
    if (!window.matchMedia('(min-width: 1024px) and (hover: hover)').matches) return;

    const dot = document.createElement('div');
    dot.id = 'cd';
    const ring = document.createElement('div');
    ring.id = 'cr';
    document.body.append(dot, ring);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };

    window.addEventListener('mousemove', (e) => {
        pos.x = e.clientX;
        pos.y = e.clientY;
        dot.style.transform = `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`;
    });

    function raf() {
        ringPos.x += (pos.x - ringPos.x) * 0.18;
        ringPos.y += (pos.y - ringPos.y) * 0.18;
        ring.style.transform = `translate(-50%, -50%) translate(${ringPos.x}px, ${ringPos.y}px)`;
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    function attachHoverListeners() {
        document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
            if (el.dataset.cursorBound) return;
            el.dataset.cursorBound = '1';
            el.addEventListener('mouseenter', () => {
                ring.style.width = '50px';
                ring.style.height = '50px';
                ring.style.borderColor = 'rgba(0,245,255,.8)';
            });
            el.addEventListener('mouseleave', () => {
                ring.style.width = '30px';
                ring.style.height = '30px';
                ring.style.borderColor = 'rgba(0,245,255,.4)';
            });
        });
    }
    attachHoverListeners();
    // Re-scan periodically in case flipbook / modals inject new elements
    setInterval(attachHoverListeners, 1500);
}

/* ── Scroll progress bar ── */
function initProgressBar() {
    const bar = document.createElement('div');
    bar.id = 'prog';
    document.body.appendChild(bar);

    function update() {
        const h = document.documentElement;
        const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
        bar.style.width = `${scrolled || 0}%`;
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
}

/* ── Typing animation hero ── */
function initTypingAnimation() {
    const el = document.querySelector('[data-typing-roles]');
    if (!el) return;

    let roles = [];
    try { roles = JSON.parse(el.dataset.typingRoles || '[]'); } catch { roles = []; }
    if (!roles.length) return;

    let roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
        const current = roles[roleIndex];
        if (!deleting) {
            charIndex++;
            el.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(tick, 1800);
                return;
            }
        } else {
            charIndex--;
            el.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        setTimeout(tick, deleting ? 35 : 70);
    }
    tick();
}

/* ── Particle background canvas ── */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
        const count = window.innerWidth < 768 ? 28 : 60;
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.8 + 0.4,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            alpha: Math.random() * 0.5 + 0.1,
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#00f5ff';
        for (const p of particles) {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    resize();
    createParticles();
    window.addEventListener('resize', () => { resize(); createParticles(); });
    if (!prefersReducedMotion) draw();
}

/* ── Reveal on scroll (.fade-up) ── */
function initRevealOnScroll() {
    const elements = document.querySelectorAll('.fade-up');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    elements.forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
        observer.observe(el);
    });
}

/* ── Animated number counters ── */
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseFloat(el.dataset.counter || '0');
            const suffix = el.dataset.counterSuffix || '';
            const duration = 1600;
            const start = performance.now();

            function step(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target) + suffix;
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
            observer.unobserve(el);
        });
    }, { threshold: 0.4 });

    counters.forEach((el) => observer.observe(el));
}

/* ── Skill progress bars ── */
function initSkillBars() {
    const bars = document.querySelectorAll('[data-skill-fill]');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const pct = el.dataset.skillFill || '0';
            requestAnimationFrame(() => { el.style.width = `${pct}%`; });
            observer.unobserve(el);
        });
    }, { threshold: 0.3 });

    bars.forEach((el) => observer.observe(el));
}

/* ── Flip-book custom (vanilla JS + CSS 3D transform) ──
   Efek membalik halaman seperti buku asli, tanpa dependency CDN eksternal
   supaya selalu jalan di GitHub Pages / hosting statis apa pun. */
function initFlipBook() {
    const openBtn = document.getElementById('open-book-btn');
    const bookCoverEl = document.getElementById('book-cover');
    const closeBtns = document.querySelectorAll('[data-close-book]');
    const container = document.getElementById('flipbook-container');
    const flipbookEl = document.getElementById('flipbook');
    const prevBtn = document.querySelector('[data-flip-prev]');
    const nextBtn = document.querySelector('[data-flip-next]');
    const indicator = document.querySelector('[data-page-indicator]');

    if (!container || !flipbookEl) return;

    const pages = Array.from(flipbookEl.querySelectorAll('.page'));
    const total = pages.length;
    let current = 0;
    let animating = false;

    // Bungkus tiap .page dengan struktur front/back untuk efek flip 3D,
    // dan beri z-index awal supaya stacking benar.
    pages.forEach((page, i) => {
        page.classList.add('fb-page');
        page.style.zIndex = String(total - i);
        if (i === 0) page.classList.add('fb-active');
    });

    function updateIndicator() {
        if (indicator) indicator.textContent = `${current + 1} / ${total}`;
        if (prevBtn) prevBtn.disabled = current === 0;
        if (nextBtn) nextBtn.disabled = current === total - 1;
    }

    function goTo(index, direction) {
        if (animating || index < 0 || index >= total || index === current) return;
        animating = true;

        const forward = direction === 'next';
        const activePage = pages[forward ? current : index];
        const targetPage = pages[forward ? index : current];

        activePage.style.zIndex = String(total + 2);
        targetPage.style.zIndex = String(total + 1);

        // Mulai dengan halaman aktif membalik keluar
        requestAnimationFrame(() => {
            activePage.classList.add(forward ? 'fb-flip-next' : 'fb-flip-prev');
        });

        // Di tengah animasi (saat halaman lama sudah "tegak lurus"/tak terlihat),
        // baru tampilkan halaman target agar terkesan halaman baru terbuka.
        setTimeout(() => {
            targetPage.classList.add('fb-active');
        }, 320);

        setTimeout(() => {
            activePage.classList.remove('fb-flip-next', 'fb-flip-prev', 'fb-active');
            activePage.style.zIndex = String(total - (forward ? index : current));
            targetPage.style.zIndex = String(total - (forward ? index : current));
            current = index;
            updateIndicator();
            animating = false;
        }, 650);
    }

    function next() { goTo(current + 1, 'next'); }
    function prev() { goTo(current - 1, 'prev'); }

    function openBook() {
        container.classList.remove('hidden');
        container.classList.add('is-open');
        document.getElementById('home')?.style.setProperty('display', 'none');
        document.getElementById('scroll-sections')?.style.setProperty('display', 'none');
        document.querySelector('footer')?.style.setProperty('display', 'none');
        window.scrollTo({ top: 0 });
        updateIndicator();
    }

    function closeBook() {
        container.classList.add('hidden');
        container.classList.remove('is-open');
        document.getElementById('home')?.style.removeProperty('display');
        document.getElementById('scroll-sections')?.style.removeProperty('display');
        document.querySelector('footer')?.style.removeProperty('display');
    }

    openBtn?.addEventListener('click', openBook);
    bookCoverEl?.addEventListener('click', openBook);
    closeBtns.forEach((btn) => btn.addEventListener('click', closeBook));
    nextBtn?.addEventListener('click', next);
    prevBtn?.addEventListener('click', prev);

    // Navigasi keyboard saat buku terbuka
    document.addEventListener('keydown', (e) => {
        if (!container.classList.contains('is-open')) return;
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'Escape') closeBook();
    });

    // Swipe untuk mobile
    let touchStartX = null;
    flipbookEl.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    flipbookEl.addEventListener('touchend', (e) => {
        if (touchStartX === null) return;
        const diff = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(diff) > 50) { diff < 0 ? next() : prev(); }
        touchStartX = null;
    }, { passive: true });
}

/* ── Contact form (mailto fallback, tidak ada backend di static site) ── */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('[type="submit"]');
    const feedbackEl = document.getElementById('contact-form-feedback');
    const destinationEmail = form.dataset.contactEmail || '';

    function setFeedback(message, isError = false) {
        if (!feedbackEl) return;
        feedbackEl.textContent = message;
        feedbackEl.style.color = isError ? '#f87171' : 'var(--c)';
        feedbackEl.classList.remove('hidden');
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());

        if (!data.name || !data.email || !data.message) {
            setFeedback('Harap isi semua field yang wajib (nama, email, pesan).', true);
            return;
        }

        const subject = encodeURIComponent(data.subject || `Pesan dari ${data.name}`);
        const body = encodeURIComponent(
            `Nama: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
        );

        submitBtn.disabled = true;
        window.location.href = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;
        setFeedback('Membuka aplikasi email Anda untuk mengirim pesan…');
        setTimeout(() => { submitBtn.disabled = false; }, 1200);
    });
}

/* ── Dark / light theme toggle ── */
function initThemeToggle() {
    const stored = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.toggle('light', stored === 'light');

    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
        updateThemeIcon(btn, stored);
        btn.addEventListener('click', () => {
            const current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.classList.toggle('light', next === 'light');
            localStorage.setItem('theme', next);
            document.querySelectorAll('[data-theme-toggle]').forEach((b) => updateThemeIcon(b, next));
        });
    });
}
function updateThemeIcon(btn, theme) {
    const sun = btn.querySelector('[data-icon-light]');
    const moon = btn.querySelector('[data-icon-dark]');
    if (sun) sun.style.display = theme === 'light' ? 'block' : 'none';
    if (moon) moon.style.display = theme === 'dark' ? 'block' : 'none';
}

/* ── Language switcher dropdown (UI only — toggle ID/EN text blocks) ── */
function initLangSwitcher() {
    document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const menu = btn.nextElementSibling;
            menu?.classList.toggle('hidden');
        });
    });
    document.addEventListener('click', () => {
        document.querySelectorAll('[data-lang-menu]').forEach((m) => m.classList.add('hidden'));
    });

    document.querySelectorAll('[data-lang-option]').forEach((opt) => {
        opt.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = opt.dataset.langOption;
            setLanguage(lang);
        });
    });

    const savedLang = localStorage.getItem('lang') || 'id';
    setLanguage(savedLang);
}
function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const text = el.dataset[lang === 'en' ? 'en' : 'id'];
        if (text !== undefined) el.textContent = text;
    });
    document.querySelectorAll('[data-lang-current]').forEach((el) => {
        el.textContent = lang.toUpperCase();
    });
}

/* ── Mobile hamburger menu ── */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
    menu.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => menu.classList.add('hidden'));
    });
}

/* ── Smooth scroll untuk anchor link ── */
function initSmoothAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id.length > 1) {
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}
