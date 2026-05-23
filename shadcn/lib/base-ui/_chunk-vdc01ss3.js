// node_modules/.deno/@base-ui+utils@0.2.8/node_modules/@base-ui/utils/esm/isElementDisabled.js
function isElementDisabled(element) {
  return element == null || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
}

export { isElementDisabled };
