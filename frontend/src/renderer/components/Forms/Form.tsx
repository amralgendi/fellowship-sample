import { useState } from 'react';
import styles from './Form.module.css';
import FileUploadInput from './FormInputs/FileUploadInput';
import TextInput from './FormInputs/TextInput';
import Loader from '../Loader';
import Button from '../Buttons/Button';
import TextAreaInput from './FormInputs/TextAreaInput';
import RadioInput from './FormInputs/RadioInput';
import SelectionInput from './FormInputs/SelectionInput';
import MultipleInput from './FormInputs/MultipleInput';

export type FormProps = {
  inputs: Input[];
  handleSubmit: (values: Input[]) => void;
  submitLabel?: string;
  submitLoader?: boolean;
  isLoading: boolean;
  title?: string;
  submitFlex?: boolean;
};

const Form = ({
  inputs,
  handleSubmit,
  submitLabel = 'Submit',
  submitLoader = true,
  isLoading,
  title,
  submitFlex = false,
}: FormProps) => {
  const [values, setValues] = useState(inputs);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(values);
      }}
      className={styles.formContainer}
    >
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.formInputsContainer}>
        {values.map((input) => {
          switch (input.type) {
            case 'FILE':
              return (
                <FileUploadInput
                  value={input.value}
                  setValue={(file) =>
                    setValues((v) =>
                      v.map((i) =>
                        i.key === input.key
                          ? {
                              ...input,
                              value: file,
                            }
                          : i,
                      ),
                    )
                  }
                />
              );
            case 'TEXT':
              return (
                <TextInput
                  value={input.value}
                  setValue={(val) =>
                    setValues((v) =>
                      v.map((i) =>
                        i.key === input.key
                          ? {
                              ...input,
                              value: val,
                            }
                          : i,
                      ),
                    )
                  }
                  placeholder={input.placeholder}
                />
              );
            case 'PASSWORD':
              return (
                <TextInput
                  value={input.value}
                  type="password"
                  setValue={(val) =>
                    setValues((v) =>
                      v.map((i) =>
                        i.key === input.key
                          ? {
                              ...input,
                              value: val,
                            }
                          : i,
                      ),
                    )
                  }
                  placeholder={input.placeholder}
                />
              );
            case 'TEXTAREA':
              return (
                <TextAreaInput
                  value={input.value}
                  setValue={(val) =>
                    setValues((v) =>
                      v.map((i) =>
                        i.key === input.key
                          ? {
                              ...input,
                              value: val,
                            }
                          : i,
                      ),
                    )
                  }
                  placeholder={input.placeholder}
                />
              );
            case 'OPTIONS-SINGLE':
              switch (input.optionsType) {
                case 'RADIO':
                  return (
                    <RadioInput
                      availableValues={input.availableValues}
                      value={input.value}
                      setValue={(val) =>
                        setValues((v) =>
                          v.map((i) =>
                            i.key === input.key
                              ? {
                                  ...input,
                                  value: val,
                                }
                              : i,
                          ),
                        )
                      }
                    />
                  );
                case 'SELECTION':
                  return (
                    <SelectionInput
                      availableValues={input.availableValues}
                      value={input.value}
                      setValue={(val) =>
                        setValues((v) =>
                          v.map((i) =>
                            i.key === input.key
                              ? {
                                  ...input,
                                  value: val,
                                }
                              : i,
                          ),
                        )
                      }
                    />
                  );
                default:
                  return <></>;
              }
            case 'MULTIPLE':
              return (
                <MultipleInput
                  values={input.values}
                  setValues={(val) =>
                    setValues((v) =>
                      v.map((i) =>
                        i.key === input.key
                          ? {
                              ...input,
                              values: val,
                            }
                          : i,
                      ),
                    )
                  }
                  availableValues={input.availableValues}
                />
              );
            default:
              return <></>;
          }
        })}
      </div>
      {isLoading ? (
        <div className={styles.submit}>
          <Loader width={24} height={24} />
        </div>
      ) : submitFlex ? (
        <Button
          id="form-submit"
          isBig={submitFlex}
          isSubmit={true}
          text={submitLabel}
          color="BLACK"
        />
      ) : (
        <div className={styles.submit}>
          <Button
            id="form-submit"
            isBig={submitFlex}
            isSubmit={true}
            text={submitLabel}
            color="BLACK"
          />
        </div>
      )}
    </form>
  );
};

export default Form;
