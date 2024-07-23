import { useState } from 'react';
import Form from './Form';

const ChangePasswordForm = ({}: {}) => {
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = (values: Input[]) => {};

  return (
    <Form
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      inputs={[
        {
          key: 'oldPassword',
          type: 'PASSWORD',
          value: '',
          placeholder: 'Enter old password',
        },
        {
          key: 'newPassword',
          type: 'PASSWORD',
          value: '',
          placeholder: 'Enter new password',
        },
        {
          key: 'confirmPassword',
          type: 'PASSWORD',
          value: '',
          placeholder: 'Confirm password',
        },
      ]}
    />
  );
};

export default ChangePasswordForm;
