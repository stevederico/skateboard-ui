import Icon, { type IconProps } from './_Icon.js';

const ArrowRight = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
  </Icon>
);

export default ArrowRight;
