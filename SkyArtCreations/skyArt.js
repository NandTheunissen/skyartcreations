// Sky Art Creations - JavaScript Functions

// Global variables
let currentSlide = 0;
let isAnimating = false;
let currentPaintLayer = 0;
let planeColor = '#0ea5e9';
const images = [
    'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583829932564-d6d8a25da1e5?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop'
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeGallery();
    initializePaintProcess();
    initializeColorPicker();
});

// Scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll to contact section
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Gallery Functions
function initializeGallery() {
    const slides = document.querySelectorAll('.gallery-slide');
    const indicators = document.querySelectorAll('.indicator');

    // Show first slide
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    if (indicators.length > 0) {
        indicators[0].classList.add('active');
    }

    // Initialize comparison content
    updateComparisonContent();
}

// Color Picker Functions
function initializeColorPicker() {
    const colorPicker = document.getElementById('colorPicker');
    const colorPresets = document.querySelectorAll('.color-preset');
    const aircraftOverlay = document.getElementById('aircraftColorOverlay');

    // Initialize with default color
    updateAircraftColor(planeColor);

    // Color picker input handler
    if (colorPicker) {
        colorPicker.addEventListener('input', function(e) {
            planeColor = e.target.value;
            updateAircraftColor(planeColor);
        });
    }

    // Color preset handlers
    colorPresets.forEach(preset => {
        preset.addEventListener('click', function() {
            const color = this.dataset.color;
            planeColor = color;
            updateAircraftColor(color);
            if (colorPicker) {
                colorPicker.value = color;
            }
        });
    });
}

function updateAircraftColor(color) {
    const aircraftOverlay = document.getElementById('aircraftColorOverlay');
    const basecoatLayer = document.getElementById('basecoatLayer');
    const designLayer = document.getElementById('designLayer');
    const effectLayer = document.getElementById('effectLayer'); // <-- nieuwe laag

    // Voor overlay
    if (aircraftOverlay) {
        aircraftOverlay.style.background = color;
    }

    // Basecoat met transparantie
    if (basecoatLayer) {
        basecoatLayer.style.background = `${color}cc`; // cc = ±80% opacity
    }

    // Designlaag met gradient
    if (designLayer) {
        const [r, g, b] = hexToRgb(color);
        const gradientColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
        designLayer.style.background = `linear-gradient(135deg, ${gradientColor}, ${color}dd)`;
    }

    // Nieuw: effectlaag met lichte glans
    if (effectLayer) {
        const [r, g, b] = hexToRgb(color);
        effectLayer.style.background = `radial-gradient(circle at center, rgba(${r}, ${g}, ${b}, 0.2), transparent)`;
        effectLayer.style.opacity = 0.2;
    }
}


function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [14, 165, 233]; // fallback to sky-blue
}

// Enhanced Gallery Functions with wrap-around
function nextSlide() {
    const slides = document.querySelectorAll('.gallery-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (slides.length === 0) return;

    // Remove active class from current slide and indicator
    slides[currentSlide].classList.remove('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.remove('active');
    }

    // Move to next slide (wrap around)
    currentSlide = (currentSlide + 1) % slides.length;

    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }

    // Update comparison content
    updateComparisonContent();
}

function previousSlide() {
    const slides = document.querySelectorAll('.gallery-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (slides.length === 0) return;

    // Remove active class from current slide and indicator
    slides[currentSlide].classList.remove('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.remove('active');
    }

    // Move to previous slide (wrap around)
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;

    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }

    // Update comparison content
    updateComparisonContent();
}

function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.gallery-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (slideIndex >= slides.length || slideIndex < 0) return;

    // Remove active class from current slide and indicator
    slides[currentSlide].classList.remove('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.remove('active');
    }

    // Set new current slide
    currentSlide = slideIndex;

    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }

    // Update comparison content
    updateComparisonContent();
}

function updateComparisonContent() {
    const comparisonList = document.getElementById('comparisonList');

    const projectComparisons = [
        ['Gebruik van milieuvriendelijke lakken', 'Meerdere beschermende lagen', 'Custom kleurschema\'s op maat', 'Professionele voorbereiding van het oppervlak', 'Kwaliteitscontrole in elke fase'],
        ['Premium materialen voor luxe uitstraling', 'Metallic accenten voor elegantie', 'UV-resistente topcoat', 'Handmatige afwerking van details', 'Certificering volgens luchtvaartnormen'],
        ['Klassieke kleurcombinaties', 'Hoogglans polijsting', 'Weerbestendige coating', 'Snelle droogtijd materialen', 'Garantie op kleurechtheid'],
        ['Moderne striping technieken', 'Robuuste helikopter coating', 'Anti-statische behandeling', 'Corrosiebestendige primer', 'Periodieke onderhoudsinstructies']
    ];

    if (comparisonList && projectComparisons[currentSlide]) {
        comparisonList.innerHTML = '';
        projectComparisons[currentSlide].forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            comparisonList.appendChild(li);
        });
    }
}

// Paint Process Animation
function initializePaintProcess() {
    // Reset all layers
    const layers = document.querySelectorAll('.paint-layer');
    const steps = document.querySelectorAll('.process-step');
    const layerInfo = document.getElementById('layerInfo');

    layers.forEach(layer => {
        layer.classList.remove('animate');
    });

    steps.forEach(step => {
        step.classList.remove('active');
    });

    if (layerInfo) {
        layerInfo.classList.remove('show');
    }
}

function startPaintAnimation() {
    if (isAnimating) return;

    isAnimating = true;
    currentPaintLayer = 0;

    const button = document.getElementById('paintButton');
    const layerInfo = document.getElementById('layerInfo');
    const layerName = document.getElementById('layerName');
    const layerDescription = document.getElementById('layerDescription');

    const layers = [
        {
            element: document.getElementById('primerLayer'),
            step: document.getElementById('step0'),
            name: 'Primer',
            description: 'Basis beschermlaag wordt aangebracht'
        },
        {
            element: document.getElementById('basecoatLayer'),
            step: document.getElementById('step1'),
            name: 'Basecoat',
            description: 'Kleur foundation wordt toegepast'
        },
        {
            element: document.getElementById('designLayer'),
            step: document.getElementById('step2'),
            name: 'Custom Design',
            description: 'Unieke afwerking wordt aangebracht'
        },
        {
            element: document.getElementById('clearcoatLayer'),
            step: document.getElementById('step3'),
            name: 'Clear Coat',
            description: 'Beschermende toplaag wordt afgewerkt'
        }
    ];

    // Reset everything
    initializePaintProcess();

    // Update button
    if (button) {
        button.textContent = 'Lakken in uitvoering...';
        button.disabled = true;
    }

    // Show layer info
    if (layerInfo) {
        layerInfo.classList.add('show');
    }

    // Animate each layer
    function animateNextLayer() {
        if (currentPaintLayer >= layers.length) {
            // Animation complete
            setTimeout(() => {
                if (button) {
                    button.textContent = 'Start Lakproces Animatie';
                    button.disabled = false;
                }

                if (layerName && layerDescription) {
                    layerName.textContent = 'Klaar!';
                    layerDescription.textContent = 'Het lakproces is voltooid';
                }

                // Reset after 3 seconds
                setTimeout(() => {
                    initializePaintProcess();
                    if (layerName && layerDescription) {
                        layerName.textContent = 'Klik om te starten';
                        layerDescription.textContent = 'Bekijk het lakproces stap voor stap';
                    }
                    isAnimating = false;
                }, 3000);
            }, 1000);
            return;
        }

        const current = layers[currentPaintLayer];

        // Update info
        if (layerName && layerDescription) {
            layerName.textContent = current.name;
            layerDescription.textContent = current.description;
        }

        // Activate step
        if (current.step) {
            current.step.classList.add('active');
        }

        // Animate layer
        if (current.element) {
            current.element.classList.add('animate');
        }

        currentPaintLayer++;

        // Schedule next layer
        setTimeout(animateNextLayer, 2000);
    }

    // Start animation
    setTimeout(animateNextLayer, 500);
}

// Auto-advance gallery (optional)
function startGalleryAutoplay() {
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Keyboard navigation for gallery
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        previousSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === ' ' || e.key === 'Enter') {
        if (e.target.id === 'paintButton') {
            e.preventDefault();
            startPaintAnimation();
        }
    }
});

// Touch/swipe support for gallery
let touchStartX = 0;
let touchEndX = 0;

const galleryContainer = document.getElementById('galleryContainer');

if (galleryContainer) {
    galleryContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    galleryContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide(); // Swipe left
        } else {
            previousSlide(); // Swipe right
        }
    }
}

// Smooth scroll for all internal links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Parallax effect for hero section (optional enhancement)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');

    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

function safeQuerySelectorAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Elements not found: ${selector}`);
        return [];
    }
}

// Export functions for potential external use
window.SkyArtCreations = {
    scrollToContact,
    nextSlide,
    previousSlide,
    goToSlide,
    startPaintAnimation,
    updateAircraftColor,
    planeColor
};
