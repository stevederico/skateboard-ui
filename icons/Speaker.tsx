import Icon, { type IconProps } from './_Icon.js';

const Speaker = (props: IconProps) => (
  <Icon {...props}>
    <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M12 6h.01" />
      <circle cx="12" cy="14" r="4" />
      <path d="M12 14h.01" />
  </Icon>
);

export default Speaker;
