# todo

## Icons skateboard apps use that skateboard-ui cannot vendor yet (5.15.0)

skateboard-ui vendors icons from lucide-react 0.546.0 only. These two names from the
apps' icon list have no icon in that release, so they are not exported from
`@stevederico/skateboard-ui/icons` and `ConstantsIcon` renders nothing for them.

- [ ] `SolarPanel` (constants.json `"solar-panel"`, 1 app): not in lucide-react 0.546.0.
  Lucide added `solar-panel` in a later release. Vendor it with a lucide upgrade, or
  change the app's icon string to an icon that exists in 0.546.0.
- [ ] `Workspace` (constants.json `"workspace"`, 1 app): not a Lucide icon in any
  release. The app needs a real icon name.

## Vendored react-router (5.16.0)

Done: react-router 7.18.5 (ESM dev build + types, the files its `exports` map gives to
`import`) lives in `router/`, published as `./router`, `./router/dom`, `./router/internal`.
cookie 1.1.1 and set-cookie-parser 2.7.3 are wrapped in ESM shims in `router/vendor/`.
Re-copy: `node scripts/vendor-react-router.js <rr> <cookie> <set-cookie-parser>`.
react-router left peerDependencies and devDependencies (root and `.harness/`).
Lint rule `no-react-router-import`; harness spec `router.spec.ts`.

- [ ] Watch https://github.com/remix-run/react-router/security/advisories by hand (no
  dependency, so `npm audit` and Dependabot never see the vendored copy). Re-vendor when
  an advisory applies to 7.x.
- [ ] Not vendored: react-router's `react-server` (RSC) entries. Add them only if an app
  ever uses RSC.

## No more "shadcn" paths (5.17.0)

Done: `shadcn/lib/*` moved to `lib/`, `shadcn/hooks/use-mobile.ts` to `hooks/`; the
`./shadcn/ui/*`, `./shadcn/lib/utils` and `./shadcn/hooks/use-mobile` exports are gone
(`./ui/*`, `./lib/utils`, `./hooks/use-mobile` replace them). Lint rule `no-shadcn-paths`.
Kept on purpose: upstream references (`scripts/pull-shadcn-base-vega.js`, "base-vega
source" notes) and component JSDoc about shadcn-compatible markup.

- [ ] Apps still on `./shadcn/*` paths break on 5.17.0 until they rewrite them (README
  has the mapping and a grep).
