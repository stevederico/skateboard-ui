import React from 'react';
import { useNavigate } from 'react-router';
import { getState } from '../core/Context.js';
import ThemeToggle from '../ThemeToggle.js';
import Header from '../layout/Header.js';
import { Avatar, AvatarFallback } from '../../shadcn/ui/avatar.js';
import { Badge } from '../../shadcn/ui/badge.js';
import { Button } from '../../shadcn/ui/button.js';
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from '../../shadcn/ui/card.js';
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
} from '../../shadcn/ui/alert-dialog.js';
import { showCheckout, showManage, isAuthOverlayEnabled } from '../core/Utilities.js';

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
  const user = state.user;
  const subscription = user?.subscription;
  const showAuth = (constants.noLogin === false || typeof constants.noLogin === 'undefined') && user;

  function signOutClicked() {
    // Route through the canonical /signout flow (clears the server session and
    // local user, then lands on the landing page) instead of a local-only clear.
    navigate('/signout');
  }

  function getBillingDescription() {
    const status = subscription?.status;
    if (status === null || typeof status === 'undefined') return "Free plan";
    if (status === "active") return `Renews ${new Date(subscription!.expires! * 1000).toLocaleDateString('en-US')}`;
    if (status === "canceled") return `Ends ${new Date(subscription!.expires! * 1000).toLocaleDateString('en-US')}`;
    return `Plan ${status}`;
  }

  return (
    <div className="flex-1">
      <Header title="Settings">
        <ThemeToggle iconSize={20} />
      </Header>

      {/* Main content */}
      <div className="flex flex-col items-center p-4 gap-4">
        {/* Sign In prompt (shown when not authenticated and auth is enabled) */}
        {!user && constants.noLogin !== true && (
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Sign in to access your account settings.</CardDescription>
              <CardAction>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (isAuthOverlayEnabled()) {
                      dispatch({ type: 'SHOW_AUTH_OVERLAY' });
                    } else {
                      navigate('/signin');
                    }
                  }}
                >
                  Sign In
                </Button>
              </CardAction>
            </CardHeader>
          </Card>
        )}

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
                  <AlertDialogTrigger render={<Button variant="outline" size="sm">Sign Out</Button>} />
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
                    onClick={() => { showManage(subscription!.stripeID!) }}
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
