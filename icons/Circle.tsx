import Icon, { type IconProps } from './_Icon.js';

const Circle = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
  </Icon>
);

export default Circle;
