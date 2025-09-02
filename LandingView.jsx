import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import constants from "@/constants.json";
import * as LucideIcons from "lucide-react";

// Dynamic Icon Component
const DynamicIcon = ({ name, size = 24, color = 'currentColor', strokeWidth = 2, ...props }) => {
  const toPascalCase = (str) => str.split(/[-_\s]/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
  const possibleNames = [name, toPascalCase(name), name.charAt(0).toUpperCase() + name.slice(1)];
  const LucideIcon = possibleNames.find(n => LucideIcons[n]) ? LucideIcons[possibleNames.find(n => LucideIcons[n])] : null;
  return LucideIcon ? React.createElement(LucideIcon, { size, color, strokeWidth, ...props }) : null;
};

export default function LandingView() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode !== null) {
      setIsDarkMode(savedMode === 'true');
    } else {
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderHeroContent = () => {
    return (
      <div className="max-w-7xl mx-auto px-8 md:px-6">
        <div className="relative min-h-[120px] md:h-[140px] flex flex-col items-center justify-center py-8">
          {/* CTA in Hero */}
          <div className="text-center">
            <button 
              onClick={() => navigate('/app')}
              className="relative group bg-gradient-to-br text-white px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 rounded-2xl font-semibold text-base sm:text-lg md:text-xl lg:text-2xl transition-all duration-300 shadow-xl backdrop-blur-sm overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to bottom right, 
                  var(--color-app), 
                  oklch(from var(--color-app) calc(l - 0.05) c h), 
                  oklch(from var(--color-app) calc(l - 0.08) c h), 
                  oklch(from var(--color-app) calc(l - 0.12) c h))`,
                boxShadow: `0 25px 50px -12px var(--shadow-color)`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundImage = `linear-gradient(to bottom right, 
                  oklch(from var(--color-app) calc(l - 0.05) c h), 
                  oklch(from var(--color-app) calc(l - 0.08) c h), 
                  oklch(from var(--color-app) calc(l - 0.12) c h), 
                  oklch(from var(--color-app) calc(l - 0.16) c h))`;
                e.currentTarget.style.boxShadow = '0 25px 50px -12px var(--shadow-color)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundImage = `linear-gradient(to bottom right, 
                  var(--color-app), 
                  oklch(from var(--color-app) calc(l - 0.05) c h), 
                  oklch(from var(--color-app) calc(l - 0.08) c h), 
                  oklch(from var(--color-app) calc(l - 0.12) c h))`;
                e.currentTarget.style.boxShadow = '0 25px 50px -12px var(--shadow-color)'
              }}
            >
              <span className="relative z-20 flex items-center justify-center gap-3 md:gap-4 drop-shadow-sm">
                <DynamicIcon name="sparkles" size={20} color="currentColor" strokeWidth={2} className="animate-pulse -ml-1 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                {constants.cta}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800 skew-x-12"></div>
            </button>
          </div>
        </div>

        <style jsx>{`
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
      className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative transition-colors duration-300"
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
        <nav className="max-w-6xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg px-6 py-4 flex justify-between items-center transition-colors duration-300">
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
            <li><a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-semibold">Features</a></li>
            <li><a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-semibold">Pricing</a></li>
            <li><a href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-semibold">Terms</a></li>
          </ul>
          
          <div className="flex gap-3 items-center">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer"
              aria-label="Toggle dark mode"
            >
              <DynamicIcon 
                name={isDarkMode ? "sun" : "moon"} 
                size={18} 
                color="currentColor" 
                strokeWidth={2}
                className="text-gray-600 dark:text-gray-300"
              />
            </button>
            
            <button 
              onClick={() => navigate('/app')}
              className="relative group bg-gradient-to-br text-white px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg backdrop-blur-sm overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to bottom right, 
                  var(--color-app), 
                  oklch(from var(--color-app) calc(l - 0.05) c h), 
                  oklch(from var(--color-app) calc(l - 0.08) c h), 
                  oklch(from var(--color-app) calc(l - 0.12) c h))`,
                boxShadow: `0 8px 32px var(--shadow-color)`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundImage = `linear-gradient(to bottom right, 
                  oklch(from var(--color-app) calc(l - 0.05) c h), 
                  oklch(from var(--color-app) calc(l - 0.08) c h), 
                  oklch(from var(--color-app) calc(l - 0.12) c h), 
                  oklch(from var(--color-app) calc(l - 0.16) c h))`;
                e.currentTarget.style.boxShadow = '0 8px 32px var(--shadow-color)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundImage = `linear-gradient(to bottom right, 
                  var(--color-app), 
                  oklch(from var(--color-app) calc(l - 0.05) c h), 
                  oklch(from var(--color-app) calc(l - 0.08) c h), 
                  oklch(from var(--color-app) calc(l - 0.12) c h))`;
                e.currentTarget.style.boxShadow = '0 8px 32px var(--shadow-color)'
              }}
            >
              <span className="relative z-20 flex items-center justify-center gap-2 drop-shadow-sm">
                <DynamicIcon name="sparkles" size={14} color="currentColor" strokeWidth={2} className="animate-pulse" />
                {constants.cta}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800 skew-x-12"></div>
            </button>
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
        <section id="features" className="bg-slate-100 dark:bg-gray-800 py-12 md:py-20 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-center text-4xl md:text-5xl font-bold mb-16 text-gray-900 dark:text-white">{constants.features.title}</h2>
            
            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {constants.features.items.map((feature, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg text-center transition-colors duration-300">
                  <div className="text-4xl mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
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
            <h2 className="text-center text-4xl md:text-5xl font-bold mb-16 text-gray-900 dark:text-white">Pricing</h2>
            <div className="max-w-md mx-auto">
              <div 
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg border-2 transition-colors duration-300"
                style={{
                  borderColor: isDarkMode 
                    ? `color-mix(in srgb, var(--color-app) 40%, transparent 60%)`
                    : `color-mix(in srgb, var(--color-app) 20%, transparent 80%)`
                }}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{constants.stripeProducts[0]?.title || 'Monthly Plan'}</h3>
                  <div 
                    className="text-5xl font-bold mb-2"
                    style={{ color: 'var(--color-app)' }}
                  >{constants.stripeProducts[0]?.price || '$5.00'}</div>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">per month</p>
                  <ul className="text-left space-y-4 mb-8">
                    {constants.features.items.map((feature, index) => (
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
                  <button 
                    onClick={() => navigate('/app')}
                    className="relative group w-full bg-gradient-to-br text-white text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl backdrop-blur-sm overflow-hidden cursor-pointer"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, 
                        var(--color-app), 
                        oklch(from var(--color-app) calc(l - 0.05) c h), 
                        oklch(from var(--color-app) calc(l - 0.08) c h), 
                        oklch(from var(--color-app) calc(l - 0.12) c h))`,
                      boxShadow: `0 25px 50px -12px var(--shadow-color)`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundImage = `linear-gradient(to bottom right, 
                        oklch(from var(--color-app) calc(l - 0.05) c h), 
                        oklch(from var(--color-app) calc(l - 0.08) c h), 
                        oklch(from var(--color-app) calc(l - 0.12) c h), 
                        oklch(from var(--color-app) calc(l - 0.16) c h))`;
                      e.currentTarget.style.boxShadow = '0 25px 50px -12px var(--shadow-color)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundImage = `linear-gradient(to bottom right, 
                        var(--color-app), 
                        oklch(from var(--color-app) calc(l - 0.05) c h), 
                        oklch(from var(--color-app) calc(l - 0.08) c h), 
                        oklch(from var(--color-app) calc(l - 0.12) c h))`;
                      e.currentTarget.style.boxShadow = '0 25px 50px -12px var(--shadow-color)'
                    }}
                  >
                    <span className="relative z-20 flex items-center justify-center gap-2 drop-shadow-sm">
                      <DynamicIcon name="sparkles" size={16} color="currentColor" strokeWidth={2} className="animate-pulse" />
                      {constants.cta}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800 skew-x-12"></div>
                  </button>
                </div>
              </div>
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
              <button 
                onClick={() => navigate('/app')}
                className="relative group bg-white hover:bg-gray-50 text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-white/40 backdrop-blur-sm overflow-hidden border-2 border-white/20 cursor-pointer"
                style={{ color: 'var(--color-app)' }}
              >
                <span className="relative z-20 flex items-center justify-center gap-2 drop-shadow-sm">
                  <DynamicIcon name="sparkles" size={16} color="currentColor" strokeWidth={2} className="animate-pulse" />
                  {constants.cta}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800 skew-x-12"></div>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-10 text-center text-gray-600 dark:text-gray-300 relative z-10 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-8 mb-6">
            <a href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors font-semibold">Privacy</a>
            <a href="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors font-semibold">Terms</a>
            <a href="/eula" className="hover:text-gray-900 dark:hover:text-white transition-colors font-semibold">EULA</a>
          </div>
          <p>&copy; {new Date().getFullYear()} {constants.companyName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}