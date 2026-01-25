import { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./shadcn/ui/drawer"

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
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="bg-background w-full overflow-y-auto [&_button]:cursor-pointer [&_[role=button]]:cursor-pointer" style={{ minHeight }}>
        <DrawerHeader className={"mb-0"}>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">{children}</div>


      </DrawerContent>
    </Drawer>
  );
});

export default MySheet;

