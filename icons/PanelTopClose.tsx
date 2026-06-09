import Icon, { type IconProps } from './_Icon.js';

const PanelTopClose = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="m9 16 3-3 3 3" />
  </Icon>
);

export default PanelTopClose;
