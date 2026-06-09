import Icon, { type IconProps } from './_Icon.js';

const SquareActivity = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M17 12h-2l-2 5-2-10-2 5H7" />
  </Icon>
);

export default SquareActivity;
