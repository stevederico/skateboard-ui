import Icon, { type IconProps } from './_Icon.js';

const Dice1 = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <path d="M12 12h.01" />
  </Icon>
);

export default Dice1;
