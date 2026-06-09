import Icon, { type IconProps } from './_Icon.js';

const BetweenVerticalStart = (props: IconProps) => (
  <Icon {...props}>
    <rect width="7" height="13" x="3" y="8" rx="1" />
      <path d="m15 2-3 3-3-3" />
      <rect width="7" height="13" x="14" y="8" rx="1" />
  </Icon>
);

export default BetweenVerticalStart;
