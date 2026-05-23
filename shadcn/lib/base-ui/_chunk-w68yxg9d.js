import {
  useBaseUiId
} from "./_chunk-8kh3xk78.js";
import {
  useIsoLayoutEffect
} from "./_chunk-b40erthe.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/utils/useRegisteredLabelId.js
"use client";
function useRegisteredLabelId(idProp, setLabelId) {
  const id = useBaseUiId(idProp);
  useIsoLayoutEffect(() => {
    setLabelId(id);
    return () => {
      setLabelId(undefined);
    };
  }, [id, setLabelId]);
  return id;
}

export { useRegisteredLabelId };
