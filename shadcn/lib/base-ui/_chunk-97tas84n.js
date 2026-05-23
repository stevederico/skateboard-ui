import {
  useFieldRootContext
} from "./_chunk-kfz96xv1.js";
import {
  useIsoLayoutEffect
} from "./_chunk-b40erthe.js";
import {
  NOOP
} from "./_chunk-1s41sngz.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/internals/field-register-control/useRegisterFieldControl.js
import * as React from "react";
"use client";
function useRegisterFieldControl(controlRef, params) {
  const {
    enabled = true,
    getValue,
    id,
    value
  } = params;
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
    registerFieldControl(source, {
      controlRef,
      getValue,
      id,
      value
    });
    return () => {
      registerFieldControl(source, undefined);
    };
  }, [controlRef, enabled, getValue, id, registerFieldControl, value]);
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/internals/form-context/FormContext.js
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
