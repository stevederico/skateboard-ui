import * as React from "react"

import { Dialog, DialogContent, DialogTitle } from "../dist/ui/dialog.js"
import { Drawer, DrawerContent, DrawerTitle } from "../dist/ui/drawer.js"
import { Slider } from "../dist/ui/slider.js"
import { useFloating } from "../dist/ui/use-floating.js"
import { Avatar, AvatarImage, AvatarFallback } from "../dist/ui/avatar.js"
import { ContextProvider, useDispatch } from "../dist/components/core/Context.js"
import AuthOverlay from "../dist/components/AuthOverlay.js"
import { MemoryRouter } from "../dist/router/index.mjs"

const PIXEL_PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="

const MIN_GAP = 10

function DialogBackdropPress() {
  return (
    <section data-testid="fx-dialog-backdrop">
      <Dialog defaultOpen>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Backdrop press</DialogTitle>
          <p data-testid="dialog-text">Drag to select this text</p>
        </DialogContent>
      </Dialog>
    </section>
  )
}

function DrawerDragDismiss() {
  return (
    <section data-testid="fx-drawer-drag">
      <Drawer defaultOpen>
        <DrawerContent>
          <DrawerTitle>Drag me down</DrawerTitle>
          <div data-testid="drawer-body" className="h-40">Drawer body</div>
        </DrawerContent>
      </Drawer>
    </section>
  )
}

function SliderMinGap() {
  const [values, setValues] = React.useState([20, 30])
  return (
    <section data-testid="fx-slider-gap">
      <Slider
        value={values}
        onValueChange={(next) =>
          setValues(next[1] - next[0] < MIN_GAP ? [next[0], next[0] + MIN_GAP] : next)
        }
        max={100}
        step={1}
        className="w-64"
      />
      <div data-testid="slider-gap-values">{values.join(",")}</div>
    </section>
  )
}

function LateFloating() {
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const { floatingRef, pos } = useFloating(anchorRef, true, { side: "bottom" })
  const [attached, setAttached] = React.useState(false)
  return (
    <section data-testid="fx-late-floating">
      <button ref={anchorRef} onClick={() => setAttached(true)}>
        Attach floating
      </button>
      {attached ? <div ref={floatingRef}>Floating</div> : null}
      <div data-testid="floating-pos">{pos ? "positioned" : "none"}</div>
    </section>
  )
}

function AvatarEmptySrc() {
  const [src, setSrc] = React.useState(PIXEL_PNG)
  return (
    <section data-testid="fx-avatar-empty-src">
      <Avatar>
        <AvatarImage src={src} alt="pixel" />
        <AvatarFallback>ES</AvatarFallback>
      </Avatar>
      <button onClick={() => setSrc("")}>Clear src</button>
    </section>
  )
}

const AUTH_CONSTANTS = { appName: "Harness Auth", appIcon: "command", backendURL: "/harness-api", devBackendURL: "/harness-api" }

function ParkAuthCallback() {
  const dispatch = useDispatch()
  return (
    <button
      onClick={() =>
        dispatch({
          type: "SHOW_AUTH_OVERLAY",
          payload: (outcome) => {
            const w = window as Window & { __authOutcomes?: string[] }
            w.__authOutcomes ??= []
            w.__authOutcomes.push(outcome)
          },
        })
      }
    >
      Park callback
    </button>
  )
}

function AuthOverlayCallbacks() {
  return (
    <section data-testid="fx-auth-overlay">
      <ContextProvider constants={AUTH_CONSTANTS}>
        <MemoryRouter>
          <ParkAuthCallback />
          <AuthOverlay />
        </MemoryRouter>
      </ContextProvider>
    </section>
  )
}

export const INVARIANT_FIXTURES: Record<string, React.ReactNode> = {
  "dialog-backdrop": <DialogBackdropPress />,
  "drawer-drag": <DrawerDragDismiss />,
  "slider-gap": <SliderMinGap />,
  "late-floating": <LateFloating />,
  "avatar-empty-src": <AvatarEmptySrc />,
  "auth-overlay": <AuthOverlayCallbacks />,
}
