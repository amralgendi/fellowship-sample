import { useState } from 'react';
import Button from '../components/Buttons/Button';
import Card from '../components/Card';
import TextInput from '../components/Forms/FormInputs/TextInput';
import ToggleInput from '../components/Forms/FormInputs/ToggleInput';
import styles from './Settings.module.css';
import RadioInput from '../components/Forms/FormInputs/RadioInput';

type Values = {
  serverAddress: string;
  generateReportFile: boolean;
  defaultActionsForScanResults: {
    enable: boolean;
    type: 'Quarantine' | 'Delete';
  };
  toggleServer: boolean;
};

const Settings = () => {
  const loadingNum = 50;

  const [values, setValues] = useState<Values>({
    serverAddress: '',
    generateReportFile: false,
    defaultActionsForScanResults: {
      enable: false,
      type: 'Quarantine',
    },
    toggleServer: false,
  });
  return (
    <div className={styles.settingsContainer}>
      <Card extraStyles={styles.settingsCardContainer}>
        <div className={styles.serverAddress}>
          <div className={styles.inputLabel}>Server Address</div>
          <div className={styles.serverAddressInputWrapper}>
            <TextInput
              placeholder="Enter server address"
              setValue={(val) => {
                setValues({ ...values, serverAddress: val });
              }}
              value={values.serverAddress}
              type="text"
            />

            <div className={styles.labelContainer}>
              <div>Current server: https://192.198.202;5963</div>{' '}
              <div>Error: Couldn’t connect the server</div>
            </div>
          </div>
          <div>
            <Button
              id="connect-server"
              color="BLACK"
              isBig={false}
              text="Connect"
              onClick={() => {}}
            />
          </div>
        </div>
        <div>
          <div className={styles.inputLabel}>Custom Policy</div>
          <Button
            id="custom-policy-update"
            color="WHITE"
            text="Update JSON"
            isBig={false}
          />
        </div>
        <div>
          <div className={styles.inputLabel}>Service</div>
          <Button
            id="server-toggle"
            onClick={() => {
              setValues({ ...values, toggleServer: !values.toggleServer });
            }}
            color="WHITE"
            text={(values.toggleServer ? 'Start' : 'Stop') + ' Service'}
            isBig={false}
          />
        </div>
        <div>
          <div className={styles.inputLabel}>Generate Report File</div>
          <ToggleInput
            value={values.generateReportFile}
            setValue={(val) =>
              setValues({ ...values, generateReportFile: val })
            }
          />
        </div>
        <div>
          <div className={styles.inputLabel}>
            Default Action for Scan Results
          </div>
          <ToggleInput
            value={values.defaultActionsForScanResults.enable}
            setValue={(val) =>
              setValues({
                ...values,
                defaultActionsForScanResults: {
                  ...values.defaultActionsForScanResults,
                  enable: val,
                },
              })
            }
          />
          <div
            style={{
              visibility: values.defaultActionsForScanResults.enable
                ? 'visible'
                : 'hidden',
            }}
          >
            <RadioInput
              availableValues={['Quarantine', 'Delete']}
              setValue={(val) =>
                setValues({
                  ...values,
                  defaultActionsForScanResults: {
                    ...values.defaultActionsForScanResults,
                    type: val,
                  },
                })
              }
              value={values.defaultActionsForScanResults.type}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
