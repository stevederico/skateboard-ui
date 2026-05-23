/* @base-ui/react 1.4.1 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  useButton
} from "./_chunk-85vrgzwr.js";
import"./_chunk-71zm6zgv.js";
import"./_chunk-6xevjepc.js";
import"./_chunk-sx6vkz01.js";
import"./_chunk-n7dnqnbw.js";
import"./_chunk-mznt6ktj.js";
import"./_chunk-b40erthe.js";
import {
  useRenderElement
} from "./_chunk-1s41sngz.js";
import"./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/button/Button.js
import * as React from "react";
"use client";
var Button = /* @__PURE__ */ React.forwardRef(function Button2(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled = false,
    focusableWhenDisabled = false,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled,
    native: nativeButton
  });
  const state = {
    disabled
  };
  return useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef],
    props: [elementProps, getButtonProps]
  });
});
if (true)
  Button.displayName = "Button";
export {
  Button
};
