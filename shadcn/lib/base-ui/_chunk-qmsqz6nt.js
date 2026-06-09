// node_modules/@base-ui/react/esm/toggle-group/ToggleGroupContext.js
import * as React from "react";
"use client";
var ToggleGroupContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  ToggleGroupContext.displayName = "ToggleGroupContext";
function useToggleGroupContext(optional = true) {
  const context = React.useContext(ToggleGroupContext);
  if (context === undefined && !optional) {
    throw new Error("Base UI: ToggleGroupContext is missing. ToggleGroup parts must be placed within <ToggleGroup>.");
  }
  return context;
}

export { ToggleGroupContext, useToggleGroupContext };
