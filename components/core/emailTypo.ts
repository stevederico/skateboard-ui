/**
 * Catch common typos in the domain of an email address, so a sign-up with
 * "gmail.con" or "gmal.com" can be fixed before the account is made.
 *
 * Only big mail providers are checked, and their real look-alike domains
 * (mail.com, email.com, ymail.com, ...) are left alone. Returns the fixed
 * address, or null when nothing looks wrong.
 */

const PROVIDERS = ['gmail', 'yahoo', 'hotmail', 'outlook', 'icloud', 'aol', 'live', 'msn', 'comcast', 'googlemail', 'protonmail'];

/** Real domains that sit one or two letters from a provider. */
const REAL = new Set([
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'live.com', 'msn.com',
  'comcast.net', 'googlemail.com', 'protonmail.com', 'mail.com', 'email.com', 'ymail.com', 'gmx.com',
  'me.com', 'mac.com', 'aim.com', 'proton.me', 'rocketmail.com', 'hushmail.com', 'fastmail.com',
  'foxmail.com', 'cloud.com', 'qmail.com', 'homemail.com', 'hicloud.com', 'onmail.com', 'yopmail.com',
]);

/** Typed endings that almost always meant ".com". */
const COM_TYPOS = new Set(['con', 'cmo', 'comm', 'come', 'coom', 'cm', 'om', 'co', 'vom', 'xom', 'cim', 'cpm', 'ocm', 'c', 'cok', 'col']);

/** Edit distance where swapping two neighbouring letters counts as one edit. */
function distance(a: string, b: string): number {
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

function home(provider: string): string {
  return provider === 'comcast' ? 'comcast.net' : `${provider}.com`;
}

/** The provider a mistyped name most likely meant, or null when none or more than one fit. */
function closest(name: string): string | null {
  if (PROVIDERS.includes(name)) return name;
  const near: string[] = [];
  for (const p of PROVIDERS) {
    // Short names (aol, msn, live) only match exactly; too many real look-alikes.
    if (p.length < 5) continue;
    const limit = p.length >= 7 ? 2 : 1;
    if (distance(name, p) <= limit) near.push(p);
  }
  // "hmail" could be gmail or hotmail: better no guess than a wrong one.
  return near.length === 1 ? near[0] : null;
}

export function suggestEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  const at = email.lastIndexOf('@');
  if (at < 1 || at === email.length - 1) return null;
  // Keep the name part as typed; only the domain is lowercased.
  const local = raw.trim().slice(0, at);
  const domain = email.slice(at + 1);
  if (REAL.has(domain)) return null;

  // "gmailcom": the dot is missing.
  for (const p of PROVIDERS) {
    if (domain === `${p}com`) return `${local}@${p}.com`;
  }

  // "321yahoo.com": characters landed after the @ instead of before it.
  for (const p of PROVIDERS) {
    const tail = home(p);
    const extra = domain.slice(0, -tail.length);
    if (domain.endsWith(tail) && /^[0-9._-]+$/.test(extra)) {
      return `${local}${extra.replace(/[.]+$/, '')}@${tail}`;
    }
  }

  const dot = domain.indexOf('.');
  if (dot < 1) return null;
  const name = domain.slice(0, dot);
  const tld = domain.slice(dot + 1);
  // "email.con": a real ".com" domain with a typo in the ending only.
  if (REAL.has(`${name}.com`) && COM_TYPOS.has(tld)) return `${local}@${name}.com`;
  const provider = closest(name);
  if (!provider) return null;
  const fixed = home(provider);
  const wantTld = fixed.slice(fixed.indexOf('.') + 1);
  // Only fix a ".com" provider when the ending is ".com" or a typo of it;
  // "yahoo.fr" and "outlook.es" are real.
  const tldOk = tld === wantTld || (wantTld === 'com' && COM_TYPOS.has(tld)) || (wantTld === 'net' && ['ner', 'nte', 'nt', 'met', 'bet'].includes(tld));
  if (!tldOk) return null;
  const suggestion = `${local}@${fixed}`;
  return suggestion === email ? null : suggestion;
}
