import { useEffect, useState } from 'react';
import { getDispatch } from './Context.jsx';

// Constants will be initialized by the app shell
// Use window object to avoid module duplication issues with Vite
let _constants = null;
if (typeof window !== 'undefined') {
    window.__SKATEBOARD_CONSTANTS__ = window.__SKATEBOARD_CONSTANTS__ || null;
}

// Check if localStorage is available (respects private mode, etc.)
let _localStorageAvailable = null;
function isLocalStorageAvailable() {
    if (_localStorageAvailable !== null) return _localStorageAvailable;
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        _localStorageAvailable = true;
        return true;
    } catch (e) {
        console.warn('localStorage not available (private mode or quota exceeded):', e.message);
        _localStorageAvailable = false;
        return false;
    }
}

// Safe localStorage wrapper with error handling
function safeSetItem(key, value) {
    if (!isLocalStorageAvailable()) {
        console.warn(`Could not save to localStorage: ${key} (storage unavailable)`);
        return false;
    }
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.error('localStorage quota exceeded - data not persisted');
        } else {
            console.error('localStorage setItem error:', error.message);
        }
        return false;
    }
}

function safeGetItem(key) {
    if (!isLocalStorageAvailable()) return null;
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error('localStorage getItem error:', error.message);
        return null;
    }
}

function safeRemoveItem(key) {
    if (!isLocalStorageAvailable()) return false;
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('localStorage removeItem error:', error.message);
        return false;
    }
}

/**
 * Initialize skateboard-ui utilities with app constants.
 *
 * MUST be called before any utility functions are used, including
 * before React components render. Stores constants in both module-level
 * variable and window.__SKATEBOARD_CONSTANTS__ to handle Vite module
 * duplication issues.
 *
 * @param {Object} constants - App configuration object
 * @param {string} constants.appName - Application name
 * @param {string} constants.devBackendURL - Development API base URL (include /api prefix)
 * @param {string} constants.backendURL - Production API base URL (include /api prefix)
 * @throws {Error} If constants is null/undefined
 *
 * @example
 * initializeUtilities({
 *   appName: "MyApp",
 *   devBackendURL: "http://localhost:8000/api",
 *   backendURL: "https://api.myapp.com/api"
 * });
 */
export function initializeUtilities(constants) {
    if (!constants) {
        throw new Error('initializeUtilities called with null/undefined constants');
    }
    // Store in both module and window to handle module duplication
    _constants = constants;
    if (typeof window !== 'undefined') {
        window.__SKATEBOARD_CONSTANTS__ = constants;
    }
}

/**
 * Get the app constants object.
 *
 * Returns constants from window.__SKATEBOARD_CONSTANTS__ (handles Vite
 * module duplication) or the module-level variable.
 *
 * @returns {Object} App constants
 * @throws {Error} If initializeUtilities() hasn't been called
 */
export function getConstants() {
    // Check window object first (handles module duplication)
    if (typeof window !== 'undefined' && window.__SKATEBOARD_CONSTANTS__) {
        return window.__SKATEBOARD_CONSTANTS__;
    }

    if (!_constants) {
        throw new Error('Utilities not initialized. Call initializeUtilities(constants) first.');
    }
    return _constants;
}

/**
 * Read a browser cookie by name.
 *
 * For the "token" cookie, automatically prefixes with the app name.
 *
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null
 */
export function getCookie(name) {
    // For token cookies, use app-specific name
    let cookieName = name;
    if (name === 'token') {
        const appName = getConstants().appName || 'skateboard';
        cookieName = `${appName.toLowerCase().replace(/\s+/g, '-')}_token`;
    }

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

/**
 * Get CSRF token from cookie or localStorage.
 *
 * Reads CSRF token from csrf_token cookie (set by backend during signin/signup).
 * Falls back to localStorage for backwards compatibility. This token should be
 * sent in the X-CSRF-Token header for state-changing requests.
 *
 * @returns {string|null} CSRF token or null if not found
 *
 * @example
 * const csrfToken = getCSRFToken();
 * fetch('/api/endpoint', {
 *   headers: { 'X-CSRF-Token': csrfToken }
 * });
 */
export function getCSRFToken() {
    // Try cookie first (source of truth from backend)
    const csrfCookie = getCookie('csrf_token');
    if (csrfCookie) return csrfCookie;

    // Fallback to localStorage (for backwards compatibility)
    const appName = getConstants().appName || 'skateboard';
    const csrfKey = `${appName.toLowerCase().replace(/\s+/g, '-')}_csrf`;
    return safeGetItem(csrfKey);
}

/**
 * Generate app-specific localStorage key.
 *
 * Creates namespaced keys using app name: `{appName}_{suffix}`
 * App name is normalized (lowercase, hyphens replace spaces)
 *
 * @param {string} suffix - Key suffix (e.g., 'csrf', 'user', 'theme')
 * @returns {string} Namespaced key
 *
 * @example
 * getAppKey('csrf')  // "myapp_csrf"
 * getAppKey('user')  // "myapp_user"
 * getAppKey('theme') // "myapp_theme"
 */
export function getAppKey(suffix) {
    const appName = getConstants().appName || 'skateboard';
    return `${appName.toLowerCase().replace(/\s+/g, '-')}_${suffix}`;
}

/**
 * Check if user is authenticated.
 *
 * Uses localStorage (NOT cookies) for fast client-side validation.
 * Checks for both CSRF token and user data in localStorage.
 * If constants.noLogin is true, always returns true.
 *
 * Note: This is a client-side check only. ProtectedRoute performs
 * additional server-side validation via /me endpoint.
 *
 * @returns {boolean} True if authenticated or noLogin mode
 *
 * @see {@link ProtectedRoute} for server-side validation
 *
 * @example
 * if (isAuthenticated()) {
 *   // Show authenticated UI
 * } else {
 *   // Redirect to signin
 * }
 */
export function isAuthenticated() {
    if (getConstants().noLogin === true) {
        return true;
    }
    const userKey = getAppKey('user');
    return Boolean(getCSRFToken()) && Boolean(safeGetItem(userKey));
}

/**
 * Get the backend API base URL based on environment.
 *
 * Returns devBackendURL in development mode, backendURL in production.
 * Endpoints should be concatenated: `${getBackendURL()}/endpoint`
 *
 * @returns {string} Base URL including /api prefix
 *
 * @example
 * const url = `${getBackendURL()}/signup`;
 * // Dev:  "http://localhost:8000/api/signup"
 * // Prod: "https://api.myapp.com/api/signup"
 */
export function getBackendURL() {
    let result = import.meta.env.DEV ? getConstants().devBackendURL : getConstants().backendURL;
    return result
}

/**
 * Check if the app is running inside a native WebKit wrapper (iOS/macOS).
 *
 * @returns {boolean} True if webkit.messageHandlers is available
 */
export function isAppMode() {
    let a = !!(
        typeof window !== 'undefined' &&
        window.webkit &&
        window.webkit.messageHandlers
    );
    return a
}

/**
 * Fetch the current authenticated user from the backend.
 *
 * Calls GET /me with credentials and CSRF token.
 * Returns an empty object if constants.noLogin is true.
 *
 * @returns {Promise<Object|null>} User object or null on error
 *
 * @example
 * const user = await getCurrentUser();
 * if (user) dispatch({ type: 'SET_USER', payload: user });
 */
export async function getCurrentUser() {

    if (getConstants().noLogin == true) {
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

/**
 * Check if the current user has an active subscription.
 *
 * Calls GET /isSubscriber with credentials.
 * Returns false if constants.noLogin is true.
 *
 * @returns {Promise<boolean>} True if user is an active subscriber
 */
export async function isSubscriber() {
    if (getConstants().noLogin == true) {
        return false
    }

    try{
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

/**
 * Log an analytics event. Stub for custom analytics integration.
 *
 * @param {string} event - Event name to log
 * @returns {Promise<void>}
 */
export async function logEvent(event) {
    //insert analytics code here
}

/**
 * Open the Stripe billing portal for subscription management.
 *
 * Saves the current URL for redirect-back after portal return,
 * then redirects the browser to the Stripe portal URL.
 *
 * @param {string} stripeID - Stripe customer ID
 * @returns {Promise<void>}
 */
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
            if (data.url) {
                safeSetItem(getAppKey("beforeManageURL"), window.location.href);
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

/**
 * Start a Stripe checkout session.
 *
 * Creates a checkout session via POST /checkout, saves the current URL
 * for redirect-back, then redirects to the Stripe checkout page.
 *
 * @param {string} email - Customer email for Stripe
 * @param {number} [productIndex=0] - Index into constants.stripeProducts
 * @returns {Promise<boolean>} True if redirect initiated, false on error
 */
export async function showCheckout(email, productIndex = 0) {
    try {
        const csrfToken = getCSRFToken();

        const params = {
            lookup_key: getConstants().stripeProducts[productIndex].lookup_key,
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
                safeSetItem(getAppKey("beforeCheckoutURL"), window.location.href);
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

/**
 * Check remaining usage quota for a given action.
 *
 * Calls POST /usage with operation "check".
 * Returns unlimited usage (-1) if constants.noLogin is true.
 *
 * @param {string} action - Action type to check usage for
 * @returns {Promise<{remaining: number, total: number, isSubscriber: boolean}>}
 */
export async function getRemainingUsage(action) {
    if (getConstants().noLogin === true) {
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

/**
 * Track (decrement) usage for a given action.
 *
 * Calls POST /usage with operation "track".
 * Returns unlimited usage (-1) if constants.noLogin is true.
 * Returns usage data even when rate limited (HTTP 429).
 *
 * @param {string} action - Action type to track
 * @returns {Promise<{remaining: number, total: number, isSubscriber: boolean}>}
 */
export async function trackUsage(action) {
    if (getConstants().noLogin === true) {
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

/**
 * Show the upgrade sheet if the user is not a subscriber.
 *
 * Checks subscription status from localStorage user data.
 * Does nothing for active subscribers. Falls back to navigation
 * if the ref is unavailable.
 *
 * @param {React.RefObject} upgradeSheetRef - Ref to UpgradeSheet component
 * @returns {Promise<void>}
 */
export async function showUpgradeSheet(upgradeSheetRef) {
    // Check subscription from user data in localStorage instead of API call
    const appName = getConstants().appName || 'skateboard';
    const storageKey = `${appName.toLowerCase().replace(/\s+/g, '-')}_user`;
    const storedUser = safeGetItem(storageKey);

    let subscriber = false;
    if (storedUser && storedUser !== "undefined") {
        try {
            const user = JSON.parse(storedUser);
            subscriber = user?.subscription?.status === 'active' &&
                (!user?.subscription?.expires || user?.subscription?.expires > Math.floor(Date.now() / 1000));
        } catch (error) {
            console.error('Error parsing user data from storage:', error.message);
            subscriber = false;
        }
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

/**
 * Convert a timestamp or Date to a formatted string.
 *
 * Handles both seconds and milliseconds timestamps, and Date objects.
 *
 * @param {number|Date} input - Unix timestamp (seconds or ms) or Date
 * @param {string} [format="DOB"] - Format: "DOB" | "ISO" | "ago" | "day-month-time" | "day" | "time" | "full" | "DOBT"
 * @returns {string} Formatted date string
 *
 * @example
 * timestampToString(1700000000, 'ago')    // "2 months ago"
 * timestampToString(Date.now(), 'DOBT')   // "3:45 PM"
 * timestampToString(new Date(), 'full')   // "Monday, November 13 2023 10:00 AM"
 */
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
            return input;
    }
}

/**
 * Hook that sets the document title and removes dark mode on non-app pages.
 *
 * @param {Object} location - react-router location object
 */
export function useAppSetup(location) {
    useEffect(() => {
        document.title = getConstants().appName;
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

    // Set up timeout (default 30 seconds)
    const timeout = options.timeout || 30000;
    const controller = options.signal ? null : new AbortController();
    const signal = options.signal || controller?.signal;
    const timeoutId = controller ? setTimeout(() => controller.abort(), timeout) : null;

    let response;
    try {
        response = await fetch(`${getBackendURL()}${endpoint}`, {
            ...options,
            credentials: 'include',
            signal,
            headers: {
                'Content-Type': 'application/json',
                ...(needsCSRF && csrfToken && { 'X-CSRF-Token': csrfToken }),
                ...options.headers
            }
        });
    } catch (error) {
        if (error.name === 'AbortError') {
            throw error; // Re-throw abort errors for useListData to handle
        }
        throw new Error(`Network error: ${error.message}`);
    } finally {
        if (timeoutId) clearTimeout(timeoutId);
    }

    // Handle 401 (redirect to signout, unless authOverlay mode)
    if (response.status === 401) {
        if (getConstants().authOverlay !== true) {
            window.location.href = '/signout';
        }
        throw new Error('Unauthorized');
    }

    // Handle 403 CSRF token failures with auto-retry
    if (response.status === 403) {
        const errorBody = await response.json().catch(() => ({}));

        // If CSRF-related error, try to refresh session and retry once
        if (errorBody.error && errorBody.error.includes('CSRF')) {
            console.warn('CSRF token validation failed, attempting recovery...');

            // Fetch fresh user data (triggers CSRF token regeneration on backend)
            try {
                await fetch(`${getBackendURL()}/me`, {
                    credentials: 'include'
                });

                // Retry original request with fresh token
                const newCsrfToken = getCSRFToken();
                return fetch(`${getBackendURL()}${endpoint}`, {
                    ...options,
                    credentials: 'include',
                    signal,
                    headers: {
                        'Content-Type': 'application/json',
                        ...(needsCSRF && newCsrfToken && { 'X-CSRF-Token': newCsrfToken }),
                        ...options.headers
                    }
                }).then(retryResponse => {
                    if (!retryResponse.ok) {
                        throw new Error(`Retry failed: ${retryResponse.status} ${retryResponse.statusText}`);
                    }
                    return retryResponse.json();
                });
            } catch (retryError) {
                console.error('CSRF recovery failed:', retryError);
                throw new Error('CSRF validation failed - please refresh the page');
            }
        }

        throw new Error(`Forbidden: ${errorBody.error || response.statusText}`);
    }

    // Handle other errors
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    // Parse JSON with error handling
    try {
        return await response.json();
    } catch (error) {
        throw new Error(`Invalid JSON response from server: ${error.message}`);
    }
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
 * Validate constants.json has all required fields with proper values
 * @param {object} constants - Constants object to validate
 * @returns {object} - Same constants if valid
 * @throws {Error} - If required fields are missing or invalid
 */
export function validateConstants(constants) {
    const required = [
        { key: 'appName', type: 'string' },
        { key: 'appIcon', type: 'string' },
        { key: 'tagline', type: 'string' },
        { key: 'cta', type: 'string' },
        { key: 'backendURL', type: 'string' },
        { key: 'devBackendURL', type: 'string' },
        { key: 'features.title', type: 'string' },
        { key: 'features.items', type: 'array' },
        { key: 'companyName', type: 'string' },
        { key: 'companyWebsite', type: 'string' },
        { key: 'companyEmail', type: 'string' },
    ];

    const errors = required.filter(({ key, type }) => {
        const value = key.split('.').reduce((obj, k) => obj?.[k], constants);

        if (type === 'string') {
            // Must be non-empty string
            return !value || typeof value !== 'string' || value.trim().length === 0;
        } else if (type === 'array') {
            // Must be non-empty array
            return !Array.isArray(value) || value.length === 0;
        }
        return !value;
    }).map(({ key }) => key);

    if (errors.length > 0) {
        throw new Error(`Invalid constants configuration: ${errors.join(', ')} (must be non-empty strings/arrays)`);
    }

    return constants;
}


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

    const fetchData = async (signal) => {
        setLoading(true);
        try {
            const result = await apiRequest(endpoint, { signal });
            const sorted = sortFn ? result.sort(sortFn) : result;
            setData(sorted);
            setError(null);
        } catch (err) {
            // Ignore abort errors
            if (err.name === 'AbortError') return;
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchData(controller.signal);
        return () => controller.abort();
    }, [endpoint, sortFn]);

    return { data, loading, error, refetch: () => fetchData() };
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


// ===== UI VISIBILITY CONTROLS =====

/**
 * Programmatically show/hide the sidebar
 * @param {boolean} visible - Whether sidebar should be visible
 */
export function setSidebarVisible(visible) {
    const dispatch = getDispatch();
    if (dispatch) {
        dispatch({ type: 'SET_SIDEBAR_VISIBLE', payload: visible });
    } else {
        console.warn('setSidebarVisible: Context not initialized');
    }
}

/**
 * Programmatically show/hide the tab bar
 * @param {boolean} visible - Whether tab bar should be visible
 */
export function setTabBarVisible(visible) {
    const dispatch = getDispatch();
    if (dispatch) {
        dispatch({ type: 'SET_TABBAR_VISIBLE', payload: visible });
    } else {
        console.warn('setTabBarVisible: Context not initialized');
    }
}

/**
 * Show the sidebar
 */
export function showSidebar() {
    setSidebarVisible(true);
}

/**
 * Hide the sidebar
 */
export function hideSidebar() {
    setSidebarVisible(false);
}

/**
 * Show the tab bar
 */
export function showTabBar() {
    setTabBarVisible(true);
}

/**
 * Hide the tab bar
 */
export function hideTabBar() {
    setTabBarVisible(false);
}

/**
 * Set visibility for both sidebar and tab bar at once
 * @param {object} options - { sidebar: boolean, tabBar: boolean }
 */
export function setUIVisibility({ sidebar, tabBar }) {
    const dispatch = getDispatch();
    if (dispatch) {
        const payload = {};
        if (sidebar !== undefined) payload.sidebarVisible = sidebar;
        if (tabBar !== undefined) payload.tabBarVisible = tabBar;
        dispatch({ type: 'SET_UI_VISIBILITY', payload });
    } else {
        console.warn('setUIVisibility: Context not initialized');
    }
}
