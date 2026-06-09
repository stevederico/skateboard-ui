import Icon, { type IconProps } from './_Icon.js';

const Voicemail = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="6" cy="12" r="4" />
      <circle cx="18" cy="12" r="4" />
      <line x1="6" x2="18" y1="16" y2="16" />
  </Icon>
);

export default Voicemail;
