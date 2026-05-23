/* @base-ui/react 1.4.1 — vendored (MIT — MUI Inc).
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
} from "./_chunk-ha06w2pp.js";
import"./_chunk-6b17g8t7.js";
import {
  Separator
} from "./_chunk-7fmjymvh.js";
import"./_chunk-65zw5gs2.js";
import"./_chunk-j0eqdjta.js";
import"./_chunk-b5jsqt97.js";
import"./_chunk-0xhx4g7r.js";
import"./_chunk-agc6ew3g.js";
import"./_chunk-y887e46p.js";
import"./_chunk-q7yw9mz4.js";
import"./_chunk-gfce3j3z.js";
import"./_chunk-502wngfc.js";
import"./_chunk-xfagb0fq.js";
import"./_chunk-ek863ta9.js";
import"./_chunk-vdc01ss3.js";
import"./_chunk-p6qynd6r.js";
import"./_chunk-20rtfsz9.js";
import"./_chunk-wtw745qd.js";
import"./_chunk-01rqe37g.js";
import"./_chunk-q3nee19r.js";
import"./_chunk-7jjzay8b.js";
import"./_chunk-f09cp81f.js";
import"./_chunk-f9tgee1q.js";
import {
  pressableTriggerOpenStateMapping
} from "./_chunk-536jvgeq.js";
import"./_chunk-9nyxkvte.js";
import"./_chunk-2tyt8f8r.js";
import"./_chunk-aqwsk46c.js";
import {
  ownerDocument
} from "./_chunk-xb7ph1ka.js";
import {
  contains,
  getTarget
} from "./_chunk-atnkefgd.js";
import"./_chunk-drfb9kp2.js";
import"./_chunk-qce0xt57.js";
import {
  stopEvent
} from "./_chunk-nya71ccw.js";
import"./_chunk-t7j3rbpv.js";
import {
  useTimeout
} from "./_chunk-7v1t86x1.js";
import"./_chunk-cwr896nf.js";
import"./_chunk-hzgetm70.js";
import"./_chunk-f5d01bp9.js";
import {
  addEventListener
} from "./_chunk-mvv30fkv.js";
import {
  createChangeEventDetails,
  exports_reason_parts
} from "./_chunk-4s0k3h7t.js";
import {
  useId
} from "./_chunk-8kh3xk78.js";
import"./_chunk-mbn76q14.js";
import"./_chunk-v92ycsfj.js";
import"./_chunk-3h6zpchb.js";
import"./_chunk-8jz3hb7q.js";
import"./_chunk-85vrgzwr.js";
import"./_chunk-71zm6zgv.js";
import"./_chunk-6xevjepc.js";
import"./_chunk-sx6vkz01.js";
import"./_chunk-n7dnqnbw.js";
import"./_chunk-mznt6ktj.js";
import"./_chunk-b40erthe.js";
import {
  useRenderElement
} from "./_chunk-1s41sngz.js";
import {
  __export
} from "./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/context-menu/index.parts.js
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

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/context-menu/root/ContextMenuRoot.js
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
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/context-menu/trigger/ContextMenuTrigger.js
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
