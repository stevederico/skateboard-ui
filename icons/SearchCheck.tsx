import Icon, { type IconProps } from './_Icon.js';

const SearchCheck = (props: IconProps) => (
  <Icon {...props}>
    <path d="m8 11 2 2 4-4" />
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
  </Icon>
);

export default SearchCheck;
