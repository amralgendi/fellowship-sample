import styles from './MultipleInput.module.css';

type MultipleInputProps = {
  values: string[];
  setValues: (values: string[]) => void;
  availableValues: { label: string; value: string }[];
};

function MultipleInput({
  values,
  setValues,
  availableValues,
}: MultipleInputProps) {
  return (
    <div className={styles.radioContainer}>
      {availableValues.map((val) => (
        <div
          className={styles.radioLabel}
          onClick={() =>
            setValues(
              values.findIndex((v) => v == val.value) >= 0
                ? values.filter((v) => v != val.value)
                : [...values, val.value],
            )
          }
        >
          <div
            className={`${styles.radioBtn} ${
              values.findIndex((v) => v == val.value) >= 0 ? styles.this : ''
            }`}
          >
            <div>
              <div></div>
            </div>
          </div>
          <div className={styles.label}>{val.label}</div>
        </div>
      ))}
    </div>
  );
}

export default MultipleInput;
