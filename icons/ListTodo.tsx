import Icon, { type IconProps } from './_Icon.js';

const ListTodo = (props: IconProps) => (
  <Icon {...props}>
    <path d="M13 5h8" />
      <path d="M13 12h8" />
      <path d="M13 19h8" />
      <path d="m3 17 2 2 4-4" />
      <rect x="3" y="4" width="6" height="6" rx="1" />
  </Icon>
);

export default ListTodo;
