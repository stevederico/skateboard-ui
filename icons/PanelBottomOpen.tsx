import Icon, { type IconProps } from './_Icon.js';

const PanelBottomOpen = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 15h18" />
      <path d="m9 10 3-3 3 3" />
  </Icon>
);

export default PanelBottomOpen;
