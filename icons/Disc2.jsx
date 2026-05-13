import Icon from './_Icon.jsx';

const Disc2 = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 12h.01" />
  </Icon>
);

export default Disc2;
