import Icon, { type IconProps } from './_Icon.js';

const CreditCard = (props: IconProps) => (
  <Icon {...props}>
    <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
  </Icon>
);

export default CreditCard;
