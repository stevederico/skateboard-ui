import Icon, { type IconProps } from './_Icon.js';

const ShelvingUnit = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 12V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
      <path d="M16 20v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
      <path d="M20 22V2" />
      <path d="M4 12h16" />
      <path d="M4 20h16" />
      <path d="M4 2v20" />
      <path d="M4 4h16" />
  </Icon>
);

export default ShelvingUnit;
