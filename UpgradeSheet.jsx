import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./shadcn/ui/sheet"
import constants from "@/constants.json";
import { showCheckout } from './Utilities.js';

const UpgradeSheet = forwardRef(function UpgradeSheet(props, ref) {
  const { userEmail = "" } = props;
  const [isOpen, setIsOpen] = useState(false);
  
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
    interval: "monthly"
  };

  const roundedPrice = product.price.replace(/\.\d+/, '').replace('$', '');

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="bg-background w-full overflow-y-auto [&_button]:cursor-pointer [&_[role=button]]:cursor-pointer" side="bottom" style={{ minHeight: "70vh" }}>
        <div className="h-full flex flex-col px-6 pt-8">
          <div className="flex flex-col items-center text-center space-y-12 flex-1">
            <SheetTitle className="text-3xl font-bold">Upgrade to {product.title}</SheetTitle>
            
            {/* Product information */}
            <div className="space-y-4">
              <div className="text-8xl font-bold text-app relative">
                <span className="absolute top-2 -left-2 text-4xl">$</span>{roundedPrice}
              </div>
              <div className="text-xl opacity-70">per month</div>
            </div>

            {/* Benefits */}
            <div className="space-y-8">
              <div className="text-2xl font-semibold">{product.title} Includes:</div>
              <div className="space-y-6 text-left max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-app text-white rounded-full flex items-center justify-center text-lg font-bold">✓</div>
                  <span className="text-xl">Unlimited todos</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-app text-white rounded-full flex items-center justify-center text-lg font-bold">✓</div>
                  <span className="text-xl">Unlimited messages</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-app text-white rounded-full flex items-center justify-center text-lg font-bold">✓</div>
                  <span className="text-xl">All premium features</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout button */}
          <div className="fixed bottom-0 left-0 right-0 bg-background p-6">
            <button
              onClick={handleUpgrade}
              className="w-full bg-app text-white py-4 rounded-xl text-xl font-semibold hover:bg-app/80 transition-colors"
            >
              Upgrade to {product.title}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});

export default UpgradeSheet;