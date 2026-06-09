/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  ContextMenuRootContext,
  MenuArrow,
  MenuBackdrop,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuLinkItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuRootContext,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
  exports_index_parts,
  findRootOwnerId,
  useContextMenuRootContext,
  useMenuRootContext
} from "./_chunk-ktvsd5k6.js";
import"./_chunk-b0nc8wq7.js";
import {
  Separator
} from "./_chunk-n11h505c.js";
import"./_chunk-wx2nxg0p.js";
import"./_chunk-f2wttwrf.js";
import"./_chunk-j3qkyd10.js";
import"./_chunk-8ganmsbg.js";
import"./_chunk-ebyxgtb4.js";
import"./_chunk-mnd0j7v9.js";
import"./_chunk-qbezxj1g.js";
import"./_chunk-m307wpdj.js";
import"./_chunk-fqry7pew.js";
import"./_chunk-xcqbtm2f.js";
import"./_chunk-3enq1vat.js";
import"./_chunk-26cc610z.js";
import"./_chunk-j29xjete.js";
import"./_chunk-3xpke33f.js";
import"./_chunk-gy0bpkmx.js";
import"./_chunk-9x63vfqj.js";
import"./_chunk-ytnp24gq.js";
import"./_chunk-q5cg71p7.js";
import"./_chunk-242gh8ph.js";
import"./_chunk-5gaqyne5.js";
import {
  pressableTriggerOpenStateMapping
} from "./_chunk-t7ppm3t0.js";
import"./_chunk-3cpd1vjz.js";
import"./_chunk-2z044bba.js";
import"./_chunk-1vw45v38.js";
import {
  contains,
  getTarget
} from "./_chunk-cgptgywc.js";
import"./_chunk-pv7b791x.js";
import {
  stopEvent
} from "./_chunk-kw8nnq00.js";
import"./_chunk-rrh8rt4v.js";
import {
  useTimeout
} from "./_chunk-b6dkjkbw.js";
import"./_chunk-s5pwkz8v.js";
import"./_chunk-dan0mva4.js";
import"./_chunk-x11e1k9r.js";
import {
  addEventListener
} from "./_chunk-ase0ydtt.js";
import"./_chunk-6kqramh9.js";
import {
  ownerDocument
} from "./_chunk-451nqgsa.js";
import {
  createChangeEventDetails,
  exports_reason_parts
} from "./_chunk-e56mpvk1.js";
import {
  useId
} from "./_chunk-wdqynnjf.js";
import"./_chunk-e13rsb6b.js";
import"./_chunk-zk4mtm9m.js";
import"./_chunk-8a9vv8am.js";
import"./_chunk-6ejf1z1r.js";
import"./_chunk-5xmdvndx.js";
import"./_chunk-hm5h9vsk.js";
import"./_chunk-cdgfsr3q.js";
import"./_chunk-000kmre8.js";
import"./_chunk-cwvtvwc7.js";
import"./_chunk-5tze5c8q.js";
import {
  useRenderElement
} from "./_chunk-x8xehj6d.js";
import {
  __export
} from "./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/context-menu/index.parts.js
var exports_index_parts2 = {};
__export(exports_index_parts2, {
  Trigger: () => ContextMenuTrigger,
  SubmenuTrigger: () => MenuSubmenuTrigger,
  SubmenuRoot: () => MenuSubmenuRoot,
  Separator: () => Separator,
  Root: () => ContextMenuRoot,
  RadioItemIndicator: () => MenuRadioItemIndicator,
  RadioItem: () => MenuRadioItem,
  RadioGroup: () => MenuRadioGroup,
  Positioner: () => MenuPositioner,
  Portal: () => MenuPortal,
  Popup: () => MenuPopup,
  LinkItem: () => MenuLinkItem,
  Item: () => MenuItem,
  GroupLabel: () => MenuGroupLabel,
  Group: () => MenuGroup,
  CheckboxItemIndicator: () => MenuCheckboxItemIndicator,
  CheckboxItem: () => MenuCheckboxItem,
  Backdrop: () => MenuBackdrop,
  Arrow: () => MenuArrow
});

// node_modules/@base-ui/react/esm/context-menu/root/ContextMenuRoot.js
import * as React from "react";
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
function ContextMenuRoot(props) {
  const [anchor, setAnchor] = React.useState({
    getBoundingClientRect() {
      return DOMRect.fromRect({
        width: 0,
        height: 0,
        x: 0,
        y: 0
      });
    }
  });
  const backdropRef = React.useRef(null);
  const internalBackdropRef = React.useRef(null);
  const actionsRef = React.useRef(null);
  const positionerRef = React.useRef(null);
  const allowMouseUpTriggerRef = React.useRef(true);
  const initialCursorPointRef = React.useRef(null);
  const id = useId();
  const contextValue = React.useMemo(() => ({
    anchor,
    setAnchor,
    actionsRef,
    backdropRef,
    internalBackdropRef,
    positionerRef,
    allowMouseUpTriggerRef,
    initialCursorPointRef,
    rootId: id
  }), [anchor, id]);
  return /* @__PURE__ */ _jsx(ContextMenuRootContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ _jsx(MenuRootContext.Provider, {
      value: undefined,
      children: /* @__PURE__ */ _jsx(exports_index_parts.Root, {
        ...props
      })
    })
  });
}
// node_modules/@base-ui/react/esm/context-menu/trigger/ContextMenuTrigger.js
import * as React2 from "react";
"use client";
var LONG_PRESS_DELAY = 500;
var ContextMenuTrigger = /* @__PURE__ */ React2.forwardRef(function ContextMenuTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    setAnchor,
    actionsRef,
    internalBackdropRef,
    backdropRef,
    positionerRef,
    allowMouseUpTriggerRef,
    initialCursorPointRef,
    rootId
  } = useContextMenuRootContext(false);
  const {
    store
  } = useMenuRootContext(false);
  const open = store.useState("open");
  const disabled = store.useState("disabled");
  const triggerRef = React2.useRef(null);
  const touchPositionRef = React2.useRef(null);
  const longPressTimeout = useTimeout();
  const allowMouseUpTimeout = useTimeout();
  const allowMouseUpRef = React2.useRef(false);
  function handleLongPress(x, y, event) {
    const isTouchEvent = event.type.startsWith("touch");
    initialCursorPointRef.current = {
      x,
      y
    };
    setAnchor({
      getBoundingClientRect() {
        return DOMRect.fromRect({
          width: isTouchEvent ? 10 : 0,
          height: isTouchEvent ? 10 : 0,
          x,
          y
        });
      }
    });
    allowMouseUpRef.current = false;
    actionsRef.current?.setOpen(true, createChangeEventDetails(exports_reason_parts.triggerPress, event));
    allowMouseUpTimeout.start(LONG_PRESS_DELAY, () => {
      allowMouseUpRef.current = true;
    });
  }
  function handleContextMenu(event) {
    if (disabled) {
      return;
    }
    allowMouseUpTriggerRef.current = true;
    stopEvent(event);
    handleLongPress(event.clientX, event.clientY, event.nativeEvent);
    const doc = ownerDocument(triggerRef.current);
    addEventListener(doc, "mouseup", (mouseEvent) => {
      allowMouseUpTriggerRef.current = false;
      if (!allowMouseUpRef.current) {
        return;
      }
      allowMouseUpTimeout.clear();
      allowMouseUpRef.current = false;
      const mouseUpTarget = getTarget(mouseEvent);
      if (contains(positionerRef.current, mouseUpTarget)) {
        return;
      }
      if (rootId && mouseUpTarget && findRootOwnerId(mouseUpTarget) === rootId) {
        return;
      }
      actionsRef.current?.setOpen(false, createChangeEventDetails(exports_reason_parts.cancelOpen, mouseEvent));
    }, {
      once: true
    });
  }
  function handleTouchStart(event) {
    if (disabled) {
      return;
    }
    allowMouseUpTriggerRef.current = false;
    if (event.touches.length === 1) {
      event.stopPropagation();
      const touch = event.touches[0];
      touchPositionRef.current = {
        x: touch.clientX,
        y: touch.clientY
      };
      longPressTimeout.start(LONG_PRESS_DELAY, () => {
        if (touchPositionRef.current) {
          handleLongPress(touchPositionRef.current.x, touchPositionRef.current.y, event.nativeEvent);
        }
      });
    }
  }
  function handleTouchMove(event) {
    if (longPressTimeout.isStarted() && touchPositionRef.current && event.touches.length === 1) {
      const touch = event.touches[0];
      const moveThreshold = 10;
      const deltaX = Math.abs(touch.clientX - touchPositionRef.current.x);
      const deltaY = Math.abs(touch.clientY - touchPositionRef.current.y);
      if (deltaX > moveThreshold || deltaY > moveThreshold) {
        longPressTimeout.clear();
      }
    }
  }
  function handleTouchEnd() {
    longPressTimeout.clear();
    touchPositionRef.current = null;
  }
  React2.useEffect(() => {
    function handleDocumentContextMenu(event) {
      if (disabled) {
        return;
      }
      const target = getTarget(event);
      const targetElement = target;
      if (contains(triggerRef.current, targetElement) || contains(internalBackdropRef.current, targetElement) || contains(backdropRef.current, targetElement)) {
        event.preventDefault();
      }
    }
    const doc = ownerDocument(triggerRef.current);
    return addEventListener(doc, "contextmenu", handleDocumentContextMenu);
  }, [backdropRef, disabled, internalBackdropRef]);
  const state = {
    open
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [triggerRef, forwardedRef],
    props: [{
      onContextMenu: handleContextMenu,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchEnd,
      style: {
        WebkitTouchCallout: "none"
      }
    }, elementProps],
    stateAttributesMapping: pressableTriggerOpenStateMapping
  });
  return element;
});
if (true)
  ContextMenuTrigger.displayName = "ContextMenuTrigger";
export {
  exports_index_parts2 as ContextMenu
};
