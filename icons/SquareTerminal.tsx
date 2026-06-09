import Icon, { type IconProps } from './_Icon.js';

const SquareTerminal = (props: IconProps) => (
  <Icon {...props}>
    <path d="m7 11 2-2-2-2" />
      <path d="M11 13h4" />
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
  </Icon>
);

export default SquareTerminal;
