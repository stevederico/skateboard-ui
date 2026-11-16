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
