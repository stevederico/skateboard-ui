import { cn } from './shadcn/lib/utils.js';

/**
 * 404 page displayed for unmatched routes.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Not found message
 *
 * @example
 * import NotFound from '@stevederico/skateboard-ui/NotFound';
 *
 * <Route path="*" element={<NotFound />} />
 */
export default function NotFound({ className, ...props }) {
  return (
    <div className={cn("w-full py-6", className)} {...props}>
      <h1 className="text-center font-bold leading-tight my-6 text-4xl">Page Not Found</h1>
      <p className="text-center font-light leading-tight my-6 text-foreground text-xl">Are you sure you have the right URL?</p>
    </div>
  );
}
