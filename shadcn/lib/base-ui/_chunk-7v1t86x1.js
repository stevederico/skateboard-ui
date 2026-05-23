import {
  useOnMount
} from "./_chunk-8jz3hb7q.js";
import {
  useRefWithInit
} from "./_chunk-1s41sngz.js";

// node_modules/.deno/@base-ui+utils@0.2.8/node_modules/@base-ui/utils/esm/useTimeout.js
"use client";
var EMPTY = 0;

class Timeout {
  static create() {
    return new Timeout;
  }
  currentId = EMPTY;
  start(delay, fn) {
    this.clear();
    this.currentId = setTimeout(() => {
      this.currentId = EMPTY;
      fn();
    }, delay);
  }
  isStarted() {
    return this.currentId !== EMPTY;
  }
  clear = () => {
    if (this.currentId !== EMPTY) {
      clearTimeout(this.currentId);
      this.currentId = EMPTY;
    }
  };
  disposeEffect = () => {
    return this.clear;
  };
}
function useTimeout() {
  const timeout = useRefWithInit(Timeout.create).current;
  useOnMount(timeout.disposeEffect);
  return timeout;
}

export { Timeout, useTimeout };
