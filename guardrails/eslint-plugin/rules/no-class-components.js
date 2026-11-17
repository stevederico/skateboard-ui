const BASES = new Set(['Component', 'PureComponent', 'React.Component', 'React.PureComponent']);

const ERROR_BOUNDARY_METHODS = new Set(['componentDidCatch', 'getDerivedStateFromError']);

function superName(node) {
  if (!node) return '';
  if (node.type === 'Identifier') return node.name;
  if (node.type === 'MemberExpression' && !node.computed && node.object.type === 'Identifier') {
    return `${node.object.name}.${node.property.name}`;
  }
  return '';
}

const isErrorBoundary = (node) =>
  node.body.body.some((m) => m.type === 'MethodDefinition' && m.key.type === 'Identifier' && ERROR_BOUNDARY_METHODS.has(m.key.name));

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Function components only. The one allowed class is an error boundary (components/ErrorBoundary.tsx).',
      source: 'AGENTS.md > React',
    },
    schema: [],
    messages: {
      classComponent:
        'Found a class component extending `{{base}}`. Why: the shell state (`getState`, `useUser`, `useDispatch`), `useSafeNavigate`, `useAuthGate` and every ui/ primitive are hooks or built on hooks, which cannot run in a class, and class lifecycles hide fetch and cleanup bugs. ' +
        'Fix: rewrite as `export default function Name(props: NameProps) { ... }` with `useState` / `useEffect`. A class is accepted only when it defines `componentDidCatch` or `static getDerivedStateFromError` (an error boundary); reuse components/ErrorBoundary.tsx instead of adding another.',
    },
  },
  create(context) {
    const check = (node) => {
      const base = superName(node.superClass);
      if (BASES.has(base) && !isErrorBoundary(node)) context.report({ node, messageId: 'classComponent', data: { base } });
    };
    return { ClassDeclaration: check, ClassExpression: check };
  },
};
