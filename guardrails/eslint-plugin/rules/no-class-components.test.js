import rule from './no-class-components.js';
import { runRuleTests } from '../lib/ruleTester.js';

runRuleTests('no-class-components', rule, {
  valid: [
    'export default function SettingsView() { return <div />; }',
    'class Store extends Map {}',
    'class ApiError extends Error {}',
    // components/ErrorBoundary.tsx: React offers no hook for this.
    'class ErrorBoundary extends React.Component { static getDerivedStateFromError() { return { hasError: true }; } render() { return this.props.children; } }',
    'class Boundary extends Component { componentDidCatch(error) { console.error(error); } render() { return null; } }',
  ],
  invalid: [
    { code: 'class A extends Component { render() { return null; } }', errors: [{ messageId: 'classComponent' }] },
    { code: 'class A extends React.Component {}', errors: [{ messageId: 'classComponent' }] },
    { code: 'const A = class extends PureComponent {};', errors: [{ messageId: 'classComponent' }] },
    { code: 'export default class A extends React.PureComponent {}', errors: [{ messageId: 'classComponent' }] },
  ],
});
