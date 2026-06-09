import Icon, { type IconProps } from './_Icon.js';

const SquareEqual = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 10h10" />
      <path d="M7 14h10" />
  </Icon>
);

export default SquareEqual;
