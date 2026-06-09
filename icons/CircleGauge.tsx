import Icon, { type IconProps } from './_Icon.js';

const CircleGauge = (props: IconProps) => (
  <Icon {...props}>
    <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
      <circle cx="12" cy="12" r="2" />
      <path d="M13.4 10.6 19 5" />
  </Icon>
);

export default CircleGauge;
