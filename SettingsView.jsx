import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getState } from './Context.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { Avatar, AvatarFallback } from './shadcn/ui/avatar.jsx';
import { Badge } from './shadcn/ui/badge.jsx';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './shadcn/ui/alert-dialog.jsx';
import { showCheckout, showManage } from './Utilities';

export default function SettingsView() {
  const { state, dispatch } = getState();
  const constants = state.constants;
  const navigate = useNavigate();

  function signOutClicked() {
    dispatch({ type: 'CLEAR_USER', payload: null });
    navigate('/signin');
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h1 className="text-lg font-medium">Settings</h1>
          <ThemeToggle />
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center p-4 gap-4">
          {/* User Card */}
          {(constants.noLogin === false || typeof constants.noLogin === 'undefined') && (
            <div className="w-full max-w-lg bg-accent rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <Avatar size="lg">
                  <AvatarFallback className="bg-app dark:text-black text-white uppercase font-medium">
                    {state.user?.name?.split(' ').map(word => word[0]).join('') || "NA"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate capitalize flex items-center gap-2">
                    {state.user?.name || "No User"}
                    {state.user?.subscription?.status === "active" && (
                      <Badge variant="default">Pro</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{state.user?.email || "no@user.com"}</div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="px-4 py-2 rounded-full text-sm bg-sidebar-background border border-foreground/30 hover:border-foreground transition-all cursor-pointer">
                      Sign Out
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Sign Out</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to sign out? You'll need to sign in again to access your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={signOutClicked}>
                        Sign Out
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}

          {/* Support */}
          <div className="w-full max-w-lg bg-accent rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-1 font-medium">Support</div>
                <div className="text-sm text-muted-foreground">How can we help?</div>
              </div>
              <button
                onClick={() => { window.location.href = `mailto:${constants.companyEmail}`; }}
                className="px-4 py-2 rounded-full text-sm bg-sidebar-background border border-foreground/30 hover:border-foreground transition-all cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Billing */}
          {(constants.noLogin === false || typeof constants.noLogin === 'undefined') && (
            <div className="w-full max-w-lg bg-accent rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-1 font-medium flex items-center gap-2">
                    Billing
                    {state.user?.subscription?.status === "active" ? (
                      <Badge variant="default">Active</Badge>
                    ) : state.user?.subscription?.status === "canceled" ? (
                      <Badge variant="destructive">Canceled</Badge>
                    ) : (
                      <Badge variant="secondary">Free</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {state.user?.subscription?.status === null || typeof state.user?.subscription?.status === 'undefined'
                      ? "Free plan"
                      : ["active", "canceled"].includes(state.user?.subscription?.status)
                        ? `${state.user?.subscription?.status === "active" ? "Renews" : "Ends"} ${new Date(state.user?.subscription?.expires * 1000).toLocaleDateString('en-US')}`
                        : `Plan ${state.user?.subscription?.status}`
                    }
                  </div>
                </div>
                {state.user?.subscription?.stripeID ? (
                  <button
                    onClick={() => { showManage(state.user?.subscription?.stripeID) }}
                    className="px-4 py-2 rounded-full text-sm bg-sidebar-background border border-foreground/30 hover:border-foreground transition-all cursor-pointer"
                  >
                    Manage
                  </button>
                ) : (
                  <button
                    onClick={() => { showCheckout(state.user?.email) }}
                    className="px-5 py-2 bg-app text-white dark:text-black rounded-full text-sm font-medium hover:opacity-90 transition-all cursor-pointer"
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center pb-24 md:pb-8">
          <div className="text-xs text-muted-foreground">v{constants.version || '0.0.0'}</div>
        </div>
      </div>
    </div>
  );
}
