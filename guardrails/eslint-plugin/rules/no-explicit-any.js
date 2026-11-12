/**
 * True for the three public-API idioms where this library uses `any` on purpose:
 *
 * 1. `ComponentType<any>`: "a component with any props" (App.tsx overrides). React's
 *    props are contravariant, so `ComponentType<unknown>` rejects every real component.
 * 2. `[key: string]: any` in a props interface: pass-through props spread onto the root
 *    element (Header, Sidebar, TabBar, the views).
 * 3. A generic default, `<T = any>`: the caller picks the response type
 *    (`apiRequest<Deal[]>`), and an `unknown` default would break untyped callers.
 *
 * @param {any} node - TSAnyKeyword node
 * @returns {boolean} Whether the `any` is one of the allowed idioms
 */
function isAllowedIdiom(node) {
  const { parent } = node;
  if (parent?.type === 'TSTypeParameter' && parent.default === node) return true;
  if (parent?.type === 'TSTypeAnnotation' && parent.parent?.type === 'TSIndexSignature') return true;
  if (parent?.type === 'TSTypeParameterInstantiation' && parent.params.length === 1) {
    const ref = parent.parent;
    const name = ref?.type === 'TSTypeReference' ? ref.typeName : null;
    const last = name?.type === 'TSQualifiedName' ? name.right.name : name?.name;
    return last === 'ComponentType' || last === 'ElementType' || last === 'FC' || last === 'FunctionComponent';
  }
  return false;
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Never use `any` for values: use `unknown` and narrow. Allowed only as `ComponentType<any>`, a pass-through `[key: string]: any` props index signature, and a generic default `<T = any>`.',
      source: 'AGENTS.md > TypeScript',
    },
    schema: [],
    messages: {
      any:
        'Found the `any` type. Why: `any` switches the compiler off for this value and everything it flows into, and because skateboard-ui ships its `.d.ts` files, the hole is exported into every app that imports the type. ' +
        'Fix: type it as `unknown` and narrow with a guard (`typeof x === "string"`, `"id" in x`, `Array.isArray(x)`), or write the real interface or union (`Date | DateRange | undefined`). ' +
        '`any` is accepted only in three public-API idioms: `ComponentType<any>` (a component with any props), `[key: string]: any` (pass-through props index signature), and a generic default `<T = any>`.',
    },
  },
  create(context) {
    return {
      TSAnyKeyword(node) {
        if (!isAllowedIdiom(node)) context.report({ node, messageId: 'any' });
      },
    };
  },
};
