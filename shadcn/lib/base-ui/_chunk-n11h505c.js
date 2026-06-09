import {
  useRenderElement
} from "./_chunk-x8xehj6d.js";

// node_modules/@base-ui/react/esm/separator/Separator.js
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
