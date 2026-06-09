/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  useFieldsetRootContext
} from "./_chunk-c2bz952e.js";
import {
  useLabel
} from "./_chunk-ghn1tzt8.js";
import {
  useLabelableId
} from "./_chunk-23rx7haq.js";
import"./_chunk-vgkfmtbe.js";
import {
  useCheckboxGroupContext
} from "./_chunk-8xaqxgck.js";
import {
  FieldItemContext
} from "./_chunk-7b9dc493.js";
import {
  useFormContext,
  useRegisterFieldControl
} from "./_chunk-95tf2rxq.js";
import {
  DEFAULT_VALIDITY_STATE,
  FieldRootContext,
  LabelableContext,
  fieldValidityMapping,
  useFieldRootContext,
  useLabelableContext
} from "./_chunk-8ctgmf06.js";
import"./_chunk-dzvjwv25.js";
import {
  useControlled
} from "./_chunk-9x63vfqj.js";
import {
  activeElement
} from "./_chunk-cgptgywc.js";
import"./_chunk-rrh8rt4v.js";
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
  error
} from "./_chunk-hm5h9vsk.js";
import"./_chunk-000kmre8.js";
import {
  useStableCallback
} from "./_chunk-cwvtvwc7.js";
import {
  SafeReact,
  useIsoLayoutEffect
} from "./_chunk-5tze5c8q.js";
import {
  EMPTY_OBJECT,
  useRefWithInit,
  useRenderElement
} from "./_chunk-x8xehj6d.js";
import {
  __export,
  mergeProps
} from "./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/input/Input.js
import * as React11 from "react";

// node_modules/@base-ui/react/esm/field/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  Validity: () => FieldValidity,
  Root: () => FieldRoot,
  Label: () => FieldLabel,
  Item: () => FieldItem,
  Error: () => FieldError,
  Description: () => FieldDescription,
  Control: () => FieldControl
});

// node_modules/@base-ui/react/esm/field/root/FieldRoot.js
import * as React4 from "react";

// node_modules/@base-ui/react/esm/internals/labelable-provider/LabelableProvider.js
import * as React from "react";
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
var LabelableProvider = function LabelableProvider2(props) {
  const defaultId = useBaseUiId();
  const initialControlId = props.controlId === undefined ? defaultId : props.controlId;
  const [controlId, setControlIdState] = React.useState(initialControlId);
  const [labelId, setLabelId] = React.useState(props.labelId);
  const [messageIds, setMessageIds] = React.useState([]);
  const registrationsRef = useRefWithInit(() => new Map);
  const {
    messageIds: parentMessageIds
  } = useLabelableContext();
  const registerControlId = useStableCallback((source, nextId) => {
    const registrations = registrationsRef.current;
    if (nextId === undefined) {
      registrations.delete(source);
      return;
    }
    registrations.set(source, nextId);
    setControlIdState((prev) => {
      if (registrations.size === 0) {
        return;
      }
      let nextControlId;
      for (const id of registrations.values()) {
        if (prev !== undefined && id === prev) {
          return prev;
        }
        if (nextControlId === undefined) {
          nextControlId = id;
        }
      }
      return nextControlId;
    });
  });
  const getDescriptionProps = React.useCallback((externalProps) => {
    return mergeProps({
      "aria-describedby": parentMessageIds.concat(messageIds).join(" ") || undefined
    }, externalProps);
  }, [parentMessageIds, messageIds]);
  const contextValue = React.useMemo(() => ({
    controlId,
    registerControlId,
    labelId,
    setLabelId,
    messageIds,
    setMessageIds,
    getDescriptionProps
  }), [controlId, registerControlId, labelId, setLabelId, messageIds, setMessageIds, getDescriptionProps]);
  return /* @__PURE__ */ _jsx(LabelableContext.Provider, {
    value: contextValue,
    children: props.children
  });
};
if (true)
  LabelableProvider.displayName = "LabelableProvider";

// node_modules/@base-ui/react/esm/field/root/useFieldValidation.js
import * as React2 from "react";

// node_modules/@base-ui/react/esm/field/utils/getCombinedFieldValidityData.js
function getCombinedFieldValidityData(validityData, invalid) {
  return {
    ...validityData,
    state: {
      ...validityData.state,
      valid: !invalid && validityData.state.valid
    }
  };
}

// node_modules/@base-ui/react/esm/field/root/useFieldValidation.js
"use client";
var validityKeys = Object.keys(DEFAULT_VALIDITY_STATE);
function isOnlyValueMissing(state) {
  if (!state || state.valid || !state.valueMissing) {
    return false;
  }
  let onlyValueMissing = false;
  for (const key of validityKeys) {
    if (key === "valid") {
      continue;
    }
    if (key === "valueMissing") {
      onlyValueMissing = state[key];
    }
    if (state[key]) {
      onlyValueMissing = false;
    }
  }
  return onlyValueMissing;
}
function useFieldValidation(params) {
  const {
    formRef,
    clearErrors
  } = useFormContext();
  const {
    setValidityData,
    validate,
    validityData,
    validationDebounceTime,
    invalid,
    markedDirtyRef,
    state,
    name,
    shouldValidateOnChange,
    getRegisteredFieldId
  } = params;
  const {
    controlId,
    getDescriptionProps
  } = useLabelableContext();
  const timeout = useTimeout();
  const inputRef = React2.useRef(null);
  const commit = useStableCallback(async (value, revalidate = false) => {
    const element = inputRef.current;
    if (!element) {
      return;
    }
    function updateRegisteredFieldValidity(nextValidityData2, externalInvalid = invalid) {
      const fieldId = getRegisteredFieldId() ?? controlId;
      if (fieldId == null) {
        return;
      }
      const currentFieldData = formRef.current.fields.get(fieldId);
      if (!currentFieldData) {
        return;
      }
      const validityDataWithFormErrors = getCombinedFieldValidityData(nextValidityData2, externalInvalid);
      formRef.current.fields.set(fieldId, {
        ...currentFieldData,
        validityData: validityDataWithFormErrors
      });
    }
    if (revalidate) {
      if (state.valid !== false) {
        return;
      }
      const currentNativeValidity = element.validity;
      if (!currentNativeValidity.valueMissing) {
        const nextValidityData2 = {
          value,
          state: {
            ...DEFAULT_VALIDITY_STATE,
            valid: true
          },
          error: "",
          errors: [],
          initialValue: validityData.initialValue
        };
        element.setCustomValidity("");
        updateRegisteredFieldValidity(nextValidityData2, false);
        setValidityData(nextValidityData2);
        return;
      }
      const currentNativeValidityObject = validityKeys.reduce((acc, key) => {
        acc[key] = currentNativeValidity[key];
        return acc;
      }, {});
      if (!currentNativeValidityObject.valid && !isOnlyValueMissing(currentNativeValidityObject)) {
        return;
      }
    }
    function getState(el) {
      const computedState = validityKeys.reduce((acc, key) => {
        acc[key] = el.validity[key];
        return acc;
      }, {});
      let hasOnlyValueMissingError = false;
      for (const key of validityKeys) {
        if (key === "valid") {
          continue;
        }
        if (key === "valueMissing" && computedState[key]) {
          hasOnlyValueMissingError = true;
        } else if (computedState[key]) {
          return computedState;
        }
      }
      if (hasOnlyValueMissingError && !markedDirtyRef.current) {
        computedState.valid = true;
        computedState.valueMissing = false;
      }
      return computedState;
    }
    timeout.clear();
    let result = null;
    let validationErrors = [];
    const nextState = getState(element);
    let defaultValidationMessage;
    const validateOnChange = shouldValidateOnChange();
    if (element.validationMessage && !validateOnChange) {
      defaultValidationMessage = element.validationMessage;
      validationErrors = [element.validationMessage];
    } else {
      const formValues = Array.from(formRef.current.fields.values()).reduce((acc, field) => {
        if (field.name) {
          acc[field.name] = field.getValue();
        }
        return acc;
      }, {});
      const resultOrPromise = validate(value, formValues);
      if (typeof resultOrPromise === "object" && resultOrPromise !== null && "then" in resultOrPromise) {
        result = await resultOrPromise;
      } else {
        result = resultOrPromise;
      }
      if (result !== null) {
        nextState.valid = false;
        nextState.customError = true;
        if (Array.isArray(result)) {
          validationErrors = result;
          element.setCustomValidity(result.join(`
`));
        } else if (result) {
          validationErrors = [result];
          element.setCustomValidity(result);
        }
      } else if (validateOnChange) {
        element.setCustomValidity("");
        nextState.customError = false;
        if (element.validationMessage) {
          defaultValidationMessage = element.validationMessage;
          validationErrors = [element.validationMessage];
        } else if (element.validity.valid && !nextState.valid) {
          nextState.valid = true;
        }
      }
    }
    const nextValidityData = {
      value,
      state: nextState,
      error: defaultValidationMessage ?? (Array.isArray(result) ? result[0] : result ?? ""),
      errors: validationErrors,
      initialValue: validityData.initialValue
    };
    updateRegisteredFieldValidity(nextValidityData);
    setValidityData(nextValidityData);
  });
  const getValidationProps = React2.useCallback((externalProps = {}) => mergeProps(getDescriptionProps, state.valid === false ? {
    "aria-invalid": true
  } : EMPTY_OBJECT, externalProps), [getDescriptionProps, state.valid]);
  const getInputValidationProps = React2.useCallback((externalProps = {}) => mergeProps({
    onChange(event) {
      if (event.nativeEvent.defaultPrevented) {
        return;
      }
      clearErrors(name);
      if (!shouldValidateOnChange()) {
        commit(event.currentTarget.value, true);
        return;
      }
      const element = event.currentTarget;
      if (element.value === "") {
        commit(element.value);
        return;
      }
      timeout.clear();
      if (validationDebounceTime) {
        timeout.start(validationDebounceTime, () => {
          commit(element.value);
        });
      } else {
        commit(element.value);
      }
    }
  }, getValidationProps(externalProps)), [getValidationProps, clearErrors, name, timeout, commit, validationDebounceTime, shouldValidateOnChange]);
  return React2.useMemo(() => ({
    getValidationProps,
    getInputValidationProps,
    inputRef,
    commit
  }), [getValidationProps, getInputValidationProps, commit]);
}

// node_modules/@base-ui/react/esm/internals/field-register-control/useFieldControlRegistration.js
import * as React3 from "react";
"use client";
function useFieldControlRegistration(params) {
  const {
    commit,
    invalid,
    markedDirtyRef,
    name,
    setRegisteredFieldId,
    setValidityData,
    validityData
  } = params;
  const {
    formRef
  } = useFormContext();
  const activeFieldControlSourceRef = React3.useRef(null);
  const registrationRef = React3.useRef(null);
  const fallbackControlRef = React3.useRef(null);
  const getValueForForm = useStableCallback(() => {
    const registration = registrationRef.current;
    if (!registration) {
      return;
    }
    if (registration.getValue) {
      return registration.getValue();
    }
    return registration.value;
  });
  const validate = useStableCallback(() => {
    const registration = registrationRef.current;
    if (!registration) {
      return;
    }
    let nextValue = registration.value;
    if (nextValue === undefined) {
      nextValue = getValueForForm();
    }
    markedDirtyRef.current = true;
    commit(nextValue);
  });
  function refreshRegistration() {
    const registration = registrationRef.current;
    if (!registration || !registration.id) {
      return;
    }
    formRef.current.fields.set(registration.id, {
      getValue: getValueForForm,
      name,
      controlRef: registration.controlRef ?? fallbackControlRef,
      validityData: getCombinedFieldValidityData(validityData, invalid),
      validate
    });
  }
  function deleteRegistration(id = registrationRef.current?.id) {
    if (id) {
      formRef.current.fields.delete(id);
    }
  }
  function syncInitialValue() {
    const registration = registrationRef.current;
    if (!registration) {
      return;
    }
    let initialValue = registration.value;
    if (initialValue === undefined) {
      initialValue = getValueForForm();
    }
    if (validityData.initialValue === null && initialValue !== null) {
      setValidityData((prev) => ({
        ...prev,
        initialValue
      }));
    }
  }
  useIsoLayoutEffect(() => {
    const registration = registrationRef.current;
    if (!registration || !registration.id) {
      return;
    }
    formRef.current.fields.set(registration.id, {
      getValue: getValueForForm,
      name,
      controlRef: registration.controlRef ?? fallbackControlRef,
      validityData: getCombinedFieldValidityData(validityData, invalid),
      validate
    });
  }, [formRef, getValueForForm, invalid, name, validate, validityData]);
  useIsoLayoutEffect(() => {
    const fields = formRef.current.fields;
    return () => {
      const id = registrationRef.current?.id;
      if (id) {
        fields.delete(id);
      }
    };
  }, [formRef]);
  return useStableCallback((source, registration) => {
    if (!registration) {
      if (activeFieldControlSourceRef.current === source) {
        activeFieldControlSourceRef.current = null;
        deleteRegistration();
        registrationRef.current = null;
        setRegisteredFieldId(undefined);
      }
      return;
    }
    const previousId = registrationRef.current?.id;
    activeFieldControlSourceRef.current = source;
    registrationRef.current = registration;
    setRegisteredFieldId(registration.id);
    if (previousId && previousId !== registration.id) {
      deleteRegistration(previousId);
    }
    syncInitialValue();
    refreshRegistration();
  });
}

// node_modules/@base-ui/react/esm/field/root/FieldRoot.js
import { jsx as _jsx2 } from "react/jsx-runtime";
"use client";
var FieldRootInner = /* @__PURE__ */ React4.forwardRef(function FieldRootInner2(componentProps, forwardedRef) {
  const {
    errors,
    validationMode: formValidationMode,
    submitAttemptedRef
  } = useFormContext();
  const {
    render,
    className,
    validate: validateProp,
    validationDebounceTime = 0,
    validationMode = formValidationMode,
    name,
    disabled: disabledProp = false,
    invalid: invalidProp,
    dirty: dirtyProp,
    touched: touchedProp,
    actionsRef,
    style,
    ...elementProps
  } = componentProps;
  const {
    disabled: disabledFieldset
  } = useFieldsetRootContext();
  const validate = useStableCallback(validateProp || (() => null));
  const disabled = disabledFieldset || disabledProp;
  const [touchedState, setTouchedUnwrapped] = React4.useState(false);
  const [dirtyState, setDirtyUnwrapped] = React4.useState(false);
  const [filled, setFilled] = React4.useState(false);
  const [focused, setFocused] = React4.useState(false);
  const dirty = dirtyProp ?? dirtyState;
  const touched = touchedProp ?? touchedState;
  const markedDirtyRef = React4.useRef(false);
  const registeredFieldIdRef = React4.useRef(undefined);
  const getRegisteredFieldId = React4.useCallback(() => registeredFieldIdRef.current, []);
  const setRegisteredFieldId = React4.useCallback((id) => {
    registeredFieldIdRef.current = id;
  }, []);
  const setDirty = useStableCallback((value) => {
    if (dirtyProp !== undefined) {
      return;
    }
    if (value) {
      markedDirtyRef.current = true;
    }
    setDirtyUnwrapped(value);
  });
  const setTouched = useStableCallback((value) => {
    if (touchedProp !== undefined) {
      return;
    }
    setTouchedUnwrapped(value);
  });
  const shouldValidateOnChange = useStableCallback(() => validationMode === "onChange" || validationMode === "onSubmit" && submitAttemptedRef.current);
  const hasFormError = !!name && Object.hasOwn(errors, name) && errors[name] !== undefined;
  const invalid = invalidProp === true || hasFormError;
  const [validityData, setValidityData] = React4.useState({
    state: DEFAULT_VALIDITY_STATE,
    error: "",
    errors: [],
    value: null,
    initialValue: null
  });
  const valid = !invalid && validityData.state.valid;
  const state = React4.useMemo(() => ({
    disabled,
    touched,
    dirty,
    valid,
    filled,
    focused
  }), [disabled, touched, dirty, valid, filled, focused]);
  const validation = useFieldValidation({
    setValidityData,
    validate,
    validityData,
    validationDebounceTime,
    invalid,
    markedDirtyRef,
    state,
    name,
    shouldValidateOnChange,
    getRegisteredFieldId
  });
  const validityValue = validityData.value;
  const handleImperativeValidate = React4.useCallback(() => {
    markedDirtyRef.current = true;
    validation.commit(validityValue);
  }, [validation, validityValue]);
  const registerFieldControl = useFieldControlRegistration({
    commit: validation.commit,
    invalid,
    markedDirtyRef,
    name,
    setRegisteredFieldId,
    setValidityData,
    validityData
  });
  React4.useImperativeHandle(actionsRef, () => ({
    validate: handleImperativeValidate
  }), [handleImperativeValidate]);
  const contextValue = React4.useMemo(() => ({
    invalid,
    name,
    validityData,
    setValidityData,
    disabled,
    touched,
    setTouched,
    dirty,
    setDirty,
    filled,
    setFilled,
    focused,
    setFocused,
    validate,
    validationMode,
    validationDebounceTime,
    shouldValidateOnChange,
    state,
    markedDirtyRef,
    registerFieldControl,
    validation
  }), [invalid, name, validityData, disabled, touched, setTouched, dirty, setDirty, filled, setFilled, focused, setFocused, validate, validationMode, validationDebounceTime, shouldValidateOnChange, state, registerFieldControl, validation]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    state,
    props: elementProps,
    stateAttributesMapping: fieldValidityMapping
  });
  return /* @__PURE__ */ _jsx2(FieldRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (true)
  FieldRootInner.displayName = "FieldRootInner";
var FieldRoot = /* @__PURE__ */ React4.forwardRef(function FieldRoot2(componentProps, forwardedRef) {
  return /* @__PURE__ */ _jsx2(LabelableProvider, {
    children: /* @__PURE__ */ _jsx2(FieldRootInner, {
      ...componentProps,
      ref: forwardedRef
    })
  });
});
if (true)
  FieldRoot.displayName = "FieldRoot";
// node_modules/@base-ui/react/esm/field/label/FieldLabel.js
import * as React5 from "react";
"use client";
var FieldLabel = /* @__PURE__ */ React5.forwardRef(function FieldLabel2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    nativeLabel = true,
    ...elementProps
  } = componentProps;
  const fieldRootContext = useFieldRootContext(false);
  const {
    labelId
  } = useLabelableContext();
  const labelRef = React5.useRef(null);
  const labelProps = useLabel({
    id: labelId ?? idProp,
    native: nativeLabel
  });
  if (true) {
    React5.useEffect(() => {
      if (!labelRef.current) {
        return;
      }
      const isLabelTag = labelRef.current.tagName === "LABEL";
      if (nativeLabel) {
        if (!isLabelTag) {
          const ownerStackMessage = SafeReact.captureOwnerStack?.() || "";
          const message = "<Field.Label> expected a <label> element because the `nativeLabel` prop is true. " + "Rendering a non-<label> disables native label association, so `htmlFor` will not " + "work. Use a real <label> in the `render` prop, or set `nativeLabel` to `false`.";
          error(`${message}${ownerStackMessage}`);
        }
      } else if (isLabelTag) {
        const ownerStackMessage = SafeReact.captureOwnerStack?.() || "";
        const message = "<Field.Label> expected a non-<label> element because the `nativeLabel` prop is false. " + "Rendering a <label> assumes native label behavior while Base UI treats it as " + "non-native, which can cause unexpected pointer behavior. Use a non-<label> in the " + "`render` prop, or set `nativeLabel` to `true`.";
        error(`${message}${ownerStackMessage}`);
      }
    }, [nativeLabel]);
  }
  const element = useRenderElement("label", componentProps, {
    ref: [forwardedRef, labelRef],
    state: fieldRootContext.state,
    props: [labelProps, elementProps],
    stateAttributesMapping: fieldValidityMapping
  });
  return element;
});
if (true)
  FieldLabel.displayName = "FieldLabel";
// node_modules/@base-ui/react/esm/field/error/FieldError.js
import * as React6 from "react";
import { jsx as _jsx3 } from "react/jsx-runtime";
"use client";
var stateAttributesMapping = {
  ...fieldValidityMapping,
  ...transitionStatusMapping
};
var FieldError = /* @__PURE__ */ React6.forwardRef(function FieldError2(componentProps, forwardedRef) {
  const {
    render,
    id: idProp,
    className,
    match,
    style,
    ...elementProps
  } = componentProps;
  const id = useBaseUiId(idProp);
  const {
    validityData,
    state: fieldState,
    name
  } = useFieldRootContext(false);
  const {
    setMessageIds
  } = useLabelableContext();
  const {
    errors
  } = useFormContext();
  const formError = name ? errors[name] : null;
  const hasSpecificMatch = typeof match === "string";
  let rendered = false;
  if (match === true) {
    rendered = true;
  } else if (hasSpecificMatch) {
    rendered = Boolean(validityData.state[match]);
  } else {
    rendered = Boolean(formError) || validityData.state.valid === false;
  }
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(rendered);
  useIsoLayoutEffect(() => {
    if (!rendered || !id) {
      return;
    }
    setMessageIds((v) => v.concat(id));
    return () => {
      setMessageIds((v) => v.filter((item) => item !== id));
    };
  }, [rendered, id, setMessageIds]);
  const errorRef = React6.useRef(null);
  const [lastRenderedMessage, setLastRenderedMessage] = React6.useState(null);
  const [lastRenderedMessageKey, setLastRenderedMessageKey] = React6.useState(null);
  const clientErrorMessage = validityData.errors.length > 1 ? /* @__PURE__ */ _jsx3("ul", {
    children: validityData.errors.map((message) => /* @__PURE__ */ _jsx3("li", {
      children: message
    }, message))
  }) : validityData.error;
  const errorMessage = hasSpecificMatch ? clientErrorMessage : formError || clientErrorMessage;
  let errorKey = validityData.error;
  if (formError != null) {
    errorKey = Array.isArray(formError) ? JSON.stringify(formError) : formError;
  } else if (validityData.errors.length > 1) {
    errorKey = JSON.stringify(validityData.errors);
  }
  if (rendered && errorKey !== lastRenderedMessageKey) {
    setLastRenderedMessageKey(errorKey);
    setLastRenderedMessage(errorMessage);
  }
  useOpenChangeComplete({
    open: rendered,
    ref: errorRef,
    onComplete() {
      if (!rendered) {
        setMounted(false);
      }
    }
  });
  const state = {
    ...fieldState,
    transitionStatus
  };
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, errorRef],
    state,
    props: [{
      id,
      children: rendered ? errorMessage : lastRenderedMessage
    }, elementProps],
    stateAttributesMapping,
    enabled: mounted
  });
  if (!mounted) {
    return null;
  }
  return element;
});
if (true)
  FieldError.displayName = "FieldError";
// node_modules/@base-ui/react/esm/field/description/FieldDescription.js
import * as React7 from "react";
"use client";
var FieldDescription = /* @__PURE__ */ React7.forwardRef(function FieldDescription2(componentProps, forwardedRef) {
  const {
    render,
    id: idProp,
    className,
    style,
    ...elementProps
  } = componentProps;
  const id = useBaseUiId(idProp);
  const fieldRootContext = useFieldRootContext(false);
  const {
    setMessageIds
  } = useLabelableContext();
  useIsoLayoutEffect(() => {
    if (!id) {
      return;
    }
    setMessageIds((v) => v.concat(id));
    return () => {
      setMessageIds((v) => v.filter((item) => item !== id));
    };
  }, [id, setMessageIds]);
  const element = useRenderElement("p", componentProps, {
    ref: forwardedRef,
    state: fieldRootContext.state,
    props: [{
      id
    }, elementProps],
    stateAttributesMapping: fieldValidityMapping
  });
  return element;
});
if (true)
  FieldDescription.displayName = "FieldDescription";
// node_modules/@base-ui/react/esm/field/control/FieldControl.js
import * as React8 from "react";
"use client";
var FieldControl = /* @__PURE__ */ React8.forwardRef(function FieldControl2(componentProps, forwardedRef) {
  const {
    render,
    className,
    id: idProp,
    name: nameProp,
    value: valueProp,
    disabled: disabledProp = false,
    onValueChange,
    defaultValue,
    autoFocus = false,
    style,
    ...elementProps
  } = componentProps;
  const {
    state: fieldState,
    name: fieldName,
    disabled: fieldDisabled,
    setTouched,
    setDirty,
    validityData,
    setFocused,
    setFilled,
    validationMode,
    validation
  } = useFieldRootContext();
  const disabled = fieldDisabled || disabledProp;
  const name = fieldName ?? nameProp;
  const state = {
    ...fieldState,
    disabled
  };
  const {
    labelId
  } = useLabelableContext();
  const id = useLabelableId({
    id: idProp
  });
  useIsoLayoutEffect(() => {
    const hasExternalValue = valueProp != null;
    if (validation.inputRef.current?.value || hasExternalValue && valueProp !== "") {
      setFilled(true);
    } else if (hasExternalValue && valueProp === "") {
      setFilled(false);
    }
  }, [validation.inputRef, setFilled, valueProp]);
  const inputRef = React8.useRef(null);
  useIsoLayoutEffect(() => {
    if (autoFocus && inputRef.current === activeElement(ownerDocument(inputRef.current))) {
      setFocused(true);
    }
  }, [autoFocus, setFocused]);
  const [valueUnwrapped] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "FieldControl",
    state: "value"
  });
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueUnwrapped : undefined;
  const getValueFromInput = useStableCallback(() => validation.inputRef.current?.value);
  useRegisterFieldControl(validation.inputRef, id, value, getValueFromInput);
  const element = useRenderElement("input", componentProps, {
    ref: [forwardedRef, inputRef],
    state,
    props: [{
      id,
      disabled,
      name,
      ref: validation.inputRef,
      "aria-labelledby": labelId,
      autoFocus,
      ...isControlled ? {
        value
      } : {
        defaultValue
      },
      onChange(event) {
        const inputValue = event.currentTarget.value;
        onValueChange?.(inputValue, createChangeEventDetails(exports_reason_parts.none, event.nativeEvent));
        setDirty(inputValue !== validityData.initialValue);
        setFilled(inputValue !== "");
      },
      onFocus() {
        setFocused(true);
      },
      onBlur(event) {
        setTouched(true);
        setFocused(false);
        if (validationMode === "onBlur") {
          validation.commit(event.currentTarget.value);
        }
      },
      onKeyDown(event) {
        if (event.currentTarget.tagName === "INPUT" && event.key === "Enter") {
          setTouched(true);
          validation.commit(event.currentTarget.value);
        }
      }
    }, validation.getInputValidationProps(), elementProps],
    stateAttributesMapping: fieldValidityMapping
  });
  return element;
});
if (true)
  FieldControl.displayName = "FieldControl";
// node_modules/@base-ui/react/esm/field/validity/FieldValidity.js
import * as React9 from "react";
import { jsx as _jsx4 } from "react/jsx-runtime";
"use client";
var FieldValidity = function FieldValidity2(props) {
  const {
    children
  } = props;
  const {
    validityData,
    invalid
  } = useFieldRootContext(false);
  const combinedFieldValidityData = React9.useMemo(() => getCombinedFieldValidityData(validityData, invalid), [validityData, invalid]);
  const isInvalid = combinedFieldValidityData.state.valid === false;
  const {
    transitionStatus
  } = useTransitionStatus(isInvalid);
  const fieldValidityState = React9.useMemo(() => {
    return {
      ...combinedFieldValidityData,
      validity: combinedFieldValidityData.state,
      transitionStatus
    };
  }, [combinedFieldValidityData, transitionStatus]);
  return /* @__PURE__ */ _jsx4(React9.Fragment, {
    children: children(fieldValidityState)
  });
};
if (true)
  FieldValidity.displayName = "FieldValidity";
// node_modules/@base-ui/react/esm/field/item/FieldItem.js
import * as React10 from "react";
import { jsx as _jsx5 } from "react/jsx-runtime";
"use client";
var FieldItem = /* @__PURE__ */ React10.forwardRef(function FieldItem2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    disabled: disabledProp = false,
    ...elementProps
  } = componentProps;
  const {
    state,
    disabled: rootDisabled
  } = useFieldRootContext(false);
  const disabled = rootDisabled || disabledProp;
  const checkboxGroupContext = useCheckboxGroupContext();
  const hasParentCheckbox = checkboxGroupContext?.allValues !== undefined;
  const controlId = hasParentCheckbox ? checkboxGroupContext?.parent.id : undefined;
  const fieldItemContext = React10.useMemo(() => ({
    disabled
  }), [disabled]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    state,
    props: elementProps,
    stateAttributesMapping: fieldValidityMapping
  });
  return /* @__PURE__ */ _jsx5(LabelableProvider, {
    controlId,
    children: /* @__PURE__ */ _jsx5(FieldItemContext.Provider, {
      value: fieldItemContext,
      children: element
    })
  });
});
if (true)
  FieldItem.displayName = "FieldItem";
// node_modules/@base-ui/react/esm/input/Input.js
import { jsx as _jsx6 } from "react/jsx-runtime";
"use client";
var Input = /* @__PURE__ */ React11.forwardRef(function Input2(props, forwardedRef) {
  return /* @__PURE__ */ _jsx6(exports_index_parts.Control, {
    ref: forwardedRef,
    ...props
  });
});
if (true)
  Input.displayName = "Input";
export {
  Input
};
