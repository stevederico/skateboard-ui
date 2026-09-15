import type { ComponentType, SVGProps } from 'react';
import {
  Anchor,
  Apple,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Beer,
  Bell,
  Bolt,
  BookOpen,
  BookUser,
  Bookmark,
  Bot,
  Briefcase,
  Calendar,
  CalendarCheck,
  Camera,
  Car,
  ChartBar,
  ChartColumn,
  ChartLine,
  ChartNoAxesColumn,
  ChartNoAxesColumnIncreasing,
  Check,
  CircleAlert,
  CircleCheck,
  CircleHelp,
  CircleUserRound,
  Clapperboard,
  ClipboardCheck,
  Club,
  Columns2,
  Command,
  Compass,
  Copy,
  Cpu,
  CreditCard,
  Database,
  Diamond,
  Dices,
  DollarSign,
  Download,
  Eye,
  File,
  FileSearch,
  FileText,
  Film,
  Filter,
  Flame,
  FlaskConical,
  Folder,
  Gauge,
  GitBranch,
  Globe,
  GraduationCap,
  Ham,
  Hammer,
  Headphones,
  Headset,
  Heart,
  HeartPulse,
  History,
  Home,
  Hospital,
  House,
  Image,
  Images,
  Inbox,
  Key,
  Landmark,
  LayoutDashboard,
  LayoutList,
  LayoutTemplate,
  Leaf,
  Library,
  LifeBuoy,
  List,
  ListTodo,
  Lock,
  Map,
  MapPin,
  MessageCircle,
  MessageCircleMore,
  MessageSquare,
  MessagesSquare,
  Mic,
  MonitorPlay,
  MonitorSmartphone,
  Moon,
  Package,
  Palette,
  ParkingMeter,
  PenLine,
  PenSquare,
  PiggyBank,
  Plane,
  Play,
  Podcast,
  Plus,
  QrCode,
  Quote,
  Radio,
  Receipt,
  Repeat,
  Ribbon,
  Rocket,
  Scale,
  ScanBarcode,
  ScanText,
  School,
  Scissors,
  Search,
  Send,
  Settings,
  Share2,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Square,
  SquareCheck,
  Star,
  Stethoscope,
  Subtitles,
  Sun,
  Swords,
  Table,
  Tags,
  Target,
  Telescope,
  TestTube,
  Ticket,
  Trash2,
  TreePine,
  TrendingDown,
  TrendingUp,
  Tv,
  Type,
  User,
  UserPlus,
  Users,
  UsersRound,
  Utensils,
  Video,
  Volleyball,
  Wallet,
  WalletCards,
  WalletMinimal,
  WandSparkles,
  Workflow,
  X,
  Zap,
} from 'lucide-react';

type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }>;

/**
 * Convert a kebab-case, snake_case, or space-separated string to PascalCase.
 *
 * @param {string} str - Input string
 * @returns {string} PascalCase version
 */
function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Strip a legacy Tabler-style `Icon` prefix when present.
 *
 * @param {string} name - Icon name in any case format
 * @returns {string} PascalCase lucide export name
 */
function toIconName(name: string): string {
  let stripped = name;
  if (stripped.startsWith('Icon') && stripped.length > 4 && stripped[4] === stripped[4].toUpperCase()) {
    stripped = stripped.slice(4);
  }
  return /[-_\s]/.test(stripped)
    ? toPascalCase(stripped)
    : stripped.charAt(0).toUpperCase() + stripped.slice(1);
}

/**
 * Curated Lucide icons used by the shell and by `constants.json` icon strings
 * across skateboard apps. Kept explicit so DynamicIcon never star-imports the
 * full icon set (which defeated tree-shaking for every consumer).
 *
 * Named imports from `@stevederico/skateboard-ui/icons` or `lucide-react` still
 * reach the full set. Unknown DynamicIcon names render nothing.
 */
const ICON_REGISTRY: Record<string, LucideIcon> = {
  Anchor,
  Apple,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Beer,
  Bell,
  Bolt,
  BookOpen,
  BookUser,
  Bookmark,
  Bot,
  Briefcase,
  Calendar,
  CalendarCheck,
  Camera,
  Car,
  ChartBar,
  ChartColumn,
  ChartLine,
  ChartNoAxesColumn,
  ChartNoAxesColumnIncreasing,
  // Legacy kebab aliases that lucide renamed.
  BarChart2: ChartNoAxesColumn,
  BarChart3: ChartColumn,
  LineChart: ChartLine,
  Check,
  CircleAlert,
  CircleCheck,
  CircleHelp,
  CircleUserRound,
  Clapperboard,
  ClipboardCheck,
  Club,
  Columns2,
  Command,
  Compass,
  Copy,
  Cpu,
  CreditCard,
  Database,
  Diamond,
  Dices,
  DollarSign,
  Download,
  Eye,
  File,
  FileSearch,
  FileText,
  Film,
  Filter,
  Flame,
  FlaskConical,
  Folder,
  Gauge,
  GitBranch,
  Globe,
  GraduationCap,
  Ham,
  Hammer,
  Headphones,
  Headset,
  Heart,
  HeartPulse,
  History,
  Home,
  Hospital,
  House,
  Image,
  Images,
  Inbox,
  Key,
  Landmark,
  LayoutDashboard,
  LayoutList,
  LayoutTemplate,
  Leaf,
  Library,
  LifeBuoy,
  List,
  ListTodo,
  Lock,
  Map,
  MapPin,
  MessageCircle,
  MessageCircleMore,
  MessageSquare,
  MessagesSquare,
  Mic,
  MonitorPlay,
  MonitorSmartphone,
  Moon,
  Package,
  Palette,
  ParkingMeter,
  PenLine,
  PenSquare,
  PiggyBank,
  Plane,
  Play,
  Podcast,
  Plus,
  QrCode,
  Quote,
  Radio,
  Receipt,
  Repeat,
  Ribbon,
  Rocket,
  Scale,
  ScanBarcode,
  ScanText,
  School,
  Scissors,
  Search,
  Send,
  Settings,
  Share2,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Square,
  SquareCheck,
  Star,
  Stethoscope,
  Subtitles,
  Sun,
  Swords,
  Table,
  Tags,
  Target,
  Telescope,
  TestTube,
  Ticket,
  Trash2,
  TreePine,
  TrendingDown,
  TrendingUp,
  Tv,
  Type,
  User,
  UserPlus,
  Users,
  UsersRound,
  Utensils,
  Video,
  Volleyball,
  Wallet,
  WalletCards,
  WalletMinimal,
  WandSparkles,
  Workflow,
  X,
  Zap,
};

/**
 * Check if a name string can be resolved to a curated Lucide icon.
 *
 * @param {string} name - Icon name to check
 * @returns {boolean} True if the icon is in the DynamicIcon registry
 */
export function canResolveIcon(name: string): boolean {
  return Boolean(ICON_REGISTRY[toIconName(name)]);
}

/**
 * Render a Lucide icon by name string from the curated registry.
 *
 * Accepts kebab-case ("layout-dashboard"), PascalCase ("LayoutDashboard"),
 * or legacy prefixed ("IconLayoutDashboard") names. Icons outside the
 * registry are not rendered — import them by name from
 * `@stevederico/skateboard-ui/icons` or `lucide-react` instead.
 *
 * @param {Object} props
 * @param {string} props.name - Icon name (e.g. "home", "arrow-right", "Settings")
 * @param {number} [props.size=24] - Icon size in pixels
 * @param {string} [props.color='currentColor'] - Icon stroke color
 * @param {number} [props.strokeWidth=2] - Stroke width
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element|null} Rendered icon or null if not found
 *
 * @example
 * import DynamicIcon from '@stevederico/skateboard-ui/DynamicIcon';
 *
 * <DynamicIcon name="home" size={24} />
 * <DynamicIcon name="arrow-right" size={20} color="red" />
 * <DynamicIcon name="settings" className="text-muted-foreground" />
 */
export interface DynamicIconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  [key: string]: unknown;
}

const DynamicIcon = ({
  name,
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className,
  ...props
}: DynamicIconProps) => {
  const Icon = ICON_REGISTRY[toIconName(name)];
  if (!Icon) return null;
  return (
    <Icon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
};

export default DynamicIcon;
