import styles from './Button.module.css';

type ControlButtonProps = {
  onClick?: () => void;
  icon: JSX.Element;
};

const ControlButton = ({ onClick, icon }: ControlButtonProps) => {
  return (
    <div className={styles.controlBtn}>
      <button
        onClick={() => {
          if (onClick) onClick();
        }}
      >
        {icon}
      </button>
    </div>
  );
};

export default ControlButton;
