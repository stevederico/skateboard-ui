// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/csp-provider/CSPContext.js
import * as React from "react";
"use client";
var CSPContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  CSPContext.displayName = "CSPContext";
var DEFAULT_CSP_CONTEXT_VALUE = {
  disableStyleElements: false
};
function useCSPContext() {
  return React.useContext(CSPContext) ?? DEFAULT_CSP_CONTEXT_VALUE;
}

export { useCSPContext };
