import {
  useCompositeListItem
} from "./_chunk-3enq1vat.js";
import {
  useCompositeRootContext
} from "./_chunk-cdgfsr3q.js";
import {
  useMergedRefs
} from "./_chunk-x8xehj6d.js";

// node_modules/@base-ui/react/esm/internals/composite/item/useCompositeItem.js
import * as React from "react";
"use client";
function useCompositeItem(params = {}) {
  const {
    highlightItemOnHover,
    highlightedIndex,
    onHighlightedIndexChange
  } = useCompositeRootContext();
  const {
    ref,
    index
  } = useCompositeListItem(params);
  const isHighlighted = highlightedIndex === index;
  const itemRef = React.useRef(null);
  const mergedRef = useMergedRefs(ref, itemRef);
  const compositeProps = React.useMemo(() => ({
    tabIndex: isHighlighted ? 0 : -1,
    onFocus() {
      onHighlightedIndexChange(index);
    },
    onMouseMove() {
      const item = itemRef.current;
      if (!highlightItemOnHover || !item) {
        return;
      }
      const disabled = item.hasAttribute("disabled") || item.ariaDisabled === "true";
      if (!isHighlighted && !disabled) {
        item.focus();
      }
    }
  }), [isHighlighted, onHighlightedIndexChange, index, highlightItemOnHover]);
  return {
    compositeProps,
    compositeRef: mergedRef,
    index
  };
}

export { useCompositeItem };
