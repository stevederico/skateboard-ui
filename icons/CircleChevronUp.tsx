import Icon, { type IconProps } from './_Icon.js';

const CircleChevronUp = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="m8 14 4-4 4 4" />
  </Icon>
);

export default CircleChevronUp;
