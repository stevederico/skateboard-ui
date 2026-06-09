import Icon, { type IconProps } from './_Icon.js';

const SquareStop = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
  </Icon>
);

export default SquareStop;
