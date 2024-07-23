import styles from './TextInput.module.css';

type TextInputProps = {
  value: string;
  setValue: (file: string) => void;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
};

const TextInput = ({
  value,
  setValue,
  placeholder,
  type = 'text',
}: TextInputProps) => {
  console.log('PLACEHOLDER', placeholder);
  return (
    <input
      type={type}
      name={type}
      value={value}
      className={styles.input}
      onInput={(e) => {
        setValue(e.currentTarget.value);
      }}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
