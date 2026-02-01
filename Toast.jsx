import { Toaster } from './shadcn/ui/sonner.jsx';

/**
 * Global toast notification container.
 *
 * Renders the Sonner Toaster in the top-right with rich colors
 * and close buttons enabled. Rendered once at the app root.
 *
 * @returns {JSX.Element} Toast container
 *
 * @example
 * import Toast from '@stevederico/skateboard-ui/Toast';
 *
 * // Rendered automatically by createSkateboardApp
 * <Toast />
 *
 * // Trigger toasts from anywhere:
 * import { toast } from 'sonner';
 * toast.success('Saved!');
 */
export default function Toast() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
    />
  );
}
