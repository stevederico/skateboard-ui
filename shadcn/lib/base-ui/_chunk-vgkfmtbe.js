import {
  useBaseUiId
} from "./_chunk-wdqynnjf.js";
import {
  useIsoLayoutEffect
} from "./_chunk-5tze5c8q.js";

// node_modules/@base-ui/react/esm/utils/useRegisteredLabelId.js
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
