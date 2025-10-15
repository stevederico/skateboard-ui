import { useEffect, useState } from 'react';
import constants from "@/constants.json";

export function getCookie(name) {
    // For token cookies, use app-specific name
    let cookieName = name;
    if (name === 'token') {
        const appName = constants.appName || 'skateboard';
        cookieName = `${appName.toLowerCase().replace(/\s+/g, '-')}_token`;
    }

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

export function getCSRFToken() {
    const appName = constants.appName || 'skateboard';
    const csrfKey = `${appName.toLowerCase().replace(/\s+/g, '-')}_csrf`;
    return localStorage.getItem(csrfKey);
}

export function getAppKey(suffix) {
    const appName = constants.appName || 'skateboard';
    return `${appName.toLowerCase().replace(/\s+/g, '-')}_${suffix}`;
}

export function isAuthenticated() {
    if (constants.noLogin === true) {
        return true;
    }
    const csrfKey = getAppKey('csrf');
    return Boolean(localStorage.getItem(csrfKey));
}

export function getBackendURL() {
    let result = import.meta.env.DEV ? constants.devBackendURL : constants.backendURL;
    return result
}

export function isAppMode() {
    let a = !!(
        typeof window !== 'undefined' &&
        window.webkit &&
        window.webkit.messageHandlers
    );
    return a
}

export async function getCurrentUser() {

    if (constants.noLogin == true) {
        return {}
    }

    try {
        const csrfToken = getCSRFToken();
        const response = await fetch(`${getBackendURL()}/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(csrfToken && { 'X-CSRF-Token': csrfToken })
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null
    }
}

export async function isSubscriber() {
    if (constants.noLogin == true) {
        return false
    }

    try {
        const csrfToken = getCSRFToken();
        const response = await fetch(`${getBackendURL()}/isSubscriber`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(csrfToken && { 'X-CSRF-Token': csrfToken })
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.isSubscriber === true) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error checking subscription:', error);
        return false;
    }
}

export async function logEvent(event) {
    //insert analytics code here
}

export async function showManage(stripeID) {
    try {
        const csrfToken = getCSRFToken();
        const uri = `${getBackendURL()}/portal`;
        const response = await fetch(uri, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(csrfToken && { 'X-CSRF-Token': csrfToken })
            },
            body: JSON.stringify({ customerID: stripeID }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("/portal response: ", data);
            if (data.url) {

                localStorage.setItem(getAppKey("beforeManageURL"), window.location.href);

                window.location.href = data.url; // Redirect to Stripe billing portal
            } else {
                console.error("No URL returned from server");
            }
        } else {
            console.error("Error with /portal. Status:", response.status);
        }
    } catch (error) {
        console.error("Request failed:", error);
    }
}

export async function showCheckout(email, productIndex = 0) {
    try {
        const csrfToken = getCSRFToken();

        const params = {
            lookup_key: constants.stripeProducts[productIndex].lookup_key,
            email: email
        };

        const uri = `${getBackendURL()}/checkout`;
        const response = await fetch(uri, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(csrfToken && { 'X-CSRF-Token': csrfToken })
            },
            body: JSON.stringify(params),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.url) {
                // Save the current URL in localStorage before redirecting
                localStorage.setItem(getAppKey("beforeCheckoutURL"), window.location.href);
                // Redirect to payment checkout
                window.location.href = data.url;
                return true;
            } else {
                console.error("No URL returned from server");
                return false;
            }
        } else {
            console.error("Error with /checkout. Status:", response.status);
            return false;
        }
    } catch (error) {
        console.error("Checkout failed:", error);
        return false;
    }
}

// Usage Limits Configuration
const FREE_LIMITS = {
    todos: 3,
    messages: 10
};

export async function getRemainingUsage(action) {
    if (constants.noLogin === true) {
        return { remaining: -1, total: -1, isSubscriber: true };
    }

    try {
        const csrfToken = getCSRFToken();
        const response = await fetch(`${getBackendURL()}/usage`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(csrfToken && { 'X-CSRF-Token': csrfToken })
            },
            body: JSON.stringify({ operation: 'check' })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error checking usage:', error);
        return { remaining: 0, total: 0, isSubscriber: false };
    }
}

export async function trackUsage(action) {
    if (constants.noLogin === true) {
        return { remaining: -1, total: -1, isSubscriber: true };
    }

    try {
        const csrfToken = getCSRFToken();
        const response = await fetch(`${getBackendURL()}/usage`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(csrfToken && { 'X-CSRF-Token': csrfToken })
            },
            body: JSON.stringify({ operation: 'track' })
        });

        if (!response.ok) {
            const data = await response.json();
            if (response.status === 429) {
                // Usage limit reached
                console.warn('Usage limit reached:', data.error);
                return data; // Return the usage data even when limit reached
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Return full usage data
    } catch (error) {
        console.error('Error tracking usage:', error);
        return { remaining: 0, total: 0, isSubscriber: false };
    }
}

export async function showUpgradeSheet(upgradeSheetRef) {
    // Check subscription from user data in localStorage instead of API call
    const appName = constants.appName || 'skateboard';
    const storageKey = `${appName.toLowerCase().replace(/\s+/g, '-')}_user`;
    const storedUser = localStorage.getItem(storageKey);

    let subscriber = false;
    if (storedUser && storedUser !== "undefined") {
        const user = JSON.parse(storedUser);
        subscriber = user?.subscription?.status === 'active' &&
            (!user?.subscription?.expires || user?.subscription?.expires > Math.floor(Date.now() / 1000));
    }

    if (subscriber) {
        return; // Don't show upgrade sheet for subscribers
    }

    // Show the upgrade sheet using the ref
    if (upgradeSheetRef?.current) {
        upgradeSheetRef.current.show();
    } else {
        // Fallback to navigation if ref is not available
        window.location.href = '/app/stripe';
    }
}

export function timestampToString(input, format = "DOB") {

    let seconds = 0

    // Convert Date object to timestamp in seconds
    if (input instanceof Date) {
        seconds = input.getTime() / 1000;
    } else if (typeof input === 'number') {
        const digits = Math.abs(input).toString().length;
        if (digits > 11) {
            seconds = input / 1000
        } else {
            seconds = input
        }
    } else {
        return "BAD-INPUT";
    }

    // Ensure ts is in milliseconds
    const date = new Date(seconds * 1000);

    switch (format) {
        case "DOB":
            return date.toLocaleDateString();
        case "ISO":
            return date.toLocaleString();
        case "ago": {
            const now = new Date();
            const diffInSeconds = Math.floor((now - date) / 1000);
            const minute = 60, hour = minute * 60, day = hour * 24;
            const week = day * 7, month = day * 30, year = day * 365;

            if (diffInSeconds < minute) return 'a few seconds ago';
            if (diffInSeconds < hour) return `${Math.floor(diffInSeconds / minute)} minute${Math.floor(diffInSeconds / minute) > 1 ? 's' : ''} ago`;
            if (diffInSeconds < day) return `${Math.floor(diffInSeconds / hour)} hour${Math.floor(diffInSeconds / hour) > 1 ? 's' : ''} ago`;
            if (diffInSeconds < week) return `${Math.floor(diffInSeconds / day)} day${Math.floor(diffInSeconds / day) > 1 ? 's' : ''} ago`;
            if (diffInSeconds < month) return `${Math.floor(diffInSeconds / week)} week${Math.floor(diffInSeconds / week) > 1 ? 's' : ''} ago`;
            if (diffInSeconds < year) return `${Math.floor(diffInSeconds / month)} month${Math.floor(diffInSeconds / month) > 1 ? 's' : ''} ago`;
            return `${Math.floor(diffInSeconds / year)} year${Math.floor(diffInSeconds / year) > 1 ? 's' : ''} ago`;
        }
        case "day-month-time": {
            const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            let hours = date.getHours();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            const minutes = ('0' + date.getMinutes()).slice(-2);
            return `${shortDays[date.getDay()]} ${month}/${day}, ${hours}:${minutes} ${ampm}`;
        }
        case "day": {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return days[date.getDay()];
        }
        case 'time': {
            let hours = date.getHours();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            const minutes = ('0' + date.getMinutes()).slice(-2);
            return `${hours}:${minutes} ${ampm}`;
        }
        case "full": {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let hours = date.getHours();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            const minutes = ('0' + date.getMinutes()).slice(-2);
            return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} ${hours}:${minutes} ${ampm}`;
        }
        case "DOBT": {
            const today = new Date();
            const isToday = date.toDateString() === today.toDateString();
            const yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);
            const isYesterday = date.toDateString() === yesterday.toDateString();

            if (isToday) {
                return date.toLocaleString(undefined, { hour: 'numeric', minute: 'numeric' });
            } else if (isYesterday) {
                return `Yesterday, ${date.toLocaleString(undefined, { hour: 'numeric', minute: 'numeric' })}`;
            } else {
                const month = date.getMonth() + 1; // no leading zero
                const day = date.getDate();        // no leading zero
                let hours = date.getHours();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12 || 12;
                // pad minutes to always show two digits
                const minutes = ('0' + date.getMinutes()).slice(-2);
                return `${month}/${day}/${date.getFullYear()} ${hours}:${minutes} ${ampm}`;
            }
        }


        default:
            return ts;
    }
}

export function useAppSetup(location) {
    useEffect(() => {
        document.title = constants.appName;
        if (!location.pathname.toLowerCase().includes('app')) {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        }
    }, [location.pathname]);
}

// ===== API REQUEST UTILITIES =====

/**
 * Unified API request utility
 * Handles credentials, CSRF tokens, 401 redirects, and error handling
 *
 * @param {string} endpoint - API endpoint (e.g., '/deals')
 * @param {RequestInit} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<any>} - Parsed JSON response
 */
export async function apiRequest(endpoint, options = {}) {
    const csrfToken = getCSRFToken();
    const needsCSRF = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(
        (options.method || 'GET').toUpperCase()
    );

    const response = await fetch(`${getBackendURL()}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(needsCSRF && csrfToken && { 'X-CSRF-Token': csrfToken }),
            ...options.headers
        }
    });

    // Handle 401 (redirect to signout)
    if (response.status === 401) {
        window.location.href = '/signout';
        throw new Error('Unauthorized - Redirecting to Sign Out');
    }

    // Handle other errors
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * API request with query parameters
 *
 * @param {string} endpoint - API endpoint
 * @param {object} params - Query parameters
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<any>}
 */
export async function apiRequestWithParams(endpoint, params = {}, options = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return apiRequest(url, options);
}

// ===== CONSTANTS VALIDATION =====

/**
 * Validate constants.json has all required fields
 * @param {object} constants - Constants object to validate
 * @returns {object} - Same constants if valid
 * @throws {Error} - If required fields are missing
 */
export function validateConstants(constants) {
    const required = [
        'appName',
        'appIcon',
        'tagline',
        'cta',
        'backendURL',
        'devBackendURL',
        'features.title',
        'features.items',
        'companyName',
        'companyWebsite',
        'companyEmail',
    ];

    const missing = required.filter(key => {
        const value = key.split('.').reduce((obj, k) => obj?.[k], constants);
        return !value;
    });

    if (missing.length > 0) {
        throw new Error(`Missing required constants: ${missing.join(', ')}`);
    }

    return constants;
}

// ===== VITE BUILD CONFIG UTILITIES =====
// These are used in vite.config.js - they need Node.js imports which only work at build time
// Import these only in your vite.config.js file

/**
 * Custom logger plugin for Vite
 * Shows simplified console output
 */
export const customLoggerPlugin = () => {
    return {
        name: 'custom-logger',
        configureServer(server) {
            server.printUrls = () => {
                console.log(`🖥️  React is running on http://localhost:${server.config.server.port || 5173}`);
            };
        }
    };
};

/**
 * HTML replacement plugin
 * Replaces {{APP_NAME}}, {{TAGLINE}}, {{COMPANY_WEBSITE}} in index.html
 */
export const htmlReplacePlugin = () => {
    return {
        name: 'html-replace',
        transformIndexHtml(html) {
            // Note: This requires fs which only works at build time
            const { readFileSync } = await import('node:fs');
            const constants = JSON.parse(readFileSync('src/constants.json', 'utf8'));

            return html
                .replace(/{{APP_NAME}}/g, constants.appName)
                .replace(/{{TAGLINE}}/g, constants.tagline)
                .replace(/{{COMPANY_WEBSITE}}/g, constants.companyWebsite);
        }
    };
};

/**
 * Dynamic robots.txt plugin
 * Generates robots.txt from constants.json
 */
export const dynamicRobotsPlugin = () => {
    return {
        name: 'dynamic-robots',
        generateBundle() {
            const { readFileSync } = require('fs');
            const constants = JSON.parse(readFileSync('src/constants.json', 'utf8'));
            const website = constants.companyWebsite.startsWith('http')
                ? constants.companyWebsite
                : `https://${constants.companyWebsite}`;

            const robotsContent = `User-agent: Googlebot
Disallow: /app/
Disallow: /console/
Disallow: /signin/
Disallow: /signup/

User-agent: Bingbot
Disallow: /app/
Disallow: /console/
Disallow: /signin/
Disallow: /signup/

User-agent: Applebot
Disallow: /app/
Disallow: /console/
Disallow: /signin/
Disallow: /signup/

User-agent: facebookexternalhit
Disallow: /app/
Disallow: /console/
Disallow: /signin/
Disallow: /signup/

User-agent: Facebot
Disallow: /app/
Disallow: /console/
Disallow: /signin/
Disallow: /signup/

User-agent: Twitterbot
Disallow: /app/
Disallow: /console/
Disallow: /signin/
Disallow: /signup/

User-agent: *
Disallow: /

Sitemap: ${website}/sitemap.xml
`;

            this.emitFile({
                type: 'asset',
                fileName: 'robots.txt',
                source: robotsContent
            });
        }
    };
};

/**
 * Dynamic sitemap.xml plugin
 * Generates sitemap.xml from constants.json
 */
export const dynamicSitemapPlugin = () => {
    return {
        name: 'dynamic-sitemap',
        generateBundle() {
            const { readFileSync } = require('fs');
            const constants = JSON.parse(readFileSync('src/constants.json', 'utf8'));
            const website = constants.companyWebsite.startsWith('http')
                ? constants.companyWebsite
                : `https://${constants.companyWebsite}`;

            const currentDate = new Date().toISOString().split('T')[0];

            const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${website}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${website}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${website}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${website}/subs</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${website}/eula</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

            this.emitFile({
                type: 'asset',
                fileName: 'sitemap.xml',
                source: sitemapContent
            });
        }
    };
};

/**
 * Dynamic manifest.json plugin
 * Generates manifest.json from constants.json
 */
export const dynamicManifestPlugin = () => {
    return {
        name: 'dynamic-manifest',
        generateBundle() {
            const { readFileSync } = require('fs');
            const constants = JSON.parse(readFileSync('src/constants.json', 'utf8'));

            const manifestContent = {
                short_name: constants.appName,
                name: constants.appName,
                description: constants.tagline,
                icons: [
                    {
                        src: "/icons/icon.svg",
                        sizes: "192x192",
                        type: "image/svg+xml"
                    }
                ],
                start_url: "./app",
                display: "standalone",
                theme_color: "#000000",
                background_color: "#ffffff"
            };

            this.emitFile({
                type: 'asset',
                fileName: 'manifest.json',
                source: JSON.stringify(manifestContent, null, 2)
            });
        }
    };
};

/**
 * Complete Vite config generator
 * Returns standard skateboard config with optional overrides
 *
 * @param {object} customConfig - Custom config to merge/override
 * @returns {object} - Complete Vite config object
 *
 * Usage in vite.config.js:
 * import { defineConfig } from 'vite'
 * import { getSkateboardViteConfig } from '@stevederico/skateboard-ui/Utilities'
 *
 * export default defineConfig(getSkateboardViteConfig({
 *   server: {
 *     proxy: { '/api': { target: 'http://localhost:3000' } }
 *   }
 * }))
 */
export const getSkateboardViteConfig = (customConfig = {}) => {
    // These imports only work at build time in vite.config.js
    const react = require('@vitejs/plugin-react-swc');
    const tailwindcss = require('@tailwindcss/vite');
    const { resolve } = require('node:path');
    const { fileURLToPath } = require('node:url');
    const path = require('node:path');

    const __dirname = fileURLToPath(new URL('.', import.meta.url));

    return {
        plugins: [
            react(),
            tailwindcss(),
            customLoggerPlugin(),
            htmlReplacePlugin(),
            dynamicRobotsPlugin(),
            dynamicSitemapPlugin(),
            dynamicManifestPlugin(),
            ...(customConfig.plugins || [])
        ],
        esbuild: {
            drop: []
        },
        resolve: {
            alias: {
                '@': resolve(process.cwd(), './src'),
                '@package': path.resolve(process.cwd(), 'package.json'),
                '@root': path.resolve(process.cwd()),
                'react/jsx-runtime': path.resolve(process.cwd(), 'node_modules/react/jsx-runtime.js'),
                ...(customConfig.resolve?.alias || {})
            }
        },
        optimizeDeps: {
            include: ['react-dom', '@radix-ui/react-slot'],
            esbuildOptions: {
                define: {
                    global: 'globalThis',
                },
            },
        },
        server: {
            host: 'localhost',
            open: false,
            port: 5173,
            strictPort: false,
            hmr: {
                port: 5173,
                overlay: false,
            },
            watch: {
                usePolling: false,
                ignored: ['**/node_modules/**', '**/.git/**']
            },
            ...(customConfig.server || {})
        },
        logLevel: 'error',
        ...customConfig
    };
};

// ===== REACT HOOKS =====

/**
 * Standard list data fetcher with optional sorting
 * @param {string} endpoint - API endpoint to fetch from
 * @param {function} sortFn - Optional sort function for results
 * @returns {object} - { data, loading, error, refetch }
 */
export function useListData(endpoint, sortFn = null) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await apiRequest(endpoint);
            const sorted = sortFn ? result.sort(sortFn) : result;
            setData(sorted);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    return { data, loading, error, refetch: fetchData };
}

/**
 * Standard form state management
 * @param {object} initialValues - Initial form values
 * @param {function} onSubmit - Submit handler function
 * @returns {object} - { values, handleChange, handleSubmit, reset, submitting, error }
 */
export function useForm(initialValues, onSubmit) {
    const [values, setValues] = useState(initialValues);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (field) => (e) => {
        setValues(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            await onSubmit(values);
            setValues(initialValues);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const reset = () => setValues(initialValues);

    return { values, handleChange, handleSubmit, reset, submitting, error };
}

