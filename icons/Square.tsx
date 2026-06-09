import Icon, { type IconProps } from './_Icon.js';

const Square = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
  </Icon>
);

export default Square;
