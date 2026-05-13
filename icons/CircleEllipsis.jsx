import Icon from './_Icon.jsx';

const CircleEllipsis = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="M17 12h.01" />
      <path d="M12 12h.01" />
      <path d="M7 12h.01" />
  </Icon>
);

export default CircleEllipsis;
