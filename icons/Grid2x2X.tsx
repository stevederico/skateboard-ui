import Icon, { type IconProps } from './_Icon.js';

const Grid2x2X = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3" />
      <path d="m16 16 5 5" />
      <path d="m16 21 5-5" />
  </Icon>
);

export default Grid2x2X;
