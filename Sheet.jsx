import { useState, useImperativeHandle, forwardRef } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./shadcn/ui/drawer"

/**
 * Bottom sheet (drawer) component with imperative open/close API.
 *
 * Use a ref to control visibility programmatically.
 *
 * @param {Object} props
 * @param {string} [props.title=""] - Sheet header title
 * @param {string} [props.minHeight="auto"] - Minimum sheet height CSS value
 * @param {React.ReactNode} props.children - Sheet body content
 * @param {React.Ref} ref - Ref exposing { show, hide, open, close, toggle }
 * @returns {JSX.Element} Drawer sheet
 *
 * @example
 * import { useRef } from 'react';
 * import Sheet from '@stevederico/skateboard-ui/Sheet';
 *
 * function MyComponent() {
 *   const sheetRef = useRef();
 *   return (
 *     <>
 *       <button onClick={() => sheetRef.current.show()}>Open</button>
 *       <Sheet ref={sheetRef} title="Details">
 *         <p>Sheet content</p>
 *       </Sheet>
 *     </>
 *   );
 * }
 */
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
      <DrawerContent style={{ minHeight }}>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
});

export default MySheet;
