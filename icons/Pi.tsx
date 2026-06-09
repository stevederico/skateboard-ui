import Icon, { type IconProps } from './_Icon.js';

const Pi = (props: IconProps) => (
  <Icon {...props}>
    <line x1="9" x2="9" y1="4" y2="20" />
      <path d="M4 7c0-1.7 1.3-3 3-3h13" />
      <path d="M18 20c-1.7 0-3-1.3-3-3V4" />
  </Icon>
);

export default Pi;
