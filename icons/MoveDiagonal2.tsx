import Icon, { type IconProps } from './_Icon.js';

const MoveDiagonal2 = (props: IconProps) => (
  <Icon {...props}>
    <path d="M19 13v6h-6" />
      <path d="M5 11V5h6" />
      <path d="m5 5 14 14" />
  </Icon>
);

export default MoveDiagonal2;
