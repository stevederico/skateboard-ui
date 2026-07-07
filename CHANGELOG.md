# CHANGELOG

4.12.1

  Republish built dist

4.12.0

  Fix drawer dark-mode text
  Fix auth redirect route

4.11.0

  Fix context-menu and menubar mouse clicks
  Fix popover focus-into-content on open
  Fix calendar single-select first-click crash
  Share dismiss layer across nested overlays
  Slider pointercancel cleanup and controlled drag
  Fix roving tabindex (radio, tabs, calendar)
  Avatar reconciles cached images
  Command palette single-pass filter and a11y name
  Add aria-expanded to sheet/drawer/alert-dialog
  Guard checkout and subscription fields
  TabBar active match by path segment
  Remove banned type assertions and dead code

4.10.0

  Fix dropdown menu item clicks
  Register portaled layer after attach

4.9.0

  Replace duration with transition-none
  Fix overlay hover jank

4.8.0

  Fix command palette position
  Add authOverlay override

4.7.0

  Trim README documentation
  Remove migration sections
  Drop implementation marketing

4.6.0

  SettingsView uses ThemeToggle

4.5.0

  Toggle uses resolvedTheme
  ThemeProvider owns dark
  Drop dark-mode stripping
  Slot render child fallback

4.4.0

  Document a11y releases
  Fix peer-dep naming

4.3.0

  Submenu aria-controls wiring
  Menu labelled by trigger
  Tooltip dismiss on outside tap
  Checkbox indeterminate mixed state
  Replace catch any narrowing
  Match DOMException error names
  Fix relative-time date casts
  Add a11y regression tests

4.2.0

  Restore menu focus on select
  Guard menu pointer focus-steal
  Add menu keyboard focus ring
  Conditional dialog aria labelling
  Reentrant overlay scroll lock
  Name popover dialog
  Slider name and form
  Fix dead slider classes
  Add a11y regression tests

4.1.0

  Add menu/select typeahead
  Fix popover focus management
  Fix navigation-menu keyboard entry
  Fix Command combobox ARIA
  Fix tabs first tab-stop
  Fix radio single tab-stop
  Set menu available-height
  Fix sheet/drawer exit animations
  Reset floating position on close
  Add a11y regression tests

4.0.0

  Self-contained ui/ component tier (47 components, zero base-ui)
  Remove vendored base-ui bundle (~2MB / 31k lines)
  Native dialog for dialog/alert-dialog/sheet/drawer
  In-house floating positioner, dismiss, presence, focus
  shadcn/ui/* now linker shims re-exporting ui/*
  render= and nativeButton kept as asChild compat
  SelectValue renders the real selected label
  Fix Slot handler composition, Button type, Escape stacking
  Fix avatar fallback, separator role, tabs ids, form integration

3.12.0

  Fix asChild button
  Infer nativeButton semantics

3.11.0

  Restore spinner animation
  Bridge orientation variants
  Restore sidebar sizes
  Restore overlay background
  Remove inert classes
  Guard context hooks
  Remove global augmentations
  Compose drawer handlers
  Slim package tarball

3.10.0

  Convert package to TypeScript
  Fix sign-out trigger render
  Fix calendar day focus
  Fix misplaced cursor-pointer
  Publish compiled dist with types
  Exports map points to dist
  Consumer import paths unchanged
  Add tsconfig and build
  Regenerate icons as TSX
  Re-vendor base-ui 1.5.0
  Bundle base-ui type declarations
  Adopt official base-vega shadcn
  Keep sidebar 12rem width
  Keep cursor-pointer interactions
  Preserve button asChild bridge
  Type cva with VariantProps
  Export public type surfaces
  Add root package export

3.9.0

  Auth overlay on by default
  Retry all parked 401s after sign-in
  Reject parked 401s when overlay is dismissed (no more hung requests)
  Invoke auth retries outside the reducer (StrictMode-safe)
  Sign-out lands on landing page; honor signIn/signUp overrides
  Skip overlay for already-signed-in visitors to /signin
  Always enforce request timeout even with a caller signal
  Sign-out clears local session
  Sign-in autocomplete attributes

3.8.1

  Add engines node >=24.0.0 (align with skateboard; dev/vendor scripts only)

3.8.0

  Redesign: `LandingView` now uses the SpecSheet layout — sticky header with nav + theme toggle, quiet hero with CTA buttons, icon-leading feature cards (responsive 1–3 columns), optional pricing card, dark CTA section, and footer. Reads all copy from `constants` (tagline, cta, navLinks, features, stripeProducts, pricing, ctaHeading, footerLinks, companyName, copyrightText)
  Feature/app icons resolve via `DynamicIcon` (Lucide names); legacy emoji/text values fall back to rendering as raw text so they never silently disappear
  Apps that vendored `LandingSpecSheet.jsx` can delete the local copy and rely on the package default (omit `landingPage`) or import `@stevederico/skateboard-ui/LandingView`

3.7.1

  Fix: `Button` now bridges shadcn-style `asChild` onto Base UI's `render` prop instead of leaking it onto the DOM `<button>` — removes the "React does not recognize the `asChild` prop" warning for `<Button asChild><a/></Button>` (e.g. LandingSpecSheet "Learn more")

3.7.0

  Breaking (peer dep rename): `react-router-dom` → `react-router`
  In react-router v7 `react-router-dom` is just a re-export of `react-router`; consumers must install `react-router@^7.0.0` instead of `react-router-dom`
  All internal imports rewritten (App, ProtectedRoute, Layout, Sidebar, TabBar, Utilities, Landing/Payment/Settings/SignOut views)

3.6.1

  Fix: restore `icons/` in files allowlist (regressed in 3.6.0 — `@stevederico/skateboard-ui/icons` import was unresolvable in published tarball)
  Add: `./ThemeProvider` export — exposes the in-house `ThemeProvider` + `useTheme` from components/core/ThemeProvider.jsx for consumers who don't go through createSkateboardApp

3.6.0

  Internal reorganization (no dep changes, no consumer API changes)
  Move core/ → components/core/ (Calendar, Command, Context, DynamicIcon, ThemeProvider, Utilities)
  Move layout/ → components/layout/ (Header, Layout, Sidebar, TabBar)
  Move views/ → components/views/ (Landing, SignIn/Up/Out, Settings, Payment, Text, NotFound)
  Delete empty src/shims/
  Collapses 4 top-level dirs to 1; everything user-facing now lives under components/
  package.json exports field updated to point to new internal paths — consumers continue to import via the same '@stevederico/skateboard-ui/X' names with no changes
  files allowlist trimmed: core/, layout/, views/ removed (folded into components/)

3.5.0

  Drop @base-ui/react dep — zero runtime npm deps
  Vendor @base-ui/react@1.4.1 as pre-bundled ESM at shadcn/lib/base-ui/ (28 entry points + shared chunks via bun build code-splitting)
  All 5 transitive deps absorbed: @floating-ui/react-dom, @floating-ui/utils, @babel/runtime, use-sync-external-store, @base-ui/utils
  React, React-DOM, react/jsx-runtime stay external as peer-resolved imports

  Rewrite shadcn/ui/*.jsx imports: @base-ui/react/X → ../lib/base-ui/X.js (32 files)
  Add scripts/vendor-base-ui.js (re-run after bumping BASE_UI_VERSION; requires bun)
  Tree-shaking preserved: bun's splitting puts shared floating-ui/utils code in _chunk-*.js files referenced by primitives that need them

  package.json dependencies block removed entirely — only peerDependencies remain
  Consumers see zero npm packages pulled in by skateboard-ui on install

3.4.0

  Drop vaul dep
  Drawer now uses @base-ui/react Dialog as the modal shell with vaul's drag-to-dismiss gesture logic ported into shadcn/ui/drawer.jsx (MIT — Emil Kowalski)
  Single hard dep tree on @base-ui/react (removes vaul + 14 transitive @radix-ui/* packages)

  Behavior preserved: open/close via open + onOpenChange, slide-up entrance, fade backdrop, click-outside, Escape, focus trap, drag-handle pill, swipe-down-to-dismiss with velocity + 25%-height thresholds
  Behavior dropped (unused by Sheet/UpgradeSheet): multi-direction (top/left/right), snap points, nested drawers, scale-background, backdrop opacity fade during drag

  shouldDrag gate ported from vaul: skips when content is scrolled mid-list, when text is selected, on <select>, or under [data-no-drag]
  Sheet.jsx and UpgradeSheet.jsx consume the same Drawer API — no consumer changes

3.3.0

  Drop Chart component
  Drop recharts peer dep

  If you used Chart, install recharts directly in your app and import its primitives from there.

3.2.1

  Fix SidebarMenuButton outline variant shadow — tokens are oklch so wrapping in hsl() produced invalid CSS and the browser dropped the shadow. Port of upstream shadcn-ui f454f6e.

3.2.0

  Vendor tailwind-merge
  Drop tailwind-merge dep
  Add scripts/vendor-tailwind-merge.js (re-run on version bumps to track new Tailwind releases)

3.1.0

  Drop Carousel component
  Drop embla-carousel-react peer dep
  Drop Resizable component
  Drop react-resizable-panels peer dep
  Drop use-sync-external-store direct dep (@base-ui/react ^1.5.0 owns it transitively)

  If you used these, import directly from embla-carousel-react / react-resizable-panels in your app

3.0.2

  Exclude .claude from npm tarball
  Add files allowlist to package.json

3.0.1

  Move vaul back to deps
  UpgradeSheet uses Drawer

3.0.0

  Vendor lucide icons
  Drop lucide-react dep
  Add icons subpath export
  Recreate clsx locally
  Recreate cva locally
  Drop class-variance-authority dep
  Recreate ThemeProvider locally
  Drop next-themes dep
  Recreate Command primitives
  Drop cmdk dep
  Remove sonner Toaster
  Drop sonner dep
  Recreate DayPicker calendar
  Drop react-day-picker dep
  Inline tailwindcss-animate utilities
  Drop tailwindcss-animate dep
  Heavy primitives now optional peer deps

  Breaking: see README "Migrating to 3.0"

2.23.0

  Rename auth view functions
  Harden PaymentView redirect check
  Replace UNSAFE_NavigationContext usage
  Consolidate app-key derivation
  Export createSkateboardApp from root
  Bump lucide-react to 1.x
  Bump dependencies

2.22.0

  Fix Layout sidebar override

2.21.0

  Reduce sidebar width to 12rem

2.20.0

  Fix hero gradient using Tailwind primary token

2.19.0

  Add colored hero gradient to default landing

2.18.0

  Fix DynamicIcon single-word icon name resolution

2.17.0

  Fix DynamicIcon forwardRef detection

2.16.0

  Fix DynamicIcon static imports

2.15.0

  Add authOverlay 401 retry logic
  Add SHOW_AUTH_OVERLAY dispatch

2.14.0

  Switch icons to Lucide React
  Update DynamicIcon Lucide loader
  Remove Tabler icon imports

2.13.0

  Fix DynamicIcon per-icon imports
  Remove lucide-react from views
  Switch views to Tabler icons

2.12.0

  Add skip-to-content link
  Add selection styling brand color
  Add content-auto utility class
  Add button active press feedback
  Add main landmark id

2.11.0

  Fix DynamicIcon lazy loading
  Remove barrel import lucide-react
  Hoist LandingView static values
  Add FeatureIcon emoji fallback

2.10.1

  Add Geist font files self-hosted
  Add @font-face declarations

2.10.0

  Fix landing page feature icons
  Add FeatureIcon DynamicIcon resolver
  Export canResolveIcon utility

2.9.9

  Add proportional radius cascade
  Add radius-2xl/3xl/4xl tokens

2.9.8

  Add useUser hook
  Add useDispatch hook
  Update README Context docs

2.9.7

  Add useSafeNavigate hook
  Fix Router context error in auth views

2.9.6

  Move AuthOverlay inside Router

2.9.5

  Reuse SignInView in AuthOverlay
  Reuse SignUpView in AuthOverlay
  Add embedded prop to views

2.9.4

  Remove unused Card imports
  Fix CardHeader indentation

2.9.3

  Simplify sidebar brand styling

2.9.2

  Fix collapsed brand icon

2.9.1

  Remove SignInView header text
  Remove SignUpView header text

2.9.0

  Improve dark mode sidebar contrast
  Update Header text size
  Remove brand hover state
  Reduce brand padding
  Add brand text shrink
  Remove nav bold on active
  Use smaller nav buttons

2.8.0

  Add content area border
  Add SettingsView sign-in card

2.7.0

  Improve light mode sidebar contrast

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





