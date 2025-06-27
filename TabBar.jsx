import React from 'react';
import constants from "@/constants.json";
import { Link, useLocation } from 'react-router-dom';
import * as LucideIcons from "lucide-react";

// Dynamic Icon Component
const DynamicIcon = ({ name, size = 24, color = 'currentColor', strokeWidth = 2, ...props }) => {
  const toPascalCase = (str) => str.split(/[-_\s]/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
  const possibleNames = [name, toPascalCase(name), name.charAt(0).toUpperCase() + name.slice(1)];
  const LucideIcon = possibleNames.find(n => LucideIcons[n]) ? LucideIcons[possibleNames.find(n => LucideIcons[n])] : null;
  return LucideIcon ? React.createElement(LucideIcon, { size, color, strokeWidth, ...props }) : null;
};

export default function TabBar() {
  const location = useLocation();

  return (
    <div style={{
      overflow: "hidden",
      overscrollBehavior: "none"
    }} className="fixed flex md:hidden pt-2 pb-4 bottom-0 inset-x-0 justify-around text-center border-t shadow-lg bg-background">
      {constants?.pages?.map((item) => (
        <span className="px-3" key={item.title}>
          <Link to={`/app/${item.url.toLowerCase()}`} >
            {
              location.pathname.includes(item.url.toLowerCase())
                ? (
                  <span className="text-base">
                    <DynamicIcon name={item.icon} size={32} strokeWidth={1.5} />
                  </span>
                )
                : (
                  <span className="text-gray-500">
                    <DynamicIcon name={item.icon} size={32} strokeWidth={1.5} />
                  </span>
                )
            }
          </Link>
        </span>
      ))}
      <span className="px-3">
        <Link to={`/app/settings`}>
          {
            location.pathname.includes('Settings'.toLowerCase())
              ? (

                <span className="text-base">
                  <DynamicIcon name={"settings"} size={32} strokeWidth={1.5} />
                </span>
              )
              : (
                <span className="text-gray-500">
                  <DynamicIcon name={"settings"} size={32} strokeWidth={1.5} />
                </span>
              )
          }
        </Link></span>
    </div>
  );
};
