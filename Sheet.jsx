import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./shadcn/ui/sheet"

const MySheet = forwardRef(function MySheet(props, ref) {
  const { title = "", minHeight = "auto", children } = props;
  const [isOpen, setIsOpen] = useState(false);
  
  useImperativeHandle(ref, () => ({
    show: () => setIsOpen(true),
    hide: () => setIsOpen(false),
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev)
  }));

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="bg-background w-full overflow-y-auto" side="bottom" style={{ minHeight }}>
        <SheetHeader className={"mb-0"}>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <span className="mx-4 mb-4">{children}</span>

        
      </SheetContent>
    </Sheet>
  );
});

export default MySheet;

