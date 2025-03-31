import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./shadcn/ui/sheet"

const MySheet = forwardRef(function MySheet(props, ref) {
  const { title, description, children, showCloseButton } = props;
  const [isOpen, setIsOpen] = useState(false);
  
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev)
  }));

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="bg-background w-[400px] sm:w-[540px]" side="bottom">
        {(title || description) && (
          <SheetHeader>
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}
        {children}
        {showCloseButton && (
          <SheetClose className="mt-4 bg-accent px-4 py-2 rounded-md hover:opacity-90">
            Close
          </SheetClose>
        )}
      </SheetContent>
    </Sheet>
  );
});

export default MySheet;

