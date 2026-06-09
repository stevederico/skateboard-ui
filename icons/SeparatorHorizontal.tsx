import Icon, { type IconProps } from './_Icon.js';

const SeparatorHorizontal = (props: IconProps) => (
  <Icon {...props}>
    <path d="m16 16-4 4-4-4" />
      <path d="M3 12h18" />
      <path d="m8 8 4-4 4 4" />
  </Icon>
);

export default SeparatorHorizontal;
