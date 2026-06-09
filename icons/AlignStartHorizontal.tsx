import Icon, { type IconProps } from './_Icon.js';

const AlignStartHorizontal = (props: IconProps) => (
  <Icon {...props}>
    <rect width="6" height="16" x="4" y="6" rx="2" />
      <rect width="6" height="9" x="14" y="6" rx="2" />
      <path d="M22 2H2" />
  </Icon>
);

export default AlignStartHorizontal;
