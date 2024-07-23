import styles from './Card.module.css';

const Card = ({
  children,
  extraStyles,
  onClick,
}: {
  children: React.ReactNode;
  extraStyles?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={() => onClick && onClick()}
      className={`${styles.cardContainer} ${extraStyles ? extraStyles : ''}`}
    >
      {children}
    </div>
  );
};

export default Card;
