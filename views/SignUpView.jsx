import React, { useState, useEffect, useRef } from 'react';
import { cn } from "../shadcn/lib/utils"
import { Button } from "../shadcn/ui/button"
import { Input } from "../shadcn/ui/input"
import { Label } from "../shadcn/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../shadcn/ui/card"
import { Alert, AlertDescription } from "../shadcn/ui/alert"
import DynamicIcon from '../core/DynamicIcon';
import { useNavigate } from 'react-router-dom';
import { getState } from "../core/Context.jsx";
import { getBackendURL } from '../core/Utilities'

/**
 * Full-page sign-up form.
 *
 * Creates account via POST to /signup with name, email, and password.
 * Validates password length (6-72 chars), dispatches SET_USER on success,
 * and navigates to /app. Includes legal agreement links.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Sign-up page
 *
 * @example
 * import SignUpView from '@stevederico/skateboard-ui/SignUpView';
 *
 * <Route path="/signup" element={<SignUpView />} />
 */
export default function LoginForm({
  className,
  ...props
}) {
  const { state, dispatch } = getState();
  const constants = state.constants;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('')
  const nameInputRef = useRef(null);

  // Focus the first input on mount
  useEffect(() => {
    if (!name && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [])

  async function signUpClicked(e) {
    e.preventDefault();
    // Client-side password validation (matches backend: 6-72 chars)
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }
    if (password.length > 72) {
      setErrorMessage('Password must be 72 characters or less');
      return;
    }
    try {
      const response = await fetch(`${getBackendURL()}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      if (response.ok) {
        const data = await response.json();
        // Save CSRF token to localStorage for isAuthenticated() check
        const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrf_token='));
        const csrfToken = csrfCookie ? csrfCookie.split('=')[1] : data.csrfToken;
        if (csrfToken) {
          const appName = constants.appName || 'skateboard';
          const csrfKey = `${appName.toLowerCase().replace(/\s+/g, '-')}_csrf`;
          localStorage.setItem(csrfKey, csrfToken);
        }
        dispatch({ type: 'SET_USER', payload: data });
        navigate('/app');
      } else {
        setErrorMessage('Invalid Credentials')
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setErrorMessage('Server Error')
    }
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
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
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

              <Button
                type="submit"
                variant="gradient"
                size="cta"
                className="w-full"
              >
                <span className="relative z-20 flex items-center justify-center gap-2 drop-shadow-sm">
                  <DynamicIcon name="sparkles" size={16} color="currentColor" strokeWidth={2} className="animate-pulse" />
                  Sign Up
                </span>
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account?</span>{" "}
                <Button variant="link" className="p-0 h-auto" onClick={(e) => { e.preventDefault(); navigate('/signin'); }}>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
