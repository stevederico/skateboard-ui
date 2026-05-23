/* @base-ui/react 1.4.1 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import {
  normalizeScrollOffset,
  styleDisableScrollbar
} from "./_chunk-k1e5fvcj.js";
import {
  clamp
} from "./_chunk-szcr6mhk.js";
import {
  useCSPContext
} from "./_chunk-ymj1dpqg.js";
import {
  useDirection
} from "./_chunk-wtw745qd.js";
import {
  contains,
  getTarget
} from "./_chunk-atnkefgd.js";
import {
  isWebKit
} from "./_chunk-t7j3rbpv.js";
import {
  useTimeout
} from "./_chunk-7v1t86x1.js";
import {
  addEventListener
} from "./_chunk-mvv30fkv.js";
import {
  useBaseUiId
} from "./_chunk-8kh3xk78.js";
import"./_chunk-8jz3hb7q.js";
import"./_chunk-sx6vkz01.js";
import"./_chunk-n7dnqnbw.js";
import {
  useStableCallback
} from "./_chunk-mznt6ktj.js";
import {
  useIsoLayoutEffect
} from "./_chunk-b40erthe.js";
import {
  useRenderElement
} from "./_chunk-1s41sngz.js";
import {
  __export
} from "./_chunk-1e6khrvm.js";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/index.parts.js
var exports_index_parts = {};
__export(exports_index_parts, {
  Viewport: () => ScrollAreaViewport,
  Thumb: () => ScrollAreaThumb,
  Scrollbar: () => ScrollAreaScrollbar,
  Root: () => ScrollAreaRoot,
  Corner: () => ScrollAreaCorner,
  Content: () => ScrollAreaContent
});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRoot.js
import * as React2 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootContext.js
import * as React from "react";
"use client";
var ScrollAreaRootContext = /* @__PURE__ */ React.createContext(undefined);
if (true)
  ScrollAreaRootContext.displayName = "ScrollAreaRootContext";
function useScrollAreaRootContext() {
  const context = React.useContext(ScrollAreaRootContext);
  if (context === undefined) {
    throw new Error("Base UI: ScrollAreaRootContext is missing. ScrollArea parts must be placed within <ScrollArea.Root>.");
  }
  return context;
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootCssVars.js
var ScrollAreaRootCssVars = /* @__PURE__ */ function(ScrollAreaRootCssVars2) {
  ScrollAreaRootCssVars2["scrollAreaCornerHeight"] = "--scroll-area-corner-height";
  ScrollAreaRootCssVars2["scrollAreaCornerWidth"] = "--scroll-area-corner-width";
  return ScrollAreaRootCssVars2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/constants.js
var SCROLL_TIMEOUT = 500;
var MIN_THUMB_SIZE = 16;

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/utils/getOffset.js
function getOffset(element, prop, axis) {
  if (!element) {
    return 0;
  }
  const styles = getComputedStyle(element);
  const propAxis = axis === "x" ? "Inline" : "Block";
  if (axis === "x" && prop === "margin") {
    return parseFloat(styles[`${prop}InlineStart`]) * 2;
  }
  return parseFloat(styles[`${prop}${propAxis}Start`]) + parseFloat(styles[`${prop}${propAxis}End`]);
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbarDataAttributes.js
var ScrollAreaScrollbarDataAttributes = /* @__PURE__ */ function(ScrollAreaScrollbarDataAttributes2) {
  ScrollAreaScrollbarDataAttributes2["orientation"] = "data-orientation";
  ScrollAreaScrollbarDataAttributes2["hovering"] = "data-hovering";
  ScrollAreaScrollbarDataAttributes2["scrolling"] = "data-scrolling";
  ScrollAreaScrollbarDataAttributes2["hasOverflowX"] = "data-has-overflow-x";
  ScrollAreaScrollbarDataAttributes2["hasOverflowY"] = "data-has-overflow-y";
  ScrollAreaScrollbarDataAttributes2["overflowXStart"] = "data-overflow-x-start";
  ScrollAreaScrollbarDataAttributes2["overflowXEnd"] = "data-overflow-x-end";
  ScrollAreaScrollbarDataAttributes2["overflowYStart"] = "data-overflow-y-start";
  ScrollAreaScrollbarDataAttributes2["overflowYEnd"] = "data-overflow-y-end";
  return ScrollAreaScrollbarDataAttributes2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRootDataAttributes.js
var ScrollAreaRootDataAttributes = /* @__PURE__ */ function(ScrollAreaRootDataAttributes2) {
  ScrollAreaRootDataAttributes2["scrolling"] = "data-scrolling";
  ScrollAreaRootDataAttributes2["hasOverflowX"] = "data-has-overflow-x";
  ScrollAreaRootDataAttributes2["hasOverflowY"] = "data-has-overflow-y";
  ScrollAreaRootDataAttributes2["overflowXStart"] = "data-overflow-x-start";
  ScrollAreaRootDataAttributes2["overflowXEnd"] = "data-overflow-x-end";
  ScrollAreaRootDataAttributes2["overflowYStart"] = "data-overflow-y-start";
  ScrollAreaRootDataAttributes2["overflowYEnd"] = "data-overflow-y-end";
  return ScrollAreaRootDataAttributes2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/root/stateAttributes.js
var scrollAreaStateAttributesMapping = {
  hasOverflowX: (value) => value ? {
    [ScrollAreaRootDataAttributes.hasOverflowX]: ""
  } : null,
  hasOverflowY: (value) => value ? {
    [ScrollAreaRootDataAttributes.hasOverflowY]: ""
  } : null,
  overflowXStart: (value) => value ? {
    [ScrollAreaRootDataAttributes.overflowXStart]: ""
  } : null,
  overflowXEnd: (value) => value ? {
    [ScrollAreaRootDataAttributes.overflowXEnd]: ""
  } : null,
  overflowYStart: (value) => value ? {
    [ScrollAreaRootDataAttributes.overflowYStart]: ""
  } : null,
  overflowYEnd: (value) => value ? {
    [ScrollAreaRootDataAttributes.overflowYEnd]: ""
  } : null,
  cornerHidden: () => null
};

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/root/ScrollAreaRoot.js
import { jsxs as _jsxs } from "react/jsx-runtime";
"use client";
var DEFAULT_COORDS = {
  x: 0,
  y: 0
};
var DEFAULT_SIZE = {
  width: 0,
  height: 0
};
var DEFAULT_OVERFLOW_EDGES = {
  xStart: false,
  xEnd: false,
  yStart: false,
  yEnd: false
};
var DEFAULT_HIDDEN_STATE = {
  x: true,
  y: true,
  corner: true
};
var ScrollAreaRoot = /* @__PURE__ */ React2.forwardRef(function ScrollAreaRoot2(componentProps, forwardedRef) {
  const {
    render,
    className,
    overflowEdgeThreshold: overflowEdgeThresholdProp,
    style,
    ...elementProps
  } = componentProps;
  const overflowEdgeThreshold = normalizeOverflowEdgeThreshold(overflowEdgeThresholdProp);
  const rootId = useBaseUiId();
  const scrollYTimeout = useTimeout();
  const scrollXTimeout = useTimeout();
  const {
    nonce,
    disableStyleElements
  } = useCSPContext();
  const [hovering, setHovering] = React2.useState(false);
  const [scrollingX, setScrollingX] = React2.useState(false);
  const [scrollingY, setScrollingY] = React2.useState(false);
  const [touchModality, setTouchModality] = React2.useState(false);
  const [hasMeasuredScrollbar, setHasMeasuredScrollbar] = React2.useState(false);
  const [cornerSize, setCornerSize] = React2.useState(DEFAULT_SIZE);
  const [thumbSize, setThumbSize] = React2.useState(DEFAULT_SIZE);
  const [overflowEdges, setOverflowEdges] = React2.useState(DEFAULT_OVERFLOW_EDGES);
  const [hiddenState, setHiddenState] = React2.useState(DEFAULT_HIDDEN_STATE);
  const rootRef = React2.useRef(null);
  const viewportRef = React2.useRef(null);
  const scrollbarYRef = React2.useRef(null);
  const scrollbarXRef = React2.useRef(null);
  const thumbYRef = React2.useRef(null);
  const thumbXRef = React2.useRef(null);
  const cornerRef = React2.useRef(null);
  const thumbDraggingRef = React2.useRef(false);
  const startYRef = React2.useRef(0);
  const startXRef = React2.useRef(0);
  const startScrollTopRef = React2.useRef(0);
  const startScrollLeftRef = React2.useRef(0);
  const currentOrientationRef = React2.useRef("vertical");
  const scrollPositionRef = React2.useRef(DEFAULT_COORDS);
  const handleScroll = useStableCallback((scrollPosition) => {
    const offsetX = scrollPosition.x - scrollPositionRef.current.x;
    const offsetY = scrollPosition.y - scrollPositionRef.current.y;
    scrollPositionRef.current = scrollPosition;
    if (offsetY !== 0) {
      setScrollingY(true);
      scrollYTimeout.start(SCROLL_TIMEOUT, () => {
        setScrollingY(false);
      });
    }
    if (offsetX !== 0) {
      setScrollingX(true);
      scrollXTimeout.start(SCROLL_TIMEOUT, () => {
        setScrollingX(false);
      });
    }
  });
  const handlePointerDown = useStableCallback((event) => {
    if (event.button !== 0) {
      return;
    }
    thumbDraggingRef.current = true;
    startYRef.current = event.clientY;
    startXRef.current = event.clientX;
    currentOrientationRef.current = event.currentTarget.getAttribute(ScrollAreaScrollbarDataAttributes.orientation);
    if (viewportRef.current) {
      startScrollTopRef.current = viewportRef.current.scrollTop;
      startScrollLeftRef.current = viewportRef.current.scrollLeft;
    }
    if (thumbYRef.current && currentOrientationRef.current === "vertical") {
      thumbYRef.current.setPointerCapture(event.pointerId);
    }
    if (thumbXRef.current && currentOrientationRef.current === "horizontal") {
      thumbXRef.current.setPointerCapture(event.pointerId);
    }
  });
  const handlePointerMove = useStableCallback((event) => {
    if (!thumbDraggingRef.current) {
      return;
    }
    const deltaY = event.clientY - startYRef.current;
    const deltaX = event.clientX - startXRef.current;
    if (viewportRef.current) {
      const scrollableContentHeight = viewportRef.current.scrollHeight;
      const viewportHeight = viewportRef.current.clientHeight;
      const scrollableContentWidth = viewportRef.current.scrollWidth;
      const viewportWidth = viewportRef.current.clientWidth;
      if (thumbYRef.current && scrollbarYRef.current && currentOrientationRef.current === "vertical") {
        const scrollbarYOffset = getOffset(scrollbarYRef.current, "padding", "y");
        const thumbYOffset = getOffset(thumbYRef.current, "margin", "y");
        const thumbHeight = thumbYRef.current.offsetHeight;
        const maxThumbOffsetY = scrollbarYRef.current.offsetHeight - thumbHeight - scrollbarYOffset - thumbYOffset;
        const scrollRatioY = deltaY / maxThumbOffsetY;
        viewportRef.current.scrollTop = startScrollTopRef.current + scrollRatioY * (scrollableContentHeight - viewportHeight);
        event.preventDefault();
        setScrollingY(true);
        scrollYTimeout.start(SCROLL_TIMEOUT, () => {
          setScrollingY(false);
        });
      }
      if (thumbXRef.current && scrollbarXRef.current && currentOrientationRef.current === "horizontal") {
        const scrollbarXOffset = getOffset(scrollbarXRef.current, "padding", "x");
        const thumbXOffset = getOffset(thumbXRef.current, "margin", "x");
        const thumbWidth = thumbXRef.current.offsetWidth;
        const maxThumbOffsetX = scrollbarXRef.current.offsetWidth - thumbWidth - scrollbarXOffset - thumbXOffset;
        const scrollRatioX = deltaX / maxThumbOffsetX;
        viewportRef.current.scrollLeft = startScrollLeftRef.current + scrollRatioX * (scrollableContentWidth - viewportWidth);
        event.preventDefault();
        setScrollingX(true);
        scrollXTimeout.start(SCROLL_TIMEOUT, () => {
          setScrollingX(false);
        });
      }
    }
  });
  const handlePointerUp = useStableCallback((event) => {
    thumbDraggingRef.current = false;
    if (thumbYRef.current && currentOrientationRef.current === "vertical") {
      thumbYRef.current.releasePointerCapture(event.pointerId);
    }
    if (thumbXRef.current && currentOrientationRef.current === "horizontal") {
      thumbXRef.current.releasePointerCapture(event.pointerId);
    }
  });
  function handleTouchModalityChange(event) {
    setTouchModality(event.pointerType === "touch");
  }
  function handlePointerEnterOrMove(event) {
    handleTouchModalityChange(event);
    if (event.pointerType !== "touch") {
      const isTargetRootChild = contains(rootRef.current, event.target);
      setHovering(isTargetRootChild);
    }
  }
  const state = React2.useMemo(() => ({
    scrolling: scrollingX || scrollingY,
    hasOverflowX: !hiddenState.x,
    hasOverflowY: !hiddenState.y,
    overflowXStart: overflowEdges.xStart,
    overflowXEnd: overflowEdges.xEnd,
    overflowYStart: overflowEdges.yStart,
    overflowYEnd: overflowEdges.yEnd,
    cornerHidden: hiddenState.corner
  }), [scrollingX, scrollingY, hiddenState.x, hiddenState.y, hiddenState.corner, overflowEdges]);
  const props = {
    role: "presentation",
    onPointerEnter: handlePointerEnterOrMove,
    onPointerMove: handlePointerEnterOrMove,
    onPointerDown: handleTouchModalityChange,
    onPointerLeave() {
      setHovering(false);
    },
    style: {
      position: "relative",
      [ScrollAreaRootCssVars.scrollAreaCornerHeight]: `${cornerSize.height}px`,
      [ScrollAreaRootCssVars.scrollAreaCornerWidth]: `${cornerSize.width}px`
    }
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, rootRef],
    props: [props, elementProps],
    stateAttributesMapping: scrollAreaStateAttributesMapping
  });
  const contextValue = React2.useMemo(() => ({
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleScroll,
    cornerSize,
    setCornerSize,
    thumbSize,
    setThumbSize,
    hasMeasuredScrollbar,
    setHasMeasuredScrollbar,
    touchModality,
    cornerRef,
    scrollingX,
    setScrollingX,
    scrollingY,
    setScrollingY,
    hovering,
    setHovering,
    viewportRef,
    rootRef,
    scrollbarYRef,
    scrollbarXRef,
    thumbYRef,
    thumbXRef,
    rootId,
    hiddenState,
    setHiddenState,
    overflowEdges,
    setOverflowEdges,
    viewportState: state,
    overflowEdgeThreshold
  }), [handlePointerDown, handlePointerMove, handlePointerUp, handleScroll, cornerSize, thumbSize, hasMeasuredScrollbar, touchModality, scrollingX, setScrollingX, scrollingY, setScrollingY, hovering, setHovering, rootId, hiddenState, overflowEdges, state, overflowEdgeThreshold]);
  return /* @__PURE__ */ _jsxs(ScrollAreaRootContext.Provider, {
    value: contextValue,
    children: [!disableStyleElements && styleDisableScrollbar.getElement(nonce), element]
  });
});
if (true)
  ScrollAreaRoot.displayName = "ScrollAreaRoot";
function normalizeOverflowEdgeThreshold(threshold) {
  if (typeof threshold === "number") {
    const value = Math.max(0, threshold);
    return {
      xStart: value,
      xEnd: value,
      yStart: value,
      yEnd: value
    };
  }
  return {
    xStart: Math.max(0, threshold?.xStart || 0),
    xEnd: Math.max(0, threshold?.xEnd || 0),
    yStart: Math.max(0, threshold?.yStart || 0),
    yEnd: Math.max(0, threshold?.yEnd || 0)
  };
}
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/viewport/ScrollAreaViewport.js
import * as React4 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/viewport/ScrollAreaViewportContext.js
import * as React3 from "react";
"use client";
var ScrollAreaViewportContext = /* @__PURE__ */ React3.createContext(undefined);
if (true)
  ScrollAreaViewportContext.displayName = "ScrollAreaViewportContext";
function useScrollAreaViewportContext() {
  const context = React3.useContext(ScrollAreaViewportContext);
  if (context === undefined) {
    throw new Error("Base UI: ScrollAreaViewportContext missing. ScrollAreaViewport parts must be placed within <ScrollArea.Viewport>.");
  }
  return context;
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/viewport/ScrollAreaViewportCssVars.js
var ScrollAreaViewportCssVars = /* @__PURE__ */ function(ScrollAreaViewportCssVars2) {
  ScrollAreaViewportCssVars2["scrollAreaOverflowXStart"] = "--scroll-area-overflow-x-start";
  ScrollAreaViewportCssVars2["scrollAreaOverflowXEnd"] = "--scroll-area-overflow-x-end";
  ScrollAreaViewportCssVars2["scrollAreaOverflowYStart"] = "--scroll-area-overflow-y-start";
  ScrollAreaViewportCssVars2["scrollAreaOverflowYEnd"] = "--scroll-area-overflow-y-end";
  return ScrollAreaViewportCssVars2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/viewport/ScrollAreaViewport.js
import { jsx as _jsx } from "react/jsx-runtime";
"use client";
var scrollAreaOverflowVarsRegistered = false;
function removeCSSVariableInheritance() {
  if (scrollAreaOverflowVarsRegistered || isWebKit) {
    return;
  }
  if (typeof CSS !== "undefined" && "registerProperty" in CSS) {
    [ScrollAreaViewportCssVars.scrollAreaOverflowXStart, ScrollAreaViewportCssVars.scrollAreaOverflowXEnd, ScrollAreaViewportCssVars.scrollAreaOverflowYStart, ScrollAreaViewportCssVars.scrollAreaOverflowYEnd].forEach((name) => {
      try {
        CSS.registerProperty({
          name,
          syntax: "<length>",
          inherits: false,
          initialValue: "0px"
        });
      } catch {}
    });
  }
  scrollAreaOverflowVarsRegistered = true;
}
var ScrollAreaViewport = /* @__PURE__ */ React4.forwardRef(function ScrollAreaViewport2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    viewportRef,
    scrollbarYRef,
    scrollbarXRef,
    thumbYRef,
    thumbXRef,
    cornerRef,
    cornerSize,
    setCornerSize,
    setThumbSize,
    rootId,
    setHiddenState,
    hiddenState,
    setHasMeasuredScrollbar,
    handleScroll,
    setHovering,
    setOverflowEdges,
    overflowEdges,
    overflowEdgeThreshold,
    scrollingX,
    scrollingY
  } = useScrollAreaRootContext();
  const direction = useDirection();
  const programmaticScrollRef = React4.useRef(true);
  const lastMeasuredViewportMetricsRef = React4.useRef([NaN, NaN, NaN, NaN]);
  const scrollEndTimeout = useTimeout();
  const waitForAnimationsTimeout = useTimeout();
  const computeThumbPosition = useStableCallback(() => {
    const viewportEl = viewportRef.current;
    const scrollbarYEl = scrollbarYRef.current;
    const scrollbarXEl = scrollbarXRef.current;
    const thumbYEl = thumbYRef.current;
    const thumbXEl = thumbXRef.current;
    const cornerEl = cornerRef.current;
    if (!viewportEl) {
      return;
    }
    const scrollableContentHeight = viewportEl.scrollHeight;
    const scrollableContentWidth = viewportEl.scrollWidth;
    const viewportHeight = viewportEl.clientHeight;
    const viewportWidth = viewportEl.clientWidth;
    const scrollTop = viewportEl.scrollTop;
    const scrollLeft = viewportEl.scrollLeft;
    const lastMeasuredViewportMetrics = lastMeasuredViewportMetricsRef.current;
    const isFirstMeasurement = Number.isNaN(lastMeasuredViewportMetrics[0]);
    lastMeasuredViewportMetrics[0] = viewportHeight;
    lastMeasuredViewportMetrics[1] = scrollableContentHeight;
    lastMeasuredViewportMetrics[2] = viewportWidth;
    lastMeasuredViewportMetrics[3] = scrollableContentWidth;
    if (isFirstMeasurement) {
      setHasMeasuredScrollbar(true);
    }
    if (scrollableContentHeight === 0 || scrollableContentWidth === 0) {
      return;
    }
    const nextHiddenState = getHiddenState(viewportEl);
    const scrollbarYHidden = nextHiddenState.y;
    const scrollbarXHidden = nextHiddenState.x;
    const ratioX = viewportWidth / scrollableContentWidth;
    const ratioY = viewportHeight / scrollableContentHeight;
    const maxScrollLeft = Math.max(0, scrollableContentWidth - viewportWidth);
    const maxScrollTop = Math.max(0, scrollableContentHeight - viewportHeight);
    let scrollLeftFromStart = 0;
    let scrollLeftFromEnd = 0;
    if (!scrollbarXHidden) {
      let rawScrollLeftFromStart = 0;
      if (direction === "rtl") {
        rawScrollLeftFromStart = clamp(-scrollLeft, 0, maxScrollLeft);
      } else {
        rawScrollLeftFromStart = clamp(scrollLeft, 0, maxScrollLeft);
      }
      scrollLeftFromStart = normalizeScrollOffset(rawScrollLeftFromStart, maxScrollLeft);
      scrollLeftFromEnd = maxScrollLeft - scrollLeftFromStart;
    }
    const rawScrollTopFromStart = !scrollbarYHidden ? clamp(scrollTop, 0, maxScrollTop) : 0;
    const scrollTopFromStart = !scrollbarYHidden ? normalizeScrollOffset(rawScrollTopFromStart, maxScrollTop) : 0;
    const scrollTopFromEnd = !scrollbarYHidden ? maxScrollTop - scrollTopFromStart : 0;
    const nextWidth = scrollbarXHidden ? 0 : viewportWidth;
    const nextHeight = scrollbarYHidden ? 0 : viewportHeight;
    let nextCornerWidth = 0;
    let nextCornerHeight = 0;
    if (!scrollbarXHidden && !scrollbarYHidden) {
      nextCornerWidth = scrollbarYEl?.offsetWidth || 0;
      nextCornerHeight = scrollbarXEl?.offsetHeight || 0;
    }
    const cornerNotYetSized = cornerSize.width === 0 && cornerSize.height === 0;
    const cornerWidthOffset = cornerNotYetSized ? nextCornerWidth : 0;
    const cornerHeightOffset = cornerNotYetSized ? nextCornerHeight : 0;
    const scrollbarXOffset = getOffset(scrollbarXEl, "padding", "x");
    const scrollbarYOffset = getOffset(scrollbarYEl, "padding", "y");
    const thumbXOffset = getOffset(thumbXEl, "margin", "x");
    const thumbYOffset = getOffset(thumbYEl, "margin", "y");
    const idealNextWidth = nextWidth - scrollbarXOffset - thumbXOffset;
    const idealNextHeight = nextHeight - scrollbarYOffset - thumbYOffset;
    const maxNextWidth = scrollbarXEl ? Math.min(scrollbarXEl.offsetWidth - cornerWidthOffset, idealNextWidth) : idealNextWidth;
    const maxNextHeight = scrollbarYEl ? Math.min(scrollbarYEl.offsetHeight - cornerHeightOffset, idealNextHeight) : idealNextHeight;
    const clampedNextWidth = Math.max(MIN_THUMB_SIZE, maxNextWidth * ratioX);
    const clampedNextHeight = Math.max(MIN_THUMB_SIZE, maxNextHeight * ratioY);
    setThumbSize((prevSize) => {
      if (prevSize.height === clampedNextHeight && prevSize.width === clampedNextWidth) {
        return prevSize;
      }
      return {
        width: clampedNextWidth,
        height: clampedNextHeight
      };
    });
    if (scrollbarYEl && thumbYEl) {
      const maxThumbOffsetY = scrollbarYEl.offsetHeight - clampedNextHeight - scrollbarYOffset - thumbYOffset;
      const scrollRangeY = scrollableContentHeight - viewportHeight;
      const scrollRatioY = scrollRangeY === 0 ? 0 : scrollTop / scrollRangeY;
      const thumbOffsetY = Math.min(maxThumbOffsetY, Math.max(0, scrollRatioY * maxThumbOffsetY));
      thumbYEl.style.transform = `translate3d(0,${thumbOffsetY}px,0)`;
    }
    if (scrollbarXEl && thumbXEl) {
      const maxThumbOffsetX = scrollbarXEl.offsetWidth - clampedNextWidth - scrollbarXOffset - thumbXOffset;
      const scrollRangeX = scrollableContentWidth - viewportWidth;
      const scrollRatioX = scrollRangeX === 0 ? 0 : scrollLeft / scrollRangeX;
      const thumbOffsetX = direction === "rtl" ? clamp(scrollRatioX * maxThumbOffsetX, -maxThumbOffsetX, 0) : clamp(scrollRatioX * maxThumbOffsetX, 0, maxThumbOffsetX);
      thumbXEl.style.transform = `translate3d(${thumbOffsetX}px,0,0)`;
    }
    const overflowMetricsPx = [[ScrollAreaViewportCssVars.scrollAreaOverflowXStart, scrollLeftFromStart], [ScrollAreaViewportCssVars.scrollAreaOverflowXEnd, scrollLeftFromEnd], [ScrollAreaViewportCssVars.scrollAreaOverflowYStart, scrollTopFromStart], [ScrollAreaViewportCssVars.scrollAreaOverflowYEnd, scrollTopFromEnd]];
    for (const [cssVar, value] of overflowMetricsPx) {
      viewportEl.style.setProperty(cssVar, `${value}px`);
    }
    if (cornerEl) {
      if (scrollbarXHidden || scrollbarYHidden) {
        setCornerSize({
          width: 0,
          height: 0
        });
      } else if (!scrollbarXHidden && !scrollbarYHidden) {
        setCornerSize({
          width: nextCornerWidth,
          height: nextCornerHeight
        });
      }
    }
    setHiddenState((prevState) => mergeHiddenState(prevState, nextHiddenState));
    const nextOverflowEdges = {
      xStart: !scrollbarXHidden && scrollLeftFromStart > overflowEdgeThreshold.xStart,
      xEnd: !scrollbarXHidden && scrollLeftFromEnd > overflowEdgeThreshold.xEnd,
      yStart: !scrollbarYHidden && scrollTopFromStart > overflowEdgeThreshold.yStart,
      yEnd: !scrollbarYHidden && scrollTopFromEnd > overflowEdgeThreshold.yEnd
    };
    setOverflowEdges((prev) => {
      if (prev.xStart === nextOverflowEdges.xStart && prev.xEnd === nextOverflowEdges.xEnd && prev.yStart === nextOverflowEdges.yStart && prev.yEnd === nextOverflowEdges.yEnd) {
        return prev;
      }
      return nextOverflowEdges;
    });
  });
  useIsoLayoutEffect(() => {
    if (!viewportRef.current) {
      return;
    }
    removeCSSVariableInheritance();
  }, [viewportRef]);
  useIsoLayoutEffect(() => {
    queueMicrotask(computeThumbPosition);
  }, [computeThumbPosition, hiddenState, direction]);
  useIsoLayoutEffect(() => {
    if (viewportRef.current?.matches(":hover")) {
      setHovering(true);
    }
  }, [viewportRef, setHovering]);
  React4.useEffect(() => {
    const viewport = viewportRef.current;
    if (typeof ResizeObserver === "undefined" || !viewport) {
      return;
    }
    let hasInitialized = false;
    const ro = new ResizeObserver(() => {
      if (!hasInitialized) {
        hasInitialized = true;
        const lastMeasuredViewportMetrics = lastMeasuredViewportMetricsRef.current;
        if (lastMeasuredViewportMetrics[0] === viewport.clientHeight && lastMeasuredViewportMetrics[1] === viewport.scrollHeight && lastMeasuredViewportMetrics[2] === viewport.clientWidth && lastMeasuredViewportMetrics[3] === viewport.scrollWidth) {
          return;
        }
      }
      computeThumbPosition();
    });
    ro.observe(viewport);
    waitForAnimationsTimeout.start(0, () => {
      const animations = viewport.getAnimations({
        subtree: true
      });
      if (animations.length === 0) {
        return;
      }
      Promise.allSettled(animations.map((animation) => animation.finished)).then(computeThumbPosition).catch(() => {});
    });
    return () => {
      ro.disconnect();
      waitForAnimationsTimeout.clear();
    };
  }, [computeThumbPosition, viewportRef, waitForAnimationsTimeout]);
  function handleUserInteraction() {
    programmaticScrollRef.current = false;
  }
  const props = {
    role: "presentation",
    ...rootId && {
      "data-id": `${rootId}-viewport`
    },
    tabIndex: hiddenState.x && hiddenState.y ? -1 : 0,
    className: styleDisableScrollbar.className,
    style: {
      overflow: "scroll"
    },
    onScroll() {
      if (!viewportRef.current) {
        return;
      }
      computeThumbPosition();
      if (!programmaticScrollRef.current) {
        handleScroll({
          x: viewportRef.current.scrollLeft,
          y: viewportRef.current.scrollTop
        });
      }
      scrollEndTimeout.start(100, () => {
        programmaticScrollRef.current = true;
      });
    },
    onWheel: handleUserInteraction,
    onTouchMove: handleUserInteraction,
    onPointerMove: handleUserInteraction,
    onPointerEnter: handleUserInteraction,
    onKeyDown: handleUserInteraction
  };
  const viewportState = React4.useMemo(() => ({
    scrolling: scrollingX || scrollingY,
    hasOverflowX: !hiddenState.x,
    hasOverflowY: !hiddenState.y,
    overflowXStart: overflowEdges.xStart,
    overflowXEnd: overflowEdges.xEnd,
    overflowYStart: overflowEdges.yStart,
    overflowYEnd: overflowEdges.yEnd,
    cornerHidden: hiddenState.corner
  }), [scrollingX, scrollingY, hiddenState.x, hiddenState.y, hiddenState.corner, overflowEdges]);
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, viewportRef],
    state: viewportState,
    props: [props, elementProps],
    stateAttributesMapping: scrollAreaStateAttributesMapping
  });
  const contextValue = React4.useMemo(() => ({
    computeThumbPosition
  }), [computeThumbPosition]);
  return /* @__PURE__ */ _jsx(ScrollAreaViewportContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (true)
  ScrollAreaViewport.displayName = "ScrollAreaViewport";
function getHiddenState(viewport) {
  const y = viewport.clientHeight >= viewport.scrollHeight;
  const x = viewport.clientWidth >= viewport.scrollWidth;
  return {
    y,
    x,
    corner: y || x
  };
}
function mergeHiddenState(prevState, nextState) {
  if (prevState.y === nextState.y && prevState.x === nextState.x && prevState.corner === nextState.corner) {
    return prevState;
  }
  return nextState;
}
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbar.js
import * as React6 from "react";

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbarContext.js
import * as React5 from "react";
"use client";
var ScrollAreaScrollbarContext = /* @__PURE__ */ React5.createContext(undefined);
if (true)
  ScrollAreaScrollbarContext.displayName = "ScrollAreaScrollbarContext";
function useScrollAreaScrollbarContext() {
  const context = React5.useContext(ScrollAreaScrollbarContext);
  if (context === undefined) {
    throw new Error("Base UI: ScrollAreaScrollbarContext is missing. ScrollAreaScrollbar parts must be placed within <ScrollArea.Scrollbar>.");
  }
  return context;
}

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbarCssVars.js
var ScrollAreaScrollbarCssVars = /* @__PURE__ */ function(ScrollAreaScrollbarCssVars2) {
  ScrollAreaScrollbarCssVars2["scrollAreaThumbHeight"] = "--scroll-area-thumb-height";
  ScrollAreaScrollbarCssVars2["scrollAreaThumbWidth"] = "--scroll-area-thumb-width";
  return ScrollAreaScrollbarCssVars2;
}({});

// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/scrollbar/ScrollAreaScrollbar.js
import { jsx as _jsx2 } from "react/jsx-runtime";
"use client";
var ScrollAreaScrollbar = /* @__PURE__ */ React6.forwardRef(function ScrollAreaScrollbar2(componentProps, forwardedRef) {
  const {
    render,
    className,
    orientation = "vertical",
    keepMounted = false,
    style,
    ...elementProps
  } = componentProps;
  const {
    hovering,
    scrollingX,
    scrollingY,
    hiddenState,
    overflowEdges,
    scrollbarYRef,
    scrollbarXRef,
    viewportRef,
    thumbYRef,
    thumbXRef,
    handlePointerDown,
    handlePointerUp,
    rootId,
    thumbSize,
    hasMeasuredScrollbar
  } = useScrollAreaRootContext();
  const state = {
    hovering,
    scrolling: {
      horizontal: scrollingX,
      vertical: scrollingY
    }[orientation],
    orientation,
    hasOverflowX: !hiddenState.x,
    hasOverflowY: !hiddenState.y,
    overflowXStart: overflowEdges.xStart,
    overflowXEnd: overflowEdges.xEnd,
    overflowYStart: overflowEdges.yStart,
    overflowYEnd: overflowEdges.yEnd,
    cornerHidden: hiddenState.corner
  };
  const direction = useDirection();
  const hideTrackUntilMeasured = !hasMeasuredScrollbar && !keepMounted;
  React6.useEffect(() => {
    const viewportEl = viewportRef.current;
    const scrollbarEl = orientation === "vertical" ? scrollbarYRef.current : scrollbarXRef.current;
    if (!scrollbarEl) {
      return;
    }
    function handleWheel(event) {
      if (!viewportEl || !scrollbarEl || event.ctrlKey) {
        return;
      }
      event.preventDefault();
      if (orientation === "vertical") {
        if (viewportEl.scrollTop === 0 && event.deltaY < 0) {
          return;
        }
      } else if (viewportEl.scrollLeft === 0 && event.deltaX < 0) {
        return;
      }
      if (orientation === "vertical") {
        if (viewportEl.scrollTop === viewportEl.scrollHeight - viewportEl.clientHeight && event.deltaY > 0) {
          return;
        }
      } else if (viewportEl.scrollLeft === viewportEl.scrollWidth - viewportEl.clientWidth && event.deltaX > 0) {
        return;
      }
      if (orientation === "vertical") {
        viewportEl.scrollTop += event.deltaY;
      } else {
        viewportEl.scrollLeft += event.deltaX;
      }
    }
    return addEventListener(scrollbarEl, "wheel", handleWheel, {
      passive: false
    });
  }, [orientation, scrollbarXRef, scrollbarYRef, viewportRef]);
  const props = {
    ...rootId && {
      "data-id": `${rootId}-scrollbar`
    },
    onPointerDown(event) {
      if (event.button !== 0) {
        return;
      }
      const target = getTarget(event.nativeEvent);
      const thumb = orientation === "vertical" ? thumbYRef.current : thumbXRef.current;
      if (thumb && contains(thumb, target)) {
        return;
      }
      if (!viewportRef.current) {
        return;
      }
      if (thumbYRef.current && scrollbarYRef.current && orientation === "vertical") {
        const thumbYOffset = getOffset(thumbYRef.current, "margin", "y");
        const scrollbarYOffset = getOffset(scrollbarYRef.current, "padding", "y");
        const thumbHeight = thumbYRef.current.offsetHeight;
        const trackRectY = scrollbarYRef.current.getBoundingClientRect();
        const clickY = event.clientY - trackRectY.top - thumbHeight / 2 - scrollbarYOffset + thumbYOffset / 2;
        const scrollableContentHeight = viewportRef.current.scrollHeight;
        const viewportHeight = viewportRef.current.clientHeight;
        const maxThumbOffsetY = scrollbarYRef.current.offsetHeight - thumbHeight - scrollbarYOffset - thumbYOffset;
        const scrollRatioY = clickY / maxThumbOffsetY;
        const newScrollTop = scrollRatioY * (scrollableContentHeight - viewportHeight);
        viewportRef.current.scrollTop = newScrollTop;
      }
      if (thumbXRef.current && scrollbarXRef.current && orientation === "horizontal") {
        const thumbXOffset = getOffset(thumbXRef.current, "margin", "x");
        const scrollbarXOffset = getOffset(scrollbarXRef.current, "padding", "x");
        const thumbWidth = thumbXRef.current.offsetWidth;
        const trackRectX = scrollbarXRef.current.getBoundingClientRect();
        const clickX = event.clientX - trackRectX.left - thumbWidth / 2 - scrollbarXOffset + thumbXOffset / 2;
        const scrollableContentWidth = viewportRef.current.scrollWidth;
        const viewportWidth = viewportRef.current.clientWidth;
        const maxThumbOffsetX = scrollbarXRef.current.offsetWidth - thumbWidth - scrollbarXOffset - thumbXOffset;
        const scrollRatioX = clickX / maxThumbOffsetX;
        let newScrollLeft;
        if (direction === "rtl") {
          newScrollLeft = (1 - scrollRatioX) * (scrollableContentWidth - viewportWidth);
          if (viewportRef.current.scrollLeft <= 0) {
            newScrollLeft = -newScrollLeft;
          }
        } else {
          newScrollLeft = scrollRatioX * (scrollableContentWidth - viewportWidth);
        }
        viewportRef.current.scrollLeft = newScrollLeft;
      }
      handlePointerDown(event);
    },
    onPointerUp: handlePointerUp,
    style: {
      position: "absolute",
      touchAction: "none",
      WebkitUserSelect: "none",
      userSelect: "none",
      visibility: hideTrackUntilMeasured ? "hidden" : undefined,
      ...orientation === "vertical" && {
        top: 0,
        bottom: `var(${ScrollAreaRootCssVars.scrollAreaCornerHeight})`,
        insetInlineEnd: 0,
        [ScrollAreaScrollbarCssVars.scrollAreaThumbHeight]: `${thumbSize.height}px`
      },
      ...orientation === "horizontal" && {
        insetInlineStart: 0,
        insetInlineEnd: `var(${ScrollAreaRootCssVars.scrollAreaCornerWidth})`,
        bottom: 0,
        [ScrollAreaScrollbarCssVars.scrollAreaThumbWidth]: `${thumbSize.width}px`
      }
    }
  };
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, orientation === "vertical" ? scrollbarYRef : scrollbarXRef],
    state,
    props: [props, elementProps],
    stateAttributesMapping: scrollAreaStateAttributesMapping
  });
  const contextValue = React6.useMemo(() => ({
    orientation
  }), [orientation]);
  const isHidden = orientation === "vertical" ? hiddenState.y : hiddenState.x;
  const shouldRender = keepMounted || !isHidden;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ _jsx2(ScrollAreaScrollbarContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (true)
  ScrollAreaScrollbar.displayName = "ScrollAreaScrollbar";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/content/ScrollAreaContent.js
import * as React7 from "react";
"use client";
var ScrollAreaContent = /* @__PURE__ */ React7.forwardRef(function ScrollAreaContent2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const contentWrapperRef = React7.useRef(null);
  const {
    computeThumbPosition
  } = useScrollAreaViewportContext();
  const {
    viewportState
  } = useScrollAreaRootContext();
  useIsoLayoutEffect(() => {
    if (typeof ResizeObserver === "undefined") {
      return;
    }
    let hasInitialized = false;
    const ro = new ResizeObserver(() => {
      if (!hasInitialized) {
        hasInitialized = true;
        return;
      }
      computeThumbPosition();
    });
    if (contentWrapperRef.current) {
      ro.observe(contentWrapperRef.current);
    }
    return () => {
      ro.disconnect();
    };
  }, [computeThumbPosition]);
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, contentWrapperRef],
    state: viewportState,
    stateAttributesMapping: scrollAreaStateAttributesMapping,
    props: [{
      role: "presentation",
      style: {
        minWidth: "fit-content"
      }
    }, elementProps]
  });
  return element;
});
if (true)
  ScrollAreaContent.displayName = "ScrollAreaContent";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/thumb/ScrollAreaThumb.js
import * as React8 from "react";
"use client";
var ScrollAreaThumb = /* @__PURE__ */ React8.forwardRef(function ScrollAreaThumb2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    thumbYRef,
    thumbXRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    setScrollingX,
    setScrollingY,
    hasMeasuredScrollbar
  } = useScrollAreaRootContext();
  const {
    orientation
  } = useScrollAreaScrollbarContext();
  const state = {
    orientation
  };
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, orientation === "vertical" ? thumbYRef : thumbXRef],
    state,
    props: [{
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp(event) {
        if (orientation === "vertical") {
          setScrollingY(false);
        }
        if (orientation === "horizontal") {
          setScrollingX(false);
        }
        handlePointerUp(event);
      },
      style: {
        visibility: hasMeasuredScrollbar ? undefined : "hidden",
        ...orientation === "vertical" && {
          height: `var(${ScrollAreaScrollbarCssVars.scrollAreaThumbHeight})`
        },
        ...orientation === "horizontal" && {
          width: `var(${ScrollAreaScrollbarCssVars.scrollAreaThumbWidth})`
        }
      }
    }, elementProps]
  });
  return element;
});
if (true)
  ScrollAreaThumb.displayName = "ScrollAreaThumb";
// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/scroll-area/corner/ScrollAreaCorner.js
import * as React9 from "react";
"use client";
var ScrollAreaCorner = /* @__PURE__ */ React9.forwardRef(function ScrollAreaCorner2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    cornerRef,
    cornerSize,
    hiddenState
  } = useScrollAreaRootContext();
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, cornerRef],
    props: [{
      style: {
        position: "absolute",
        bottom: 0,
        insetInlineEnd: 0,
        width: cornerSize.width,
        height: cornerSize.height
      }
    }, elementProps]
  });
  if (hiddenState.corner) {
    return null;
  }
  return element;
});
if (true)
  ScrollAreaCorner.displayName = "ScrollAreaCorner";
export {
  exports_index_parts as ScrollArea
};
