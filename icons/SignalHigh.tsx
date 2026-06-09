import Icon, { type IconProps } from './_Icon.js';

const SignalHigh = (props: IconProps) => (
  <Icon {...props}>
    <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V8" />
  </Icon>
);

export default SignalHigh;
