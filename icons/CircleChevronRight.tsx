import Icon, { type IconProps } from './_Icon.js';

const CircleChevronRight = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="m10 8 4 4-4 4" />
  </Icon>
);

export default CircleChevronRight;
