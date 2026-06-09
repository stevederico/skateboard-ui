import Icon, { type IconProps } from './_Icon.js';

const LayoutPanelLeft = (props: IconProps) => (
  <Icon {...props}>
    <rect width="7" height="18" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
  </Icon>
);

export default LayoutPanelLeft;
