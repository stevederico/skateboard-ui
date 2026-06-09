import Icon, { type IconProps } from './_Icon.js';

const Disc = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="2" />
  </Icon>
);

export default Disc;
