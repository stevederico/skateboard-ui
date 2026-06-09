/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  formatNumberValue,
  valueToPercent
} from "./_chunk-ffpjy0ta.js";
import {
  useRegisteredLabelId
} from "./_chunk-vgkfmtbe.js";
import {
  visuallyHidden
} from "./_chunk-dan0mva4.js";
import {
  useValueAsRef
} from "./_chunk-6kqramh9.js";
import"./_chunk-wdqynnjf.js";
import"./_chunk-5tze5c8q.js";
import {
  useRenderElement
} from "./_chunk-x8xehj6d.js";
import {
  __export
} from "./_chunk-svxv97ph.js";

// node_modules/@base-ui/react/esm/progress/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  Value: () => ProgressValue,
  Track: () => ProgressTrack,
  Root: () => ProgressRoot,
  Label: () => ProgressLabel,
  Indicator: () => ProgressIndicator
});

// node_modules/@base-ui/react/esm/progress/root/ProgressRoot.js
import * as React2 from "react";

// node_modules/@base-ui/react/esm/progress/root/ProgressRootContext.js
import * as React from "react";
"use client";
var ProgressRootContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  ProgressRootContext.displayName = "ProgressRootContext";
function useProgressRootContext() {
  const context = React.useContext(ProgressRootContext);
  if (context === undefined) {
    throw new Error("Base UI: ProgressRootContext is missing. Progress parts must be placed within <Progress.Root>.");
  }
  return context;
}

// node_modules/@base-ui/react/esm/progress/root/ProgressRootDataAttributes.js
var ProgressRootDataAttributes = /* @__PURE__ */ function(ProgressRootDataAttributes2) {
  ProgressRootDataAttributes2["complete"] = "data-complete";
  ProgressRootDataAttributes2["indeterminate"] = "data-indeterminate";
  ProgressRootDataAttributes2["progressing"] = "data-progressing";
  return ProgressRootDataAttributes2;
}({});

// node_modules/@base-ui/react/esm/progress/root/stateAttributesMapping.js
var progressStateAttributesMapping = {
  status(value) {
    if (value === "progressing") {
      return {
        [ProgressRootDataAttributes.progressing]: ""
      };
    }
    if (value === "complete") {
      return {
        [ProgressRootDataAttributes.complete]: ""
      };
    }
    if (value === "indeterminate") {
      return {
        [ProgressRootDataAttributes.indeterminate]: ""
      };
    }
    return null;
  }
};

// node_modules/@base-ui/react/esm/progress/root/ProgressRoot.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
"use client";
function getDefaultAriaValueText(formattedValue, value) {
  if (value == null) {
    return "indeterminate progress";
  }
  return formattedValue || `${value}%`;
}
var ProgressRoot = /* @__PURE__ */ React2.forwardRef(function ProgressRoot2(componentProps, forwardedRef) {
  const {
    format,
    getAriaValueText = getDefaultAriaValueText,
    locale,
    max = 100,
    min = 0,
    value,
    render,
    className,
    children,
    style,
    ...elementProps
  } = componentProps;
  const [labelId, setLabelId] = React2.useState();
  const formatOptionsRef = useValueAsRef(format);
  let status = "indeterminate";
  if (Number.isFinite(value)) {
    status = value === max ? "complete" : "progressing";
  }
  const formattedValue = formatNumberValue(value, locale, formatOptionsRef.current);
  const state = React2.useMemo(() => ({
    status
  }), [status]);
  const defaultProps = {
    "aria-labelledby": labelId,
    "aria-valuemax": max,
    "aria-valuemin": min,
    "aria-valuenow": value ?? undefined,
    "aria-valuetext": getAriaValueText(formattedValue, value),
    role: "progressbar",
    children: /* @__PURE__ */ _jsxs(React2.Fragment, {
      children: [children, /* @__PURE__ */ _jsx("span", {
        role: "presentation",
        style: visuallyHidden,
        children: "x"
      })]
    })
  };
  const contextValue = React2.useMemo(() => ({
    formattedValue,
    max,
    min,
    setLabelId,
    state,
    status,
    value
  }), [formattedValue, max, min, setLabelId, state, status, value]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [defaultProps, elementProps],
    stateAttributesMapping: progressStateAttributesMapping
  });
  return /* @__PURE__ */ _jsx(ProgressRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (true)
  ProgressRoot.displayName = "ProgressRoot";
// node_modules/@base-ui/react/esm/progress/track/ProgressTrack.js
import * as React3 from "react";
"use client";
var ProgressTrack = /* @__PURE__ */ React3.forwardRef(function ProgressTrack2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    state
  } = useProgressRootContext();
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: progressStateAttributesMapping
  });
  return element;
});
if (true)
  ProgressTrack.displayName = "ProgressTrack";
// node_modules/@base-ui/react/esm/progress/indicator/ProgressIndicator.js
import * as React4 from "react";
"use client";
var ProgressIndicator = /* @__PURE__ */ React4.forwardRef(function ProgressIndicator2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    max,
    min,
    value,
    state
  } = useProgressRootContext();
  const percentageValue = Number.isFinite(value) && value !== null ? valueToPercent(value, min, max) : null;
  const indicatorStyle = percentageValue == null ? {} : {
    insetInlineStart: 0,
    height: "inherit",
    width: `${percentageValue}%`
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      style: indicatorStyle
    }, elementProps],
    stateAttributesMapping: progressStateAttributesMapping
  });
  return element;
});
if (true)
  ProgressIndicator.displayName = "ProgressIndicator";
// node_modules/@base-ui/react/esm/progress/value/ProgressValue.js
import * as React5 from "react";
"use client";
var ProgressValue = /* @__PURE__ */ React5.forwardRef(function ProgressValue2(componentProps, forwardedRef) {
  const {
    className,
    render,
    children,
    style,
    ...elementProps
  } = componentProps;
  const {
    value,
    formattedValue,
    state
  } = useProgressRootContext();
  const formattedValueArg = value == null ? "indeterminate" : formattedValue;
  const formattedValueDisplay = value == null ? null : formattedValue;
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      "aria-hidden": true,
      children: typeof children === "function" ? children(formattedValueArg, value) : formattedValueDisplay
    }, elementProps],
    stateAttributesMapping: progressStateAttributesMapping
  });
  return element;
});
if (true)
  ProgressValue.displayName = "ProgressValue";
// node_modules/@base-ui/react/esm/progress/label/ProgressLabel.js
import * as React6 from "react";
"use client";
var ProgressLabel = /* @__PURE__ */ React6.forwardRef(function ProgressLabel2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    ...elementProps
  } = componentProps;
  const {
    setLabelId,
    state
  } = useProgressRootContext();
  const id = useRegisteredLabelId(idProp, setLabelId);
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      id,
      role: "presentation"
    }, elementProps],
    stateAttributesMapping: progressStateAttributesMapping
  });
  return element;
});
if (true)
  ProgressLabel.displayName = "ProgressLabel";
export {
  exports_index_parts as Progress
};
