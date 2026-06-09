import Icon, { type IconProps } from './_Icon.js';

const GripHorizontal = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="9" r="1" />
      <circle cx="19" cy="9" r="1" />
      <circle cx="5" cy="9" r="1" />
      <circle cx="12" cy="15" r="1" />
      <circle cx="19" cy="15" r="1" />
      <circle cx="5" cy="15" r="1" />
  </Icon>
);

export default GripHorizontal;
