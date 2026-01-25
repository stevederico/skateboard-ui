import { Toaster } from './shadcn/ui/sonner.jsx';

export default function Toast() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
    />
  );
}
