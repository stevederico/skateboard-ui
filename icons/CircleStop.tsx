import Icon, { type IconProps } from './_Icon.js';

const CircleStop = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
  </Icon>
);

export default CircleStop;
