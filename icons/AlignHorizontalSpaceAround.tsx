import Icon, { type IconProps } from './_Icon.js';

const AlignHorizontalSpaceAround = (props: IconProps) => (
  <Icon {...props}>
    <rect width="6" height="10" x="9" y="7" rx="2" />
      <path d="M4 22V2" />
      <path d="M20 22V2" />
  </Icon>
);

export default AlignHorizontalSpaceAround;
