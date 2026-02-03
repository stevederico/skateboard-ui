import { Separator } from "./shadcn/ui/separator.jsx";
import { Button } from "./shadcn/ui/button.jsx";
import { Badge } from "./shadcn/ui/badge.jsx";
import { cn } from "./shadcn/lib/utils.js";

/**
 * App header bar built on shadcn primitives (Button, Separator, Badge).
 *
 * Renders page title and optional action button on the right.
 * A shadcn Separator renders below the header instead of a border utility.
 *
 * @param {Object} props
 * @param {string} props.title - Header title text
 * @param {string} [props.buttonTitle] - Action button label (omit to hide button)
 * @param {Function} [props.onButtonTitleClick] - Button click handler
 * @param {string} [props.buttonClass] - Additional CSS classes for the button
 * @param {string} [props.className] - Additional CSS classes for the header
 * @param {React.ReactNode} [props.children] - Custom right-side content
 * @returns {JSX.Element} Header bar with separator
 */
function Header({ title, buttonTitle, onButtonTitleClick, buttonClass, className, children, ...props }) {
  return (
    <>
      <header
        className={cn("flex h-(--header-height) shrink-0 items-center gap-2", className)}
        {...props}
      >
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <h1 className="text-base font-medium">{title}</h1>
          <div className="ml-auto flex items-center gap-2">
            {typeof buttonTitle !== "undefined" && (
              <Button
                variant="ghost"
                size="sm"
                className={buttonClass || ""}
                onClick={onButtonTitleClick}
              >
                {buttonTitle}
              </Button>
            )}
            {children}
          </div>
        </div>
      </header>
      <Separator />
    </>
  );
}

export default Header;
