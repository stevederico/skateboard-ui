import Icon, { type IconProps } from './_Icon.js';

const CirclePlus = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
  </Icon>
);

export default CirclePlus;
