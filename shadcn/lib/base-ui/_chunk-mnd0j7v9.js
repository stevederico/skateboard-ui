// node_modules/@base-ui/react/esm/toolbar/root/ToolbarRootContext.js
import * as React from "react";
"use client";
var ToolbarRootContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  ToolbarRootContext.displayName = "ToolbarRootContext";
function useToolbarRootContext(optional) {
  const context = React.useContext(ToolbarRootContext);
  if (context === undefined && !optional) {
    throw new Error("Base UI: ToolbarRootContext is missing. Toolbar parts must be placed within <Toolbar.Root>.");
  }
  return context;
}

export { useToolbarRootContext };
