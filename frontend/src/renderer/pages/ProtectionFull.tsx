import { useNavigate } from 'react-router-dom';
import Button from '../components/Buttons/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import styles from './ProtectionScan.module.css';
const ProtectionFull = () => {
  const navigate = useNavigate();

  const loadingNum = 50;
  return (
    <div className={styles.protectionScanContainer}>
      <Card extraStyles={styles.scanCardContainer}>
        <div className={styles.titleSubtitle}>
          <div>Full Scan</div>
          <div>Thoroughly scan your system for viruses and</div>
        </div>

        <div className={styles.scanner}>
          <Loader width={263} height={263} strokeWidth={22}>
            <div className={styles.loadingNum}>{loadingNum}%</div>
          </Loader>
          <div>C:\Users\minha\OneDrive\Picture</div>
        </div>

        <Button
          id="full-scan-stop"
          isBig={false}
          text={'Stop'}
          color="WHITE"
          onClick={() => {
            navigate(-1);
          }}
        />

        <div className={styles.warning}>Don't Close or turn off</div>
      </Card>
    </div>
  );
};

export default ProtectionFull;
