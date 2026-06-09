import Icon, { type IconProps } from './_Icon.js';

const CircleCheck = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
  </Icon>
);

export default CircleCheck;
