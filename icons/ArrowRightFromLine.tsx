import Icon, { type IconProps } from './_Icon.js';

const ArrowRightFromLine = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 5v14" />
      <path d="M21 12H7" />
      <path d="m15 18 6-6-6-6" />
  </Icon>
);

export default ArrowRightFromLine;
