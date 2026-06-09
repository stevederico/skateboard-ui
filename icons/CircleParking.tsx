import Icon, { type IconProps } from './_Icon.js';

const CircleParking = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
  </Icon>
);

export default CircleParking;
