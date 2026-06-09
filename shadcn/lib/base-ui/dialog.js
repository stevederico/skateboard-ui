/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogHandle,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogViewport,
  IsDrawerContext,
  createDialogHandle,
  useRenderDialogRoot
} from "./_chunk-htdj1jps.js";
import"./_chunk-ytnp24gq.js";
import"./_chunk-q5cg71p7.js";
import"./_chunk-242gh8ph.js";
import"./_chunk-5gaqyne5.js";
import"./_chunk-t7ppm3t0.js";
import"./_chunk-3cpd1vjz.js";
import"./_chunk-2z044bba.js";
import"./_chunk-1vw45v38.js";
import"./_chunk-cgptgywc.js";
import"./_chunk-pv7b791x.js";
import"./_chunk-kw8nnq00.js";
import"./_chunk-rrh8rt4v.js";
import"./_chunk-b6dkjkbw.js";
import"./_chunk-s5pwkz8v.js";
import"./_chunk-dan0mva4.js";
import"./_chunk-x11e1k9r.js";
import"./_chunk-ase0ydtt.js";
import"./_chunk-6kqramh9.js";
import"./_chunk-451nqgsa.js";
import"./_chunk-e56mpvk1.js";
import"./_chunk-wdqynnjf.js";
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
import"./_chunk-x8xehj6d.js";
import {
  __export
} from "./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/dialog/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  createHandle: () => createDialogHandle,
  Viewport: () => DialogViewport,
  Trigger: () => DialogTrigger,
  Title: () => DialogTitle,
  Root: () => DialogRoot,
  Portal: () => DialogPortal,
  Popup: () => DialogPopup,
  Handle: () => DialogHandle,
  Description: () => DialogDescription,
  Close: () => DialogClose,
  Backdrop: () => DialogBackdrop
});

// node_modules/@base-ui/react/esm/dialog/root/DialogRoot.js
import * as React from "react";
"use client";
function DialogRoot(props) {
  const mode = React.useContext(IsDrawerContext) ? "drawer" : "dialog";
  return useRenderDialogRoot(props, mode);
}
export {
  exports_index_parts as Dialog
};
