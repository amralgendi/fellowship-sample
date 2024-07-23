import Card from '../components/Card';
import FeedbackForm from '../components/Forms/FeedbackForm';
import styles from './Feedback.module.css';

const Feedback = () => {
  return (
    <div className={styles.feedbackContainer}>
      <Card extraStyles={styles.feedbackCardContainer}>
        <FeedbackForm />
      </Card>
    </div>
  );
};

export default Feedback;
