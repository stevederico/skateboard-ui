import Icon, { type IconProps } from './_Icon.js';

const MoveUp = (props: IconProps) => (
  <Icon {...props}>
    <path d="M8 6L12 2L16 6" />
      <path d="M12 2V22" />
  </Icon>
);

export default MoveUp;
