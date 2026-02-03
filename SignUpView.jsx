import React, { useState, useEffect, useRef } from 'react';
import { cn } from "./shadcn/lib/utils"
import { Button } from "./shadcn/ui/button"
import { Input } from "./shadcn/ui/input"
import { Alert, AlertDescription } from "./shadcn/ui/alert"
import DynamicIcon from './DynamicIcon';
import { useNavigate } from 'react-router-dom';
import { getState } from "./Context.jsx";
import { getBackendURL } from './Utilities'

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
    <div className="fixed inset-0 bg-background transition-colors duration-300 overflow-auto">
      <div className={cn("flex flex-col gap-6 p-4 max-w-lg mx-auto mt-20", className)} {...props}>
      <div className="flex flex-row items-center justify-center mb-4">
        <div className="bg-app dark:bg-app dark:border dark:border-gray-700 rounded-2xl flex aspect-square size-16 items-center justify-center">
          <DynamicIcon name={constants.appIcon} size={32} color="white" strokeWidth={2} />
        </div>
        <div className="font-bold ml-3 text-5xl text-foreground">{constants.appName}</div>
      </div>

      {errorMessage !== '' && (
        <Alert variant="destructive">
          <AlertDescription className="text-center">{errorMessage}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={signUpClicked} className="flex flex-col gap-4">
        <Input
          ref={nameInputRef}
          id="name"
          placeholder="Name"
          className="py-7 px-4 placeholder:text-gray-400 rounded-lg border-2 bg-secondary dark:bg-secondary dark:border-secondary"
          style={{ fontSize: '20px' }}
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrorMessage('');
          }}
        />

        <Input
          id="email"
          type="email"
          placeholder="Email"
          className="py-7 px-4 placeholder:text-gray-400 rounded-lg border-2 bg-secondary dark:bg-secondary dark:border-secondary"
          style={{ fontSize: '20px' }}
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage('');
          }}
        />

        <div className="flex flex-col gap-1">
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className="py-7 px-4 placeholder:text-gray-400 rounded-lg border-2 bg-secondary dark:bg-secondary dark:border-secondary"
            style={{ fontSize: '20px' }}
            required
            minLength={6}
            maxLength={72}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage('');
            }}
          />
          <p className="text-xs text-muted-foreground ml-1">Minimum 6 characters</p>
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

        <div className="mt-4 text-center text-base">
          <span className="text-muted-foreground italic">Already have an account?</span>{" "}
          <Button variant="link" className="p-0 text-base h-auto" onClick={(e) => { e.preventDefault(); navigate('/signin'); }}>
            Sign In
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm max-w-none text-muted-foreground">
        By registering you agree to our
        <Button variant="link" className="p-0 text-sm h-auto ml-1" onClick={(e) => { e.preventDefault(); navigate('/terms'); }}>
          Terms of Service
        </Button>,
        <Button variant="link" className="p-0 text-sm h-auto ml-1" onClick={(e) => { e.preventDefault(); navigate('/eula'); }}>
          EULA
        </Button>,
        <Button variant="link" className="p-0 text-sm h-auto ml-1" onClick={(e) => { e.preventDefault(); navigate('/privacy'); }}>
          Privacy Policy
        </Button>
      </div>
      </div>
    </div>
  );
}
