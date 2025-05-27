// Global Variables
let isLoading = true;
let animatedElements = new Set();
let currentScrollY = 0;

// Brand Data with Dark Theme Support
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

// Website Initialization with Dark Theme
function initializeWebsite() {
    // Apply dark theme immediately
    applyDarkTheme();
    
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
    initializeAppleStyleElements();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);
    
    console.log('🌙 Dark theme website initialized successfully');
}

// Dark Theme Application
function applyDarkTheme() {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-theme');
    
    // Set system color preferences
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#000000');
    }
    
    // Apply Apple system font stack
    document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif';
}

// Apple-style Elements Initialization
function initializeAppleStyleElements() {
    // Add glass morphism effects
    const glassElements = document.querySelectorAll('.navbar, .contact-form, .modal-content');
    glassElements.forEach(element => {
        element.style.backdropFilter = 'blur(20px)';
        element.style.webkitBackdropFilter = 'blur(20px)';
    });
    
    // Add subtle animations to interactive elements
    const interactiveElements = document.querySelectorAll('button, .brand-card, .business-card');
    interactiveElements.forEach(element => {
        element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
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
    // Animate hero elements with Apple-style easing
    const heroElements = document.querySelectorAll('.hero .title-line, .hero-subtitle, .hero-buttons, .hero-stats');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, index * 200);
    });
}

// Navigation Functions
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle with enhanced animation
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Add haptic feedback simulation
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
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

// Enhanced Scroll Animations
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
                // Apply Apple-style animation
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                entry.target.style.animationPlayState = 'running';
                animatedElements.add(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });
    
    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });
}

// Counter Animation with Enhanced Easing
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
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Apple-style easing function
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(target * easeOutExpo);
        
        element.textContent = current + (target === 1000 ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Enhanced Contact Form Functions
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Add floating label effect with Apple-style transitions
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
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
    
    // Show loading state with Apple-style animation
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    submitButton.style.transform = 'scale(0.98)';
    
    try {
        // Simulate Apple-style haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate([10, 50, 10]);
        }
        
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
            
            // Success haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate([10, 20, 30]);
            }
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        
        // Error haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    } finally {
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        submitButton.style.transform = 'scale(1)';
    }
}

// Enhanced Notification System with Dark Theme
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
    
    // Add styles for notification with dark theme
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            min-width: 320px;
            max-width: 500px;
            padding: 1.2rem;
            border-radius: 16px;
            color: white;
            z-index: 10000;
            transform: translateX(100%);
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
        }
        
        .notification-success {
            background: rgba(30, 215, 96, 0.9);
        }
        
        .notification-error {
            background: rgba(255, 69, 58, 0.9);
        }
        
        .notification-info {
            background: rgba(247, 147, 30, 0.9);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            margin-left: auto;
            padding: 0.4rem;
            border-radius: 50%;
            transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            background-color: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
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
        }, 400);
    }, 5000);
}

// Enhanced Brand Modals with Dark Theme
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
    
    // Add entrance animation
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeBrandModal() {
    const modal = document.getElementById('brandModal');
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
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

// Enhanced Parallax Effects
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-particles');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3; // Reduced for smoother effect
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Apple-style Smooth Scrolling
function initializeSmoothScrolling() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                // Custom smooth scroll with Apple-style easing
                smoothScrollTo(offsetTop, 800);
            }
        });
    });
}

// Custom smooth scroll function with Apple easing
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();
    
    function scrollAnimation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Apple-style easing
        const easeInOutCubic = progress < 0.5 
            ? 4 * progress * progress * progress 
            : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic);
        
        if (progress < 1) {
            requestAnimationFrame(scrollAnimation);
        }
    }
    
    requestAnimationFrame(scrollAnimation);
}

// Global scroll function for buttons
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        smoothScrollTo(offsetTop, 800);
    }
}

// Enhanced Scroll Event Handler
function handleScroll() {
    currentScrollY = window.scrollY;
    
    // Update navbar appearance with enhanced glass effect
    const navbar = document.getElementById('navbar');
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.webkitBackdropFilter = 'blur(20px)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.background = 'rgba(26, 26, 26, 0.8)';
    }
    
    // Enhanced parallax effect for hero section
    if (currentScrollY < window.innerHeight) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const scrollPercent = currentScrollY / window.innerHeight;
            const translateY = scrollPercent * 30; // Reduced for subtle effect
            const opacity = 1 - (scrollPercent * 0.6);
            
            heroContent.style.transform = `translateY(${translateY}px)`;
            heroContent.style.opacity = Math.max(opacity, 0.2);
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

// Enhanced Brand Modal Styles
function addBrandModalStyles() {
    const styles = `
        .brand-modal-header {
            display: flex;
            align-items: center;
            gap: 2rem;
            margin-bottom: 2.5rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .brand-modal-icon {
            width: 90px;
            height: 90px;
            background: linear-gradient(135deg, #F7931E, #E8830C);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2.2rem;
            box-shadow: 0 10px 30px rgba(247, 147, 30, 0.3);
        }
        
        .brand-modal-title h2 {
            color: #FFFFFF;
            margin-bottom: 0.8rem;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
            font-size: 1.8rem;
            font-weight: 600;
        }
        
        .brand-modal-category {
            color: #F7931E;
            font-weight: 600;
            font-size: 1rem;
        }
        
        .brand-modal-description {
            font-size: 1.1rem;
            line-height: 1.8;
            margin-bottom: 2.5rem;
            color: #B3B3B3;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
        }
        
        .brand-modal-features {
            margin-bottom: 2.5rem;
        }
        
        .brand-modal-features h3,
        .brand-modal-details h3 {
            color: #FFFFFF;
            margin-bottom: 1.5rem;
            font-size: 1.4rem;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
            font-weight: 600;
        }
        
        .features-list {
            list-style: none;
            padding: 0;
        }
        
        .features-list li {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
            padding: 1rem;
            background: rgba(26, 26, 26, 0.6);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            color: #FFFFFF;
        }
        
        .features-list li:hover {
            background: rgba(45, 45, 45, 0.8);
            border-color: #F7931E;
            transform: translateX(5px);
        }
        
        .features-list li i {
            color: #F7931E;
            font-size: 1.1rem;
        }
        
        .brand-modal-details p {
            line-height: 1.8;
            color: #B3B3B3;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Performance Monitoring
function initializePerformanceMonitoring() {
    // Monitor loading time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`🚀 Dark theme page loaded in ${loadTime.toFixed(2)}ms`);
    });
    
    // Monitor scroll performance
    let scrollStart = 0;
    let scrollCount = 0;
    
    const throttledScrollMonitor = throttle(() => {
        if (scrollStart === 0) {
            scrollStart = performance.now();
        }
        scrollCount++;
        
        // Log performance every 50 scroll events
        if (scrollCount % 50 === 0) {
            const scrollTime = performance.now() - scrollStart;
            console.log(`50 scroll events in ${scrollTime.toFixed(2)}ms`);
            scrollStart = 0;
            scrollCount = 0;
        }
    }, 16);
    
    window.addEventListener('scroll', throttledScrollMonitor);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    addBrandModalStyles();
    initializePerformanceMonitoring();
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

// Apple-style Device Detection
function detectAppleDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isAppleDevice = /iPad|iPhone|iPod|Mac/.test(userAgent);
    
    if (isAppleDevice) {
        document.body.classList.add('apple-device');
        
        // Add Apple-specific enhancements
        const appleStyles = `
            .apple-device * {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            
            .apple-device button,
            .apple-device .btn-primary,
            .apple-device .btn-secondary {
                -webkit-tap-highlight-color: transparent;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = appleStyles;
        document.head.appendChild(styleSheet);
        
        console.log('🍎 Apple device detected - enhanced for optimal experience');
    }
    
    return isAppleDevice;
}

// System Theme Detection
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('🌙 System dark mode detected - perfect match!');
        return 'dark';
    } else {
        console.log('🌙 Forcing dark mode for optimal experience');
        return 'dark'; // Always dark in our implementation
    }
}

// Initialize advanced features
document.addEventListener('DOMContentLoaded', () => {
    detectAppleDevice();
    detectSystemTheme();
});

// Export functions for global use
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;
window.smoothScrollTo = smoothScrollTo;

// Development helpers
if (typeof process !== 'undefined' && process?.env?.NODE_ENV === 'development') {
    window.debugTheme = () => {
        console.log('Current theme: Dark');
        console.log('Apple device:', detectAppleDevice());
        console.log('Performance metrics available in console');
    };
}