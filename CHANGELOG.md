# CHANGELOG

2.6.0

  Fix dark mode flash
  Add CSS dark mode fallback
  Center feature emojis

2.5.0

  Add configurable LandingView constants
  Add navLinks constant
  Add pricing.title constant
  Add pricing.extras constant
  Add ctaHeading constant
  Add footerLinks constant
  Add copyrightText constant
  Use stripeProducts features and interval
  Conditionally render pricing section

2.4.0

  Add sidebarCollapsed constant

2.3.1

  Remove sidebar rail hover border

2.3.0

  Remove sidebar user section
  Remove sidebar divider
  Remove sidebar group label
  Add hideSidebarInsetRounding prop
  Fix SettingsView rounding

2.2.2

  Add cursor-pointer to interactive components

2.2.1

  Fix Sidebar import path

2.2.0

  Reorganize into folders
  Add migration guide
  Remove AppSidebar dead code
  Remove LandingViewSimple export
  Add view overrides

2.1.0

  Rename AppSidebar to Sidebar
  Simplify LandingView layout
  Add form Labels to views
  Add AuthOverlay dialog header
  Update SettingsView card layout
  Add DynamicIcon className support
  Remove Layout theme logic
  Add sidebar Settings button
  Consolidate docs into README
  Remove USAGE.md
  Remove AUTHENTICATION.md

2.0.1

  Add shadcn sidebar primitives
  Add NavUser dropdown footer
  Add SidebarInset layout
  Fix ProtectedRoute loading state
  Update sidebar width CSS var

2.0.0

  Add gradient Button variant
  Add cta Button size
  Add gradient-btn CSS shimmer
  Fix body bg-background token
  Add className props passthrough
  Update ThemeToggle shadcn Button
  Update ErrorBoundary shadcn Card
  Update SignInView gradient Button
  Update SignUpView gradient Button
  Update AuthOverlay gradient Button
  Update SettingsView shadcn Card
  Update UpgradeSheet gradient Button
  Update LandingView shadcn Card
  Remove inline hover handlers
  Remove duplicate DynamicIcon
  Remove Quick Create header
  Update TabBar semantic tokens
  Update NotFound text-foreground
  Add TextView ScrollArea
  Add Alert error messages
  Add Button link variants

1.5.2

  Fix isAuthenticated cookie check

1.5.1

  Rename noProtectedRoutes to authOverlay
  Guard unauthenticated Settings UI
  Skip 401 redirect in authOverlay mode

1.5.0

  Add AuthOverlay component
  Add useAuthGate hook
  Add auth overlay state
  Add authOverlay support
  Add JSDoc comments
  Update README documentation

1.4.1

  Add landingPage param

1.4.0

  Remove terms checkbox
  Remove terms validation

1.3.9

  Add sidebar rail CSS override
  Revert shadcn sidebar to vanilla

1.3.8

  Fix sidebar rail hover
  Use constants.version in SettingsView
  Remove @package import

1.3.7

  Fix UpgradeSheet scroll behavior
  Move sidebar width to provider
  Remove sidebar user avatar
  Remove sidebar border
  Add drawer outline-none

1.3.6

  Fix UpgradeSheet constants error

1.3.5

  Add use-sync-external-store dependency
  Remove geist dependency

1.3.4

  Fix SettingsView duplicate state declaration

1.3.3

  Fix SignInView function signature
  Fix SignUpView function signature
  Fix PaymentView duplicate imports
  Fix SettingsView duplicate imports
  Remove duplicate React imports

1.3.2

  Remove Geist font imports
  Replace path aliases with relative
  Add constants to Context state

1.3.1

  Add Geist font
  Add Toast notifications
  Add SkeletonLoader component
  Add Avatar components
  Add Badge components
  Add Tooltip components
  Add Checkbox components
  Add AlertDialog components
  Add user profile
  Add USAGE.md documentation
  Update README documentation
  Export new components

1.3.0

  Migrate to Base UI
  Remove date-fns dependency
  Remove input-otp component
  Update lucide-react icons
  Update recharts v3
  Update react-resizable-panels v4
  Fix accordion animations
  Update README dependencies
  Add 8 new components
  Add .gitignore file

1.2.22

  Fix SignOut CSRF header
  Add CSRF retry logic
  Remove redundant token parsing
  Update authentication docs

## [1.2.21] - 2026-01-22

### Fixed
- **SignOut**: Added missing CSRF token header to signout request (critical bug that caused 403 errors)
- **Error Handling**: Added automatic retry logic for 403 CSRF validation failures with session refresh
- **Code Quality**: Removed redundant CSRF token parsing in SignInView (getCSRFToken() already handles it)

### Changed
- `apiRequest()` now automatically recovers from CSRF token failures by refreshing the session and retrying once
- Improved error messages for CSRF-related failures

### Documentation
- Updated Authentication.md with CSRF error handling flow

1.2.20

  Fix CSRF token reading
  Read csrf_token cookie directly
  Add localStorage fallback

1.2.19

  Skip noLogin backend validation
  Export getConstants utility

1.2.18

  Add authentication documentation
  Add JSDoc comments
  Update README configuration
  Create docs folder

1.2.17

  Fix SignIn layout positioning
  Fix SignUp layout positioning

1.2.14

  Fix isAuthenticated validation

1.2.13

  Fix CSRF localStorage sync
  Fix SignUp form submit

1.2.12

  Remove unused embla-carousel-react
  Remove unused sonner

1.2.11

  Add navigation aria labels
  Add sidebar button semantics
  Add TabBar accessibility
  Add password validation
  Add open redirect prevention
  Add API request timeout
  Fix useListData abort handling
  Remove console.log statements
  Optimize ThemeToggle storage
  Remove ViteConfig export

1.2.5

  Add sidebar visibility control
  Add tabbar visibility control
  Add hideTabBar constant support
  Add programmatic UI functions
  Fix broken Button export
  Fix SignOutView import path
  Add LandingViewSimple export
  Consolidate DynamicIcon usage
  Remove unused FREE_LIMITS
  Fix ViteConfig duplicate import
  Relax peer dependency versions
  Update README documentation

1.2.4

  Fix react-router cookie import
  Add force optimization
  Add react-router-dom include

1.2.3

  Fix cookie ESM import
  Add cookie to optimizeDeps

1.2.2

  Fix CSRF cookie-only handling
  Remove localStorage CSRF storage
  Fix SettingsView subscription data
  Fix SignOutView CSRF cleanup
  Fix App.jsx useAppSetup params
  Remove Context.jsx CSRF code

1.2.1

  Fix Layout scroll
  Update SettingsView style
  Fix button borders

1.2.0

  Add ViteConfig export
  Clean Utilities formatting

1.1.0

  Remove Vite build utilities
  Fix TailwindCSS v4 compatibility
  Make pure component library
  Move build config to app

1.0.9

  Add cookie exclusions
  Exclude set-cookie-parser

1.0.8

  Remove cookie dependencies

1.0.7

  Refactor wrapper implementation

1.0.6

  Add wrapper support

1.0.5

  Update PaymentView component
  Update SettingsView component
  Update SignInView component
  Update SignUpView component

1.0.4

  Update Vite optimizeDeps
  Add exclude dependencies
  Improve build config

1.0.3

  Remove Vite build plugins

1.0.2

1.0.1

1.0.0

  Add API request utilities
  Add constants validation
  Add React hooks
  Export App component
  Export Context component
  Export styles.css

0.9.9

  Add optional chaining safeguards
  Fix features rendering logic

0.9.8

  Add ProtectedRoute component
  Add useAppSetup hook
  Export isAuthenticated utility
  Add react-router-dom peer dependency

0.9.7

  Export getCSRFToken utility
  Export getAppKey utility

0.9.6

  Add SignOutView component
  Fix auth credentials include
  Remove duplicate StripeView

0.9.5

  Export PaymentView component

0.9.4

  Add PaymentView component
  Update usage tracking
  Refactor endpoint paths

0.9.3

  Add input autofocus
  Enhance button styling
  Improve dark mode

0.9.2

  Simplify auth form layout
  Remove card wrapper components
  Increase input field sizes

0.9.1
  updated login token processing

0.9.0

  Export ThemeToggle component

0.8.9

  Update Utilities component again

0.8.8

  Update Utilities component

0.8.7

  Update UpgradeSheet component again

0.8.6

  Update UpgradeSheet component

0.8.5

  Add UpgradeSheet export

0.8.4

  Fix theme initialization bug
  Create shared ThemeToggle component
  Consolidate duplicate theme storage

0.8.3

  Fix jsx attribute warning

0.8.2

  Add sheet cursor pointer

0.8.1

  Add cursor pointer buttons

0.8.0
  more settings improvements

0.7.9

  Remove header component
  Simplify settings layout

0.7.8

  Update accent classes
  Remove header border

0.7.7

  Override sidebar width

0.7.6

  Reduce sidebar width

0.7.5

  Use constants for features
  Update pricing section text
  Simplify feature rendering

0.7.4

  Enhanced landing page design
  Add dark mode toggle
  Implement modern hero section
  Add features pricing sections

0.7.3
 auth improvements

0.7.1

  Fix import paths
  Add utils exports
  Update component imports

0.7.0

  Update shadcn components
  Add missing components
  Fix dependency conflicts

0.6.3

  Update dependencies

0.6.2
header size
0.6.1
sidebar adjustment
0.6.0
added dynamicIcon
0.5.9
sidebar adjustment
0.5.8
removed collapse button from sidebar, double click border to open and close
0.5.1
import fixes
0.5.0
added lucide-react
0.4.2
removed sign out and billing from noLogin apps
0.4.1
fixed subscribe on Settings
0.4.0
fixed stripe showCheckout
0.3.9
fixed token expiration
0.3.8
updated cookie handling





