// ============================================================
// Sky Art Creations — JavaScript (alleen voor index.html)
// ============================================================

let currentSlide = 0;
let filteredSlides = [];

document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initHeroParticles();
    initScrollAnimations();
    initCounters();
    initGalleryTabs();
    initImageModal();
    initLoadScreen();
    initCookieBanner();
});

// ---------------- NAVIGATIE ----------------
function initNav() {
    const nav    = document.getElementById('siteNav');
    const burger = document.getElementById('hamburger');
    const tabs   = document.getElementById('navTabs');
    const links  = document.querySelectorAll('.nav-tab-link');

    window.addEventListener('scroll', () => {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
        updateActiveTab();
    }, { passive: true });

    if (burger && tabs) {
        burger.addEventListener('click', () => {
            tabs.classList.toggle('open');
            const open = tabs.classList.contains('open');
            const sp = burger.querySelectorAll('span');
            sp[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
            sp[1].style.opacity   = open ? '0' : '1';
            sp[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
        });
    }
    links.forEach(a => a.addEventListener('click', () => tabs && tabs.classList.remove('open')));
}

function updateActiveTab() {
    const sections = ['hero','about','services','gallery','comparison','color-tool','project-request','contact'];
    let current = '';
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) current = id;
    });
    document.querySelectorAll('.nav-tab-link').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}

// ---------------- DEELTJES ----------------
function initHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 4 + 1;
        Object.assign(p.style, {
            width: size + 'px',
            height: size + 'px',
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 15 + 's',
            animationDuration: Math.random() * 15 + 10 + 's',
        });
        container.appendChild(p);
    }
}

// ---------------- SCROLL-ANIMATIES ----------------
function initScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const siblings = e.target.parentElement.querySelectorAll('.fade-in:not(.visible)');
            let delay = 0;
            siblings.forEach(s => {
                if (s === e.target || s.getBoundingClientRect().top < window.innerHeight) {
                    s.style.transitionDelay = delay + 'ms';
                    s.classList.add('visible');
                    delay += 100;
                }
            });
            e.target.classList.add('visible');
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ---------------- TELLERS ----------------
function initCounters() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(e.target);
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number[data-target]').forEach(el => observer.observe(el));
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.dataset.suffix ?? '+';
    const duration = 1600;
    const start = performance.now();
    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

// ---------------- GALERIJ ----------------
function initGalleryTabs() {
    const tabBtns = document.querySelectorAll('.gallery-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterGallery(this.getAttribute('data-category'));
        });
    });
    filterGallery('all');
}

function filterGallery(category) {
    filteredSlides = [];
    document.querySelectorAll('.gallery-slide').forEach(slide => {
        const cat = slide.getAttribute('data-category');
        if (category === 'all' || cat === category) filteredSlides.push(slide);
    });
    currentSlide = 0;
    renderVisibleSlide();
    buildIndicators();
}

function renderVisibleSlide() {
    document.querySelectorAll('.gallery-slide').forEach(s => s.classList.remove('active'));
    if (filteredSlides.length > 0) filteredSlides[currentSlide].classList.add('active');
    updateIndicators();
}

function nextSlide() {
    if (!filteredSlides.length) return;
    currentSlide = (currentSlide + 1) % filteredSlides.length;
    renderVisibleSlide();
}

function previousSlide() {
    if (!filteredSlides.length) return;
    currentSlide = (currentSlide - 1 + filteredSlides.length) % filteredSlides.length;
    renderVisibleSlide();
}

function goToSlide(index) {
    if (index < 0 || index >= filteredSlides.length) return;
    currentSlide = index;
    renderVisibleSlide();
}

function buildIndicators() {
    const container = document.getElementById('galleryIndicators');
    if (!container) return;
    container.innerHTML = '';
    filteredSlides.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.classList.add('indicator');
        btn.setAttribute('aria-label', 'Ga naar dia ' + (i + 1));
        if (i === currentSlide) btn.classList.add('active');
        btn.addEventListener('click', () => goToSlide(i));
        container.appendChild(btn);
    });
}

function updateIndicators() {
    document.querySelectorAll('#galleryIndicators .indicator').forEach((ind, i) => {
        ind.classList.toggle('active', i === currentSlide);
    });
}

// ---------------- AFBEELDING VERGROTEN ----------------
function initImageModal() {
    const modal    = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('#imageModal .close');
    if (!modal) return;

    document.querySelectorAll('.comparison-image').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function () {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

// ---------------- SCROLLEN ----------------
function scrollToContact() {
    const el = document.getElementById('project-request');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// ---------------- LAADSCHERM (alleen bij eerste bezoek per sessie) ----------------
function initLoadScreen() {
    const screen  = document.getElementById('loadScreen');
    const starsEl = document.getElementById('lsStars');
    if (!screen) return;

    let seen = false;
    try { seen = sessionStorage.getItem('skyartLoaded') === '1'; } catch (e) {}
    if (seen) { screen.remove(); return; }

    if (starsEl) {
        for (let i = 0; i < 100; i++) {
            const s = document.createElement('div');
            s.className = 'ls-star';
            const size = Math.random() * 2 + 0.5;
            s.style.cssText =
                `width:${size}px;height:${size}px;top:${Math.random()*100}%;left:${Math.random()*100}%;` +
                `animation-duration:${Math.random()*2+1}s;animation-delay:${Math.random()*3}s;`;
            starsEl.appendChild(s);
        }
    }

    setTimeout(() => screen.classList.add('hidden'), 5500);
    setTimeout(() => screen.remove(), 6500);
    try { sessionStorage.setItem('skyartLoaded', '1'); } catch (e) {}
}

// ---------------- GOOGLE TRANSLATE (pas na cookie-keuze "Accepteren") ----------------
function loadTranslate() {
    if (document.getElementById('gt-script')) return;
    window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement(
            { pageLanguage: 'nl', includedLanguages: 'fr,en' },
            'google_translate_element'
        );
    };
    const s = document.createElement('script');
    s.id = 'gt-script';
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(s);
}

// ---------------- COOKIEBANNER ----------------
function initCookieBanner() {
    const banner  = document.getElementById('cookieBanner');
    const accept  = document.getElementById('cookieAccept');
    const decline = document.getElementById('cookieDecline');
    if (!banner) return;

    let choice = null;
    try { choice = localStorage.getItem('cookieChoice'); } catch (e) {}

    if (choice === 'accepted') loadTranslate();

    if (!choice) {
        setTimeout(() => banner.classList.add('show'), 6000);
    } else {
        banner.remove();
    }

    function dismiss(c) {
        try { localStorage.setItem('cookieChoice', c); } catch (e) {}
        banner.classList.remove('show');
        banner.classList.add('hide');
        setTimeout(() => banner.remove(), 600);
        if (c === 'accepted') loadTranslate();
    }

    if (accept)  accept.addEventListener('click',  () => dismiss('accepted'));
    if (decline) decline.addEventListener('click', () => dismiss('declined'));
}

window.SkyArtCreations = { scrollToContact, nextSlide, previousSlide, goToSlide };