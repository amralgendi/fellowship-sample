import Modal from '../Modal';
import Form, { FormProps } from './Form';

type ModalFormProps = FormProps & { handleClose: () => void };

const ModalForm = ({ handleClose, title, ...props }: ModalFormProps) => {
  return (
    <Modal handleClose={handleClose} title={title ?? ''}>
      <Form {...props} />
    </Modal>
  );
};

export default ModalForm;
