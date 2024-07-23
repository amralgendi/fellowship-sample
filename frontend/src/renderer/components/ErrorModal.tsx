import Modal from './Modal';

type ErrorModalProps = {
  message: string;
  handleClose: () => void;
};

const ErrorModal = ({ handleClose, message }: ErrorModalProps) => {
  return (
    <Modal title="Error!" handleClose={handleClose}>
      <p>{message}</p>
    </Modal>
  );
};

export default ErrorModal;
