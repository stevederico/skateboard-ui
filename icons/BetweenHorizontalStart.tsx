import Icon, { type IconProps } from './_Icon.js';

const BetweenHorizontalStart = (props: IconProps) => (
  <Icon {...props}>
    <rect width="13" height="7" x="8" y="3" rx="1" />
      <path d="m2 9 3 3-3 3" />
      <rect width="13" height="7" x="8" y="14" rx="1" />
  </Icon>
);

export default BetweenHorizontalStart;
