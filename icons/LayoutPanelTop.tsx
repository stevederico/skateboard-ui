import Icon, { type IconProps } from './_Icon.js';

const LayoutPanelTop = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
  </Icon>
);

export default LayoutPanelTop;
