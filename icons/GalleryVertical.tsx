import Icon, { type IconProps } from './_Icon.js';

const GalleryVertical = (props: IconProps) => (
  <Icon {...props}>
    <path d="M3 2h18" />
      <rect width="18" height="12" x="3" y="6" rx="2" />
      <path d="M3 22h18" />
  </Icon>
);

export default GalleryVertical;
