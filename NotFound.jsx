import { cn } from './shadcn/lib/utils.js';
import { Card, CardHeader, CardTitle, CardDescription } from './shadcn/ui/card.jsx';

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
    <div className={cn("flex items-center justify-center min-h-screen bg-background p-4", className)} {...props}>
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <CardTitle className="text-4xl">404</CardTitle>
          <CardDescription>Page not found. Are you sure you have the right URL?</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
