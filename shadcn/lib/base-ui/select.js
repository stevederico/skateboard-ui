/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  serializeValue
} from "./_chunk-4zhfq4d3.js";
import {
  SCROLL_EDGE_TOLERANCE_PX,
  getMaxScrollOffset,
  normalizeScrollOffset,
  styleDisableScrollbar
} from "./_chunk-e6k2ecs7.js";
import {
  getDefaultLabelId,
  resolveAriaLabelledBy
} from "./_chunk-b5ya6xds.js";
import {
  clamp
} from "./_chunk-yzr7eg4b.js";
import {
  useCSPContext
} from "./_chunk-watha94s.js";
import {
  useLabel
} from "./_chunk-ghn1tzt8.js";
import {
  useLabelableId
} from "./_chunk-23rx7haq.js";
import"./_chunk-vgkfmtbe.js";
import {
  useFormContext,
  useRegisterFieldControl
} from "./_chunk-95tf2rxq.js";
import {
  fieldValidityMapping,
  useFieldRootContext,
  useLabelableContext
} from "./_chunk-8ctgmf06.js";
import"./_chunk-dzvjwv25.js";
import {
  getPseudoElementBounds
} from "./_chunk-b0nc8wq7.js";
import {
  Separator
} from "./_chunk-n11h505c.js";
import {
  useAnchoredPopupScrollLock
} from "./_chunk-ebyxgtb4.js";
import {
  useToolbarRootContext
} from "./_chunk-mnd0j7v9.js";
import {
  usePreviousValue
} from "./_chunk-m307wpdj.js";
import {
  getDisabledMountTransitionStyles,
  useAnchorPositioning,
  usePositioner
} from "./_chunk-fqry7pew.js";
import {
  IndexGuessBehavior,
  useCompositeListItem
} from "./_chunk-3enq1vat.js";
import {
  CompositeList
} from "./_chunk-j29xjete.js";
import"./_chunk-3xpke33f.js";
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
  FOCUSABLE_POPUP_PROPS,
  useOnFirstRender
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
  FloatingPortal,
  Store,
  createSelector,
  platform,
  useClick,
  useDismiss,
  useFloatingRootContext,
  useListNavigation,
  useStore,
  useTypeahead
} from "./_chunk-2z044bba.js";
import"./_chunk-1vw45v38.js";
import {
  contains,
  getFloatingFocusElement
} from "./_chunk-cgptgywc.js";
import {
  COMPOSITE_KEYS
} from "./_chunk-pv7b791x.js";
import {
  isVirtualClick,
  rectToClientRect
} from "./_chunk-kw8nnq00.js";
import {
  isWebKit
} from "./_chunk-rrh8rt4v.js";
import {
  useTimeout
} from "./_chunk-b6dkjkbw.js";
import {
  useValueChanged
} from "./_chunk-s5pwkz8v.js";
import {
  visuallyHidden,
  visuallyHiddenInput
} from "./_chunk-dan0mva4.js";
import"./_chunk-x11e1k9r.js";
import {
  addEventListener
} from "./_chunk-ase0ydtt.js";
import {
  useValueAsRef
} from "./_chunk-6kqramh9.js";
import {
  ownerDocument
} from "./_chunk-451nqgsa.js";
import {
  createChangeEventDetails,
  exports_reason_parts
} from "./_chunk-e56mpvk1.js";
import {
  useBaseUiId
} from "./_chunk-wdqynnjf.js";
import {
  transitionStatusMapping,
  useOpenChangeComplete,
  useTransitionStatus
} from "./_chunk-e13rsb6b.js";
import"./_chunk-zk4mtm9m.js";
import {
  useAnimationFrame
} from "./_chunk-8a9vv8am.js";
import"./_chunk-6ejf1z1r.js";
import {
  useButton
} from "./_chunk-5xmdvndx.js";
import"./_chunk-hm5h9vsk.js";
import"./_chunk-cdgfsr3q.js";
import {
  getWindow
} from "./_chunk-000kmre8.js";
import {
  useStableCallback
} from "./_chunk-cwvtvwc7.js";
import {
  useIsoLayoutEffect
} from "./_chunk-5tze5c8q.js";
import {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  useMergedRefs,
  useRefWithInit,
  useRenderElement
} from "./_chunk-x8xehj6d.js";
import {
  __export,
  mergeProps
} from "./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/select/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  Value: () => SelectValue,
  Trigger: () => SelectTrigger,
  Separator: () => Separator,
  ScrollUpArrow: () => SelectScrollUpArrow,
  ScrollDownArrow: () => SelectScrollDownArrow,
  Root: () => SelectRoot,
  Positioner: () => SelectPositioner,
  Portal: () => SelectPortal,
  Popup: () => SelectPopup,
  List: () => SelectList,
  Label: () => SelectLabel,
  ItemText: () => SelectItemText,
  ItemIndicator: () => SelectItemIndicator,
  Item: () => SelectItem,
  Icon: () => SelectIcon,
  GroupLabel: () => SelectGroupLabel,
  Group: () => SelectGroup,
  Backdrop: () => SelectBackdrop,
  Arrow: () => SelectArrow
});

// node_modules/@base-ui/react/esm/select/root/SelectRoot.js
import * as React3 from "react";

// node_modules/@base-ui/react/esm/select/root/SelectRootContext.js
import * as React from "react";
"use client";
var SelectRootContext = /* @__PURE__ */ React.createContext(null);
if (true)
  SelectRootContext.displayName = "SelectRootContext";
var SelectFloatingContext = /* @__PURE__ */ React.createContext(null);
if (true)
  SelectFloatingContext.displayName = "SelectFloatingContext";
function useSelectRootContext() {
  const context = React.useContext(SelectRootContext);
  if (context === null) {
    throw new Error("Base UI: SelectRootContext is missing. Select parts must be placed within <Select.Root>.");
  }
  return context;
}
function useSelectFloatingContext() {
  const context = React.useContext(SelectFloatingContext);
  if (context === null) {
    throw new Error("Base UI: SelectFloatingContext is missing. Select parts must be placed within <Select.Root>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/internals/itemEquality.js
var defaultItemEquality = (itemValue, selectedValue) => Object.is(itemValue, selectedValue);
function compareItemEquality(itemValue, selectedValue, comparer) {
  if (itemValue == null || selectedValue == null) {
    return Object.is(itemValue, selectedValue);
  }
  return comparer(itemValue, selectedValue);
}
function selectedValueIncludes(selectedValues, itemValue, comparer) {
  if (!selectedValues || selectedValues.length === 0) {
    return false;
  }
  return selectedValues.some((selectedValue) => {
    if (selectedValue === undefined) {
      return false;
    }
    return compareItemEquality(itemValue, selectedValue, comparer);
  });
}
function findItemIndex(itemValues, selectedValue, comparer) {
  if (!itemValues || itemValues.length === 0) {
    return -1;
  }
  return itemValues.findIndex((itemValue) => {
    if (itemValue === undefined) {
      return false;
    }
    return compareItemEquality(itemValue, selectedValue, comparer);
  });
}
function removeItem(selectedValues, itemValue, comparer) {
  return selectedValues.filter((selectedValue) => !compareItemEquality(itemValue, selectedValue, comparer));
}

// node_modules/@base-ui/react/esm/internals/resolveValueLabel.js
import * as React2 from "react";
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
function isGroupedItems(items) {
  return items != null && items.length > 0 && typeof items[0] === "object" && items[0] != null && "items" in items[0];
}
function hasNullItemLabel(items) {
  if (!Array.isArray(items)) {
    return items != null && "null" in items;
  }
  const arrayItems = items;
  if (isGroupedItems(arrayItems)) {
    for (const group of arrayItems) {
      for (const item of group.items) {
        if (item && item.value == null && item.label != null) {
          return true;
        }
      }
    }
    return false;
  }
  for (const item of arrayItems) {
    if (item && item.value == null && item.label != null) {
      return true;
    }
  }
  return false;
}
function stringifyAsLabel(item, itemToStringLabel) {
  if (itemToStringLabel && item != null) {
    return itemToStringLabel(item) ?? "";
  }
  if (item && typeof item === "object") {
    if ("label" in item && item.label != null) {
      return String(item.label);
    }
    if ("value" in item) {
      return String(item.value);
    }
  }
  return serializeValue(item);
}
function stringifyAsValue(item, itemToStringValue) {
  if (itemToStringValue && item != null) {
    return itemToStringValue(item) ?? "";
  }
  if (item && typeof item === "object" && "value" in item && "label" in item) {
    return serializeValue(item.value);
  }
  return serializeValue(item);
}
function resolveSelectedLabel(value, items, itemToStringLabel) {
  function fallback() {
    return stringifyAsLabel(value, itemToStringLabel);
  }
  if (itemToStringLabel && value != null) {
    return itemToStringLabel(value);
  }
  if (value && typeof value === "object" && "label" in value && value.label != null) {
    return value.label;
  }
  if (items && !Array.isArray(items)) {
    return items[value] ?? fallback();
  }
  if (Array.isArray(items)) {
    const arrayItems = items;
    const flatItems = isGroupedItems(arrayItems) ? arrayItems.flatMap((group) => group.items) : arrayItems;
    if (value == null || typeof value !== "object") {
      const match = flatItems.find((item) => item.value === value);
      if (match && match.label != null) {
        return match.label;
      }
      return fallback();
    }
    if ("value" in value) {
      const match = flatItems.find((item) => item && item.value === value.value);
      if (match && match.label != null) {
        return match.label;
      }
    }
  }
  return fallback();
}
function resolveMultipleLabels(values, items, itemToStringLabel) {
  return values.reduce((acc, value, index) => {
    if (index > 0) {
      acc.push(", ");
    }
    acc.push(/* @__PURE__ */ _jsx(React2.Fragment, {
      children: resolveSelectedLabel(value, items, itemToStringLabel)
    }, index));
    return acc;
  }, []);
}

// node_modules/@base-ui/react/esm/select/store.js
var selectors = {
  id: createSelector((state) => state.id),
  labelId: createSelector((state) => state.labelId),
  modal: createSelector((state) => state.modal),
  multiple: createSelector((state) => state.multiple),
  items: createSelector((state) => state.items),
  itemToStringLabel: createSelector((state) => state.itemToStringLabel),
  itemToStringValue: createSelector((state) => state.itemToStringValue),
  isItemEqualToValue: createSelector((state) => state.isItemEqualToValue),
  value: createSelector((state) => state.value),
  hasSelectedValue: createSelector((state) => {
    const {
      value,
      multiple,
      itemToStringValue
    } = state;
    if (value == null) {
      return false;
    }
    if (multiple && Array.isArray(value)) {
      return value.length > 0;
    }
    return stringifyAsValue(value, itemToStringValue) !== "";
  }),
  hasNullItemLabel: createSelector((state, enabled) => {
    return enabled ? hasNullItemLabel(state.items) : false;
  }),
  open: createSelector((state) => state.open),
  mounted: createSelector((state) => state.mounted),
  forceMount: createSelector((state) => state.forceMount),
  transitionStatus: createSelector((state) => state.transitionStatus),
  openMethod: createSelector((state) => state.openMethod),
  activeIndex: createSelector((state) => state.activeIndex),
  selectedIndex: createSelector((state) => state.selectedIndex),
  isActive: createSelector((state, index) => state.activeIndex === index),
  isSelected: createSelector((state, index, itemValue) => {
    const comparer = state.isItemEqualToValue;
    const storeValue = state.value;
    if (state.multiple) {
      return Array.isArray(storeValue) && storeValue.some((selectedItem) => compareItemEquality(itemValue, selectedItem, comparer));
    }
    if (state.selectedIndex === index && state.selectedIndex !== null) {
      return true;
    }
    return compareItemEquality(itemValue, storeValue, comparer);
  }),
  isSelectedByFocus: createSelector((state, index) => {
    return state.selectedIndex === index;
  }),
  popupProps: createSelector((state) => state.popupProps),
  triggerProps: createSelector((state) => state.triggerProps),
  triggerElement: createSelector((state) => state.triggerElement),
  positionerElement: createSelector((state) => state.positionerElement),
  listElement: createSelector((state) => state.listElement),
  popupSide: createSelector((state) => state.popupSide),
  scrollUpArrowVisible: createSelector((state) => state.scrollUpArrowVisible),
  scrollDownArrowVisible: createSelector((state) => state.scrollDownArrowVisible),
  hasScrollArrows: createSelector((state) => state.hasScrollArrows)
};

// node_modules/@base-ui/react/esm/select/root/SelectRoot.js
import { jsx as _jsx2, jsxs as _jsxs } from "react/jsx-runtime";
"use client";
function SelectRoot(props) {
  const {
    id,
    value: valueProp,
    defaultValue = null,
    onValueChange,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    name: nameProp,
    form,
    autoComplete,
    disabled: disabledProp = false,
    readOnly = false,
    required = false,
    modal = true,
    actionsRef,
    inputRef,
    onOpenChangeComplete,
    items,
    multiple = false,
    itemToStringLabel,
    itemToStringValue,
    isItemEqualToValue = defaultItemEquality,
    highlightItemOnHover = true,
    children
  } = props;
  const {
    clearErrors
  } = useFormContext();
  const {
    setDirty,
    setTouched,
    setFocused,
    shouldValidateOnChange,
    validityData,
    setFilled,
    name: fieldName,
    disabled: fieldDisabled,
    validation,
    validationMode
  } = useFieldRootContext();
  const generatedId = useLabelableId({
    id
  });
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const [value, setValueUnwrapped] = useControlled({
    controlled: valueProp,
    default: multiple ? defaultValue ?? EMPTY_ARRAY : defaultValue,
    name: "Select",
    state: "value"
  });
  const [open, setOpenUnwrapped] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: "Select",
    state: "open"
  });
  const listRef = React3.useRef([]);
  const labelsRef = React3.useRef([]);
  const popupRef = React3.useRef(null);
  const scrollHandlerRef = React3.useRef(null);
  const scrollArrowsMountedCountRef = React3.useRef(0);
  const valueRef = React3.useRef(null);
  const valuesRef = React3.useRef([]);
  const typingRef = React3.useRef(false);
  const keyboardActiveRef = React3.useRef(false);
  const firstItemTextRef = React3.useRef(null);
  const selectedItemTextRef = React3.useRef(null);
  const selectionRef = React3.useRef({
    allowSelectedMouseUp: false,
    allowUnselectedMouseUp: false,
    dragY: 0
  });
  const alignItemWithTriggerActiveRef = React3.useRef(false);
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open);
  const {
    openMethod,
    triggerProps: interactionTypeProps
  } = useOpenInteractionType(open);
  const store = useRefWithInit(() => new Store({
    id: generatedId,
    labelId: undefined,
    modal,
    multiple,
    itemToStringLabel,
    itemToStringValue,
    isItemEqualToValue,
    value,
    open,
    mounted,
    transitionStatus,
    items,
    forceMount: false,
    openMethod: null,
    activeIndex: null,
    selectedIndex: null,
    popupProps: {},
    triggerProps: {},
    triggerElement: null,
    positionerElement: null,
    listElement: null,
    popupSide: null,
    scrollUpArrowVisible: false,
    scrollDownArrowVisible: false,
    hasScrollArrows: false
  })).current;
  const activeIndex = useStore(store, selectors.activeIndex);
  const selectedIndex = useStore(store, selectors.selectedIndex);
  const triggerElement = useStore(store, selectors.triggerElement);
  const positionerElement = useStore(store, selectors.positionerElement);
  const previousOpenMethod = usePreviousValue(openMethod);
  const renderedOpenMethod = openMethod ?? previousOpenMethod;
  const serializedValue = React3.useMemo(() => {
    if (multiple && Array.isArray(value) && value.length === 0) {
      return "";
    }
    return stringifyAsValue(value, itemToStringValue);
  }, [multiple, value, itemToStringValue]);
  const fieldStringValue = React3.useMemo(() => {
    if (multiple && Array.isArray(value)) {
      return value.map((currentValue) => stringifyAsValue(currentValue, itemToStringValue));
    }
    return stringifyAsValue(value, itemToStringValue);
  }, [multiple, value, itemToStringValue]);
  const controlRef = useValueAsRef(store.state.triggerElement);
  const getStringifiedValueForForm = useStableCallback(() => fieldStringValue);
  useRegisterFieldControl(controlRef, generatedId, value, getStringifiedValueForForm);
  const initialValueRef = React3.useRef(value);
  const hasSelectedValue = multiple ? Array.isArray(value) && value.length > 0 : value != null;
  useIsoLayoutEffect(() => {
    if (value !== initialValueRef.current) {
      store.set("forceMount", true);
    }
  }, [store, value]);
  useIsoLayoutEffect(() => {
    setFilled(hasSelectedValue);
  }, [hasSelectedValue, setFilled]);
  useIsoLayoutEffect(function syncSelectedIndex() {
    const registry = valuesRef.current;
    let nextIndex;
    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];
      if (currentValue.length === 0) {
        nextIndex = null;
      } else {
        const lastValue = currentValue[currentValue.length - 1];
        const lastIndex = findItemIndex(registry, lastValue, isItemEqualToValue);
        nextIndex = lastIndex === -1 ? null : lastIndex;
      }
    } else {
      const index = findItemIndex(registry, value, isItemEqualToValue);
      nextIndex = index === -1 ? null : index;
    }
    if (nextIndex === null) {
      selectedItemTextRef.current = null;
    }
    if (open) {
      return;
    }
    store.set("selectedIndex", nextIndex);
  }, [hasSelectedValue, multiple, open, value, valuesRef, isItemEqualToValue, store, selectedItemTextRef]);
  useValueChanged(value, () => {
    clearErrors(name);
    setDirty(value !== validityData.initialValue);
    if (shouldValidateOnChange()) {
      validation.commit(value);
    } else {
      validation.commit(value, true);
    }
  });
  const setOpen = useStableCallback((nextOpen, eventDetails) => {
    onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setOpenUnwrapped(nextOpen);
    if (!nextOpen && (eventDetails.reason === exports_reason_parts.focusOut || eventDetails.reason === exports_reason_parts.outsidePress)) {
      setTouched(true);
      setFocused(false);
      if (validationMode === "onBlur") {
        validation.commit(value);
      }
    }
    if (!nextOpen && store.state.activeIndex !== null) {
      const activeOption = listRef.current[store.state.activeIndex];
      queueMicrotask(() => {
        activeOption?.setAttribute("tabindex", "-1");
      });
    }
  });
  const handleUnmount = useStableCallback(() => {
    setMounted(false);
    store.update({
      activeIndex: null,
      openMethod: null
    });
    onOpenChangeComplete?.(false);
  });
  useOpenChangeComplete({
    enabled: !actionsRef,
    open,
    ref: popupRef,
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    }
  });
  React3.useImperativeHandle(actionsRef, () => ({
    unmount: handleUnmount
  }), [handleUnmount]);
  const setValue = useStableCallback((nextValue, eventDetails) => {
    onValueChange?.(nextValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValueUnwrapped(nextValue);
  });
  const handleScrollArrowVisibility = useStableCallback(() => {
    const scroller = store.state.listElement || popupRef.current;
    if (!scroller) {
      return;
    }
    const maxScrollTop = getMaxScrollOffset(scroller.scrollHeight, scroller.clientHeight);
    const scrollTop = normalizeScrollOffset(scroller.scrollTop, maxScrollTop);
    const shouldShowUp = scrollTop > 0;
    const shouldShowDown = scrollTop < maxScrollTop;
    if (store.state.scrollUpArrowVisible !== shouldShowUp) {
      store.set("scrollUpArrowVisible", shouldShowUp);
    }
    if (store.state.scrollDownArrowVisible !== shouldShowDown) {
      store.set("scrollDownArrowVisible", shouldShowDown);
    }
  });
  const floatingContext = useFloatingRootContext({
    open,
    onOpenChange: setOpen,
    elements: {
      reference: triggerElement,
      floating: positionerElement
    }
  });
  const click = useClick(floatingContext, {
    enabled: !readOnly && !disabled,
    event: "mousedown"
  });
  const dismiss = useDismiss(floatingContext);
  const listNavigation = useListNavigation(floatingContext, {
    enabled: !readOnly && !disabled,
    listRef,
    activeIndex,
    selectedIndex,
    disabledIndices: EMPTY_ARRAY,
    onNavigate(nextActiveIndex) {
      if (nextActiveIndex === null && !open) {
        return;
      }
      store.set("activeIndex", nextActiveIndex);
    },
    focusItemOnHover: highlightItemOnHover
  });
  const typeahead = useTypeahead(floatingContext, {
    enabled: !readOnly && !disabled && (open || !multiple),
    listRef: labelsRef,
    activeIndex,
    selectedIndex,
    onMatch(index) {
      if (open) {
        store.set("activeIndex", index);
      } else {
        setValue(valuesRef.current[index], createChangeEventDetails("none"));
      }
    },
    onTyping(typing) {
      typingRef.current = typing;
    }
  });
  const mergedTriggerProps = React3.useMemo(() => {
    const triggerInteractionProps = mergeProps(typeahead.reference, listNavigation.reference, dismiss.reference, click.reference, interactionTypeProps);
    if (generatedId) {
      triggerInteractionProps.id = generatedId;
    }
    return triggerInteractionProps;
  }, [click.reference, typeahead.reference, listNavigation.reference, dismiss.reference, interactionTypeProps, generatedId]);
  const popupProps = React3.useMemo(() => mergeProps(FOCUSABLE_POPUP_PROPS, typeahead.floating, listNavigation.floating, dismiss.floating), [typeahead.floating, listNavigation.floating, dismiss.floating]);
  const itemProps = listNavigation.item ?? EMPTY_OBJECT;
  useOnFirstRender(() => {
    store.update({
      popupProps,
      triggerProps: mergedTriggerProps
    });
  });
  useIsoLayoutEffect(() => {
    store.update({
      id: generatedId,
      modal,
      multiple,
      value,
      open,
      mounted,
      transitionStatus,
      popupProps,
      triggerProps: mergedTriggerProps,
      items,
      itemToStringLabel,
      itemToStringValue,
      isItemEqualToValue,
      openMethod: renderedOpenMethod
    });
  }, [store, generatedId, modal, multiple, value, open, mounted, transitionStatus, popupProps, mergedTriggerProps, items, itemToStringLabel, itemToStringValue, isItemEqualToValue, renderedOpenMethod]);
  const contextValue = React3.useMemo(() => ({
    store,
    name,
    required,
    disabled,
    readOnly,
    multiple,
    highlightItemOnHover,
    setValue,
    setOpen,
    listRef,
    popupRef,
    scrollHandlerRef,
    handleScrollArrowVisibility,
    scrollArrowsMountedCountRef,
    itemProps,
    events: floatingContext.context.events,
    valueRef,
    valuesRef,
    labelsRef,
    typingRef,
    selectionRef,
    firstItemTextRef,
    selectedItemTextRef,
    validation,
    onOpenChangeComplete,
    keyboardActiveRef,
    alignItemWithTriggerActiveRef,
    initialValueRef
  }), [store, name, required, disabled, readOnly, multiple, highlightItemOnHover, setValue, setOpen, itemProps, floatingContext.context.events, validation, onOpenChangeComplete, handleScrollArrowVisibility]);
  const ref = useMergedRefs(inputRef, validation.inputRef);
  const hasMultipleSelection = multiple && Array.isArray(value) && value.length > 0;
  const hiddenInputName = multiple ? undefined : name;
  const hiddenInputs = React3.useMemo(() => {
    if (!multiple || !Array.isArray(value) || !name) {
      return null;
    }
    return value.map((v) => {
      const currentSerializedValue = stringifyAsValue(v, itemToStringValue);
      return /* @__PURE__ */ _jsx2("input", {
        type: "hidden",
        form,
        name,
        value: currentSerializedValue
      }, currentSerializedValue);
    });
  }, [multiple, value, form, name, itemToStringValue]);
  return /* @__PURE__ */ _jsx2(SelectRootContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ _jsxs(SelectFloatingContext.Provider, {
      value: floatingContext,
      children: [children, /* @__PURE__ */ _jsx2("input", {
        ...validation.getInputValidationProps({
          onFocus() {
            store.state.triggerElement?.focus({
              focusVisible: true
            });
          },
          onChange(event) {
            if (event.nativeEvent.defaultPrevented || disabled || readOnly) {
              event.preventBaseUIHandler?.();
              return;
            }
            const nextValue = event.currentTarget.value;
            const details = createChangeEventDetails(exports_reason_parts.none, event.nativeEvent);
            function handleChange() {
              if (multiple) {
                return;
              }
              const matchingValue = valuesRef.current.find((v) => {
                const candidateValue = stringifyAsValue(v, itemToStringValue);
                if (candidateValue.toLowerCase() === nextValue.toLowerCase()) {
                  return true;
                }
                const candidateLabel = stringifyAsLabel(v, itemToStringLabel);
                if (candidateLabel.toLowerCase() === nextValue.toLowerCase()) {
                  return true;
                }
                return false;
              });
              if (matchingValue != null) {
                setDirty(matchingValue !== validityData.initialValue);
                setValue(matchingValue, details);
                if (shouldValidateOnChange()) {
                  validation.commit(matchingValue);
                }
              }
            }
            store.set("forceMount", true);
            queueMicrotask(handleChange);
          }
        }),
        id: generatedId && hiddenInputName == null ? `${generatedId}-hidden-input` : undefined,
        form,
        name: hiddenInputName,
        autoComplete,
        value: serializedValue,
        disabled,
        required: required && !hasMultipleSelection,
        readOnly,
        ref,
        style: name ? visuallyHiddenInput : visuallyHidden,
        tabIndex: -1,
        "aria-hidden": true,
        suppressHydrationWarning: true
      }), hiddenInputs]
    })
  });
}
// node_modules/@base-ui/react/esm/select/label/SelectLabel.js
import * as React4 from "react";
"use client";
var SelectLabel = /* @__PURE__ */ React4.forwardRef(function SelectLabel2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const elementPropsWithoutId = elementProps;
  delete elementPropsWithoutId.id;
  const fieldRootContext = useFieldRootContext();
  const {
    store
  } = useSelectRootContext();
  const triggerElement = useStore(store, selectors.triggerElement);
  const rootId = useStore(store, selectors.id);
  const defaultLabelId = getDefaultLabelId(rootId);
  const labelProps = useLabel({
    id: defaultLabelId,
    fallbackControlId: triggerElement?.id ?? rootId,
    setLabelId(nextLabelId) {
      store.set("labelId", nextLabelId);
    }
  });
  return useRenderElement("div", componentProps, {
    ref: forwardedRef,
    state: fieldRootContext.state,
    props: [labelProps, elementProps],
    stateAttributesMapping: fieldValidityMapping
  });
});
if (true)
  SelectLabel.displayName = "SelectLabel";
// node_modules/@base-ui/react/esm/select/trigger/SelectTrigger.js
import * as React5 from "react";
"use client";
var BOUNDARY_OFFSET = 2;
var SELECTED_DELAY = 400;
var stateAttributesMapping = {
  ...pressableTriggerOpenStateMapping,
  ...fieldValidityMapping,
  popupSide: (side) => side ? {
    "data-popup-side": side
  } : null,
  value: () => null
};
var SelectTrigger = /* @__PURE__ */ React5.forwardRef(function SelectTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    id: idProp,
    disabled: disabledProp = false,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const {
    setTouched,
    setFocused,
    validationMode,
    state: fieldState,
    disabled: fieldDisabled
  } = useFieldRootContext();
  const {
    labelId: fieldLabelId
  } = useLabelableContext();
  const {
    store,
    setOpen,
    selectionRef,
    validation,
    readOnly,
    required,
    alignItemWithTriggerActiveRef,
    disabled: selectDisabled,
    keyboardActiveRef
  } = useSelectRootContext();
  const disabled = fieldDisabled || selectDisabled || disabledProp;
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const value = useStore(store, selectors.value);
  const triggerProps = useStore(store, selectors.triggerProps);
  const positionerElement = useStore(store, selectors.positionerElement);
  const listElement = useStore(store, selectors.listElement);
  const popupSideValue = useStore(store, selectors.popupSide);
  const rootId = useStore(store, selectors.id);
  const selectLabelId = useStore(store, selectors.labelId);
  const hasSelectedValue = useStore(store, selectors.hasSelectedValue);
  const popupSide = mounted && positionerElement ? popupSideValue : null;
  const id = idProp ?? rootId;
  const ariaLabelledBy = resolveAriaLabelledBy(fieldLabelId, selectLabelId);
  useLabelableId({
    id
  });
  const positionerRef = useValueAsRef(positionerElement);
  const triggerRef = React5.useRef(null);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const setTriggerElement = useStableCallback((element) => {
    store.set("triggerElement", element);
  });
  const mergedRef = useMergedRefs(forwardedRef, triggerRef, buttonRef, setTriggerElement);
  const timeoutFocus = useTimeout();
  const timeoutMouseDown = useTimeout();
  const selectedDelayTimeout = useTimeout();
  React5.useEffect(() => {
    if (open) {
      selectedDelayTimeout.start(SELECTED_DELAY, () => {
        selectionRef.current.allowUnselectedMouseUp = true;
        selectionRef.current.allowSelectedMouseUp = true;
      });
      return () => {
        selectedDelayTimeout.clear();
      };
    }
    selectionRef.current = {
      allowSelectedMouseUp: false,
      allowUnselectedMouseUp: false,
      dragY: 0
    };
    timeoutMouseDown.clear();
    return;
  }, [open, selectionRef, timeoutMouseDown, selectedDelayTimeout]);
  const props = mergeProps(triggerProps, {
    id,
    role: "combobox",
    "aria-expanded": open ? "true" : "false",
    "aria-haspopup": "listbox",
    "aria-controls": open ? listElement?.id ?? getFloatingFocusElement(positionerElement)?.id : undefined,
    "aria-labelledby": ariaLabelledBy,
    "aria-readonly": readOnly || undefined,
    "aria-required": required || undefined,
    tabIndex: disabled ? -1 : 0,
    ref: mergedRef,
    onFocus(event) {
      setFocused(true);
      if (open && alignItemWithTriggerActiveRef.current) {
        setOpen(false, createChangeEventDetails(exports_reason_parts.none, event.nativeEvent));
      }
      timeoutFocus.start(0, () => {
        store.set("forceMount", true);
      });
    },
    onBlur(event) {
      if (contains(positionerElement, event.relatedTarget)) {
        return;
      }
      setTouched(true);
      setFocused(false);
      if (validationMode === "onBlur") {
        validation.commit(value);
      }
    },
    onPointerMove() {
      keyboardActiveRef.current = false;
    },
    onKeyDown() {
      keyboardActiveRef.current = true;
    },
    onMouseDown(event) {
      if (open) {
        return;
      }
      const doc = ownerDocument(event.currentTarget);
      function handleMouseUp(mouseEvent) {
        if (!triggerRef.current) {
          return;
        }
        const mouseUpTarget = mouseEvent.target;
        if (contains(triggerRef.current, mouseUpTarget) || contains(positionerRef.current, mouseUpTarget) || mouseUpTarget === triggerRef.current) {
          return;
        }
        const bounds = getPseudoElementBounds(triggerRef.current);
        if (mouseEvent.clientX >= bounds.left - BOUNDARY_OFFSET && mouseEvent.clientX <= bounds.right + BOUNDARY_OFFSET && mouseEvent.clientY >= bounds.top - BOUNDARY_OFFSET && mouseEvent.clientY <= bounds.bottom + BOUNDARY_OFFSET) {
          return;
        }
        setOpen(false, createChangeEventDetails(exports_reason_parts.cancelOpen, mouseEvent));
      }
      timeoutMouseDown.start(0, () => {
        doc.addEventListener("mouseup", handleMouseUp, {
          once: true
        });
      });
    }
  }, validation.getValidationProps, elementProps, getButtonProps);
  props.role = "combobox";
  const state = {
    ...fieldState,
    open,
    disabled,
    value,
    readOnly,
    popupSide,
    placeholder: !hasSelectedValue
  };
  return useRenderElement("button", componentProps, {
    ref: [forwardedRef, triggerRef],
    state,
    stateAttributesMapping,
    props
  });
});
if (true)
  SelectTrigger.displayName = "SelectTrigger";
// node_modules/@base-ui/react/esm/select/value/SelectValue.js
import * as React6 from "react";
"use client";
var stateAttributesMapping2 = {
  value: () => null
};
var SelectValue = /* @__PURE__ */ React6.forwardRef(function SelectValue2(componentProps, forwardedRef) {
  const {
    className,
    render,
    children: childrenProp,
    placeholder,
    style,
    ...elementProps
  } = componentProps;
  const {
    store,
    valueRef
  } = useSelectRootContext();
  const value = useStore(store, selectors.value);
  const items = useStore(store, selectors.items);
  const itemToStringLabel = useStore(store, selectors.itemToStringLabel);
  const hasSelectedValue = useStore(store, selectors.hasSelectedValue);
  const shouldCheckNullItemLabel = !hasSelectedValue && placeholder != null && childrenProp == null;
  const hasNullLabel = useStore(store, selectors.hasNullItemLabel, shouldCheckNullItemLabel);
  const state = {
    value,
    placeholder: !hasSelectedValue
  };
  let children = null;
  if (typeof childrenProp === "function") {
    children = childrenProp(value);
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (!hasSelectedValue && placeholder != null && !hasNullLabel) {
    children = placeholder;
  } else if (Array.isArray(value)) {
    children = resolveMultipleLabels(value, items, itemToStringLabel);
  } else {
    children = resolveSelectedLabel(value, items, itemToStringLabel);
  }
  const element = useRenderElement("span", componentProps, {
    state,
    ref: [forwardedRef, valueRef],
    props: [{
      children
    }, elementProps],
    stateAttributesMapping: stateAttributesMapping2
  });
  return element;
});
if (true)
  SelectValue.displayName = "SelectValue";
// node_modules/@base-ui/react/esm/select/icon/SelectIcon.js
import * as React7 from "react";
"use client";
var SelectIcon = /* @__PURE__ */ React7.forwardRef(function SelectIcon2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    store
  } = useSelectRootContext();
  const open = useStore(store, selectors.open);
  const state = {
    open
  };
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      "aria-hidden": true,
      children: "▼"
    }, elementProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
  return element;
});
if (true)
  SelectIcon.displayName = "SelectIcon";
// node_modules/@base-ui/react/esm/select/portal/SelectPortal.js
import * as React9 from "react";

// node_modules/@base-ui/react/esm/select/portal/SelectPortalContext.js
import * as React8 from "react";
"use client";
var SelectPortalContext = /* @__PURE__ */ React8.createContext(undefined);
if (true)
  SelectPortalContext.displayName = "SelectPortalContext";

// node_modules/@base-ui/react/esm/select/portal/SelectPortal.js
import { jsx as _jsx3 } from "react/jsx-runtime";
"use client";
var SelectPortal = /* @__PURE__ */ React9.forwardRef(function SelectPortal2(portalProps, forwardedRef) {
  const {
    store
  } = useSelectRootContext();
  const mounted = useStore(store, selectors.mounted);
  const forceMount = useStore(store, selectors.forceMount);
  const shouldRender = mounted || forceMount;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ _jsx3(SelectPortalContext.Provider, {
    value: true,
    children: /* @__PURE__ */ _jsx3(FloatingPortal, {
      ref: forwardedRef,
      ...portalProps
    })
  });
});
if (true)
  SelectPortal.displayName = "SelectPortal";
// node_modules/@base-ui/react/esm/select/backdrop/SelectBackdrop.js
import * as React10 from "react";
"use client";
var stateAttributesMapping3 = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
var SelectBackdrop = /* @__PURE__ */ React10.forwardRef(function SelectBackdrop2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    store
  } = useSelectRootContext();
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const transitionStatus = useStore(store, selectors.transitionStatus);
  const state = {
    open,
    transitionStatus
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      role: "presentation",
      hidden: !mounted,
      style: {
        userSelect: "none",
        WebkitUserSelect: "none"
      }
    }, elementProps],
    stateAttributesMapping: stateAttributesMapping3
  });
  return element;
});
if (true)
  SelectBackdrop.displayName = "SelectBackdrop";
// node_modules/@base-ui/react/esm/select/positioner/SelectPositioner.js
import * as React12 from "react";

// node_modules/@base-ui/react/esm/select/positioner/SelectPositionerContext.js
import * as React11 from "react";
"use client";
var SelectPositionerContext = /* @__PURE__ */ React11.createContext(undefined);
if (true)
  SelectPositionerContext.displayName = "SelectPositionerContext";
function useSelectPositionerContext() {
  const context = React11.useContext(SelectPositionerContext);
  if (!context) {
    throw new Error("Base UI: SelectPositionerContext is missing. SelectPositioner parts must be placed within <Select.Positioner>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/select/popup/utils.js
function clearStyles(element, originalStyles) {
  if (element) {
    Object.assign(element.style, originalStyles);
  }
}
var LIST_FUNCTIONAL_STYLES = {
  position: "relative",
  maxHeight: "100%",
  overflowX: "hidden",
  overflowY: "auto"
};

// node_modules/@base-ui/react/esm/select/positioner/SelectPositioner.js
import { jsx as _jsx4, jsxs as _jsxs2 } from "react/jsx-runtime";
"use client";
var FIXED = {
  position: "fixed"
};
var SelectPositioner = /* @__PURE__ */ React12.forwardRef(function SelectPositioner2(componentProps, forwardedRef) {
  const {
    anchor,
    positionMethod = "absolute",
    className,
    render,
    side = "bottom",
    align = "center",
    sideOffset = 0,
    alignOffset = 0,
    collisionBoundary = "clipping-ancestors",
    collisionPadding,
    arrowPadding = 5,
    sticky = false,
    disableAnchorTracking,
    alignItemWithTrigger = true,
    collisionAvoidance = DROPDOWN_COLLISION_AVOIDANCE,
    style,
    ...elementProps
  } = componentProps;
  const {
    store,
    listRef,
    labelsRef,
    alignItemWithTriggerActiveRef,
    selectedItemTextRef,
    valuesRef,
    initialValueRef,
    popupRef,
    setValue
  } = useSelectRootContext();
  const floatingRootContext = useSelectFloatingContext();
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const modal = useStore(store, selectors.modal);
  const value = useStore(store, selectors.value);
  const openMethod = useStore(store, selectors.openMethod);
  const positionerElement = useStore(store, selectors.positionerElement);
  const triggerElement = useStore(store, selectors.triggerElement);
  const isItemEqualToValue = useStore(store, selectors.isItemEqualToValue);
  const transitionStatus = useStore(store, selectors.transitionStatus);
  const scrollUpArrowRef = React12.useRef(null);
  const scrollDownArrowRef = React12.useRef(null);
  const [controlledAlignItemWithTrigger, setControlledAlignItemWithTrigger] = React12.useState(alignItemWithTrigger);
  const alignItemWithTriggerActive = mounted && controlledAlignItemWithTrigger && openMethod !== "touch";
  if (!mounted && controlledAlignItemWithTrigger !== alignItemWithTrigger) {
    setControlledAlignItemWithTrigger(alignItemWithTrigger);
  }
  useIsoLayoutEffect(() => {
    if (!mounted) {
      if (selectors.scrollUpArrowVisible(store.state)) {
        store.set("scrollUpArrowVisible", false);
      }
      if (selectors.scrollDownArrowVisible(store.state)) {
        store.set("scrollDownArrowVisible", false);
      }
    }
  }, [store, mounted]);
  React12.useImperativeHandle(alignItemWithTriggerActiveRef, () => alignItemWithTriggerActive);
  useAnchoredPopupScrollLock((alignItemWithTriggerActive || modal) && open, openMethod === "touch", positionerElement, triggerElement);
  const positioning = useAnchorPositioning({
    anchor,
    floatingRootContext,
    positionMethod,
    mounted,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    collisionBoundary,
    collisionPadding,
    sticky,
    disableAnchorTracking: disableAnchorTracking ?? alignItemWithTriggerActive,
    collisionAvoidance,
    keepMounted: true
  });
  const renderedSide = alignItemWithTriggerActive ? "none" : positioning.side;
  const positionerStyles = alignItemWithTriggerActive ? FIXED : positioning.positionerStyles;
  const state = {
    open,
    side: renderedSide,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden
  };
  useIsoLayoutEffect(() => {
    store.set("popupSide", positioning.side);
  }, [store, positioning.side]);
  const setPositionerElement = useStableCallback((element2) => {
    store.set("positionerElement", element2);
  });
  const element = usePositioner(componentProps, state, {
    styles: positionerStyles,
    transitionStatus,
    props: elementProps,
    refs: [forwardedRef, setPositionerElement],
    hidden: !mounted,
    inert: !open
  });
  const prevMapSizeRef = React12.useRef(0);
  const onMapChange = useStableCallback((map) => {
    if (map.size === 0 && prevMapSizeRef.current === 0) {
      return;
    }
    if (valuesRef.current.length === 0) {
      return;
    }
    const prevSize = prevMapSizeRef.current;
    prevMapSizeRef.current = map.size;
    if (map.size === prevSize) {
      return;
    }
    const eventDetails = createChangeEventDetails(exports_reason_parts.none);
    if (prevSize !== 0 && !store.state.multiple && value !== null) {
      const selectedValueIndex = findItemIndex(valuesRef.current, value, isItemEqualToValue);
      if (selectedValueIndex === -1) {
        const initialSelectedValue = initialValueRef.current;
        const hasInitial = initialSelectedValue != null && findItemIndex(valuesRef.current, initialSelectedValue, isItemEqualToValue) !== -1;
        const nextValue = hasInitial ? initialSelectedValue : null;
        setValue(nextValue, eventDetails);
        if (nextValue === null) {
          store.set("selectedIndex", null);
          selectedItemTextRef.current = null;
        }
      }
    }
    if (prevSize !== 0 && store.state.multiple && Array.isArray(value)) {
      const hasVisibleItem = (selectedItemValue) => findItemIndex(valuesRef.current, selectedItemValue, isItemEqualToValue) !== -1;
      const nextValue = value.filter((selectedItemValue) => hasVisibleItem(selectedItemValue));
      if (nextValue.length !== value.length || nextValue.some((selectedItemValue) => !selectedValueIncludes(value, selectedItemValue, isItemEqualToValue))) {
        setValue(nextValue, eventDetails);
        if (nextValue.length === 0) {
          store.set("selectedIndex", null);
          selectedItemTextRef.current = null;
        }
      }
    }
    if (open && alignItemWithTriggerActive) {
      store.update({
        scrollUpArrowVisible: false,
        scrollDownArrowVisible: false
      });
      const stylesToClear = {
        height: ""
      };
      clearStyles(positionerElement, stylesToClear);
      clearStyles(popupRef.current, stylesToClear);
    }
  });
  const contextValue = React12.useMemo(() => ({
    ...positioning,
    side: renderedSide,
    alignItemWithTriggerActive,
    setControlledAlignItemWithTrigger,
    scrollUpArrowRef,
    scrollDownArrowRef
  }), [positioning, renderedSide, alignItemWithTriggerActive, setControlledAlignItemWithTrigger]);
  return /* @__PURE__ */ _jsx4(CompositeList, {
    elementsRef: listRef,
    labelsRef,
    onMapChange,
    children: /* @__PURE__ */ _jsxs2(SelectPositionerContext.Provider, {
      value: contextValue,
      children: [mounted && modal && /* @__PURE__ */ _jsx4(InternalBackdrop, {
        inert: inertValue(!open),
        cutout: triggerElement
      }), element]
    })
  });
});
if (true)
  SelectPositioner.displayName = "SelectPositioner";
// node_modules/@base-ui/react/esm/select/popup/SelectPopup.js
import * as React13 from "react";
import { jsx as _jsx5, jsxs as _jsxs3 } from "react/jsx-runtime";
"use client";
var stateAttributesMapping4 = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
var SelectPopup = /* @__PURE__ */ React13.forwardRef(function SelectPopup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    finalFocus,
    ...elementProps
  } = componentProps;
  const {
    store,
    popupRef,
    onOpenChangeComplete,
    setOpen,
    valueRef,
    firstItemTextRef,
    selectedItemTextRef,
    keyboardActiveRef,
    multiple,
    handleScrollArrowVisibility,
    scrollHandlerRef,
    listRef,
    highlightItemOnHover
  } = useSelectRootContext();
  const {
    side,
    align,
    alignItemWithTriggerActive,
    isPositioned,
    setControlledAlignItemWithTrigger,
    scrollDownArrowRef,
    scrollUpArrowRef
  } = useSelectPositionerContext();
  const insideToolbar = useToolbarRootContext(true) != null;
  const floatingRootContext = useSelectFloatingContext();
  const direction = useDirection();
  const {
    nonce,
    disableStyleElements
  } = useCSPContext();
  const id = useStore(store, selectors.id);
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const popupProps = useStore(store, selectors.popupProps);
  const transitionStatus = useStore(store, selectors.transitionStatus);
  const triggerElement = useStore(store, selectors.triggerElement);
  const positionerElement = useStore(store, selectors.positionerElement);
  const listElement = useStore(store, selectors.listElement);
  const reachedMaxHeightRef = React13.useRef(false);
  const initialPlacedRef = React13.useRef(false);
  const originalPositionerStylesRef = React13.useRef({});
  const scrollArrowFrame = useAnimationFrame();
  const handleScroll = useStableCallback((scroller) => {
    if (!positionerElement || !popupRef.current || !initialPlacedRef.current) {
      return;
    }
    if (reachedMaxHeightRef.current || !alignItemWithTriggerActive) {
      handleScrollArrowVisibility();
      return;
    }
    const isTopPositioned = positionerElement.style.top === "0px";
    const isBottomPositioned = positionerElement.style.bottom === "0px";
    if (!isTopPositioned && !isBottomPositioned) {
      handleScrollArrowVisibility();
      return;
    }
    const scale = getScale(positionerElement);
    const currentHeight = normalizeSize(positionerElement.getBoundingClientRect().height, "y", scale);
    const doc = ownerDocument(positionerElement);
    const positionerStyles = getComputedStyle(positionerElement);
    const marginTop = parseFloat(positionerStyles.marginTop);
    const marginBottom = parseFloat(positionerStyles.marginBottom);
    const maxPopupHeight = getMaxPopupHeight(getComputedStyle(popupRef.current));
    const maxAvailableHeight = Math.min(doc.documentElement.clientHeight - marginTop - marginBottom, maxPopupHeight);
    const scrollTop = scroller.scrollTop;
    const maxScrollTop = getMaxScrollTop(scroller);
    let nextPositionerHeight = 0;
    let nextScrollTop = null;
    let setReachedMax = false;
    let scrollToMax = false;
    const setHeight = (height) => {
      positionerElement.style.height = `${height}px`;
    };
    const handleSmallDiff = (diff2, targetScrollTop) => {
      const heightDelta = clamp(diff2, 0, maxAvailableHeight - currentHeight);
      if (heightDelta > 0) {
        setHeight(currentHeight + heightDelta);
      }
      scroller.scrollTop = targetScrollTop;
      if (maxAvailableHeight - (currentHeight + heightDelta) <= SCROLL_EDGE_TOLERANCE_PX) {
        reachedMaxHeightRef.current = true;
      }
      handleScrollArrowVisibility();
    };
    const diff = isTopPositioned ? maxScrollTop - scrollTop : scrollTop;
    const nextHeight = Math.min(currentHeight + diff, maxAvailableHeight);
    nextPositionerHeight = nextHeight;
    if (diff <= SCROLL_EDGE_TOLERANCE_PX) {
      handleSmallDiff(diff, isTopPositioned ? maxScrollTop : 0);
      return;
    }
    if (maxAvailableHeight - nextHeight > SCROLL_EDGE_TOLERANCE_PX) {
      if (isTopPositioned) {
        scrollToMax = true;
      } else {
        nextScrollTop = 0;
      }
    } else {
      setReachedMax = true;
      if (isBottomPositioned && scrollTop < maxScrollTop) {
        const overshoot = currentHeight + diff - maxAvailableHeight;
        nextScrollTop = scrollTop - (diff - overshoot);
      }
    }
    nextPositionerHeight = Math.ceil(nextPositionerHeight);
    if (nextPositionerHeight !== 0) {
      setHeight(nextPositionerHeight);
    }
    if (scrollToMax || nextScrollTop != null) {
      const nextMaxScrollTop = getMaxScrollTop(scroller);
      const target = scrollToMax ? nextMaxScrollTop : clamp(nextScrollTop, 0, nextMaxScrollTop);
      if (Math.abs(scroller.scrollTop - target) > SCROLL_EDGE_TOLERANCE_PX) {
        scroller.scrollTop = target;
      }
    }
    if (setReachedMax || nextPositionerHeight >= maxAvailableHeight - SCROLL_EDGE_TOLERANCE_PX) {
      reachedMaxHeightRef.current = true;
    }
    handleScrollArrowVisibility();
  });
  React13.useImperativeHandle(scrollHandlerRef, () => handleScroll, [handleScroll]);
  useOpenChangeComplete({
    open,
    ref: popupRef,
    onComplete() {
      if (open) {
        onOpenChangeComplete?.(true);
      }
    }
  });
  const state = {
    open,
    transitionStatus,
    side,
    align
  };
  useIsoLayoutEffect(() => {
    if (!positionerElement || !popupRef.current || Object.keys(originalPositionerStylesRef.current).length) {
      return;
    }
    originalPositionerStylesRef.current = {
      top: positionerElement.style.top || "0",
      left: positionerElement.style.left || "0",
      right: positionerElement.style.right,
      height: positionerElement.style.height,
      bottom: positionerElement.style.bottom,
      minHeight: positionerElement.style.minHeight,
      maxHeight: positionerElement.style.maxHeight,
      marginTop: positionerElement.style.marginTop,
      marginBottom: positionerElement.style.marginBottom
    };
  }, [popupRef, positionerElement]);
  useIsoLayoutEffect(() => {
    if (open || alignItemWithTriggerActive) {
      return;
    }
    initialPlacedRef.current = false;
    reachedMaxHeightRef.current = false;
    clearStyles(positionerElement, originalPositionerStylesRef.current);
  }, [open, alignItemWithTriggerActive, positionerElement, popupRef]);
  useIsoLayoutEffect(() => {
    const popupElement = popupRef.current;
    if (!open || !triggerElement || !positionerElement || !popupElement || alignItemWithTriggerActive && !isPositioned || store.state.transitionStatus === "ending") {
      return;
    }
    if (!alignItemWithTriggerActive) {
      initialPlacedRef.current = true;
      scrollArrowFrame.request(handleScrollArrowVisibility);
      popupElement.style.removeProperty("--transform-origin");
      return;
    }
    const restoreTransformStyles = unsetTransformStyles(popupElement);
    popupElement.style.removeProperty("--transform-origin");
    try {
      let textElement = selectedItemTextRef.current;
      if (!textElement?.isConnected) {
        const hasSelectedValue = selectors.hasSelectedValue(store.state);
        textElement = !hasSelectedValue && firstItemTextRef.current?.isConnected ? firstItemTextRef.current : null;
      }
      const valueElement = valueRef.current;
      const positionerStyles = getComputedStyle(positionerElement);
      const popupStyles = getComputedStyle(popupElement);
      const doc = ownerDocument(triggerElement);
      const win = getWindow(positionerElement);
      const scale = getScale(triggerElement);
      const triggerRect = normalizeRect(triggerElement.getBoundingClientRect(), scale);
      const positionerRect = normalizeRect(positionerElement.getBoundingClientRect(), scale);
      const triggerHeight = triggerRect.height;
      const scroller = listElement || popupElement;
      const scrollHeight = scroller.scrollHeight;
      const borderBottom = parseFloat(popupStyles.borderBottomWidth);
      const marginTop = parseFloat(positionerStyles.marginTop) || 10;
      const marginBottom = parseFloat(positionerStyles.marginBottom) || 10;
      const minHeight = parseFloat(positionerStyles.minHeight) || 100;
      const maxPopupHeight = getMaxPopupHeight(popupStyles);
      const paddingLeft = 5;
      const paddingRight = 5;
      const triggerCollisionThreshold = 20;
      const viewportHeight = doc.documentElement.clientHeight - marginTop - marginBottom;
      const viewportWidth = doc.documentElement.clientWidth;
      const availableSpaceBeneathTrigger = viewportHeight - triggerRect.bottom + triggerHeight;
      let textRect;
      let alignedLeft = direction === "rtl" ? triggerRect.right - positionerRect.width : triggerRect.left;
      let offsetY = 0;
      if (textElement && valueElement) {
        const valueRect = normalizeRect(valueElement.getBoundingClientRect(), scale);
        textRect = normalizeRect(textElement.getBoundingClientRect(), scale);
        alignedLeft = positionerRect.left + (direction === "rtl" ? valueRect.right - textRect.right : valueRect.left - textRect.left);
        const valueCenterFromTriggerTop = valueRect.top - triggerRect.top + valueRect.height / 2;
        const textCenterFromPositionerTop = textRect.top - positionerRect.top + textRect.height / 2;
        offsetY = textCenterFromPositionerTop - valueCenterFromTriggerTop;
      }
      const idealHeight = availableSpaceBeneathTrigger + offsetY + marginBottom + borderBottom;
      let height = Math.min(viewportHeight, idealHeight);
      const maxHeight = viewportHeight - marginTop - marginBottom;
      const scrollTop = idealHeight - height;
      const maxRight = viewportWidth - paddingRight;
      positionerElement.style.left = `${clamp(alignedLeft, paddingLeft, maxRight - positionerRect.width)}px`;
      positionerElement.style.height = `${height}px`;
      positionerElement.style.maxHeight = "auto";
      positionerElement.style.marginTop = `${marginTop}px`;
      positionerElement.style.marginBottom = `${marginBottom}px`;
      popupElement.style.height = "100%";
      const maxScrollTop = getMaxScrollTop(scroller);
      const isTopPositioned = scrollTop >= maxScrollTop - SCROLL_EDGE_TOLERANCE_PX;
      if (isTopPositioned) {
        height = Math.min(viewportHeight, positionerRect.height) - (scrollTop - maxScrollTop);
      }
      const fallbackToAlignPopupToTrigger = triggerRect.top < triggerCollisionThreshold || triggerRect.bottom > viewportHeight - triggerCollisionThreshold || Math.ceil(height) + SCROLL_EDGE_TOLERANCE_PX < Math.min(scrollHeight, minHeight);
      const isPinchZoomed = (win.visualViewport?.scale ?? 1) !== 1 && isWebKit;
      if (fallbackToAlignPopupToTrigger || isPinchZoomed) {
        initialPlacedRef.current = true;
        clearStyles(positionerElement, originalPositionerStylesRef.current);
        setControlledAlignItemWithTrigger(false);
        return;
      }
      const initialHeight = Math.max(minHeight, height);
      if (isTopPositioned) {
        const topOffset = Math.max(0, viewportHeight - idealHeight);
        positionerElement.style.top = positionerRect.height >= maxHeight ? "0" : `${topOffset}px`;
        positionerElement.style.height = `${height}px`;
        scroller.scrollTop = getMaxScrollTop(scroller);
      } else {
        positionerElement.style.bottom = "0";
        scroller.scrollTop = scrollTop;
      }
      if (textRect) {
        const popupTop = positionerRect.top;
        const popupHeight = positionerRect.height;
        const textCenterY = textRect.top + textRect.height / 2;
        const transformOriginY = popupHeight > 0 ? (textCenterY - popupTop) / popupHeight * 100 : 50;
        const clampedY = clamp(transformOriginY, 0, 100);
        popupElement.style.setProperty("--transform-origin", `50% ${clampedY}%`);
      }
      if (initialHeight === viewportHeight || height >= maxPopupHeight) {
        reachedMaxHeightRef.current = true;
      }
      handleScrollArrowVisibility();
      if (highlightItemOnHover && store.state.selectedIndex === null && store.state.activeIndex === null && listRef.current[0] != null) {
        store.set("activeIndex", 0);
      }
      initialPlacedRef.current = true;
    } finally {
      restoreTransformStyles();
    }
  }, [store, open, positionerElement, triggerElement, valueRef, firstItemTextRef, selectedItemTextRef, popupRef, handleScrollArrowVisibility, alignItemWithTriggerActive, setControlledAlignItemWithTrigger, scrollArrowFrame, scrollDownArrowRef, scrollUpArrowRef, listElement, listRef, highlightItemOnHover, direction, isPositioned]);
  React13.useEffect(() => {
    if (!alignItemWithTriggerActive || !positionerElement || !open) {
      return;
    }
    const win = getWindow(positionerElement);
    function handleResize(event) {
      setOpen(false, createChangeEventDetails(exports_reason_parts.windowResize, event));
    }
    return addEventListener(win, "resize", handleResize);
  }, [setOpen, alignItemWithTriggerActive, positionerElement, open]);
  const defaultProps = {
    ...listElement ? {
      role: "presentation",
      "aria-orientation": undefined
    } : {
      role: "listbox",
      "aria-multiselectable": multiple || undefined,
      id: `${id}-list`
    },
    onKeyDown(event) {
      keyboardActiveRef.current = true;
      if (insideToolbar && COMPOSITE_KEYS.has(event.key)) {
        event.stopPropagation();
      }
    },
    onMouseMove() {
      keyboardActiveRef.current = false;
    },
    onScroll(event) {
      if (listElement) {
        return;
      }
      handleScroll(event.currentTarget);
    },
    ...alignItemWithTriggerActive && {
      style: listElement ? {
        height: "100%"
      } : LIST_FUNCTIONAL_STYLES
    }
  };
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, popupRef],
    state,
    stateAttributesMapping: stateAttributesMapping4,
    props: [popupProps, defaultProps, getDisabledMountTransitionStyles(transitionStatus), {
      className: !listElement && alignItemWithTriggerActive ? styleDisableScrollbar.className : undefined
    }, elementProps]
  });
  return /* @__PURE__ */ _jsxs3(React13.Fragment, {
    children: [!disableStyleElements && styleDisableScrollbar.getElement(nonce), /* @__PURE__ */ _jsx5(FloatingFocusManager, {
      context: floatingRootContext,
      modal: false,
      disabled: !mounted,
      returnFocus: finalFocus,
      restoreFocus: true,
      children: element
    })]
  });
});
if (true)
  SelectPopup.displayName = "SelectPopup";
function getMaxPopupHeight(popupStyles) {
  const maxHeightStyle = popupStyles.maxHeight || "";
  return maxHeightStyle.endsWith("px") ? parseFloat(maxHeightStyle) || Infinity : Infinity;
}
function getMaxScrollTop(scroller) {
  return getMaxScrollOffset(scroller.scrollHeight, scroller.clientHeight);
}
function getScale(element) {
  return platform.getScale(element);
}
function normalizeSize(size, axis, scale) {
  return size / scale[axis];
}
function normalizeRect(rect, scale) {
  return rectToClientRect({
    x: normalizeSize(rect.x, "x", scale),
    y: normalizeSize(rect.y, "y", scale),
    width: normalizeSize(rect.width, "x", scale),
    height: normalizeSize(rect.height, "y", scale)
  });
}
var TRANSFORM_STYLE_RESETS = [["transform", "none"], ["scale", "1"], ["translate", "0 0"]];
function unsetTransformStyles(popupElement) {
  const {
    style
  } = popupElement;
  const originalStyles = {};
  for (const [property, value] of TRANSFORM_STYLE_RESETS) {
    originalStyles[property] = style.getPropertyValue(property);
    style.setProperty(property, value, "important");
  }
  return () => {
    for (const [property] of TRANSFORM_STYLE_RESETS) {
      const originalValue = originalStyles[property];
      if (originalValue) {
        style.setProperty(property, originalValue);
      } else {
        style.removeProperty(property);
      }
    }
  };
}
// node_modules/@base-ui/react/esm/select/list/SelectList.js
import * as React14 from "react";
"use client";
var SelectList = /* @__PURE__ */ React14.forwardRef(function SelectList2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    store,
    scrollHandlerRef
  } = useSelectRootContext();
  const {
    alignItemWithTriggerActive
  } = useSelectPositionerContext();
  const hasScrollArrows = useStore(store, selectors.hasScrollArrows);
  const openMethod = useStore(store, selectors.openMethod);
  const multiple = useStore(store, selectors.multiple);
  const id = useStore(store, selectors.id);
  const defaultProps = {
    id: `${id}-list`,
    role: "listbox",
    "aria-multiselectable": multiple || undefined,
    onScroll(event) {
      scrollHandlerRef.current?.(event.currentTarget);
    },
    ...alignItemWithTriggerActive && {
      style: LIST_FUNCTIONAL_STYLES
    },
    className: hasScrollArrows && openMethod !== "touch" ? styleDisableScrollbar.className : undefined
  };
  const setListElement = useStableCallback((element) => {
    store.set("listElement", element);
  });
  return useRenderElement("div", componentProps, {
    ref: [forwardedRef, setListElement],
    props: [defaultProps, elementProps]
  });
});
if (true)
  SelectList.displayName = "SelectList";
// node_modules/@base-ui/react/esm/select/item/SelectItem.js
import * as React16 from "react";

// node_modules/@base-ui/react/esm/select/item/SelectItemContext.js
import * as React15 from "react";
"use client";
var SelectItemContext = /* @__PURE__ */ React15.createContext(undefined);
if (true)
  SelectItemContext.displayName = "SelectItemContext";
function useSelectItemContext() {
  const context = React15.useContext(SelectItemContext);
  if (!context) {
    throw new Error("Base UI: SelectItemContext is missing. SelectItem parts must be placed within <Select.Item>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/select/item/SelectItem.js
import { jsx as _jsx6 } from "react/jsx-runtime";
"use client";
var SelectItem = /* @__PURE__ */ React16.memo(/* @__PURE__ */ React16.forwardRef(function SelectItem2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    value: itemValue = null,
    label,
    disabled = false,
    nativeButton = false,
    ...elementProps
  } = componentProps;
  const textRef = React16.useRef(null);
  const listItem = useCompositeListItem({
    label,
    textRef,
    indexGuessBehavior: IndexGuessBehavior.GuessFromOrder
  });
  const {
    store,
    itemProps,
    setOpen,
    setValue,
    selectionRef,
    typingRef,
    valuesRef,
    multiple,
    selectedItemTextRef
  } = useSelectRootContext();
  const highlighted = useStore(store, selectors.isActive, listItem.index);
  const selected = useStore(store, selectors.isSelected, listItem.index, itemValue);
  const selectedByFocus = useStore(store, selectors.isSelectedByFocus, listItem.index);
  const isItemEqualToValue = useStore(store, selectors.isItemEqualToValue);
  const index = listItem.index;
  const hasRegistered = index !== -1;
  const itemRef = React16.useRef(null);
  useIsoLayoutEffect(() => {
    if (!hasRegistered) {
      return;
    }
    const values = valuesRef.current;
    values[index] = itemValue;
    return () => {
      delete values[index];
    };
  }, [hasRegistered, index, itemValue, valuesRef]);
  useIsoLayoutEffect(() => {
    if (!hasRegistered) {
      return;
    }
    const selectedValue = store.state.value;
    let selectedCandidate = selectedValue;
    if (multiple && Array.isArray(selectedValue) && selectedValue.length > 0) {
      selectedCandidate = selectedValue[selectedValue.length - 1];
    }
    if (selectedCandidate !== undefined && compareItemEquality(itemValue, selectedCandidate, isItemEqualToValue)) {
      store.set("selectedIndex", index);
      if (textRef.current) {
        selectedItemTextRef.current = textRef.current;
      }
    }
  }, [hasRegistered, index, multiple, isItemEqualToValue, store, itemValue, selectedItemTextRef]);
  const lastKeyRef = React16.useRef(null);
  const pointerTypeRef = React16.useRef("mouse");
  const allowMouseSelectionRef = React16.useRef(false);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton,
    composite: true
  });
  const state = {
    disabled,
    selected,
    highlighted
  };
  function commitSelection(event) {
    const selectedValue = store.state.value;
    if (multiple) {
      const currentValue = Array.isArray(selectedValue) ? selectedValue : [];
      const nextValue = selected ? removeItem(currentValue, itemValue, isItemEqualToValue) : [...currentValue, itemValue];
      setValue(nextValue, createChangeEventDetails(exports_reason_parts.itemPress, event));
    } else {
      setValue(itemValue, createChangeEventDetails(exports_reason_parts.itemPress, event));
      setOpen(false, createChangeEventDetails(exports_reason_parts.itemPress, event));
    }
  }
  function resetDragMovement() {
    selectionRef.current.dragY = 0;
  }
  const defaultProps = {
    role: "option",
    "aria-selected": selected,
    tabIndex: highlighted ? 0 : -1,
    onKeyDown(event) {
      lastKeyRef.current = event.key;
      store.set("activeIndex", index);
      if (event.key === " " && typingRef.current) {
        event.preventDefault();
      }
    },
    onClick(event) {
      const isMouseClick = event.type === "click" && pointerTypeRef.current !== "touch";
      const clickPointerType = event.nativeEvent.pointerType;
      const isVirtualMouseClick = isMouseClick && isVirtualClick(event.nativeEvent) && (clickPointerType !== undefined || highlighted);
      const isInvalidMouseClick = isMouseClick && !isVirtualMouseClick && !allowMouseSelectionRef.current;
      allowMouseSelectionRef.current = false;
      if (event.type === "keydown" && lastKeyRef.current === null) {
        return;
      }
      if (disabled || event.type === "keydown" && lastKeyRef.current === " " && typingRef.current || isInvalidMouseClick) {
        return;
      }
      lastKeyRef.current = null;
      commitSelection(event.nativeEvent);
    },
    onPointerEnter(event) {
      pointerTypeRef.current = event.pointerType;
    },
    onPointerMove(event) {
      if (event.pointerType === "mouse" && event.buttons === 1) {
        const selection = selectionRef.current;
        selection.dragY += event.movementY;
        if (selection.dragY ** 2 >= 64) {
          selection.allowUnselectedMouseUp = true;
        }
      }
    },
    onPointerDown(event) {
      pointerTypeRef.current = event.pointerType;
      allowMouseSelectionRef.current = true;
      resetDragMovement();
    },
    onMouseUp() {
      resetDragMovement();
      if (disabled || pointerTypeRef.current === "touch") {
        return;
      }
      if (allowMouseSelectionRef.current) {
        return;
      }
      const disallowSelectedMouseUp = !selectionRef.current.allowSelectedMouseUp && selected;
      const disallowUnselectedMouseUp = !selectionRef.current.allowUnselectedMouseUp && !selected;
      if (disallowSelectedMouseUp || disallowUnselectedMouseUp) {
        return;
      }
      allowMouseSelectionRef.current = true;
      itemRef.current?.click();
      allowMouseSelectionRef.current = false;
    }
  };
  const element = useRenderElement("div", componentProps, {
    ref: [buttonRef, forwardedRef, listItem.ref, itemRef],
    state,
    props: [itemProps, defaultProps, elementProps, getButtonProps]
  });
  const contextValue = React16.useMemo(() => ({
    selected,
    index,
    textRef,
    selectedByFocus,
    hasRegistered
  }), [selected, index, textRef, selectedByFocus, hasRegistered]);
  return /* @__PURE__ */ _jsx6(SelectItemContext.Provider, {
    value: contextValue,
    children: element
  });
}));
if (true)
  SelectItem.displayName = "SelectItem";
// node_modules/@base-ui/react/esm/select/item-indicator/SelectItemIndicator.js
import * as React17 from "react";
import { jsx as _jsx7 } from "react/jsx-runtime";
"use client";
var SelectItemIndicator = /* @__PURE__ */ React17.forwardRef(function SelectItemIndicator2(componentProps, forwardedRef) {
  const keepMounted = componentProps.keepMounted ?? false;
  const {
    selected
  } = useSelectItemContext();
  const shouldRender = keepMounted || selected;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ _jsx7(Inner, {
    ...componentProps,
    ref: forwardedRef
  });
});
if (true)
  SelectItemIndicator.displayName = "SelectItemIndicator";
var Inner = /* @__PURE__ */ React17.memo(/* @__PURE__ */ React17.forwardRef((componentProps, forwardedRef) => {
  const {
    render,
    className,
    style,
    keepMounted,
    ...elementProps
  } = componentProps;
  const {
    selected
  } = useSelectItemContext();
  const indicatorRef = React17.useRef(null);
  const {
    transitionStatus,
    setMounted
  } = useTransitionStatus(selected);
  const state = {
    selected,
    transitionStatus
  };
  const element = useRenderElement("span", componentProps, {
    ref: [forwardedRef, indicatorRef],
    state,
    props: [{
      "aria-hidden": true,
      children: "✔️"
    }, elementProps],
    stateAttributesMapping: transitionStatusMapping
  });
  useOpenChangeComplete({
    open: selected,
    ref: indicatorRef,
    onComplete() {
      if (!selected) {
        setMounted(false);
      }
    }
  });
  return element;
}));
if (true)
  Inner.displayName = "Inner";
// node_modules/@base-ui/react/esm/select/item-text/SelectItemText.js
import * as React18 from "react";
"use client";
var SelectItemText = /* @__PURE__ */ React18.memo(/* @__PURE__ */ React18.forwardRef(function SelectItemText2(componentProps, forwardedRef) {
  const {
    index,
    textRef,
    selectedByFocus,
    hasRegistered
  } = useSelectItemContext();
  const {
    firstItemTextRef,
    selectedItemTextRef
  } = useSelectRootContext();
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const localRef = React18.useCallback((node) => {
    if (!node) {
      return;
    }
    if (hasRegistered && index === 0) {
      firstItemTextRef.current = node;
    }
    if (hasRegistered && selectedByFocus) {
      selectedItemTextRef.current = node;
    }
  }, [firstItemTextRef, selectedItemTextRef, index, selectedByFocus, hasRegistered]);
  const element = useRenderElement("div", componentProps, {
    ref: [localRef, forwardedRef, textRef],
    props: elementProps
  });
  return element;
}));
if (true)
  SelectItemText.displayName = "SelectItemText";
// node_modules/@base-ui/react/esm/select/arrow/SelectArrow.js
import * as React19 from "react";
"use client";
var stateAttributesMapping5 = {
  ...popupStateMapping,
  ...transitionStatusMapping
};
var SelectArrow = /* @__PURE__ */ React19.forwardRef(function SelectArrow2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    store
  } = useSelectRootContext();
  const {
    side,
    align,
    arrowRef,
    arrowStyles,
    arrowUncentered,
    alignItemWithTriggerActive
  } = useSelectPositionerContext();
  const open = useStore(store, selectors.open, true);
  const state = {
    open,
    side,
    align,
    uncentered: arrowUncentered
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [arrowRef, forwardedRef],
    props: [{
      style: arrowStyles,
      "aria-hidden": true
    }, elementProps],
    stateAttributesMapping: stateAttributesMapping5
  });
  if (alignItemWithTriggerActive) {
    return null;
  }
  return element;
});
if (true)
  SelectArrow.displayName = "SelectArrow";
// node_modules/@base-ui/react/esm/select/scroll-down-arrow/SelectScrollDownArrow.js
import * as React21 from "react";

// node_modules/@base-ui/react/esm/select/scroll-arrow/SelectScrollArrow.js
import * as React20 from "react";
"use client";
var SelectScrollArrow = /* @__PURE__ */ React20.forwardRef(function SelectScrollArrow2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    direction,
    keepMounted = false,
    ...elementProps
  } = componentProps;
  const isUp = direction === "up";
  const {
    store,
    popupRef,
    listRef,
    handleScrollArrowVisibility,
    scrollArrowsMountedCountRef
  } = useSelectRootContext();
  const {
    side,
    scrollDownArrowRef,
    scrollUpArrowRef
  } = useSelectPositionerContext();
  const visibleSelector = isUp ? selectors.scrollUpArrowVisible : selectors.scrollDownArrowVisible;
  const stateVisible = useStore(store, visibleSelector);
  const openMethod = useStore(store, selectors.openMethod);
  const visible = stateVisible && openMethod !== "touch";
  const timeout = useTimeout();
  const scrollArrowRef = isUp ? scrollUpArrowRef : scrollDownArrowRef;
  const {
    transitionStatus,
    setMounted
  } = useTransitionStatus(visible);
  useIsoLayoutEffect(() => {
    scrollArrowsMountedCountRef.current += 1;
    if (!store.state.hasScrollArrows) {
      store.set("hasScrollArrows", true);
    }
    return () => {
      scrollArrowsMountedCountRef.current = Math.max(0, scrollArrowsMountedCountRef.current - 1);
      if (scrollArrowsMountedCountRef.current === 0 && store.state.hasScrollArrows) {
        store.set("hasScrollArrows", false);
      }
    };
  }, [store, scrollArrowsMountedCountRef]);
  useOpenChangeComplete({
    open: visible,
    ref: scrollArrowRef,
    onComplete() {
      if (!visible) {
        setMounted(false);
      }
    }
  });
  const state = {
    direction,
    visible,
    side,
    transitionStatus
  };
  const defaultProps = {
    "aria-hidden": true,
    children: isUp ? "▲" : "▼",
    style: {
      position: "absolute"
    },
    onMouseMove(event) {
      if (event.movementX === 0 && event.movementY === 0 || timeout.isStarted()) {
        return;
      }
      store.set("activeIndex", null);
      function scrollNextItem() {
        const scroller = store.state.listElement ?? popupRef.current;
        if (!scroller) {
          return;
        }
        store.set("activeIndex", null);
        handleScrollArrowVisibility();
        const maxScrollTop = getMaxScrollOffset(scroller.scrollHeight, scroller.clientHeight);
        const scrollTop = normalizeScrollOffset(scroller.scrollTop, maxScrollTop);
        const isScrolledToEdge = scrollTop === (isUp ? 0 : maxScrollTop);
        const items = listRef.current;
        if (scrollTop !== scroller.scrollTop) {
          scroller.scrollTop = scrollTop;
        }
        if (items.length === 0) {
          store.set(isUp ? "scrollUpArrowVisible" : "scrollDownArrowVisible", !isScrolledToEdge);
        }
        if (isScrolledToEdge) {
          timeout.clear();
          return;
        }
        if (items.length > 0) {
          const scrollArrowHeight = scrollArrowRef.current?.offsetHeight || 0;
          scroller.scrollTop = getTargetScrollTop(items, isUp, scrollTop, scroller.clientHeight, scrollArrowHeight, maxScrollTop);
        }
        timeout.start(40, scrollNextItem);
      }
      timeout.start(40, scrollNextItem);
    },
    onMouseLeave() {
      timeout.clear();
    }
  };
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, scrollArrowRef],
    state,
    props: [defaultProps, elementProps]
  });
  const shouldRender = visible || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return element;
});
if (true)
  SelectScrollArrow.displayName = "SelectScrollArrow";
function getTargetScrollTop(items, isUp, scrollTop, clientHeight, scrollArrowHeight, maxScrollTop) {
  if (isUp) {
    let firstVisibleIndex = 0;
    const visibleTop = scrollTop + scrollArrowHeight - SCROLL_EDGE_TOLERANCE_PX;
    for (let i = 0;i < items.length; i += 1) {
      const item = items[i];
      if (item && item.offsetTop >= visibleTop) {
        firstVisibleIndex = i;
        break;
      }
    }
    const targetIndex2 = Math.max(0, firstVisibleIndex - 1);
    const targetItem2 = items[targetIndex2];
    return targetIndex2 < firstVisibleIndex && targetItem2 ? normalizeScrollOffset(targetItem2.offsetTop - scrollArrowHeight, maxScrollTop) : 0;
  }
  let lastVisibleIndex = items.length - 1;
  const visibleBottom = scrollTop + clientHeight - scrollArrowHeight + SCROLL_EDGE_TOLERANCE_PX;
  for (let i = 0;i < items.length; i += 1) {
    const item = items[i];
    if (item && item.offsetTop + item.offsetHeight > visibleBottom) {
      lastVisibleIndex = Math.max(0, i - 1);
      break;
    }
  }
  const targetIndex = Math.min(items.length - 1, lastVisibleIndex + 1);
  const targetItem = items[targetIndex];
  return targetIndex > lastVisibleIndex && targetItem ? normalizeScrollOffset(targetItem.offsetTop + targetItem.offsetHeight - clientHeight + scrollArrowHeight, maxScrollTop) : maxScrollTop;
}

// node_modules/@base-ui/react/esm/select/scroll-down-arrow/SelectScrollDownArrow.js
import { jsx as _jsx8 } from "react/jsx-runtime";
"use client";
var SelectScrollDownArrow = /* @__PURE__ */ React21.forwardRef(function SelectScrollDownArrow2(props, forwardedRef) {
  return /* @__PURE__ */ _jsx8(SelectScrollArrow, {
    ...props,
    ref: forwardedRef,
    direction: "down"
  });
});
if (true)
  SelectScrollDownArrow.displayName = "SelectScrollDownArrow";
// node_modules/@base-ui/react/esm/select/scroll-up-arrow/SelectScrollUpArrow.js
import * as React22 from "react";
import { jsx as _jsx9 } from "react/jsx-runtime";
"use client";
var SelectScrollUpArrow = /* @__PURE__ */ React22.forwardRef(function SelectScrollUpArrow2(props, forwardedRef) {
  return /* @__PURE__ */ _jsx9(SelectScrollArrow, {
    ...props,
    ref: forwardedRef,
    direction: "up"
  });
});
if (true)
  SelectScrollUpArrow.displayName = "SelectScrollUpArrow";
// node_modules/@base-ui/react/esm/select/group/SelectGroup.js
import * as React24 from "react";

// node_modules/@base-ui/react/esm/select/group/SelectGroupContext.js
import * as React23 from "react";
"use client";
var SelectGroupContext = /* @__PURE__ */ React23.createContext(undefined);
if (true)
  SelectGroupContext.displayName = "SelectGroupContext";
function useSelectGroupContext() {
  const context = React23.useContext(SelectGroupContext);
  if (context === undefined) {
    throw new Error("Base UI: SelectGroupContext is missing. SelectGroup parts must be placed within <Select.Group>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/select/group/SelectGroup.js
import { jsx as _jsx10 } from "react/jsx-runtime";
"use client";
var SelectGroup = /* @__PURE__ */ React24.forwardRef(function SelectGroup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const [labelId, setLabelId] = React24.useState();
  const contextValue = React24.useMemo(() => ({
    labelId,
    setLabelId
  }), [labelId, setLabelId]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: [{
      role: "group",
      "aria-labelledby": labelId
    }, elementProps]
  });
  return /* @__PURE__ */ _jsx10(SelectGroupContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (true)
  SelectGroup.displayName = "SelectGroup";
// node_modules/@base-ui/react/esm/select/group-label/SelectGroupLabel.js
import * as React25 from "react";
"use client";
var SelectGroupLabel = /* @__PURE__ */ React25.forwardRef(function SelectGroupLabel2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    ...elementProps
  } = componentProps;
  const {
    setLabelId
  } = useSelectGroupContext();
  const id = useBaseUiId(idProp);
  useIsoLayoutEffect(() => {
    setLabelId(id);
  }, [id, setLabelId]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
  return element;
});
if (true)
  SelectGroupLabel.displayName = "SelectGroupLabel";
export {
  exports_index_parts as Select
};
