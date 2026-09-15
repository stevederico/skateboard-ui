import { useEffect, useState } from 'react';
import TextView from './TextView.js';
import { Spinner } from '../../ui/spinner.js';
import type { LegalTexts } from '../core/Utilities.js';

/** Which legal blob a route should render. */
export type LegalField = keyof LegalTexts;

export interface LegalRouteProps {
  /** Field to read from the loaded (or eager) legal texts. */
  field: LegalField;
  /** Eager text from constants — used when `loadLegal` is absent. */
  fallback?: string;
  /** Optional lazy loader; preferred over embedding legal text in the main chunk. */
  loadLegal?: () => Promise<LegalTexts>;
}

/**
 * Route element for `/terms`, `/privacy`, `/eula`, and `/subs`.
 *
 * When `loadLegal` is provided the body is fetched on first visit under a
 * spinner; otherwise `fallback` (eager constants) is rendered immediately so
 * skateboard-ui 5.0 apps keep working unchanged.
 *
 * @param props - Field name plus optional loader / eager fallback
 * @returns TextView once the document is available
 */
export default function LegalRoute({ field, fallback, loadLegal }: LegalRouteProps) {
  const [details, setDetails] = useState<string | null>(
    loadLegal ? null : (fallback ?? '')
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loadLegal) {
      setDetails(fallback ?? '');
      return;
    }
    let cancelled = false;
    loadLegal()
      .then((legal) => {
        if (cancelled) return;
        const value = legal[field];
        setDetails(typeof value === 'string' ? value : '');
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        console.error('Failed to load legal text', err);
        setError('Could not load this document. Try again.');
      });
    return () => {
      cancelled = true;
    };
  }, [field, fallback, loadLegal]);

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-sm text-muted-foreground" role="alert">
        {error}
      </div>
    );
  }

  if (details === null) {
    return (
      <div className="flex flex-1 items-center justify-center p-8" role="status" aria-label="Loading">
        <Spinner />
      </div>
    );
  }

  return <TextView details={details} />;
}
