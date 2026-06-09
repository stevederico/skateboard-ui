import Icon, { type IconProps } from './_Icon.js';

const SquareDot = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="12" cy="12" r="1" />
  </Icon>
);

export default SquareDot;
