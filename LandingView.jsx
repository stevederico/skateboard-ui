import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { getState } from "./Context.jsx";
import DynamicIcon from './DynamicIcon.jsx';
import { Sun, Moon } from 'lucide-react';
import { Button } from './shadcn/ui/button.jsx';
import { Card, CardContent } from './shadcn/ui/card.jsx';

/**
 * Default landing page with hero section, features grid, pricing card,
 * CTA section, and footer.
 *
 * Reads app branding, tagline, features, and pricing from constants.
 * Uses the app's --color-app CSS variable for theming.
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

  const renderHeroContent = () => {
    return (
      <div className="max-w-7xl mx-auto px-8 md:px-6">
        <div className="relative min-h-[120px] md:h-[140px] flex flex-col items-center justify-center py-8">
          {/* CTA in Hero */}
          <div className="text-center">
            <Button
              variant="gradient"
              size="cta"
              className="px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 rounded-2xl text-base sm:text-lg md:text-xl lg:text-2xl h-auto"
              onClick={() => navigate('/app')}
            >
              <span className="relative z-20 flex items-center justify-center gap-3 md:gap-4 drop-shadow-sm">
                <DynamicIcon name="sparkles" size={20} color="currentColor" strokeWidth={2} className="animate-pulse -ml-1 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                {constants.cta}
              </span>
            </Button>
          </div>
        </div>

        <style>{`
          @keyframes springOutLong {
            0% {
              opacity: 0;
              transform: translateY(-60px) scale(0.1);
            }
            50% {
              opacity: 1;
              transform: translateY(0) scale(1.2);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes rollingGrid {
            0% {
              transform: rotateX(75deg) translateZ(-100px) scale(3) translateY(0px);
            }
            100% {
              transform: rotateX(75deg) translateZ(-100px) scale(3) translateY(-300px);
            }
          }

          .perspective-grid-container {
            perspective: 800px;
            overflow: hidden;
            z-index: 1;
            transform: translateY(-150px);
            pointer-events: none;
          }

          .perspective-grid {
            position: absolute;
            top: 0;
            left: -200vw;
            right: -200vw;
            bottom: 0;
            width: 500vw;
            background-image:
              linear-gradient(color-mix(in srgb, var(--color-app) 50%, transparent 50%) 5px, transparent 5px),
              linear-gradient(90deg, color-mix(in srgb, var(--color-app) 40%, transparent 60%) 5px, transparent 5px);
            background-size: 300px 300px;
            animation: rollingGrid 6s linear infinite;
            transform: none;
            transform-origin: center bottom;
            mask-image: linear-gradient(to bottom,
              transparent 0%,
              rgba(0,0,0,0.1) 20%,
              rgba(0,0,0,0.8) 40%,
              rgba(0,0,0,0.3) 80%,
              transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom,
              transparent 0%,
              rgba(0,0,0,0.1) 20%,
              rgba(0,0,0,0.8) 40%,
              rgba(0,0,0,0.3) 80%,
              transparent 100%);
            height: 300%;
          }
        `}</style>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground relative transition-colors duration-300"
      style={{
        '--gradient-from': 'color-mix(in srgb, var(--color-app) 90%, white 10%)',
        '--gradient-via': 'var(--color-app)',
        '--gradient-to': 'oklch(from var(--color-app) calc(l - 0.1) calc(c * 1.2) calc(h + 30))',
        '--gradient-light': 'color-mix(in srgb, var(--color-app) 10%, white 90%)',
        '--shadow-color': 'color-mix(in srgb, var(--color-app) 40%, transparent 60%)',
        '--text-gradient-from': 'oklch(from var(--color-app) calc(l - 0.05) c h)',
        '--text-gradient-to': 'oklch(from var(--color-app) l c calc(h + 30))'
      }}
    >

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(color-mix(in srgb, var(--color-app) 2%, transparent 98%) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--color-app) 2%, transparent 98%) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-4 px-6">
        <nav className="max-w-6xl mx-auto bg-background/80 backdrop-blur-sm border border-border rounded-2xl shadow-lg px-6 py-4 flex justify-between items-center transition-colors duration-300">
          <div className="flex items-center gap-2">
            <DynamicIcon name={constants.appIcon} size={28} color="var(--color-app)" strokeWidth={2} />
            <div
              className="text-2xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, var(--text-gradient-from), var(--text-gradient-to))`
              }}
            >
              {constants.appName}
            </div>
          </div>

          <ul className="hidden md:flex gap-8 list-none">
            <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors font-semibold">Features</a></li>
            <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors font-semibold">Pricing</a></li>
            <li><a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors font-semibold">Terms</a></li>
          </ul>

          <div className="flex gap-3 items-center">
            {/* Dark Mode Toggle */}
            <Button variant="outline" size="icon" onClick={() => setTheme(isDarkMode ? 'light' : 'dark')} aria-label="Toggle dark mode">
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            <Button
              variant="gradient"
              className="rounded-xl text-sm px-4 py-3 h-auto"
              onClick={() => navigate('/app')}
            >
              <span className="relative z-20 flex items-center justify-center gap-2 drop-shadow-sm">
                <DynamicIcon name="sparkles" size={14} color="currentColor" strokeWidth={2} className="animate-pulse" />
                {constants.cta}
              </span>
            </Button>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="text-center flex flex-col justify-start relative pt-48 pb-12 md:pt-56 md:min-h-screen md:pb-0">
          {/* Perspective Grid Background */}
          <div className="absolute inset-0 perspective-grid-container hidden md:block">
            <div className="perspective-grid"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-20 flex flex-col justify-center min-h-[30vh] md:min-h-[40vh]">
            <div className="max-w-4xl mx-auto mb-12">
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-0 leading-tight bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, var(--text-gradient-from), var(--text-gradient-to))`
                }}
              >
                {constants.tagline}
              </h1>
            </div>

            {/* Hero Content */}
            {renderHeroContent()}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-secondary py-12 md:py-20 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-center text-4xl md:text-5xl font-bold mb-16">{constants.features?.title || 'Features'}</h2>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {(constants.features?.items || []).map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="flex flex-col items-center gap-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="py-20 transition-colors duration-300"
          style={{
            background: isDarkMode
              ? 'linear-gradient(135deg, oklch(0.25 0 0), oklch(0.2 0 0))'
              : `linear-gradient(135deg, color-mix(in srgb, var(--gradient-light) 80%, white 20%), color-mix(in srgb, var(--gradient-light) 60%, white 40%))`
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-center text-4xl md:text-5xl font-bold mb-16">Pricing</h2>
            <div className="max-w-md mx-auto">
              <Card
                className="border-2 transition-colors duration-300"
                style={{
                  borderColor: isDarkMode
                    ? `color-mix(in srgb, var(--color-app) 40%, transparent 60%)`
                    : `color-mix(in srgb, var(--color-app) 20%, transparent 80%)`
                }}
              >
                <CardContent className="text-center">
                  <h3 className="text-2xl font-bold mb-4">{constants.stripeProducts[0]?.title || 'Monthly Plan'}</h3>
                  <div
                    className="text-5xl font-bold mb-2"
                    style={{ color: 'var(--color-app)' }}
                  >{constants.stripeProducts[0]?.price || '$5.00'}</div>
                  <p className="text-muted-foreground mb-8">per month</p>
                  <ul className="text-left space-y-4 mb-8">
                    {(constants.features?.items || []).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        ✅ {feature.title}
                      </li>
                    ))}
                    <li className="flex items-center">
                      ✅ Priority Customer Support
                    </li>
                    <li className="flex items-center">
                      ✅ Cancel anytime
                    </li>
                  </ul>
                  <Button
                    variant="gradient"
                    size="cta"
                    className="w-full"
                    onClick={() => navigate('/app')}
                  >
                    <span className="relative z-20 flex items-center justify-center gap-2 drop-shadow-sm">
                      <DynamicIcon name="sparkles" size={16} color="currentColor" strokeWidth={2} className="animate-pulse" />
                      {constants.cta}
                    </span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div
              className="py-16 text-center rounded-3xl text-white"
              style={{
                background: `linear-gradient(90deg, var(--gradient-from), var(--gradient-to))`
              }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-10">Ready To Build?</h2>
              <Button
                variant="outline"
                size="cta"
                className="bg-white hover:bg-gray-50 border-2 border-white/20 shadow-xl hover:shadow-white/40"
                style={{ color: 'var(--color-app)' }}
                onClick={() => navigate('/app')}
              >
                <span className="relative z-20 flex items-center justify-center gap-2 drop-shadow-sm">
                  <DynamicIcon name="sparkles" size={16} color="currentColor" strokeWidth={2} className="animate-pulse" />
                  {constants.cta}
                </span>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-10 text-center text-muted-foreground relative z-10 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-8 mb-6">
            <a href="/privacy" className="hover:text-foreground transition-colors font-semibold">Privacy</a>
            <a href="/terms" className="hover:text-foreground transition-colors font-semibold">Terms</a>
            <a href="/eula" className="hover:text-foreground transition-colors font-semibold">EULA</a>
          </div>
          <p>&copy; {new Date().getFullYear()} {constants.companyName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
