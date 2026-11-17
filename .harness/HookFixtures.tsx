import * as React from "react"

import { useEventListener } from "../dist/hooks/use-event-listener.js"
import { useMediaQuery } from "../dist/hooks/use-media-query.js"
import { useIsMobile } from "../dist/hooks/use-mobile.js"
import { useInterval } from "../dist/hooks/use-interval.js"
import { useTimeout } from "../dist/hooks/use-timeout.js"
import { useStoredState } from "../dist/hooks/use-stored-state.js"
import { useMountEffect } from "../dist/hooks/use-mount-effect.js"
import * as Root from "../dist/index.js"

function log(entry: string) {
  const w = window as Window & { __hookLog?: string[] }
  w.__hookLog ??= []
  w.__hookLog.push(entry)
}

function Listener({ target, count }: { target: React.RefObject<HTMLButtonElement | null> | null; count: number }) {
  useEventListener(target, "click", (event) => log(`click:${(event.currentTarget as HTMLElement).textContent}:${count}`))
  useEventListener(window, "keydown", (event) => log(`key:${event.key}:${count}`))
  return null
}

function EventListenerFx() {
  const aRef = React.useRef<HTMLButtonElement>(null)
  const bRef = React.useRef<HTMLButtonElement>(null)
  const [mounted, setMounted] = React.useState(true)
  const [which, setWhich] = React.useState<"a" | "b" | "none">("a")
  const [count, setCount] = React.useState(0)
  const target = which === "a" ? aRef : which === "b" ? bRef : null
  return (
    <section data-testid="fx-event-listener">
      <button ref={aRef}>Target A</button>
      <button ref={bRef}>Target B</button>
      <button onClick={() => setMounted((m) => !m)}>Toggle mount</button>
      <button onClick={() => setWhich("a")}>Use A</button>
      <button onClick={() => setWhich("b")}>Use B</button>
      <button onClick={() => setWhich("none")}>Use none</button>
      <button onClick={() => setCount((n) => n + 1)}>Bump</button>
      <div data-testid="el-mounted">{String(mounted)}</div>
      {mounted && <Listener target={target} count={count} />}
    </section>
  )
}

function MediaFx() {
  const mobile = useIsMobile()
  const dark = useMediaQuery("(prefers-color-scheme: dark)")
  return (
    <section data-testid="fx-media">
      <div data-testid="media-mobile">{String(mobile)}</div>
      <div data-testid="media-dark">{String(dark)}</div>
    </section>
  )
}

function TimersFx() {
  const [running, setRunning] = React.useState(true)
  const [step, setStep] = React.useState(1)
  const [total, setTotal] = React.useState(0)
  const [armed, setArmed] = React.useState(false)
  const [fired, setFired] = React.useState(0)
  useInterval(() => setTotal((t) => t + step), running ? 1000 : null)
  useTimeout(() => setFired((f) => f + 1), armed ? 2000 : null)
  return (
    <section data-testid="fx-timers">
      <button onClick={() => setRunning((r) => !r)}>Toggle interval</button>
      <button onClick={() => setStep(10)}>Step 10</button>
      <button onClick={() => setArmed((a) => !a)}>Toggle timeout</button>
      <div data-testid="timer-total">{total}</div>
      <div data-testid="timer-fired">{fired}</div>
    </section>
  )
}

function StoredFx() {
  const area = new URLSearchParams(window.location.search).get("area") === "session" ? "session" : "local"
  const [value, setValue] = useStoredState("harness-stored", { n: 0 }, { storage: area })
  return (
    <section data-testid="fx-stored">
      <button onClick={() => setValue((v) => ({ n: v.n + 1 }))}>Increment</button>
      <div data-testid="stored-n">{value.n}</div>
    </section>
  )
}

function MountChild({ n }: { n: number }) {
  useMountEffect(() => {
    log("mount")
    return () => log("unmount")
  })
  return <div data-testid="mount-n">{n}</div>
}

function MountFx() {
  const [shown, setShown] = React.useState(true)
  const [n, setN] = React.useState(0)
  return (
    <section data-testid="fx-mount">
      <button onClick={() => setN((x) => x + 1)}>Rerender</button>
      <button onClick={() => setShown((s) => !s)}>Toggle child</button>
      {shown && <MountChild n={n} />}
    </section>
  )
}

function RootExportsFx() {
  const names = ["useQuery", "useListData", "useEventListener", "useMediaQuery", "useIsMobile", "useInterval", "useTimeout", "useStoredState", "useMountEffect"]
  const exported = Root as unknown as Record<string, unknown>
  return <div data-testid="root-exports">{names.filter((n) => typeof exported[n] === "function").join(",")}</div>
}

export const HOOK_FIXTURES: Record<string, React.ReactNode> = {
  "hook-event-listener": <EventListenerFx />,
  "hook-media": <MediaFx />,
  "hook-timers": <TimersFx />,
  "hook-stored": <StoredFx />,
  "hook-mount": <MountFx />,
  "hook-root-exports": <RootExportsFx />,
}
