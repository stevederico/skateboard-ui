import Icon, { type IconProps } from './_Icon.js';

const ArrowUpLeft = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7 17V7h10" />
      <path d="M17 17 7 7" />
  </Icon>
);

export default ArrowUpLeft;
