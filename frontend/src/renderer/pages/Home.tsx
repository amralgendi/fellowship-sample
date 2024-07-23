import styles from './Home.module.css';
import RestoreIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import InfoCard from '../components/InfoCard';
import Card from '../components/Card';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { useContext } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';

const Home = () => {
  const { config } = useContext(ConfigContext);

  if (!config) return <>Config not Set</>;

  const data = [
    { name: 'Week 01', uv: 8, pv: 31, av: 20 },
    { name: 'Week 02', uv: 25, pv: 22, av: 8 },
    { name: 'Week 03', uv: 31, pv: 25, av: 42 },
    { name: 'Week 04', uv: 27, pv: 27, av: 8 },
    { name: 'Week 05', uv: 18, pv: 9, av: 5 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <InfoCard
          title="Violation"
          subtitle="Total Violation"
          icon={
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #e6e6e6',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 35,
                  fontWeight: 800,
                }}
              >
                {config.total_violation}
              </div>
            </div>
          }
        />
        <InfoCard
          title="Risk Scores"
          subtitle="Total Risk Scores"
          icon={
            <div
              style={{
                width: 45,
                height: 45,
                borderRadius: '50%',
                background: `radial-gradient(closest-side, white 70%, transparent 71% 100%),
                conic-gradient(#05bb64 ${55}%, pink 0)`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              role="progressbar"
            >
              {config.risk_score}
            </div>
          }
        />
        <InfoCard
          title="Last Backup Date"
          subtitle={config['last backup_date']}
          icon={
            <RestoreIcon
              fill="black"
              width={40}
              height={40}
              strokeWidth={0.5}
            />
          }
        />
      </div>

      <Card extraStyles={styles.chartContainer}>
        <div className={styles.threatTitle}>Threat Protection</div>
        <ResponsiveContainer width={'100%'} minHeight={250} height={'60%'}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#ddd" strokeDasharray="2 5" />
            <Line
              strokeWidth={2}
              dot={false}
              type="monotone"
              dataKey="uv"
              stroke="green"
            />
            <Line
              strokeWidth={2}
              dot={false}
              type="monotone"
              dataKey="pv"
              stroke="blue"
            />
            <Line
              strokeWidth={2}
              dot={false}
              type="monotone"
              dataKey="av"
              stroke="orange"
            />
          </LineChart>
        </ResponsiveContainer>

        <div className={styles.chartKeysContainer}>
          <div className={styles.chartKeys}>
            <div>
              <i style={{ backgroundColor: 'green' }} />
              Product 1
            </div>
            <div>
              <i style={{ backgroundColor: 'blue' }} />
              Product 2
            </div>
            <div>
              <i style={{ backgroundColor: 'orange' }} />
              Product 3
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;
