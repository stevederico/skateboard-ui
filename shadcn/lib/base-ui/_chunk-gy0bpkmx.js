// node_modules/@base-ui/react/esm/internals/direction-context/DirectionContext.js
import * as React from "react";
"use client";
var DirectionContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  DirectionContext.displayName = "DirectionContext";
function useDirection() {
  const context = React.useContext(DirectionContext);
  return context?.direction ?? "ltr";
}

export { useDirection };
