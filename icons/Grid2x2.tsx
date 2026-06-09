import Icon, { type IconProps } from './_Icon.js';

const Grid2x2 = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 3v18" />
      <path d="M3 12h18" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
  </Icon>
);

export default Grid2x2;
