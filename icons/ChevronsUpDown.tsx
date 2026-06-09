import Icon, { type IconProps } from './_Icon.js';

const ChevronsUpDown = (props: IconProps) => (
  <Icon {...props}>
    <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
  </Icon>
);

export default ChevronsUpDown;
