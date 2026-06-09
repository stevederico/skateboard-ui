import Icon, { type IconProps } from './_Icon.js';

const Pilcrow = (props: IconProps) => (
  <Icon {...props}>
    <path d="M13 4v16" />
      <path d="M17 4v16" />
      <path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13" />
  </Icon>
);

export default Pilcrow;
