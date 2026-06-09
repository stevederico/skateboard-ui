import Icon, { type IconProps } from './_Icon.js';

const CircleArrowOutDownRight = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 22a10 10 0 1 1 10-10" />
      <path d="M22 22 12 12" />
      <path d="M22 16v6h-6" />
  </Icon>
);

export default CircleArrowOutDownRight;
