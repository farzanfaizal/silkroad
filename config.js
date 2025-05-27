// Website Configuration File
// config.js - Central configuration for Silk Road Global website

const SiteConfig = {
    // Basic Site Information
    site: {
        name: "The Silk Road Global",
        tagline: "Connecting Cultures. Empowering Commerce.",
        description: "Leading enterprise in retail, wholesale, import, and export with trusted private brands",
        url: "https://silkroadglobal.co",
        email: "info@silkroadglobal.co",
        phone: "+971 XX XXX XXXX",
        address: {
            street: "Business Bay",
            city: "Dubai",
            country: "UAE",
            postalCode: "00000"
        }
    },

    // Social Media Links
    social: {
        linkedin: "https://linkedin.com/company/silk-road-global",
        instagram: "https://instagram.com/silkroadglobal",
        facebook: "https://facebook.com/silkroadglobal",
        twitter: "https://twitter.com/silkroadglobal",
        youtube: "https://youtube.com/@silkroadglobal"
    },

    // Form Integration Settings
    forms: {
        // Choose one: 'formspree', 'emailjs', 'netlify', 'custom'
        provider: 'formspree',
        
        // Formspree Configuration
        formspree: {
            formId: 'YOUR_FORMSPREE_FORM_ID',
            endpoint: 'https://formspree.io/f/YOUR_FORMSPREE_FORM_ID'
        },
        
        // EmailJS Configuration
        emailjs: {
            publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
            serviceId: 'YOUR_SERVICE_ID',
            templateId: 'YOUR_TEMPLATE_ID'
        },
        
        // Custom API Configuration
        custom: {
            endpoint: 'https://api.yoursite.com/contact',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY'
            }
        }
    },

    // Analytics Configuration
    analytics: {
        googleAnalytics: {
            enabled: true,
            trackingId: 'YOUR_GA_TRACKING_ID'
        },
        
        facebookPixel: {
            enabled: false,
            pixelId: 'YOUR_FACEBOOK_PIXEL_ID'
        },
        
        hotjar: {
            enabled: false,
            siteId: 'YOUR_HOTJAR_SITE_ID'
        }
    },

    // Chat Integration
    chat: {
        // Choose one: 'tawk', 'intercom', 'zendesk', 'whatsapp', 'none'
        provider: 'whatsapp',
        
        whatsapp: {
            number: '971XXXXXXXXX',
            message: 'Hello! I\'m interested in your services.'
        },
        
        tawk: {
            widgetId: 'YOUR_TAWK_WIDGET_ID',
            chatId: 'YOUR_TAWK_CHAT_ID'
        }
    },

    // Performance Settings
    performance: {
        lazyLoadImages: true,
        minifyAssets: true,
        enableServiceWorker: true,
        cacheStrategy: 'network-first'
    },

    // SEO Configuration
    seo: {
        keywords: [
            'import export UAE',
            'wholesale Dubai',
            'private brands',
            'global trade',
            'retail distribution',
            'Silk Road Global'
        ],
        
        openGraph: {
            image: 'assets/images/og-image.jpg',
            type: 'website',
            locale: 'en_US'
        },
        
        twitter: {
            card: 'summary_large_image',
            site: '@silkroadglobal'
        }
    },

    // API Endpoints
    api: {
        baseUrl: 'https://api.silkroadglobal.co',
        endpoints: {
            contact: '/contact',
            newsletter: '/newsletter',
            catalog: '/catalog',
            quote: '/quote'
        }
    },

    // Feature Flags
    features: {
        advancedAnimations: true,
        particleSystem: true,
        darkMode: true, // Enable dark mode
        multiLanguage: false,
        productCatalog: false,
        onlineOrdering: false
    },

    // Dark Theme Configuration
    theme: {
        mode: 'dark',
        colors: {
            primary: '#F7931E',
            secondary: '#E8830C',
            accent: '#FFA940',
            background: '#000000',
            surface: '#111111',
            card: '#1a1a1a',
            text: '#FFFFFF',
            textSecondary: '#B3B3B3',
            border: '#404040'
        },
        fonts: {
            primary: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
            heading: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif',
            body: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif'
        }
    }
};

// Utility Functions
const SiteUtils = {
    // Initialize all site features based on configuration
    init() {
        this.setupAnalytics();
        this.setupChat();
        this.setupSEO();
        this.setupServiceWorker();
        this.applyDarkTheme(); // Apply dark theme
        console.log('🚀 Site utilities initialized with dark theme');
    },

    // Apply Dark Theme
    applyDarkTheme() {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.add('dark-theme');
        
        // Set meta theme color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', SiteConfig.theme.colors.background);
        }
        
        // Set color scheme preference
        const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
        if (metaColorScheme) {
            metaColorScheme.setAttribute('content', 'dark');
        }
        
        console.log('🌙 Dark theme applied successfully');
    },

    // Analytics Setup
    setupAnalytics() {
        if (SiteConfig.analytics.googleAnalytics.enabled) {
            this.loadGoogleAnalytics();
        }
        
        if (SiteConfig.analytics.facebookPixel.enabled) {
            this.loadFacebookPixel();
        }
        
        if (SiteConfig.analytics.hotjar.enabled) {
            this.loadHotjar();
        }
    },

    loadGoogleAnalytics() {
        const trackingId = SiteConfig.analytics.googleAnalytics.trackingId;
        if (!trackingId || trackingId === 'YOUR_GA_TRACKING_ID') return;

        // Load GA4
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}');
        `;
        document.head.appendChild(script2);
        
        console.log('✅ Google Analytics loaded');
    },

    loadFacebookPixel() {
        const pixelId = SiteConfig.analytics.facebookPixel.pixelId;
        if (!pixelId || pixelId === 'YOUR_FACEBOOK_PIXEL_ID') return;

        const script = document.createElement('script');
        script.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
        `;
        document.head.appendChild(script);
        
        console.log('✅ Facebook Pixel loaded');
    },

    loadHotjar() {
        const siteId = SiteConfig.analytics.hotjar.siteId;
        if (!siteId || siteId === 'YOUR_HOTJAR_SITE_ID') return;

        const script = document.createElement('script');
        script.innerHTML = `
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${siteId},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `;
        document.head.appendChild(script);
        
        console.log('✅ Hotjar loaded');
    },

    // Chat Setup
    setupChat() {
        switch (SiteConfig.chat.provider) {
            case 'whatsapp':
                this.setupWhatsAppChat();
                break;
            case 'tawk':
                this.setupTawkChat();
                break;
        }
    },

    setupWhatsAppChat() {
        const config = SiteConfig.chat.whatsapp;
        if (!config.number) return;

        const whatsappBtn = document.createElement('div');
        whatsappBtn.className = 'whatsapp-floating-btn';
        whatsappBtn.innerHTML = `
            <a href="https://wa.me/${config.number}?text=${encodeURIComponent(config.message)}" 
               target="_blank" rel="noopener">
                <i class="fab fa-whatsapp"></i>
            </a>
        `;

        document.body.appendChild(whatsappBtn);

        // Add WhatsApp button styles with dark theme
        const styles = `
            .whatsapp-floating-btn {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                animation: pulse 2s infinite;
            }

            .whatsapp-floating-btn a {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 60px;
                height: 60px;
                background: #25d366;
                border-radius: 50%;
                color: white;
                text-decoration: none;
                font-size: 1.5rem;
                box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
                transition: all 0.3s ease;
            }

            .whatsapp-floating-btn a:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
            }

            @media (prefers-color-scheme: dark) {
                .whatsapp-floating-btn a {
                    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.6);
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        console.log('✅ WhatsApp chat loaded with dark theme support');
    },

    setupTawkChat() {
        const config = SiteConfig.chat.tawk;
        if (!config.widgetId || config.widgetId === 'YOUR_TAWK_WIDGET_ID') return;

        const script = document.createElement('script');
        script.innerHTML = `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/${config.widgetId}/${config.chatId}';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
            })();
        `;
        document.head.appendChild(script);
        
        console.log('✅ Tawk.to chat loaded');
    },

    // SEO Setup
    setupSEO() {
        this.updateMetaTags();
        this.addStructuredData();
    },

    updateMetaTags() {
        const config = SiteConfig.seo;
        
        // Update existing meta tags
        document.title = `${SiteConfig.site.name} - ${SiteConfig.site.tagline}`;
        
        this.setMetaTag('description', SiteConfig.site.description);
        this.setMetaTag('keywords', config.keywords.join(', '));
        
        // Open Graph tags
        this.setMetaTag('og:title', SiteConfig.site.name, 'property');
        this.setMetaTag('og:description', SiteConfig.site.description, 'property');
        this.setMetaTag('og:image', SiteConfig.site.url + '/' + config.openGraph.image, 'property');
        this.setMetaTag('og:url', SiteConfig.site.url, 'property');
        this.setMetaTag('og:type', config.openGraph.type, 'property');
        
        // Twitter tags
        this.setMetaTag('twitter:card', config.twitter.card, 'name');
        this.setMetaTag('twitter:site', config.twitter.site, 'name');
        
        // Dark theme specific meta tags
        this.setMetaTag('color-scheme', 'dark', 'name');
        this.setMetaTag('theme-color', SiteConfig.theme.colors.background, 'name');
        
        console.log('✅ SEO meta tags updated with dark theme support');
    },

    setMetaTag(name, content, attribute = 'name') {
        let meta = document.querySelector(`meta[${attribute}="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(attribute, name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    },

    addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Corporation",
            "name": SiteConfig.site.name,
            "description": SiteConfig.site.description,
            "url": SiteConfig.site.url,
            "logo": `${SiteConfig.site.url}/assets/images/logo.png`,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": SiteConfig.site.address.street,
                "addressLocality": SiteConfig.site.address.city,
                "addressCountry": SiteConfig.site.address.country,
                "postalCode": SiteConfig.site.address.postalCode
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "telephone": SiteConfig.site.phone,
                "email": SiteConfig.site.email
            },
            "sameAs": Object.values(SiteConfig.social)
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
        
        console.log('✅ Structured data added');
    },

    // Service Worker Setup
    setupServiceWorker() {
        if (!SiteConfig.performance.enableServiceWorker) return;
        
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('✅ Service Worker registered:', registration);
                    })
                    .catch(error => {
                        console.log('❌ Service Worker registration failed:', error);
                    });
            });
        }
    },

    // Form Handler Factory
    createFormHandler() {
        const provider = SiteConfig.forms.provider;
        
        switch (provider) {
            case 'formspree':
                return this.createFormspreeHandler();
            case 'emailjs':
                return this.createEmailJSHandler();
            case 'custom':
                return this.createCustomHandler();
            default:
                console.warn('No form provider configured');
                return null;
        }
    },

    createFormspreeHandler() {
        const config = SiteConfig.forms.formspree;
        if (!config.formId || config.formId === 'YOUR_FORMSPREE_FORM_ID') {
            console.warn('Formspree form ID not configured');
            return null;
        }

        return async (formData) => {
            const response = await fetch(config.endpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Form submission failed');
            }
            
            return await response.json();
        };
    },

    createEmailJSHandler() {
        const config = SiteConfig.forms.emailjs;
        if (!config.publicKey || config.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
            console.warn('EmailJS configuration not complete');
            return null;
        }

        // Initialize EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init(config.publicKey);
        } else {
            console.warn('EmailJS library not loaded');
            return null;
        }

        return async (form) => {
            return await emailjs.sendForm(
                config.serviceId,
                config.templateId,
                form
            );
        };
    },

    createCustomHandler() {
        const config = SiteConfig.forms.custom;
        
        return async (formData) => {
            const response = await fetch(config.endpoint, {
                method: config.method,
                headers: config.headers,
                body: JSON.stringify(Object.fromEntries(formData))
            });
            
            if (!response.ok) {
                throw new Error('Form submission failed');
            }
            
            return await response.json();
        };
    },

    // Utility Methods
    trackEvent(eventName, parameters = {}) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, parameters);
        }
        
        console.log('Event tracked:', eventName, parameters);
    },

    showNotification(message, type = 'info', duration = 5000) {
        // Use the existing notification system from the main script
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        } else {
            // Fallback alert
            alert(message);
        }
    },

    // Theme utilities
    toggleDarkMode() {
        // Dark mode is always enabled in this configuration
        console.log('Dark mode is permanently enabled');
    },

    initializeDarkMode() {
        // Dark mode is always enabled
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
        console.log('🌙 Dark mode initialized');
    },

    // Apple-style system font detection
    detectSystemFonts() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        // Test for San Francisco font availability
        context.font = '12px SF Pro Display';
        const sfWidth = context.measureText('test').width;
        
        context.font = '12px Arial';
        const arialWidth = context.measureText('test').width;
        
        const hasSanFrancisco = sfWidth !== arialWidth;
        
        if (hasSanFrancisco) {
            console.log('✅ San Francisco font detected');
        } else {
            console.log('ℹ️ Using system font fallbacks');
        }
        
        return hasSanFrancisco;
    },

    // Dynamic CSS custom properties for theme
    applyDynamicTheme() {
        const root = document.documentElement;
        const colors = SiteConfig.theme.colors;
        
        root.style.setProperty('--dynamic-primary', colors.primary);
        root.style.setProperty('--dynamic-bg', colors.background);
        root.style.setProperty('--dynamic-surface', colors.surface);
        root.style.setProperty('--dynamic-text', colors.text);
        
        console.log('🎨 Dynamic theme properties applied');
    }
};

// Initialize utilities when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    SiteUtils.init();
    SiteUtils.detectSystemFonts();
    SiteUtils.applyDynamicTheme();
});

// Export configuration and utilities
window.SiteConfig = SiteConfig;
window.SiteUtils = SiteUtils;

// Development helpers
if (typeof process !== 'undefined' && process?.env?.NODE_ENV === 'development') {
    window.debugConfig = () => {
        console.table(SiteConfig);
    };
    
    window.testFeature = (featureName) => {
        console.log(`Testing feature: ${featureName}`);
        console.log(`Enabled: ${SiteConfig.features[featureName]}`);
    };
    
    window.toggleTheme = () => {
        console.log('Theme is permanently set to dark mode');
    };
}