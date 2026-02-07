import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DynamicIcon from "../core/DynamicIcon.jsx";
import { getState } from "../core/Context.jsx";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "../shadcn/ui/sidebar";
import { Settings } from "lucide-react";

/**
 * Desktop navigation sidebar using shadcn primitives.
 *
 * Renders app pages from constants.pages with DynamicIcon icons,
 * tooltip support when collapsed, and settings pushed to the footer.
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

  return (
    <SidebarRoot collapsible="icon" variant={variant} {...props}>
      {/* Header: App icon + name */}
      {!constants.hideSidebarHeader && (
        <SidebarHeader className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="sm"
                onClick={() => navigate("/app")}
                tooltip={constants.appName}
                className="hover:bg-transparent active:bg-transparent"
              >
                <div className="bg-app flex items-center justify-center shrink-0 rounded-lg size-8 -ml-2">
                  <DynamicIcon
                    name={constants.appIcon}
                    strokeWidth={2}
                    className="text-white"
                  />
                </div>
                <span className="font-semibold text-lg shrink min-w-0 truncate">
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
          <SidebarGroupContent>
            <SidebarMenu>
              {constants.pages.map((item) => {
                const isActive = currentPage === item.url.toLowerCase();
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      size="sm"
                      className="data-active:font-normal"
                      onClick={() =>
                        navigate(`/app/${item.url.toLowerCase()}`)
                      }
                    >
                      <DynamicIcon
                        name={item.icon}
                        size={20}
                        strokeWidth={2}
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

      {/* Footer: Settings */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={location.pathname.toLowerCase().includes("settings")}
              tooltip="Settings"
              size="sm"
              className="data-active:font-normal"
              onClick={() => navigate("/app/settings")}
            >
              <Settings size={20} strokeWidth={2} />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </SidebarRoot>
  );
}
