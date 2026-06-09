import {
  SafeReact
} from "./_chunk-5tze5c8q.js";

// node_modules/@base-ui/utils/esm/useId.js
import * as React from "react";
"use client";
var globalId = 0;
function useGlobalId(idOverride, prefix = "mui") {
  const [defaultId, setDefaultId] = React.useState(idOverride);
  const id = idOverride || defaultId;
  React.useEffect(() => {
    if (defaultId == null) {
      globalId += 1;
      setDefaultId(`${prefix}-${globalId}`);
    }
  }, [defaultId, prefix]);
  return id;
}
var maybeReactUseId = SafeReact.useId;
function useId(idOverride, prefix) {
  if (maybeReactUseId !== undefined) {
    const reactId = maybeReactUseId();
    return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId);
  }
  return useGlobalId(idOverride, prefix);
}

// node_modules/@base-ui/react/esm/internals/useBaseUiId.js
"use client";
function useBaseUiId(idOverride) {
  return useId(idOverride, "base-ui");
}

export { useId, useBaseUiId };
