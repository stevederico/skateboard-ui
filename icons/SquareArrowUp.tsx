import Icon, { type IconProps } from './_Icon.js';

const SquareArrowUp = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m16 12-4-4-4 4" />
      <path d="M12 16V8" />
  </Icon>
);

export default SquareArrowUp;
