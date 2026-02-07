import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getState } from '../core/Context.jsx';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Avatar, AvatarFallback } from '../shadcn/ui/avatar.jsx';
import { Badge } from '../shadcn/ui/badge.jsx';
import { Button } from '../shadcn/ui/button.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from '../shadcn/ui/card.jsx';
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
} from '../shadcn/ui/alert-dialog.jsx';
import { showCheckout, showManage } from '../core/Utilities';

/**
 * User settings page with account info, sign out, support contact,
 * and billing management.
 *
 * Shows subscription status and provides upgrade/manage buttons
 * for Stripe billing. Hidden when constants.noLogin is true.
 *
 * @returns {JSX.Element} Settings page
 *
 * @example
 * import SettingsView from '@stevederico/skateboard-ui/SettingsView';
 *
 * <Route path="settings" element={<SettingsView />} />
 */
export default function SettingsView() {
  const { state, dispatch } = getState();
  const constants = state.constants;
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const user = state.user;
  const subscription = user?.subscription;
  const showAuth = (constants.noLogin === false || typeof constants.noLogin === 'undefined') && user;

  function signOutClicked() {
    dispatch({ type: 'CLEAR_USER', payload: null });
    navigate('/signin');
  }

  function getBillingDescription() {
    const status = subscription?.status;
    if (status === null || typeof status === 'undefined') return "Free plan";
    if (status === "active") return `Renews ${new Date(subscription.expires * 1000).toLocaleDateString('en-US')}`;
    if (status === "canceled") return `Ends ${new Date(subscription.expires * 1000).toLocaleDateString('en-US')}`;
    return `Plan ${status}`;
  }

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h1 className="text-base font-medium">Settings</h1>
        <Button variant="ghost" size="icon" onClick={() => setTheme(isDarkMode ? 'light' : 'dark')} aria-label="Toggle dark mode">
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center p-4 gap-4">
        {/* Account */}
        {showAuth && (
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-app text-white uppercase font-medium text-sm">
                    {user.name?.split(' ').map(w => w[0]).join('') || "NA"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 capitalize">
                    {user.name || "No User"}
                    {subscription?.status === "active" && <Badge>Pro</Badge>}
                  </div>
                  <CardDescription className="font-normal normal-case">{user.email || "no@user.com"}</CardDescription>
                </div>
              </CardTitle>
              <CardAction>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">Sign Out</Button>
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
                      <AlertDialogAction onClick={signOutClicked}>Sign Out</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardAction>
            </CardHeader>
          </Card>
        )}

        {/* Support */}
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Support</CardTitle>
            <CardDescription>How can we help?</CardDescription>
            <CardAction>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { window.location.href = `mailto:${constants.companyEmail}`; }}
              >
                Contact
              </Button>
            </CardAction>
          </CardHeader>
        </Card>

        {/* Billing */}
        {showAuth && (
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Billing
                {subscription?.status === "active" ? (
                  <Badge>Active</Badge>
                ) : subscription?.status === "canceled" ? (
                  <Badge variant="destructive">Canceled</Badge>
                ) : (
                  <Badge variant="secondary">Free</Badge>
                )}
              </CardTitle>
              <CardDescription>{getBillingDescription()}</CardDescription>
              <CardAction>
                {subscription?.stripeID ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { showManage(subscription.stripeID) }}
                  >
                    Manage
                  </Button>
                ) : (
                  <Button
                    variant="gradient"
                    size="sm"
                    onClick={() => { showCheckout(user.email) }}
                  >
                    Subscribe
                  </Button>
                )}
              </CardAction>
            </CardHeader>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center pb-24 md:pb-8">
        <p className="text-xs text-muted-foreground">v{constants.version || '0.0.0'}</p>
      </div>
    </div>
  );
}
