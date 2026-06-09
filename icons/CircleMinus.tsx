import Icon, { type IconProps } from './_Icon.js';

const CircleMinus = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
  </Icon>
);

export default CircleMinus;
