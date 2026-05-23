// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/internals/composite/list/CompositeListContext.js
import * as React from "react";
"use client";
var CompositeListContext = /* @__PURE__ */ React.createContext({
  register: () => {},
  unregister: () => {},
  subscribeMapChange: () => {
    return () => {};
  },
  elementsRef: {
    current: []
  },
  nextIndexRef: {
    current: 0
  }
});
if (true)
  CompositeListContext.displayName = "CompositeListContext";
function useCompositeListContext() {
  return React.useContext(CompositeListContext);
}

export { CompositeListContext, useCompositeListContext };
