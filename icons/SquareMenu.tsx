import Icon, { type IconProps } from './_Icon.js';

const SquareMenu = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 8h10" />
      <path d="M7 12h10" />
      <path d="M7 16h10" />
  </Icon>
);

export default SquareMenu;
