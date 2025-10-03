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
import * as LucideIcons from "lucide-react";

// Dynamic Icon Component
const DynamicIcon = ({ name, size = 24, color = 'currentColor', strokeWidth = 2, ...props }) => {
  const toPascalCase = (str) => str.split(/[-_\s]/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
  const possibleNames = [name, toPascalCase(name), name.charAt(0).toUpperCase() + name.slice(1)];
  const LucideIcon = possibleNames.find(n => LucideIcons[n]) ? LucideIcons[possibleNames.find(n => LucideIcons[n])] : null;
  return LucideIcon ? React.createElement(LucideIcon, { size, color, strokeWidth, ...props }) : null;
};
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import constants from "@/constants.json";
import { getState } from '@/context.jsx';
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

  async function signUpClicked() {
    try {
      console.log(`${getBackendURL()}/signup`);
      console.log(`name: ${name}`);
      const response = await fetch(`${getBackendURL()}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
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
        setErrorMessage('Invalid Credentials')
        console.log("error with /signup")
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setErrorMessage('Server Error')
    }
  }

  return (
    (<div className={cn("flex flex-col gap-6 p-4 md:max-w-[50%] mx-auto", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center m-2 mx-auto">
            <div className="bg-app dark:border rounded-lg flex aspect-square size-10 items-center justify-center">
              <DynamicIcon name={constants.appIcon} size={24} color="white" strokeWidth={2} />
            </div>
            <div className="font-semibold ml-2 text-4xl">{constants.appName}</div>
          </div>
          {errorMessage !== '' && (
            <div className=" text-red-500 text-center font-semibold  rounded-xl py-2">
              {errorMessage}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Smith" required value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrorMessage('');
                  }} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="mcfly@example.com" required value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage('');
                  }} />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={(e) => { e.preventDefault(); signUpClicked() }} className="w-full cursor-pointer py-6">
                  Sign Up
                </Button>
              </div>
            </div>
            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <span onClick={(e) => { e.preventDefault(); navigate('/signin'); }} className="underline underline-offset-4 cursor-pointer">
                Sign In
              </span>
            </div>

          </form>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-sm">
        By registering you agree to our
        <span onClick={(e) => { e.preventDefault(); navigate('/terms'); }} className="ml-1 underline underline-offset-4 cursor-pointer">
          Terms of Service
        </span>,
        <span onClick={(e) => { e.preventDefault(); navigate('/eula'); }} className="ml-1 underline underline-offset-4 cursor-pointer">
          EULA
        </span>,
        <span onClick={(e) => { e.preventDefault(); navigate('/privacy'); }} className="ml-1 underline underline-offset-4 cursor-pointer">
          Privacy Policy
        </span>
      </div>
    </div>)
  );
}
