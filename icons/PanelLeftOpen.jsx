import Icon from './_Icon.jsx';

const PanelLeftOpen = (props) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
      <path d="m14 9 3 3-3 3" />
  </Icon>
);

export default PanelLeftOpen;
