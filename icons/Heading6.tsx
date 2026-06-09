import Icon, { type IconProps } from './_Icon.js';

const Heading6 = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 12h8" />
      <path d="M4 18V6" />
      <path d="M12 18V6" />
      <circle cx="19" cy="16" r="2" />
      <path d="M20 10c-2 2-3 3.5-3 6" />
  </Icon>
);

export default Heading6;
