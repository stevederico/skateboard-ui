import Icon, { type IconProps } from './_Icon.js';

const Eclipse = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="M12 2a7 7 0 1 0 10 10" />
  </Icon>
);

export default Eclipse;
