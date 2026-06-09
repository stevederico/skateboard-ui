import Icon, { type IconProps } from './_Icon.js';

const MoveDownLeft = (props: IconProps) => (
  <Icon {...props}>
    <path d="M11 19H5V13" />
      <path d="M19 5L5 19" />
  </Icon>
);

export default MoveDownLeft;
