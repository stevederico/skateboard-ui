import Icon, { type IconProps } from './_Icon.js';

const MonitorDown = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 13V7" />
      <path d="m15 10-3 3-3-3" />
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
  </Icon>
);

export default MonitorDown;
