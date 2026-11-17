import * as React from "react"

import { HOOK_FIXTURES } from "./HookFixtures.js"
import { QUERY_FIXTURES } from "./QueryFixtures.js"
import { INVARIANT_FIXTURES } from "./InvariantFixtures.js"

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
  PopoverTitle,
  PopoverDescription,
} from "../dist/ui/popover.js"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../dist/ui/dropdown-menu.js"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "../dist/ui/sheet.js"
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
import { Checkbox } from "../dist/ui/checkbox.js"
import { MemoryRouter } from "../dist/router/index.mjs"
import { ContextProvider } from "../dist/components/core/Context.js"
import SettingsView from "../dist/components/views/SettingsView.js"
import {
  initializeUtilities,
  isPaidStatus,
  isSubscriber,
  showUpgradeSheet,
} from "../dist/components/core/Utilities.js"
import ConstantsIcon from "../dist/components/core/constantsIcon.js"
import {
  AlertCircle,
  CircleAlert,
  Loader2,
  LoaderCircle,
  MoreHorizontal,
  Ellipsis,
  SquarePen,
  PenSquare,
  Twitter,
  Wrench,
} from "../dist/icons/index.js"

function SlotCompose() {
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

function PopoverFocus() {
  return (
    <section data-testid="fx-popover-focus">
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Button data-testid="inside-button">Inside</Button>
        </PopoverContent>
      </Popover>
    </section>
  )
}

function TabsNoDefault() {
  return (
    <section data-testid="fx-tabs-nodefault">
      <Tabs>
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">One panel</TabsContent>
        <TabsContent value="two">Two panel</TabsContent>
      </Tabs>
    </section>
  )
}

function RadioNoDefault() {
  return (
    <section data-testid="fx-radio-nodefault">
      <RadioGroup>
        <RadioGroupItem value="free" />
        <RadioGroupItem value="pro" />
        <RadioGroupItem value="team" />
      </RadioGroup>
    </section>
  )
}


function PopoverTitled() {
  return (
    <section data-testid="fx-popover-titled">
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Account</PopoverTitle>
          <PopoverDescription>Manage your settings</PopoverDescription>
        </PopoverContent>
      </Popover>
    </section>
  )
}

function DropdownFx() {
  return (
    <section data-testid="fx-dropdown">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  )
}

function SliderForm() {
  return (
    <section data-testid="fx-slider-form">
      <form
        data-testid="slider-form"
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.currentTarget)
          const out = document.querySelector("[data-testid=slider-form-result]")
          if (out) out.textContent = String(data.get("volume") ?? "")
        }}
      >
        <Slider name="volume" defaultValue={[30]} max={100} step={1} aria-label="Volume" className="w-64" />
        <button type="submit">Submit</button>
      </form>
      <div data-testid="slider-form-result" />
    </section>
  )
}

function NestedLock() {
  return (
    <section data-testid="fx-nested-lock">
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Outer dialog</DialogTitle>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Open sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle>Inner sheet</SheetTitle>
              <SheetClose asChild>
                <Button>Close sheet</Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </DialogContent>
      </Dialog>
    </section>
  )
}

function CheckboxIndeterminate() {
  return (
    <section data-testid="fx-checkbox-indeterminate">
      <Checkbox defaultChecked="indeterminate" aria-label="Select all" />
    </section>
  )
}

const SUB_CONSTANTS = { appName: "Harness Sub", companyEmail: "a@b.c", version: "1" }
function SubscriptionStatus() {
  const status = new URLSearchParams(window.location.search).get("status")
  const [shown, setShown] = React.useState(0)
  const [ready] = React.useState(() => {
    initializeUtilities(SUB_CONSTANTS)
    const user = { name: "Trial User", email: "t@u.co", ...(status ? { subscription: { status } } : {}) }
    localStorage.setItem("harness-sub_user", JSON.stringify(user))
    return true
  })
  const ref = React.useRef({ show: () => setShown((n) => n + 1) })
  if (!ready) return null
  return (
    <section data-testid="fx-subscription">
      <div data-testid="paid-statuses">
        {["active", "trialing", "canceled", "past_due", "incomplete", ""].map((s) =>
          `${s || "empty"}=${isPaidStatus(s)}`
        ).join(" ")} null={String(isPaidStatus(null))} undefined={String(isPaidStatus(undefined))}
      </div>
      <Button onClick={() => showUpgradeSheet(ref)}>Try upgrade</Button>
      <div data-testid="upgrade-shown">{shown}</div>
      <ContextProvider constants={SUB_CONSTANTS}>
        <MemoryRouter>
          <SettingsView />
        </MemoryRouter>
      </ContextProvider>
    </section>
  )
}

const ISSUB_CONSTANTS = { appName: "Harness IsSub", backendURL: "/harness-api", devBackendURL: "/harness-api" }
function IsSubscriberFx() {
  const [result, setResult] = React.useState("pending")
  React.useEffect(() => {
    initializeUtilities(ISSUB_CONSTANTS)
    document.cookie = "csrf_token=harness-csrf; path=/"
    isSubscriber().then((v) => setResult(String(v)))
  }, [])
  return (
    <section data-testid="fx-is-subscriber">
      <div data-testid="is-subscriber">{result}</div>
    </section>
  )
}

const ICON_FX = { AlertCircle, Loader2, MoreHorizontal, SquarePen, PenSquare, Twitter, Wrench }
const CONSTANTS_ICON_NAMES = ["flag", "factory", "ev-charger", "git-pull-request", "corner-up-right", "arrow-right-left", "solar-panel", "workspace"]
function IconsFx() {
  return (
    <section data-testid="fx-icons">
      <div data-testid="alias-identity">
        {String(AlertCircle === CircleAlert && Loader2 === LoaderCircle && MoreHorizontal === Ellipsis && PenSquare === SquarePen)}
      </div>
      {Object.entries(ICON_FX).map(([name, Icon]) => (
        <span key={name} data-testid={`icon-${name}`}>
          <Icon size={16} />
        </span>
      ))}
      {CONSTANTS_ICON_NAMES.map((name) => (
        <span key={name} data-testid={`constants-${name}`}>
          <ConstantsIcon name={name} size={16} />
        </span>
      ))}
    </section>
  )
}

const FIXTURES: Record<string, React.ReactNode> = {
  icons: <IconsFx />,
  subscription: <SubscriptionStatus />,
  "is-subscriber": <IsSubscriberFx />,
  "checkbox-indeterminate": <CheckboxIndeterminate />,
  "slot-compose": <SlotCompose />,
  "escape-stack": <EscapeStack />,
  "select-default": <SelectDefault />,
  "tab-space": <TabSpace />,
  "radio-form": <RadioForm />,
  slider: <SliderFx />,
  "popover-focus": <PopoverFocus />,
  "tabs-nodefault": <TabsNoDefault />,
  "radio-nodefault": <RadioNoDefault />,
  "popover-titled": <PopoverTitled />,
  dropdown: <DropdownFx />,
  "slider-form": <SliderForm />,
  "nested-lock": <NestedLock />,
  ...QUERY_FIXTURES,
  ...HOOK_FIXTURES,
  ...INVARIANT_FIXTURES,
}

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
