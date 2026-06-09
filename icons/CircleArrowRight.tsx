import Icon, { type IconProps } from './_Icon.js';

const CircleArrowRight = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="m12 16 4-4-4-4" />
      <path d="M8 12h8" />
  </Icon>
);

export default CircleArrowRight;
