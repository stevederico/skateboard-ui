import Icon, { type IconProps } from './_Icon.js';

const Columns4 = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7.5 3v18" />
      <path d="M12 3v18" />
      <path d="M16.5 3v18" />
  </Icon>
);

export default Columns4;
