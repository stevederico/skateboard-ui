import Icon, { type IconProps } from './_Icon.js';

const CircleArrowUp = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="m16 12-4-4-4 4" />
      <path d="M12 16V8" />
  </Icon>
);

export default CircleArrowUp;
