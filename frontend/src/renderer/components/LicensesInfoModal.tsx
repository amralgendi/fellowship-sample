import Modal from './Modal';
import styles from './LicensesInfoModal.module.css';
import Button from './Buttons/Button';

type LicensesInfoModalProps = {
  handleClose: () => void;
};

const LicensesInfoModal = ({ handleClose }: LicensesInfoModalProps) => {
  return (
    <Modal title="Licenses info" handleClose={handleClose}>
      <div className={styles.container}>
        <div>Valid till Data - 28/02/2024</div>
        <Button
          id="license-info-ok"
          text="Ok"
          color="BLACK"
          isBig={false}
          onClick={handleClose}
          extraStyles={styles.btn}
        />
      </div>
    </Modal>
  );
};

export default LicensesInfoModal;
