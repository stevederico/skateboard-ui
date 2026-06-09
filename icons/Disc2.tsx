import Icon, { type IconProps } from './_Icon.js';

const Disc2 = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 12h.01" />
  </Icon>
);

export default Disc2;
