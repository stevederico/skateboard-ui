import Icon, { type IconProps } from './_Icon.js';

const SquareArrowDown = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M12 8v8" />
      <path d="m8 12 4 4 4-4" />
  </Icon>
);

export default SquareArrowDown;
