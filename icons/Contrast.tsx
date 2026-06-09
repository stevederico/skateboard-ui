import Icon, { type IconProps } from './_Icon.js';

const Contrast = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="M12 18a6 6 0 0 0 0-12v12z" />
  </Icon>
);

export default Contrast;
