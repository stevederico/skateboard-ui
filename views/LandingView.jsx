import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { getState } from "../core/Context.jsx";
import DynamicIcon from '../core/DynamicIcon.jsx';
import { Sun, Moon, Check } from 'lucide-react';
import { Button } from '../shadcn/ui/button.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../shadcn/ui/card.jsx';
import { Badge } from '../shadcn/ui/badge.jsx';
import { Separator } from '../shadcn/ui/separator.jsx';

/**
 * Default landing page with hero section, features grid, pricing card,
 * CTA section, and footer.
 *
 * Reads app branding, tagline, features, pricing, and layout from constants.
 * All sections are configurable via optional constants keys with sensible defaults.
 *
 * @returns {JSX.Element} Full landing page
 *
 * @example
 * import LandingView from '@stevederico/skateboard-ui/LandingView';
 *
 * // Used automatically by createSkateboardApp, or pass as landingPage prop:
 * createSkateboardApp({ constants, appRoutes, landingPage: <LandingView /> });
 */
export default function LandingView() {
  const { state } = getState();
  const constants = state.constants;
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DynamicIcon name={constants.appIcon} size={28} className="text-primary" strokeWidth={2} />
            <span className="text-2xl font-bold text-foreground">{constants.appName}</span>
          </div>

          <div className="hidden md:flex gap-6">
            {(constants.navLinks || [
              { label: 'Features', href: '#features' },
              ...(constants.stripeProducts?.length > 0 ? [{ label: 'Pricing', href: '#pricing' }] : []),
              { label: 'Terms', href: '/terms' },
            ]).map((link, index) => (
              <a key={index} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors font-semibold">{link.label}</a>
            ))}
          </div>

          <div className="flex gap-3 items-center">
            <Button variant="outline" size="icon" onClick={() => setTheme(isDarkMode ? 'light' : 'dark')} aria-label="Toggle dark mode">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Button variant="default" onClick={() => navigate('/app')}>
              {constants.cta}
            </Button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-24 md:py-40 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-foreground leading-tight">
              {constants.tagline}
            </h1>
            <Button variant="default" size="cta" onClick={() => navigate('/app')}>
              {constants.cta}
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-muted py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-center text-4xl md:text-5xl font-bold mb-16">{constants.features?.title || 'Features'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {(constants.features?.items || []).map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader className="items-center">
                    <Badge variant="secondary" className="text-2xl mb-2 h-auto px-3 py-1">{feature.icon}</Badge>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        {constants.stripeProducts?.length > 0 && (
          <section id="pricing" className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-center text-4xl md:text-5xl font-bold mb-16">{constants.pricing?.title || 'Pricing'}</h2>
              <div className="max-w-md mx-auto">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">{constants.stripeProducts[0]?.title || 'Monthly Plan'}</CardTitle>
                    <CardDescription>per {constants.stripeProducts[0]?.interval || 'month'}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-5xl font-bold text-foreground mb-8">{constants.stripeProducts[0]?.price || '$5.00'}</div>
                    <ul className="text-left space-y-4 mb-8">
                      {(constants.stripeProducts[0]?.features || []).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check size={16} className="text-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {(constants.pricing?.extras || []).map((extra, index) => (
                        <li key={`extra-${index}`} className="flex items-center gap-2">
                          <Check size={16} className="text-primary shrink-0" />
                          {extra}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default" size="cta" className="w-full" onClick={() => navigate('/app')}>
                      {constants.cta}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <Card className="bg-primary text-primary-foreground py-16 text-center">
              <CardContent>
                <h2 className="text-4xl md:text-5xl font-bold mb-10">{constants.ctaHeading || 'Ready To Build?'}</h2>
                <Button variant="secondary" size="cta" onClick={() => navigate('/app')}>
                  {constants.cta}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <Separator className="mb-8" />
          <div className="flex justify-center gap-8 mb-6">
            {(constants.footerLinks || [
              ...(constants.privacyPolicy ? [{ label: 'Privacy', href: '/privacy' }] : []),
              ...(constants.termsOfService ? [{ label: 'Terms', href: '/terms' }] : []),
              ...(constants.EULA ? [{ label: 'EULA', href: '/eula' }] : []),
            ]).map((link, index) => (
              <a key={index} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors font-semibold">{link.label}</a>
            ))}
          </div>
          <p className="text-center text-muted-foreground">&copy; {new Date().getFullYear()} {constants.companyName}. {constants.copyrightText || 'All rights reserved.'}</p>
        </div>
      </footer>
    </div>
  );
}
