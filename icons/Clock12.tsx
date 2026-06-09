import Icon, { type IconProps } from './_Icon.js';

const Clock12 = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6" />
  </Icon>
);

export default Clock12;
