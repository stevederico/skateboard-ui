import Icon, { type IconProps } from './_Icon.js';

const UserRound = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
  </Icon>
);

export default UserRound;
