import Icon, { type IconProps } from './_Icon.js';

const Grid3x3 = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
  </Icon>
);

export default Grid3x3;
