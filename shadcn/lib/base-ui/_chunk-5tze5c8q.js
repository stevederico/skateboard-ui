// node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js
import * as React from "react";
"use client";
var noop = () => {};
var useIsoLayoutEffect = typeof document !== "undefined" ? React.useLayoutEffect : noop;

// node_modules/@base-ui/utils/esm/safeReact.js
import * as React2 from "react";
var SafeReact = {
  ...React2
};

export { SafeReact, useIsoLayoutEffect };
