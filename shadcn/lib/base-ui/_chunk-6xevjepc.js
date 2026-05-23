// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/internals/composite/root/CompositeRootContext.js
import * as React from "react";
"use client";
var CompositeRootContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  CompositeRootContext.displayName = "CompositeRootContext";
function useCompositeRootContext(optional = false) {
  const context = React.useContext(CompositeRootContext);
  if (context === undefined && !optional) {
    throw new Error("Base UI: CompositeRootContext is missing. Composite parts must be placed within <Composite.Root>.");
  }
  return context;
}

export { CompositeRootContext, useCompositeRootContext };
