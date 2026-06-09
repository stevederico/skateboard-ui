import {
  getPseudoElementBounds
} from "./_chunk-b0nc8wq7.js";
import {
  Separator
} from "./_chunk-n11h505c.js";
import {
  useMenubarContext
} from "./_chunk-wx2nxg0p.js";
import {
  CompositeItem
} from "./_chunk-f2wttwrf.js";
import {
  useTriggerFocusGuards
} from "./_chunk-8ganmsbg.js";
import {
  useAnchoredPopupScrollLock
} from "./_chunk-ebyxgtb4.js";
import {
  useToolbarRootContext
} from "./_chunk-mnd0j7v9.js";
import {
  usePopupViewport
} from "./_chunk-qbezxj1g.js";
import {
  adaptiveOrigin,
  getDisabledMountTransitionStyles,
  useAnchorPositioning,
  usePositioner
} from "./_chunk-fqry7pew.js";
import {
  useCompositeListItem
} from "./_chunk-3enq1vat.js";
import {
  isElementDisabled
} from "./_chunk-26cc610z.js";
import {
  CompositeList
} from "./_chunk-j29xjete.js";
import {
  useDirection
} from "./_chunk-gy0bpkmx.js";
import {
  useControlled
} from "./_chunk-9x63vfqj.js";
import {
  InternalBackdrop,
  useOpenInteractionType
} from "./_chunk-ytnp24gq.js";
import {
  createInitialPopupStoreState,
  popupStoreSelectors
} from "./_chunk-q5cg71p7.js";
import {
  FOCUSABLE_POPUP_PROPS,
  useImplicitActiveTrigger,
  useOnFirstRender,
  useOpenStateTransitions,
  usePopupInteractionProps,
  useTriggerDataForwarding,
  useTriggerRegistration
} from "./_chunk-242gh8ph.js";
import {
  popupStateMapping,
  pressableTriggerOpenStateMapping,
  triggerOpenStateMapping
} from "./_chunk-t7ppm3t0.js";
import {
  inertValue
} from "./_chunk-3cpd1vjz.js";
import {
  DROPDOWN_COLLISION_AVOIDANCE,
  FloatingFocusManager,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  FloatingTreeStore,
  FocusGuard,
  PATIENT_CLICK_THRESHOLD,
  POPUP_COLLISION_AVOIDANCE,
  PopupTriggerMap,
  ReactStore,
  TYPEAHEAD_RESET_MS,
  createSelector,
  fastComponent,
  fastComponentRef,
  safePolygon,
  useClick,
  useDismiss,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useFocus,
  useHoverFloatingInteraction,
  useHoverReferenceInteraction,
  useListNavigation,
  useSyncedFloatingRootContext,
  useTypeahead
} from "./_chunk-2z044bba.js";
import {
  contains
} from "./_chunk-cgptgywc.js";
import {
  COMPOSITE_KEYS
} from "./_chunk-pv7b791x.js";
import {
  isMac
} from "./_chunk-rrh8rt4v.js";
import {
  useTimeout
} from "./_chunk-b6dkjkbw.js";
import {
  ownerDocument
} from "./_chunk-451nqgsa.js";
import {
  createChangeEventDetails,
  exports_reason_parts
} from "./_chunk-e56mpvk1.js";
import {
  useBaseUiId,
  useId
} from "./_chunk-wdqynnjf.js";
import {
  transitionStatusMapping,
  useAnimationsFinished,
  useOpenChangeComplete,
  useTransitionStatus
} from "./_chunk-e13rsb6b.js";
import {
  useButton
} from "./_chunk-5xmdvndx.js";
import {
  useCompositeRootContext
} from "./_chunk-cdgfsr3q.js";
import {
  getParentNode,
  isHTMLElement,
  isLastTraversableNode
} from "./_chunk-000kmre8.js";
import {
  useStableCallback
} from "./_chunk-cwvtvwc7.js";
import {
  SafeReact,
  useIsoLayoutEffect
} from "./_chunk-5tze5c8q.js";
import {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  useMergedRefs,
  useRefWithInit,
  useRenderElement,
  warn
} from "./_chunk-x8xehj6d.js";
import {
  __export,
  mergeProps
} from "./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/menu/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  createHandle: () => createMenuHandle,
  Viewport: () => MenuViewport,
  Trigger: () => MenuTrigger,
  SubmenuTrigger: () => MenuSubmenuTrigger,
  SubmenuRoot: () => MenuSubmenuRoot,
  Separator: () => Separator,
  Root: () => MenuRoot,
  RadioItemIndicator: () => MenuRadioItemIndicator,
  RadioItem: () => MenuRadioItem,
  RadioGroup: () => MenuRadioGroup,
  Positioner: () => MenuPositioner,
  Portal: () => MenuPortal,
  Popup: () => MenuPopup,
  LinkItem: () => MenuLinkItem,
  Item: () => MenuItem,
  Handle: () => MenuHandle,
  GroupLabel: () => MenuGroupLabel,
  Group: () => MenuGroup,
  CheckboxItemIndicator: () => MenuCheckboxItemIndicator,
  CheckboxItem: () => MenuCheckboxItem,
  Backdrop: () => MenuBackdrop,
  Arrow: () => MenuArrow
});

// node_modules/@base-ui/react/esm/menu/arrow/MenuArrow.js
import * as React3 from "react";

// node_modules/@base-ui/react/esm/menu/positioner/MenuPositionerContext.js
import * as React from "react";
"use client";
var MenuPositionerContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  MenuPositionerContext.displayName = "MenuPositionerContext";
function useMenuPositionerContext(optional) {
  const context = React.useContext(MenuPositionerContext);
  if (context === undefined && !optional) {
    throw new Error("Base UI: MenuPositionerContext is missing. MenuPositioner parts must be placed within <Menu.Positioner>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/menu/root/MenuRootContext.js
import * as React2 from "react";
"use client";
var MenuRootContext = /* @__PURE__ */ React2.createContext(undefined);
if (true)
  MenuRootContext.displayName = "MenuRootContext";
function useMenuRootContext(optional) {
  const context = React2.useContext(MenuRootContext);
  if (context === undefined && !optional) {
    throw new Error("Base UI: MenuRootContext is missing. Menu parts must be placed within <Menu.Root>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/menu/arrow/MenuArrow.js
"use client";
var MenuArrow = /* @__PURE__ */ React3.forwardRef(function MenuArrow2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    store
  } = useMenuRootContext();
  const {
    arrowRef,
    side,
    align,
    arrowUncentered,
    arrowStyles
  } = useMenuPositionerContext();
  const open = store.useState("open");
  const state = {
    open,
    side,
    align,
    uncentered: arrowUncentered
  };
  return useRenderElement("div", componentProps, {
    ref: [arrowRef, forwardedRef],
    stateAttributesMapping: popupStateMapping,
    state,
    props: {
      style: arrowStyles,
      "aria-hidden": true,
      ...elementProps
    }
  });
});
if (true)
  MenuArrow.displayName = "MenuArrow";
// node_modules/@base-ui/react/esm/menu/backdrop/MenuBackdrop.js
import * as React5 from "react";

// node_modules/@base-ui/react/esm/context-menu/root/ContextMenuRootContext.js
import * as React4 from "react";
"use client";
var ContextMenuRootContext = /* @__PURE__ */ React4.createContext(undefined);
if (true)
  ContextMenuRootContext.displayName = "ContextMenuRootContext";
function useContextMenuRootContext(optional = true) {
  const context = React4.useContext(ContextMenuRootContext);
  if (context === undefined && !optional) {
    throw new Error("Base UI: ContextMenuRootContext is missing. ContextMenu parts must be placed within <ContextMenu.Root>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/menu/backdrop/MenuBackdrop.js
"use client";
var stateAttributesMapping = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
var MenuBackdrop = /* @__PURE__ */ React5.forwardRef(function MenuBackdrop2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    store
  } = useMenuRootContext();
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const transitionStatus = store.useState("transitionStatus");
  const lastOpenChangeReason = store.useState("lastOpenChangeReason");
  const contextMenuContext = useContextMenuRootContext();
  const state = {
    open,
    transitionStatus
  };
  return useRenderElement("div", componentProps, {
    ref: contextMenuContext?.backdropRef ? [forwardedRef, contextMenuContext.backdropRef] : forwardedRef,
    state,
    stateAttributesMapping,
    props: [{
      role: "presentation",
      hidden: !mounted,
      style: {
        pointerEvents: lastOpenChangeReason === exports_reason_parts.triggerHover ? "none" : undefined,
        userSelect: "none",
        WebkitUserSelect: "none"
      }
    }, elementProps]
  });
});
if (true)
  MenuBackdrop.displayName = "MenuBackdrop";
// node_modules/@base-ui/react/esm/menu/checkbox-item/MenuCheckboxItem.js
import * as React9 from "react";

// node_modules/@base-ui/react/esm/menu/checkbox-item/MenuCheckboxItemContext.js
import * as React6 from "react";
"use client";
var MenuCheckboxItemContext = /* @__PURE__ */ React6.createContext(undefined);
if (true)
  MenuCheckboxItemContext.displayName = "MenuCheckboxItemContext";
function useMenuCheckboxItemContext() {
  const context = React6.useContext(MenuCheckboxItemContext);
  if (context === undefined) {
    throw new Error("Base UI: MenuCheckboxItemContext is missing. MenuCheckboxItem parts must be placed within <Menu.CheckboxItem>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/menu/item/useMenuItem.js
import * as React8 from "react";

// node_modules/@base-ui/react/esm/menu/item/useMenuItemCommonProps.js
import * as React7 from "react";
"use client";
function useMenuItemCommonProps(params) {
  const {
    closeOnClick,
    highlighted,
    id,
    nodeId,
    store,
    typingRef,
    itemRef,
    itemMetadata
  } = params;
  const {
    events: menuEvents
  } = store.useState("floatingTreeRoot");
  const contextMenuContext = useContextMenuRootContext(true);
  const isContextMenu = contextMenuContext !== undefined;
  return React7.useMemo(() => ({
    id,
    role: "menuitem",
    tabIndex: highlighted ? 0 : -1,
    onKeyDown(event) {
      if (event.key === " " && typingRef?.current) {
        event.preventDefault();
      }
    },
    onMouseMove(event) {
      if (!nodeId) {
        return;
      }
      menuEvents.emit("itemhover", {
        nodeId,
        target: event.currentTarget
      });
    },
    onClick(event) {
      if (closeOnClick) {
        menuEvents.emit("close", {
          domEvent: event,
          reason: exports_reason_parts.itemPress
        });
      }
    },
    onMouseUp(event) {
      if (contextMenuContext) {
        const initialCursorPoint = contextMenuContext.initialCursorPointRef.current;
        contextMenuContext.initialCursorPointRef.current = null;
        if (isContextMenu && initialCursorPoint && Math.abs(event.clientX - initialCursorPoint.x) <= 1 && Math.abs(event.clientY - initialCursorPoint.y) <= 1) {
          return;
        }
        if (isContextMenu && !isMac && event.button === 2) {
          return;
        }
      }
      if (itemRef.current && store.context.allowMouseUpTriggerRef.current && (!isContextMenu || event.button === 2)) {
        if (!itemMetadata || itemMetadata.type === "regular-item") {
          itemRef.current.click();
        }
      }
    }
  }), [closeOnClick, highlighted, id, menuEvents, nodeId, store, typingRef, itemRef, contextMenuContext, isContextMenu, itemMetadata]);
}

// node_modules/@base-ui/react/esm/menu/item/useMenuItem.js
"use client";
var REGULAR_ITEM = {
  type: "regular-item"
};
function useMenuItem(params) {
  const {
    closeOnClick,
    disabled = false,
    highlighted,
    id,
    store,
    typingRef = store.context.typingRef,
    nativeButton,
    itemMetadata,
    nodeId
  } = params;
  const itemRef = React8.useRef(null);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton,
    composite: true
  });
  const commonProps = useMenuItemCommonProps({
    closeOnClick,
    highlighted,
    id,
    nodeId,
    store,
    typingRef,
    itemRef,
    itemMetadata
  });
  const getItemProps = React8.useCallback((externalProps) => {
    return mergeProps(commonProps, {
      onMouseEnter() {
        if (itemMetadata.type !== "submenu-trigger") {
          return;
        }
        itemMetadata.setActive();
      }
    }, externalProps, getButtonProps);
  }, [commonProps, getButtonProps, itemMetadata]);
  const mergedRef = useMergedRefs(itemRef, buttonRef);
  return React8.useMemo(() => ({
    getItemProps,
    itemRef: mergedRef
  }), [getItemProps, mergedRef]);
}

// node_modules/@base-ui/react/esm/menu/checkbox-item/MenuCheckboxItemDataAttributes.js
var MenuCheckboxItemDataAttributes = /* @__PURE__ */ function(MenuCheckboxItemDataAttributes2) {
  MenuCheckboxItemDataAttributes2["checked"] = "data-checked";
  MenuCheckboxItemDataAttributes2["unchecked"] = "data-unchecked";
  MenuCheckboxItemDataAttributes2["disabled"] = "data-disabled";
  MenuCheckboxItemDataAttributes2["highlighted"] = "data-highlighted";
  return MenuCheckboxItemDataAttributes2;
}({});

// node_modules/@base-ui/react/esm/menu/utils/stateAttributesMapping.js
var itemMapping = {
  checked(value) {
    if (value) {
      return {
        [MenuCheckboxItemDataAttributes.checked]: ""
      };
    }
    return {
      [MenuCheckboxItemDataAttributes.unchecked]: ""
    };
  },
  ...transitionStatusMapping
};

// node_modules/@base-ui/react/esm/menu/checkbox-item/MenuCheckboxItem.js
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
var MenuCheckboxItem = /* @__PURE__ */ React9.forwardRef(function MenuCheckboxItem2(componentProps, forwardedRef) {
  const {
    render,
    className,
    id: idProp,
    label,
    nativeButton = false,
    disabled = false,
    closeOnClick = false,
    checked: checkedProp,
    defaultChecked,
    onCheckedChange,
    style,
    ...elementProps
  } = componentProps;
  const listItem = useCompositeListItem({
    label
  });
  const menuPositionerContext = useMenuPositionerContext(true);
  const id = useBaseUiId(idProp);
  const {
    store
  } = useMenuRootContext();
  const highlighted = store.useState("isActive", listItem.index);
  const itemProps = store.useState("itemProps");
  const [checked, setChecked] = useControlled({
    controlled: checkedProp,
    default: defaultChecked ?? false,
    name: "MenuCheckboxItem",
    state: "checked"
  });
  const {
    getItemProps,
    itemRef
  } = useMenuItem({
    closeOnClick,
    disabled,
    highlighted,
    id,
    store,
    nativeButton,
    nodeId: menuPositionerContext?.context.nodeId,
    itemMetadata: REGULAR_ITEM
  });
  const state = React9.useMemo(() => ({
    disabled,
    highlighted,
    checked
  }), [disabled, highlighted, checked]);
  function handleClick(event) {
    const details = createChangeEventDetails(exports_reason_parts.itemPress, event.nativeEvent, undefined, {
      preventUnmountOnClose() {}
    });
    onCheckedChange?.(!checked, details);
    if (details.isCanceled) {
      return;
    }
    setChecked((currentlyChecked) => !currentlyChecked);
  }
  const element = useRenderElement("div", componentProps, {
    state,
    stateAttributesMapping: itemMapping,
    props: [itemProps, {
      role: "menuitemcheckbox",
      "aria-checked": checked,
      onClick: handleClick
    }, elementProps, getItemProps],
    ref: [itemRef, forwardedRef, listItem.ref]
  });
  return /* @__PURE__ */ _jsx(MenuCheckboxItemContext.Provider, {
    value: state,
    children: element
  });
});
if (true)
  MenuCheckboxItem.displayName = "MenuCheckboxItem";
// node_modules/@base-ui/react/esm/menu/checkbox-item-indicator/MenuCheckboxItemIndicator.js
import * as React10 from "react";
"use client";
var MenuCheckboxItemIndicator = /* @__PURE__ */ React10.forwardRef(function MenuCheckboxItemIndicator2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    keepMounted = false,
    ...elementProps
  } = componentProps;
  const item = useMenuCheckboxItemContext();
  const indicatorRef = React10.useRef(null);
  const {
    transitionStatus,
    setMounted
  } = useTransitionStatus(item.checked);
  useOpenChangeComplete({
    open: item.checked,
    ref: indicatorRef,
    onComplete() {
      if (!item.checked) {
        setMounted(false);
      }
    }
  });
  const state = {
    checked: item.checked,
    disabled: item.disabled,
    highlighted: item.highlighted,
    transitionStatus
  };
  const element = useRenderElement("span", componentProps, {
    state,
    ref: [forwardedRef, indicatorRef],
    stateAttributesMapping: itemMapping,
    props: {
      "aria-hidden": true,
      ...elementProps
    },
    enabled: keepMounted || item.checked
  });
  return element;
});
if (true)
  MenuCheckboxItemIndicator.displayName = "MenuCheckboxItemIndicator";
// node_modules/@base-ui/react/esm/menu/group/MenuGroup.js
import * as React12 from "react";

// node_modules/@base-ui/react/esm/menu/group/MenuGroupContext.js
import * as React11 from "react";
"use client";
var MenuGroupContext = /* @__PURE__ */ React11.createContext(undefined);
if (true)
  MenuGroupContext.displayName = "MenuGroupContext";
function useMenuGroupRootContext() {
  const context = React11.useContext(MenuGroupContext);
  if (context === undefined) {
    throw new Error("Base UI: MenuGroupContext is missing. Menu group parts must be used within <Menu.Group> or <Menu.RadioGroup>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/menu/group/MenuGroup.js
import { jsx as _jsx2 } from "react/jsx-runtime";
"use client";
var MenuGroup = /* @__PURE__ */ React12.forwardRef(function MenuGroup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const [labelId, setLabelId] = React12.useState(undefined);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: {
      role: "group",
      "aria-labelledby": labelId,
      ...elementProps
    }
  });
  return /* @__PURE__ */ _jsx2(MenuGroupContext.Provider, {
    value: setLabelId,
    children: element
  });
});
if (true)
  MenuGroup.displayName = "MenuGroup";
// node_modules/@base-ui/react/esm/menu/group-label/MenuGroupLabel.js
import * as React13 from "react";
"use client";
var MenuGroupLabel = /* @__PURE__ */ React13.forwardRef(function MenuGroupLabel2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    ...elementProps
  } = componentProps;
  const id = useBaseUiId(idProp);
  const setLabelId = useMenuGroupRootContext();
  useIsoLayoutEffect(() => {
    setLabelId(id);
    return () => {
      setLabelId(undefined);
    };
  }, [setLabelId, id]);
  return useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: {
      id,
      role: "presentation",
      ...elementProps
    }
  });
});
if (true)
  MenuGroupLabel.displayName = "MenuGroupLabel";
// node_modules/@base-ui/react/esm/menu/item/MenuItem.js
import * as React14 from "react";
"use client";
var MenuItem = /* @__PURE__ */ React14.forwardRef(function MenuItem2(componentProps, forwardedRef) {
  const {
    render,
    className,
    id: idProp,
    label,
    nativeButton = false,
    disabled = false,
    closeOnClick = true,
    style,
    ...elementProps
  } = componentProps;
  const listItem = useCompositeListItem({
    label
  });
  const menuPositionerContext = useMenuPositionerContext(true);
  const id = useBaseUiId(idProp);
  const {
    store
  } = useMenuRootContext();
  const highlighted = store.useState("isActive", listItem.index);
  const itemProps = store.useState("itemProps");
  const {
    getItemProps,
    itemRef
  } = useMenuItem({
    closeOnClick,
    disabled,
    highlighted,
    id,
    store,
    nativeButton,
    nodeId: menuPositionerContext?.context.nodeId,
    itemMetadata: REGULAR_ITEM
  });
  const state = {
    disabled,
    highlighted
  };
  return useRenderElement("div", componentProps, {
    state,
    props: [itemProps, elementProps, getItemProps],
    ref: [itemRef, forwardedRef, listItem.ref]
  });
});
if (true)
  MenuItem.displayName = "MenuItem";
// node_modules/@base-ui/react/esm/menu/link-item/MenuLinkItem.js
import * as React15 from "react";
"use client";
var MenuLinkItem = /* @__PURE__ */ React15.forwardRef(function MenuLinkItem2(componentProps, forwardedRef) {
  const {
    render,
    className,
    id: idProp,
    label,
    closeOnClick = false,
    style,
    ...elementProps
  } = componentProps;
  const linkRef = React15.useRef(null);
  const listItem = useCompositeListItem({
    label
  });
  const menuPositionerContext = useMenuPositionerContext(true);
  const nodeId = menuPositionerContext?.context.nodeId;
  const id = useBaseUiId(idProp);
  const {
    store
  } = useMenuRootContext();
  const highlighted = store.useState("isActive", listItem.index);
  const itemProps = store.useState("itemProps");
  const typingRef = store.context.typingRef;
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    native: false,
    composite: true
  });
  const commonProps = useMenuItemCommonProps({
    closeOnClick,
    highlighted,
    id,
    nodeId,
    store,
    typingRef,
    itemRef: linkRef
  });
  function getItemProps(externalProps) {
    return mergeProps(commonProps, externalProps, getButtonProps);
  }
  const state = {
    highlighted
  };
  return useRenderElement("a", componentProps, {
    state,
    props: [itemProps, elementProps, getItemProps],
    ref: [linkRef, buttonRef, forwardedRef, listItem.ref]
  });
});
if (true)
  MenuLinkItem.displayName = "MenuLinkItem";
// node_modules/@base-ui/react/esm/menu/popup/MenuPopup.js
import * as React16 from "react";
import { jsx as _jsx3 } from "react/jsx-runtime";
"use client";
var stateAttributesMapping2 = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
var MenuPopup = /* @__PURE__ */ React16.forwardRef(function MenuPopup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    finalFocus,
    ...elementProps
  } = componentProps;
  const {
    store
  } = useMenuRootContext();
  const {
    side,
    align
  } = useMenuPositionerContext();
  const insideToolbar = useToolbarRootContext(true) != null;
  const open = store.useState("open");
  const transitionStatus = store.useState("transitionStatus");
  const popupProps = store.useState("popupProps");
  const mounted = store.useState("mounted");
  const instantType = store.useState("instantType");
  const triggerElement = store.useState("activeTriggerElement");
  const parent = store.useState("parent");
  const lastOpenChangeReason = store.useState("lastOpenChangeReason");
  const rootId = store.useState("rootId");
  const floatingContext = store.useState("floatingRootContext");
  const floatingTreeRoot = store.useState("floatingTreeRoot");
  const closeDelay = store.useState("closeDelay");
  const activeTriggerElement = store.useState("activeTriggerElement");
  const hoverEnabled = store.useState("hoverEnabled");
  const disabled = store.useState("disabled");
  const isContextMenu = parent.type === "context-menu";
  useOpenChangeComplete({
    open,
    ref: store.context.popupRef,
    onComplete() {
      if (open) {
        store.context.onOpenChangeComplete?.(true);
      }
    }
  });
  React16.useEffect(() => {
    function handleClose(event) {
      store.setOpen(false, createChangeEventDetails(event.reason, event.domEvent));
    }
    floatingTreeRoot.events.on("close", handleClose);
    return () => {
      floatingTreeRoot.events.off("close", handleClose);
    };
  }, [floatingTreeRoot.events, store]);
  useHoverFloatingInteraction(floatingContext, {
    enabled: hoverEnabled && !disabled && !isContextMenu && parent.type !== "menubar",
    closeDelay
  });
  const setPopupElement = React16.useCallback((element2) => {
    store.set("popupElement", element2);
  }, [store]);
  const state = {
    transitionStatus,
    side,
    align,
    open,
    nested: parent.type === "menu",
    instant: instantType
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, store.context.popupRef, setPopupElement],
    stateAttributesMapping: stateAttributesMapping2,
    props: [popupProps, {
      onKeyDown(event) {
        if (insideToolbar && COMPOSITE_KEYS.has(event.key)) {
          event.stopPropagation();
        }
      }
    }, getDisabledMountTransitionStyles(transitionStatus), elementProps, {
      "data-rootownerid": rootId
    }]
  });
  let returnFocus = parent.type === undefined || isContextMenu;
  if (triggerElement || parent.type === "menubar" && lastOpenChangeReason !== exports_reason_parts.outsidePress) {
    returnFocus = true;
  }
  return /* @__PURE__ */ _jsx3(FloatingFocusManager, {
    context: floatingContext,
    modal: isContextMenu,
    disabled: !mounted,
    returnFocus: finalFocus === undefined ? returnFocus : finalFocus,
    initialFocus: parent.type !== "menu",
    restoreFocus: true,
    externalTree: parent.type !== "menubar" ? floatingTreeRoot : undefined,
    previousFocusableElement: activeTriggerElement,
    nextFocusableElement: parent.type === undefined ? store.context.triggerFocusTargetRef : undefined,
    beforeContentFocusGuardRef: parent.type === undefined ? store.context.beforeContentFocusGuardRef : undefined,
    children: element
  });
});
if (true)
  MenuPopup.displayName = "MenuPopup";
// node_modules/@base-ui/react/esm/menu/portal/MenuPortal.js
import * as React18 from "react";

// node_modules/@base-ui/react/esm/menu/portal/MenuPortalContext.js
import * as React17 from "react";
"use client";
var MenuPortalContext = /* @__PURE__ */ React17.createContext(undefined);
if (true)
  MenuPortalContext.displayName = "MenuPortalContext";
function useMenuPortalContext() {
  const value = React17.useContext(MenuPortalContext);
  if (value === undefined) {
    throw new Error("Base UI: <Menu.Portal> is missing.");
  }
  return value;
}

// node_modules/@base-ui/react/esm/menu/portal/MenuPortal.js
import { jsx as _jsx4 } from "react/jsx-runtime";
"use client";
var MenuPortal = /* @__PURE__ */ React18.forwardRef(function MenuPortal2(props, forwardedRef) {
  const {
    keepMounted = false,
    ...portalProps
  } = props;
  const {
    store
  } = useMenuRootContext();
  const mounted = store.useState("mounted");
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ _jsx4(MenuPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ _jsx4(FloatingPortal, {
      ref: forwardedRef,
      ...portalProps
    })
  });
});
if (true)
  MenuPortal.displayName = "MenuPortal";
// node_modules/@base-ui/react/esm/menu/positioner/MenuPositioner.js
import * as React19 from "react";
import { jsx as _jsx5, jsxs as _jsxs } from "react/jsx-runtime";
"use client";
var MenuPositioner = /* @__PURE__ */ React19.forwardRef(function MenuPositioner2(componentProps, forwardedRef) {
  const {
    anchor: anchorProp,
    positionMethod: positionMethodProp = "absolute",
    className,
    render,
    side,
    align: alignProp,
    sideOffset: sideOffsetProp = 0,
    alignOffset: alignOffsetProp = 0,
    collisionBoundary = "clipping-ancestors",
    collisionPadding = 5,
    arrowPadding = 5,
    sticky = false,
    disableAnchorTracking = false,
    collisionAvoidance: collisionAvoidanceProp = DROPDOWN_COLLISION_AVOIDANCE,
    style,
    ...elementProps
  } = componentProps;
  const {
    store
  } = useMenuRootContext();
  const keepMounted = useMenuPortalContext();
  const contextMenuContext = useContextMenuRootContext(true);
  const parent = store.useState("parent");
  const floatingRootContext = store.useState("floatingRootContext");
  const floatingTreeRoot = store.useState("floatingTreeRoot");
  const mounted = store.useState("mounted");
  const open = store.useState("open");
  const modal = store.useState("modal");
  const openMethod = store.useState("openMethod");
  const triggerElement = store.useState("activeTriggerElement");
  const transitionStatus = store.useState("transitionStatus");
  const positionerElement = store.useState("positionerElement");
  const instantType = store.useState("instantType");
  const hasViewport = store.useState("hasViewport");
  const lastOpenChangeReason = store.useState("lastOpenChangeReason");
  const floatingNodeId = store.useState("floatingNodeId");
  const floatingParentNodeId = store.useState("floatingParentNodeId");
  const domReference = floatingRootContext.useState("domReferenceElement");
  const previousTriggerRef = React19.useRef(null);
  const runOnceAnimationsFinish = useAnimationsFinished(positionerElement, false, false);
  let anchor = anchorProp;
  let sideOffset = sideOffsetProp;
  let alignOffset = alignOffsetProp;
  let align = alignProp;
  let collisionAvoidance = collisionAvoidanceProp;
  if (parent.type === "context-menu") {
    anchor = anchorProp ?? parent.context?.anchor;
    align = align ?? "start";
    if (!side && align !== "center") {
      alignOffset = componentProps.alignOffset ?? 2;
      sideOffset = componentProps.sideOffset ?? -5;
    }
  }
  let computedSide = side;
  let computedAlign = align;
  if (parent.type === "menu") {
    computedSide = computedSide ?? "inline-end";
    computedAlign = computedAlign ?? "start";
    collisionAvoidance = componentProps.collisionAvoidance ?? POPUP_COLLISION_AVOIDANCE;
  } else if (parent.type === "menubar") {
    computedSide = computedSide ?? "bottom";
    computedAlign = computedAlign ?? "start";
  }
  const contextMenu = parent.type === "context-menu";
  const positioner = useAnchorPositioning({
    anchor,
    floatingRootContext,
    positionMethod: contextMenuContext ? "fixed" : positionMethodProp,
    mounted,
    side: computedSide,
    sideOffset,
    align: computedAlign,
    alignOffset,
    arrowPadding: contextMenu ? 0 : arrowPadding,
    collisionBoundary,
    collisionPadding,
    sticky,
    nodeId: floatingNodeId,
    keepMounted,
    disableAnchorTracking,
    collisionAvoidance,
    shiftCrossAxis: contextMenu && !(("side" in collisionAvoidance) && collisionAvoidance.side === "flip"),
    externalTree: floatingTreeRoot,
    adaptiveOrigin: hasViewport ? adaptiveOrigin : undefined
  });
  React19.useEffect(() => {
    function onMenuOpenChange(details) {
      if (details.open) {
        if (details.parentNodeId === floatingNodeId) {
          store.set("hoverEnabled", false);
        }
        if (details.nodeId !== floatingNodeId && details.parentNodeId === store.select("floatingParentNodeId")) {
          store.setOpen(false, createChangeEventDetails(exports_reason_parts.siblingOpen));
        }
      }
    }
    floatingTreeRoot.events.on("menuopenchange", onMenuOpenChange);
    return () => {
      floatingTreeRoot.events.off("menuopenchange", onMenuOpenChange);
    };
  }, [store, floatingTreeRoot.events, floatingNodeId]);
  React19.useEffect(() => {
    if (store.select("floatingParentNodeId") == null) {
      return;
    }
    function onParentClose(details) {
      if (details.open || details.nodeId !== store.select("floatingParentNodeId")) {
        return;
      }
      const reason = details.reason ?? exports_reason_parts.siblingOpen;
      store.setOpen(false, createChangeEventDetails(reason));
    }
    floatingTreeRoot.events.on("menuopenchange", onParentClose);
    return () => {
      floatingTreeRoot.events.off("menuopenchange", onParentClose);
    };
  }, [floatingTreeRoot.events, store]);
  const closeTimeout = useTimeout();
  React19.useEffect(() => {
    if (!open) {
      closeTimeout.clear();
    }
  }, [open, closeTimeout]);
  React19.useEffect(() => {
    function onItemHover(event) {
      if (!open || event.nodeId !== store.select("floatingParentNodeId")) {
        return;
      }
      if (event.target && triggerElement && triggerElement !== event.target) {
        const delay = store.select("closeDelay");
        if (delay > 0) {
          if (!closeTimeout.isStarted()) {
            closeTimeout.start(delay, () => {
              store.setOpen(false, createChangeEventDetails(exports_reason_parts.siblingOpen));
            });
          }
        } else {
          store.setOpen(false, createChangeEventDetails(exports_reason_parts.siblingOpen));
        }
      } else {
        closeTimeout.clear();
      }
    }
    floatingTreeRoot.events.on("itemhover", onItemHover);
    return () => {
      floatingTreeRoot.events.off("itemhover", onItemHover);
    };
  }, [floatingTreeRoot.events, open, triggerElement, store, closeTimeout]);
  React19.useEffect(() => {
    const eventDetails = {
      open,
      nodeId: floatingNodeId,
      parentNodeId: floatingParentNodeId,
      reason: store.select("lastOpenChangeReason")
    };
    floatingTreeRoot.events.emit("menuopenchange", eventDetails);
  }, [floatingTreeRoot.events, open, store, floatingNodeId, floatingParentNodeId]);
  useIsoLayoutEffect(() => {
    const currentTrigger = domReference;
    const previousTrigger = previousTriggerRef.current;
    if (currentTrigger) {
      previousTriggerRef.current = currentTrigger;
    }
    if (previousTrigger && currentTrigger && currentTrigger !== previousTrigger) {
      store.set("instantType", undefined);
      const abortController = new AbortController;
      runOnceAnimationsFinish(() => {
        store.set("instantType", "trigger-change");
      }, abortController.signal);
      return () => {
        abortController.abort();
      };
    }
    return;
  }, [domReference, runOnceAnimationsFinish, store]);
  const state = {
    open,
    side: positioner.side,
    align: positioner.align,
    anchorHidden: positioner.anchorHidden,
    nested: parent.type === "menu",
    instant: instantType
  };
  const menubarModal = parent.type === "menubar" && parent.context.modal;
  const popupModal = modal && lastOpenChangeReason !== exports_reason_parts.triggerHover;
  useAnchoredPopupScrollLock(open && (menubarModal || popupModal), openMethod === "touch", positionerElement, triggerElement);
  const element = usePositioner(componentProps, state, {
    styles: positioner.positionerStyles,
    transitionStatus,
    props: elementProps,
    refs: [forwardedRef, store.useStateSetter("positionerElement")],
    hidden: !mounted,
    inert: !open
  });
  const shouldRenderBackdrop = mounted && parent.type !== "menu" && (parent.type !== "menubar" && modal && lastOpenChangeReason !== exports_reason_parts.triggerHover || parent.type === "menubar" && parent.context.modal);
  let backdropCutout = null;
  if (parent.type === "menubar") {
    backdropCutout = parent.context.contentElement;
  } else if (parent.type === undefined) {
    backdropCutout = triggerElement;
  }
  return /* @__PURE__ */ _jsxs(MenuPositionerContext.Provider, {
    value: positioner,
    children: [shouldRenderBackdrop && /* @__PURE__ */ _jsx5(InternalBackdrop, {
      ref: parent.type === "context-menu" || parent.type === "nested-context-menu" ? parent.context.internalBackdropRef : null,
      inert: inertValue(!open),
      cutout: backdropCutout
    }), /* @__PURE__ */ _jsx5(FloatingNode, {
      id: floatingNodeId,
      children: /* @__PURE__ */ _jsx5(CompositeList, {
        elementsRef: store.context.itemDomElements,
        labelsRef: store.context.itemLabels,
        children: element
      })
    })]
  });
});
if (true)
  MenuPositioner.displayName = "MenuPositioner";
// node_modules/@base-ui/react/esm/menu/radio-group/MenuRadioGroup.js
import * as React21 from "react";

// node_modules/@base-ui/react/esm/menu/radio-group/MenuRadioGroupContext.js
import * as React20 from "react";
"use client";
var MenuRadioGroupContext = /* @__PURE__ */ React20.createContext(undefined);
if (true)
  MenuRadioGroupContext.displayName = "MenuRadioGroupContext";
function useMenuRadioGroupContext() {
  const context = React20.useContext(MenuRadioGroupContext);
  if (context === undefined) {
    throw new Error("Base UI: MenuRadioGroupContext is missing. MenuRadioGroup parts must be placed within <Menu.RadioGroup>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/menu/radio-group/MenuRadioGroup.js
import { jsx as _jsx6 } from "react/jsx-runtime";
"use client";
var MenuRadioGroup = /* @__PURE__ */ React21.memo(/* @__PURE__ */ React21.forwardRef(function MenuRadioGroup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    value: valueProp,
    defaultValue,
    onValueChange: onValueChangeProp,
    disabled = false,
    style,
    "aria-labelledby": ariaLabelledByProp,
    ...elementProps
  } = componentProps;
  const [labelId, setLabelId] = React21.useState(undefined);
  const [value, setValueUnwrapped] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "MenuRadioGroup"
  });
  const setValue = useStableCallback((newValue, eventDetails) => {
    onValueChangeProp?.(newValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValueUnwrapped(newValue);
  });
  const state = {
    disabled
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: {
      role: "group",
      "aria-labelledby": ariaLabelledByProp ?? labelId,
      "aria-disabled": disabled || undefined,
      ...elementProps
    }
  });
  const context = React21.useMemo(() => ({
    value,
    setValue,
    disabled
  }), [value, setValue, disabled]);
  return /* @__PURE__ */ _jsx6(MenuGroupContext.Provider, {
    value: setLabelId,
    children: /* @__PURE__ */ _jsx6(MenuRadioGroupContext.Provider, {
      value: context,
      children: element
    })
  });
}));
if (true)
  MenuRadioGroup.displayName = "MenuRadioGroup";
// node_modules/@base-ui/react/esm/menu/radio-item/MenuRadioItem.js
import * as React23 from "react";

// node_modules/@base-ui/react/esm/menu/radio-item/MenuRadioItemContext.js
import * as React22 from "react";
"use client";
var MenuRadioItemContext = /* @__PURE__ */ React22.createContext(undefined);
if (true)
  MenuRadioItemContext.displayName = "MenuRadioItemContext";
function useMenuRadioItemContext() {
  const context = React22.useContext(MenuRadioItemContext);
  if (context === undefined) {
    throw new Error("Base UI: MenuRadioItemContext is missing. MenuRadioItem parts must be placed within <Menu.RadioItem>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/menu/radio-item/MenuRadioItem.js
import { jsx as _jsx7 } from "react/jsx-runtime";
"use client";
var MenuRadioItem = /* @__PURE__ */ React23.forwardRef(function MenuRadioItem2(componentProps, forwardedRef) {
  const {
    render,
    className,
    id: idProp,
    label,
    nativeButton = false,
    disabled: disabledProp = false,
    closeOnClick = false,
    value,
    style,
    ...elementProps
  } = componentProps;
  const listItem = useCompositeListItem({
    label
  });
  const menuPositionerContext = useMenuPositionerContext(true);
  const id = useBaseUiId(idProp);
  const {
    store
  } = useMenuRootContext();
  const highlighted = store.useState("isActive", listItem.index);
  const itemProps = store.useState("itemProps");
  const {
    value: selectedValue,
    setValue: setSelectedValue,
    disabled: groupDisabled
  } = useMenuRadioGroupContext();
  const disabled = groupDisabled || disabledProp;
  const checked = selectedValue === value;
  const {
    getItemProps,
    itemRef
  } = useMenuItem({
    closeOnClick,
    disabled,
    highlighted,
    id,
    store,
    nativeButton,
    nodeId: menuPositionerContext?.context.nodeId,
    itemMetadata: REGULAR_ITEM
  });
  const state = React23.useMemo(() => ({
    disabled,
    highlighted,
    checked
  }), [disabled, highlighted, checked]);
  function handleClick(event) {
    const details = createChangeEventDetails(exports_reason_parts.itemPress, event.nativeEvent, undefined, {
      preventUnmountOnClose() {}
    });
    setSelectedValue(value, details);
  }
  const element = useRenderElement("div", componentProps, {
    state,
    stateAttributesMapping: itemMapping,
    props: [itemProps, {
      role: "menuitemradio",
      "aria-checked": checked,
      onClick: handleClick
    }, elementProps, getItemProps],
    ref: [itemRef, forwardedRef, listItem.ref]
  });
  return /* @__PURE__ */ _jsx7(MenuRadioItemContext.Provider, {
    value: state,
    children: element
  });
});
if (true)
  MenuRadioItem.displayName = "MenuRadioItem";
// node_modules/@base-ui/react/esm/menu/radio-item-indicator/MenuRadioItemIndicator.js
import * as React24 from "react";
"use client";
var MenuRadioItemIndicator = /* @__PURE__ */ React24.forwardRef(function MenuRadioItemIndicator2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    keepMounted = false,
    ...elementProps
  } = componentProps;
  const item = useMenuRadioItemContext();
  const indicatorRef = React24.useRef(null);
  const {
    transitionStatus,
    setMounted
  } = useTransitionStatus(item.checked);
  useOpenChangeComplete({
    open: item.checked,
    ref: indicatorRef,
    onComplete() {
      if (!item.checked) {
        setMounted(false);
      }
    }
  });
  const state = {
    checked: item.checked,
    disabled: item.disabled,
    highlighted: item.highlighted,
    transitionStatus
  };
  const element = useRenderElement("span", componentProps, {
    state,
    stateAttributesMapping: itemMapping,
    ref: [forwardedRef, indicatorRef],
    props: {
      "aria-hidden": true,
      ...elementProps
    },
    enabled: keepMounted || item.checked
  });
  return element;
});
if (true)
  MenuRadioItemIndicator.displayName = "MenuRadioItemIndicator";
// node_modules/@base-ui/react/esm/menu/root/MenuRoot.js
import * as React27 from "react";

// node_modules/@base-ui/react/esm/menu/store/MenuStore.js
import * as React25 from "react";
var selectors = {
  ...popupStoreSelectors,
  disabled: createSelector((state) => state.parent.type === "menubar" ? state.parent.context.disabled || state.disabled : state.disabled),
  modal: createSelector((state) => (state.parent.type === undefined || state.parent.type === "context-menu") && (state.modal ?? true)),
  openMethod: createSelector((state) => state.openMethod),
  allowMouseEnter: createSelector((state) => state.allowMouseEnter),
  stickIfOpen: createSelector((state) => state.stickIfOpen),
  parent: createSelector((state) => state.parent),
  rootId: createSelector((state) => {
    if (state.parent.type === "menu") {
      return state.parent.store.select("rootId");
    }
    return state.parent.type !== undefined ? state.parent.context.rootId : state.rootId;
  }),
  activeIndex: createSelector((state) => state.activeIndex),
  isActive: createSelector((state, itemIndex) => state.activeIndex === itemIndex),
  hoverEnabled: createSelector((state) => state.hoverEnabled),
  instantType: createSelector((state) => state.instantType),
  lastOpenChangeReason: createSelector((state) => state.openChangeReason),
  floatingTreeRoot: createSelector((state) => {
    if (state.parent.type === "menu") {
      return state.parent.store.select("floatingTreeRoot");
    }
    return state.floatingTreeRoot;
  }),
  floatingNodeId: createSelector((state) => state.floatingNodeId),
  floatingParentNodeId: createSelector((state) => state.floatingParentNodeId),
  itemProps: createSelector((state) => state.itemProps),
  closeDelay: createSelector((state) => state.closeDelay),
  hasViewport: createSelector((state) => state.hasViewport),
  keyboardEventRelay: createSelector((state) => {
    if (state.keyboardEventRelay) {
      return state.keyboardEventRelay;
    }
    if (state.parent.type === "menu") {
      return state.parent.store.select("keyboardEventRelay");
    }
    return;
  })
};

class MenuStore extends ReactStore {
  constructor(initialState) {
    super({
      ...createInitialState(),
      ...initialState
    }, {
      positionerRef: /* @__PURE__ */ React25.createRef(),
      popupRef: /* @__PURE__ */ React25.createRef(),
      typingRef: {
        current: false
      },
      itemDomElements: {
        current: []
      },
      itemLabels: {
        current: []
      },
      allowMouseUpTriggerRef: {
        current: false
      },
      triggerFocusTargetRef: /* @__PURE__ */ React25.createRef(),
      beforeContentFocusGuardRef: /* @__PURE__ */ React25.createRef(),
      onOpenChangeComplete: undefined,
      triggerElements: new PopupTriggerMap
    }, selectors);
    this.unsubscribeParentListener = this.observe("parent", (parent) => {
      this.unsubscribeParentListener?.();
      if (parent.type === "menu") {
        let rootId = parent.store.select("rootId");
        let floatingTreeRoot = parent.store.select("floatingTreeRoot");
        let keyboardEventRelay = parent.store.select("keyboardEventRelay");
        this.unsubscribeParentListener = parent.store.subscribe(() => {
          const nextRootId = parent.store.select("rootId");
          const nextFloatingTreeRoot = parent.store.select("floatingTreeRoot");
          const nextKeyboardEventRelay = parent.store.select("keyboardEventRelay");
          if (rootId === nextRootId && floatingTreeRoot === nextFloatingTreeRoot && keyboardEventRelay === nextKeyboardEventRelay) {
            return;
          }
          rootId = nextRootId;
          floatingTreeRoot = nextFloatingTreeRoot;
          keyboardEventRelay = nextKeyboardEventRelay;
          this.notifyAll();
        });
        this.context.allowMouseUpTriggerRef = parent.store.context.allowMouseUpTriggerRef;
        return;
      }
      if (parent.type !== undefined) {
        this.context.allowMouseUpTriggerRef = parent.context.allowMouseUpTriggerRef;
      }
      this.unsubscribeParentListener = null;
    });
  }
  setOpen(open, eventDetails) {
    this.state.floatingRootContext.context.events.emit("setOpen", {
      open,
      eventDetails
    });
  }
  static useStore(externalStore, initialState) {
    const internalStore = useRefWithInit(() => {
      return new MenuStore(initialState);
    }).current;
    return externalStore ?? internalStore;
  }
  unsubscribeParentListener = null;
}
function createInitialState() {
  return {
    ...createInitialPopupStoreState(),
    disabled: false,
    modal: true,
    openMethod: null,
    allowMouseEnter: false,
    stickIfOpen: true,
    parent: {
      type: undefined
    },
    rootId: undefined,
    activeIndex: null,
    hoverEnabled: true,
    instantType: undefined,
    openChangeReason: null,
    floatingTreeRoot: new FloatingTreeStore,
    floatingNodeId: undefined,
    floatingParentNodeId: null,
    itemProps: EMPTY_OBJECT,
    keyboardEventRelay: undefined,
    closeDelay: 0,
    hasViewport: false
  };
}

// node_modules/@base-ui/react/esm/menu/submenu-root/MenuSubmenuRootContext.js
import * as React26 from "react";
"use client";
var MenuSubmenuRootContext = /* @__PURE__ */ React26.createContext(undefined);
if (true)
  MenuSubmenuRootContext.displayName = "MenuSubmenuRootContext";
function useMenuSubmenuRootContext() {
  return React26.useContext(MenuSubmenuRootContext);
}

// node_modules/@base-ui/react/esm/menu/root/MenuRoot.js
import { jsx as _jsx8 } from "react/jsx-runtime";
"use client";
var MenuRoot = fastComponent(function MenuRoot2(props) {
  const {
    children,
    open: openProp,
    onOpenChange,
    onOpenChangeComplete,
    defaultOpen = false,
    disabled: disabledProp = false,
    modal: modalProp,
    loopFocus = true,
    orientation = "vertical",
    actionsRef,
    closeParentOnEsc = false,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null,
    highlightItemOnHover = true
  } = props;
  const contextMenuContext = useContextMenuRootContext(true);
  const parentMenuRootContext = useMenuRootContext(true);
  const menubarContext = useMenubarContext(true);
  const isSubmenu = useMenuSubmenuRootContext();
  const parentFromContext = React27.useMemo(() => {
    if (isSubmenu && parentMenuRootContext) {
      return {
        type: "menu",
        store: parentMenuRootContext.store
      };
    }
    if (menubarContext) {
      return {
        type: "menubar",
        context: menubarContext
      };
    }
    if (contextMenuContext && !parentMenuRootContext) {
      return {
        type: "context-menu",
        context: contextMenuContext
      };
    }
    return {
      type: undefined
    };
  }, [contextMenuContext, parentMenuRootContext, menubarContext, isSubmenu]);
  const store = MenuStore.useStore(handle?.store, {
    open: defaultOpen,
    openProp,
    activeTriggerId: defaultTriggerIdProp,
    triggerIdProp,
    parent: parentFromContext
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
  store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
  const rootId = useId();
  const floatingId = useId();
  const floatingTreeRoot = store.useState("floatingTreeRoot");
  const floatingNodeIdFromContext = useFloatingNodeId(floatingTreeRoot);
  const floatingParentNodeIdFromContext = useFloatingParentNodeId();
  const open = store.useState("open");
  const activeTriggerElement = store.useState("activeTriggerElement");
  const positionerElement = store.useState("positionerElement");
  const hoverEnabled = store.useState("hoverEnabled");
  const disabled = store.useState("disabled");
  const lastOpenChangeReason = store.useState("lastOpenChangeReason");
  const parent = store.useState("parent");
  const activeIndex = store.useState("activeIndex");
  const payload = store.useState("payload");
  const floatingParentNodeId = store.useState("floatingParentNodeId");
  const openEventRef = React27.useRef(null);
  const allowOutsidePressDismissalRef = React27.useRef(parent.type !== "context-menu");
  const allowOutsidePressDismissalTimeout = useTimeout();
  const allowTouchToCloseRef = React27.useRef(true);
  const allowTouchToCloseTimeout = useTimeout();
  const nested = floatingParentNodeId != null;
  if (true) {
    if (parent.type !== undefined && modalProp !== undefined) {
      console.warn("Base UI: The `modal` prop is not supported on nested menus. It will be ignored.");
    }
  }
  const {
    openMethod,
    triggerProps: interactionTypeProps
  } = useOpenInteractionType(open);
  store.useSyncedValues({
    disabled: disabledProp,
    modal: parent.type === undefined ? modalProp : undefined,
    openMethod,
    rootId
  });
  useImplicitActiveTrigger(store);
  const {
    forceUnmount
  } = useOpenStateTransitions(open, store, () => {
    store.update({
      allowMouseEnter: false,
      stickIfOpen: true
    });
  });
  useIsoLayoutEffect(() => {
    if (contextMenuContext && !parentMenuRootContext) {
      store.update({
        parent: {
          type: "context-menu",
          context: contextMenuContext
        },
        floatingNodeId: floatingNodeIdFromContext,
        floatingParentNodeId: floatingParentNodeIdFromContext
      });
    } else if (parentMenuRootContext) {
      store.update({
        floatingNodeId: floatingNodeIdFromContext,
        floatingParentNodeId: floatingParentNodeIdFromContext
      });
    }
  }, [contextMenuContext, parentMenuRootContext, floatingNodeIdFromContext, floatingParentNodeIdFromContext, store]);
  React27.useEffect(() => {
    if (!open) {
      openEventRef.current = null;
    }
    if (parent.type !== "context-menu") {
      return;
    }
    if (!open) {
      allowOutsidePressDismissalTimeout.clear();
      allowOutsidePressDismissalRef.current = false;
      return;
    }
    allowOutsidePressDismissalTimeout.start(500, () => {
      allowOutsidePressDismissalRef.current = true;
    });
  }, [allowOutsidePressDismissalTimeout, open, parent.type]);
  useIsoLayoutEffect(() => {
    if (!open && !hoverEnabled) {
      store.set("hoverEnabled", true);
    }
  }, [open, hoverEnabled, store]);
  const setOpen = useStableCallback((nextOpen, eventDetails) => {
    const reason = eventDetails.reason;
    if (open === nextOpen && eventDetails.trigger === activeTriggerElement && lastOpenChangeReason === reason) {
      return;
    }
    eventDetails.preventUnmountOnClose = () => {
      store.set("preventUnmountingOnClose", true);
    };
    if (!nextOpen && eventDetails.trigger == null) {
      eventDetails.trigger = activeTriggerElement ?? undefined;
    }
    onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    store.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
    const nativeEvent = eventDetails.event;
    if (nextOpen === false && nativeEvent?.type === "click" && nativeEvent.pointerType === "touch" && !allowTouchToCloseRef.current) {
      return;
    }
    if (!nextOpen && activeIndex !== null) {
      const activeOption = store.context.itemDomElements.current[activeIndex];
      queueMicrotask(() => {
        activeOption?.setAttribute("tabindex", "-1");
      });
    }
    if (nextOpen && reason === exports_reason_parts.triggerFocus) {
      allowTouchToCloseRef.current = false;
      allowTouchToCloseTimeout.start(300, () => {
        allowTouchToCloseRef.current = true;
      });
    } else {
      allowTouchToCloseRef.current = true;
      allowTouchToCloseTimeout.clear();
    }
    const isKeyboardClick = (reason === exports_reason_parts.triggerPress || reason === exports_reason_parts.itemPress) && nativeEvent.detail === 0 && nativeEvent?.isTrusted;
    const isDismissClose = !nextOpen && (reason === exports_reason_parts.escapeKey || reason == null);
    const updatedState = {
      open: nextOpen,
      openChangeReason: reason
    };
    openEventRef.current = eventDetails.event ?? null;
    const newTriggerId = eventDetails.trigger?.id ?? null;
    if (newTriggerId || nextOpen) {
      updatedState.activeTriggerId = newTriggerId;
      updatedState.activeTriggerElement = eventDetails.trigger ?? null;
    }
    store.update(updatedState);
    if (parent.type === "menubar" && (reason === exports_reason_parts.triggerFocus || reason === exports_reason_parts.focusOut || reason === exports_reason_parts.triggerHover || reason === exports_reason_parts.listNavigation || reason === exports_reason_parts.siblingOpen)) {
      store.set("instantType", "group");
    } else if (isKeyboardClick || isDismissClose) {
      store.set("instantType", isKeyboardClick ? "click" : "dismiss");
    } else {
      store.set("instantType", undefined);
    }
  });
  const floatingRootContext = useSyncedFloatingRootContext({
    popupStore: store,
    floatingId,
    nested: floatingParentNodeIdFromContext != null,
    onOpenChange: setOpen
  });
  const floatingEvents = floatingRootContext.context.events;
  React27.useEffect(() => {
    const handleSetOpenEvent = ({
      open: nextOpen,
      eventDetails
    }) => setOpen(nextOpen, eventDetails);
    floatingEvents.on("setOpen", handleSetOpenEvent);
    return () => {
      floatingEvents?.off("setOpen", handleSetOpenEvent);
    };
  }, [floatingEvents, setOpen]);
  const handleImperativeClose = React27.useCallback(() => {
    store.setOpen(false, createChangeEventDetails(exports_reason_parts.imperativeAction));
  }, [store]);
  React27.useImperativeHandle(actionsRef, () => ({
    unmount: forceUnmount,
    close: handleImperativeClose
  }), [forceUnmount, handleImperativeClose]);
  let ctx;
  if (parent.type === "context-menu") {
    ctx = parent.context;
  }
  React27.useImperativeHandle(ctx?.positionerRef, () => positionerElement, [positionerElement]);
  React27.useImperativeHandle(ctx?.actionsRef, () => ({
    setOpen
  }), [setOpen]);
  const dismiss = useDismiss(floatingRootContext, {
    enabled: !disabled,
    bubbles: {
      escapeKey: closeParentOnEsc && parent.type === "menu"
    },
    outsidePress() {
      if (parent.type !== "context-menu" || openEventRef.current?.type === "contextmenu") {
        return true;
      }
      return allowOutsidePressDismissalRef.current;
    },
    externalTree: nested ? floatingTreeRoot : undefined
  });
  const direction = useDirection();
  const setActiveIndex = React27.useCallback((index) => {
    if (store.select("activeIndex") === index) {
      return;
    }
    store.set("activeIndex", index);
  }, [store]);
  const listNavigation = useListNavigation(floatingRootContext, {
    enabled: !disabled,
    listRef: store.context.itemDomElements,
    activeIndex,
    nested: parent.type !== undefined,
    loopFocus,
    orientation,
    parentOrientation: parent.type === "menubar" ? parent.context.orientation : undefined,
    rtl: direction === "rtl",
    disabledIndices: EMPTY_ARRAY,
    onNavigate: setActiveIndex,
    openOnArrowKeyDown: parent.type !== "context-menu",
    externalTree: nested ? floatingTreeRoot : undefined,
    focusItemOnHover: highlightItemOnHover
  });
  const onTyping = React27.useCallback((nextTyping) => {
    store.context.typingRef.current = nextTyping;
  }, [store]);
  const typeahead = useTypeahead(floatingRootContext, {
    listRef: store.context.itemLabels,
    elementsRef: store.context.itemDomElements,
    activeIndex,
    resetMs: TYPEAHEAD_RESET_MS,
    onMatch: (index) => {
      if (open && index !== activeIndex) {
        store.set("activeIndex", index);
      }
    },
    onTyping
  });
  const activeTriggerProps = React27.useMemo(() => {
    const mergedProps = mergeProps(typeahead.reference, listNavigation.reference, dismiss.reference, {
      onMouseMove() {
        store.set("allowMouseEnter", true);
      }
    }, interactionTypeProps);
    mergedProps["aria-haspopup"] = "menu";
    mergedProps["aria-expanded"] = open;
    return mergedProps;
  }, [store, typeahead.reference, listNavigation.reference, dismiss.reference, interactionTypeProps, open]);
  const inactiveTriggerProps = React27.useMemo(() => {
    const mergedProps = mergeProps(listNavigation.trigger, dismiss.trigger, interactionTypeProps);
    mergedProps["aria-haspopup"] = "menu";
    mergedProps["aria-expanded"] = false;
    return mergedProps;
  }, [listNavigation.trigger, dismiss.trigger, interactionTypeProps]);
  const popupProps = React27.useMemo(() => mergeProps(FOCUSABLE_POPUP_PROPS, {
    id: floatingId,
    role: "menu",
    "aria-labelledby": activeTriggerElement?.id,
    onMouseMove() {
      store.set("allowMouseEnter", true);
      if (parent.type === "menu") {
        store.set("hoverEnabled", false);
      }
    },
    onClick() {
      if (store.select("hoverEnabled")) {
        store.set("hoverEnabled", false);
      }
    },
    onKeyDown(event) {
      const relay = store.select("keyboardEventRelay");
      if (relay && !event.isPropagationStopped()) {
        relay(event);
      }
    }
  }, typeahead.floating, listNavigation.floating, dismiss.floating), [activeTriggerElement, floatingId, parent.type, store, typeahead.floating, listNavigation.floating, dismiss.floating]);
  const itemProps = listNavigation.item ?? EMPTY_OBJECT;
  usePopupInteractionProps(store, {
    floatingRootContext,
    activeTriggerProps,
    inactiveTriggerProps,
    popupProps,
    itemProps
  });
  const context = React27.useMemo(() => ({
    store,
    parent: parentFromContext
  }), [store, parentFromContext]);
  const content = /* @__PURE__ */ _jsx8(MenuRootContext.Provider, {
    value: context,
    children: typeof children === "function" ? children({
      payload
    }) : children
  });
  if (parent.type === undefined || parent.type === "context-menu") {
    return /* @__PURE__ */ _jsx8(FloatingTree, {
      externalTree: floatingTreeRoot,
      children: content
    });
  }
  return content;
});
if (true)
  MenuRoot.displayName = "MenuRoot";
// node_modules/@base-ui/react/esm/menu/submenu-root/MenuSubmenuRoot.js
import * as React28 from "react";
import { jsx as _jsx9 } from "react/jsx-runtime";
"use client";
function MenuSubmenuRoot(props) {
  const parentMenu = useMenuRootContext().store;
  const contextValue = React28.useMemo(() => ({
    parentMenu
  }), [parentMenu]);
  return /* @__PURE__ */ _jsx9(MenuSubmenuRootContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ _jsx9(MenuRoot, {
      ...props
    })
  });
}
// node_modules/@base-ui/react/esm/menu/trigger/MenuTrigger.js
import * as React30 from "react";

// node_modules/@base-ui/react/esm/menu/utils/findRootOwnerId.js
function findRootOwnerId(node) {
  if (isHTMLElement(node) && node.hasAttribute("data-rootownerid")) {
    return node.getAttribute("data-rootownerid") ?? undefined;
  }
  if (isLastTraversableNode(node)) {
    return;
  }
  return findRootOwnerId(getParentNode(node));
}

// node_modules/@base-ui/react/esm/utils/useMixedToggleClickHandler.js
import * as React29 from "react";
"use client";
function useMixedToggleClickHandler(params) {
  const {
    enabled = true,
    mouseDownAction,
    open
  } = params;
  const ignoreClickRef = React29.useRef(false);
  return React29.useMemo(() => {
    if (!enabled) {
      return EMPTY_OBJECT;
    }
    return {
      onMouseDown: (event) => {
        if (mouseDownAction === "open" && !open || mouseDownAction === "close" && open) {
          ignoreClickRef.current = true;
          ownerDocument(event.currentTarget).addEventListener("click", () => {
            ignoreClickRef.current = false;
          }, {
            once: true
          });
        }
      },
      onClick: (event) => {
        if (ignoreClickRef.current) {
          ignoreClickRef.current = false;
          event.preventBaseUIHandler();
        }
      }
    };
  }, [enabled, mouseDownAction, open]);
}

// node_modules/@base-ui/react/esm/menu/trigger/MenuTrigger.js
import { jsx as _jsx10, jsxs as _jsxs2 } from "react/jsx-runtime";
"use client";
var BOUNDARY_OFFSET = 2;
var MenuTrigger = fastComponentRef(function MenuTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    disabled: disabledProp = false,
    nativeButton = true,
    id: idProp,
    openOnHover: openOnHoverProp,
    delay = 100,
    closeDelay = 0,
    handle,
    payload,
    ...elementProps
  } = componentProps;
  const rootContext = useMenuRootContext(true);
  const store = handle?.store ?? rootContext?.store;
  if (!store) {
    throw new Error("Base UI: <Menu.Trigger> must be either used within a <Menu.Root> component or provided with a handle.");
  }
  const thisTriggerId = useBaseUiId(idProp);
  const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
  const floatingRootContext = store.useState("floatingRootContext");
  const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
  const popupId = store.useState("triggerPopupId", thisTriggerId);
  const triggerElementRef = React30.useRef(null);
  const parent = useMenuParent();
  const compositeRootContext = useCompositeRootContext(true);
  const floatingTreeRootFromContext = useFloatingTree();
  const floatingTreeRoot = React30.useMemo(() => {
    return floatingTreeRootFromContext ?? new FloatingTreeStore;
  }, [floatingTreeRootFromContext]);
  const floatingNodeId = useFloatingNodeId(floatingTreeRoot);
  const floatingParentNodeId = useFloatingParentNodeId();
  const {
    registerTrigger,
    isMountedByThisTrigger
  } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
    payload,
    closeDelay,
    parent,
    floatingTreeRoot,
    floatingNodeId,
    floatingParentNodeId,
    keyboardEventRelay: compositeRootContext?.relayKeyboardEvent
  });
  const isInMenubar = parent.type === "menubar";
  const rootDisabled = store.useState("disabled");
  const disabled = disabledProp || rootDisabled || isInMenubar && parent.context.disabled;
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  React30.useEffect(() => {
    if (!isOpenedByThisTrigger && parent.type === undefined) {
      store.context.allowMouseUpTriggerRef.current = false;
    }
  }, [store, isOpenedByThisTrigger, parent.type]);
  const triggerRef = React30.useRef(null);
  const allowMouseUpTriggerTimeout = useTimeout();
  const handleDocumentMouseUp = useStableCallback((mouseEvent) => {
    if (!triggerRef.current) {
      return;
    }
    allowMouseUpTriggerTimeout.clear();
    store.context.allowMouseUpTriggerRef.current = false;
    const mouseUpTarget = mouseEvent.target;
    if (contains(triggerRef.current, mouseUpTarget) || contains(store.select("positionerElement"), mouseUpTarget) || mouseUpTarget === triggerRef.current) {
      return;
    }
    if (mouseUpTarget != null && findRootOwnerId(mouseUpTarget) === store.select("rootId")) {
      return;
    }
    const bounds = getPseudoElementBounds(triggerRef.current);
    if (mouseEvent.clientX >= bounds.left - BOUNDARY_OFFSET && mouseEvent.clientX <= bounds.right + BOUNDARY_OFFSET && mouseEvent.clientY >= bounds.top - BOUNDARY_OFFSET && mouseEvent.clientY <= bounds.bottom + BOUNDARY_OFFSET) {
      return;
    }
    floatingTreeRoot.events.emit("close", {
      domEvent: mouseEvent,
      reason: exports_reason_parts.cancelOpen
    });
  });
  React30.useEffect(() => {
    if (isOpenedByThisTrigger && store.select("lastOpenChangeReason") === exports_reason_parts.triggerHover) {
      const doc = ownerDocument(triggerRef.current);
      doc.addEventListener("mouseup", handleDocumentMouseUp, {
        once: true
      });
    }
  }, [isOpenedByThisTrigger, handleDocumentMouseUp, store]);
  const parentMenubarHasSubmenuOpen = isInMenubar && parent.context.hasSubmenuOpen;
  const openOnHover = openOnHoverProp ?? parentMenubarHasSubmenuOpen;
  const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
    enabled: openOnHover && !disabled && parent.type !== "context-menu" && (!isInMenubar || parentMenubarHasSubmenuOpen && !isMountedByThisTrigger),
    handleClose: safePolygon({
      blockPointerEvents: !isInMenubar
    }),
    mouseOnly: true,
    move: false,
    restMs: parent.type === undefined ? delay : undefined,
    delay: {
      close: closeDelay
    },
    triggerElementRef,
    externalTree: floatingTreeRoot,
    isActiveTrigger: isTriggerActive,
    isClosing: () => store.select("transitionStatus") === "ending"
  });
  const stickIfOpen = useStickIfOpen(isOpenedByThisTrigger, store.select("lastOpenChangeReason"));
  const click = useClick(floatingRootContext, {
    enabled: !disabled && parent.type !== "context-menu",
    event: isOpenedByThisTrigger && isInMenubar ? "click" : "mousedown",
    toggle: true,
    ignoreMouse: false,
    stickIfOpen: parent.type === undefined ? stickIfOpen : false
  });
  const focus = useFocus(floatingRootContext, {
    enabled: !disabled && parentMenubarHasSubmenuOpen
  });
  const mixedToggleHandlers = useMixedToggleClickHandler({
    open: isOpenedByThisTrigger,
    enabled: isInMenubar,
    mouseDownAction: "open"
  });
  const localInteractionProps = React30.useMemo(() => mergeProps(focus.reference, click.reference), [focus.reference, click.reference]);
  const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
  const {
    preFocusGuardRef,
    handlePreFocusGuardFocus,
    handleFocusTargetFocus
  } = useTriggerFocusGuards(store, triggerElementRef);
  const state = {
    disabled,
    open: isOpenedByThisTrigger
  };
  const ref = [triggerRef, forwardedRef, buttonRef, registerTrigger, triggerElementRef];
  const props = [localInteractionProps, hoverProps ?? EMPTY_OBJECT, rootTriggerProps, {
    "aria-haspopup": "menu",
    "aria-controls": popupId,
    id: thisTriggerId,
    onMouseDown: (event) => {
      if (store.select("open")) {
        return;
      }
      allowMouseUpTriggerTimeout.start(200, () => {
        store.context.allowMouseUpTriggerRef.current = true;
      });
      const doc = ownerDocument(event.currentTarget);
      doc.addEventListener("mouseup", handleDocumentMouseUp, {
        once: true
      });
    }
  }, isInMenubar ? {
    role: "menuitem"
  } : {}, mixedToggleHandlers, elementProps, getButtonProps];
  const element = useRenderElement("button", componentProps, {
    enabled: !isInMenubar,
    stateAttributesMapping: pressableTriggerOpenStateMapping,
    state,
    ref,
    props
  });
  if (isInMenubar) {
    return /* @__PURE__ */ _jsx10(CompositeItem, {
      tag: "button",
      render,
      className,
      style,
      state,
      refs: ref,
      props,
      stateAttributesMapping: pressableTriggerOpenStateMapping
    });
  }
  if (isOpenedByThisTrigger) {
    return /* @__PURE__ */ _jsxs2(React30.Fragment, {
      children: [/* @__PURE__ */ _jsx10(FocusGuard, {
        ref: preFocusGuardRef,
        onFocus: handlePreFocusGuardFocus
      }, `${thisTriggerId}-pre-focus-guard`), /* @__PURE__ */ _jsx10(React30.Fragment, {
        children: element
      }, thisTriggerId), /* @__PURE__ */ _jsx10(FocusGuard, {
        ref: store.context.triggerFocusTargetRef,
        onFocus: handleFocusTargetFocus
      }, `${thisTriggerId}-post-focus-guard`)]
    });
  }
  return /* @__PURE__ */ _jsx10(React30.Fragment, {
    children: element
  }, thisTriggerId);
});
if (true)
  MenuTrigger.displayName = "MenuTrigger";
function useStickIfOpen(open, openReason) {
  const stickIfOpenTimeout = useTimeout();
  const [stickIfOpen, setStickIfOpen] = React30.useState(false);
  useIsoLayoutEffect(() => {
    if (open && openReason === "trigger-hover") {
      setStickIfOpen(true);
      stickIfOpenTimeout.start(PATIENT_CLICK_THRESHOLD, () => {
        setStickIfOpen(false);
      });
    } else if (!open) {
      stickIfOpenTimeout.clear();
      setStickIfOpen(false);
    }
  }, [open, openReason, stickIfOpenTimeout]);
  return stickIfOpen;
}
function useMenuParent() {
  const contextMenuContext = useContextMenuRootContext(true);
  const parentContext = useMenuRootContext(true);
  const menubarContext = useMenubarContext(true);
  const parent = React30.useMemo(() => {
    if (menubarContext) {
      return {
        type: "menubar",
        context: menubarContext
      };
    }
    if (contextMenuContext && !parentContext) {
      return {
        type: "context-menu",
        context: contextMenuContext
      };
    }
    return {
      type: undefined
    };
  }, [contextMenuContext, parentContext, menubarContext]);
  return parent;
}
// node_modules/@base-ui/react/esm/menu/viewport/MenuViewport.js
import * as React31 from "react";

// node_modules/@base-ui/react/esm/menu/viewport/MenuViewportCssVars.js
var MenuViewportCssVars = /* @__PURE__ */ function(MenuViewportCssVars2) {
  MenuViewportCssVars2["popupWidth"] = "--popup-width";
  MenuViewportCssVars2["popupHeight"] = "--popup-height";
  return MenuViewportCssVars2;
}({});

// node_modules/@base-ui/react/esm/menu/viewport/MenuViewport.js
"use client";
var stateAttributesMapping3 = {
  activationDirection: (value) => value ? {
    "data-activation-direction": value
  } : null
};
var MenuViewport = /* @__PURE__ */ React31.forwardRef(function MenuViewport2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    children,
    ...elementProps
  } = componentProps;
  const {
    store
  } = useMenuRootContext();
  const {
    side
  } = useMenuPositionerContext();
  const instantType = store.useState("instantType");
  const {
    children: childrenToRender,
    state: viewportState
  } = usePopupViewport({
    store,
    side,
    cssVars: MenuViewportCssVars,
    children
  });
  const state = {
    activationDirection: viewportState.activationDirection,
    transitioning: viewportState.transitioning,
    instant: instantType
  };
  return useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [elementProps, {
      children: childrenToRender
    }],
    stateAttributesMapping: stateAttributesMapping3
  });
});
if (true)
  MenuViewport.displayName = "MenuViewport";
// node_modules/@base-ui/react/esm/menu/submenu-trigger/MenuSubmenuTrigger.js
import * as React32 from "react";
"use client";
var MenuSubmenuTrigger = /* @__PURE__ */ React32.forwardRef(function MenuSubmenuTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    label,
    id: idProp,
    nativeButton = false,
    openOnHover = true,
    delay = 100,
    closeDelay = 0,
    disabled: disabledProp = false,
    ...elementProps
  } = componentProps;
  const listItem = useCompositeListItem();
  const menuPositionerContext = useMenuPositionerContext();
  const {
    store
  } = useMenuRootContext();
  const thisTriggerId = useBaseUiId(idProp);
  const open = store.useState("open");
  const floatingRootContext = store.useState("floatingRootContext");
  const floatingTreeRoot = store.useState("floatingTreeRoot");
  const popupId = store.useState("triggerPopupId", thisTriggerId);
  const baseRegisterTrigger = useTriggerRegistration(thisTriggerId, store);
  const registerTrigger = React32.useCallback((element2) => {
    const cleanup = baseRegisterTrigger(element2);
    if (element2 !== null && store.select("open") && store.select("activeTriggerId") == null) {
      store.update({
        activeTriggerId: thisTriggerId,
        activeTriggerElement: element2,
        closeDelay
      });
    }
    return cleanup;
  }, [baseRegisterTrigger, closeDelay, store, thisTriggerId]);
  const triggerElementRef = React32.useRef(null);
  const handleTriggerElementRef = React32.useCallback((el) => {
    triggerElementRef.current = el;
    store.set("activeTriggerElement", el);
  }, [store]);
  if (true) {
    useIsoLayoutEffect(() => {
      const element2 = triggerElementRef.current;
      if (element2 && isElementDisabled(element2) && !disabledProp) {
        const ownerStackMessage = SafeReact.captureOwnerStack?.() || "";
        warn(`A disabled element was detected on <Menu.SubmenuTrigger>. To properly disable the trigger, use the \`disabled\` prop on the component instead of setting it on the rendered element.${ownerStackMessage}`);
      }
    });
  }
  const submenuRootContext = useMenuSubmenuRootContext();
  if (!submenuRootContext?.parentMenu) {
    throw new Error("Base UI: <Menu.SubmenuTrigger> must be placed in <Menu.SubmenuRoot>.");
  }
  store.useSyncedValue("closeDelay", closeDelay);
  const parentMenuStore = submenuRootContext.parentMenu;
  const itemProps = parentMenuStore.useState("itemProps");
  const highlighted = parentMenuStore.useState("isActive", listItem.index);
  const itemMetadata = React32.useMemo(() => ({
    type: "submenu-trigger",
    setActive() {
      parentMenuStore.set("activeIndex", listItem.index);
    }
  }), [parentMenuStore, listItem.index]);
  const rootDisabled = store.useState("disabled");
  const disabled = disabledProp || rootDisabled;
  const {
    getItemProps,
    itemRef
  } = useMenuItem({
    closeOnClick: false,
    disabled,
    highlighted,
    id: thisTriggerId,
    store,
    typingRef: parentMenuStore.context.typingRef,
    nativeButton,
    itemMetadata,
    nodeId: menuPositionerContext?.context.nodeId
  });
  const hoverEnabled = store.useState("hoverEnabled");
  const allowMouseEnter = parentMenuStore.useState("allowMouseEnter");
  const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
    enabled: hoverEnabled && openOnHover && !disabled,
    handleClose: safePolygon({
      blockPointerEvents: true
    }),
    mouseOnly: true,
    move: true,
    restMs: delay,
    delay: allowMouseEnter ? {
      open: delay,
      close: closeDelay
    } : 0,
    triggerElementRef,
    externalTree: floatingTreeRoot,
    isClosing: () => store.select("transitionStatus") === "ending"
  });
  const click = useClick(floatingRootContext, {
    enabled: !disabled,
    event: "mousedown",
    toggle: !openOnHover,
    ignoreMouse: openOnHover,
    stickIfOpen: false
  });
  const localInteractionProps = click.reference ?? EMPTY_OBJECT;
  const rootTriggerProps = store.useState("triggerProps", true);
  delete rootTriggerProps.id;
  const state = {
    disabled,
    highlighted,
    open
  };
  const element = useRenderElement("div", componentProps, {
    state,
    stateAttributesMapping: triggerOpenStateMapping,
    props: [localInteractionProps, hoverProps, rootTriggerProps, itemProps, {
      "aria-controls": popupId,
      tabIndex: open || highlighted ? 0 : -1,
      onBlur() {
        if (highlighted) {
          parentMenuStore.set("activeIndex", null);
        }
      }
    }, elementProps, getItemProps],
    ref: [forwardedRef, listItem.ref, itemRef, registerTrigger, handleTriggerElementRef]
  });
  return element;
});
if (true)
  MenuSubmenuTrigger.displayName = "MenuSubmenuTrigger";
// node_modules/@base-ui/react/esm/menu/store/MenuHandle.js
class MenuHandle {
  constructor() {
    this.store = new MenuStore;
  }
  open(triggerId) {
    const triggerElement = triggerId ? this.store.context.triggerElements.getById(triggerId) : undefined;
    if (triggerId && !triggerElement) {
      throw new Error(`Base UI: MenuHandle.open: No trigger found with id "${triggerId}".`);
    }
    this.store.setOpen(true, createChangeEventDetails("imperative-action", undefined, triggerElement));
  }
  close() {
    this.store.setOpen(false, createChangeEventDetails("imperative-action", undefined, undefined));
  }
  get isOpen() {
    return this.store.select("open");
  }
}
function createMenuHandle() {
  return new MenuHandle;
}
export { ContextMenuRootContext, useContextMenuRootContext, MenuRootContext, useMenuRootContext, MenuArrow, MenuBackdrop, MenuCheckboxItem, MenuCheckboxItemIndicator, MenuGroup, MenuGroupLabel, MenuItem, MenuLinkItem, MenuPopup, MenuPortal, MenuPositioner, MenuRadioGroup, MenuRadioItem, MenuRadioItemIndicator, MenuSubmenuRoot, findRootOwnerId, MenuSubmenuTrigger, exports_index_parts };
