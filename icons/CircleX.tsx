import Icon, { type IconProps } from './_Icon.js';

const CircleX = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
  </Icon>
);

export default CircleX;
