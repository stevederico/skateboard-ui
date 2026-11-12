import rule from './no-explicit-any.js';
import { runRuleTests } from '../lib/ruleTester.js';

runRuleTests('no-explicit-any', rule, {
  valid: [
    'const x: unknown = JSON.parse("1");',
    'function f(value: string): number { return value.length; }',
    // The three public-API idioms (App.tsx overrides, props pass-through, apiRequest).
    'interface AppOverrides { layout?: ComponentType<any>; settings?: React.ComponentType<any>; }',
    'interface HeaderProps { title?: string; [key: string]: any; }',
    'export async function apiRequest<T = any>(endpoint: string): Promise<T> { return request(endpoint); }',
  ],
  invalid: [
    { code: 'let x: any;', errors: [{ messageId: 'any' }] },
    { code: 'function f(a: any[]): void {}', errors: [{ messageId: 'any' }] },
    { code: 'const r = apiRequest<any>("/deals");', errors: [{ messageId: 'any' }] },
    { code: 'type M = Record<string, any>;', errors: [{ messageId: 'any' }] },
    { code: 'const v = key.split(".").reduce<any>((o, k) => o?.[k], constants);', errors: [{ messageId: 'any' }] },
    { code: 'interface P { onSelect?: (value: any) => void; }', errors: [{ messageId: 'any' }] },
    { code: 'const p = props as any;', errors: [{ messageId: 'any' }] },
    { code: 'type M = Map<string, any>;', errors: [{ messageId: 'any' }] },
  ],
});
