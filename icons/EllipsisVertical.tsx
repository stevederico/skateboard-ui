import Icon, { type IconProps } from './_Icon.js';

const EllipsisVertical = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
  </Icon>
);

export default EllipsisVertical;
