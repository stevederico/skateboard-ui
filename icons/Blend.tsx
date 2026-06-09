import Icon, { type IconProps } from './_Icon.js';

const Blend = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="9" cy="9" r="7" />
      <circle cx="15" cy="15" r="7" />
  </Icon>
);

export default Blend;
