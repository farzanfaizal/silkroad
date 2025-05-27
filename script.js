// Global Variables
let isLoading = true;
let animatedElements = new Set();
let currentScrollY = 0;

// Brand Data
const brandData = {
    adam: {
        title: "Adam Fragrances",
        category: "Fragrances & Aroma",
        description: "Step into a world where tradition meets luxury, and every scent tells a story that transcends time. Adam Fragrances, embodies the essence of the Middle East's rich aromatic heritage. With each fragrance, we offer an olfactory journey through the heart of Arabia, where the art of perfumery has been perfected for centuries.",
        features: ["Legacy of Excellence", "Traditional Perfumery", "Middle Eastern Heritage", "Premium Quality"],
        fullDescription: "For centuries, the art of Arabic perfumery has been passed down through generations. Adam Fragrances continues this legacy by offering timeless, high-quality scents that are both modern and deeply rooted in tradition. We believe that fragrance is not just a product—it's an experience. It's about capturing emotions, memories, and moments that last a lifetime."
    },
    fathima: {
        title: "Fathima Al-Zahra",
        category: "Contemporary Heritage Kuehs",
        description: "At Fathima Al-Zahra, we are passionate about celebrating the rich cultural heritage of traditional Southeast Asian desserts. Established with a commitment to authenticity and quality, our brand specializes in crafting a wide variety of handcrafted kuehs—delicate, flavorful, and beautifully presented treats that have been enjoyed for generations.",
        features: ["Handcrafted Quality", "Traditional Recipes", "Southeast Asian Heritage", "Authentic Ingredients"],
        fullDescription: "Our heritage is rooted in the vibrant culinary traditions of the region, sourcing only the finest ingredients to ensure each bite delivers authentic taste and texture. Our recipes are passed down through generations, preserving the time-honored techniques that make our kuehs uniquely delicious. From the soft, sticky sweetness of Pulut Hitam to the fragrant Coconut Kueh, and spicy popiah, our diverse menu caters to all palates and occasions."
    },
    honey: {
        title: "Wild Honey Co.",
        category: "Organic Medicine",
        description: "Discover the natural goodness of Wild Honey Co, a premium honey that embodies the untouched purity of nature. Sourced directly from wild, pristine environments, our honey is harvested sustainably from bees foraging in wild forests and untouched landscapes, ensuring you receive a product that is authentic, unprocessed, and brimming with natural nutrients.",
        features: ["100% Raw & Unfiltered", "Wild Sourced", "Nutrient-Rich", "Sustainable Harvesting"],
        fullDescription: "At Wild Honey Co., we believe in preserving the integrity of nature's finest gift. Our honey is 100% raw, unfiltered, and free from any additives, preservatives, or artificial ingredients. This means you enjoy the full spectrum of natural enzymes, antioxidants, and vitamins that honey offers. From the Mountains of Yemen, and the Forests of Kerala, we ethically source the best honey."
    },
    maryam: {
        title: "Maryam Basmati Rice",
        category: "Premium Basmati Rice",
        description: "Experience the true essence of aromatic perfection with our Maryam Indian Basmati Rice. Renowned worldwide for its long grains, exquisite aroma, and delicate texture, our Basmati rice is cultivated in the fertile plains of India's best rice-growing regions, ensuring superior quality and authenticity with every harvest.",
        features: ["Aromatic & Fluffy", "Premium Quality", "Pure & Natural", "Versatile Use"],
        fullDescription: "At Maryam, we prioritize purity, freshness, and excellence. Our Basmati rice is carefully sourced from trusted farms, harvested at the peak of maturity, and undergoes rigorous quality checks to meet the highest standards. The result is a premium product that elevates every meal. Our Basmati rice is a great source of energy, low in fat, and gluten-free, making it a healthy choice for balanced diets."
    },
    malabar: {
        title: "Malabar Hills Coconut Oil",
        category: "Pure Coconut Oil",
        description: "Experience the finest quality with Malabar Hills Coconut Oil, a trusted name in natural wellness and skincare. Sourced from the lush coconut plantations of Malabar Hills, our coconut oil is crafted to deliver pure, unrefined, and nutrient-rich oil that nurtures your body and enhances your beauty.",
        features: ["Cold-Pressed & Unrefined", "Pure & Natural", "Rich in Nutrients", "Versatile Use"],
        fullDescription: "At Malabar Hills Coconut Oil, we believe in providing products that are 100% natural and free from chemicals. Our coconut oil is cold-pressed and unrefined, ensuring that all the natural goodness, aroma, and health benefits are preserved. Whether used for cooking, skincare, or haircare, our coconut oil is a versatile and wholesome choice."
    },
    rare: {
        title: "Rare Earth",
        category: "Organic Products",
        description: "Discover the essence of purity with Rare Earth Brand, dedicated to bringing you the finest organic rare products sourced sustainably from nature's most pristine corners. Our commitment is to provide authentic, high-quality products that promote health, wellness, and environmental harmony.",
        features: ["100% Organic & Natural", "Sustainably Sourced", "High Quality & Authenticity", "Eco-Friendly Packaging"],
        fullDescription: "At Rare Earth, we believe in the power of nature's rarest treasures. Our curated selection includes organic herbs, oils, spices, and wellness products, all carefully sourced from trusted farmers and producers who prioritize sustainability and purity. Every product embodies our mission to deliver natural excellence and support a healthier, eco-friendly lifestyle."
    },
    arabian: {
        title: "Arabian Farm",
        category: "Premium Dates",
        description: "Experience the rich, sweet indulgence of Arabian Farm, a leading brand dedicated to bringing you the finest quality premium dates. Sourced from the lush, fertile regions known for their exceptional date palms, our dates embody natural sweetness, succulent texture, and unparalleled quality.",
        features: ["Premium Quality", "Natural & Pure", "Freshness Guaranteed", "Sustainable Sourcing"],
        fullDescription: "At Arabian Farm, we take pride in offering dates that reflect the heritage and bounty of the Arabian lands. Our meticulous selection process ensures that only the ripest, most luscious dates reach your table. Whether enjoyed on their own, added to recipes, or used as a natural sweetener, our dates promise authentic flavor and health benefits."
    }
};

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Website Initialization
function initializeWebsite() {
    // Start loading sequence
    setTimeout(() => {
        hideLoadingScreen();
    }, 3000);

    // Initialize all components
    initializeNavigation();
    initializeScrollAnimations();
    initializeCounters();
    initializeContactForm();
    initializeBrandModals();
    initializeParallaxEffects();
    initializeSmoothScrolling();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);
}

// Loading Screen Functions
function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    loadingScreen.classList.add('hidden');
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        isLoading = false;
        // Trigger entrance animations
        triggerEntranceAnimations();
    }, 500);
}

function triggerEntranceAnimations() {
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero .title-line, .hero-subtitle, .hero-buttons, .hero-stats');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Navigation Functions
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Update active nav link on scroll
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.6
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const animateOnScrollElements = document.querySelectorAll(`
        .section-title,
        .section-subtitle,
        .title-underline,
        .about-description,
        .feature-item,
        .about-quote,
        .about-image,
        .location-card,
        .business-card,
        .brand-card,
        .contact-item,
        .contact-form-container
    `);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedElements.has(entry.target)) {
                entry.target.style.animationPlayState = 'running';
                animatedElements.add(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 1000 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 1000 ? '+' : '');
        }
    }, 16);
}

// Contact Form Functions
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', handleFormSubmission);
}

async function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('.form-submit');
    
    // Show loading state
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    try {
        // You can integrate with services like:
        // - Formspree (https://formspree.io/)
        // - Netlify Forms
        // - EmailJS
        // - Custom backend API
        
        // Example with Formspree (replace YOUR_FORM_ID with actual form ID)
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}

// Alternative form handlers for different services
function initializeEmailJS() {
    // EmailJS Integration Example
    // First, include EmailJS SDK in your HTML:
    // <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    
    /*
    emailjs.init("YOUR_PUBLIC_KEY");
    
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(function() {
                showNotification('Message sent successfully!', 'success');
                form.reset();
            }, function(error) {
                showNotification('Failed to send message. Please try again.', 'error');
                console.log('FAILED...', error);
            });
    });
    */
}

function initializeNetlifyForms() {
    // For Netlify Forms, just add data-netlify="true" to your form tag
    // The form will be automatically handled by Netlify
    
    const form = document.getElementById('contactForm');
    form.setAttribute('data-netlify', 'true');
    form.setAttribute('method', 'POST');
    
    // Add hidden input for Netlify
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'form-name';
    hiddenInput.value = 'contact';
    form.appendChild(hiddenInput);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles for notification
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            min-width: 300px;
            max-width: 500px;
            padding: 1rem;
            border-radius: 10px;
            color: white;
            z-index: 10000;
            transform: translateX(100%);
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .notification-success {
            background: linear-gradient(135deg, #28a745, #20c997);
        }
        
        .notification-error {
            background: linear-gradient(135deg, #dc3545, #fd7e14);
        }
        
        .notification-info {
            background: linear-gradient(135deg, #007bff, #6610f2);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            margin-left: auto;
            padding: 0.2rem;
            border-radius: 50%;
            transition: background-color 0.2s ease;
        }
        
        .notification-close:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
    `;
    
    // Add styles to head if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Brand Modals
function initializeBrandModals() {
    const brandCards = document.querySelectorAll('.brand-card');
    const modal = document.getElementById('brandModal');
    const modalClose = document.querySelector('.modal-close');
    const modalBody = document.getElementById('modalBody');
    
    brandCards.forEach(card => {
        card.addEventListener('click', () => {
            const brandKey = card.getAttribute('data-brand');
            const brand = brandData[brandKey];
            
            if (brand) {
                showBrandModal(brand);
            }
        });
    });
    
    // Close modal events
    modalClose.addEventListener('click', closeBrandModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBrandModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeBrandModal();
        }
    });
}

function showBrandModal(brand) {
    const modal = document.getElementById('brandModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="brand-modal-header">
            <div class="brand-modal-icon">
                <i class="fas fa-${getBrandIcon(brand.title)}"></i>
            </div>
            <div class="brand-modal-title">
                <h2>${brand.title}</h2>
                <p class="brand-modal-category">${brand.category}</p>
            </div>
        </div>
        <div class="brand-modal-content">
            <p class="brand-modal-description">${brand.description}</p>
            <div class="brand-modal-features">
                <h3>Key Features</h3>
                <ul class="features-list">
                    ${brand.features.map(feature => `<li><i class="fas fa-check"></i>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="brand-modal-details">
                <h3>About ${brand.title}</h3>
                <p>${brand.fullDescription}</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBrandModal() {
    const modal = document.getElementById('brandModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function getBrandIcon(brandTitle) {
    const icons = {
        'Adam Fragrances': 'spray-can',
        'Fathima Al-Zahra': 'cookie-bite',
        'Wild Honey Co.': 'honey-pot',
        'Maryam Basmati Rice': 'seedling',
        'Malabar Hills Coconut Oil': 'leaf',
        'Rare Earth': 'gem',
        'Arabian Farm': 'calendar-alt'
    };
    
    return icons[brandTitle] || 'star';
}

// Parallax Effects
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-particles');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Global scroll function for buttons
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Scroll Event Handler
function handleScroll() {
    currentScrollY = window.scrollY;
    
    // Update navbar appearance
    const navbar = document.getElementById('navbar');
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effect for hero section
    if (currentScrollY < window.innerHeight) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const scrollPercent = currentScrollY / window.innerHeight;
            heroContent.style.transform = `translateY(${scrollPercent * 50}px)`;
            heroContent.style.opacity = 1 - scrollPercent * 0.8;
        }
    }
}

// Resize Event Handler
function handleResize() {
    // Close mobile menu on resize
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (window.innerWidth > 768) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Intersection Observer for animations
function createScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const elementsToAnimate = document.querySelectorAll(`
        .section-title,
        .business-card,
        .brand-card,
        .location-card,
        .feature-item,
        .contact-item
    `);
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Add CSS classes for scroll animations
function addScrollAnimationStyles() {
    const styles = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .section-title,
        .business-card,
        .brand-card,
        .location-card,
        .feature-item,
        .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Brand modal styles
function addBrandModalStyles() {
    const styles = `
        .brand-modal-header {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 2px solid var(--light-gray);
        }
        
        .brand-modal-icon {
            width: 80px;
            height: 80px;
            background: var(--gradient-primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2rem;
        }
        
        .brand-modal-title h2 {
            color: var(--deep-blue);
            margin-bottom: 0.5rem;
        }
        
        .brand-modal-category {
            color: var(--primary-gold);
            font-weight: 600;
        }
        
        .brand-modal-description {
            font-size: 1.1rem;
            line-height: 1.8;
            margin-bottom: 2rem;
            color: var(--text-dark);
        }
        
        .brand-modal-features {
            margin-bottom: 2rem;
        }
        
        .brand-modal-features h3,
        .brand-modal-details h3 {
            color: var(--deep-blue);
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        
        .features-list {
            list-style: none;
            padding: 0;
        }
        
        .features-list li {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            margin-bottom: 0.8rem;
            padding: 0.8rem;
            background: var(--light-gray);
            border-radius: 8px;
        }
        
        .features-list li i {
            color: var(--primary-gold);
            font-size: 1rem;
        }
        
        .brand-modal-details p {
            line-height: 1.8;
            color: var(--text-dark);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    addScrollAnimationStyles();
    addBrandModalStyles();
    createScrollObserver();
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimized scroll handler with throttling
const optimizedScrollHandler = throttle(handleScroll, 16); // ~60fps
window.addEventListener('scroll', optimizedScrollHandler);

// Add smooth reveal animations for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Custom cursor effect (optional)
function initializeCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add cursor styles
    const cursorStyles = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 2px solid var(--primary-gold);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        }
        
        .custom-cursor.hover {
            transform: scale(1.5);
            background: var(--primary-gold);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = cursorStyles;
    document.head.appendChild(styleSheet);
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .brand-card, .business-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Initialize custom cursor (uncomment to enable)
// initializeCustomCursor();

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor loading time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
    
    // Monitor scroll performance
    let scrollStart = 0;
    let scrollCount = 0;
    
    window.addEventListener('scroll', () => {
        if (scrollStart === 0) {
            scrollStart = performance.now();
        }
        scrollCount++;
        
        // Log performance every 100 scroll events
        if (scrollCount % 100 === 0) {
            const scrollTime = performance.now() - scrollStart;
            console.log(`100 scroll events in ${scrollTime.toFixed(2)}ms`);
            scrollStart = 0;
            scrollCount = 0;
        }
    });
}

// Initialize performance monitoring in development
// initializePerformanceMonitoring();

// Export functions for global use
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;