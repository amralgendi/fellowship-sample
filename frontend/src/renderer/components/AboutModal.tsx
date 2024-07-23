import Modal from './Modal';
import styles from './AboutModal.module.css';
import Button from './Buttons/Button';

type AboutModalProps = {
  handleClose: () => void;
};

const AboutModal = ({ handleClose }: AboutModalProps) => {
  return (
    <Modal
      extraStyles={styles.modal}
      title="About Information"
      handleClose={handleClose}
    >
      Wijungle is an Indian Cyber Security Company that develops and markets
      Unified Cyber Security Platform to organizations across 25+ countries
      worldwide. Founded in 2014, Wijungle was initially launched as a
      completely Free WiFi service and it was the first Indian private company
      to do so.
      <br />
      <br />
      In 2017, Wijungle pivoted to Cyber Security Sector & currently serves
      government and private giants across industry verticals like Healthcare,
      Education, Hospitality, BFSI, Power & Energy, Retail, Defense, Transport,
      ITES, Smart & Safe City etc.
      <br />
      <br />
      Data Security Council Of India (a supreme body of data protection) and CIO
      Review recognized Wilungle among the Most Innovative and Promising Product
      of The Year for the exemplary innovation and building it into a prominent
      global brand. Wijungle won the Frost & Sullivan New Product Innovation
      Award Of The Year 2019 in Cyber Security Category for Middle East, Africa
      and South Asia Region.
      <br />
      @2015-2025 Httpcart. All right reserved.
    </Modal>
  );
};

export default AboutModal;
