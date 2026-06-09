import {
  round
} from "./_chunk-kw8nnq00.js";
import {
  getComputedStyle,
  isHTMLElement
} from "./_chunk-000kmre8.js";

// node_modules/@base-ui/react/esm/utils/getCssDimensions.js
function getCssDimensions(element) {
  const css = getComputedStyle(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height
  };
}

export { getCssDimensions };
