import Icon, { type IconProps } from './_Icon.js';

const StretchHorizontal = (props: IconProps) => (
  <Icon {...props}>
    <rect width="20" height="6" x="2" y="4" rx="2" />
      <rect width="20" height="6" x="2" y="14" rx="2" />
  </Icon>
);

export default StretchHorizontal;
