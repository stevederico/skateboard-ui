import {
  useStableCallback
} from "./_chunk-mznt6ktj.js";
import {
  useIsoLayoutEffect
} from "./_chunk-b40erthe.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/internals/useValueChanged.js
import * as React from "react";
"use client";
function useValueChanged(value, onChange) {
  const valueRef = React.useRef(value);
  const onChangeCallback = useStableCallback(onChange);
  useIsoLayoutEffect(() => {
    if (valueRef.current === value) {
      return;
    }
    onChangeCallback(valueRef.current);
  }, [value, onChangeCallback]);
  useIsoLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);
}

export { useValueChanged };
