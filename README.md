# skateboard-ui

React component library for rapid application development. Built with TypeScript, plain CSS (no Tailwind needed), and Base UI-style primitives (ui/ follows the shadcn base-vega source).

Requires **Node.js 24+** in the app repo (see `engines` in `package.json`).

## Installation

```bash
npm install @stevederico/skateboard-ui
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
| `POST /usage` `{"operation":"check"}` | Subscription status: `isSubscriber()` reads `isSubscriber` from this response (no separate route) |
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

Since 5.18.0 skateboard-ui ships plain CSS and nobody runs Tailwind. `styles.css`
holds the theme variables, the base layer, the animations and the CSS for
skateboard-ui's own components. It was produced once with Tailwind and is now
the source: edit it by hand.

Each app owns one more plain CSS file for the classes its own `src` uses:

```css
/* src/assets/styles.css */
@import "@stevederico/skateboard-ui/styles.css";

:root {
  --color-app: var(--color-purple-500); /* brand */
}

@layer utilities {
  .my-card { padding: calc(var(--spacing) * 4); }
}
```

No `tailwindcss`, no `@tailwindcss/vite`, no `@theme`, `@apply` or `@source`.
Key variables: `--color-app` (brand), `--background`, `--foreground`,
`--accent`, `--radius`. An app's unlayered `:root` / `.dark` values win over the
shipped theme layer.

The skateboard template's `no-unknown-classes` lint rule reports a class that
neither skateboard-ui's `styles.css` nor the app's CSS defines.

To move an existing Tailwind app over, `scripts/tailwind-to-css.js` writes the
app's plain CSS once. It runs Tailwind from a temporary install outside the app
(see its header) and subtracts everything skateboard-ui's `styles.css` already
has. The same script produced `styles.css` and `.harness/harness.css` here.

## Components

### App components

| Component | Import | Description |
|-----------|--------|-------------|
| Sidebar | `@stevederico/skateboard-ui/Sidebar` | Desktop navigation sidebar |
| Header | `@stevederico/skateboard-ui/Header` | Page header with optional action button |
| Layout | `@stevederico/skateboard-ui/Layout` | Sidebar (desktop) + tabbar (mobile) |
| TabBar | `@stevederico/skateboard-ui/TabBar` | Mobile bottom navigation |
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
import { cn } from '@stevederico/skateboard-ui/lib/utils';
import { useIsMobile } from '@stevederico/skateboard-ui/hooks/use-mobile';
```

5.17.0 removed the old `./shadcn/*` paths. Rewrite
`@stevederico/skateboard-ui/shadcn/ui/X` to `/ui/X`, `/shadcn/lib/utils` to
`/lib/utils` and `/shadcn/hooks/X` to `/hooks/X` (same exports). Find leftovers
with `grep -rn "skateboard-ui/shadcn" src`.

### Icons

The shell ships the icons it renders inside the package. Apps import the
same vendored icons by name from `@stevederico/skateboard-ui/icons`, so they
need no `lucide-react` dependency:

```javascript
import { Home, Settings } from '@stevederico/skateboard-ui/icons';
```

The export covers the icons the shell renders plus every Lucide icon the
skateboard apps use (from lucide-react 0.546.0, listed in
`scripts/app-icon-names.txt`). Old Lucide alias names (`AlertCircle`,
`Loader2`, `HelpCircle`, `MoreHorizontal`) are exported too and point at the
canonical icon. The shell resolves `constants.json` icon strings privately via
a curated registry.

Icons by [Lucide](https://lucide.dev) (ISC License, see `LICENSE-lucide`).

### Router

skateboard-ui vendors react-router 7.18.5 (unchanged ESM build and types) and
exports it, so apps need no `react-router` dependency:

| Export | Import |
|--------|--------|
| react-router (`BrowserRouter`, `Routes`, `Link`, `useNavigate`, `createBrowserRouter`, ...) | `@stevederico/skateboard-ui/router` |
| react-router/dom (`RouterProvider` with `flushSync`, `HydratedRouter`) | `@stevederico/skateboard-ui/router/dom` |
| react-router/internal (route-module types) | `@stevederico/skateboard-ui/router/internal` |

```javascript
import { Link, useNavigate, useParams, useSearchParams } from '@stevederico/skateboard-ui/router';
```

Same API as `react-router`: change the import path, nothing else. Not
included: react-router's `react-server` (RSC) entries.

**Exactly one router copy.** The shell's routes, `Outlet`, `ProtectedRoute` and
`useSafeNavigate` use the vendored copy. An app that also imports
`'react-router'` (or `react-router-dom`) loads a second router whose context the
shell cannot see: hooks throw "useNavigate() may be used only in the context of
a <Router>", and `useSafeNavigate` silently falls back to full page loads. Find
leftovers with:

```bash
grep -rnE "from ['\"]react-router(-dom)?(/[^'\"]*)?['\"]" src
```

Then remove `react-router` from `package.json` and from Vite's
`resolve.dedupe` / `optimizeDeps.include`.

Re-copy for a new react-router release with
`node scripts/vendor-react-router.js <react-router> <cookie> <set-cookie-parser>`
(see the script header). **Security advisories for react-router are not
watched by any tool here**: check
https://github.com/remix-run/react-router/security/advisories by hand and
re-vendor when one applies. react-router by Remix Software, with cookie and
set-cookie-parser (MIT, see `LICENSE-react-router`).

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
  isPaidStatus,
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

react-router is not a peer since 5.16.0: it ships inside the package as `@stevederico/skateboard-ui/router` (see [Router](#router)). npm 7+ installs missing peers automatically. There is no public DynamicIcon; vendored icons are imported by name from `@stevederico/skateboard-ui/icons`. The shell resolves `constants.json` icon strings privately. Navigate with `useSafeNavigate()` from `Utilities`.

## Repository

https://github.com/stevederico/skateboard-ui

Version history and migration notes: [CHANGELOG.md](./CHANGELOG.md)