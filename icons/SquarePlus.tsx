import Icon, { type IconProps } from './_Icon.js';

const SquarePlus = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
  </Icon>
);

export default SquarePlus;
