import Icon, { type IconProps } from './_Icon.js';

const CirclePile = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="19" r="2" />
      <circle cx="12" cy="5" r="2" />
      <circle cx="16" cy="12" r="2" />
      <circle cx="20" cy="19" r="2" />
      <circle cx="4" cy="19" r="2" />
      <circle cx="8" cy="12" r="2" />
  </Icon>
);

export default CirclePile;
