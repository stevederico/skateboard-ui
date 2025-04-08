function Header(props) {
    return (
      <div className="flex w-full bg-background  py-8 px-4 border-b ">
        <span className="font-semibold text-4xl">{props.title}</span>
        {typeof props.buttonTitle !== "undefined" && (
          <button
            className={`ml-auto bg-app text-white px-4 py-2 rounded mr-0 ${props.buttonClass || ''}`}
            onClick={props.onButtonTitleClick}
          >
            {props.buttonTitle}
          </button>
        )}
      </div>
    );
  }

  export default Header;