import Icon, { type IconProps } from './_Icon.js';

const Dock = (props: IconProps) => (
  <Icon {...props}>
    <path d="M2 8h20" />
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="M6 16h12" />
  </Icon>
);

export default Dock;
