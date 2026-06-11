import * as React from "react"

import { Button } from "../dist/ui/button.js"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../dist/ui/dialog.js"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../dist/ui/popover.js"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../dist/ui/select.js"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../dist/ui/tabs.js"
import { RadioGroup, RadioGroupItem } from "../dist/ui/radio-group.js"
import { Slider } from "../dist/ui/slider.js"

function SlotCompose() {
  // Counts consumer-handler invocations to prove Slot composes (doesn't clobber).
  const [consumerClicks, setConsumerClicks] = React.useState(0)
  return (
    <section data-testid="fx-slot-compose">
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={() => setConsumerClicks((c) => c + 1)}>
            Open (asChild + own onClick)
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Composed</DialogTitle>
        </DialogContent>
      </Dialog>
      <div data-testid="consumer-clicks">{consumerClicks}</div>
    </section>
  )
}

function EscapeStack() {
  return (
    <section data-testid="fx-escape-stack">
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Outer dialog</DialogTitle>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open inner popover</Button>
            </PopoverTrigger>
            <PopoverContent>Inner popover body</PopoverContent>
          </Popover>
        </DialogContent>
      </Dialog>
    </section>
  )
}

function SelectDefault() {
  return (
    <section data-testid="fx-select-default">
      <Select defaultValue="banana">
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
        </SelectContent>
      </Select>
    </section>
  )
}

function TabSpace() {
  return (
    <section data-testid="fx-tab-space">
      <Tabs defaultValue="my account">
        <TabsList>
          <TabsTrigger value="my account">Account</TabsTrigger>
          <TabsTrigger value="billing info">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="my account">Account panel</TabsContent>
        <TabsContent value="billing info">Billing panel</TabsContent>
      </Tabs>
    </section>
  )
}

function RadioForm() {
  return (
    <section data-testid="fx-radio-form">
      <form
        data-testid="radio-form"
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.currentTarget)
          const out = document.querySelector("[data-testid=radio-form-result]")
          if (out) out.textContent = String(data.get("plan") ?? "")
        }}
      >
        <RadioGroup name="plan" defaultValue="pro">
          <RadioGroupItem value="free" />
          <RadioGroupItem value="pro" />
          <RadioGroupItem value="team" />
        </RadioGroup>
        <button type="submit">Submit</button>
      </form>
      <div data-testid="radio-form-result" />
    </section>
  )
}

function SliderFx() {
  return (
    <section data-testid="fx-slider">
      <Slider defaultValue={[40]} max={100} step={1} className="w-64" />
    </section>
  )
}

const FIXTURES: Record<string, React.ReactNode> = {
  "slot-compose": <SlotCompose />,
  "escape-stack": <EscapeStack />,
  "select-default": <SelectDefault />,
  "tab-space": <TabSpace />,
  "radio-form": <RadioForm />,
  slider: <SliderFx />,
}

/**
 * Isolated, deterministic fixtures for behaviors the demo page doesn't cover
 * cleanly. Each test loads exactly one fixture via `?fx=<name>` so a modal/
 * focus-trapping fixture can't contaminate the others. Served at /tests.html.
 */
export function Fixtures() {
  const name = new URLSearchParams(window.location.search).get("fx")
  return (
    <main className="flex flex-col gap-10 p-8">
      {name ? FIXTURES[name] ?? <div>unknown fixture: {name}</div> : (
        <ul>
          {Object.keys(FIXTURES).map((k) => (
            <li key={k}>
              <a href={`?fx=${k}`}>{k}</a>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
