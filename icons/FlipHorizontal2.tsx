import Icon, { type IconProps } from './_Icon.js';

const FlipHorizontal2 = (props: IconProps) => (
  <Icon {...props}>
    <path d="m3 7 5 5-5 5V7" />
      <path d="m21 7-5 5 5 5V7" />
      <path d="M12 20v2" />
      <path d="M12 14v2" />
      <path d="M12 8v2" />
      <path d="M12 2v2" />
  </Icon>
);

export default FlipHorizontal2;
