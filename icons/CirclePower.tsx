import Icon, { type IconProps } from './_Icon.js';

const CirclePower = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="M12 7v4" />
      <path d="M7.998 9.003a5 5 0 1 0 8-.005" />
  </Icon>
);

export default CirclePower;
