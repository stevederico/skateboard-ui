import Icon, { type IconProps } from './_Icon.js';

const ArrowUpFromDot = (props: IconProps) => (
  <Icon {...props}>
    <path d="m5 9 7-7 7 7" />
      <path d="M12 16V2" />
      <circle cx="12" cy="21" r="1" />
  </Icon>
);

export default ArrowUpFromDot;
