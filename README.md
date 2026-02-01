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
  appIcon: "🛹",

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

  // Optional: Authentication
  noLogin: false,  // Set true to disable authentication
  noProtectedRoutes: false,  // Set true to allow unauthenticated access to /app routes (use with useAuthGate)

  // Optional: Payments (Stripe)
  stripeProducts: [
    {
      name: "Pro Plan",
      priceId: "price_123",
      price: "$10/month",
      lookup_key: "pro_plan"
    }
  ],

  // Optional: Legal documents
  termsOfService: "Your terms of service...",
  privacyPolicy: "Your privacy policy...",

  // Optional: UI visibility
  hideSidebar: false,
  hideTabBar: false
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

### Authentication Setup

skateboard-ui uses a hybrid cookie + localStorage authentication system. Your backend must implement specific endpoints and cookie handling.

**See [AUTHENTICATION.md](./docs/AUTHENTICATION.md) for complete backend setup requirements.**

Quick overview:
- Session token stored in HttpOnly cookie for security
- CSRF token in localStorage for request validation
- Backend validates cookies on protected endpoints
- Client-side `isAuthenticated()` checks localStorage for fast validation

## Components

### Core Components

| Component | Import | Description |
|-----------|--------|-------------|
| Header | `@stevederico/skateboard-ui/Header` | App header with title and action button |
| Layout | `@stevederico/skateboard-ui/Layout` | Page layout with sidebar/tabbar |
| AppSidebar | `@stevederico/skateboard-ui/AppSidebar` | Desktop navigation sidebar |
| TabBar | `@stevederico/skateboard-ui/TabBar` | Mobile bottom navigation |
| DynamicIcon | `@stevederico/skateboard-ui/DynamicIcon` | Lucide icon by name |
| ThemeToggle | `@stevederico/skateboard-ui/ThemeToggle` | Dark/light mode switch |
| Sheet | `@stevederico/skateboard-ui/Sheet` | Slide-out panel |
| UpgradeSheet | `@stevederico/skateboard-ui/UpgradeSheet` | Premium upgrade UI |
| ErrorBoundary | `@stevederico/skateboard-ui/ErrorBoundary` | Error boundary wrapper |

### View Components

| Component | Import | Description |
|-----------|--------|-------------|
| LandingView | `@stevederico/skateboard-ui/LandingView` | Landing page |
| SignInView | `@stevederico/skateboard-ui/SignInView` | Sign in form |
| SignUpView | `@stevederico/skateboard-ui/SignUpView` | Sign up form |
| SignOutView | `@stevederico/skateboard-ui/SignOutView` | Sign out handler |
| SettingsView | `@stevederico/skateboard-ui/SettingsView` | User settings |
| PaymentView | `@stevederico/skateboard-ui/PaymentView` | Stripe payment |
| TextView | `@stevederico/skateboard-ui/TextView` | Legal pages |
| NotFound | `@stevederico/skateboard-ui/NotFound` | 404 page |

### Auth Overlay (Lazy Authentication)

| Export | Import | Description |
|--------|--------|-------------|
| AuthOverlay | `@stevederico/skateboard-ui/AuthOverlay` | Modal sign-in/sign-up dialog |
| useAuthGate | `@stevederico/skateboard-ui/useAuthGate` | Hook to gate actions behind auth |

### Enhanced Components (New in v1.3.0)

| Component | Import | Description |
|-----------|--------|-------------|
| Toast | `@stevederico/skateboard-ui/Toast` | Toast notifications (Sonner) |
| SkeletonLoader | `@stevederico/skateboard-ui/SkeletonLoader` | Loading state patterns |

**Font System:** Geist font family loaded automatically for improved typography.

**See [USAGE.md](./USAGE.md) for detailed examples of Toast, Skeleton, Avatar, Badge, Tooltip, AlertDialog, Checkbox, Switch, and more.**

### shadcn/ui Components

51 components available at `@stevederico/skateboard-ui/shadcn/ui/*`:

```javascript
import { Button } from '@stevederico/skateboard-ui/shadcn/ui/button'
import { Card } from '@stevederico/skateboard-ui/shadcn/ui/card'
import { Input } from '@stevederico/skateboard-ui/shadcn/ui/input'
import { Dialog } from '@stevederico/skateboard-ui/shadcn/ui/dialog'
import { Avatar } from '@stevederico/skateboard-ui/shadcn/ui/avatar'
import { Badge } from '@stevederico/skateboard-ui/shadcn/ui/badge'
import { Tooltip } from '@stevederico/skateboard-ui/shadcn/ui/tooltip'
import { AlertDialog } from '@stevederico/skateboard-ui/shadcn/ui/alert-dialog'
```

## Usage Examples

### Header

```javascript
import Header from '@stevederico/skateboard-ui/Header';

<Header
  title="Dashboard"
  buttonTitle="Add"
  onButtonTitleClick={() => console.log('clicked')}
/>
```

### DynamicIcon

```javascript
import DynamicIcon from '@stevederico/skateboard-ui/DynamicIcon';

<DynamicIcon name="home" size={24} />
<DynamicIcon name="settings" size={20} className="text-muted" />
```

Icons from [lucide-react](https://lucide.dev/icons/).

### UpgradeSheet

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

### Context

```javascript
import { getState } from '@stevederico/skateboard-ui/Context';

function MyComponent() {
  const { state, dispatch } = getState();

  // Access user
  const user = state.user;

  // Update user
  dispatch({ type: 'SET_USER', payload: newUser });

  // Sign out
  dispatch({ type: 'CLEAR_USER' });
}
```

## Utilities

### API Requests

```javascript
import { apiRequest } from '@stevederico/skateboard-ui/Utilities';

// GET
const data = await apiRequest('/deals');

// POST
const newDeal = await apiRequest('/deals', {
  method: 'POST',
  body: JSON.stringify({ name: 'New Deal', amount: 5000 })
});
```

Features:
- Auto-includes credentials
- Auto-adds CSRF token for mutations
- Auto-redirects to /signout on 401

### Data Fetching Hook

```javascript
import { useListData } from '@stevederico/skateboard-ui/Utilities';

function DealsList() {
  const { data, loading, error, refetch } = useListData('/deals');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return data.map(deal => <DealCard key={deal.id} {...deal} />);
}
```

### Usage Tracking

```javascript
import { getRemainingUsage, trackUsage, showUpgradeSheet } from '@stevederico/skateboard-ui/Utilities';

// Check remaining usage
const usage = await getRemainingUsage('messages');
// { remaining: 15, total: 20, isSubscriber: false }

// Track usage (decrements remaining)
const updated = await trackUsage('messages');

// Show upgrade prompt
showUpgradeSheet(upgradeSheetRef);
```

### Auth Utilities

```javascript
import { isAuthenticated, getCurrentUser } from '@stevederico/skateboard-ui/Utilities';

if (isAuthenticated()) {
  const user = getCurrentUser();
}
```

## UI Visibility Control

### Static (constants.json)

```json
{
  "hideSidebar": true,
  "hideTabBar": true
}
```

### Programmatic

```javascript
import { showSidebar, hideSidebar, showTabBar, hideTabBar, setUIVisibility } from '@stevederico/skateboard-ui/Utilities';

hideSidebar();
showSidebar();
hideTabBar();
showTabBar();

// Batch control
setUIVisibility({ sidebar: false, tabBar: false });
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
| `--color-app` | Primary brand color |
| `--background` | Page background |
| `--foreground` | Text color |
| `--accent` | Secondary backgrounds |
| `--radius` | Border radius |

Dark mode is automatic via CSS custom properties.

## Lazy Authentication (Auth Overlay)

Let users explore `/app` without signing in — prompt them only when they perform a protected action.

### Setup

Set `noProtectedRoutes: true` in your constants to allow unauthenticated access to `/app` routes:

```json
{
  "noProtectedRoutes": true
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

### How it works

1. User clicks a protected action (Save, Like, Post, etc.)
2. `requireAuth()` checks if user is signed in
3. If signed in — callback runs immediately
4. If not — a modal dialog appears with sign-in/sign-up forms
5. After successful auth, the original callback executes automatically
6. User stays on the same page throughout — no navigation

The dialog supports toggling between sign-in and sign-up modes inline, and can be dismissed with the X button (cancels the action).

## Protected Routes

```javascript
import ProtectedRoute from '@stevederico/skateboard-ui/ProtectedRoute';
```

Used internally by createSkateboardApp. Redirects to /signin if not authenticated.

## Documentation

- **[Authentication Guide](./docs/AUTHENTICATION.md)** - Complete guide to the hybrid cookie + localStorage authentication system, including backend requirements, security considerations, and Express.js implementation examples

## Dependencies

### Peer Dependencies
- React 19.1+
- react-dom 19.1+
- react-router-dom 7.0+

### Core Dependencies
- @base-ui/react - Accessible UI primitives
- TailwindCSS 4.0+ - Utility-first CSS framework
- geist - Vercel's Geist font family (sans & mono)
- lucide-react - Icon library
- class-variance-authority - Type-safe variant styling
- clsx & tailwind-merge - className utilities
- sonner - Toast notifications

## Repository

https://github.com/stevederico/skateboard-ui
