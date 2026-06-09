import Icon, { type IconProps } from './_Icon.js';

const ToggleLeft = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="9" cy="12" r="3" />
      <rect width="20" height="14" x="2" y="5" rx="7" />
  </Icon>
);

export default ToggleLeft;
