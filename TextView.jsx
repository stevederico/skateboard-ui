import { getState } from "./Context.jsx";
import { ScrollArea } from './shadcn/ui/scroll-area.jsx';
import { cn } from './shadcn/lib/utils.js';

/**
 * Legal/text document viewer.
 *
 * Renders a plain-text document with placeholder replacement for
 * _COMPANY_, _WEBSITE_, and _EMAIL_ using values from constants.
 *
 * @param {Object} props
 * @param {string} props.details - Raw text content with optional placeholders
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Formatted text page
 *
 * @example
 * import TextView from '@stevederico/skateboard-ui/TextView';
 *
 * <Route path="/terms" element={<TextView details={constants.termsOfService} />} />
 */
export default function TextView({ details, className, ...props }) {
  const { state } = getState();
  const constants = state.constants;
  // Function to replace placeholders with actual values
  const replacePlaceholders = (text) => {
    return text
      .replace(/_COMPANY_/g, constants.companyName)
      .replace(/_WEBSITE_/g, constants.companyWebsite)
      .replace(/_EMAIL_/g, constants.companyEmail);
  };

  // Process the details string with replacements
  const formattedText = replacePlaceholders(details);

  return (
    <ScrollArea className={cn("max-h-screen", className)} {...props}>
      <div className="p-4 whitespace-pre-wrap">{formattedText}</div>
    </ScrollArea>
  );
}
