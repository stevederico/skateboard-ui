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
  authOverlay: false,  // Set true to allow unauthenticated access to /app routes (use with useAuthGate)

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

skateboard-ui uses a **hybrid cookie + localStorage authentication system** that combines security with performance:

```
┌─────────────────────────────────────────────────────────────────┐
│                         Authentication Flow                      │
└─────────────────────────────────────────────────────────────────┘

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

#### Cookie-Based Session Management
- **Session token** stored in `{appName}_token` cookie (HttpOnly, Secure, SameSite=Strict)
- Automatically sent with every request via browser
- Cannot be accessed by JavaScript (XSS protection)
- Backend validates cookie on each protected endpoint

#### localStorage for Client-Side Validation
- **CSRF token** and **user data** stored in localStorage
- Enables instant `isAuthenticated()` checks without network calls
- Used by client-side routing logic (ProtectedRoute initial check)
- Not used for actual authentication (cookies handle that)

#### CSRF Protection
- Dual-token system prevents CSRF attacks
- **CSRF token** sent in `X-CSRF-Token` header with state-changing requests
- Backend validates header matches stored session CSRF token
- Separate from session cookie to prevent cookie-based CSRF

#### CSRF Error Handling

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

#### Required Backend Endpoints

##### POST /signup
Create new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
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

##### POST /signin
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

##### GET /me
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
    "name": "John Doe"
  }
}
```

**Response (not authenticated):**
- Status: 401 Unauthorized

##### POST /signout
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

#### Cookie Configuration

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

#### Protected Endpoints
All authenticated endpoints must:
1. Validate `{appName}_token` cookie exists and is valid
2. For state-changing operations (POST, PUT, DELETE), validate `X-CSRF-Token` header
3. Return 401 if authentication fails
4. Return 403 if CSRF validation fails

#### Security Considerations

- **XSS Protection**: Session token is HttpOnly — JavaScript cannot access it
- **CSRF Protection**: Dual-token pattern prevents cookie-based CSRF attacks
- **SameSite Policy**: Session token (Strict), CSRF token (Lax)
- **HTTPS Requirement**: All cookies marked `Secure` in production
- **localStorage Trade-offs**: Acceptable for CSRF token (cannot authenticate alone), never store session token

#### Example Backend Implementation (Express.js)

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
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const user = await createUser(email, password);
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

#### Auth Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| "Not authenticated" after signin | Cookies not sent | Verify `credentials: 'include'` in fetch calls |
| CSRF 403 errors | Token mismatch | Check `X-CSRF-Token` header, verify cookie exists |
| Cookies not persisting | SameSite/Secure flags | Set `secure: false` in dev, check domain match |
| `isAuthenticated()` false but cookie exists | localStorage cleared | Re-fetch from `/me` endpoint |

#### No-Login Mode

```javascript
const constants = { noLogin: true };
```

Effects: `isAuthenticated()` always returns `true`, ProtectedRoute allows all access.

## Components

### Core Components

| Component | Import | Description |
|-----------|--------|-------------|
| Header | `@stevederico/skateboard-ui/Header` | App header with title and action button |
| Layout | `@stevederico/skateboard-ui/Layout` | Page layout with sidebar/tabbar |
| Sidebar | `@stevederico/skateboard-ui/Sidebar` | Desktop navigation sidebar |
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

### Font System

Geist font family is loaded via npm package in `App.jsx`:
```jsx
import 'geist/font/sans/style.css';
import 'geist/font/mono/style.css';
```

Applied in `styles.css`:
- Sans: `font-family: 'Geist'` (body)
- Mono: `font-family: 'Geist Mono'` (code, pre, kbd elements)

### Toast Notifications

Import from sonner:
```jsx
import { toast } from 'sonner';

// Success
toast.success('Changes saved!');

// Error
toast.error('Failed to save');

// Loading
toast.loading('Saving...');

// Info
toast.info('New feature available');

// Warning
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

### Skeleton Loaders

Import from SkeletonLoader:
```jsx
import { CardSkeleton, TableSkeleton, AvatarSkeleton, FormSkeleton } from '@stevederico/skateboard-ui/SkeletonLoader';

// Card skeleton
<CardSkeleton />

// Table skeleton with custom rows
<TableSkeleton rows={10} />

// Avatar skeleton
<AvatarSkeleton />

// Form skeleton
<FormSkeleton />
```

### Avatar

```jsx
import { Avatar, AvatarFallback, AvatarImage } from '@stevederico/skateboard-ui/shadcn/ui/avatar';

<Avatar size="lg">
  <AvatarImage src={user.avatar} alt={user.name} />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Sizes: sm, default, lg
```

### Badge

```jsx
import { Badge } from '@stevederico/skateboard-ui/shadcn/ui/badge';

<Badge variant="default">Pro</Badge>
<Badge variant="secondary">Beta</Badge>
<Badge variant="destructive">Expired</Badge>
<Badge variant="outline">New</Badge>
```

### Tooltip

```jsx
import { Tooltip, TooltipContent, TooltipTrigger } from '@stevederico/skateboard-ui/shadcn/ui/tooltip';

<Tooltip>
  <TooltipTrigger asChild>
    <button>Help</button>
  </TooltipTrigger>
  <TooltipContent side="right">
    Click to learn more
  </TooltipContent>
</Tooltip>

// Sides: top, right, bottom, left
```

### Alert Dialog

```jsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@stevederico/skateboard-ui/shadcn/ui/alert-dialog';

<AlertDialog>
  <AlertDialogTrigger asChild>
    <button>Delete Account</button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Checkbox

```jsx
import { Checkbox } from '@stevederico/skateboard-ui/shadcn/ui/checkbox';

const [checked, setChecked] = useState(false);

<div className="flex items-center gap-2">
  <Checkbox
    id="terms"
    checked={checked}
    onCheckedChange={setChecked}
  />
  <label htmlFor="terms">Accept terms</label>
</div>
```

### Switch

```jsx
import { Switch } from '@stevederico/skateboard-ui/shadcn/ui/switch';

const [enabled, setEnabled] = useState(false);

<div className="flex items-center gap-2">
  <Switch
    id="notifications"
    checked={enabled}
    onCheckedChange={setEnabled}
  />
  <label htmlFor="notifications">Enable notifications</label>
</div>
```

### Select

```jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@stevederico/skateboard-ui/shadcn/ui/select';

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Textarea

```jsx
import { Textarea } from '@stevederico/skateboard-ui/shadcn/ui/textarea';

<Textarea
  placeholder="Enter your message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
```

### Alert

```jsx
import { Alert, AlertDescription, AlertTitle } from '@stevederico/skateboard-ui/shadcn/ui/alert';

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    Your subscription expires in 3 days.
  </AlertDescription>
</Alert>
```

### Progress

```jsx
import { Progress } from '@stevederico/skateboard-ui/shadcn/ui/progress';

<Progress value={66} className="w-full" />
```

### Dropdown Menu

```jsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@stevederico/skateboard-ui/shadcn/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger>Profile</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Sign Out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Dark Mode Support

All components support dark mode automatically via the `next-themes` provider. Colors are defined in `styles.css` using CSS variables that adapt to the theme.

### Component Customization

All components use Tailwind utility classes and can be customized via the `className` prop:

```jsx
<Badge className="text-lg px-4 py-2" variant="default">
  Custom Badge
</Badge>
```

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
