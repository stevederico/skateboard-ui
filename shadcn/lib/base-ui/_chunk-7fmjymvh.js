import {
  useRenderElement
} from "./_chunk-1s41sngz.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/separator/Separator.js
import * as React from "react";
"use client";
var Separator = /* @__PURE__ */ React.forwardRef(function SeparatorComponent(componentProps, forwardedRef) {
  const {
    className,
    render,
    orientation = "horizontal",
    style,
    ...elementProps
  } = componentProps;
  const state = {
    orientation
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      role: "separator",
      "aria-orientation": orientation
    }, elementProps]
  });
  return element;
});
if (true)
  Separator.displayName = "Separator";

export { Separator };
