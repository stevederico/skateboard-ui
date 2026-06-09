import {
  useBaseUiId
} from "./_chunk-wdqynnjf.js";
import {
  useIsoLayoutEffect
} from "./_chunk-5tze5c8q.js";

// node_modules/@base-ui/react/esm/internals/labelable-provider/useAriaLabelledBy.js
import * as React from "react";
"use client";
function useAriaLabelledBy(explicitAriaLabelledBy, labelId, labelSourceRef, enableFallback = true, labelSourceId) {
  const [fallbackAriaLabelledBy, setFallbackAriaLabelledBy] = React.useState();
  const generatedLabelId = useBaseUiId(labelSourceId ? `${labelSourceId}-label` : undefined);
  const ariaLabelledBy = explicitAriaLabelledBy ?? labelId ?? fallbackAriaLabelledBy;
  useIsoLayoutEffect(() => {
    const nextAriaLabelledBy = explicitAriaLabelledBy || labelId || !enableFallback ? undefined : getAriaLabelledBy(labelSourceRef.current, generatedLabelId);
    if (fallbackAriaLabelledBy !== nextAriaLabelledBy) {
      setFallbackAriaLabelledBy(nextAriaLabelledBy);
    }
  });
  return ariaLabelledBy;
}
function getAriaLabelledBy(labelSource, generatedLabelId) {
  const label = findAssociatedLabel(labelSource);
  if (!label) {
    return;
  }
  if (!label.id && generatedLabelId) {
    label.id = generatedLabelId;
  }
  return label.id || undefined;
}
function findAssociatedLabel(labelSource) {
  if (!labelSource) {
    return;
  }
  const parent = labelSource.parentElement;
  if (parent && parent.tagName === "LABEL") {
    return parent;
  }
  const controlId = labelSource.id;
  if (controlId) {
    const nextSibling = labelSource.nextElementSibling;
    if (nextSibling && nextSibling.htmlFor === controlId) {
      return nextSibling;
    }
  }
  const labels = labelSource.labels;
  return labels && labels[0];
}

export { useAriaLabelledBy };
