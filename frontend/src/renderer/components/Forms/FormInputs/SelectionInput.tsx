import { useState } from 'react';
import styles from './SelectionInput.module.css';
import DropdownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import MenuList from '../../MenuList';

type SelectionInputProps<T> = {
  value: T;
  setValue: (value: T) => void;
  availableValues: T[];
};

function SelectionInput<T extends string>({
  value,
  setValue,
  availableValues,
}: SelectionInputProps<T>) {
  const [isOpen, setOpen] = useState(false);

  const selections = availableValues.map((val) => ({
    label: val,
    action: () => {
      console.log('HERE!');
      setOpen(false);
      setValue(val);
    },
  }));

  console.log(isOpen);

  return (
    <div className={styles.selectionWrapper}>
      <div
        className={styles.selectionContainer}
        onClick={() => setOpen((o) => !o)}
      >
        <div>{value}</div>
        <DropdownIcon width={24} height={24} fill="black" />
      </div>
      <MenuList
        containerStyles={styles.selectionList}
        setOpen={setOpen}
        settings={selections}
        isOpen={isOpen}
      />
    </div>
  );
}

export default SelectionInput;
