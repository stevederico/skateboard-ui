import Icon, { type IconProps } from './_Icon.js';

const MoveUpRight = (props: IconProps) => (
  <Icon {...props}>
    <path d="M13 5H19V11" />
      <path d="M19 5L5 19" />
  </Icon>
);

export default MoveUpRight;
