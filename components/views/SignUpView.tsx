import React, { useState, useEffect, useRef } from 'react';
import { cn } from "../../shadcn/lib/utils.js"
import { Button } from "../../ui/button.js"
import { Input } from "../../ui/input.js"
import { Label } from "../../ui/label.js"
import { Card, CardContent, CardHeader } from "../../ui/card.js"
import { Alert, AlertDescription } from "../../ui/alert.js"
import ConstantsIcon from '../core/constantsIcon.js';
import { Sparkles } from 'lucide-react';
import { getState } from "../core/Context.js";
import { getBackendURL, useSafeNavigate, getAppKey } from '../core/Utilities.js'

interface TurnstileApi {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
}

let turnstileScript: Promise<void> | null = null;

/** Load Cloudflare's Turnstile script once. */
function loadTurnstile(): Promise<void> {
  if (!turnstileScript) {
    turnstileScript = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        turnstileScript = null;
        reject(new Error('Turnstile failed to load'));
      };
      document.head.appendChild(script);
    });
  }
  return turnstileScript;
}

/**
 * Sign-up form component.
 *
 * Creates account via POST to /signup with name, email, and password.
 * Validates password length (6-72 chars), dispatches SET_USER on success.
 * In full-page mode, navigates to /app. In embedded mode, calls onSuccess.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.embedded=false] - Render without page wrapper (for dialogs)
 * @param {function} [props.onSuccess] - Called after successful sign-up (embedded mode)
 * @param {function} [props.onSwitchMode] - Called when user clicks "Sign In" (embedded mode)
 * @returns {JSX.Element} Sign-up form
 *
 * @example
 * // Full page
 * <Route path="/signup" element={<SignUpView />} />
 *
 * @example
 * // Embedded in dialog
 * <SignUpView embedded onSuccess={handleSuccess} onSwitchMode={() => setMode('signin')} />
 */
export interface SignUpViewProps {
  className?: string;
  embedded?: boolean;
  onSuccess?: () => void;
  onSwitchMode?: () => void;
  [key: string]: any;
}

export default function SignUpView({
  className,
  embedded = false,
  onSuccess,
  onSwitchMode,
  ...props
}: SignUpViewProps) {
  const { state, dispatch } = getState();
  const constants = state.constants;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useSafeNavigate();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileIdRef = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState('');

  // Optional Cloudflare Turnstile: the backend hands out a site key from
  // GET /signup/options. No key, or no endpoint, means no widget.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${getBackendURL()}/signup/options`, { credentials: 'include' });
        if (!res.ok) return;
        const { turnstileSiteKey } = (await res.json()) as { turnstileSiteKey?: string | null };
        if (!turnstileSiteKey || cancelled) return;
        await loadTurnstile();
        const container = turnstileRef.current;
        const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
        if (!container || !api || cancelled) return;
        turnstileIdRef.current = api.render(container, {
          sitekey: turnstileSiteKey,
          appearance: 'interaction-only',
          callback: (token: string) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(''),
          'error-callback': () => setTurnstileToken(''),
        });
      } catch {
        /* Turnstile is optional; sign-up works without it. */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Focus the first input on mount
  useEffect(() => {
    if (!name && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [])

  async function signUpClicked(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSubmitting) return;
    // Client-side password validation (matches backend: 6-72 chars)
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }
    if (password.length > 72) {
      setErrorMessage('Password must be 72 characters or less');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`${getBackendURL()}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, ...(turnstileToken ? { turnstileToken } : {}) })
      });

      if (response.ok) {
        const data = await response.json();
        // Save CSRF token to localStorage for isAuthenticated() check
        const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrf_token='));
        const csrfToken = csrfCookie ? csrfCookie.split('=')[1] : data.csrfToken;
        if (csrfToken) {
          localStorage.setItem(getAppKey('csrf'), csrfToken);
        }
        dispatch({ type: 'SET_USER', payload: data });
        if (embedded && onSuccess) {
          onSuccess();
        } else {
          navigate('/app');
        }
      } else {
        const failure = (await response.json().catch(() => null)) as { error?: string } | null;
        setErrorMessage(failure?.error || 'Invalid Credentials');
        const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
        if (api && turnstileIdRef.current) {
          api.reset(turnstileIdRef.current);
          setTurnstileToken('');
        }
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setErrorMessage('Server Error')
    } finally {
      setIsSubmitting(false);
    }
  }

  const formContent = (
    <>
      {errorMessage !== '' && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription className="text-center">{errorMessage}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={signUpClicked} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            ref={nameInputRef}
            id="name"
            placeholder="John Doe"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrorMessage('');
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage('');
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            minLength={6}
            maxLength={72}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage('');
            }}
          />
          <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
        </div>

        <div ref={turnstileRef} />

        <Button
          type="submit"
          variant="gradient"
          size="cta"
          className="w-full"
          disabled={isSubmitting}
        >
          <span className="relative z-20 flex items-center justify-center gap-2 drop-shadow-sm">
            <Sparkles size={16} color="currentColor" strokeWidth={2} className="animate-pulse" />
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </span>
        </Button>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account?</span>{" "}
          <Button variant="link" className="p-0 h-auto" onClick={(e) => { e.preventDefault(); embedded && onSwitchMode ? onSwitchMode() : navigate('/signin'); }}>
            Sign In
          </Button>
        </div>
      </form>

      <div className="mt-4 text-center text-xs text-muted-foreground">
        By registering you agree to our{" "}
        <a href="/terms" className="underline underline-offset-4 hover:text-foreground">Terms of Service</a>,{" "}
        <a href="/eula" className="underline underline-offset-4 hover:text-foreground">EULA</a>,{" "}
        <a href="/privacy" className="underline underline-offset-4 hover:text-foreground">Privacy Policy</a>
      </div>
    </>
  );

  if (embedded) {
    return formContent;
  }

  return (
    <div className="fixed inset-0 bg-background overflow-auto">
      <div className={cn("flex flex-col items-center justify-center min-h-screen p-4", className)} {...props}>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="bg-app rounded-2xl flex aspect-square size-12 items-center justify-center">
                <ConstantsIcon name={constants.appIcon} size={24} color="white" strokeWidth={2} />
              </div>
              <span className="text-3xl font-bold">{constants.appName}</span>
            </div>
          </CardHeader>
          <CardContent>
            {formContent}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
