/* @base-ui/react 1.4.1 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import"./_chunk-ds8fnpjj.js";
import {
  useTimeout
} from "./_chunk-7v1t86x1.js";
import {
  transitionStatusMapping,
  useOpenChangeComplete,
  useTransitionStatus
} from "./_chunk-mbn76q14.js";
import"./_chunk-v92ycsfj.js";
import"./_chunk-3h6zpchb.js";
import"./_chunk-8jz3hb7q.js";
import {
  useStableCallback
} from "./_chunk-mznt6ktj.js";
import {
  useIsoLayoutEffect
} from "./_chunk-b40erthe.js";
import {
  NOOP,
  useRenderElement
} from "./_chunk-1s41sngz.js";
import {
  __export
} from "./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/avatar/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  Root: () => AvatarRoot,
  Image: () => AvatarImage,
  Fallback: () => AvatarFallback
});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/avatar/root/AvatarRoot.js
import * as React2 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/avatar/root/AvatarRootContext.js
import * as React from "react";
"use client";
var AvatarRootContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  AvatarRootContext.displayName = "AvatarRootContext";
function useAvatarRootContext() {
  const context = React.useContext(AvatarRootContext);
  if (context === undefined) {
    throw new Error("Base UI: AvatarRootContext is missing. Avatar parts must be placed within <Avatar.Root>.");
  }
  return context;
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/avatar/root/stateAttributesMapping.js
var avatarStateAttributesMapping = {
  imageLoadingStatus: () => null
};

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/avatar/root/AvatarRoot.js
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
var AvatarRoot = /* @__PURE__ */ React2.forwardRef(function AvatarRoot2(componentProps, forwardedRef) {
  const {
    className,
    render,
    style,
    ...elementProps
  } = componentProps;
  const [imageLoadingStatus, setImageLoadingStatus] = React2.useState("idle");
  const state = {
    imageLoadingStatus
  };
  const contextValue = React2.useMemo(() => ({
    imageLoadingStatus,
    setImageLoadingStatus
  }), [imageLoadingStatus, setImageLoadingStatus]);
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: avatarStateAttributesMapping
  });
  return /* @__PURE__ */ _jsx(AvatarRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (true)
  AvatarRoot.displayName = "AvatarRoot";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/avatar/image/AvatarImage.js
import * as React4 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/avatar/image/useImageLoadingStatus.js
import * as React3 from "react";
"use client";
function useImageLoadingStatus(src, {
  referrerPolicy,
  crossOrigin
}) {
  const [loadingStatus, setLoadingStatus] = React3.useState("idle");
  useIsoLayoutEffect(() => {
    if (!src) {
      setLoadingStatus("error");
      return NOOP;
    }
    let isMounted = true;
    const image = new window.Image;
    const updateStatus = (status) => () => {
      if (!isMounted) {
        return;
      }
      setLoadingStatus(status);
    };
    setLoadingStatus("loading");
    image.onload = updateStatus("loaded");
    image.onerror = updateStatus("error");
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    image.crossOrigin = crossOrigin ?? null;
    image.src = src;
    if (image.complete) {
      setLoadingStatus(image.naturalWidth > 0 ? "loaded" : "error");
    }
    return () => {
      isMounted = false;
    };
  }, [src, crossOrigin, referrerPolicy]);
  return loadingStatus;
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/avatar/image/AvatarImage.js
"use client";
var stateAttributesMapping = {
  ...avatarStateAttributesMapping,
  ...transitionStatusMapping
};
var AvatarImage = /* @__PURE__ */ React4.forwardRef(function AvatarImage2(componentProps, forwardedRef) {
  const {
    className,
    render,
    onLoadingStatusChange: onLoadingStatusChangeProp,
    referrerPolicy,
    crossOrigin,
    style,
    ...elementProps
  } = componentProps;
  const context = useAvatarRootContext();
  const imageLoadingStatus = useImageLoadingStatus(componentProps.src, {
    referrerPolicy,
    crossOrigin
  });
  const isVisible = imageLoadingStatus === "loaded";
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(isVisible);
  const imageRef = React4.useRef(null);
  const handleLoadingStatusChange = useStableCallback((status) => {
    onLoadingStatusChangeProp?.(status);
    context.setImageLoadingStatus(status);
  });
  useIsoLayoutEffect(() => {
    if (imageLoadingStatus !== "idle") {
      handleLoadingStatusChange(imageLoadingStatus);
    }
  }, [imageLoadingStatus, handleLoadingStatusChange]);
  const state = {
    imageLoadingStatus,
    transitionStatus
  };
  useOpenChangeComplete({
    open: isVisible,
    ref: imageRef,
    onComplete() {
      if (!isVisible) {
        setMounted(false);
      }
    }
  });
  const element = useRenderElement("img", componentProps, {
    state,
    ref: [forwardedRef, imageRef],
    props: elementProps,
    stateAttributesMapping,
    enabled: mounted
  });
  if (!mounted) {
    return null;
  }
  return element;
});
if (true)
  AvatarImage.displayName = "AvatarImage";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/avatar/fallback/AvatarFallback.js
import * as React5 from "react";
"use client";
var AvatarFallback = /* @__PURE__ */ React5.forwardRef(function AvatarFallback2(componentProps, forwardedRef) {
  const {
    className,
    render,
    delay,
    style,
    ...elementProps
  } = componentProps;
  const {
    imageLoadingStatus
  } = useAvatarRootContext();
  const [delayPassed, setDelayPassed] = React5.useState(delay === undefined);
  const timeout = useTimeout();
  React5.useEffect(() => {
    if (delay !== undefined) {
      timeout.start(delay, () => setDelayPassed(true));
    }
    return timeout.clear;
  }, [timeout, delay]);
  const state = {
    imageLoadingStatus
  };
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: avatarStateAttributesMapping,
    enabled: imageLoadingStatus !== "loaded" && delayPassed
  });
  return element;
});
if (true)
  AvatarFallback.displayName = "AvatarFallback";
export {
  exports_index_parts as Avatar
};
