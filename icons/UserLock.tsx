import Icon, { type IconProps } from './_Icon.js';

const UserLock = (props: IconProps) => (
  <Icon {...props}>
    <path d="M19 16v-2a2 2 0 0 0-4 0v2" />
      <path d="M9.5 15H7a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <rect x="13" y="16" width="8" height="5" rx=".899" />
  </Icon>
);

export default UserLock;
