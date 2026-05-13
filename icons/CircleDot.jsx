import Icon from './_Icon.jsx';

const CircleDot = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="1" />
  </Icon>
);

export default CircleDot;
