import * as React from "react"

import { Button } from "../dist/ui/button.js"
import { Badge } from "../dist/ui/badge.js"
import { Input } from "../dist/ui/input.js"
import { Textarea } from "../dist/ui/textarea.js"
import { Label } from "../dist/ui/label.js"
import { Separator } from "../dist/ui/separator.js"
import { Skeleton } from "../dist/ui/skeleton.js"
import { Spinner } from "../dist/ui/spinner.js"
import { Kbd } from "../dist/ui/kbd.js"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../dist/ui/card.js"
import { Alert, AlertTitle, AlertDescription } from "../dist/ui/alert.js"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../dist/ui/table.js"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../dist/ui/breadcrumb.js"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../dist/ui/pagination.js"

import { Toggle } from "../dist/ui/toggle.js"
import { ToggleGroup, ToggleGroupItem } from "../dist/ui/toggle-group.js"
import { Switch } from "../dist/ui/switch.js"
import { RadioGroup, RadioGroupItem } from "../dist/ui/radio-group.js"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../dist/ui/tabs.js"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../dist/ui/accordion.js"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../dist/ui/collapsible.js"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "../dist/ui/progress.js"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../dist/ui/avatar.js"

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

export function App() {
  const [progress, setProgress] = React.useState(40)
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 p-8">
      <h1 className="text-xl font-bold">skateboard-ui — self-contained tiers</h1>

      <Section id="s-button" title="Button">
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button asChild variant="link">
          <a href="#s-button">As link (asChild)</a>
        </Button>
      </Section>

      <Section id="s-badge" title="Badge / Kbd / Spinner">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Kbd>⌘K</Kbd>
        <Spinner />
      </Section>

      <Section id="s-form" title="Input / Textarea / Label">
        <div className="flex w-64 flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="you@example.com" />
          <Textarea placeholder="Notes…" />
        </div>
      </Section>

      <Section id="s-separator" title="Separator">
        <div className="w-64">
          <div>Above</div>
          <Separator className="my-2" />
          <div className="flex h-8 items-center gap-2">
            <span>A</span>
            <Separator orientation="vertical" />
            <span>B</span>
          </div>
        </div>
      </Section>

      <Section id="s-card" title="Card / Alert / Skeleton">
        <Card className="w-64">
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description</CardDescription>
          </CardHeader>
          <CardContent>Body content</CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
        <Alert className="w-64">
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>This is an alert.</AlertDescription>
        </Alert>
        <Skeleton className="h-16 w-32" />
      </Section>

      <Section id="s-table" title="Table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Ada</TableCell>
              <TableCell>Engineer</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Linus</TableCell>
              <TableCell>Maintainer</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>

      <Section id="s-breadcrumb" title="Breadcrumb / Pagination">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Section>

      <Section id="s-toggle" title="Toggle / ToggleGroup">
        <Toggle>Bold</Toggle>
        <Toggle defaultPressed>Pressed</Toggle>
        <ToggleGroup defaultValue={["left"]}>
          <ToggleGroupItem value="left">L</ToggleGroupItem>
          <ToggleGroupItem value="center">C</ToggleGroupItem>
          <ToggleGroupItem value="right">R</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup toggleMultiple defaultValue={["b"]} variant="outline" spacing={0}>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="i">I</ToggleGroupItem>
          <ToggleGroupItem value="u">U</ToggleGroupItem>
        </ToggleGroup>
      </Section>

      <Section id="s-switch" title="Switch / RadioGroup">
        <div className="flex items-center gap-2">
          <Switch defaultChecked id="sw1" />
          <Label htmlFor="sw1">On by default</Label>
        </div>
        <Switch size="sm" />
        <RadioGroup defaultValue="a">
          <Label className="gap-2">
            <RadioGroupItem value="a" /> Option A
          </Label>
          <Label className="gap-2">
            <RadioGroupItem value="b" /> Option B
          </Label>
          <Label className="gap-2">
            <RadioGroupItem value="c" /> Option C
          </Label>
        </RadioGroup>
      </Section>

      <Section id="s-tabs" title="Tabs">
        <Tabs defaultValue="one" className="w-80">
          <TabsList>
            <TabsTrigger value="one">One</TabsTrigger>
            <TabsTrigger value="two">Two</TabsTrigger>
            <TabsTrigger value="three">Three</TabsTrigger>
          </TabsList>
          <TabsContent value="one">First panel.</TabsContent>
          <TabsContent value="two">Second panel.</TabsContent>
          <TabsContent value="three">Third panel.</TabsContent>
        </Tabs>
      </Section>

      <Section id="s-accordion" title="Accordion / Collapsible">
        <Accordion defaultValue={["item-1"]} className="w-80">
          <AccordionItem value="item-1">
            <AccordionTrigger>Section one</AccordionTrigger>
            <AccordionContent>Content for section one.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Section two</AccordionTrigger>
            <AccordionContent>Content for section two.</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Collapsible className="w-64">
          <CollapsibleTrigger className="rounded-md border px-3 py-1.5 text-sm">
            Toggle details
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-2 text-sm text-muted-foreground">
              Hidden collapsible content.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Section>

      <Section id="s-progress" title="Progress / Avatar">
        <div className="w-80">
          <Progress value={progress}>
            <ProgressLabel>Upload</ProgressLabel>
            <ProgressValue />
          </Progress>
          <div className="mt-2 flex gap-2">
            <Button size="xs" onClick={() => setProgress((p) => Math.max(0, p - 10))}>
              −10
            </Button>
            <Button size="xs" onClick={() => setProgress((p) => Math.min(100, p + 10))}>
              +10
            </Button>
          </div>
        </div>
        <Avatar size="lg">
          <AvatarImage src="https://github.com/shadcn.png" alt="user" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage src="https://invalid.example/nope.png" alt="broken" />
          <AvatarFallback>FB</AvatarFallback>
        </Avatar>
      </Section>
    </main>
  )
}
