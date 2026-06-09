import Icon, { type IconProps } from './_Icon.js';

const ListCheck = (props: IconProps) => (
  <Icon {...props}>
    <path d="M16 5H3" />
      <path d="M16 12H3" />
      <path d="M11 19H3" />
      <path d="m15 18 2 2 4-4" />
  </Icon>
);

export default ListCheck;
