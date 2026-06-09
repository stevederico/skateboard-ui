import Icon, { type IconProps } from './_Icon.js';

const Signal = (props: IconProps) => (
  <Icon {...props}>
    <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V8" />
      <path d="M22 4v16" />
  </Icon>
);

export default Signal;
