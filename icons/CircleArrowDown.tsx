import Icon, { type IconProps } from './_Icon.js';

const CircleArrowDown = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8" />
      <path d="m8 12 4 4 4-4" />
  </Icon>
);

export default CircleArrowDown;
