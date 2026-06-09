import {
  FloatingRootStore,
  PopupTriggerMap
} from "./_chunk-2z044bba.js";

// node_modules/@base-ui/react/esm/floating-ui-react/utils/getEmptyRootContext.js
function getEmptyRootContext() {
  return new FloatingRootStore({
    open: false,
    transitionStatus: undefined,
    floatingElement: null,
    referenceElement: null,
    triggerElements: new PopupTriggerMap,
    floatingId: undefined,
    syncOnly: false,
    nested: false,
    onOpenChange: undefined
  });
}

export { getEmptyRootContext };
