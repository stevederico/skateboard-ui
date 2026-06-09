import Icon, { type IconProps } from './_Icon.js';

const Move3d = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 3v16h16" />
      <path d="m5 19 6-6" />
      <path d="m2 6 3-3 3 3" />
      <path d="m18 16 3 3-3 3" />
  </Icon>
);

export default Move3d;
