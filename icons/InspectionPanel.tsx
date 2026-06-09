import Icon, { type IconProps } from './_Icon.js';

const InspectionPanel = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 7h.01" />
      <path d="M17 7h.01" />
      <path d="M7 17h.01" />
      <path d="M17 17h.01" />
  </Icon>
);

export default InspectionPanel;
