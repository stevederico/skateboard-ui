import Icon, { type IconProps } from './_Icon.js';

const BatteryMedium = (props: IconProps) => (
  <Icon {...props}>
    <path d="M10 14v-4" />
      <path d="M22 14v-4" />
      <path d="M6 14v-4" />
      <rect x="2" y="6" width="16" height="12" rx="2" />
  </Icon>
);

export default BatteryMedium;
