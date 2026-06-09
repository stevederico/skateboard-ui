import Icon, { type IconProps } from './_Icon.js';

const ChevronsLeftRight = (props: IconProps) => (
  <Icon {...props}>
    <path d="m9 7-5 5 5 5" />
      <path d="m15 7 5 5-5 5" />
  </Icon>
);

export default ChevronsLeftRight;
