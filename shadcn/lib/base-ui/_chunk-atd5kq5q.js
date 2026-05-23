import {
  InternalBackdrop,
  useOpenInteractionType,
  useScrollLock
} from "./_chunk-q3nee19r.js";
import {
  createInitialPopupStoreState,
  popupStoreSelectors,
  useImplicitActiveTrigger,
  useOpenStateTransitions,
  useTriggerDataForwarding
} from "./_chunk-7jjzay8b.js";
import {
  useOnFirstRender
} from "./_chunk-f09cp81f.js";
import {
  CommonPopupDataAttributes,
  popupStateMapping,
  triggerOpenStateMapping
} from "./_chunk-536jvgeq.js";
import {
  inertValue
} from "./_chunk-9nyxkvte.js";
import {
  CLICK_TRIGGER_IDENTIFIER,
  FloatingFocusManager,
  FloatingPortal,
  PopupTriggerMap,
  ReactStore,
  createSelector,
  useClick,
  useDismiss,
  useInteractions,
  useRole,
  useSyncedFloatingRootContext
} from "./_chunk-2tyt8f8r.js";
import {
  contains,
  getTarget
} from "./_chunk-atnkefgd.js";
import {
  COMPOSITE_KEYS
} from "./_chunk-qce0xt57.js";
import {
  createChangeEventDetails,
  exports_reason_parts
} from "./_chunk-4s0k3h7t.js";
import {
  useBaseUiId
} from "./_chunk-8kh3xk78.js";
import {
  transitionStatusMapping,
  useOpenChangeComplete
} from "./_chunk-mbn76q14.js";
import {
  useButton
} from "./_chunk-85vrgzwr.js";
import {
  useRefWithInit,
  useRenderElement
} from "./_chunk-1s41sngz.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/root/DialogRoot.js
import * as React4 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/root/useDialogRoot.js
import * as React from "react";
"use client";
function useDialogRoot(params) {
  const {
    store,
    parentContext,
    actionsRef,
    isDrawer
  } = params;
  const open = store.useState("open");
  const disablePointerDismissal = store.useState("disablePointerDismissal");
  const modal = store.useState("modal");
  const popupElement = store.useState("popupElement");
  const {
    openMethod,
    triggerProps
  } = useOpenInteractionType(open);
  useImplicitActiveTrigger(store);
  const {
    forceUnmount
  } = useOpenStateTransitions(open, store);
  const handleImperativeClose = React.useCallback(() => {
    store.setOpen(false, createChangeEventDetails(exports_reason_parts.imperativeAction));
  }, [store]);
  React.useImperativeHandle(actionsRef, () => ({
    unmount: forceUnmount,
    close: handleImperativeClose
  }), [forceUnmount, handleImperativeClose]);
  const floatingRootContext = useSyncedFloatingRootContext({
    popupStore: store,
    onOpenChange: store.setOpen,
    treatPopupAsFloatingElement: true
  });
  const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = React.useState(0);
  const [ownNestedOpenDrawers, setOwnNestedOpenDrawers] = React.useState(0);
  const isTopmost = ownNestedOpenDialogs === 0;
  const role = useRole(floatingRootContext);
  const dismiss = useDismiss(floatingRootContext, {
    outsidePressEvent() {
      if (store.context.internalBackdropRef.current || store.context.backdropRef.current) {
        return "intentional";
      }
      return {
        mouse: modal === "trap-focus" ? "sloppy" : "intentional",
        touch: "sloppy"
      };
    },
    outsidePress(event) {
      if (!store.context.outsidePressEnabledRef.current) {
        return false;
      }
      if ("button" in event && event.button !== 0) {
        return false;
      }
      if ("touches" in event && event.touches.length !== 1) {
        return false;
      }
      const target = getTarget(event);
      if (isTopmost && !disablePointerDismissal) {
        const eventTarget = target;
        if (modal) {
          return store.context.internalBackdropRef.current || store.context.backdropRef.current ? store.context.internalBackdropRef.current === eventTarget || store.context.backdropRef.current === eventTarget || contains(eventTarget, popupElement) && !eventTarget?.hasAttribute("data-base-ui-portal") : true;
        }
        return true;
      }
      return false;
    },
    escapeKey: isTopmost
  });
  useScrollLock(open && modal === true, popupElement);
  const {
    getReferenceProps,
    getFloatingProps,
    getTriggerProps
  } = useInteractions([role, dismiss]);
  store.useContextCallback("onNestedDialogOpen", (dialogCount, drawerCount) => {
    setOwnNestedOpenDialogs(dialogCount);
    setOwnNestedOpenDrawers(drawerCount);
  });
  store.useContextCallback("onNestedDialogClose", () => {
    setOwnNestedOpenDialogs(0);
    setOwnNestedOpenDrawers(0);
  });
  React.useEffect(() => {
    if (parentContext?.onNestedDialogOpen && open) {
      parentContext.onNestedDialogOpen(ownNestedOpenDialogs + 1, ownNestedOpenDrawers + (isDrawer ? 1 : 0));
    }
    if (parentContext?.onNestedDialogClose && !open) {
      parentContext.onNestedDialogClose();
    }
    return () => {
      if (parentContext?.onNestedDialogClose && open) {
        parentContext.onNestedDialogClose();
      }
    };
  }, [isDrawer, open, ownNestedOpenDialogs, ownNestedOpenDrawers, parentContext]);
  const activeTriggerProps = React.useMemo(() => getReferenceProps(triggerProps), [getReferenceProps, triggerProps]);
  const inactiveTriggerProps = React.useMemo(() => getTriggerProps(triggerProps), [getTriggerProps, triggerProps]);
  const popupProps = React.useMemo(() => getFloatingProps(), [getFloatingProps]);
  store.useSyncedValues({
    openMethod,
    activeTriggerProps,
    inactiveTriggerProps,
    popupProps,
    floatingRootContext,
    nestedOpenDialogCount: ownNestedOpenDialogs,
    nestedOpenDrawerCount: ownNestedOpenDrawers
  });
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/root/DialogRootContext.js
import * as React2 from "react";
"use client";
var DialogRootContext = /* @__PURE__ */ React2.createContext(undefined);
if (true)
  DialogRootContext.displayName = "DialogRootContext";
function useDialogRootContext(optional) {
  const dialogRootContext = React2.useContext(DialogRootContext);
  if (optional === false && dialogRootContext === undefined) {
    throw new Error("Base UI: DialogRootContext is missing. Dialog parts must be placed within <Dialog.Root>.");
  }
  return dialogRootContext;
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/store/DialogStore.js
import * as React3 from "react";
var selectors = {
  ...popupStoreSelectors,
  modal: createSelector((state) => state.modal),
  nested: createSelector((state) => state.nested),
  nestedOpenDialogCount: createSelector((state) => state.nestedOpenDialogCount),
  nestedOpenDrawerCount: createSelector((state) => state.nestedOpenDrawerCount),
  disablePointerDismissal: createSelector((state) => state.disablePointerDismissal),
  openMethod: createSelector((state) => state.openMethod),
  descriptionElementId: createSelector((state) => state.descriptionElementId),
  titleElementId: createSelector((state) => state.titleElementId),
  viewportElement: createSelector((state) => state.viewportElement),
  role: createSelector((state) => state.role)
};

class DialogStore extends ReactStore {
  constructor(initialState) {
    super(createInitialState(initialState), {
      popupRef: /* @__PURE__ */ React3.createRef(),
      backdropRef: /* @__PURE__ */ React3.createRef(),
      internalBackdropRef: /* @__PURE__ */ React3.createRef(),
      outsidePressEnabledRef: {
        current: true
      },
      triggerElements: new PopupTriggerMap,
      onOpenChange: undefined,
      onOpenChangeComplete: undefined
    }, selectors);
  }
  setOpen = (nextOpen, eventDetails) => {
    eventDetails.preventUnmountOnClose = () => {
      this.set("preventUnmountingOnClose", true);
    };
    if (!nextOpen && eventDetails.trigger == null && this.state.activeTriggerId != null) {
      eventDetails.trigger = this.state.activeTriggerElement ?? undefined;
    }
    this.context.onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
    const updatedState = {
      open: nextOpen
    };
    const newTriggerId = eventDetails.trigger?.id ?? null;
    if (newTriggerId || nextOpen) {
      updatedState.activeTriggerId = newTriggerId;
      updatedState.activeTriggerElement = eventDetails.trigger ?? null;
    }
    this.update(updatedState);
  };
  static useStore(externalStore, initialState) {
    const internalStore = useRefWithInit(() => {
      return new DialogStore(initialState);
    }).current;
    return externalStore ?? internalStore;
  }
}
function createInitialState(initialState = {}) {
  return {
    ...createInitialPopupStoreState(),
    modal: true,
    disablePointerDismissal: false,
    popupElement: null,
    viewportElement: null,
    descriptionElementId: undefined,
    titleElementId: undefined,
    openMethod: null,
    nested: false,
    nestedOpenDialogCount: 0,
    nestedOpenDrawerCount: 0,
    role: "dialog",
    ...initialState
  };
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/root/DialogRoot.js
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
var IsDrawerContext = /* @__PURE__ */ React4.createContext(false);
if (true)
  IsDrawerContext.displayName = "IsDrawerContext";
function DialogRoot(props) {
  const {
    children,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    disablePointerDismissal = false,
    modal = true,
    actionsRef,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null
  } = props;
  const parentDialogRootContext = useDialogRootContext(true);
  const isDrawer = React4.useContext(IsDrawerContext);
  const nested = Boolean(parentDialogRootContext);
  const store = DialogStore.useStore(handle?.store, {
    open: defaultOpen,
    openProp,
    activeTriggerId: defaultTriggerIdProp,
    triggerIdProp,
    modal,
    disablePointerDismissal,
    nested
  });
  useOnFirstRender(() => {
    if (openProp === undefined && store.state.open === false && defaultOpen === true) {
      store.update({
        open: true,
        activeTriggerId: defaultTriggerIdProp
      });
    }
  });
  store.useControlledProp("openProp", openProp);
  store.useControlledProp("triggerIdProp", triggerIdProp);
  store.useSyncedValues({
    disablePointerDismissal,
    nested,
    modal
  });
  store.useContextCallback("onOpenChange", onOpenChange);
  store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
  const payload = store.useState("payload");
  useDialogRoot({
    store,
    actionsRef,
    parentContext: parentDialogRootContext?.store.context,
    isDrawer,
    onOpenChange,
    triggerIdProp
  });
  const contextValue = React4.useMemo(() => ({
    store
  }), [store]);
  return /* @__PURE__ */ _jsx(IsDrawerContext.Provider, {
    value: false,
    children: /* @__PURE__ */ _jsx(DialogRootContext.Provider, {
      value: contextValue,
      children: typeof children === "function" ? children({
        payload
      }) : children
    })
  });
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/backdrop/DialogBackdrop.js
import * as React5 from "react";
"use client";
var stateAttributesMapping = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
var DialogBackdrop = /* @__PURE__ */ React5.forwardRef(function DialogBackdrop2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    forceRender = false,
    ...elementProps
  } = componentProps;
  const {
    store
  } = useDialogRootContext();
  const open = store.useState("open");
  const nested = store.useState("nested");
  const mounted = store.useState("mounted");
  const transitionStatus = store.useState("transitionStatus");
  const state = {
    open,
    transitionStatus
  };
  return useRenderElement("div", componentProps, {
    state,
    ref: [store.context.backdropRef, forwardedRef],
    stateAttributesMapping,
    props: [{
      role: "presentation",
      hidden: !mounted,
      style: {
        userSelect: "none",
        WebkitUserSelect: "none"
      }
    }, elementProps],
    enabled: forceRender || !nested
  });
});
if (true)
  DialogBackdrop.displayName = "DialogBackdrop";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/close/DialogClose.js
import * as React6 from "react";
"use client";
var DialogClose = /* @__PURE__ */ React6.forwardRef(function DialogClose2(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled = false,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const {
    store
  } = useDialogRootContext();
  const open = store.useState("open");
  function handleClick(event) {
    if (open) {
      store.setOpen(false, createChangeEventDetails(exports_reason_parts.closePress, event.nativeEvent));
    }
  }
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const state = {
    disabled
  };
  return useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef],
    props: [{
      onClick: handleClick
    }, elementProps, getButtonProps]
  });
});
if (true)
  DialogClose.displayName = "DialogClose";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/description/DialogDescription.js
import * as React7 from "react";
"use client";
var DialogDescription = /* @__PURE__ */ React7.forwardRef(function DialogDescription2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    ...elementProps
  } = componentProps;
  const {
    store
  } = useDialogRootContext();
  const id = useBaseUiId(idProp);
  store.useSyncedValueWithCleanup("descriptionElementId", id);
  return useRenderElement("p", componentProps, {
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
});
if (true)
  DialogDescription.displayName = "DialogDescription";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/popup/DialogPopup.js
import * as React9 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/popup/DialogPopupCssVars.js
var DialogPopupCssVars = /* @__PURE__ */ function(DialogPopupCssVars2) {
  DialogPopupCssVars2["nestedDialogs"] = "--nested-dialogs";
  return DialogPopupCssVars2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/popup/DialogPopupDataAttributes.js
var DialogPopupDataAttributes = function(DialogPopupDataAttributes2) {
  DialogPopupDataAttributes2[DialogPopupDataAttributes2["open"] = CommonPopupDataAttributes.open] = "open";
  DialogPopupDataAttributes2[DialogPopupDataAttributes2["closed"] = CommonPopupDataAttributes.closed] = "closed";
  DialogPopupDataAttributes2[DialogPopupDataAttributes2["startingStyle"] = CommonPopupDataAttributes.startingStyle] = "startingStyle";
  DialogPopupDataAttributes2[DialogPopupDataAttributes2["endingStyle"] = CommonPopupDataAttributes.endingStyle] = "endingStyle";
  DialogPopupDataAttributes2["nested"] = "data-nested";
  DialogPopupDataAttributes2["nestedDialogOpen"] = "data-nested-dialog-open";
  return DialogPopupDataAttributes2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/portal/DialogPortalContext.js
import * as React8 from "react";
"use client";
var DialogPortalContext = /* @__PURE__ */ React8.createContext(undefined);
if (true)
  DialogPortalContext.displayName = "DialogPortalContext";
function useDialogPortalContext() {
  const value = React8.useContext(DialogPortalContext);
  if (value === undefined) {
    throw new Error("Base UI: <Dialog.Portal> is missing.");
  }
  return value;
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/popup/DialogPopup.js
import { jsx as _jsx2 } from "react/jsx-runtime";
"use client";
var stateAttributesMapping2 = {
  ...popupStateMapping,
  ...transitionStatusMapping,
  nestedDialogOpen(value) {
    return value ? {
      [DialogPopupDataAttributes.nestedDialogOpen]: ""
    } : null;
  }
};
var DialogPopup = /* @__PURE__ */ React9.forwardRef(function DialogPopup2(componentProps, forwardedRef) {
  const {
    className,
    finalFocus,
    initialFocus,
    render,
    style,
    ...elementProps
  } = componentProps;
  const {
    store
  } = useDialogRootContext();
  const descriptionElementId = store.useState("descriptionElementId");
  const disablePointerDismissal = store.useState("disablePointerDismissal");
  const floatingRootContext = store.useState("floatingRootContext");
  const rootPopupProps = store.useState("popupProps");
  const modal = store.useState("modal");
  const mounted = store.useState("mounted");
  const nested = store.useState("nested");
  const nestedOpenDialogCount = store.useState("nestedOpenDialogCount");
  const open = store.useState("open");
  const openMethod = store.useState("openMethod");
  const titleElementId = store.useState("titleElementId");
  const transitionStatus = store.useState("transitionStatus");
  const role = store.useState("role");
  useDialogPortalContext();
  useOpenChangeComplete({
    open,
    ref: store.context.popupRef,
    onComplete() {
      if (open) {
        store.context.onOpenChangeComplete?.(true);
      }
    }
  });
  function defaultInitialFocus(interactionType) {
    if (interactionType === "touch") {
      return store.context.popupRef.current;
    }
    return true;
  }
  const resolvedInitialFocus = initialFocus === undefined ? defaultInitialFocus : initialFocus;
  const nestedDialogOpen = nestedOpenDialogCount > 0;
  const state = {
    open,
    nested,
    transitionStatus,
    nestedDialogOpen
  };
  const element = useRenderElement("div", componentProps, {
    state,
    props: [rootPopupProps, {
      "aria-labelledby": titleElementId ?? undefined,
      "aria-describedby": descriptionElementId ?? undefined,
      role,
      tabIndex: -1,
      hidden: !mounted,
      onKeyDown(event) {
        if (COMPOSITE_KEYS.has(event.key)) {
          event.stopPropagation();
        }
      },
      style: {
        [DialogPopupCssVars.nestedDialogs]: nestedOpenDialogCount
      }
    }, elementProps],
    ref: [forwardedRef, store.context.popupRef, store.useStateSetter("popupElement")],
    stateAttributesMapping: stateAttributesMapping2
  });
  return /* @__PURE__ */ _jsx2(FloatingFocusManager, {
    context: floatingRootContext,
    openInteractionType: openMethod,
    disabled: !mounted,
    closeOnFocusOut: !disablePointerDismissal,
    initialFocus: resolvedInitialFocus,
    returnFocus: finalFocus,
    modal: modal !== false,
    restoreFocus: "popup",
    children: element
  });
});
if (true)
  DialogPopup.displayName = "DialogPopup";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/portal/DialogPortal.js
import * as React10 from "react";
import { jsx as _jsx3, jsxs as _jsxs } from "react/jsx-runtime";
"use client";
var DialogPortal = /* @__PURE__ */ React10.forwardRef(function DialogPortal2(props, forwardedRef) {
  const {
    keepMounted = false,
    ...portalProps
  } = props;
  const {
    store
  } = useDialogRootContext();
  const mounted = store.useState("mounted");
  const modal = store.useState("modal");
  const open = store.useState("open");
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ _jsx3(DialogPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ _jsxs(FloatingPortal, {
      ref: forwardedRef,
      ...portalProps,
      children: [mounted && modal === true && /* @__PURE__ */ _jsx3(InternalBackdrop, {
        ref: store.context.internalBackdropRef,
        inert: inertValue(!open)
      }), props.children]
    })
  });
});
if (true)
  DialogPortal.displayName = "DialogPortal";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/title/DialogTitle.js
import * as React11 from "react";
"use client";
var DialogTitle = /* @__PURE__ */ React11.forwardRef(function DialogTitle2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    ...elementProps
  } = componentProps;
  const {
    store
  } = useDialogRootContext();
  const id = useBaseUiId(idProp);
  store.useSyncedValueWithCleanup("titleElementId", id);
  return useRenderElement("h2", componentProps, {
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
});
if (true)
  DialogTitle.displayName = "DialogTitle";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/trigger/DialogTrigger.js
import * as React12 from "react";
"use client";
var DialogTrigger = /* @__PURE__ */ React12.forwardRef(function DialogTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled = false,
    nativeButton = true,
    id: idProp,
    payload,
    handle,
    style,
    ...elementProps
  } = componentProps;
  const dialogRootContext = useDialogRootContext(true);
  const store = handle?.store ?? dialogRootContext?.store;
  if (!store) {
    throw new Error("Base UI: <Dialog.Trigger> must be used within <Dialog.Root> or provided with a handle.");
  }
  const thisTriggerId = useBaseUiId(idProp);
  const floatingContext = store.useState("floatingRootContext");
  const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
  const triggerElementRef = React12.useRef(null);
  const {
    registerTrigger,
    isMountedByThisTrigger
  } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
    payload
  });
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const click = useClick(floatingContext, {
    enabled: floatingContext != null
  });
  const localInteractionProps = useInteractions([click]);
  const state = {
    disabled,
    open: isOpenedByThisTrigger
  };
  const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
  return useRenderElement("button", componentProps, {
    state,
    ref: [buttonRef, forwardedRef, registerTrigger, triggerElementRef],
    props: [localInteractionProps.getReferenceProps(), rootTriggerProps, {
      [CLICK_TRIGGER_IDENTIFIER]: "",
      id: thisTriggerId
    }, elementProps, getButtonProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
});
if (true)
  DialogTrigger.displayName = "DialogTrigger";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/viewport/DialogViewport.js
import * as React13 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/viewport/DialogViewportDataAttributes.js
var DialogViewportDataAttributes = function(DialogViewportDataAttributes2) {
  DialogViewportDataAttributes2[DialogViewportDataAttributes2["open"] = CommonPopupDataAttributes.open] = "open";
  DialogViewportDataAttributes2[DialogViewportDataAttributes2["closed"] = CommonPopupDataAttributes.closed] = "closed";
  DialogViewportDataAttributes2[DialogViewportDataAttributes2["startingStyle"] = CommonPopupDataAttributes.startingStyle] = "startingStyle";
  DialogViewportDataAttributes2[DialogViewportDataAttributes2["endingStyle"] = CommonPopupDataAttributes.endingStyle] = "endingStyle";
  DialogViewportDataAttributes2["nested"] = "data-nested";
  DialogViewportDataAttributes2["nestedDialogOpen"] = "data-nested-dialog-open";
  return DialogViewportDataAttributes2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/viewport/DialogViewport.js
"use client";
var stateAttributesMapping3 = {
  ...popupStateMapping,
  ...transitionStatusMapping,
  nested(value) {
    return value ? {
      [DialogViewportDataAttributes.nested]: ""
    } : null;
  },
  nestedDialogOpen(value) {
    return value ? {
      [DialogViewportDataAttributes.nestedDialogOpen]: ""
    } : null;
  }
};
var DialogViewport = /* @__PURE__ */ React13.forwardRef(function DialogViewport2(componentProps, forwardedRef) {
  const {
    className,
    render,
    children,
    style,
    ...elementProps
  } = componentProps;
  const keepMounted = useDialogPortalContext();
  const {
    store
  } = useDialogRootContext();
  const open = store.useState("open");
  const nested = store.useState("nested");
  const transitionStatus = store.useState("transitionStatus");
  const nestedOpenDialogCount = store.useState("nestedOpenDialogCount");
  const mounted = store.useState("mounted");
  const nestedDialogOpen = nestedOpenDialogCount > 0;
  const state = {
    open,
    nested,
    transitionStatus,
    nestedDialogOpen
  };
  const shouldRender = keepMounted || mounted;
  return useRenderElement("div", componentProps, {
    enabled: shouldRender,
    state,
    ref: [forwardedRef, store.useStateSetter("viewportElement")],
    stateAttributesMapping: stateAttributesMapping3,
    props: [{
      role: "presentation",
      hidden: !mounted,
      style: {
        pointerEvents: !open ? "none" : undefined
      },
      children
    }, elementProps]
  });
});
if (true)
  DialogViewport.displayName = "DialogViewport";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/dialog/store/DialogHandle.js
class DialogHandle {
  constructor(store) {
    this.store = store ?? new DialogStore;
  }
  open(triggerId) {
    const triggerElement = triggerId ? this.store.context.triggerElements.getById(triggerId) : undefined;
    if (true) {
      if (triggerId && !triggerElement) {
        console.warn(`Base UI: DialogHandle.open: No trigger found with id "${triggerId}". The dialog will open, but the trigger will not be associated with the dialog.`);
      }
    }
    this.store.setOpen(true, createChangeEventDetails(exports_reason_parts.imperativeAction, undefined, triggerElement));
  }
  openWithPayload(payload) {
    this.store.set("payload", payload);
    this.store.setOpen(true, createChangeEventDetails(exports_reason_parts.imperativeAction, undefined, undefined));
  }
  close() {
    this.store.setOpen(false, createChangeEventDetails(exports_reason_parts.imperativeAction, undefined, undefined));
  }
  get isOpen() {
    return this.store.state.open;
  }
}
function createDialogHandle() {
  return new DialogHandle;
}

export { useDialogRoot, DialogRootContext, useDialogRootContext, DialogStore, IsDrawerContext, DialogRoot, DialogBackdrop, DialogClose, DialogDescription, DialogPopup, DialogPortal, DialogTitle, DialogTrigger, DialogViewport, DialogHandle, createDialogHandle };
