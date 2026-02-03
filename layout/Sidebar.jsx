import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DynamicIcon from "../core/DynamicIcon.jsx";
import { getState } from "../core/Context.jsx";
import { Avatar, AvatarFallback } from "../shadcn/ui/avatar.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/ui/dropdown-menu.jsx";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "../shadcn/ui/sidebar";
import { ChevronsUpDown, LogOut, Settings, CreditCard, Bell } from "lucide-react";

/**
 * Desktop navigation sidebar using shadcn primitives.
 *
 * Renders app pages from constants.pages with DynamicIcon icons,
 * tooltip support when collapsed, settings pushed to bottom,
 * and a NavUser dropdown footer with avatar, account, billing, and logout.
 *
 * @returns {JSX.Element} Sidebar navigation
 *
 * @example
 * import Sidebar from '@stevederico/skateboard-ui/Sidebar';
 *
 * <Sidebar />
 */
export default function Sidebar({ variant = "inset", ...props }) {
  const { open } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = (location.pathname.split("/")[2] || "").toLowerCase();
  const { state } = getState();
  const constants = state.constants;
  const user = state.user;

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email
      ? user.email[0].toUpperCase()
      : "U";

  return (
    <SidebarRoot collapsible="icon" variant={variant} {...props}>
      {/* Header: App icon + name */}
      {!constants.hideSidebarHeader && (
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                onClick={() => navigate("/app")}
                tooltip={constants.appName}
              >
                <div className="bg-app dark:border rounded-lg flex aspect-square size-8 items-center justify-center">
                  <DynamicIcon
                    name={constants.appIcon}
                    size={20}
                    color="white"
                    strokeWidth={2}
                  />
                </div>
                <span className="font-semibold text-lg truncate">
                  {constants.appName}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      )}

      {/* Main navigation from constants.pages */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{constants.appName}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {constants.pages.map((item) => {
                const isActive = currentPage === item.url.toLowerCase();
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      onClick={() =>
                        navigate(`/app/${item.url.toLowerCase()}`)
                      }
                    >
                      <DynamicIcon
                        name={item.icon}
                        size={18}
                        strokeWidth={1.5}
                      />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer: NavUser + Settings */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={location.pathname.toLowerCase().includes("settings")}
              tooltip="Settings"
              onClick={() => navigate("/app/settings")}
            >
              <Settings size={18} strokeWidth={1.5} />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarSeparator />
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <SidebarMenuButton
                  size="lg"
                  render={<div />}
                >
                  <Avatar>
                    <AvatarFallback>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.name || "User"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email || ""}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-56"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarFallback>
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user?.name || "User"}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {user?.email || ""}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => navigate("/app/settings")}
                  >
                    <Settings />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/app/settings?tab=billing")}
                  >
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/app/settings?tab=notifications")}
                  >
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/signout")}
                >
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </SidebarRoot>
  );
}
