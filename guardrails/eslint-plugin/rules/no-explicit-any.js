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
