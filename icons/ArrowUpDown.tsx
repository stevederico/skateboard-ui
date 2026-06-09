import Icon, { type IconProps } from './_Icon.js';

const ArrowUpDown = (props: IconProps) => (
  <Icon {...props}>
    <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
  </Icon>
);

export default ArrowUpDown;
