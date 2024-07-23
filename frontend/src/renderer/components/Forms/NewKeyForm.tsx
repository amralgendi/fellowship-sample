import { useState } from 'react';
import Form from './Form';

const NewKeyForm = ({}: {}) => {
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
        { key: 'key', type: 'TEXT', value: '', placeholder: 'Enter new key' },
      ]}
    />
  );
};

export default NewKeyForm;
