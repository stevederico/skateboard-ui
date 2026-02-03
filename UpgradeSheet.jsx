import { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "./shadcn/ui/drawer"
import {
  Card,
  CardContent,
} from "./shadcn/ui/card"
import { Badge } from "./shadcn/ui/badge"
import { Separator } from "./shadcn/ui/separator"
import { Button } from "./shadcn/ui/button"
import { getState } from "./Context.jsx";
import { showCheckout } from './Utilities.js';
import { Sparkles, CircleCheck } from 'lucide-react';

/**
 * Premium upgrade drawer with pricing and checkout button.
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
      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center justify-center gap-2">
            <DrawerTitle>Upgrade Plan</DrawerTitle>
            <Badge variant="secondary">{product.interval}</Badge>
          </div>
          <DrawerDescription>
            Get access to all premium features with {product.title}.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4">
          <Card>
            <CardContent className="flex flex-col items-center gap-6 py-6">
              {/* Price */}
              <div className="flex items-baseline gap-1">
                <span className="text-muted-foreground text-lg">$</span>
                <span className="text-5xl font-bold tracking-tight">{roundedPrice}</span>
                <span className="text-muted-foreground text-sm">/ month</span>
              </div>

              <Separator />

              {/* Features */}
              <div className="w-full space-y-3">
                {product.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CircleCheck className="size-5 text-primary shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <DrawerFooter>
          <Button className="w-full" size="lg" onClick={handleUpgrade}>
            <Sparkles className="size-4" />
            Upgrade to {product.title}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});

export default UpgradeSheet;
