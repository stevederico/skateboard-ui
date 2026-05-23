// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/internals/serializeValue.js
function serializeValue(value) {
  if (value == null) {
    return "";
  }
  if (typeof value === "string") {
    return value;
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export { serializeValue };
