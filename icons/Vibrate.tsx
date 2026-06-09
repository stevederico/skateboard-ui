import Icon, { type IconProps } from './_Icon.js';

const Vibrate = (props: IconProps) => (
  <Icon {...props}>
    <path d="m2 8 2 2-2 2 2 2-2 2" />
      <path d="m22 8-2 2 2 2-2 2 2 2" />
      <rect width="8" height="14" x="8" y="5" rx="1" />
  </Icon>
);

export default Vibrate;
