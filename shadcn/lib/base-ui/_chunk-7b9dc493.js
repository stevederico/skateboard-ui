// node_modules/@base-ui/react/esm/field/item/FieldItemContext.js
import * as React from "react";
"use client";
var FieldItemContext = /* @__PURE__ */ React.createContext({
  disabled: false
});
if (true)
  FieldItemContext.displayName = "FieldItemContext";
function useFieldItemContext() {
  const context = React.useContext(FieldItemContext);
  return context;
}

export { FieldItemContext, useFieldItemContext };
