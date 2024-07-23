import { useState } from 'react';
import Form from './Form';
import ModalForm from './ModalForm';

const UploadProfilePicForm = ({ handleClose }: { handleClose: () => void }) => {
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = () => {
    console.log('Hello!');
  };

  return (
    <ModalForm
      title="Upload profile pic"
      handleClose={handleClose}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      inputs={[{ key: 'file', type: 'FILE', value: null }]}
      submitLabel="Upload"
    />
  );
};

export default UploadProfilePicForm;
