import Icon, { type IconProps } from './_Icon.js';

const RectangleCircle = (props: IconProps) => (
  <Icon {...props}>
    <path d="M14 4v16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
      <circle cx="14" cy="12" r="8" />
  </Icon>
);

export default RectangleCircle;
