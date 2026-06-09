// node_modules/@base-ui/utils/esm/useOnMount.js
import * as React from "react";
"use client";
var EMPTY = [];
function useOnMount(fn) {
  React.useEffect(fn, EMPTY);
}

export { useOnMount };
