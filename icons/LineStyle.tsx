import Icon, { type IconProps } from './_Icon.js';

const LineStyle = (props: IconProps) => (
  <Icon {...props}>
    <path d="M11 5h2" />
      <path d="M15 12h6" />
      <path d="M19 5h2" />
      <path d="M3 12h6" />
      <path d="M3 19h18" />
      <path d="M3 5h2" />
  </Icon>
);

export default LineStyle;
