import Icon, { type IconProps } from './_Icon.js';

const SquareSlash = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <line x1="9" x2="15" y1="15" y2="9" />
  </Icon>
);

export default SquareSlash;
