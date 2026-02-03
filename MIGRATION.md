# Migration Guide

## Upgrading from 1.4.x to 2.0.x

### Breaking Changes

#### 1. `noProtectedRoutes` renamed to `authOverlay`

```diff
 const constants = {
-  noProtectedRoutes: true,
+  authOverlay: true,
 };
```

If you were using `noProtectedRoutes` to allow unauthenticated access to `/app` routes, rename it to `authOverlay`.

#### 2. `Toast` replaced by Sonner `Toaster`

If you imported `Toast` directly:

```diff
- import Toast from '@stevederico/skateboard-ui/Toast';
```

Remove it. `createSkateboardApp` now renders `<Toaster />` from [sonner](https://sonner.emilkowal.dev/) automatically. Use `toast()` from sonner directly:

```javascript
import { toast } from 'sonner';

toast.success('Saved!');
toast.error('Something went wrong');
```

#### 3. `SkeletonLoader` removed

```diff
- import SkeletonLoader from '@stevederico/skateboard-ui/SkeletonLoader';
```

Use the shadcn `Skeleton` component instead:

```javascript
import { Skeleton } from '@stevederico/skateboard-ui/shadcn/ui/skeleton';

<Skeleton className="h-4 w-[200px]" />
```

#### 4. `AppSidebar` renamed to `Sidebar`

```diff
- import AppSidebar from '@stevederico/skateboard-ui/AppSidebar';
+ import Sidebar from '@stevederico/skateboard-ui/Sidebar';
```

Most apps don't import this directly (Layout handles it), but update if you do.

#### 5. `LandingViewSimple` removed

```diff
- import LandingViewSimple from '@stevederico/skateboard-ui/LandingViewSimple';
```

Use the `landingPage` parameter on `createSkateboardApp` to provide a custom landing page instead:

```javascript
createSkateboardApp({
  constants,
  appRoutes,
  landingPage: <MyCustomLanding />,
});
```

### New Features

#### AuthOverlay and useAuthGate (1.5.0+)

Gate actions behind authentication without redirecting:

```javascript
import { useAuthGate } from '@stevederico/skateboard-ui/useAuthGate';

function SaveButton() {
  const requireAuth = useAuthGate();

  return (
    <button onClick={() => requireAuth(() => saveThing())}>
      Save
    </button>
  );
}
```

Enable by setting `authOverlay: true` in constants. The overlay renders automatically.

#### Custom Landing Page (1.4.1+)

```javascript
createSkateboardApp({
  constants,
  appRoutes,
  landingPage: <MyLandingPage />,
});
```

#### Sidebar Visibility Control (1.2.5+)

```javascript
import { hideSidebar, showSidebar, hideTabBar, showTabBar } from '@stevederico/skateboard-ui/Utilities';

hideSidebar();
showTabBar();
```

Or via constants:

```javascript
const constants = {
  hideSidebar: true,
  hideTabBar: true,
};
```

### Full Upgrade Steps

1. Update the package:
   ```bash
   deno install npm:@stevederico/skateboard-ui@latest
   ```

2. Search your codebase for removed imports:
   ```
   Toast, SkeletonLoader, AppSidebar, LandingViewSimple, noProtectedRoutes
   ```

3. Replace any direct `Toast` usage with `sonner`:
   ```javascript
   import { toast } from 'sonner';
   ```

4. Replace `SkeletonLoader` with shadcn `Skeleton`.

5. Rename `noProtectedRoutes` to `authOverlay` in your constants.

6. Run the app and verify routing, auth, sidebar, and toasts.

---

## Upgrading from 2.0.x to 2.1.x+

### No Breaking Changes

All consumer import paths are unchanged. This release reorganized the internal file structure but the `exports` map in `package.json` keeps every public import stable:

```javascript
// These all still work exactly the same
import { createSkateboardApp } from '@stevederico/skateboard-ui/App';
import { getState } from '@stevederico/skateboard-ui/Context';
import { apiRequest } from '@stevederico/skateboard-ui/Utilities';
import Layout from '@stevederico/skateboard-ui/Layout';
import Sidebar from '@stevederico/skateboard-ui/Sidebar';
import { Button } from '@stevederico/skateboard-ui/shadcn/ui/button';
```

### What Changed Internally

Files were reorganized into folders:

| Before (2.0.x) | After (2.1.x+) |
|-----------------|-----------------|
| `Context.jsx` | `core/Context.jsx` |
| `Utilities.js` | `core/Utilities.js` |
| `DynamicIcon.jsx` | `core/DynamicIcon.jsx` |
| `Layout.jsx` | `layout/Layout.jsx` |
| `Sidebar.jsx` | `layout/Sidebar.jsx` |
| `TabBar.jsx` | `layout/TabBar.jsx` |
| `Header.jsx` | `layout/Header.jsx` |
| `LandingView.jsx` | `views/LandingView.jsx` |
| `SignInView.jsx` | `views/SignInView.jsx` |
| `SignUpView.jsx` | `views/SignUpView.jsx` |
| `SignOutView.jsx` | `views/SignOutView.jsx` |
| `SettingsView.jsx` | `views/SettingsView.jsx` |
| `PaymentView.jsx` | `views/PaymentView.jsx` |
| `TextView.jsx` | `views/TextView.jsx` |
| `NotFound.jsx` | `views/NotFound.jsx` |
| `ThemeToggle.jsx` | `components/ThemeToggle.jsx` |
| `Sheet.jsx` | `components/Sheet.jsx` |
| `UpgradeSheet.jsx` | `components/UpgradeSheet.jsx` |
| `ErrorBoundary.jsx` | `components/ErrorBoundary.jsx` |
| `AuthOverlay.jsx` | `components/AuthOverlay.jsx` |
| `ProtectedRoute.jsx` | `components/ProtectedRoute.jsx` |
| `useAuthGate.js` | `hooks/useAuthGate.js` |

### Cleanup

- `AppSidebar.jsx` deleted (was dead code since 2.1.0)
- `LandingViewSimple` export removed (file never existed on disk)

### New: View Overrides (2.1.x+)

Override built-in views without forking:

```javascript
createSkateboardApp({
  constants,
  appRoutes,
  overrides: {
    settings: MySettingsView,
    signIn: MySignInView,
    signUp: MySignUpView,
    signOut: MySignOutView,
    payment: MyPaymentView,
    notFound: MyNotFoundView,
    layout: MyLayout,
  },
});
```

### Upgrade Steps

1. Update the package:
   ```bash
   deno install npm:@stevederico/skateboard-ui@latest
   ```

2. No code changes required. All imports resolve the same way.

3. If you were importing `LandingViewSimple`, it was already broken (file didn't exist). Remove the import.

4. Run the app and confirm everything works.
