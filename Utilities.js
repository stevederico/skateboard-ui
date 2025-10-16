import { useEffect, useState } from 'react';

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

export function initializeUtilities(constants) {
    if (!constants) {
        console.error('[Utilities] initializeUtilities called with null/undefined constants!');
        throw new Error('initializeUtilities called with null/undefined constants');
    }
    console.log('[Utilities] Initializing with app:', constants.appName);
    // Store in both module and window to handle module duplication
    _constants = constants;
    if (typeof window !== 'undefined') {
        window.__SKATEBOARD_CONSTANTS__ = constants;
    }
    console.log('[Utilities] Initialization complete. _constants set:', !!_constants);
}

function getConstants() {
    // Check window object first (handles module duplication)
    if (typeof window !== 'undefined' && window.__SKATEBOARD_CONSTANTS__) {
        return window.__SKATEBOARD_CONSTANTS__;
    }

    if (!_constants) {
        console.error('[Utilities] getConstants called but _constants is null!');
        console.trace('[Utilities] Call stack:');
        throw new Error('Utilities not initialized. Call initializeUtilities(constants) first.');
    }
    return _constants;
}

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

export function getCSRFToken() {
    const appName = getConstants().appName || 'skateboard';
    const csrfKey = `${appName.toLowerCase().replace(/\s+/g, '-')}_csrf`;
    return safeGetItem(csrfKey);
}

export function getAppKey(suffix) {
    const appName = getConstants().appName || 'skateboard';
    return `${appName.toLowerCase().replace(/\s+/g, '-')}_${suffix}`;
}

export function isAuthenticated() {
    if (getConstants().noLogin === true) {
        return true;
    }
    const csrfKey = getAppKey('csrf');
    return Boolean(safeGetItem(csrfKey));
}

export function getBackendURL() {
    let result = import.meta.env.DEV ? getConstants().devBackendURL : getConstants().backendURL;
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

// Usage Limits Configuration
const FREE_LIMITS = {
    todos: 3,
    messages: 10
};

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

    let response;
    try {
        response = await fetch(`${getBackendURL()}${endpoint}`, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(needsCSRF && csrfToken && { 'X-CSRF-Token': csrfToken }),
                ...options.headers
            }
        });
    } catch (error) {
        throw new Error(`Network error: ${error.message}`);
    }

    // Handle 401 (redirect to signout)
    if (response.status === 401) {
        window.location.href = '/signout';
        throw new Error('Unauthorized - Redirecting to Sign Out');
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


