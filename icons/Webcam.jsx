import Icon from './_Icon.jsx';

const Webcam = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="10" r="8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
  </Icon>
);

export default Webcam;
