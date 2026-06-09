import Icon, { type IconProps } from './_Icon.js';

const CheckLine = (props: IconProps) => (
  <Icon {...props}>
    <path d="M20 4L9 15" />
      <path d="M21 19L3 19" />
      <path d="M9 15L4 10" />
  </Icon>
);

export default CheckLine;
