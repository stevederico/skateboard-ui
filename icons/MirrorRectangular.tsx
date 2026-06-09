import Icon, { type IconProps } from './_Icon.js';

const MirrorRectangular = (props: IconProps) => (
  <Icon {...props}>
    <path d="M11 6 8 9" />
      <path d="m16 7-8 8" />
      <rect x="4" y="2" width="16" height="20" rx="2" />
  </Icon>
);

export default MirrorRectangular;
