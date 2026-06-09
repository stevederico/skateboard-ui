import Icon, { type IconProps } from './_Icon.js';

const CircleChevronDown = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="m16 10-4 4-4-4" />
  </Icon>
);

export default CircleChevronDown;
