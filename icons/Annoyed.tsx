import Icon, { type IconProps } from './_Icon.js';

const Annoyed = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <path d="M8 15h8" />
      <path d="M8 9h2" />
      <path d="M14 9h2" />
  </Icon>
);

export default Annoyed;
