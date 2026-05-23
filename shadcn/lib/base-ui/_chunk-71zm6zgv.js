// node_modules/.deno/@base-ui+utils@0.2.8/node_modules/@base-ui/utils/esm/error.js
var set;
if (true) {
  set = new Set;
}
function error(...messages) {
  if (true) {
    const messageKey = messages.join(" ");
    if (!set.has(messageKey)) {
      set.add(messageKey);
      console.error(`Base UI: ${messageKey}`);
    }
  }
}

export { error };
