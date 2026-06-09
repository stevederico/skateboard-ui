import Icon, { type IconProps } from './_Icon.js';

const SquareKanban = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M8 7v7" />
      <path d="M12 7v4" />
      <path d="M16 7v9" />
  </Icon>
);

export default SquareKanban;
