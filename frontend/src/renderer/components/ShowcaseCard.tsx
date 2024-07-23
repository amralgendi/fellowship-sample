import Card from './Card';
import styles from './ShowcaseCard.module.css';

const ShowcaseCard = ({
  title,
  image,
  description,
  onClick,
}: {
  title: string;
  image: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <Card onClick={onClick} extraStyles={[styles.showcaseCardContainer]}>
      <div className={styles.innerCard}>
        <div className={styles.title}>{title}</div>
        <div className={styles.image}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </Card>
  );
};

export default ShowcaseCard;
