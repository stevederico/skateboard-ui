# TODO

- Release two fixes (already changed in source): (1) `/app/home` → `/app` auth-redirect (App.tsx, PaymentView.tsx); (2) Drawer base missing `text-foreground` (ui/drawer.tsx) — native `<dialog>` leaks UA `CanvasText`, making unstyled text invisible in dark mode; sheet/dialog/alert-dialog already had it. Bump version, publish, update consumer apps so they inherit and can drop their app-level workarounds (BXBaby: AuthRedirect override + BabyDetailsSheet `text-foreground`).
