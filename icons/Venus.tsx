import Icon, { type IconProps } from './_Icon.js';

const Venus = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 15v7" />
      <path d="M9 19h6" />
      <circle cx="12" cy="9" r="6" />
  </Icon>
);

export default Venus;
