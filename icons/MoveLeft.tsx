import Icon, { type IconProps } from './_Icon.js';

const MoveLeft = (props: IconProps) => (
  <Icon {...props}>
    <path d="M6 8L2 12L6 16" />
      <path d="M2 12H22" />
  </Icon>
);

export default MoveLeft;
