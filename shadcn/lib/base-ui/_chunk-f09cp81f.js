// node_modules/.deno/@base-ui+utils@0.2.8/node_modules/@base-ui/utils/esm/useOnFirstRender.js
import * as React from "react";
"use client";
function useOnFirstRender(fn) {
  const ref = React.useRef(true);
  if (ref.current) {
    ref.current = false;
    fn();
  }
}

export { useOnFirstRender };
