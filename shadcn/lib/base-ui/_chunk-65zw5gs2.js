// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/menubar/MenubarContext.js
import * as React from "react";
"use client";
var MenubarContext = /* @__PURE__ */ React.createContext(null);
if (true)
  MenubarContext.displayName = "MenubarContext";
function useMenubarContext(optional) {
  const context = React.useContext(MenubarContext);
  if (context === null && !optional) {
    throw new Error("Base UI: MenubarContext is missing. Menubar parts must be placed within <Menubar>.");
  }
  return context;
}

export { MenubarContext, useMenubarContext };
