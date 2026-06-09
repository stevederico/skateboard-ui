// node_modules/@base-ui/react/esm/fieldset/root/FieldsetRootContext.js
import * as React from "react";
"use client";
var FieldsetRootContext = /* @__PURE__ */ React.createContext({
  legendId: undefined,
  setLegendId: () => {},
  disabled: undefined
});
if (true)
  FieldsetRootContext.displayName = "FieldsetRootContext";
function useFieldsetRootContext(optional = false) {
  const context = React.useContext(FieldsetRootContext);
  if (!context && !optional) {
    throw new Error("Base UI: FieldsetRootContext is missing. Fieldset parts must be placed within <Fieldset.Root>.");
  }
  return context;
}

export { useFieldsetRootContext };
