/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  useAriaLabelledBy
} from "./_chunk-vg16xxmb.js";
import {
  useCheckboxGroupContext
} from "./_chunk-8xaqxgck.js";
import {
  useFieldItemContext
} from "./_chunk-7b9dc493.js";
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
  useControlled
} from "./_chunk-9x63vfqj.js";
import {
  useValueChanged
} from "./_chunk-s5pwkz8v.js";
import {
  visuallyHidden,
  visuallyHiddenInput
} from "./_chunk-dan0mva4.js";
import"./_chunk-451nqgsa.js";
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
import"./_chunk-8a9vv8am.js";
import"./_chunk-6ejf1z1r.js";
import {
  useButton
} from "./_chunk-5xmdvndx.js";
import"./_chunk-hm5h9vsk.js";
import"./_chunk-cdgfsr3q.js";
import {
  getWindow
} from "./_chunk-000kmre8.js";
import"./_chunk-cwvtvwc7.js";
import {
  useIsoLayoutEffect
} from "./_chunk-5tze5c8q.js";
import {
  EMPTY_OBJECT,
  NOOP,
  useMergedRefs,
  useRefWithInit,
  useRenderElement
} from "./_chunk-x8xehj6d.js";
import {
  __export,
  mergeProps
} from "./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/checkbox/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  Root: () => CheckboxRoot,
  Indicator: () => CheckboxIndicator
});

// node_modules/@base-ui/react/esm/checkbox/root/CheckboxRoot.js
import * as React3 from "react";

// node_modules/@base-ui/utils/esm/getDefaultFormSubmitter.js
function getDefaultFormSubmitter(form) {
  if (!form) {
    return null;
  }
  for (const candidate of form.elements) {
    const tagName = candidate.tagName;
    if (tagName === "BUTTON" || tagName === "INPUT") {
      const button = candidate;
      if (button.type === "submit") {
        return button;
      }
    }
  }
  return null;
}

// node_modules/@base-ui/react/esm/checkbox/utils/useStateAttributesMapping.js
import * as React from "react";

// node_modules/@base-ui/react/esm/checkbox/root/CheckboxRootDataAttributes.js
var CheckboxRootDataAttributes = /* @__PURE__ */ function(CheckboxRootDataAttributes2) {
  CheckboxRootDataAttributes2["checked"] = "data-checked";
  CheckboxRootDataAttributes2["unchecked"] = "data-unchecked";
  CheckboxRootDataAttributes2["indeterminate"] = "data-indeterminate";
  CheckboxRootDataAttributes2["disabled"] = "data-disabled";
  CheckboxRootDataAttributes2["readonly"] = "data-readonly";
  CheckboxRootDataAttributes2["required"] = "data-required";
  CheckboxRootDataAttributes2["valid"] = "data-valid";
  CheckboxRootDataAttributes2["invalid"] = "data-invalid";
  CheckboxRootDataAttributes2["touched"] = "data-touched";
  CheckboxRootDataAttributes2["dirty"] = "data-dirty";
  CheckboxRootDataAttributes2["filled"] = "data-filled";
  CheckboxRootDataAttributes2["focused"] = "data-focused";
  return CheckboxRootDataAttributes2;
}({});

// node_modules/@base-ui/react/esm/checkbox/utils/useStateAttributesMapping.js
"use client";
function useStateAttributesMapping(state) {
  return React.useMemo(() => ({
    checked(value) {
      if (state.indeterminate) {
        return {};
      }
      if (value) {
        return {
          [CheckboxRootDataAttributes.checked]: ""
        };
      }
      return {
        [CheckboxRootDataAttributes.unchecked]: ""
      };
    },
    ...fieldValidityMapping
  }), [state.indeterminate]);
}

// node_modules/@base-ui/react/esm/checkbox/root/CheckboxRootContext.js
import * as React2 from "react";
"use client";
var CheckboxRootContext = /* @__PURE__ */ React2.createContext(undefined);
if (true)
  CheckboxRootContext.displayName = "CheckboxRootContext";
function useCheckboxRootContext() {
  const context = React2.useContext(CheckboxRootContext);
  if (context === undefined) {
    throw new Error("Base UI: CheckboxRootContext is missing. Checkbox parts must be placed within <Checkbox.Root>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/checkbox/root/CheckboxRoot.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
"use client";
var PARENT_CHECKBOX = "data-parent";
var CheckboxRoot = /* @__PURE__ */ React3.forwardRef(function CheckboxRoot2(componentProps, forwardedRef) {
  const {
    checked: checkedProp,
    className,
    defaultChecked = false,
    "aria-labelledby": ariaLabelledByProp,
    disabled: disabledProp = false,
    form,
    id: idProp,
    indeterminate = false,
    inputRef: inputRefProp,
    name: nameProp,
    onCheckedChange,
    parent = false,
    readOnly = false,
    render,
    required = false,
    uncheckedValue,
    value: valueProp,
    nativeButton = false,
    style,
    ...elementProps
  } = componentProps;
  const {
    clearErrors
  } = useFormContext();
  const {
    disabled: rootDisabled,
    name: fieldName,
    setDirty,
    setFilled,
    setFocused,
    setTouched,
    state: fieldState,
    validationMode,
    validityData,
    shouldValidateOnChange,
    validation: localValidation
  } = useFieldRootContext();
  const fieldItemContext = useFieldItemContext();
  const {
    labelId,
    controlId,
    registerControlId,
    getDescriptionProps
  } = useLabelableContext();
  const groupContext = useCheckboxGroupContext();
  const parentContext = groupContext?.parent;
  const isGroupedWithParent = parentContext && groupContext.allValues;
  const disabled = rootDisabled || fieldItemContext.disabled || groupContext?.disabled || disabledProp;
  const name = fieldName ?? nameProp;
  const value = valueProp ?? name;
  const id = useBaseUiId();
  const parentId = useBaseUiId();
  let inputId = controlId;
  if (isGroupedWithParent) {
    inputId = parent ? parentId : `${parentContext.id}-${value}`;
  } else if (idProp) {
    inputId = idProp;
  }
  let groupProps = {};
  if (isGroupedWithParent) {
    if (parent) {
      groupProps = groupContext.parent.getParentProps();
    } else if (value) {
      groupProps = groupContext.parent.getChildProps(value);
    }
  }
  const {
    checked: groupChecked = checkedProp,
    indeterminate: groupIndeterminate = indeterminate,
    onCheckedChange: groupOnChange,
    ...otherGroupProps
  } = groupProps;
  const groupValue = groupContext?.value;
  const setGroupValue = groupContext?.setValue;
  const defaultGroupValue = groupContext?.defaultValue;
  const controlRef = React3.useRef(null);
  const controlSourceRef = useRefWithInit(() => Symbol("checkbox-control"));
  const hasRegisteredRef = React3.useRef(false);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const validation = groupContext?.validation ?? localValidation;
  const [checked, setCheckedState] = useControlled({
    controlled: value && groupValue && !parent ? groupValue.includes(value) : groupChecked,
    default: value && defaultGroupValue && !parent ? defaultGroupValue.includes(value) : defaultChecked,
    name: "Checkbox",
    state: "checked"
  });
  useIsoLayoutEffect(() => {
    if (registerControlId === NOOP) {
      return;
    }
    hasRegisteredRef.current = true;
    registerControlId(controlSourceRef.current, inputId);
    return;
  }, [inputId, registerControlId, controlSourceRef]);
  React3.useEffect(() => {
    const controlSource = controlSourceRef.current;
    return () => {
      if (!hasRegisteredRef.current || registerControlId === NOOP) {
        return;
      }
      hasRegisteredRef.current = false;
      registerControlId(controlSource, undefined);
    };
  }, [registerControlId, controlSourceRef]);
  useRegisterFieldControl(controlRef, id, checked, undefined, !groupContext);
  const inputRef = React3.useRef(null);
  const mergedInputRef = useMergedRefs(inputRefProp, inputRef, validation.inputRef);
  const ariaLabelledBy = useAriaLabelledBy(ariaLabelledByProp, labelId, inputRef, !nativeButton, inputId ?? undefined);
  useIsoLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = groupIndeterminate;
      if (checked) {
        setFilled(true);
      }
    }
  }, [checked, groupIndeterminate, setFilled]);
  useValueChanged(checked, () => {
    if (groupContext && !parent) {
      return;
    }
    clearErrors(name);
    setFilled(checked);
    setDirty(checked !== validityData.initialValue);
    if (shouldValidateOnChange()) {
      validation.commit(checked);
    } else {
      validation.commit(checked, true);
    }
  });
  const inputProps = mergeProps({
    checked,
    disabled,
    form,
    name: parent ? undefined : name,
    id: nativeButton ? undefined : inputId ?? undefined,
    required,
    ref: mergedInputRef,
    style: name ? visuallyHiddenInput : visuallyHidden,
    tabIndex: -1,
    type: "checkbox",
    "aria-hidden": true,
    onChange(event) {
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      if (readOnly) {
        event.preventDefault();
        return;
      }
      const nextChecked = event.currentTarget.checked;
      const details = createChangeEventDetails(exports_reason_parts.none, event.nativeEvent);
      groupOnChange?.(nextChecked, details);
      onCheckedChange?.(nextChecked, details);
      if (details.isCanceled) {
        return;
      }
      setCheckedState(nextChecked);
      if (value && groupValue && setGroupValue && !parent && !isGroupedWithParent) {
        const nextGroupValue = nextChecked ? [...groupValue, value] : groupValue.filter((item) => item !== value);
        setGroupValue(nextGroupValue, details);
      }
    },
    onFocus() {
      controlRef.current?.focus();
    }
  }, valueProp !== undefined ? {
    value: (groupContext ? checked && valueProp : valueProp) || ""
  } : EMPTY_OBJECT, getDescriptionProps, groupContext ? validation.getValidationProps : validation.getInputValidationProps);
  const computedChecked = isGroupedWithParent ? Boolean(groupChecked) : checked;
  const computedIndeterminate = isGroupedWithParent ? groupIndeterminate || indeterminate : indeterminate;
  React3.useEffect(() => {
    if (!parentContext || !value) {
      return;
    }
    const disabledStates = parentContext.disabledStatesRef.current;
    disabledStates.set(value, disabled);
    return () => {
      disabledStates.delete(value);
    };
  }, [parentContext, disabled, value]);
  const state = React3.useMemo(() => ({
    ...fieldState,
    checked: computedChecked,
    disabled,
    readOnly,
    required,
    indeterminate: computedIndeterminate
  }), [fieldState, computedChecked, disabled, readOnly, required, computedIndeterminate]);
  const stateAttributesMapping = useStateAttributesMapping(state);
  const element = useRenderElement("span", componentProps, {
    state,
    ref: [buttonRef, controlRef, forwardedRef, groupContext?.registerControlRef],
    props: [{
      id: nativeButton ? inputId ?? undefined : id,
      role: "checkbox",
      "aria-checked": groupIndeterminate ? "mixed" : checked,
      "aria-readonly": readOnly || undefined,
      "aria-required": required || undefined,
      "aria-labelledby": ariaLabelledBy,
      [PARENT_CHECKBOX]: parent ? "" : undefined,
      onFocus() {
        setFocused(true);
      },
      onBlur() {
        const inputEl = inputRef.current;
        if (!inputEl) {
          return;
        }
        setTouched(true);
        setFocused(false);
        if (validationMode === "onBlur") {
          validation.commit(groupContext ? groupValue : inputEl.checked);
        }
      },
      onKeyDown(event) {
        if (event.key !== "Enter") {
          return;
        }
        event.preventBaseUIHandler();
        if (event.defaultPrevented) {
          return;
        }
        const formToSubmit = inputRef.current?.form ?? null;
        const currentTarget = event.currentTarget;
        const nativeEvent = event.nativeEvent;
        const originalPreventDefault = event.preventDefault;
        const originalNativePreventDefault = nativeEvent.preventDefault;
        let preventDefaultCalledAfterPropagation = false;
        event.preventDefault = () => {
          preventDefaultCalledAfterPropagation = true;
          originalPreventDefault.call(event);
        };
        nativeEvent.preventDefault = () => {
          preventDefaultCalledAfterPropagation = true;
          originalNativePreventDefault.call(nativeEvent);
        };
        originalNativePreventDefault.call(nativeEvent);
        getWindow(currentTarget).queueMicrotask(() => {
          event.preventDefault = originalPreventDefault;
          nativeEvent.preventDefault = originalNativePreventDefault;
          if (!preventDefaultCalledAfterPropagation) {
            getDefaultFormSubmitter(formToSubmit)?.click();
          }
        });
      },
      onClick(event) {
        if (readOnly || disabled) {
          return;
        }
        event.preventDefault();
        const input = inputRef.current;
        if (!input) {
          return;
        }
        input.dispatchEvent(new (getWindow(input)).PointerEvent("click", {
          bubbles: true,
          shiftKey: event.shiftKey,
          ctrlKey: event.ctrlKey,
          altKey: event.altKey,
          metaKey: event.metaKey
        }));
      }
    }, getDescriptionProps, validation.getValidationProps, elementProps, otherGroupProps, getButtonProps],
    stateAttributesMapping
  });
  return /* @__PURE__ */ _jsxs(CheckboxRootContext.Provider, {
    value: state,
    children: [element, !checked && !groupContext && name && !parent && uncheckedValue !== undefined && /* @__PURE__ */ _jsx("input", {
      type: "hidden",
      form,
      name,
      value: uncheckedValue
    }), /* @__PURE__ */ _jsx("input", {
      ...inputProps,
      suppressHydrationWarning: true
    })]
  });
});
if (true)
  CheckboxRoot.displayName = "CheckboxRoot";
// node_modules/@base-ui/react/esm/checkbox/indicator/CheckboxIndicator.js
import * as React4 from "react";
"use client";
var CheckboxIndicator = /* @__PURE__ */ React4.forwardRef(function CheckboxIndicator2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    keepMounted = false,
    ...elementProps
  } = componentProps;
  const rootState = useCheckboxRootContext();
  const rendered = rootState.checked || rootState.indeterminate;
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(rendered);
  const indicatorRef = React4.useRef(null);
  const state = {
    ...rootState,
    transitionStatus
  };
  useOpenChangeComplete({
    open: rendered,
    ref: indicatorRef,
    onComplete() {
      if (!rendered) {
        setMounted(false);
      }
    }
  });
  const baseStateAttributesMapping = useStateAttributesMapping(rootState);
  const stateAttributesMapping = {
    ...baseStateAttributesMapping,
    ...transitionStatusMapping,
    ...fieldValidityMapping
  };
  const shouldRender = keepMounted || mounted;
  const element = useRenderElement("span", componentProps, {
    ref: [forwardedRef, indicatorRef],
    state,
    stateAttributesMapping,
    props: elementProps
  });
  if (!shouldRender) {
    return null;
  }
  return element;
});
if (true)
  CheckboxIndicator.displayName = "CheckboxIndicator";
export {
  exports_index_parts as Checkbox
};
