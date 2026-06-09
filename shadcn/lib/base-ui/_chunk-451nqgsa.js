// node_modules/@base-ui/utils/esm/owner.js
function ownerDocument(node) {
  return node?.ownerDocument || document;
}

export { ownerDocument };
