import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./shadcn/ui/drawer"
import { getState } from "./Context.jsx";
import { showCheckout } from './Utilities.js';
import { Sparkles } from 'lucide-react';

const UpgradeSheet = forwardRef(function UpgradeSheet(props, ref) {
  const { userEmail = "" } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { state } = getState();
  const constants = state.constants;

  useImperativeHandle(ref, () => ({
    show: () => setIsOpen(true),
    hide: () => setIsOpen(false),
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev)
  }));

  const handleUpgrade = () => {
    setIsOpen(false);
    showCheckout(userEmail);
  };

  const product = constants.stripeProducts?.[0] || {
    price: "$5.00",
    title: "Monthly Plan",
    interval: "monthly",
    features: [
      "Unlimited todos",
      "Unlimited messages", 
      "All premium features"
    ]
  };

  const roundedPrice = product.price.replace(/\.\d+/, '').replace('$', '');

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="bg-background w-full overflow-y-auto [&_button]:cursor-pointer [&_[role=button]]:cursor-pointer" style={{ minHeight: "70vh" }}>
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto px-6 pt-8 pb-32">
            <div className="flex flex-col items-center text-center space-y-8 md:space-y-16">
              
              {/* Product information */}
              <div className="space-y-4">
                <div className="text-[8rem] md:text-[14rem] font-bold text-app relative leading-none">
                  <span className="absolute top-3 -left-2 text-3xl md:top-6 md:-left-6 md:text-5xl">$</span>{roundedPrice}
                </div>
                <div className="text-2xl md:text-4xl opacity-70">per month</div>
              </div>

              {/* Benefits */}
              <div className="space-y-8">
                <div className="text-2xl font-semibold">{product.title} Includes:</div>
                <div className="space-y-6 text-left max-w-xs">
                  {product.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-app text-white rounded-full flex items-center justify-center text-lg font-bold">✓</div>
                      <span className="text-xl">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Checkout button */}
          <div className="fixed bottom-0 left-0 right-0 bg-background p-6">
            <button
              onClick={handleUpgrade}
              className="relative group w-full bg-gradient-to-br text-white px-8 py-4 rounded-full font-semibold text-xl transition-all duration-300 shadow-xl backdrop-blur-sm overflow-hidden cursor-pointer"
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
              <span className="relative z-20 flex items-center justify-center gap-3 drop-shadow-sm animate-pulse">
                <Sparkles size={20} />
                Upgrade to {product.title}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-800 skew-x-12"></div>
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
});

export default UpgradeSheet;