import Icon, { type IconProps } from './_Icon.js';

const AlignHorizontalDistributeEnd = (props: IconProps) => (
  <Icon {...props}>
    <rect width="6" height="14" x="4" y="5" rx="2" />
      <rect width="6" height="10" x="14" y="7" rx="2" />
      <path d="M10 2v20" />
      <path d="M20 2v20" />
  </Icon>
);

export default AlignHorizontalDistributeEnd;
