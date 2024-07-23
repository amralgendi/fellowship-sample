import { useState } from 'react';
import styles from './ToggleInput.module.css';

type ToggleInputProps = {
  value: boolean;
  setValue: (value: boolean) => void;
};

const ToggleInput = ({ value, setValue }: ToggleInputProps) => {
  return (
    <div
      onClick={() => setValue(!value)}
      className={`${styles.toggleContainer} ${
        value ? styles.true : styles.false
      }`}
    >
      <div className={styles.circle}></div>
      <div>{value ? 'Enable' : 'Disable'}</div>
    </div>
  );
};

export default ToggleInput;
