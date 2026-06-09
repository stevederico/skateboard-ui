import Icon, { type IconProps } from './_Icon.js';

const RectangleHorizontal = (props: IconProps) => (
  <Icon {...props}>
    <rect width="20" height="12" x="2" y="6" rx="2" />
  </Icon>
);

export default RectangleHorizontal;
