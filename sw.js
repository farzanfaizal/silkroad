// Service Worker for Silk Road Global Website - Dark Theme Optimized
// sw.js - Handles caching, offline functionality, and performance optimization

const CACHE_NAME = 'silk-road-global-dark-v1.0.0';
const STATIC_CACHE = 'silk-road-static-dark-v1';
const DYNAMIC_CACHE = 'silk-road-dynamic-dark-v1';

// Assets to cache immediately - Dark theme optimized
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/config.js',
    '/advanced-features.js',
    '/manifest.json',
    // Add your image assets
    '/assets/images/logo.png',
    '/assets/images/hero-bg.jpg',
    '/assets/images/dark-logo.png', // Dark theme specific assets
    '/assets/images/dark-hero-bg.jpg',
    // External resources - Apple fonts and icons
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Assets to cache on demand
const CACHE_ON_DEMAND = [
    '/assets/images/',
    '/api/',
    'https://formspree.io/',
    'https://api.',
    'https://fonts.googleapis.com/' // Apple system fonts fallback
];

// Install Event - Cache static assets with dark theme support
self.addEventListener('install', event => {
    console.log('🔧 Service Worker installing with dark theme support...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('📦 Caching dark theme assets...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('✅ Dark theme assets cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Failed to cache dark theme assets:', error);
            })
    );
});

// Activate Event - Clean up old caches and set up dark theme
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker activating with dark theme...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        // Clean up old light theme caches
                        if (cacheName !== STATIC_CACHE && 
                            cacheName !== DYNAMIC_CACHE && 
                            !cacheName.includes('dark')) {
                            console.log('🗑️ Deleting old light theme cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Old caches cleaned up, dark theme ready');
                return self.clients.claim();
            })
    );
});

// Fetch Event - Handle network requests with dark theme optimization
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension requests
    if (url.protocol === 'chrome-extension:') {
        return;
    }
    
    // Handle different types of requests
    if (isStaticAsset(request.url)) {
        event.respondWith(handleStaticAsset(request));
    } else if (isAPIRequest(request.url)) {
        event.respondWith(handleAPIRequest(request));
    } else if (isImageRequest(request.url)) {
        event.respondWith(handleImageRequest(request));
    } else if (isFontRequest(request.url)) {
        event.respondWith(handleFontRequest(request));
    } else {
        event.respondWith(handleOtherRequest(request));
    }
});

// Check if request is for static asset
function isStaticAsset(url) {
    return STATIC_ASSETS.some(asset => url.includes(asset)) ||
           url.includes('.css') ||
           url.includes('.js') ||
           url.includes('.woff') ||
           url.includes('.woff2') ||
           url.includes('manifest.json');
}

// Check if request is for API
function isAPIRequest(url) {
    return url.includes('/api/') ||
           url.includes('formspree.io') ||
           url.includes('emailjs.com');
}

// Check if request is for image
function isImageRequest(url) {
    return url.includes('.jpg') ||
           url.includes('.jpeg') ||
           url.includes('.png') ||
           url.includes('.gif') ||
           url.includes('.webp') ||
           url.includes('.svg') ||
           url.includes('.ico');
}

// Check if request is for font (Apple system fonts fallback)
function isFontRequest(url) {
    return url.includes('.woff') ||
           url.includes('.woff2') ||
           url.includes('.ttf') ||
           url.includes('.otf') ||
           url.includes('fonts.googleapis.com') ||
           url.includes('fonts.gstatic.com');
}

// Handle static assets - Cache First strategy with dark theme preference
async function handleStaticAsset(request) {
    try {
        const cacheResponse = await caches.match(request);
        if (cacheResponse) {
            return cacheResponse;
        }
        
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Error handling static asset:', error);
        return getOfflineFallback(request);
    }
}

// Handle API requests - Network First strategy
async function handleAPIRequest(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Network request failed, trying cache:', error);
        
        const cacheResponse = await caches.match(request);
        if (cacheResponse) {
            return cacheResponse;
        }
        
        return new Response(
            JSON.stringify({ 
                error: 'Network unavailable', 
                message: 'Please check your internet connection and try again.',
                theme: 'dark'
            }),
            {
                status: 503,
                statusText: 'Service Unavailable',
                headers: { 
                    'Content-Type': 'application/json',
                    'X-Theme': 'dark'
                }
            }
        );
    }
}

// Handle image requests - Cache First with dark theme fallback
async function handleImageRequest(request) {
    try {
        const cacheResponse = await caches.match(request);
        if (cacheResponse) {
            return cacheResponse;
        }
        
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Image request failed:', error);
        return getPlaceholderImage();
    }
}

// Handle font requests - Cache First with system font fallback
async function handleFontRequest(request) {
    try {
        const cacheResponse = await caches.match(request);
        if (cacheResponse) {
            return cacheResponse;
        }
        
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Font request failed, using system fonts:', error);
        // Return empty response to allow system fonts to be used
        return new Response('', {
            status: 404,
            statusText: 'System fonts will be used'
        });
    }
}

// Handle other requests - Network First
async function handleOtherRequest(request) {
    try {
        const networkResponse = await fetch(request);
        return networkResponse;
    } catch (error) {
        const cacheResponse = await caches.match(request);
        if (cacheResponse) {
            return cacheResponse;
        }
        
        return getOfflineFallback(request);
    }
}

// Get offline fallback response with dark theme
function getOfflineFallback(request) {
    if (request.destination === 'document') {
        return caches.match('/offline.html') || 
               new Response(getOfflineHTML(), {
                   headers: { 
                       'Content-Type': 'text/html',
                       'X-Theme': 'dark'
                   }
               });
    }
    
    return new Response('Offline - Content not available', {
        status: 503,
        statusText: 'Service Unavailable'
    });
}

// Get placeholder image for failed image requests - Dark theme version
function getPlaceholderImage() {
    // Return a dark theme SVG placeholder
    const svg = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#1a1a1a"/>
            <circle cx="150" cy="80" r="25" fill="#F7931E" opacity="0.5"/>
            <text x="50%" y="65%" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" 
                  font-size="14" fill="#B3B3B3" text-anchor="middle" dy=".3em">
                Image Unavailable
            </text>
            <text x="50%" y="75%" font-family="-apple-system, BlinkMacSystemFont, Arial, sans-serif" 
                  font-size="12" fill="#808080" text-anchor="middle" dy=".3em">
                Dark Mode Optimized
            </text>
        </svg>
    `;
    
    return new Response(svg, {
        headers: { 
            'Content-Type': 'image/svg+xml',
            'X-Theme': 'dark'
        }
    });
}

// Dark theme optimized offline HTML page
function getOfflineHTML() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Offline - The Silk Road Global</title>
            <meta name="theme-color" content="#000000">
            <meta name="color-scheme" content="dark">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
                    background: linear-gradient(135deg, #000000, #111111);
                    color: #FFFFFF;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 20px;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                
                .offline-container {
                    max-width: 500px;
                    background: rgba(26, 26, 26, 0.8);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-radius: 24px;
                    padding: 3rem 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
                }
                
                .offline-icon {
                    width: 90px;
                    height: 90px;
                    background: linear-gradient(135deg, #F7931E, #E8830C);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 2rem;
                    font-size: 2.5rem;
                    box-shadow: 0 10px 30px rgba(247, 147, 30, 0.3);
                    animation: pulse 2s infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                
                h1 {
                    font-size: 2.2rem;
                    margin-bottom: 1rem;
                    color: #FFFFFF;
                    font-weight: 600;
                    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
                }
                
                p {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                    color: #B3B3B3;
                }
                
                .retry-btn {
                    background: linear-gradient(135deg, #F7931E, #E8830C);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
                    box-shadow: 0 4px 15px rgba(247, 147, 30, 0.3);
                }
                
                .retry-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(247, 147, 30, 0.4);
                }
                
                .features-list {
                    text-align: left;
                    margin: 2rem 0;
                    background: rgba(0, 0, 0, 0.3);
                    padding: 2rem;
                    border-radius: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                
                .features-list h3 {
                    color: #F7931E;
                    margin-bottom: 1rem;
                    font-size: 1.2rem;
                    font-weight: 600;
                }
                
                .features-list li {
                    margin: 0.8rem 0;
                    padding-left: 1.5rem;
                    position: relative;
                    color: #B3B3B3;
                }
                
                .features-list li:before {
                    content: "✓";
                    position: absolute;
                    left: 0;
                    color: #F7931E;
                    font-weight: bold;
                    font-size: 1.1rem;
                }
                
                .contact-info {
                    margin-top: 2rem;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .contact-info h3 {
                    color: #F7931E;
                    margin-bottom: 1rem;
                    font-size: 1.2rem;
                    font-weight: 600;
                }
                
                .contact-info p {
                    color: #B3B3B3;
                    margin-bottom: 0.5rem;
                    font-size: 0.95rem;
                }
                
                @media (max-width: 480px) {
                    .offline-container {
                        padding: 2rem 1.5rem;
                        margin: 1rem;
                    }
                    
                    h1 {
                        font-size: 1.8rem;
                    }
                    
                    .offline-icon {
                        width: 70px;
                        height: 70px;
                        font-size: 2rem;
                    }
                }
                
                /* Apple device optimizations */
                @supports (-webkit-backdrop-filter: blur(20px)) {
                    .offline-container {
                        -webkit-backdrop-filter: blur(20px);
                    }
                }
            </style>
        </head>
        <body>
            <div class="offline-container">
                <div class="offline-icon">
                    📡
                </div>
                <h1>You're Offline</h1>
                <p>
                    It looks like you've lost your internet connection. 
                    Don't worry - some content may still be available from cache.
                </p>
                
                <div class="features-list">
                    <h3>What you can still do:</h3>
                    <ul>
                        <li>Browse previously visited pages</li>
                        <li>View cached content in dark mode</li>
                        <li>See our contact information</li>
                        <li>Experience optimized Apple fonts</li>
                    </ul>
                </div>
                
                <button class="retry-btn" onclick="window.location.reload()">
                    Try Again
                </button>
                
                <div class="contact-info">
                    <h3>Contact Us</h3>
                    <p>Email: info@silkroadglobal.co</p>
                    <p>Phone: +971 XX XXX XXXX</p>
                    <p>Dubai, UAE</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Background Sync for form submissions with dark theme support
self.addEventListener('sync', event => {
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(syncContactForms());
    }
});

// Sync offline form submissions when back online
async function syncContactForms() {
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        const requests = await cache.keys();
        
        const formRequests = requests.filter(request => 
            request.url.includes('contact') && request.method === 'POST'
        );
        
        for (const request of formRequests) {
            try {
                await fetch(request);
                await cache.delete(request);
                console.log('✅ Synced offline form submission');
            } catch (error) {
                console.error('❌ Failed to sync form submission:', error);
            }
        }
    } catch (error) {
        console.error('❌ Background sync failed:', error);
    }
}

// Push notifications with dark theme support
self.addEventListener('push', event => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/assets/images/icon-192x192.png',
        badge: '/assets/images/badge-72x72.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/',
            theme: 'dark'
        },
        actions: [
            {
                action: 'open',
                title: 'Open Website',
                icon: '/assets/images/action-open.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/images/action-close.png'
            }
        ],
        // Dark theme notification styling
        image: data.image || '/assets/images/dark-notification-image.png',
        silent: false,
        requireInteraction: false,
        tag: 'silk-road-notification'
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'open' || !event.action) {
        event.waitUntil(
            clients.openWindow(event.notification.data.url || '/')
        );
    }
});

// Cache management utilities with dark theme optimization
self.addEventListener('message', event => {
    if (event.data && event.data.type) {
        switch (event.data.type) {
            case 'CACHE_UPDATE':
                handleCacheUpdate();
                break;
            case 'CACHE_STATUS':
                getCacheStatus().then(status => {
                    event.ports[0].postMessage(status);
                });
                break;
            case 'CLEAR_CACHE':
                clearCaches().then(() => {
                    event.ports[0].postMessage({ success: true });
                });
                break;
            case 'THEME_UPDATE':
                handleThemeUpdate(event.data.theme);
                break;
        }
    }
});

async function handleCacheUpdate() {
    try {
        const cache = await caches.open(STATIC_CACHE);
        await cache.addAll(STATIC_ASSETS);
        console.log('✅ Dark theme cache updated successfully');
    } catch (error) {
        console.error('❌ Dark theme cache update failed:', error);
    }
}

async function getCacheStatus() {
    const cacheNames = await caches.keys();
    const status = {
        caches: cacheNames.length,
        staticCache: cacheNames.includes(STATIC_CACHE),
        dynamicCache: cacheNames.includes(DYNAMIC_CACHE),
        theme: 'dark'
    };
    
    if (status.staticCache) {
        const cache = await caches.open(STATIC_CACHE);
        const keys = await cache.keys();
        status.staticAssets = keys.length;
    }
    
    return status;
}

async function clearCaches() {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('✅ All caches cleared (dark theme)');
}

async function handleThemeUpdate(theme) {
    if (theme === 'dark') {
        console.log('🌙 Dark theme confirmed - cache optimized');
    }
}

// Performance monitoring with dark theme metrics
self.addEventListener('fetch', event => {
    const startTime = performance.now();
    
    event.respondWith(
        handleRequest(event.request).then(response => {
            const endTime = performance.now();
            const duration = endTime - startTime;
            
            // Log slow requests with dark theme context
            if (duration > 1000) {
                console.warn(`🐌 Slow request (dark theme): ${event.request.url} took ${duration.toFixed(2)}ms`);
            }
            
            return response;
        })
    );
});

async function handleRequest(request) {
    // Use existing handlers based on request type
    if (isStaticAsset(request.url)) {
        return handleStaticAsset(request);
    } else if (isAPIRequest(request.url)) {
        return handleAPIRequest(request);
    } else if (isImageRequest(request.url)) {
        return handleImageRequest(request);
    } else if (isFontRequest(request.url)) {
        return handleFontRequest(request);
    } else {
        return handleOtherRequest(request);
    }
}

console.log('🚀 Silk Road Global Service Worker loaded successfully with dark theme optimization');

// Web App Manifest data for dark theme
const manifestData = {
    name: "The Silk Road Global",
    short_name: "Silk Road",
    description: "Connecting Cultures. Empowering Commerce.",
    start_url: "/",
    display: "standalone",
    theme_color: "#000000",
    background_color: "#000000",
    orientation: "portrait-primary",
    icons: [
        {
            src: "/assets/images/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
        },
        {
            src: "/assets/images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
        },
        {
            src: "/assets/images/dark-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
        }
    ],
    shortcuts: [
        {
            name: "Our Brands",
            short_name: "Brands",
            description: "Explore our premium brands",
            url: "/#brands",
            icons: [{ src: "/assets/images/shortcut-brands.png", sizes: "96x96" }]
        },
        {
            name: "Contact Us",
            short_name: "Contact",
            description: "Get in touch with us",
            url: "/#contact",
            icons: [{ src: "/assets/images/shortcut-contact.png", sizes: "96x96" }]
        }
    ],
    categories: ["business", "commerce", "trade"],
    lang: "en",
    dir: "ltr"
};