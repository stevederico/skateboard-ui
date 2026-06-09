import Icon, { type IconProps } from './_Icon.js';

const CircleSmall = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="6" />
  </Icon>
);

export default CircleSmall;
