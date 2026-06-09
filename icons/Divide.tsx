import Icon, { type IconProps } from './_Icon.js';

const Divide = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="6" r="1" />
      <line x1="5" x2="19" y1="12" y2="12" />
      <circle cx="12" cy="18" r="1" />
  </Icon>
);

export default Divide;
