import Icon, { type IconProps } from './_Icon.js';

const Rows3 = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M21 9H3" />
      <path d="M21 15H3" />
  </Icon>
);

export default Rows3;
