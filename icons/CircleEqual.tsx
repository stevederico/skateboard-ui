import Icon, { type IconProps } from './_Icon.js';

const CircleEqual = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="M7 10h10" />
      <path d="M7 14h10" />
  </Icon>
);

export default CircleEqual;
