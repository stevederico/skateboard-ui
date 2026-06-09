import Icon, { type IconProps } from './_Icon.js';

const SquareChevronRight = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m10 8 4 4-4 4" />
  </Icon>
);

export default SquareChevronRight;
