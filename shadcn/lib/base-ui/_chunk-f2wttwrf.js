import {
  useCompositeItem
} from "./_chunk-j3qkyd10.js";
import {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  useRenderElement
} from "./_chunk-x8xehj6d.js";

// node_modules/@base-ui/react/esm/internals/composite/item/CompositeItem.js
"use client";
function CompositeItem(componentProps) {
  const {
    render,
    className,
    style,
    state = EMPTY_OBJECT,
    props = EMPTY_ARRAY,
    refs = EMPTY_ARRAY,
    metadata,
    stateAttributesMapping,
    tag = "div",
    ...elementProps
  } = componentProps;
  const {
    compositeProps,
    compositeRef
  } = useCompositeItem({
    metadata
  });
  return useRenderElement(tag, componentProps, {
    state,
    ref: [...refs, compositeRef],
    props: [compositeProps, ...props, elementProps],
    stateAttributesMapping
  });
}

export { CompositeItem };
