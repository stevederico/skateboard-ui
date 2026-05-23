// node_modules/.deno/@base-ui+utils@0.2.8/node_modules/@base-ui/utils/esm/usePreviousValue.js
import * as React from "react";
"use client";
function usePreviousValue(value) {
  const [state, setState] = React.useState({
    current: value,
    previous: null
  });
  if (value !== state.current) {
    setState({
      current: value,
      previous: state.current
    });
  }
  return state.previous;
}

export { usePreviousValue };
