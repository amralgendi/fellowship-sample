import Card from '../components/Card';
import styles from './Protection.module.css';
import ShowcaseCard from '../components/ShowcaseCard';
import FullScanIcon from '../icons/icon1.png';
import QuickScanIcon from '../icons/icon2.png';
import TargetedScanIcon from '../icons/icon3.png';
import BootTimeScan from '../icons/icon4.png';
import { Link } from 'react-router-dom';

const Protection = () => {
  return (
    <div className={styles.protectionContainer}>
      <Link to="/protection/full" style={{ textDecoration: 'none' }}>
        <ShowcaseCard
          onClick={() => alert('FULL SCAN')}
          title="Full Scan"
          image={FullScanIcon}
          description="Thoroughly scan your system for virus and malware"
        />
      </Link>
      <Link to="/protection/quick" style={{ textDecoration: 'none' }}>
        <ShowcaseCard
          onClick={() => alert('QUICK SCAN')}
          title="Quick Scan"
          image={QuickScanIcon}
          description="Personalized scan to check your system in specific areas"
        />
      </Link>
      <Link to="/protection/targeted" style={{ textDecoration: 'none' }}>
        <ShowcaseCard
          onClick={() => alert('TARGETED SCAN')}
          title="Targeted Scan"
          image={TargetedScanIcon}
          description="Focused scan to detect and eliminate virus and malware"
        />
      </Link>
      <Link to="/protection/boot" style={{ textDecoration: 'none' }}>
        <ShowcaseCard
          onClick={() => alert('BOOT TIME SCAN')}
          title="Boot Time Scan"
          image={BootTimeScan}
          description="Detect and remove viruses and malware during startup"
        />
      </Link>
    </div>
  );
};

export default Protection;
