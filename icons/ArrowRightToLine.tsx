import Icon, { type IconProps } from './_Icon.js';

const ArrowRightToLine = (props: IconProps) => (
  <Icon {...props}>
    <path d="M17 12H3" />
      <path d="m11 18 6-6-6-6" />
      <path d="M21 5v14" />
  </Icon>
);

export default ArrowRightToLine;
