// Advanced Features for Silk Road Global Website

// 1. Advanced Particle System for Hero Section
class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 10000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particle.x -= dx * 0.01;
                particle.y -= dy * 0.01;
            }
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(212, 175, 55, ${particle.opacity})`;
            this.ctx.fill();
            
            // Connect nearby particles
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 * (1 - distance / 80)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// 2. Advanced Scroll Animations with GSAP-like functionality
class ScrollAnimations {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.bindElements();
        this.bindScroll();
    }

    bindElements() {
        // Define animation configurations
        const configs = [
            { selector: '.section-title', animation: 'slideUp', delay: 0 },
            { selector: '.business-card', animation: 'slideUp', delay: 0.1, stagger: 0.1 },
            { selector: '.brand-card', animation: 'slideUp', delay: 0.1, stagger: 0.1 },
            { selector: '.feature-item', animation: 'slideLeft', delay: 0.2, stagger: 0.1 },
            { selector: '.location-card', animation: 'scale', delay: 0.1, stagger: 0.05 }
        ];

        configs.forEach(config => {
            const elements = document.querySelectorAll(config.selector);
            elements.forEach((element, index) => {
                this.elements.push({
                    element,
                    animation: config.animation,
                    delay: config.delay + (config.stagger || 0) * index,
                    triggered: false
                });
            });
        });
    }

    bindScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const elementData = this.elements.find(e => e.element === entry.target);
                    if (elementData && !elementData.triggered) {
                        this.triggerAnimation(elementData);
                        elementData.triggered = true;
                    }
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        this.elements.forEach(({ element }) => {
            observer.observe(element);
        });
    }

    triggerAnimation(elementData) {
        const { element, animation, delay } = elementData;
        
        setTimeout(() => {
            element.classList.add('animate-in');
            
            switch (animation) {
                case 'slideUp':
                    this.slideUp(element);
                    break;
                case 'slideLeft':
                    this.slideLeft(element);
                    break;
                case 'scale':
                    this.scale(element);
                    break;
            }
        }, delay * 1000);
    }

    slideUp(element) {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    }

    slideLeft(element) {
        element.style.transform = 'translateX(0)';
        element.style.opacity = '1';
    }

    scale(element) {
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    }
}

// 3. Dynamic Brand Showcase with 3D Effects
class BrandShowcase {
    constructor() {
        this.currentIndex = 0;
        this.brands = [];
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.createBrandCarousel();
        this.bindEvents();
        this.startAutoRotate();
    }

    createBrandCarousel() {
        const brandContainer = document.querySelector('.brands-grid');
        if (!brandContainer) return;

        // Add 3D container
        const showcase = document.createElement('div');
        showcase.className = 'brand-showcase-3d';
        showcase.innerHTML = `
            <div class="showcase-container">
                <div class="showcase-track" id="showcaseTrack">
                    ${this.generateBrandCards()}
                </div>
                <div class="showcase-controls">
                    <button class="showcase-btn prev" id="prevBtn">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button class="showcase-btn next" id="nextBtn">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div class="showcase-indicators" id="showcaseIndicators">
                    ${this.generateIndicators()}
                </div>
            </div>
        `;

        brandContainer.parentNode.insertBefore(showcase, brandContainer);
        this.addShowcaseStyles();
    }

    generateBrandCards() {
        const brands = [
            'Adam Fragrances', 'Fathima Al-Zahra', 'Wild Honey Co.',
            'Maryam', 'Malabar Hills', 'Rare Earth', 'Arabian Farm'
        ];

        return brands.map((brand, index) => `
            <div class="showcase-card" data-index="${index}">
                <div class="card-inner">
                    <div class="card-front">
                        <div class="brand-logo">
                            <i class="fas fa-${this.getBrandIcon(brand)}"></i>
                        </div>
                        <h3>${brand}</h3>
                    </div>
                    <div class="card-back">
                        <p>${this.getBrandDescription(brand)}</p>
                        <button class="learn-more-btn">Learn More</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    generateIndicators() {
        return Array.from({ length: 7 }, (_, i) => 
            `<span class="indicator ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
        ).join('');
    }

    getBrandIcon(brand) {
        const icons = {
            'Adam Fragrances': 'spray-can',
            'Fathima Al-Zahra': 'cookie-bite',
            'Wild Honey Co.': 'honey-pot',
            'Maryam': 'seedling',
            'Malabar Hills': 'leaf',
            'Rare Earth': 'gem',
            'Arabian Farm': 'calendar-alt'
        };
        return icons[brand] || 'star';
    }

    getBrandDescription(brand) {
        const descriptions = {
            'Adam Fragrances': 'Premium Arabian fragrances with traditional heritage',
            'Fathima Al-Zahra': 'Authentic Southeast Asian traditional desserts',
            'Wild Honey Co.': 'Pure, organic honey from pristine environments',
            'Maryam': 'Premium Basmati rice from India\'s finest regions',
            'Malabar Hills': 'Pure, cold-pressed coconut oil',
            'Rare Earth': 'Organic rare products for natural lifestyle',
            'Arabian Farm': 'Premium dates from Arabian lands'
        };
        return descriptions[brand] || 'Premium quality products';
    }

    bindEvents() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicators = document.querySelectorAll('.indicator');

        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            });
        });
    }

    nextSlide() {
        if (this.isAnimating) return;
        this.currentIndex = (this.currentIndex + 1) % 7;
        this.updateShowcase();
    }

    prevSlide() {
        if (this.isAnimating) return;
        this.currentIndex = (this.currentIndex - 1 + 7) % 7;
        this.updateShowcase();
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        this.currentIndex = index;
        this.updateShowcase();
    }

    updateShowcase() {
        this.isAnimating = true;
        const track = document.getElementById('showcaseTrack');
        const indicators = document.querySelectorAll('.indicator');

        if (track) {
            track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        }

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });

        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    startAutoRotate() {
        setInterval(() => {
            if (!this.isAnimating) {
                this.nextSlide();
            }
        }, 5000);
    }

    addShowcaseStyles() {
        const styles = `
            .brand-showcase-3d {
                margin: 4rem 0;
                perspective: 1000px;
            }

            .showcase-container {
                position: relative;
                max-width: 800px;
                margin: 0 auto;
                overflow: hidden;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            }

            .showcase-track {
                display: flex;
                transition: transform 0.5s ease-in-out;
                height: 300px;
            }

            .showcase-card {
                min-width: 100%;
                padding: 2rem;
                background: linear-gradient(135deg, var(--primary-gold), var(--dark-gold));
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .card-inner {
                width: 250px;
                height: 200px;
                position: relative;
                transform-style: preserve-3d;
                transition: transform 0.6s;
            }

            .showcase-card:hover .card-inner {
                transform: rotateY(180deg);
            }

            .card-front, .card-back {
                position: absolute;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                border-radius: 15px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                color: white;
            }

            .card-back {
                transform: rotateY(180deg);
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
            }

            .brand-logo {
                width: 60px;
                height: 60px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1rem;
                font-size: 1.5rem;
            }

            .showcase-controls {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 100%;
                display: flex;
                justify-content: space-between;
                padding: 0 1rem;
                pointer-events: none;
            }

            .showcase-btn {
                pointer-events: auto;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            }

            .showcase-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }

            .showcase-indicators {
                display: flex;
                justify-content: center;
                gap: 0.5rem;
                margin-top: 1rem;
            }

            .indicator {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(212, 175, 55, 0.3);
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .indicator.active {
                background: var(--primary-gold);
                transform: scale(1.2);
            }

            .learn-more-btn {
                background: white;
                color: var(--primary-gold);
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                cursor: pointer;
                font-weight: 600;
                margin-top: 1rem;
                transition: all 0.3s ease;
            }

            .learn-more-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}

// 4. Advanced Form Validation with Real-time Feedback
class AdvancedFormValidation {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.fields = {};
        this.init();
    }

    init() {
        if (!this.form) return;
        
        this.setupFields();
        this.bindEvents();
        this.createValidationStyles();
    }

    setupFields() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            this.fields[input.name] = {
                element: input,
                rules: this.getRules(input),
                valid: false
            };
        });
    }

    getRules(input) {
        const rules = [];
        
        if (input.required) rules.push('required');
        if (input.type === 'email') rules.push('email');
        if (input.type === 'tel') rules.push('phone');
        if (input.minLength) rules.push(`minLength:${input.minLength}`);
        if (input.pattern) rules.push(`pattern:${input.pattern}`);
        
        return rules;
    }

    bindEvents() {
        Object.values(this.fields).forEach(field => {
            field.element.addEventListener('blur', () => this.validateField(field));
            field.element.addEventListener('input', () => this.validateFieldRealtime(field));
        });

        this.form.addEventListener('submit', (e) => this.validateForm(e));
    }

    validateField(field) {
        const { element, rules } = field;
        const value = element.value.trim();
        let isValid = true;
        let errors = [];

        rules.forEach(rule => {
            const [ruleName, ruleValue] = rule.split(':');
            
            switch (ruleName) {
                case 'required':
                    if (!value) {
                        isValid = false;
                        errors.push('This field is required');
                    }
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (value && !emailRegex.test(value)) {
                        isValid = false;
                        errors.push('Please enter a valid email address');
                    }
                    break;
                    
                case 'phone':
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    if (value && !phoneRegex.test(value.replace(/\s/g, ''))) {
                        isValid = false;
                        errors.push('Please enter a valid phone number');
                    }
                    break;
                    
                case 'minLength':
                    if (value && value.length < parseInt(ruleValue)) {
                        isValid = false;
                        errors.push(`Minimum ${ruleValue} characters required`);
                    }
                    break;
            }
        });

        field.valid = isValid;
        this.showFieldFeedback(field, isValid, errors);
        return isValid;
    }

    validateFieldRealtime(field) {
        // Debounced validation for real-time feedback
        clearTimeout(field.timeout);
        field.timeout = setTimeout(() => {
            this.validateField(field);
        }, 300);
    }

    showFieldFeedback(field, isValid, errors) {
        const { element } = field;
        const formGroup = element.closest('.form-group');
        
        // Remove existing feedback
        const existingFeedback = formGroup.querySelector('.field-feedback');
        if (existingFeedback) existingFeedback.remove();
        
        // Add validation classes
        element.classList.remove('valid', 'invalid');
        element.classList.add(isValid ? 'valid' : 'invalid');
        
        // Show error message
        if (!isValid && errors.length > 0) {
            const feedback = document.createElement('div');
            feedback.className = 'field-feedback error';
            feedback.textContent = errors[0];
            formGroup.appendChild(feedback);
        } else if (isValid && element.value.trim()) {
            const feedback = document.createElement('div');
            feedback.className = 'field-feedback success';
            feedback.innerHTML = '<i class="fas fa-check"></i> Looks good!';
            formGroup.appendChild(feedback);
        }
    }

    validateForm(e) {
        let formValid = true;
        
        Object.values(this.fields).forEach(field => {
            if (!this.validateField(field)) {
                formValid = false;
            }
        });
        
        if (!formValid) {
            e.preventDefault();
            this.focusFirstInvalidField();
        }
        
        return formValid;
    }

    focusFirstInvalidField() {
        const firstInvalid = Object.values(this.fields).find(field => !field.valid);
        if (firstInvalid) {
            firstInvalid.element.focus();
        }
    }

    createValidationStyles() {
        const styles = `
            .form-group input.valid,
            .form-group select.valid,
            .form-group textarea.valid {
                border-bottom-color: #28a745 !important;
            }

            .form-group input.invalid,
            .form-group select.invalid,
            .form-group textarea.invalid {
                border-bottom-color: #dc3545 !important;
            }

            .field-feedback {
                position: absolute;
                bottom: -25px;
                left: 0;
                font-size: 0.8rem;
                animation: slideInUp 0.3s ease;
            }

            .field-feedback.error {
                color: #dc3545;
            }

            .field-feedback.success {
                color: #28a745;
            }

            .field-feedback i {
                margin-right: 0.3rem;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}

// 5. Loading States and Micro-interactions
class MicroInteractions {
    constructor() {
        this.init();
    }

    init() {
        this.addButtonRippleEffect();
        this.addCardHoverEffects();
        this.addNavigationEffects();
        this.addScrollIndicator();
    }

    addButtonRippleEffect() {
        const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple styles
        const rippleStyles = `
            button, .btn-primary, .btn-secondary {
                position: relative;
                overflow: hidden;
            }

            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: rippleEffect 0.6s linear;
                pointer-events: none;
            }

            @keyframes rippleEffect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = rippleStyles;
        document.head.appendChild(styleSheet);
    }

    addCardHoverEffects() {
        const cards = document.querySelectorAll('.business-card, .brand-card, .location-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', x + 'px');
                card.style.setProperty('--mouse-y', y + 'px');
                card.classList.add('hovered');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hovered');
            });
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', x + 'px');
                card.style.setProperty('--mouse-y', y + 'px');
            });
        });
    }

    addNavigationEffects() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const underline = document.createElement('span');
            underline.className = 'nav-underline';
            link.appendChild(underline);
            
            link.addEventListener('mouseenter', () => {
                underline.style.width = '100%';
            });
            
            link.addEventListener('mouseleave', () => {
                underline.style.width = '0%';
            });
        });
    }

    addScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator-bar';
        document.body.appendChild(indicator);
        
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (window.scrollY / scrollHeight) * 100;
            indicator.style.width = scrollPercent + '%';
        });

        // Add scroll indicator styles
        const indicatorStyles = `
            .scroll-indicator-bar {
                position: fixed;
                top: 0;
                left: 0;
                height: 4px;
                background: var(--gradient-primary);
                z-index: 9999;
                transition: width 0.1s ease;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = indicatorStyles;
        document.head.appendChild(styleSheet);
    }
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle system for hero section
    if (document.querySelector('.hero')) {
        setTimeout(() => {
            new ParticleSystem('home');
        }, 1000);
    }
    
    // Initialize advanced scroll animations
    new ScrollAnimations();
    
    // Initialize brand showcase
    new BrandShowcase();
    
    // Initialize advanced form validation
    new AdvancedFormValidation('contactForm');
    
    // Initialize micro-interactions
    new MicroInteractions();
    
    console.log('🚀 All advanced features initialized successfully!');
});

// Performance monitoring for advanced features
const performanceMonitor = {
    startTime: performance.now(),
    
    log(event) {
        const currentTime = performance.now();
        const elapsedTime = currentTime - this.startTime;
        console.log(`[${elapsedTime.toFixed(2)}ms] ${event}`);
    },
    
    measureFunction(fn, name) {
        return function(...args) {
            const start = performance.now();
            const result = fn.apply(this, args);
            const end = performance.now();
            console.log(`${name} took ${(end - start).toFixed(2)}ms`);
            return result;
        };
    }
};

// Export for global access
window.AdvancedFeatures = {
    ParticleSystem,
    ScrollAnimations,
    BrandShowcase,
    AdvancedFormValidation,
    MicroInteractions,
    performanceMonitor
};