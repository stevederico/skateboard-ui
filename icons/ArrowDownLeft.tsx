import Icon, { type IconProps } from './_Icon.js';

const ArrowDownLeft = (props: IconProps) => (
  <Icon {...props}>
    <path d="M17 7 7 17" />
      <path d="M17 17H7V7" />
  </Icon>
);

export default ArrowDownLeft;
