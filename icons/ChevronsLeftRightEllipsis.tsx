import Icon, { type IconProps } from './_Icon.js';

const ChevronsLeftRightEllipsis = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 12h.01" />
      <path d="M16 12h.01" />
      <path d="m17 7 5 5-5 5" />
      <path d="m7 7-5 5 5 5" />
      <path d="M8 12h.01" />
  </Icon>
);

export default ChevronsLeftRightEllipsis;
