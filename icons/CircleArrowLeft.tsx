import Icon, { type IconProps } from './_Icon.js';

const CircleArrowLeft = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="m12 8-4 4 4 4" />
      <path d="M16 12H8" />
  </Icon>
);

export default CircleArrowLeft;
