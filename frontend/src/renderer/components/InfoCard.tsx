import Card from './Card';
import styles from './InfoCard.module.css';

type CardProps = {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
};

const InfoCard = ({ title, subtitle, icon }: CardProps) => {
  return (
    <Card extraStyles={styles.infoCard}>
      <h1 className={styles.title}>{title}</h1>
      <div
        className={`${styles.subtitleContainer} ${
          subtitle ? '' : styles.oneItem
        }`}
      >
        {subtitle && <h3 className={styles.subtitle}>{subtitle}</h3>}
        <div>{icon}</div>
      </div>
    </Card>
  );
};

export default InfoCard;
