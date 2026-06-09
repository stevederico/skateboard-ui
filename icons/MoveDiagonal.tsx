import Icon, { type IconProps } from './_Icon.js';

const MoveDiagonal = (props: IconProps) => (
  <Icon {...props}>
    <path d="M11 19H5v-6" />
      <path d="M13 5h6v6" />
      <path d="M19 5 5 19" />
  </Icon>
);

export default MoveDiagonal;
