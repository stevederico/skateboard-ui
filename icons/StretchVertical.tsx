import Icon, { type IconProps } from './_Icon.js';

const StretchVertical = (props: IconProps) => (
  <Icon {...props}>
    <rect width="6" height="20" x="4" y="2" rx="2" />
      <rect width="6" height="20" x="14" y="2" rx="2" />
  </Icon>
);

export default StretchVertical;
