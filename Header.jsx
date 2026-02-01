/**
 * App header bar with title and optional action button.
 *
 * @param {Object} props
 * @param {string} props.title - Header title text
 * @param {string} [props.buttonTitle] - Action button label (omit to hide button)
 * @param {Function} [props.onButtonTitleClick] - Button click handler
 * @param {string} [props.buttonClass] - Additional CSS classes for the button
 * @returns {JSX.Element} Header bar
 *
 * @example
 * import Header from '@stevederico/skateboard-ui/Header';
 *
 * <Header
 *   title="Dashboard"
 *   buttonTitle="Add"
 *   onButtonTitleClick={() => console.log('clicked')}
 * />
 */
function Header(props) {
    return (
      <div className="flex w-full bg-background pb-4 pt-5 px-4 border-b ">
        <span className="font-semibold text-2xl">{props.title}</span>
        {typeof props.buttonTitle !== "undefined" && (
          <button
            className={`ml-auto bg-app text-white px-4 py-2 rounded mr-0 cursor-pointer ${props.buttonClass || ''}`}
            onClick={props.onButtonTitleClick}
          >
            {props.buttonTitle}
          </button>
        )}
      </div>
    );
  }

  export default Header;