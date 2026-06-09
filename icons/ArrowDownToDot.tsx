import Icon, { type IconProps } from './_Icon.js';

const ArrowDownToDot = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 2v14" />
      <path d="m19 9-7 7-7-7" />
      <circle cx="12" cy="21" r="1" />
  </Icon>
);

export default ArrowDownToDot;
