import { useState } from 'react';
import ModalForm from './ModalForm';

const ChangeScheduleForm = ({
  handleClose,
  currValue,
}: {
  handleClose: () => void;
  currValue: string;
}) => {
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = (values: Input[]) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert(JSON.stringify(values));
    }, 1000);
  };

  return (
    <ModalForm
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      inputs={[
        {
          key: 'options',
          type: 'OPTIONS-SINGLE',
          optionsType: 'SELECTION',
          availableValues: ['Never', 'Daily', 'Weekly', 'Monthly'],
          value: currValue,
        },
      ]}
      handleClose={handleClose}
      title="Scheduled Time"
    />
  );
};

export default ChangeScheduleForm;
