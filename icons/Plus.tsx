import Icon, { type IconProps } from './_Icon.js';

const Plus = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 12h14" />
      <path d="M12 5v14" />
  </Icon>
);

export default Plus;
