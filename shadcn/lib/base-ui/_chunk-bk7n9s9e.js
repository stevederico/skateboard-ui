// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/checkbox-group/CheckboxGroupContext.js
import * as React from "react";
"use client";
var CheckboxGroupContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  CheckboxGroupContext.displayName = "CheckboxGroupContext";
function useCheckboxGroupContext(optional = true) {
  const context = React.useContext(CheckboxGroupContext);
  if (context === undefined && !optional) {
    throw new Error("Base UI: CheckboxGroupContext is missing. CheckboxGroup parts must be placed within <CheckboxGroup>.");
  }
  return context;
}

export { useCheckboxGroupContext };
