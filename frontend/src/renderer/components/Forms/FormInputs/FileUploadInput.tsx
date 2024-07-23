import styles from './FileUploadingInput.module.css';
import FileIcon from '@heroicons/react/24/solid/DocumentIcon';
import CloseIcon from '@heroicons/react/24/solid/XMarkIcon';

type FileUploadingInputProps = {
  value: File | undefined | null;
  setValue: (file: File | undefined | null) => void;
  multiple?: false;
};

const FileUploadInput = ({
  value,
  setValue,
  multiple = false,
}: FileUploadingInputProps) => {
  const fileInputId = 'file' + Date.now();
  console.log('VAL', value);
  return (
    <>
      <input
        type="file"
        name="file"
        id={fileInputId}
        accept="image"
        className={styles.inputFile}
        multiple={multiple}
        onInput={(e) => {
          setValue(e.currentTarget.files?.item(0));
        }}
      />
      <label
        onClick={() => console.log('clicked')}
        htmlFor={fileInputId}
        className={styles.fileInputLabel}
      >
        <div className={styles.label}>Choose file</div>
        <div className={styles.browse}>Browse</div>
      </label>
      {value && (
        <div className={styles.fileViewer}>
          <button className={styles.closeBtn} onClick={() => setValue(null)}>
            <CloseIcon width={10} height={10} fill="white" />
          </button>
          <FileIcon
            width={42}
            height={42}
            fill="white"
            stroke="black"
            strokeWidth={2}
          />
          <div>
            <div className={styles.name}>{value.name}</div>
            <div className={styles.size}>{value.size}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileUploadInput;
