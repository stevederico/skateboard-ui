import Icon, { type IconProps } from './_Icon.js';

const Dice5 = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <path d="M16 8h.01" />
      <path d="M8 8h.01" />
      <path d="M8 16h.01" />
      <path d="M16 16h.01" />
      <path d="M12 12h.01" />
  </Icon>
);

export default Dice5;
