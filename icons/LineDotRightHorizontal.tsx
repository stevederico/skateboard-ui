import Icon, { type IconProps } from './_Icon.js';

const LineDotRightHorizontal = (props: IconProps) => (
  <Icon {...props}>
    <path d="M 3 12 L 15 12" />
      <circle cx="18" cy="12" r="3" />
  </Icon>
);

export default LineDotRightHorizontal;
