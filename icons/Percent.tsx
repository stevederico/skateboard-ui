import Icon, { type IconProps } from './_Icon.js';

const Percent = (props: IconProps) => (
  <Icon {...props}>
    <line x1="19" x2="5" y1="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
  </Icon>
);

export default Percent;
