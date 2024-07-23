import { electron } from 'process';
import styles from './Button.module.css';

type ButtonProps = {
  id: string;
  text: string;
  buttonIcon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  isBig: boolean;
  isReverse?: boolean;
  color: 'BLACK' | 'WHITE';
  isSubmit?: boolean;
  extraStyles?: string;
  onClick?: () => void;
};

const Button = ({
  id,
  isBig,
  buttonIcon,
  color,
  text,
  isSubmit = false,
  isReverse = false,
  onClick,
  extraStyles,
}: ButtonProps) => {
  const handleClick = async () => {
    // const data = await sendElectronMessage('button-click', id);

    // console.log(data);
    if (!!onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      type={isSubmit ? 'submit' : 'button'}
      className={`${styles.btn} ${
        color === 'BLACK' ? styles.black : styles.white
      } ${isBig ? styles.big : ''} ${extraStyles ? extraStyles : ''}`}
    >
      {text}
    </button>
  );
};

export default Button;
