import Icon, { type IconProps } from './_Icon.js';

const ListMusic = (props: IconProps) => (
  <Icon {...props}>
    <path d="M16 5H3" />
      <path d="M11 12H3" />
      <path d="M11 19H3" />
      <path d="M21 16V5" />
      <circle cx="18" cy="16" r="3" />
  </Icon>
);

export default ListMusic;
