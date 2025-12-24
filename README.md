# skateboard-ui

React component library built with TailwindCSS and shadcn/ui for rapid application development.

## Installation

```bash
npm install @stevederico/skateboard-ui
```

## Components

### Core Components
- **AppSidebar** - Application sidebar navigation
- **DynamicIcon** - Dynamic icon rendering from lucide-react
- **Header** - Application header component
- **Layout** - Page layout wrapper
- **TabBar** - Tab navigation bar
- **ThemeToggle** - Dark/light mode toggle
- **Sheet** - Slide-out panel component
- **UpgradeSheet** - Premium upgrade UI

### View Components
- **LandingView** - Landing page template
- **LandingViewSimple** - Simplified landing page template
- **SettingsView** - Settings page template
- **SignInView** - Authentication sign-in page
- **SignUpView** - Authentication sign-up page
- **SignOutView** - Sign out handler
- **PaymentView** - Stripe payment integration
- **TextView** - Text display view
- **NotFound** - 404 error page
- **ErrorBoundary** - React error boundary wrapper

### shadcn/ui Components
Full set of shadcn/ui primitives available at `@stevederico/skateboard-ui/shadcn/ui/*`

## Usage

```javascript
import { Button } from '@stevederico/skateboard-ui/shadcn/ui/button'
import { Layout } from '@stevederico/skateboard-ui/Layout'
import { ThemeToggle } from '@stevederico/skateboard-ui/ThemeToggle'
```

## Utilities

```javascript
import { cn } from '@stevederico/skateboard-ui/shadcn/lib/utils'
import { useMobile } from '@stevederico/skateboard-ui/shadcn/hooks/use-mobile'
import { isAuthenticated, getAppKey, useAppSetup } from '@stevederico/skateboard-ui/Utilities'
```

## Routing

```javascript
import ProtectedRoute from '@stevederico/skateboard-ui/ProtectedRoute'
```

## UI Visibility Control

### Static Configuration (constants.json)
```json
{
  "hideSidebar": true,
  "hideTabBar": true
}
```

### Programmatic Control
```javascript
import {
  showSidebar,
  hideSidebar,
  showTabBar,
  hideTabBar,
  setUIVisibility
} from '@stevederico/skateboard-ui/Utilities'

// Individual controls
hideSidebar()
showSidebar()
hideTabBar()
showTabBar()

// Batch control
setUIVisibility({ sidebar: false, tabBar: false })
```

## Dependencies

Built on:
- React 19.1+
- Radix UI primitives
- TailwindCSS
- lucide-react icons
- class-variance-authority

## Repository

https://github.com/stevederico/skateboard-ui

