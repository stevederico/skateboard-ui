import {
  FloatingRootStore,
  PopupTriggerMap
} from "./_chunk-2tyt8f8r.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/floating-ui-react/utils/getEmptyRootContext.js
function getEmptyRootContext() {
  return new FloatingRootStore({
    open: false,
    transitionStatus: undefined,
    floatingElement: null,
    referenceElement: null,
    triggerElements: new PopupTriggerMap,
    floatingId: "",
    syncOnly: false,
    nested: false,
    onOpenChange: undefined
  });
}

export { getEmptyRootContext };
