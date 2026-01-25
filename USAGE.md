# Skateboard-UI Component Usage Guide

## Font System

Geist font family is loaded via npm package in `App.jsx`:
```jsx
import 'geist/font/sans/style.css';
import 'geist/font/mono/style.css';
```

Applied in `styles.css`:
- Sans: `font-family: 'Geist'` (body)
- Mono: `font-family: 'Geist Mono'` (code, pre, kbd elements)

## Toast Notifications

Import from sonner:
```jsx
import { toast } from 'sonner';

// Success
toast.success('Changes saved!');

// Error
toast.error('Failed to save');

// Loading
toast.loading('Saving...');

// Info
toast.info('New feature available');

// Warning
toast.warning('This action cannot be undone');

// Promise-based
toast.promise(
  fetch('/api/data'),
  {
    loading: 'Loading...',
    success: 'Data loaded!',
    error: 'Failed to load'
  }
);
```

## Skeleton Loaders

Import from SkeletonLoader:
```jsx
import { CardSkeleton, TableSkeleton, AvatarSkeleton, FormSkeleton } from '@stevederico/skateboard-ui/SkeletonLoader';

// Card skeleton
<CardSkeleton />

// Table skeleton with custom rows
<TableSkeleton rows={10} />

// Avatar skeleton
<AvatarSkeleton />

// Form skeleton
<FormSkeleton />
```

## Avatar

```jsx
import { Avatar, AvatarFallback, AvatarImage } from '@stevederico/skateboard-ui/shadcn/ui/avatar';

<Avatar size="lg">
  <AvatarImage src={user.avatar} alt={user.name} />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Sizes: sm, default, lg
```

## Badge

```jsx
import { Badge } from '@stevederico/skateboard-ui/shadcn/ui/badge';

<Badge variant="default">Pro</Badge>
<Badge variant="secondary">Beta</Badge>
<Badge variant="destructive">Expired</Badge>
<Badge variant="outline">New</Badge>
```

## Tooltip

```jsx
import { Tooltip, TooltipContent, TooltipTrigger } from '@stevederico/skateboard-ui/shadcn/ui/tooltip';

<Tooltip>
  <TooltipTrigger asChild>
    <button>Help</button>
  </TooltipTrigger>
  <TooltipContent side="right">
    Click to learn more
  </TooltipContent>
</Tooltip>

// Sides: top, right, bottom, left
```

## Alert Dialog

```jsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@stevederico/skateboard-ui/shadcn/ui/alert-dialog';

<AlertDialog>
  <AlertDialogTrigger asChild>
    <button>Delete Account</button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Checkbox

```jsx
import { Checkbox } from '@stevederico/skateboard-ui/shadcn/ui/checkbox';

const [checked, setChecked] = useState(false);

<div className="flex items-center gap-2">
  <Checkbox
    id="terms"
    checked={checked}
    onCheckedChange={setChecked}
  />
  <label htmlFor="terms">Accept terms</label>
</div>
```

## Switch

```jsx
import { Switch } from '@stevederico/skateboard-ui/shadcn/ui/switch';

const [enabled, setEnabled] = useState(false);

<div className="flex items-center gap-2">
  <Switch
    id="notifications"
    checked={enabled}
    onCheckedChange={setEnabled}
  />
  <label htmlFor="notifications">Enable notifications</label>
</div>
```

## Select

```jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@stevederico/skateboard-ui/shadcn/ui/select';

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

## Textarea

```jsx
import { Textarea } from '@stevederico/skateboard-ui/shadcn/ui/textarea';

<Textarea
  placeholder="Enter your message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
```

## Alert

```jsx
import { Alert, AlertDescription, AlertTitle } from '@stevederico/skateboard-ui/shadcn/ui/alert';

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    Your subscription expires in 3 days.
  </AlertDescription>
</Alert>
```

## Progress

```jsx
import { Progress } from '@stevederico/skateboard-ui/shadcn/ui/progress';

<Progress value={66} className="w-full" />
```

## Dropdown Menu

```jsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@stevederico/skateboard-ui/shadcn/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger>Profile</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Sign Out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Dark Mode Support

All components support dark mode automatically via the `next-themes` provider. Colors are defined in `styles.css` using CSS variables that adapt to the theme.

## Customization

All components use Tailwind utility classes and can be customized via the `className` prop:

```jsx
<Badge className="text-lg px-4 py-2" variant="default">
  Custom Badge
</Badge>
```
