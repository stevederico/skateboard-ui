# skateboard-ui

React component library for rapid application development. Built with TypeScript, TailwindCSS v4, and shadcn-style primitives.

Requires **Node.js 24+** in the app repo (see `engines` in `package.json`).

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

That's it — routing, auth, layout, landing page, settings, and payments are wired up.

## Configuration

skateboard-ui requires a `constants` object:

```javascript
const constants = {
  // Required
  devBackendURL: "http://localhost:8000/api",
  backendURL: "https://api.myapp.com/api",
  appName: "MyApp",
  appIcon: "sparkles",
  tagline: "Build apps faster with skateboard-ui",
  cta: "Get Started",
  features: {
    title: "Everything you need",
    items: [
      { icon: "Zap", title: "Fast", description: "Built for speed" },
      { icon: "Shield", title: "Secure", description: "Authentication included" }
    ]
  },
  companyName: "Your Company",
  companyWebsite: "https://yourcompany.com",
  companyEmail: "hello@yourcompany.com",

  // Optional
  pages: [
    { title: "Home", icon: "home", url: "home" },
    { title: "Search", icon: "search", url: "search" }
  ],
  noLogin: false,
  hideSidebar: false,
  hideTabBar: false,
  hideSidebarHeader: false,
  stripeProducts: [
    {
      name: "Pro Plan",
      priceId: "price_123",
      price: "$10/month",
      lookup_key: "pro_plan",
      title: "Go Pro",
      interval: "month",
      features: ["Unlimited usage", "Priority support"]
    }
  ],
  navLinks: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" }
  ],
  pricing: { title: "Simple Pricing", extras: ["Priority support", "Cancel anytime"] },
  ctaHeading: "Ready To Build?",
  footerLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" }
  ],
  copyrightText: "All rights reserved.",
  termsOfService: "Terms of Service for _COMPANY_...",
  privacyPolicy: "Privacy Policy for _COMPANY_...",
  EULA: "End User License Agreement...",
  subscriptionDetails: "Subscription details...",
  version: "1.0.0"
}
```

`devBackendURL` and `backendURL` should include the full API base path (e.g. `/api`). Endpoints are relative to that base:

- `${getBackendURL()}/signup` → `http://localhost:8000/api/signup`
- `${getBackendURL()}/me` → `http://localhost:8000/api/me`

## createSkateboardApp

```javascript
import { createSkateboardApp } from '@stevederico/skateboard-ui/App';

createSkateboardApp({
  constants,       // Required
  appRoutes,       // Required: [{ path: string, element: JSX.Element }]
  defaultRoute,    // Optional: defaults to first appRoute path
  landingPage,     // Optional: custom landing page element
  wrapper,         // Optional: component to wrap the router
});
```

Sets up routing, auth, theming, state, and error handling.

| Route | Component | Protected |
|-------|-----------|-----------|
| `/` | LandingView (or custom `landingPage`) | No |
| `/signin`, `/signup`, `/signout` | SignIn/SignUp/SignOutView | No |
| `/app/:path` | Your appRoutes | Yes |
| `/app/settings`, `/app/payment` | SettingsView, PaymentView | Yes |
| `/terms`, `/privacy`, `/eula`, `/subscription` | TextView | No |
| `*` | NotFound | No |

## Loading skeletons

Prefer **skeletons** for content waits (lists, page data, auth gate inside layout). Keep **spinners** for actions (submit, redirect).

```javascript
import {
  Skeleton,
  PageSkeleton,
  CardListSkeleton,
  SettingsSkeleton,
} from '@stevederico/skateboard-ui/ui/skeleton';

// Generic main-content placeholder (also used by ProtectedRoute while validating /me)
if (loading) return <PageSkeleton />;

// List/grid of avatar+text cards
if (loading) return <CardListSkeleton count={9} />;

// Settings-shaped stacked cards
if (loading) return <SettingsSkeleton />;
```

`ProtectedRoute` renders `PageSkeleton` inside the layout main area while checking the session — sidebar and tab bar stay put.

## Authentication

Hybrid cookie + localStorage auth:

1. **Sign in** — backend sets `{appName}_token` (HttpOnly) and `csrf_token` cookies; frontend stores CSRF + user in localStorage
2. **Client check** — `isAuthenticated()` reads localStorage (fast, no network)
3. **Route guard** — `ProtectedRoute` validates via `GET /me`
4. **API calls** — cookies sent automatically; `X-CSRF-Token` header on state-changing requests

### Required backend endpoints

**POST /signup** and **POST /signin**

```json
// Request
{ "email": "user@example.com", "password": "securePassword123", "name": "John Doe" }

// Response (201 / 200)
// Set-Cookie: {appName}_token=...; HttpOnly; Secure; SameSite=Strict
// Set-Cookie: csrf_token=...
{ "csrfToken": "...", "user": { "id": "...", "email": "...", "name": "..." } }
```

**GET /me** — validate session, return user (401 if not authenticated)

**POST /signout** — requires `X-CSRF-Token`, clears cookies

### Optional endpoints

| Endpoint | Purpose |
|----------|---------|
| `POST /usage` | Track/check feature usage limits |
| `GET /isSubscriber` | Subscription status |
| `POST /checkout` | Stripe checkout session |
| `POST /portal` | Stripe billing portal |

### Lazy auth (default)

Users can browse `/app` without signing in. Protected actions trigger the auth overlay via `useAuthGate`:

```javascript
import { useAuthGate } from '@stevederico/skateboard-ui/useAuthGate';

function SaveButton() {
  const requireAuth = useAuthGate();
  return <button onClick={() => requireAuth(() => saveThing())}>Save</button>;
}
```

Set `authOverlay: false` in constants to require sign-in before `/app` access.

### No-login mode

```javascript
const constants = { noLogin: true };
```

### Troubleshooting

| Problem | Fix |
|---------|-----|
| "Not authenticated" after signin | Ensure `credentials: 'include'` in fetch calls |
| CSRF 403 errors | Verify `X-CSRF-Token` header and `csrf_token` cookie |
| Cookies not persisting (dev) | Set `secure: false` in dev, check domain match |

## Dark Mode

Add this script to `index.html` **before** your app loads to prevent FOUC:

```html
<script>
  try {
    const theme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === 'dark' || (!theme && systemDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
</script>
```

## Styling

```css
@import "@stevederico/skateboard-ui/styles.css";

@source '../../node_modules/@stevederico/skateboard-ui';

@theme {
  --color-app: var(--color-purple-500);
}
```

Key variables: `--color-app` (brand), `--background`, `--foreground`, `--accent`, `--radius`.

## Components

### App components

| Component | Import | Description |
|-----------|--------|-------------|
| Sidebar | `@stevederico/skateboard-ui/Sidebar` | Desktop navigation sidebar |
| Header | `@stevederico/skateboard-ui/Header` | Page header with optional action button |
| Layout | `@stevederico/skateboard-ui/Layout` | Sidebar (desktop) + tabbar (mobile) |
| TabBar | `@stevederico/skateboard-ui/TabBar` | Mobile bottom navigation |
| DynamicIcon | `@stevederico/skateboard-ui/DynamicIcon` | Lucide icon by name string |
| ThemeToggle | `@stevederico/skateboard-ui/ThemeToggle` | Dark/light mode toggle |
| Sheet | `@stevederico/skateboard-ui/Sheet` | Slide-out panel |
| UpgradeSheet | `@stevederico/skateboard-ui/UpgradeSheet` | Premium upgrade drawer |
| ErrorBoundary | `@stevederico/skateboard-ui/ErrorBoundary` | Error boundary wrapper |

### Views

| Component | Import |
|-----------|--------|
| LandingView | `@stevederico/skateboard-ui/LandingView` |
| SignInView | `@stevederico/skateboard-ui/SignInView` |
| SignUpView | `@stevederico/skateboard-ui/SignUpView` |
| SignOutView | `@stevederico/skateboard-ui/SignOutView` |
| SettingsView | `@stevederico/skateboard-ui/SettingsView` |
| PaymentView | `@stevederico/skateboard-ui/PaymentView` |
| TextView | `@stevederico/skateboard-ui/TextView` |
| NotFound | `@stevederico/skateboard-ui/NotFound` |

### Auth

| Export | Import |
|--------|--------|
| AuthOverlay | `@stevederico/skateboard-ui/AuthOverlay` |
| useAuthGate | `@stevederico/skateboard-ui/useAuthGate` |
| ProtectedRoute | `@stevederico/skateboard-ui/ProtectedRoute` |

### UI primitives

Import from `@stevederico/skateboard-ui/ui/*`.

```javascript
import { Button } from '@stevederico/skateboard-ui/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@stevederico/skateboard-ui/ui/card';
import { Input } from '@stevederico/skateboard-ui/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@stevederico/skateboard-ui/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@stevederico/skateboard-ui/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@stevederico/skateboard-ui/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@stevederico/skateboard-ui/ui/tabs';
```

```javascript
import { cn } from '@stevederico/skateboard-ui/shadcn/lib/utils';
import { useIsMobile } from '@stevederico/skateboard-ui/shadcn/hooks/use-mobile';
```

### Icons

```javascript
import { ArrowUp, X } from '@stevederico/skateboard-ui/icons';
```

## Context

```javascript
import { getState, useUser, useDispatch } from '@stevederico/skateboard-ui/Context';

const { state, dispatch } = getState();
dispatch({ type: 'SET_USER', payload: userData });
dispatch({ type: 'CLEAR_USER' });
```

| Hook | Re-renders on |
|------|---------------|
| `getState()` | Any state change |
| `useUser()` | User changes only |
| `useDispatch()` | Never (stable) |

| Action | Payload | Description |
|--------|---------|-------------|
| `SET_USER` | user object | Set authenticated user |
| `CLEAR_USER` | — | Clear user |
| `SET_SIDEBAR_VISIBLE` | boolean | Show/hide sidebar |
| `SET_TABBAR_VISIBLE` | boolean | Show/hide tab bar |
| `SHOW_AUTH_OVERLAY` | callback or null | Show auth dialog |
| `HIDE_AUTH_OVERLAY` | — | Hide auth dialog |
| `AUTH_OVERLAY_SUCCESS` | — | Run pending callback and close |

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
  timestampToString,
  useListData,
  useForm,
  isAppMode,
} from '@stevederico/skateboard-ui/Utilities';
```

```javascript
// API — auto-includes credentials, CSRF header, auth overlay on 401
const data = await apiRequest('/deals');
await apiRequest('/deals', { method: 'POST', body: JSON.stringify({ name: 'New Deal' }) });

// Data fetching
const { data, loading, error, refetch } = useListData('/deals');

// Timestamps
timestampToString(1706000000, 'ago');   // "2 hours ago"
timestampToString(1706000000, 'DOB');   // "Jan 23, 2024"

// Stripe
showCheckout('user@example.com', 0);
showManage('cus_abc123');
```

## Peer dependencies

- React 19.1+
- react-dom 19.1+
- react-router 7.0+

## Repository

https://github.com/stevederico/skateboard-ui

Version history and migration notes: [CHANGELOG.md](./CHANGELOG.md)