import Icon, { type IconProps } from './_Icon.js';

const CircleDot = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="1" />
  </Icon>
);

export default CircleDot;
