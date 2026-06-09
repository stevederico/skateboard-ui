import Icon, { type IconProps } from './_Icon.js';

const Banknote = (props: IconProps) => (
  <Icon {...props}>
    <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
  </Icon>
);

export default Banknote;
