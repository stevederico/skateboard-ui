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


