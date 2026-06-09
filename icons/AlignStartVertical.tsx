import Icon, { type IconProps } from './_Icon.js';

const AlignStartVertical = (props: IconProps) => (
  <Icon {...props}>
    <rect width="9" height="6" x="6" y="14" rx="2" />
      <rect width="16" height="6" x="6" y="4" rx="2" />
      <path d="M2 2v20" />
  </Icon>
);

export default AlignStartVertical;
