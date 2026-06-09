import Icon, { type IconProps } from './_Icon.js';

const CircleChevronLeft = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="m14 16-4-4 4-4" />
  </Icon>
);

export default CircleChevronLeft;
