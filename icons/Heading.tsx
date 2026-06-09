import Icon, { type IconProps } from './_Icon.js';

const Heading = (props: IconProps) => (
  <Icon {...props}>
    <path d="M6 12h12" />
      <path d="M6 20V4" />
      <path d="M18 20V4" />
  </Icon>
);

export default Heading;
