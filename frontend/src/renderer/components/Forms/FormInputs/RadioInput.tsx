import styles from './RadioInput.module.css';

type RadioInputProps<T> = {
  value: T;
  setValue: (value: T) => void;
  availableValues: T[];
};

function RadioInput<T extends string>({
  value,
  setValue,
  availableValues,
}: RadioInputProps<T>) {
  console.log(value);
  return (
    <div className={styles.radioContainer}>
      {availableValues.map((val) => (
        <div className={styles.radioLabel} onClick={() => setValue(val)}>
          <div
            className={`${styles.radioBtn} ${val === value ? styles.this : ''}`}
          >
            <div>
              <div></div>
            </div>
          </div>
          <div className={styles.label}>{val}</div>
        </div>
      ))}
    </div>
  );
}

export default RadioInput;
