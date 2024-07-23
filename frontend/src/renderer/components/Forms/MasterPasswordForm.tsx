import { useState } from 'react';
import Form from './Form';

const MasterPasswordForm = ({}: {}) => {
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = (values: Input[]) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert(JSON.stringify(values));
    }, 1000);
  };
  return (
    <Form
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      inputs={[
        {
          key: 'masterPassword',
          type: 'PASSWORD',
          value: '',
          placeholder: 'Enter password',
        },
      ]}
    />
  );
};

export default MasterPasswordForm;
