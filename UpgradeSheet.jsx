import { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Drawer,
  DrawerContent,
} from "./shadcn/ui/drawer"
import { Button } from "./shadcn/ui/button"
import { getState } from "./Context.jsx";
import { showCheckout } from './Utilities.js';
import { Sparkles } from 'lucide-react';

/**
 * Premium upgrade bottom sheet with pricing and checkout button.
 *
 * Displays the first Stripe product from constants with price,
 * features list, and a checkout button. Controlled via ref.
 *
 * @param {Object} props
 * @param {string} [props.userEmail=""] - User email for Stripe checkout
 * @param {React.Ref} ref - Ref exposing { show, hide, open, close, toggle }
 * @returns {JSX.Element} Upgrade drawer
 *
 * @example
 * import { useRef } from 'react';
 * import UpgradeSheet from '@stevederico/skateboard-ui/UpgradeSheet';
 *
 * function MyComponent() {
 *   const upgradeRef = useRef();
 *   return (
 *     <>
 *       <button onClick={() => upgradeRef.current.show()}>Upgrade</button>
 *       <UpgradeSheet ref={upgradeRef} userEmail={user.email} />
 *     </>
 *   );
 * }
 */
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
      <DrawerContent className="bg-background w-full overflow-hidden [&_button]:cursor-pointer [&_[role=button]]:cursor-pointer" style={{ maxHeight: "85vh" }}>
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="flex-1 px-6 pt-8 pb-28">
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
          <div className="sticky bottom-0 left-0 right-0 bg-background p-6">
            <Button
              variant="gradient"
              size="cta"
              className="w-full rounded-full text-xl"
              onClick={handleUpgrade}
            >
              <span className="relative z-20 flex items-center justify-center gap-3 drop-shadow-sm animate-pulse">
                <Sparkles size={20} />
                Upgrade to {product.title}
              </span>
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
});

export default UpgradeSheet;
