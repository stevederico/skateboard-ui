import React, { useState, useEffect, useRef } from 'react';
import { cn } from "../shadcn/lib/utils"
import { Button } from "../shadcn/ui/button"
import { Input } from "../shadcn/ui/input"
import { Label } from "../shadcn/ui/label"
import { Card, CardContent, CardHeader } from "../shadcn/ui/card"
import { Alert, AlertDescription } from "../shadcn/ui/alert"
import DynamicIcon from '../core/DynamicIcon';
import { getState } from "../core/Context.jsx";
import { getBackendURL, useSafeNavigate } from '../core/Utilities'

/**
 * Sign-in form component.
 *
 * Authenticates via POST to /signin, dispatches SET_USER on success.
 * In full-page mode, navigates to /app. In embedded mode, calls onSuccess.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.embedded=false] - Render without page wrapper (for dialogs)
 * @param {function} [props.onSuccess] - Called after successful sign-in (embedded mode)
 * @param {function} [props.onSwitchMode] - Called when user clicks "Sign Up" (embedded mode)
 * @returns {JSX.Element} Sign-in form
 *
 * @example
 * // Full page
 * <Route path="/signin" element={<SignInView />} />
 *
 * @example
 * // Embedded in dialog
 * <SignInView embedded onSuccess={handleSuccess} onSwitchMode={() => setMode('signup')} />
 */
export default function LoginForm({
  className,
  embedded = false,
  onSuccess,
  onSwitchMode,
  ...props
}) {
  const { state, dispatch } = getState();
  const constants = state.constants;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useSafeNavigate();
  const emailInputRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState('')

  // Focus the first input on mount
  useEffect(() => {
    if (!email && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [])

  async function signInClicked(e) {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const uri = `${getBackendURL()}/signin`;
      const response = await fetch(uri, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'SET_USER', payload: data });
        if (embedded && onSuccess) {
          onSuccess();
        } else {
          navigate('/app');
        }
      } else {
        setErrorMessage('Invalid Credentials');
      }
    } catch (error) {
      setErrorMessage('Server Error');
    } finally {
      setIsSubmitting(false);
    }
  }

  const formContent = (
    <>
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription className="text-center">{errorMessage}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={signInClicked} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            ref={emailInputRef}
            id="email"
            type="email"
            placeholder="john@example.com"
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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          variant="gradient"
          size="cta"
          className="w-full"
          disabled={isSubmitting}
        >
          <span className="relative z-20 flex items-center justify-center gap-2 drop-shadow-sm">
            <DynamicIcon name="sparkles" size={16} color="currentColor" strokeWidth={2} className="animate-pulse" />
            {isSubmitting ? "Signing in..." : "Sign In"}
          </span>
        </Button>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account?</span>{" "}
          <Button variant="link" className="p-0 h-auto" onClick={() => embedded && onSwitchMode ? onSwitchMode() : navigate('/signup')}>
            Sign Up
          </Button>
        </div>
      </form>
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
                <DynamicIcon name={constants.appIcon} size={24} color="white" strokeWidth={2} />
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
