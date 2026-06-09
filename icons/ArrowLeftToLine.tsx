import Icon, { type IconProps } from './_Icon.js';

const ArrowLeftToLine = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 19V5" />
      <path d="m13 6-6 6 6 6" />
      <path d="M7 12h14" />
  </Icon>
);

export default ArrowLeftToLine;
