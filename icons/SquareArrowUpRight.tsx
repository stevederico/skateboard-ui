import Icon, { type IconProps } from './_Icon.js';

const SquareArrowUpRight = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M8 8h8v8" />
      <path d="m8 16 8-8" />
  </Icon>
);

export default SquareArrowUpRight;
