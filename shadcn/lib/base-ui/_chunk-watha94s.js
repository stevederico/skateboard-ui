// node_modules/@base-ui/react/esm/internals/csp-context/CSPContext.js
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
