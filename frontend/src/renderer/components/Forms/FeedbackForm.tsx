import { useState } from 'react';
import Form from './Form';
import ModalForm from './ModalForm';

const FeedbackForm = () => {
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = () => {
    console.log('Hello!');
  };

  return (
    <Form
      title="Feedback"
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      inputs={[
        { key: 'title', type: 'TEXT', value: '', placeholder: 'Title' },
        {
          key: 'message',
          type: 'TEXTAREA',
          value: '',
          placeholder: 'Enter message',
        },
      ]}
      submitLabel="Send"
    />
  );
};

export default FeedbackForm;
