import Icon, { type IconProps } from './_Icon.js';

const PanelsLeftBottom = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
      <path d="M9 15h12" />
  </Icon>
);

export default PanelsLeftBottom;
