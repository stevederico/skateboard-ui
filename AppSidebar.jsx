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
      <SidebarContent>
        <ul className={`flex flex-col gap-2 p-2 ${open ? "" : "items-center"}`}>
          {constants.pages.map((item) => {
            const isActive = currentPage === item.url.toLowerCase();
            return (
              <li key={item.title}>
                <div
                  className={`cursor-pointer items-center flex w-full p-2 rounded-lg ${open ? "h-10" : "h-10 w-8"} ${isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent  hover:text-accent-foreground"}`}
                  onClick={() => handleNavigation(`/app/${item.url.toLowerCase()}`)}
                >
                  <span className="flex  w-full">
                    <DynamicIconComponent
                      name={item.icon}
                      size={24}
                      strokeWidth={1.5}
                      className={"!size-6"}
                    />
                    {open && <span className="ml-2">{item.title}</span>}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </SidebarContent>
      <SidebarFooter>
        <ul className={`flex flex-col gap-1  ${open ? "" : "items-center"}`}>
          <li>
            <div
              className={`cursor-pointer flex w-full p-2 ${open ? "h-10" : "h-10 w-8"}`}
              onClick={() => setOpen(!open)}
            >
         
            </div>
          </li>
          <li>
            <div
              className={`cursor-pointer items-center rounded-lg flex w-full p-2 ${open ? "h-10" : "h-10 w-8"} 
              ${location.pathname.toLowerCase().includes("settings") ? "bg-accent text-accent-foreground" : "hover:bg-accent  hover:text-accent-foreground"}`}
              onClick={() => handleNavigation("/app/settings")}
            >
              <span className="flex  w-full items-center">
                <DynamicIconComponent
                  name="settings"
                  size={18}
                  strokeWidth={1.5}
                  className={"!size-5 "}
                />
                {open && <span className="ml-2 text-sm">Settings</span>}
              </span>
            </div>
          </li>
        </ul>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}