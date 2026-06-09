import Icon, { type IconProps } from './_Icon.js';

const SquarePause = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <line x1="10" x2="10" y1="15" y2="9" />
      <line x1="14" x2="14" y1="15" y2="9" />
  </Icon>
);

export default SquarePause;
