import rule from './no-fetch-in-effect.js';
import { runRuleTests } from '../lib/ruleTester.js';

runRuleTests('no-fetch-in-effect', rule, {
  valid: [
    // CommandMenu: an effect that only subscribes to a DOM event.
    `useEffect(() => {
      function handleKeyDown(e) { if (e.key === 'k') setOpen((p) => !p); }
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);`,
    'const { data, loading, error, refetch } = useListData("/deals");',
    `async function handleSave() {
      try { await apiRequest('/deals', { method: 'POST', body: '{}' }); } catch (err) { console.error(err); }
    }`,
    // A function that fetches but is only called from an event handler.
    `const load = async () => fetch('/x');
     useEffect(() => { document.title = 'Deals'; }, []);
     const handleClick = () => load();`,
    'useMemo(() => fetch, []);',
    // The data-hook module is where the effect lives once, with abort and error handling.
    {
      code: "export function useListData(endpoint) {\n  const fetchData = async (signal) => { setData(await apiRequest(endpoint, { signal })); };\n  useEffect(() => { const c = new AbortController(); fetchData(c.signal); return () => c.abort(); }, [endpoint]);\n}",
      filename: 'components/core/Utilities.ts',
    },
    'useEffect(() => { const cached = store.get("user"); setUser(cached); }, []);',
  ],
  invalid: [
    {
      code: "useEffect(() => { fetch('/api/deals').then((r) => r.json()).then(setDeals); }, []);",
      errors: [{ messageId: 'fetchInEffect', data: { call: 'fetch', hook: 'useEffect', via: '' } }],
    },
    {
      code: "React.useEffect(() => { (async () => { setDeals(await apiRequest('/deals')); })(); }, []);",
      errors: [{ messageId: 'fetchInEffect', data: { call: 'apiRequest', hook: 'useEffect', via: '' } }],
    },
    {
      code: "useEffect(() => { async function load() { setUser(await getCurrentUser()); } load(); }, []);",
      errors: [{ messageId: 'fetchInEffect', data: { call: 'getCurrentUser', hook: 'useEffect', via: ' (via `load`)' } }],
    },
    {
      code: "const load = useCallback(async () => setRows(await apiRequestWithParams('/rows', { page: '1' })), []);\nuseEffect(() => { load(); }, [load]);",
      errors: [{ messageId: 'fetchInEffect', data: { call: 'apiRequestWithParams', hook: 'useEffect', via: ' (via `load`)' } }],
    },
    {
      code: "function loadDeals() { return window.fetch('/deals'); }\nuseLayoutEffect(loadDeals, []);",
      errors: [{ messageId: 'fetchInEffect', data: { call: 'fetch', hook: 'useLayoutEffect', via: ' (via `loadDeals`)' } }],
    },
    {
      code: "useEffect(() => { const xhr = new XMLHttpRequest(); xhr.open('GET', '/x'); xhr.send(); }, []);",
      errors: [{ messageId: 'fetchInEffect', data: { call: 'XMLHttpRequest', hook: 'useEffect', via: '' } }],
    },
    {
      code: "useEffect(() => { isSubscriber().then(setIsPro); }, []);",
      errors: [{ messageId: 'fetchInEffect' }],
    },
    {
      code: "useEffect(() => { axios.get('/api/deals').then((r) => setDeals(r.data)); }, []);",
      errors: [{ messageId: 'fetchInEffect', data: { call: 'axios.get', hook: 'useEffect', via: '' } }],
    },
    {
      code: "useEffect(() => { axios({ url: '/api/deals' }).then(setDeals); }, []);",
      errors: [{ messageId: 'fetchInEffect', data: { call: 'axios', hook: 'useEffect', via: '' } }],
    },
    {
      code: "useEffect(() => { ky.post('/api/deals', { json: deal }); }, [deal]);",
      errors: [{ messageId: 'fetchInEffect', data: { call: 'ky.post', hook: 'useEffect', via: '' } }],
    },
    // Only `use*` hooks in Utilities.ts are exempt; a plain component there is not, nor a hook elsewhere.
    {
      code: "export function Widget() { useEffect(() => { fetch('/x'); }, []); return null; }",
      filename: 'components/core/Utilities.ts',
      errors: [{ messageId: 'fetchInEffect' }],
    },
    {
      code: "export function useDeals() { useEffect(() => { apiRequest('/deals').then(setDeals); }, []); }",
      filename: 'hooks/useDeals.ts',
      errors: [{ messageId: 'fetchInEffect' }],
    },
  ],
});
