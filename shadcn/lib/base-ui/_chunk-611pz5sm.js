// node_modules/.deno/@base-ui+react@1.4.1/node_modules/@base-ui/react/esm/utils/resolveAriaLabelledBy.js
"use client";
function getDefaultLabelId(id) {
  return id == null ? undefined : `${id}-label`;
}
function resolveAriaLabelledBy(fieldLabelId, localLabelId) {
  return fieldLabelId ?? localLabelId;
}

export { getDefaultLabelId, resolveAriaLabelledBy };
