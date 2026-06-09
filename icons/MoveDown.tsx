import Icon, { type IconProps } from './_Icon.js';

const MoveDown = (props: IconProps) => (
  <Icon {...props}>
    <path d="M8 18L12 22L16 18" />
      <path d="M12 2V22" />
  </Icon>
);

export default MoveDown;
