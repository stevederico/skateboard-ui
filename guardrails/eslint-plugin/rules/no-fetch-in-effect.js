import { repoRelative } from '../lib/paths.js';

/** Effect hooks whose callbacks must not fetch. */
const EFFECT_HOOKS = new Set(['useEffect', 'useLayoutEffect', 'useInsertionEffect']);

/**
 * Network calls: global fetch plus every components/core/Utilities.ts helper that performs
 * a request.
 */
const REQUEST_FUNCTIONS = new Set([
  'fetch',
  'apiRequest',
  'apiRequestWithParams',
  'getCurrentUser',
  'isSubscriber',
  'getRemainingUsage',
  'trackUsage',
  'showCheckout',
  'showManage',
]);

/** HTTP client objects: `axios(...)`, `axios.get(...)`, `ky.post(...)`, `$.ajax(...)`. */
const CLIENT_OBJECTS = new Set(['axios', 'ky', 'got', 'superagent', 'request', '$', 'jQuery', 'http', 'https']);

/** Client objects that are also called directly: `axios(config)`, `ky(url)`, `got(url)`. */
const CALLABLE_CLIENTS = new Set(['axios', 'ky', 'got', 'superagent']);

/** Methods on a client object that send a request. */
const CLIENT_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'request', 'ajax', 'getJSON']);

/**
 * The data-hook module. Effects inside its `use*` hooks are where fetch-in-effect is
 * implemented once, with the abort, race and error handling every caller then inherits.
 */
const DATA_HOOK_MODULE = /^components\/core\/Utilities\.ts$/;

/** Request constructors. */
const REQUEST_CONSTRUCTORS = new Set(['XMLHttpRequest']);

/** Keys never worth descending into while scanning for calls. */
const SKIP_KEYS = new Set(['parent', 'loc', 'range', 'tokens', 'comments']);

/**
 * Name of the hook being called: `useEffect(...)` or `React.useEffect(...)`.
 *
 * @param {any} callee - CallExpression callee
 * @returns {string | null} Hook name or null
 */
function hookName(callee) {
  if (callee.type === 'Identifier') return callee.name;
  if (callee.type === 'MemberExpression' && callee.property.type === 'Identifier') return callee.property.name;
  return null;
}

/**
 * Name of the request function a call/new expression invokes, or null. Handles
 * `fetch(...)`, `window.fetch(...)`, `apiRequest(...)`, `axios(...)`, `axios.get(...)`,
 * `new XMLHttpRequest()`.
 *
 * @param {any} node - CallExpression or NewExpression
 * @returns {string | null} Request function name
 */
function requestName(node) {
  const { callee } = node;
  const name = callee.type === 'Identifier' ? callee.name : null;
  const member =
    callee.type === 'MemberExpression' && callee.object.type === 'Identifier' && ['window', 'globalThis', 'self'].includes(callee.object.name)
      ? callee.property.name
      : null;
  if (callee.type === 'MemberExpression' && callee.object.type === 'Identifier' && CLIENT_OBJECTS.has(callee.object.name)) {
    const method = callee.property.type === 'Identifier' ? callee.property.name : '';
    return CLIENT_METHODS.has(method) ? `${callee.object.name}.${method}` : null;
  }
  const called = name ?? member;
  if (!called) return null;
  if (node.type === 'CallExpression' && name && CALLABLE_CLIENTS.has(name)) return name;
  if (node.type === 'NewExpression') return REQUEST_CONSTRUCTORS.has(called) ? called : null;
  return REQUEST_FUNCTIONS.has(called) ? called : null;
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'No data fetching inside useEffect / useLayoutEffect (fetch, apiRequest and the other Utilities request helpers, axios-style clients). Reads go through the data hooks in components/core/Utilities.ts, writes through event handlers.',
      source: 'AGENTS.md > React; README.md > Utilities (Data fetching)',
    },
    schema: [],
    messages: {
      fetchInEffect:
        'Found `{{call}}()` running inside `{{hook}}`{{via}}. Why: a request started from an effect has no owner: a slow old response overwrites a newer one, React StrictMode sends it twice, nothing aborts it on unmount, and the component gets no loading or error state. In a library those bugs ship into every app. ' +
        'Fix: for reads call a data hook from components/core/Utilities.ts: `const { data, loading, error, refetch } = useListData("/endpoint");` and render all three states. If no hook fits, add a `use*` hook to Utilities.ts next to useListData (AbortController, abort check, error state); that file is the one place an effect may fetch. ' +
        'For writes and user actions call `await apiRequest(...)` inside the event handler (onClick / onSubmit) in try/catch and set an error state.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const inDataHookModule = DATA_HOOK_MODULE.test(repoRelative(context));

    /**
     * True when the effect sits inside a custom hook (`function useListData`) of the
     * data-hook module, the sanctioned home for fetch-in-effect.
     *
     * @param {any} node - The effect call
     * @returns {boolean} Whether the effect belongs to a data hook
     */
    function insideDataHook(node) {
      if (!inDataHookModule) return false;
      for (let fn = node.parent; fn; fn = fn.parent) {
        const name =
          fn.type === 'FunctionDeclaration' ? fn.id?.name :
          fn.type === 'VariableDeclarator' && fn.id.type === 'Identifier' ? fn.id.name : null;
        if (name && /^use[A-Z]/.test(name)) return true;
      }
      return false;
    }

    /**
     * Resolve an identifier used as a callee or effect argument to the function it names
     * in this file (function declaration or `const f = () => {}` / `useCallback(() => {})`).
     *
     * @param {any} identifier - Identifier node
     * @returns {any} Function node, or null
     */
    function resolveFunction(identifier) {
      let scope = sourceCode.getScope(identifier);
      while (scope) {
        const variable = scope.set.get(identifier.name);
        if (variable) {
          const def = variable.defs[0];
          if (!def) return null;
          if (def.node.type === 'FunctionDeclaration') return def.node;
          const init = def.node.type === 'VariableDeclarator' ? def.node.init : null;
          if (init?.type === 'ArrowFunctionExpression' || init?.type === 'FunctionExpression') return init;
          const isCallback = init?.type === 'CallExpression' && hookName(init.callee) === 'useCallback';
          return isCallback ? init.arguments[0] ?? null : null;
        }
        scope = scope.upper;
      }
      return null;
    }

    /**
     * Find the first request call inside `root`, following calls to functions defined in
     * this file. `visited` stops recursion on mutually recursive helpers.
     *
     * @param {any} root - Node to scan
     * @param {Set<any>} visited - Functions already scanned
     * @returns {{ node: any, call: string, via: string | null } | null} First request found
     */
    function findRequest(root, visited) {
      const stack = [root];
      while (stack.length) {
        const node = stack.pop();
        if (node.type === 'CallExpression' || node.type === 'NewExpression') {
          const call = requestName(node);
          if (call) return { node, call, via: null };
          if (node.type === 'CallExpression' && node.callee.type === 'Identifier') {
            const fn = resolveFunction(node.callee);
            if (fn && !visited.has(fn)) {
              visited.add(fn);
              const found = findRequest(fn.body, visited);
              if (found) return { node, call: found.call, via: found.via ?? node.callee.name };
            }
          }
        }
        for (const [key, value] of Object.entries(node)) {
          if (SKIP_KEYS.has(key) || !value || typeof value !== 'object') continue;
          for (const child of Array.isArray(value) ? value : [value]) {
            if (child && typeof child.type === 'string') stack.push(child);
          }
        }
      }
      return null;
    }

    return {
      CallExpression(node) {
        const hook = hookName(node.callee);
        if (!hook || !EFFECT_HOOKS.has(hook) || insideDataHook(node)) return;
        let effect = node.arguments[0];
        let via = null;
        if (effect?.type === 'Identifier') {
          via = effect.name;
          effect = resolveFunction(effect);
        }
        if (!effect?.body) return;
        const found = findRequest(effect.body, new Set([effect]));
        if (!found) return;
        const through = found.via ?? via;
        context.report({
          node: found.node,
          messageId: 'fetchInEffect',
          data: { call: found.call, hook, via: through ? ` (via \`${through}\`)` : '' },
        });
      },
    };
  },
};
