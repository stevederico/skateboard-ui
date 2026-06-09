import Icon, { type IconProps } from './_Icon.js';

const ArrowUpRight = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
  </Icon>
);

export default ArrowUpRight;
