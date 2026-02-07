# skateboard-ui

React component library for rapid application development. Built with TailwindCSS v4 and shadcn/ui.

## Installation

```bash
# npm
npm install @stevederico/skateboard-ui

# deno
deno install npm:@stevederico/skateboard-ui
```

## Quick Start

```javascript
import './assets/styles.css';
import { createSkateboardApp } from '@stevederico/skateboard-ui/App';
import constants from './constants.json';
import HomeView from './components/HomeView.jsx';

const appRoutes = [
  { path: 'home', element: <HomeView /> }
];

createSkateboardApp({ constants, appRoutes });
```

That's it! You get routing, auth, layout, landing page, settings, and payments.

## Dark Mode Setup

To prevent flash of unstyled content (FOUC) when using dark mode, add this script to your `index.html` **before** your app loads:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Prevent dark mode FOUC -->
  <script>
    try {
      const theme = localStorage.getItem('theme');
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (theme === 'dark' || (!theme && systemDark)) {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  </script>

  <title>Your App</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

This ensures the correct theme is applied before React renders, eliminating any flash between light and dark modes.

## Configuration

skateboard-ui requires a `constants` object that configures your application:

```javascript
// constants.json or constants.js
const constants = {
  // Required: Backend URLs (include /api prefix)
  devBackendURL: "http://localhost:8000/api",
  backendURL: "https://api.myapp.com/api",

  // Required: App identity
  appName: "MyApp",
  appIcon: "sparkles",  // Lucide icon name

  // Required: Landing page content
  tagline: "Build apps faster with skateboard-ui",
  cta: "Get Started",

  // Required: Features section
  features: {
    title: "Everything you need",
    items: [
      { icon: "Zap", title: "Fast", description: "Built for speed" },
      { icon: "Shield", title: "Secure", description: "Authentication included" }
    ]
  },

  // Required: Company information
  companyName: "Your Company",
  companyWebsite: "https://yourcompany.com",
  companyEmail: "hello@yourcompany.com",

  // Optional: Navigation pages (sidebar + tabbar)
  pages: [
    { title: "Home", icon: "home", url: "home" },
    { title: "Search", icon: "search", url: "search" }
  ],

  // Optional: Authentication
  noLogin: false,      // Set true to disable authentication entirely
  authOverlay: false,  // Set true to allow unauthenticated /app access (use with useAuthGate)

  // Optional: UI visibility
  hideSidebar: false,
  hideTabBar: false,
  hideSidebarHeader: false,

  // Optional: Payments (Stripe)
  stripeProducts: [
    {
      name: "Pro Plan",
      priceId: "price_123",
      price: "$10/month",
      lookup_key: "pro_plan",
      title: "Go Pro",
      interval: "month",
      features: ["Unlimited usage", "Priority support", "Advanced features"]
    }
  ],

  // Optional: Landing page customization
  navLinks: [                                    // Override header nav links
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "/blog" }
  ],
  pricing: {
    title: "Simple Pricing",                     // Pricing section heading
    extras: ["Priority Customer Support", "Cancel anytime"]  // Extra bullets after product features
  },
  ctaHeading: "Ready To Build?",                 // CTA section heading
  footerLinks: [                                 // Override footer links
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "EULA", href: "/eula" }
  ],
  copyrightText: "All rights reserved.",         // Copyright suffix after "© {year} {companyName}."

  // Optional: Legal documents (plain text, supports _COMPANY_, _WEBSITE_, _EMAIL_ placeholders)
  termsOfService: "Terms of Service for _COMPANY_...",
  privacyPolicy: "Privacy Policy for _COMPANY_...",
  EULA: "End User License Agreement...",
  subscriptionDetails: "Subscription details...",

  // Optional: App metadata
  version: "1.0.0"
}
```

### Backend URL Pattern

The `devBackendURL` and `backendURL` should include your full API base path (including the `/api` prefix):

```javascript
const constants = {
  devBackendURL: "http://localhost:8000/api",  // Include /api prefix
  backendURL: "https://api.myapp.com/api",
}
```

Endpoints are relative to this base URL:
- `${getBackendURL()}/signup` → `http://localhost:8000/api/signup`
- `${getBackendURL()}/me` → `http://localhost:8000/api/me`
- `${getBackendURL()}/deals` → `http://localhost:8000/api/deals`

**Tip:** Include API versioning in the base URL (e.g., `/api/v2`) rather than in each endpoint path.

## createSkateboardApp

The bootstrap function that sets up routing, auth, theming, state, toasts, and error handling.

```javascript
import { createSkateboardApp } from '@stevederico/skateboard-ui/App';

createSkateboardApp({
  constants,       // Required: App configuration object
  appRoutes,       // Required: [{ path: string, element: JSX.Element }]
  defaultRoute,    // Optional: Default route path (defaults to first appRoute path)
  landingPage,     // Optional: Custom landing page JSX element
  wrapper,         // Optional: React component to wrap the router (e.g., for providers)
});
```

### What It Sets Up

- **Routes:** Landing, signin, signup, signout, app routes, settings, payment, legal pages (terms, privacy, EULA, subscription)
- **Authentication:** ProtectedRoute wrapping `/app/*`, AuthOverlay for lazy auth
- **Theming:** next-themes ThemeProvider with system theme support
- **State:** ContextProvider with user, UI, and auth overlay state
- **Toasts:** Sonner Toaster (top-right, rich colors, close button)
- **Error Boundary:** Catches render errors, unhandled rejections, and global errors

### Generated Routes

| Route | Component | Protected |
|-------|-----------|-----------|
| `/` | LandingView (or custom `landingPage`) | No |
| `/signin` | SignInView | No |
| `/signup` | SignUpView | No |
| `/signout` | SignOutView | No |
| `/app/:path` | Your appRoutes | Yes |
| `/app/settings` | SettingsView | Yes |
| `/app/payment` | PaymentView | Yes |
| `/terms` | TextView | No |
| `/privacy` | TextView | No |
| `/eula` | TextView | No |
| `/subscription` | TextView | No |
| `*` | NotFound | No |

## Authentication

### Overview

skateboard-ui uses a **hybrid cookie + localStorage authentication system** that combines security with performance:

```
  Frontend                    Backend                   Storage
  ────────                    ───────                   ───────

1. POST /signin           →  Validate credentials
   credentials
                          ←  Set-Cookie: {appName}_token (HttpOnly)
                          ←  Set-Cookie: csrf_token
                          ←  Response: { csrfToken, ...user }

2. Extract tokens         →                          localStorage:
   - CSRF from cookie                                  {appName}_csrf
   - User from response                                {appName}_user

3. isAuthenticated()      →                          Check localStorage
   (client-side)                                      (fast, no network)

4. ProtectedRoute         →  GET /me
   (server validation)       Validate cookies
                          ←  200 OK or 401 Unauthorized

5. API requests           →  Protected endpoints
   + cookies (automatic)     Validate {appName}_token
   + X-CSRF-Token header     Validate CSRF header
```

### Cookie-Based Session Management
- **Session token** stored in `{appName}_token` cookie (HttpOnly, Secure, SameSite=Strict)
- Automatically sent with every request via browser
- Cannot be accessed by JavaScript (XSS protection)
- Backend validates cookie on each protected endpoint

### localStorage for Client-Side Validation
- **CSRF token** and **user data** stored in localStorage
- Enables instant `isAuthenticated()` checks without network calls
- Used by client-side routing logic (ProtectedRoute initial check)
- Not used for actual authentication (cookies handle that)

### CSRF Protection
- Dual-token system prevents CSRF attacks
- **CSRF token** sent in `X-CSRF-Token` header with state-changing requests
- Backend validates header matches stored session CSRF token
- Separate from session cookie to prevent cookie-based CSRF

### CSRF Error Handling

The `apiRequest` utility automatically handles CSRF token failures:

1. **Auto-Regeneration**: Backend auto-regenerates tokens after server restart
2. **Retry Logic**: Frontend automatically retries failed requests once after refreshing the session
3. **User Experience**: Transparent recovery without forcing sign-out or page refresh

**Error Flow**:
```
POST /api/keys → 403 CSRF error
    ↓
Fetch /me (triggers backend auto-regeneration)
    ↓
Retry POST /api/keys with fresh token
    ↓
Success
```

### Required Backend Endpoints

#### POST /signup
Create new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response:**
- Status: 201 Created
- Headers:
  - `Set-Cookie: {appName}_token={sessionToken}; HttpOnly; Secure; SameSite=Strict; Path=/`
  - `Set-Cookie: csrf_token={csrfToken}; Secure; SameSite=Lax; Path=/`
- Body:
```json
{
  "csrfToken": "csrf_abc123...",
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST /signin
Authenticate existing user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
- Status: 200 OK
- Headers: Same as /signup
- Body: Same as /signup

#### GET /me
Validate current session and return user data.

**Request:**
- Headers: Cookies automatically sent by browser

**Response (authenticated):**
- Status: 200 OK
- Body:
```json
{
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "name": "John Doe",
    "subscription": {
      "status": "active",
      "expires": 1735689600,
      "stripeID": "cus_abc123"
    }
  }
}
```

**Response (not authenticated):**
- Status: 401 Unauthorized

#### POST /signout
End current session.

**Request:**
- Headers:
  - Cookies automatically sent
  - `X-CSRF-Token: {csrfToken}`

**Response:**
- Status: 200 OK
- Headers:
  - `Set-Cookie: {appName}_token=; Max-Age=0; Path=/` (clear cookie)
  - `Set-Cookie: csrf_token=; Max-Age=0; Path=/` (clear cookie)

### Optional Backend Endpoints

#### POST /usage
Track and check feature usage limits.

**Request:**
```json
{ "operation": "check" }
```
or
```json
{ "operation": "track" }
```

**Response:**
```json
{ "remaining": 15, "total": 20, "isSubscriber": false }
```

#### GET /isSubscriber
Check subscription status.

**Response:**
```json
{ "isSubscriber": true }
```

#### POST /checkout (Stripe)
Create a Stripe checkout session.

**Request:**
```json
{ "lookup_key": "pro_plan", "email": "user@example.com" }
```

**Response:**
```json
{ "url": "https://checkout.stripe.com/..." }
```

#### POST /portal (Stripe)
Open Stripe billing portal.

**Request:**
```json
{ "customerID": "cus_abc123" }
```

**Response:**
```json
{ "url": "https://billing.stripe.com/..." }
```

### Cookie Configuration

**Session Token Cookie:**
```javascript
{
  name: '{appName}_token',
  httpOnly: true,      // Prevents JavaScript access (XSS protection)
  secure: true,        // HTTPS only (production)
  sameSite: 'Strict',  // Strongest CSRF protection
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days (configurable)
}
```

**CSRF Token Cookie:**
```javascript
{
  name: 'csrf_token',
  httpOnly: false,     // Must be readable by JavaScript
  secure: true,        // HTTPS only (production)
  sameSite: 'Lax',     // Allow top-level navigation
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000  // Match session token
}
```

### Protected Endpoints
All authenticated endpoints must:
1. Validate `{appName}_token` cookie exists and is valid
2. For state-changing operations (POST, PUT, DELETE), validate `X-CSRF-Token` header
3. Return 401 if authentication fails
4. Return 403 if CSRF validation fails

### Security Considerations

- **XSS Protection**: Session token is HttpOnly — JavaScript cannot access it
- **CSRF Protection**: Dual-token pattern prevents cookie-based CSRF attacks
- **SameSite Policy**: Session token (Strict), CSRF token (Lax)
- **HTTPS Requirement**: All cookies marked `Secure` in production
- **localStorage Trade-offs**: Acceptable for CSRF token (cannot authenticate alone), never store session token

### Example Backend Implementation (Express.js)

```javascript
import express from 'express';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';

const app = express();
app.use(express.json());
app.use(cookieParser());

// In-memory session store (use Redis in production)
const sessions = new Map();

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function requireAuth(req, res, next) {
  const sessionToken = req.cookies.myapp_token;
  const session = sessions.get(sessionToken);
  if (!session) return res.status(401).json({ error: 'Not authenticated' });
  req.session = session;
  next();
}

function requireCSRF(req, res, next) {
  const csrfToken = req.headers['x-csrf-token'];
  if (!req.session || req.session.csrfToken !== csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next();
}

app.post('/api/signup', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const user = await createUser(email, password, name);
  const sessionToken = generateToken();
  const csrfToken = generateToken();

  sessions.set(sessionToken, { userId: user.id, csrfToken, createdAt: Date.now() });

  res.cookie('myapp_token', sessionToken, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000
  });
  res.cookie('csrf_token', csrfToken, {
    httpOnly: false, secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(201).json({ csrfToken, user: { id: user.id, email: user.email, name: user.name } });
});

app.get('/api/me', requireAuth, async (req, res) => {
  const user = await getUserById(req.session.userId);
  res.json({ user: { id: user.id, email: user.email, name: user.name } });
});

app.post('/api/signout', requireAuth, requireCSRF, (req, res) => {
  sessions.delete(req.cookies.myapp_token);
  res.clearCookie('myapp_token');
  res.clearCookie('csrf_token');
  res.json({ message: 'Signed out successfully' });
});
```

### Auth Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| "Not authenticated" after signin | Cookies not sent | Verify `credentials: 'include'` in fetch calls |
| CSRF 403 errors | Token mismatch | Check `X-CSRF-Token` header, verify cookie exists |
| Cookies not persisting | SameSite/Secure flags | Set `secure: false` in dev, check domain match |
| `isAuthenticated()` false but cookie exists | localStorage cleared | Re-fetch from `/me` endpoint |

### No-Login Mode

```javascript
const constants = { noLogin: true };
```

Effects: `isAuthenticated()` always returns `true`, ProtectedRoute allows all access.

## Components

### Core Components

| Component | Import | Description |
|-----------|--------|-------------|
| Sidebar | `@stevederico/skateboard-ui/Sidebar` | Desktop navigation sidebar with collapsible icon mode |
| Header | `@stevederico/skateboard-ui/Header` | App header with title and action button |
| Layout | `@stevederico/skateboard-ui/Layout` | Page layout with sidebar (desktop) and tabbar (mobile) |
| TabBar | `@stevederico/skateboard-ui/TabBar` | Mobile bottom navigation with labels |
| DynamicIcon | `@stevederico/skateboard-ui/DynamicIcon` | Lucide icon by name string |
| ThemeToggle | `@stevederico/skateboard-ui/ThemeToggle` | Dark/light mode toggle button |
| Sheet | `@stevederico/skateboard-ui/Sheet` | Slide-out panel |
| UpgradeSheet | `@stevederico/skateboard-ui/UpgradeSheet` | Premium upgrade drawer |
| ErrorBoundary | `@stevederico/skateboard-ui/ErrorBoundary` | Error boundary wrapper |

### View Components

| Component | Import | Description |
|-----------|--------|-------------|
| LandingView | `@stevederico/skateboard-ui/LandingView` | Landing page with hero, features, pricing |
| LandingViewSimple | `@stevederico/skateboard-ui/LandingViewSimple` | Minimal landing page |
| SignInView | `@stevederico/skateboard-ui/SignInView` | Sign in form with Card layout |
| SignUpView | `@stevederico/skateboard-ui/SignUpView` | Sign up form with password validation |
| SignOutView | `@stevederico/skateboard-ui/SignOutView` | Sign out handler with redirect |
| SettingsView | `@stevederico/skateboard-ui/SettingsView` | User settings, billing, theme |
| PaymentView | `@stevederico/skateboard-ui/PaymentView` | Stripe payment redirect handler |
| TextView | `@stevederico/skateboard-ui/TextView` | Legal document viewer with placeholder replacement |
| NotFound | `@stevederico/skateboard-ui/NotFound` | 404 page |

### Auth Components

| Export | Import | Description |
|--------|--------|-------------|
| AuthOverlay | `@stevederico/skateboard-ui/AuthOverlay` | Modal sign-in/sign-up dialog |
| useAuthGate | `@stevederico/skateboard-ui/useAuthGate` | Hook to gate actions behind auth |

### State & Utilities

| Export | Import | Description |
|--------|--------|-------------|
| Context | `@stevederico/skateboard-ui/Context` | App state provider and accessor |
| Utilities | `@stevederico/skateboard-ui/Utilities` | API, auth, formatting, and UI utilities |
| App | `@stevederico/skateboard-ui/App` | createSkateboardApp bootstrap function |
| ProtectedRoute | `@stevederico/skateboard-ui/ProtectedRoute` | Route guard with server validation |

## Component Details

### Sidebar

Desktop navigation sidebar with collapsible icon mode, user dropdown, and settings link.

```javascript
import Sidebar from '@stevederico/skateboard-ui/Sidebar';

// Used internally by Layout. Renders automatically based on constants.
```

**Reads from constants:**
- `pages` — Navigation items rendered as sidebar menu buttons
- `appName` — Displayed in sidebar header
- `appIcon` — Icon in sidebar header
- `hideSidebarHeader` — Hides the header when `true`

**Features:**
- Collapsible to icon-only mode via rail
- Active page highlighting based on current route
- Tooltip labels when collapsed
- Footer with Settings button and user dropdown (account, billing, notifications, sign out)

### Header

```javascript
import Header from '@stevederico/skateboard-ui/Header';

<Header
  title="Dashboard"
  buttonTitle="Add"
  onButtonTitleClick={() => console.log('clicked')}
  buttonClass="bg-app text-white"
  className="sticky top-0"
>
  {/* Optional: custom right-side content */}
</Header>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | required | Header title |
| buttonTitle | string | — | Action button text (omit to hide) |
| onButtonTitleClick | function | — | Button click handler |
| buttonClass | string | — | Additional button CSS classes |
| className | string | — | Additional header CSS classes |
| children | ReactNode | — | Custom right-side content |

### DynamicIcon

Renders a Lucide icon by name string. Accepts kebab-case, snake_case, or PascalCase.

```javascript
import DynamicIcon from '@stevederico/skateboard-ui/DynamicIcon';

<DynamicIcon name="home" size={24} />
<DynamicIcon name="arrow-right" size={20} color="red" />
<DynamicIcon name="settings" className="text-muted-foreground" />
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | string | required | Icon name (e.g. "home", "arrow-right", "Settings") |
| size | number | 24 | Icon size in pixels |
| color | string | 'currentColor' | Stroke color |
| strokeWidth | number | 2 | Stroke width |
| className | string | — | Additional CSS classes |

Icons from [lucide-react](https://lucide.dev/icons/). Returns null if icon name not found.

### ThemeToggle

```javascript
import ThemeToggle from '@stevederico/skateboard-ui/ThemeToggle';

<ThemeToggle />
<ThemeToggle variant="landing" iconSize={18} />
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | "" | Additional CSS classes |
| iconSize | number | 16 | Icon size in pixels |
| variant | string | "settings" | "settings" (ghost) or "landing" (outline) |

### TabBar

Mobile bottom navigation bar. Hidden on `md+` screens. Renders pages from `constants.pages` plus a Settings link.

```javascript
import TabBar from '@stevederico/skateboard-ui/TabBar';

// Used internally by Layout. Renders automatically.
```

**Features:**
- Fixed bottom position on mobile
- Active page highlighting with bold stroke
- Text labels under each icon
- Settings link appended automatically

### UpgradeSheet

Drawer component for premium upgrade prompts. Controlled via ref.

```javascript
import { useRef } from 'react';
import UpgradeSheet from '@stevederico/skateboard-ui/UpgradeSheet';
import { showUpgradeSheet } from '@stevederico/skateboard-ui/Utilities';

function MyComponent() {
  const upgradeRef = useRef();

  return (
    <>
      <button onClick={() => showUpgradeSheet(upgradeRef)}>
        Upgrade
      </button>
      <UpgradeSheet ref={upgradeRef} userEmail={user.email} />
    </>
  );
}
```

**Ref Methods:** `show()`, `open()`, `hide()`, `close()`, `toggle()`

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| userEmail | string | User's email for Stripe checkout |

**Reads from constants:** `stripeProducts[0]` (title, price, features)

### TextView

Renders legal documents with placeholder replacement.

```javascript
import TextView from '@stevederico/skateboard-ui/TextView';

<TextView details={constants.termsOfService} />
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| details | string | Text content with optional placeholders |
| className | string | Additional CSS classes |

**Placeholders:** `_COMPANY_` → companyName, `_WEBSITE_` → companyWebsite, `_EMAIL_` → companyEmail

### ErrorBoundary

Catches render errors, unhandled promise rejections, and global errors. Shows an error card with retry options.

```javascript
import ErrorBoundary from '@stevederico/skateboard-ui/ErrorBoundary';

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## Context (State Management)

```javascript
import { getState } from '@stevederico/skateboard-ui/Context';

function MyComponent() {
  const { state, dispatch } = getState();

  // Access state
  const user = state.user;
  const constants = state.constants;

  // Dispatch actions
  dispatch({ type: 'SET_USER', payload: userData });
  dispatch({ type: 'CLEAR_USER' });
}
```

### State Shape

```javascript
{
  user: {
    id: string,
    email: string,
    name: string,
    subscription: {
      status: 'active' | 'canceled' | null,
      expires: number,      // Unix timestamp (seconds)
      stripeID: string
    }
  } | null,

  ui: {
    sidebarVisible: boolean,
    tabBarVisible: boolean
  },

  authOverlay: {
    visible: boolean,
    pendingCallback: Function | null
  },

  constants: Object  // App configuration
}
```

### Available Actions

| Action | Payload | Description |
|--------|---------|-------------|
| `SET_USER` | user object | Set authenticated user |
| `CLEAR_USER` | — | Clear user (logout) |
| `SET_SIDEBAR_VISIBLE` | boolean | Show/hide sidebar |
| `SET_TABBAR_VISIBLE` | boolean | Show/hide tab bar |
| `SET_UI_VISIBILITY` | `{ sidebar?, tabBar? }` | Batch update UI visibility |
| `SHOW_AUTH_OVERLAY` | callback or null | Show auth dialog, optionally queue callback |
| `HIDE_AUTH_OVERLAY` | — | Hide auth dialog |
| `AUTH_OVERLAY_SUCCESS` | — | Auth success, run pending callback and close |

### localStorage Keys

All keys are namespaced with `{appName}_`:

| Key | Description |
|-----|-------------|
| `{appName}_user` | Persisted user object |
| `{appName}_csrf` | CSRF token (fallback, primary is cookie) |
| `{appName}_beforeCheckoutURL` | Redirect URL after Stripe checkout |
| `{appName}_beforeManageURL` | Redirect URL after Stripe portal |

## Utilities

```javascript
import {
  apiRequest,
  apiRequestWithParams,
  isAuthenticated,
  getCurrentUser,
  isSubscriber,
  getCSRFToken,
  getBackendURL,
  getAppKey,
  getConstants,
  getRemainingUsage,
  trackUsage,
  showCheckout,
  showManage,
  showUpgradeSheet,
  showSidebar,
  hideSidebar,
  showTabBar,
  hideTabBar,
  setSidebarVisible,
  setTabBarVisible,
  setUIVisibility,
  timestampToString,
  useListData,
  useForm,
  useAppSetup,
  isAppMode,
  validateConstants,
} from '@stevederico/skateboard-ui/Utilities';
```

### API Requests

```javascript
// GET
const data = await apiRequest('/deals');

// POST
const newDeal = await apiRequest('/deals', {
  method: 'POST',
  body: JSON.stringify({ name: 'New Deal', amount: 5000 })
});

// GET with query params
const filtered = await apiRequestWithParams('/deals', { status: 'active', limit: 10 });
```

**Features:**
- Auto-includes credentials (cookies)
- Auto-adds `X-CSRF-Token` header for POST, PUT, DELETE, PATCH
- Auto-redirects to `/signout` on 401 (unless authOverlay mode)
- Auto-retries once on CSRF 403 failure

### Auth Utilities

```javascript
// Client-side check (fast, no network)
if (isAuthenticated()) {
  const user = getCurrentUser();
}

// Server-side validation
const user = await getCurrentUser();  // Calls GET /me

// Check subscription
const subscribed = await isSubscriber();  // Calls GET /isSubscriber

// Get CSRF token (from cookie, falls back to localStorage)
const token = getCSRFToken();

// Get backend URL (devBackendURL in dev, backendURL in production)
const url = getBackendURL();

// Generate app-namespaced localStorage key
const key = getAppKey('user');  // → "{appName}_user"
```

### Usage Tracking

```javascript
// Check remaining usage for an action
const usage = await getRemainingUsage('messages');
// { remaining: 15, total: 20, isSubscriber: false }

// Track usage (decrements remaining)
const updated = await trackUsage('messages');
```

### Stripe Payments

```javascript
// Redirect to Stripe checkout
showCheckout('user@example.com', 0);  // productIndex defaults to 0

// Open Stripe billing portal
showManage('cus_abc123');

// Show upgrade sheet if not subscriber
showUpgradeSheet(upgradeSheetRef);
```

### Data Fetching Hook

```javascript
import { useListData } from '@stevederico/skateboard-ui/Utilities';

function DealsList() {
  const { data, loading, error, refetch } = useListData('/deals');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return data.map(deal => <DealCard key={deal.id} {...deal} />);
}

// With custom sort
const { data } = useListData('/deals', (a, b) => b.amount - a.amount);
```

### Form Hook

```javascript
import { useForm } from '@stevederico/skateboard-ui/Utilities';

function ContactForm() {
  const { values, handleChange, handleSubmit, reset, submitting, error } = useForm(
    { name: '', email: '', message: '' },
    async (formValues) => {
      await apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify(formValues)
      });
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={values.name} onChange={handleChange} />
      <input name="email" value={values.email} onChange={handleChange} />
      <textarea name="message" value={values.message} onChange={handleChange} />
      <button type="submit" disabled={submitting}>Send</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

### Timestamp Formatting

```javascript
import { timestampToString } from '@stevederico/skateboard-ui/Utilities';

timestampToString(1706000000, 'ago');           // "2 hours ago"
timestampToString(1706000000, 'DOB');           // "Jan 23, 2024"
timestampToString(1706000000, 'DOBT');          // "Jan 23, 2024 3:00 PM"
timestampToString(1706000000, 'ISO');           // "2024-01-23"
timestampToString(1706000000, 'day-month-time');// "23 Jan 3:00 PM"
timestampToString(1706000000, 'day');           // "Monday"
timestampToString(1706000000, 'time');          // "3:00 PM"
timestampToString(1706000000, 'full');          // "Monday, Jan 23, 2024 3:00 PM"
```

### UI Visibility Control

```javascript
// Programmatic control
hideSidebar();
showSidebar();
hideTabBar();
showTabBar();

// Set directly
setSidebarVisible(false);
setTabBarVisible(true);

// Batch control
setUIVisibility({ sidebar: false, tabBar: false });
```

### Other Utilities

```javascript
// Check if running inside native WebKit wrapper (iOS/macOS app)
if (isAppMode()) { /* native context */ }

// Validate constants object (called internally by createSkateboardApp)
validateConstants(constants);

// Get constants object
const constants = getConstants();
```

## Lazy Authentication (Auth Overlay)

Let users explore `/app` without signing in — prompt them only when they perform a protected action.

### Setup

Set `authOverlay: true` in your constants to allow unauthenticated access to `/app` routes:

```json
{
  "authOverlay": true
}
```

The `AuthOverlay` component is rendered automatically by `createSkateboardApp` — no additional wiring needed.

### Usage

```javascript
import { useAuthGate } from '@stevederico/skateboard-ui/useAuthGate';

function SaveButton() {
  const requireAuth = useAuthGate();

  function handleSave() {
    requireAuth(() => {
      // Only runs if user is authenticated
      // If not signed in, auth overlay appears first
      saveThing();
    });
  }

  return <button onClick={handleSave}>Save</button>;
}
```

### How It Works

1. User clicks a protected action (Save, Like, Post, etc.)
2. `requireAuth()` checks if user is signed in
3. If signed in — callback runs immediately
4. If not — a modal dialog appears with sign-in/sign-up forms
5. After successful auth, the original callback executes automatically
6. User stays on the same page throughout — no navigation

The dialog supports toggling between sign-in and sign-up modes inline, and can be dismissed with the X button (cancels the action).

## Toast Notifications

Toasts are provided by [Sonner](https://sonner.emilkowal.dev/) and rendered automatically by `createSkateboardApp`.

```javascript
import { toast } from 'sonner';

toast.success('Changes saved!');
toast.error('Failed to save');
toast.loading('Saving...');
toast.info('New feature available');
toast.warning('This action cannot be undone');

// Promise-based
toast.promise(
  fetch('/api/data'),
  {
    loading: 'Loading...',
    success: 'Data loaded!',
    error: 'Failed to load'
  }
);
```

## Styling

Import base theme and override as needed:

```css
/* styles.css */
@import "@stevederico/skateboard-ui/styles.css";

@source '../../node_modules/@stevederico/skateboard-ui';

@theme {
  --color-app: var(--color-purple-500);
}
```

### Theme Variables

| Variable | Description |
|----------|-------------|
| `--color-app` | Primary brand color (used for app icon backgrounds, gradient buttons) |
| `--background` | Page background |
| `--foreground` | Text color |
| `--accent` | Secondary backgrounds |
| `--radius` | Border radius |

Dark mode is automatic via CSS custom properties and `next-themes`.

## shadcn/ui Components

51 components available at `@stevederico/skateboard-ui/shadcn/ui/*`:

```javascript
import { Button } from '@stevederico/skateboard-ui/shadcn/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '@stevederico/skateboard-ui/shadcn/ui/card';
import { Input } from '@stevederico/skateboard-ui/shadcn/ui/input';
import { Label } from '@stevederico/skateboard-ui/shadcn/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@stevederico/skateboard-ui/shadcn/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@stevederico/skateboard-ui/shadcn/ui/avatar';
import { Badge } from '@stevederico/skateboard-ui/shadcn/ui/badge';
import { Separator } from '@stevederico/skateboard-ui/shadcn/ui/separator';
import { ScrollArea } from '@stevederico/skateboard-ui/shadcn/ui/scroll-area';
import { Skeleton } from '@stevederico/skateboard-ui/shadcn/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@stevederico/skateboard-ui/shadcn/ui/alert';
import { Progress } from '@stevederico/skateboard-ui/shadcn/ui/progress';
import { Switch } from '@stevederico/skateboard-ui/shadcn/ui/switch';
import { Checkbox } from '@stevederico/skateboard-ui/shadcn/ui/checkbox';
import { Textarea } from '@stevederico/skateboard-ui/shadcn/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@stevederico/skateboard-ui/shadcn/ui/tooltip';
```

```javascript
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@stevederico/skateboard-ui/shadcn/ui/select';

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@stevederico/skateboard-ui/shadcn/ui/dropdown-menu';

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from '@stevederico/skateboard-ui/shadcn/ui/alert-dialog';

import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@stevederico/skateboard-ui/shadcn/ui/accordion';

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@stevederico/skateboard-ui/shadcn/ui/table';

import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '@stevederico/skateboard-ui/shadcn/ui/tabs';
```

### Utilities

```javascript
// Tailwind className merger
import { cn } from '@stevederico/skateboard-ui/shadcn/lib/utils';

cn('px-2 py-1', condition && 'bg-red-500', 'px-4');  // Merges without conflicts

// Mobile detection hook (< 768px)
import { useIsMobile } from '@stevederico/skateboard-ui/shadcn/hooks/use-mobile';

const isMobile = useIsMobile();
```

All components support dark mode automatically and accept a `className` prop for customization.

## Dependencies

### Peer Dependencies
- React 19.1+
- react-dom 19.1+
- react-router-dom 7.0+

### Core Dependencies
- @base-ui/react — Accessible UI primitives
- lucide-react — Icon library
- next-themes — Theme management
- class-variance-authority — Variant styling
- clsx & tailwind-merge — className utilities
- sonner — Toast notifications
- vaul — Drawer primitives
- cmdk — Command menu
- embla-carousel-react — Carousel
- react-day-picker — Calendar
- react-resizable-panels — Resizable panels
- recharts — Charts

## Repository

https://github.com/stevederico/skateboard-ui
