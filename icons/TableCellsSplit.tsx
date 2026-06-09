import Icon, { type IconProps } from './_Icon.js';

const TableCellsSplit = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 15V9" />
      <path d="M3 15h18" />
      <path d="M3 9h18" />
      <rect width="18" height="18" x="3" y="3" rx="2" />
  </Icon>
);

export default TableCellsSplit;
