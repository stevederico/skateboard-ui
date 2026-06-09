import {
  useFieldRootContext
} from "./_chunk-8ctgmf06.js";
import {
  useIsoLayoutEffect
} from "./_chunk-5tze5c8q.js";
import {
  NOOP
} from "./_chunk-x8xehj6d.js";

// node_modules/@base-ui/react/esm/internals/field-register-control/useRegisterFieldControl.js
import * as React from "react";
"use client";
function useRegisterFieldControl(controlRef, id, value, getFormValueOverride, enabled = true) {
  const {
    registerFieldControl
  } = useFieldRootContext();
  const sourceRef = React.useRef(null);
  if (!sourceRef.current) {
    sourceRef.current = Symbol();
  }
  useIsoLayoutEffect(() => {
    const source = sourceRef.current;
    if (!source || !enabled) {
      return;
    }
    const registration = {
      controlRef,
      getValue: getFormValueOverride,
      id,
      value
    };
    registerFieldControl(source, registration);
    return () => {
      registerFieldControl(source, undefined);
    };
  }, [controlRef, enabled, getFormValueOverride, id, registerFieldControl, value]);
}

// node_modules/@base-ui/react/esm/internals/form-context/FormContext.js
import * as React2 from "react";
"use client";
var FormContext = /* @__PURE__ */ React2.createContext({
  formRef: {
    current: {
      fields: new Map
    }
  },
  errors: {},
  clearErrors: NOOP,
  validationMode: "onSubmit",
  submitAttemptedRef: {
    current: false
  }
});
if (true)
  FormContext.displayName = "FormContext";
function useFormContext() {
  return React2.useContext(FormContext);
}

export { useRegisterFieldControl, useFormContext };
