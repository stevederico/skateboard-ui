import Icon, { type IconProps } from './_Icon.js';

const SquareSigma = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M16 8.9V7H8l4 5-4 5h8v-1.9" />
  </Icon>
);

export default SquareSigma;
