/* @base-ui/react 1.4.1 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogHandle,
  DialogPopup,
  DialogPortal,
  DialogRootContext,
  DialogStore,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
  IsDrawerContext,
  useDialogRoot,
  useDialogRootContext
} from "./_chunk-atd5kq5q.js";
import"./_chunk-q3nee19r.js";
import"./_chunk-7jjzay8b.js";
import"./_chunk-f09cp81f.js";
import"./_chunk-f9tgee1q.js";
import"./_chunk-536jvgeq.js";
import"./_chunk-9nyxkvte.js";
import"./_chunk-2tyt8f8r.js";
import"./_chunk-aqwsk46c.js";
import"./_chunk-xb7ph1ka.js";
import"./_chunk-atnkefgd.js";
import"./_chunk-drfb9kp2.js";
import"./_chunk-qce0xt57.js";
import"./_chunk-nya71ccw.js";
import"./_chunk-t7j3rbpv.js";
import"./_chunk-7v1t86x1.js";
import"./_chunk-cwr896nf.js";
import"./_chunk-hzgetm70.js";
import"./_chunk-f5d01bp9.js";
import"./_chunk-mvv30fkv.js";
import"./_chunk-4s0k3h7t.js";
import"./_chunk-8kh3xk78.js";
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
import"./_chunk-1s41sngz.js";
import {
  __export
} from "./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/alert-dialog/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  createHandle: () => createAlertDialogHandle,
  Viewport: () => DialogViewport,
  Trigger: () => DialogTrigger,
  Title: () => DialogTitle,
  Root: () => AlertDialogRoot,
  Portal: () => DialogPortal,
  Popup: () => DialogPopup,
  Handle: () => DialogHandle,
  Description: () => DialogDescription,
  Close: () => DialogClose,
  Backdrop: () => DialogBackdrop
});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/alert-dialog/root/AlertDialogRoot.js
import * as React from "react";
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
function AlertDialogRoot(props) {
  const {
    children,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    actionsRef,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null
  } = props;
  const parentDialogRootContext = useDialogRootContext(true);
  const nested = Boolean(parentDialogRootContext);
  const store = DialogStore.useStore(handle?.store, {
    open: defaultOpen,
    openProp,
    activeTriggerId: defaultTriggerIdProp,
    triggerIdProp,
    modal: true,
    disablePointerDismissal: true,
    nested,
    role: "alertdialog"
  });
  store.useControlledProp("openProp", openProp);
  store.useControlledProp("triggerIdProp", triggerIdProp);
  store.useSyncedValue("nested", nested);
  store.useContextCallback("onOpenChange", onOpenChange);
  store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
  const payload = store.useState("payload");
  useDialogRoot({
    store,
    actionsRef,
    parentContext: parentDialogRootContext?.store.context,
    isDrawer: false,
    onOpenChange,
    triggerIdProp
  });
  const contextValue = React.useMemo(() => ({
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
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/alert-dialog/handle.js
function createAlertDialogHandle() {
  return new DialogHandle(new DialogStore({
    modal: true,
    disablePointerDismissal: true,
    role: "alertdialog"
  }));
}
export {
  exports_index_parts as AlertDialog
};
