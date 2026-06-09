import Icon, { type IconProps } from './_Icon.js';

const TextWrap = (props: IconProps) => (
  <Icon {...props}>
    <path d="m16 16-3 3 3 3" />
      <path d="M3 12h14.5a1 1 0 0 1 0 7H13" />
      <path d="M3 19h6" />
      <path d="M3 5h18" />
  </Icon>
);

export default TextWrap;
