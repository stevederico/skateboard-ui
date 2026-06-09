import Icon, { type IconProps } from './_Icon.js';

const MonitorCheck = (props: IconProps) => (
  <Icon {...props}>
    <path d="m9 10 2 2 4-4" />
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
  </Icon>
);

export default MonitorCheck;
