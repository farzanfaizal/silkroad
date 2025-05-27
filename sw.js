// Service Worker for Silk Road Global Website
// sw.js - Handles caching, offline functionality, and performance optimization

const CACHE_NAME = 'silk-road-global-v1.0.0';
const STATIC_CACHE = 'silk-road-static-v1';
const DYNAMIC_CACHE = 'silk-road-dynamic-v1';

// Assets to cache immediately
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
    // External resources
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap'
];

// Assets to cache on demand
const CACHE_ON_DEMAND = [
    '/assets/images/',
    '/api/',
    'https://formspree.io/',
    'https://api.'
];

// Install Event - Cache static assets
self.addEventListener('install', event => {
    console.log('🔧 Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('📦 Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('✅ Static assets cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Failed to cache static assets:', error);
            })
    );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('🗑️ Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Old caches cleaned up');
                return self.clients.claim();
            })
    );
});

// Fetch Event - Handle network requests
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
           url.includes('.woff2');
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
           url.includes('.svg');
}

// Handle static assets - Cache First strategy
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
                message: 'Please check your internet connection and try again.' 
            }),
            {
                status: 503,
                statusText: 'Service Unavailable',
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// Handle image requests - Cache First with fallback
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

// Get offline fallback response
function getOfflineFallback(request) {
    if (request.destination === 'document') {
        return caches.match('/offline.html') || 
               new Response(getOfflineHTML(), {
                   headers: { 'Content-Type': 'text/html' }
               });
    }
    
    return new Response('Offline - Content not available', {
        status: 503,
        statusText: 'Service Unavailable'
    });
}

// Get placeholder image for failed image requests
function getPlaceholderImage() {
    // Return a simple SVG placeholder
    const svg = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f0f0f0"/>
            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" 
                  fill="#999" text-anchor="middle" dy=".3em">
                Image Unavailable
            </text>
        </svg>
    `;
    
    return new Response(svg, {
        headers: { 'Content-Type': 'image/svg+xml' }
    });
}

// Offline HTML page
function getOfflineHTML() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Offline - The Silk Road Global</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Inter', Arial, sans-serif;
                    background: linear-gradient(135deg, #1B2951, #2C3E50);
                    color: white;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 20px;
                }
                
                .offline-container {
                    max-width: 500px;
                }
                
                .offline-icon {
                    width: 80px;
                    height: 80px;
                    background: #D4AF37;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 2rem;
                    font-size: 2rem;
                }
                
                h1 {
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    color: #D4AF37;
                }
                
                p {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                    opacity: 0.9;
                }
                
                .retry-btn {
                    background: linear-gradient(135deg, #D4AF37, #B8941F);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                
                .retry-btn:hover {
                    transform: translateY(-2px);
                }
                
                .features-list {
                    text-align: left;
                    margin: 2rem 0;
                }
                
                .features-list li {
                    margin: 0.5rem 0;
                    padding-left: 1.5rem;
                    position: relative;
                }
                
                .features-list li:before {
                    content: "✓";
                    position: absolute;
                    left: 0;
                    color: #D4AF37;
                    font-weight: bold;
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
                        <li>View cached content</li>
                        <li>See our contact information</li>
                    </ul>
                </div>
                
                <button class="retry-btn" onclick="window.location.reload()">
                    Try Again
                </button>
                
                <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.2);">
                    <h3>Contact Us</h3>
                    <p>Email: info@silkroadglobal.co</p>
                    <p>Phone: +971 XX XXX XXXX</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// Background Sync for form submissions
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

// Push notifications (if needed)
self.addEventListener('push', event => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/assets/images/icon-192x192.png',
        badge: '/assets/images/badge-72x72.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/'
        },
        actions: [
            {
                action: 'open',
                title: 'Open Website'
            },
            {
                action: 'close',
                title: 'Close'
            }
        ]
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

// Cache management utilities
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
        }
    }
});

async function handleCacheUpdate() {
    try {
        const cache = await caches.open(STATIC_CACHE);
        await cache.addAll(STATIC_ASSETS);
        console.log('✅ Cache updated successfully');
    } catch (error) {
        console.error('❌ Cache update failed:', error);
    }
}

async function getCacheStatus() {
    const cacheNames = await caches.keys();
    const status = {
        caches: cacheNames.length,
        staticCache: cacheNames.includes(STATIC_CACHE),
        dynamicCache: cacheNames.includes(DYNAMIC_CACHE)
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
    console.log('✅ All caches cleared');
}

// Performance monitoring
self.addEventListener('fetch', event => {
    const startTime = performance.now();
    
    event.respondWith(
        handleRequest(event.request).then(response => {
            const endTime = performance.now();
            const duration = endTime - startTime;
            
            // Log slow requests
            if (duration > 1000) {
                console.warn(`Slow request: ${event.request.url} took ${duration.toFixed(2)}ms`);
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
    } else {
        return handleOtherRequest(request);
    }
}

console.log('🚀 Silk Road Global Service Worker loaded successfully');

// Web App Manifest data for reference
const manifestData = {
    name: "The Silk Road Global",
    short_name: "Silk Road",
    description: "Connecting Cultures. Empowering Commerce.",
    start_url: "/",
    display: "standalone",
    theme_color: "#D4AF37",
    background_color: "#1B2951",
    icons: [
        {
            src: "/assets/images/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
        },
        {
            src: "/assets/images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
        }
    ]
};