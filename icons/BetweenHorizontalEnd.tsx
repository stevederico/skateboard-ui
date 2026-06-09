import Icon, { type IconProps } from './_Icon.js';

const BetweenHorizontalEnd = (props: IconProps) => (
  <Icon {...props}>
    <rect width="13" height="7" x="3" y="3" rx="1" />
      <path d="m22 15-3-3 3-3" />
      <rect width="13" height="7" x="3" y="14" rx="1" />
  </Icon>
);

export default BetweenHorizontalEnd;
