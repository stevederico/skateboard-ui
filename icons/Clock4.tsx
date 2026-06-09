import Icon, { type IconProps } from './_Icon.js';

const Clock4 = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
  </Icon>
);

export default Clock4;
