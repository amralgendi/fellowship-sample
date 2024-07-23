import { useContext, useEffect, useState } from 'react';
import Button from '../components/Buttons/Button';
import Card from '../components/Card';
import RadioInput from '../components/Forms/FormInputs/RadioInput';
import SelectionInput from '../components/Forms/FormInputs/SelectionInput';
import styles from './DLP.module.css';
import { ConfigContext } from '../contexts/ConfigContext';

type DeviceControlOptions = {
  storageDevices: {
    usbStorageDevices: boolean;
    cdDvd: boolean;
  };
  portableDevices: boolean;
  camera: {
    webcam: boolean;
  };
  interfaces: {
    usb: boolean;
    serialPort: boolean;
  };
};

type AppControlOptions = {
  allowAllApps: boolean;
};

type WebFilteringOptions = {
  allow: boolean;
};

const DLP = () => {
  const { config, refreshConfig, updateDLP } = useContext(ConfigContext);

  if (!config) return <></>;
  const [dlpOptions, setDlpOptions] = useState(config.dlp);

  // const [deviceControlOptions, setDeviceControlOptions] =
  //   useState<DeviceControlOptions>({
  //     storageDevices: {
  //       usbStorageDevices: true,
  //       cdDvd: true,
  //     },
  //     portableDevices: true,
  //     camera: {
  //       webcam: true,
  //     },
  //     interfaces: {
  //       usb: true,
  //       serialPort: true,
  //     },
  //   });

  // const [appControlOptions, setAppControlOptions] = useState<AppControlOptions>(
  //   { allowAllApps: true },
  // );

  // const [webFilteringOptions, setWebFilteringOptions] =
  //   useState<WebFilteringOptions>({ allow: true });

  const toString = (number: 1 | 2 | 3) => number.toString() as '1' | '2' | '3';
  const toNum = (val: '1' | '2' | '3') => parseInt(val) as 1 | 2 | 3;

  useEffect(() => {
    refreshConfig();
  }, []);

  useEffect(() => {
    setDlpOptions(config.dlp);
  }, [config.dlp]);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.header}>
          <div>Device Control</div>
        </div>

        <div className={styles.content}>
          <Card extraStyles={styles.card}>
            <div className={styles.cardTitle}>Storage Devices</div>
            <hr />
            <div className={styles.cardContent}>
              <div className={styles.setting}>
                <div>USB Storage Devices</div>
                <div style={{ width: 158 }}>
                  <SelectionInput
                    availableValues={['1', '2', '3']}
                    value={toString(
                      dlpOptions.device_control.usb_storage_device,
                    )}
                    setValue={(val) => {
                      setDlpOptions({
                        ...dlpOptions,
                        device_control: {
                          ...dlpOptions.device_control,
                          usb_storage_device: toNum(val),
                        },
                      });
                    }}
                  />
                </div>
              </div>
              <div className={styles.setting}>
                <div>CD/DVD</div>
                <div style={{ width: 158 }}>
                  <SelectionInput
                    availableValues={['1', '2', '3']}
                    value={toString(dlpOptions.device_control.cd_dvd)}
                    setValue={(val) => {
                      setDlpOptions({
                        ...dlpOptions,
                        device_control: {
                          ...dlpOptions.device_control,
                          cd_dvd: toNum(val),
                        },
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
          <Card extraStyles={styles.card}>
            <div className={styles.cardTitle}>Portable Devices</div>
            <hr />
            <div className={styles.cardContent}>
              <div className={styles.setting}>
                <div>Portable Devices</div>
                <div style={{ width: 158 }}>
                  <SelectionInput
                    availableValues={['1', '2', '3']}
                    value={toString(dlpOptions.device_control.portable_device)}
                    setValue={(val) => {
                      setDlpOptions({
                        ...dlpOptions,
                        device_control: {
                          ...dlpOptions.device_control,
                          portable_device: toNum(val),
                        },
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
          <Card extraStyles={styles.card}>
            <div className={styles.cardTitle}>Camera</div>
            <hr />
            <div className={styles.cardContent}>
              <div className={styles.setting}>
                <div>Web cam</div>
                <div style={{ width: 158 }}>
                  <SelectionInput
                    availableValues={['1', '2', '3']}
                    value={toString(dlpOptions.device_control.webcam)}
                    setValue={(val) => {
                      setDlpOptions({
                        ...dlpOptions,
                        device_control: {
                          ...dlpOptions.device_control,
                          webcam: toNum(val),
                        },
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
          <Card extraStyles={styles.card}>
            <div className={styles.cardTitle}>Interfaces</div>
            <hr />
            <div className={styles.cardContent}>
              <div className={styles.setting}>
                <div>USB</div>
                <div style={{ width: 158 }}>
                  <SelectionInput
                    availableValues={['1', '2', '3']}
                    value={toString(dlpOptions.device_control.usb_port)}
                    setValue={(val) => {
                      setDlpOptions({
                        ...dlpOptions,
                        device_control: {
                          ...dlpOptions.device_control,
                          usb_port: toNum(val),
                        },
                      });
                    }}
                  />
                </div>
              </div>
              <div className={styles.setting}>
                <div>Serial Port</div>
                <div style={{ width: 158 }}>
                  <SelectionInput
                    availableValues={['1', '2', '3']}
                    value={toString(dlpOptions.device_control.serial_port)}
                    setValue={(val) => {
                      setDlpOptions({
                        ...dlpOptions,
                        device_control: {
                          ...dlpOptions.device_control,
                          serial_port: toNum(val),
                        },
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.header}>
          <div>App Control</div>
        </div>

        <div className={`${styles.content} ${styles.full}`}>
          <Card extraStyles={`${styles.card} ${styles.setting}`}>
            <div>Allow all apps</div>
            <div style={{ width: 158 }}>
              <SelectionInput
                availableValues={['1', '2', '3']}
                value={toString(dlpOptions.app_control)}
                setValue={(val) => {
                  setDlpOptions({
                    ...dlpOptions,
                    app_control: toNum(val),
                  });
                }}
              />
            </div>
          </Card>
        </div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.header}>
          <div>Web Filtering</div>
        </div>

        <div className={`${styles.content} ${styles.full}`}>
          <Card extraStyles={`${styles.card} ${styles.setting}`}>
            <div>Allow</div>
            <div style={{ width: 158 }}>
              <SelectionInput
                availableValues={['1', '2', '3']}
                value={toString(dlpOptions.web_filtering)}
                setValue={(val) => {
                  setDlpOptions({
                    ...dlpOptions,
                    web_filtering: toNum(val),
                  });
                }}
              />
            </div>
          </Card>
        </div>
      </div>

      <div className={styles.saveBtn}>
        <Button
          id="dlp-save-web-filtering"
          extraStyles={styles.saveBtn}
          color="BLACK"
          isBig={false}
          text="Save"
          onClick={async () => {
            console.log({
              dlpOptions,
            });
            updateDLP(dlpOptions);
          }}
        />
      </div>
    </div>
  );
};

export default DLP;
