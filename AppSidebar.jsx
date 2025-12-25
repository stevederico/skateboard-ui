import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import constants from "@/constants.json";
import DynamicIcon from "./DynamicIcon.jsx";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarRail,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "./shadcn/ui/sidebar";


// Use this if your DynamicIcon import isn't working
const DynamicIconComponent = DynamicIcon

export default function AppSidebar() {
  const { open, setOpen } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = (location.pathname.split("/")[2] || "").toLowerCase();

  const handleNavigation = (url) => {
    navigate(url);
  };

  return (
    <Sidebar 
      collapsible="icon" 
      className="min-w-[40px]"
      style={{ '--sidebar-width': '12rem' }}
    >
      {!constants.hideSidebarHeader && (
        <SidebarHeader className="p-0">
          <SidebarMenu>
            <div className={`flex flex-row m-2 mt-4 mb-4 items-center  ${open ? "ml-3" : "justify-center ml-2"}`}>
              <div className="bg-app dark:border rounded-lg flex aspect-square size-10 items-center justify-center">
                <DynamicIconComponent
                  name={constants.appIcon}
                  size={28}
                  color="white"
                  strokeWidth={2}
                />
              </div>
              {open && <div className="font-semibold ml-2 text-xl">{constants.appName}</div>}
            </div>
          </SidebarMenu>
        </SidebarHeader>
      )}
      <SidebarContent>
        <ul
          className={`flex flex-col gap-1 p-2 ${open ? "" : "items-center"}`}
          role="navigation"
          aria-label="Main navigation"
        >
          {constants.pages.map((item) => {
            const isActive = currentPage === item.url.toLowerCase();
            return (
              <li key={item.title}>
                <button
                  type="button"
                  className={`cursor-pointer items-center flex w-full px-4 py-3 rounded-lg ${open ? "h-14" : "h-12 w-12"} ${isActive ? "bg-accent/80 text-accent-foreground" : "hover:bg-accent/50 hover:text-accent-foreground"}`}
                  onClick={() => handleNavigation(`/app/${item.url.toLowerCase()}`)}
                  aria-label={item.title}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="flex w-full items-center">
                    <DynamicIconComponent
                      name={item.icon}
                      size={20}
                      strokeWidth={1.5}
                    />
                    {open && <span className="ml-3">{item.title}</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </SidebarContent>
      <SidebarFooter>
        <ul className={`flex flex-col gap-1 ${open ? "" : "items-center"}`}>
          <li>
            <button
              type="button"
              className={`cursor-pointer items-center rounded-lg flex w-full px-4 py-3 ${open ? "h-14" : "h-12 w-12"}
              ${location.pathname.toLowerCase().includes("settings") ? "bg-accent/80 text-accent-foreground" : "hover:bg-accent/50 hover:text-accent-foreground"}`}
              onClick={() => handleNavigation("/app/settings")}
              aria-label="Settings"
              aria-current={location.pathname.toLowerCase().includes("settings") ? 'page' : undefined}
            >
              <span className="flex w-full items-center">
                <DynamicIconComponent
                  name="settings"
                  size={20}
                  strokeWidth={1.5}
                />
                {open && <span className="ml-3">Settings</span>}
              </span>
            </button>
          </li>
        </ul>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}