import Icon, { type IconProps } from './_Icon.js';

const ArrowDown = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
  </Icon>
);

export default ArrowDown;
