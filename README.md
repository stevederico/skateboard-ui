# skateboard-ui

React component library for rapid application development. Built with TailwindCSS v4 and shadcn/ui.

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

That's it! You get routing, auth, layout, landing page, settings, and payments.

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

### shadcn/ui Components

43 components available at `@stevederico/skateboard-ui/shadcn/ui/*`:

```javascript
import { Button } from '@stevederico/skateboard-ui/shadcn/ui/button'
import { Card } from '@stevederico/skateboard-ui/shadcn/ui/card'
import { Input } from '@stevederico/skateboard-ui/shadcn/ui/input'
import { Dialog } from '@stevederico/skateboard-ui/shadcn/ui/dialog'
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

## Protected Routes

```javascript
import ProtectedRoute from '@stevederico/skateboard-ui/ProtectedRoute';
```

Used internally by createSkateboardApp. Redirects to /signin if not authenticated.

## Documentation

- **[Authentication Guide](./docs/AUTHENTICATION.md)** - Complete guide to the hybrid cookie + localStorage authentication system, including backend requirements, security considerations, and Express.js implementation examples

## Dependencies

- React 19.1+
- react-router-dom 7.0+
- Radix UI primitives
- TailwindCSS 4.0+
- lucide-react

## Repository

https://github.com/stevederico/skateboard-ui
