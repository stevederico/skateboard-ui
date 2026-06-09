import {
  InternalBackdrop,
  useOpenMethodTriggerProps,
  useScrollLock
} from "./_chunk-ytnp24gq.js";
import {
  createInitialPopupStoreState,
  createPopupFloatingRootContext,
  popupStoreSelectors
} from "./_chunk-q5cg71p7.js";
import {
  FOCUSABLE_POPUP_PROPS,
  setOpenTriggerState,
  useImplicitActiveTrigger,
  useOnFirstRender,
  useOpenStateTransitions,
  usePopupInteractionProps,
  usePopupRootSync,
  usePopupStore,
  useTriggerDataForwarding
} from "./_chunk-242gh8ph.js";
import {
  CommonPopupDataAttributes,
  popupStateMapping,
  triggerOpenStateMapping
} from "./_chunk-t7ppm3t0.js";
import {
  inertValue
} from "./_chunk-3cpd1vjz.js";
import {
  CLICK_TRIGGER_IDENTIFIER,
  FloatingFocusManager,
  FloatingPortal,
  PopupTriggerMap,
  ReactStore,
  createSelector,
  useClick,
  useDismiss
} from "./_chunk-2z044bba.js";
import {
  contains,
  getTarget
} from "./_chunk-cgptgywc.js";
import {
  COMPOSITE_KEYS
} from "./_chunk-pv7b791x.js";
import {
  createChangeEventDetails,
  exports_reason_parts
} from "./_chunk-e56mpvk1.js";
import {
  useBaseUiId
} from "./_chunk-wdqynnjf.js";
import {
  transitionStatusMapping,
  useOpenChangeComplete
} from "./_chunk-e13rsb6b.js";
import {
  useButton
} from "./_chunk-5xmdvndx.js";
import {
  EMPTY_OBJECT,
  useRenderElement
} from "./_chunk-x8xehj6d.js";
import {
  mergeProps
} from "./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/dialog/backdrop/DialogBackdrop.js
import * as React2 from "react";

// node_modules/@base-ui/react/esm/dialog/root/DialogRootContext.js
import * as React from "react";
"use client";
var IsDrawerContext = /* @__PURE__ */ React.createContext(false);
if (true)
  IsDrawerContext.displayName = "IsDrawerContext";
var DialogRootContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  DialogRootContext.displayName = "DialogRootContext";
function useDialogRootContext(optional) {
  const dialogRootContext = React.useContext(DialogRootContext);
  if (optional === false && dialogRootContext === undefined) {
    throw new Error("Base UI: DialogRootContext is missing. Dialog parts must be placed within <Dialog.Root>.");
  }
  return dialogRootContext;
}

// node_modules/@base-ui/react/esm/dialog/backdrop/DialogBackdrop.js
"use client";
var stateAttributesMapping = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
var DialogBackdrop = /* @__PURE__ */ React2.forwardRef(function DialogBackdrop2(componentProps, forwardedRef) {
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

// node_modules/@base-ui/react/esm/dialog/close/DialogClose.js
import * as React3 from "react";
"use client";
var DialogClose = /* @__PURE__ */ React3.forwardRef(function DialogClose2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    disabled = false,
    nativeButton = true,
    ...elementProps
  } = componentProps;
  const {
    store
  } = useDialogRootContext();
  const open = store.useState("open");
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
  function handleClick(event) {
    if (open) {
      store.setOpen(false, createChangeEventDetails(exports_reason_parts.closePress, event.nativeEvent));
    }
  }
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

// node_modules/@base-ui/react/esm/dialog/description/DialogDescription.js
import * as React4 from "react";
"use client";
var DialogDescription = /* @__PURE__ */ React4.forwardRef(function DialogDescription2(componentProps, forwardedRef) {
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

// node_modules/@base-ui/react/esm/dialog/popup/DialogPopup.js
import * as React6 from "react";

// node_modules/@base-ui/react/esm/dialog/popup/DialogPopupCssVars.js
var DialogPopupCssVars = /* @__PURE__ */ function(DialogPopupCssVars2) {
  DialogPopupCssVars2["nestedDialogs"] = "--nested-dialogs";
  return DialogPopupCssVars2;
}({});

// node_modules/@base-ui/react/esm/dialog/popup/DialogPopupDataAttributes.js
var DialogPopupDataAttributes = function(DialogPopupDataAttributes2) {
  DialogPopupDataAttributes2[DialogPopupDataAttributes2["open"] = CommonPopupDataAttributes.open] = "open";
  DialogPopupDataAttributes2[DialogPopupDataAttributes2["closed"] = CommonPopupDataAttributes.closed] = "closed";
  DialogPopupDataAttributes2[DialogPopupDataAttributes2["startingStyle"] = CommonPopupDataAttributes.startingStyle] = "startingStyle";
  DialogPopupDataAttributes2[DialogPopupDataAttributes2["endingStyle"] = CommonPopupDataAttributes.endingStyle] = "endingStyle";
  DialogPopupDataAttributes2["nested"] = "data-nested";
  DialogPopupDataAttributes2["nestedDialogOpen"] = "data-nested-dialog-open";
  return DialogPopupDataAttributes2;
}({});

// node_modules/@base-ui/react/esm/dialog/portal/DialogPortalContext.js
import * as React5 from "react";
"use client";
var DialogPortalContext = /* @__PURE__ */ React5.createContext(undefined);
if (true)
  DialogPortalContext.displayName = "DialogPortalContext";
function useDialogPortalContext() {
  const value = React5.useContext(DialogPortalContext);
  if (value === undefined) {
    throw new Error("Base UI: <Dialog.Portal> is missing.");
  }
  return value;
}

// node_modules/@base-ui/react/esm/dialog/popup/DialogPopup.js
import { jsx as _jsx } from "react/jsx-runtime";
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
var DialogPopup = /* @__PURE__ */ React6.forwardRef(function DialogPopup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    finalFocus,
    initialFocus,
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
  const floatingId = floatingRootContext.useState("floatingId");
  const popupId = elementProps.id ?? floatingId;
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
  const setPopupElement = store.useStateSetter("popupElement");
  const state = {
    open,
    nested,
    transitionStatus,
    nestedDialogOpen
  };
  const element = useRenderElement("div", componentProps, {
    state,
    props: [rootPopupProps, {
      id: popupId,
      "aria-labelledby": titleElementId ?? undefined,
      "aria-describedby": descriptionElementId ?? undefined,
      role,
      ...FOCUSABLE_POPUP_PROPS,
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
    ref: [forwardedRef, store.context.popupRef, setPopupElement],
    stateAttributesMapping: stateAttributesMapping2
  });
  return /* @__PURE__ */ _jsx(FloatingFocusManager, {
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

// node_modules/@base-ui/react/esm/dialog/portal/DialogPortal.js
import * as React7 from "react";
import { jsx as _jsx2, jsxs as _jsxs } from "react/jsx-runtime";
"use client";
var DialogPortal = /* @__PURE__ */ React7.forwardRef(function DialogPortal2(props, forwardedRef) {
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
  return /* @__PURE__ */ _jsx2(DialogPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ _jsxs(FloatingPortal, {
      ref: forwardedRef,
      ...portalProps,
      children: [mounted && modal === true && /* @__PURE__ */ _jsx2(InternalBackdrop, {
        ref: store.context.internalBackdropRef,
        inert: inertValue(!open)
      }), props.children]
    })
  });
});
if (true)
  DialogPortal.displayName = "DialogPortal";

// node_modules/@base-ui/react/esm/dialog/title/DialogTitle.js
import * as React8 from "react";
"use client";
var DialogTitle = /* @__PURE__ */ React8.forwardRef(function DialogTitle2(componentProps, forwardedRef) {
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

// node_modules/@base-ui/react/esm/dialog/trigger/DialogTrigger.js
import * as React9 from "react";
"use client";
var DialogTrigger = /* @__PURE__ */ React9.forwardRef(function DialogTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    disabled = false,
    nativeButton = true,
    id: idProp,
    payload,
    handle,
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
  const popupId = store.useState("triggerPopupId", thisTriggerId);
  const triggerElementRef = React9.useRef(null);
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
  const interactionTypeProps = useOpenMethodTriggerProps(() => store.select("open"), (interactionType) => {
    store.set("openMethod", interactionType);
  });
  const state = {
    disabled,
    open: isOpenedByThisTrigger
  };
  const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
  return useRenderElement("button", componentProps, {
    state,
    ref: [buttonRef, forwardedRef, registerTrigger, triggerElementRef],
    props: [click.reference, rootTriggerProps, interactionTypeProps, {
      [CLICK_TRIGGER_IDENTIFIER]: "",
      id: thisTriggerId,
      "aria-haspopup": "dialog",
      "aria-expanded": isOpenedByThisTrigger,
      "aria-controls": popupId
    }, elementProps, getButtonProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
});
if (true)
  DialogTrigger.displayName = "DialogTrigger";

// node_modules/@base-ui/react/esm/dialog/viewport/DialogViewport.js
import * as React10 from "react";

// node_modules/@base-ui/react/esm/dialog/viewport/DialogViewportDataAttributes.js
var DialogViewportDataAttributes = function(DialogViewportDataAttributes2) {
  DialogViewportDataAttributes2[DialogViewportDataAttributes2["open"] = CommonPopupDataAttributes.open] = "open";
  DialogViewportDataAttributes2[DialogViewportDataAttributes2["closed"] = CommonPopupDataAttributes.closed] = "closed";
  DialogViewportDataAttributes2[DialogViewportDataAttributes2["startingStyle"] = CommonPopupDataAttributes.startingStyle] = "startingStyle";
  DialogViewportDataAttributes2[DialogViewportDataAttributes2["endingStyle"] = CommonPopupDataAttributes.endingStyle] = "endingStyle";
  DialogViewportDataAttributes2["nested"] = "data-nested";
  DialogViewportDataAttributes2["nestedDialogOpen"] = "data-nested-dialog-open";
  return DialogViewportDataAttributes2;
}({});

// node_modules/@base-ui/react/esm/dialog/viewport/DialogViewport.js
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
var DialogViewport = /* @__PURE__ */ React10.forwardRef(function DialogViewport2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    children,
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
  const setViewportElement = store.useStateSetter("viewportElement");
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
    ref: [forwardedRef, setViewportElement],
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

// node_modules/@base-ui/react/esm/dialog/store/DialogStore.js
import * as React11 from "react";
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
  constructor(initialState, floatingId, nested = false) {
    const triggerElements = new PopupTriggerMap;
    const state = createInitialState(initialState);
    state.floatingRootContext = createPopupFloatingRootContext(triggerElements, floatingId, nested);
    super(state, {
      popupRef: /* @__PURE__ */ React11.createRef(),
      backdropRef: /* @__PURE__ */ React11.createRef(),
      internalBackdropRef: /* @__PURE__ */ React11.createRef(),
      outsidePressEnabledRef: {
        current: true
      },
      triggerElements,
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
    setOpenTriggerState(updatedState, nextOpen, eventDetails.trigger);
    this.update(updatedState);
  };
  static useStore(externalStore, initialState) {
    const store = usePopupStore(externalStore, (floatingId, nested) => new DialogStore(initialState, floatingId, nested), true).store;
    return store;
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

// node_modules/@base-ui/react/esm/dialog/store/DialogHandle.js
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
    return this.store.select("open");
  }
}
function createDialogHandle() {
  return new DialogHandle;
}

// node_modules/@base-ui/react/esm/dialog/root/useRenderDialogRoot.js
import * as React13 from "react";

// node_modules/@base-ui/react/esm/dialog/root/useDialogRoot.js
import * as React12 from "react";
"use client";
function useDialogRoot(params) {
  const {
    store,
    parentContext,
    actionsRef,
    isDrawer
  } = params;
  const open = store.useState("open");
  usePopupRootSync(store, open);
  useImplicitActiveTrigger(store);
  const {
    forceUnmount
  } = useOpenStateTransitions(open, store);
  const handleImperativeClose = React12.useCallback(() => {
    store.setOpen(false, createChangeEventDetails(exports_reason_parts.imperativeAction));
  }, [store]);
  React12.useImperativeHandle(actionsRef, () => ({
    unmount: forceUnmount,
    close: handleImperativeClose
  }), [forceUnmount, handleImperativeClose]);
  return {
    parentContext,
    isDrawer
  };
}
function DialogInteractions({
  store,
  dialogRoot
}) {
  const {
    parentContext,
    isDrawer
  } = dialogRoot;
  const open = store.useState("open");
  const disablePointerDismissal = store.useState("disablePointerDismissal");
  const modal = store.useState("modal");
  const popupElement = store.useState("popupElement");
  const floatingRootContext = store.useState("floatingRootContext");
  const [ownNestedOpenDialogs, setOwnNestedOpenDialogs] = React12.useState(0);
  const [ownNestedOpenDrawers, setOwnNestedOpenDrawers] = React12.useState(0);
  const isTopmost = ownNestedOpenDialogs === 0;
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
  store.useContextCallback("onNestedDialogOpen", (dialogCount, drawerCount) => {
    setOwnNestedOpenDialogs(dialogCount);
    setOwnNestedOpenDrawers(drawerCount);
  });
  store.useContextCallback("onNestedDialogClose", () => {
    setOwnNestedOpenDialogs(0);
    setOwnNestedOpenDrawers(0);
  });
  React12.useEffect(() => {
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
  const activeTriggerProps = dismiss.reference ?? EMPTY_OBJECT;
  const inactiveTriggerProps = dismiss.trigger ?? EMPTY_OBJECT;
  const popupProps = React12.useMemo(() => mergeProps(FOCUSABLE_POPUP_PROPS, dismiss.floating), [dismiss.floating]);
  usePopupInteractionProps(store, {
    activeTriggerProps,
    inactiveTriggerProps,
    popupProps,
    nestedOpenDialogCount: ownNestedOpenDialogs,
    nestedOpenDrawerCount: ownNestedOpenDrawers
  });
  return null;
}

// node_modules/@base-ui/react/esm/dialog/root/useRenderDialogRoot.js
import { jsx as _jsx3, jsxs as _jsxs2 } from "react/jsx-runtime";
"use client";
function useRenderDialogRoot(props, mode = "dialog") {
  const {
    children,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    disablePointerDismissal: disablePointerDismissalProp = false,
    modal: modalProp = true,
    actionsRef,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null
  } = props;
  const isDrawer = mode === "drawer";
  const isAlertDialog = mode === "alert-dialog";
  const modal = isAlertDialog ? true : modalProp;
  const disablePointerDismissal = isAlertDialog || disablePointerDismissalProp;
  const role = isAlertDialog ? "alertdialog" : "dialog";
  const parentDialogRootContext = useDialogRootContext(true);
  const nested = Boolean(parentDialogRootContext);
  const rootState = {
    modal,
    disablePointerDismissal,
    nested,
    role
  };
  const store = DialogStore.useStore(handle?.store, {
    open: defaultOpen,
    openProp,
    activeTriggerId: defaultTriggerIdProp,
    triggerIdProp,
    ...rootState
  });
  useOnFirstRender(() => {
    const nextState = openProp === undefined && store.state.open === false && defaultOpen === true ? {
      open: true,
      activeTriggerId: defaultTriggerIdProp
    } : null;
    if (isAlertDialog) {
      store.update(nextState ? {
        ...rootState,
        ...nextState
      } : rootState);
    } else if (nextState) {
      store.update(nextState);
    }
  });
  store.useControlledProp("openProp", openProp);
  store.useControlledProp("triggerIdProp", triggerIdProp);
  store.useSyncedValues(rootState);
  store.useContextCallback("onOpenChange", onOpenChange);
  store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const payload = store.useState("payload");
  const dialogRoot = useDialogRoot({
    store,
    actionsRef,
    parentContext: parentDialogRootContext?.store.context,
    isDrawer
  });
  const shouldRenderInteractions = open || mounted;
  const contextValue = React13.useMemo(() => ({
    store
  }), [store]);
  return /* @__PURE__ */ _jsx3(IsDrawerContext.Provider, {
    value: false,
    children: /* @__PURE__ */ _jsxs2(DialogRootContext.Provider, {
      value: contextValue,
      children: [shouldRenderInteractions && /* @__PURE__ */ _jsx3(DialogInteractions, {
        store,
        dialogRoot
      }), typeof children === "function" ? children({
        payload
      }) : children]
    })
  });
}

export { IsDrawerContext, DialogStore, useRenderDialogRoot, DialogBackdrop, DialogClose, DialogDescription, DialogPopup, DialogPortal, DialogTitle, DialogTrigger, DialogViewport, DialogHandle, createDialogHandle };
