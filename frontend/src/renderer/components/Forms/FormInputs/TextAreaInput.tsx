import styles from './TextAreaInput.module.css';

type TextAreaInputProps = {
  value: string;
  setValue: (file: string) => void;
  placeholder: string;
};

const TextAreaInput = ({
  value,
  setValue,
  placeholder,
}: TextAreaInputProps) => {
  console.log('PLACEHOLDER', placeholder);
  return (
    <textarea
      value={value}
      className={styles.input}
      onInput={(e) => {
        setValue(e.currentTarget.value);
      }}
      placeholder={placeholder}
    />
  );
};

export default TextAreaInput;
