import Icon, { type IconProps } from './_Icon.js';

const Target = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
  </Icon>
);

export default Target;
