import * as React from "react"

import { initializeUtilities, useListData, useQuery } from "../dist/components/core/Utilities.js"

type HookWindow = Window & {
  __hookLog?: string[]
  __resolve?: Record<string, (value: { v: string }) => void>
}

function log(entry: string) {
  const w = window as HookWindow
  w.__hookLog ??= []
  w.__hookLog.push(entry)
}

const params = () => new URLSearchParams(window.location.search)

const QUERY_CONSTANTS = { appName: "Harness Query", backendURL: "/harness-api", devBackendURL: "/harness-api" }

function useHarnessApi() {
  const [ready] = React.useState(() => {
    initializeUtilities(QUERY_CONSTANTS)
    return true
  })
  return ready
}

function manualFetcher(key: string | null) {
  return (signal: AbortSignal) =>
    new Promise<{ v: string }>((resolve, reject) => {
      log(`start:${key}`)
      signal.addEventListener("abort", () => {
        log(`abort:${key}`)
        reject(new DOMException("Aborted", "AbortError"))
      })
      const w = window as HookWindow
      w.__resolve ??= {}
      w.__resolve[String(key)] = resolve
    })
}

function QueryFx() {
  useHarnessApi()
  const p = params()
  const live = p.get("live") ? Number(p.get("live")) : undefined
  const manual = p.get("fetcher") === "manual"
  const [key, setKey] = React.useState<string | null>(p.get("key") === "null" ? null : "/q/a")
  const [renders, setRenders] = React.useState(0)
  const { data, loading, error, refetch, setData } = useQuery<{ v: string }>(
    key,
    manual ? manualFetcher(key) : undefined,
    { live, initial: { v: "initial" } },
  )
  return (
    <section data-testid="fx-query">
      <button onClick={() => setKey("/q/a")}>Key A</button>
      <button onClick={() => setKey("/q/b")}>Key B</button>
      <button onClick={() => setKey(null)}>Key null</button>
      <button onClick={() => void refetch()}>Refetch</button>
      <button onClick={() => setData({ v: "local" })}>Set local</button>
      <button onClick={() => setRenders((n) => n + 1)}>Rerender</button>
      <div data-testid="q-data">{data.v}</div>
      <div data-testid="q-loading">{String(loading)}</div>
      <div data-testid="q-error">{error ?? "none"}</div>
      <div data-testid="q-renders">{renders}</div>
    </section>
  )
}

function ListFx() {
  useHarnessApi()
  const { data, loading, error } = useListData<{ n: number }>("/list", (a, b) => a.n - b.n)
  return (
    <section data-testid="fx-list">
      <div data-testid="list-data">{data.map((row) => row.n).join(",")}</div>
      <div data-testid="list-loading">{String(loading)}</div>
      <div data-testid="list-error">{error ?? "none"}</div>
    </section>
  )
}

export const QUERY_FIXTURES: Record<string, React.ReactNode> = {
  "hook-query": <QueryFx />,
  "hook-list": <ListFx />,
}
