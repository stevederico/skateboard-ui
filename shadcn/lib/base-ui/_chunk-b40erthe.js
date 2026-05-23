// node_modules/.deno/@base-ui+utils@0.2.8/node_modules/@base-ui/utils/esm/useIsoLayoutEffect.js
import * as React from "react";
"use client";
var noop = () => {};
var useIsoLayoutEffect = typeof document !== "undefined" ? React.useLayoutEffect : noop;

export { useIsoLayoutEffect };
