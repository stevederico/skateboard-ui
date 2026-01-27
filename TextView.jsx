import { getState } from "./Context.jsx";


export default function TextView({ details }) {
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
    <>
      <div className="p-4 overflow-y-auto whitespace-pre-wrap max-h-screen">{formattedText}</div>
    </>
  );
}