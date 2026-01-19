import React from 'react';
import { cn } from "./shadcn/lib/utils"
import { Button } from "./shadcn/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "./shadcn/ui/card"
import { Input } from "./shadcn/ui/input"
import { Label } from "./shadcn/ui/label"
import DynamicIcon from './DynamicIcon';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import constants from "@/constants.json";
import { getState } from './Context.jsx';
import { getBackendURL } from './Utilities'

export default function LoginForm({
  className,
  ...props
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { state, dispatch } = getState();
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
    <div className="fixed inset-0 bg-white dark:bg-black transition-colors duration-300 overflow-auto">
      <div className={cn("flex flex-col gap-6 p-4 max-w-lg mx-auto mt-20", className)} {...props}>
      <div className="flex flex-row items-center justify-center mb-4">
        <div className="bg-app dark:bg-app dark:border dark:border-gray-700 rounded-2xl flex aspect-square size-16 items-center justify-center">
          <DynamicIcon name={constants.appIcon} size={32} color="white" strokeWidth={2} />
        </div>
        <div className="font-bold ml-3 text-5xl text-gray-900 dark:text-white">{constants.appName}</div>
      </div>

      {errorMessage !== '' && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm text-center">
          {errorMessage}
        </div>
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
          <p className="text-xs text-gray-500 dark:text-gray-400 ml-1">Minimum 6 characters</p>
        </div>

        <button
          type="submit"
          className="relative group w-full text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl backdrop-blur-sm overflow-hidden cursor-pointer"
          style={{
            backgroundImage: `linear-gradient(to bottom right,
              var(--color-app),
              oklch(from var(--color-app) calc(l - 0.05) c h),
              oklch(from var(--color-app) calc(l - 0.08) c h),
              oklch(from var(--color-app) calc(l - 0.12) c h))`,
            boxShadow: `0 25px 50px -12px color-mix(in srgb, var(--color-app) 40%, transparent 60%)`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundImage = `linear-gradient(to bottom right,
              oklch(from var(--color-app) calc(l - 0.05) c h),
              oklch(from var(--color-app) calc(l - 0.08) c h),
              oklch(from var(--color-app) calc(l - 0.12) c h),
              oklch(from var(--color-app) calc(l - 0.16) c h))`;
            e.currentTarget.style.boxShadow = '0 25px 50px -12px color-mix(in srgb, var(--color-app) 40%, transparent 60%)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundImage = `linear-gradient(to bottom right,
              var(--color-app),
              oklch(from var(--color-app) calc(l - 0.05) c h),
              oklch(from var(--color-app) calc(l - 0.08) c h),
              oklch(from var(--color-app) calc(l - 0.12) c h))`;
            e.currentTarget.style.boxShadow = '0 25px 50px -12px color-mix(in srgb, var(--color-app) 40%, transparent 60%)'
          }}
        >
          <span className="relative z-20 flex items-center justify-center gap-2 drop-shadow-sm">
            <DynamicIcon name="sparkles" size={16} color="currentColor" strokeWidth={2} className="animate-pulse" />
            Sign Up
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800 skew-x-12"></div>
        </button>

        <div className="mt-4 text-center text-base">
          <span className="text-gray-600 dark:text-gray-400 italic">Already have an account?</span>{" "}
          <span onClick={(e) => { e.preventDefault(); navigate('/signin'); }} className="cursor-pointer hover:underline text-gray-900 dark:text-white">
            Sign In
          </span>
        </div>
      </form>

      <div className="mt-6 text-center text-sm max-w-none text-gray-600 dark:text-gray-400">
        By registering you agree to our
        <span onClick={(e) => { e.preventDefault(); navigate('/terms'); }} className="ml-1 underline underline-offset-4 cursor-pointer whitespace-nowrap text-gray-900 dark:text-white">
          Terms of Service
        </span>,
        <span onClick={(e) => { e.preventDefault(); navigate('/eula'); }} className="ml-1 underline underline-offset-4 cursor-pointer whitespace-nowrap text-gray-900 dark:text-white">
          EULA
        </span>,
        <span onClick={(e) => { e.preventDefault(); navigate('/privacy'); }} className="ml-1 underline underline-offset-4 cursor-pointer whitespace-nowrap text-gray-900 dark:text-white">
          Privacy Policy
        </span>
      </div>
      </div>
    </div>
  );
}
