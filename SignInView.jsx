import React from 'react';
import { cn } from "./shadcn/lib/utils"
import { Button } from "./shadcn/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./shadcn/ui/card"
import { Input } from "./shadcn/ui/input"
import { Label } from "./shadcn/ui/label"
import * as LucideIcons from "lucide-react";

// Dynamic Icon Component
const DynamicIcon = ({ name, size = 24, color = 'currentColor', strokeWidth = 2, ...props }) => {
  const toPascalCase = (str) => str.split(/[-_\s]/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
  const possibleNames = [name, toPascalCase(name), name.charAt(0).toUpperCase() + name.slice(1)];
  const LucideIcon = possibleNames.find(n => LucideIcons[n]) ? LucideIcons[possibleNames.find(n => LucideIcons[n])] : null;
  return LucideIcon ? React.createElement(LucideIcon, { size, color, strokeWidth, ...props }) : null;
};

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getState } from './Context.jsx';
import constants from "@/constants.json";
import { getBackendURL } from './Utilities'

export default function LoginForm({
  className,
  ...props
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = getState();
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
      console.log("URI ", uri)
      const response = await fetch(uri, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        // Store CSRF token in localStorage with app-specific key
        if (data.csrfToken) {
          const appName = constants.appName || 'skateboard';
          const csrfKey = `${appName.toLowerCase().replace(/\s+/g, '-')}_csrf`;
          localStorage.setItem(csrfKey, data.csrfToken);
        }
        dispatch({ type: 'SET_USER', payload: data });
        navigate('/app');
      } else {
        setErrorMessage('Invalid Credentials');
      }
    } catch (error) {
      setErrorMessage('Server Error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className={cn("flex flex-col gap-6 p-4 max-w-lg mx-auto mt-20", className)} {...props}>
      <div className="flex flex-row items-center justify-center mb-4">
        <div className="bg-app dark:bg-app dark:border dark:border-gray-700 rounded-2xl flex aspect-square size-16 items-center justify-center">
          <DynamicIcon name={constants.appIcon} size={32} color="white" strokeWidth={2} />
        </div>
        <div className="font-bold ml-3 text-5xl text-gray-900 dark:text-white">{constants.appName}</div>
      </div>

      {errorMessage && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={signInClicked} className="flex flex-col gap-4">
        <Input
          ref={emailInputRef}
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

        <Input
          id="password"
          type="password"
          placeholder="Password"
          className="py-7 px-4 placeholder:text-gray-400 rounded-lg border-2 bg-secondary dark:bg-secondary dark:border-secondary"
          style={{ fontSize: '20px' }}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="relative group w-full text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl backdrop-blur-sm overflow-hidden cursor-pointer"
          disabled={isSubmitting}
          style={{
            backgroundImage: `linear-gradient(to bottom right,
              var(--color-app),
              oklch(from var(--color-app) calc(l - 0.05) c h),
              oklch(from var(--color-app) calc(l - 0.08) c h),
              oklch(from var(--color-app) calc(l - 0.12) c h))`,
            boxShadow: `0 25px 50px -12px color-mix(in srgb, var(--color-app) 40%, transparent 60%)`
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundImage = `linear-gradient(to bottom right,
                oklch(from var(--color-app) calc(l - 0.05) c h),
                oklch(from var(--color-app) calc(l - 0.08) c h),
                oklch(from var(--color-app) calc(l - 0.12) c h),
                oklch(from var(--color-app) calc(l - 0.16) c h))`;
              e.currentTarget.style.boxShadow = '0 25px 50px -12px color-mix(in srgb, var(--color-app) 40%, transparent 60%)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundImage = `linear-gradient(to bottom right,
                var(--color-app),
                oklch(from var(--color-app) calc(l - 0.05) c h),
                oklch(from var(--color-app) calc(l - 0.08) c h),
                oklch(from var(--color-app) calc(l - 0.12) c h))`;
              e.currentTarget.style.boxShadow = '0 25px 50px -12px color-mix(in srgb, var(--color-app) 40%, transparent 60%)'
            }
          }}
        >
          <span className="relative z-20 flex items-center justify-center gap-2 drop-shadow-sm">
            <DynamicIcon name="sparkles" size={16} color="currentColor" strokeWidth={2} className="animate-pulse" />
            {isSubmitting ? "Signing in..." : "Sign In"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800 skew-x-12"></div>
        </button>

        <div className="mt-4 text-center text-base">
          <span className="text-gray-600 dark:text-gray-400 italic">Don't have an account?</span>{" "}
          <span onClick={() => navigate('/signup')} className="cursor-pointer hover:underline text-gray-900 dark:text-white">
            Sign Up
          </span>
        </div>
      </form>
      </div>
    </div>
  );
}
