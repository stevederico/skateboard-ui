import Icon, { type IconProps } from './_Icon.js';

const CircleEllipsis = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="M17 12h.01" />
      <path d="M12 12h.01" />
      <path d="M7 12h.01" />
  </Icon>
);

export default CircleEllipsis;
