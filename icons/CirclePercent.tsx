import Icon, { type IconProps } from './_Icon.js';

const CirclePercent = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="M9 9h.01" />
      <path d="M15 15h.01" />
  </Icon>
);

export default CirclePercent;
