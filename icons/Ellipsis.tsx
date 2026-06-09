import Icon, { type IconProps } from './_Icon.js';

const Ellipsis = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
  </Icon>
);

export default Ellipsis;
