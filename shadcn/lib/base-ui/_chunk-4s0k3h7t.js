import {
  EMPTY_OBJECT
} from "./_chunk-1s41sngz.js";
import {
  __export
} from "./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/internals/reason-parts.js
var exports_reason_parts = {};
__export(exports_reason_parts, {
  windowResize: () => windowResize,
  wheel: () => wheel,
  triggerPress: () => triggerPress,
  triggerHover: () => triggerHover,
  triggerFocus: () => triggerFocus,
  trackPress: () => trackPress,
  swipe: () => swipe,
  siblingOpen: () => siblingOpen,
  scrub: () => scrub,
  pointer: () => pointer,
  outsidePress: () => outsidePress,
  none: () => none,
  listNavigation: () => listNavigation,
  linkPress: () => linkPress,
  keyboard: () => keyboard,
  itemPress: () => itemPress,
  inputPress: () => inputPress,
  inputPaste: () => inputPaste,
  inputClear: () => inputClear,
  inputChange: () => inputChange,
  inputBlur: () => inputBlur,
  incrementPress: () => incrementPress,
  imperativeAction: () => imperativeAction,
  focusOut: () => focusOut,
  escapeKey: () => escapeKey,
  drag: () => drag,
  disabled: () => disabled,
  decrementPress: () => decrementPress,
  closeWatcher: () => closeWatcher,
  closePress: () => closePress,
  clearPress: () => clearPress,
  chipRemovePress: () => chipRemovePress,
  cancelOpen: () => cancelOpen
});
var none = "none";
var triggerPress = "trigger-press";
var triggerHover = "trigger-hover";
var triggerFocus = "trigger-focus";
var outsidePress = "outside-press";
var itemPress = "item-press";
var closePress = "close-press";
var linkPress = "link-press";
var clearPress = "clear-press";
var chipRemovePress = "chip-remove-press";
var trackPress = "track-press";
var incrementPress = "increment-press";
var decrementPress = "decrement-press";
var inputChange = "input-change";
var inputClear = "input-clear";
var inputBlur = "input-blur";
var inputPaste = "input-paste";
var inputPress = "input-press";
var focusOut = "focus-out";
var escapeKey = "escape-key";
var closeWatcher = "close-watcher";
var listNavigation = "list-navigation";
var keyboard = "keyboard";
var pointer = "pointer";
var drag = "drag";
var wheel = "wheel";
var scrub = "scrub";
var cancelOpen = "cancel-open";
var siblingOpen = "sibling-open";
var disabled = "disabled";
var imperativeAction = "imperative-action";
var swipe = "swipe";
var windowResize = "window-resize";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/internals/createBaseUIEventDetails.js
function createChangeEventDetails(reason, event, trigger, customProperties) {
  let canceled = false;
  let allowPropagation = false;
  const custom = customProperties ?? EMPTY_OBJECT;
  const details = {
    reason,
    event: event ?? new Event("base-ui"),
    cancel() {
      canceled = true;
    },
    allowPropagation() {
      allowPropagation = true;
    },
    get isCanceled() {
      return canceled;
    },
    get isPropagationAllowed() {
      return allowPropagation;
    },
    trigger,
    ...custom
  };
  return details;
}
function createGenericEventDetails(reason, event, customProperties) {
  const custom = customProperties ?? EMPTY_OBJECT;
  const details = {
    reason,
    event: event ?? new Event("base-ui"),
    ...custom
  };
  return details;
}

export { exports_reason_parts, createChangeEventDetails, createGenericEventDetails };
