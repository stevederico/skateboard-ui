import Icon, { type IconProps } from './_Icon.js';

const Webcam = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="10" r="8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
  </Icon>
);

export default Webcam;
