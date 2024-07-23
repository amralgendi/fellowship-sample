import { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import Form from '../components/Forms/Form';
import SignInSImg from '../icons/loginImg.png';
import styles from './Signin.module.css';
import { AuthContext } from '../contexts/AuthContext';
import { loginButtonHandler } from '../lib/utils/buttonHandlers';
import { sendCommand } from '../lib/utils/electron';
import { Commands, LOGIN_COMMAND } from '../../main/preload';
import ErrorModal from '../components/ErrorModal';
import { ErrorContext } from '../contexts/ErrorContext';

const SignIn = () => {
  const { signIn } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [firstData, setFirstData] = useState<{
    username: string;
    password: string;
  } | null>(null);

  const { setError } = useContext(ErrorContext);

  const handleSubmit = async (inputs: Input[]) => {
    const data = inputs.reduce(
      (prev, val) => ({ ...prev, [val.key]: (val as { value: string }).value }),
      {},
    ) as { username: string; password: string };

    setLoading(true);

    const [success, message, res] = await sendCommand('LOGIN', data);

    setTimeout(() => {
      setLoading(false);

      if (!success) {
        if (message === 'key_required') {
          setFirstData(data);
          setStep(2);
        } else {
          setError({ isError: true, data: { message } });
        }
        return;
      }

      signIn();
    }, 2000);
  };

  const handleSecondSubmit = async (inputs: Input[]) => {
    const data = inputs.reduce(
      (prev, val) => ({ ...prev, [val.key]: (val as { value: string }).value }),
      {},
    ) as { key: string };

    setLoading(true);

    if (!firstData) return;

    const [success, message, res] = await sendCommand('LOGIN', {
      ...firstData,
      ...data,
    });

    setTimeout(() => {
      setLoading(false);

      if (!success) {
        setError({ isError: true, data: { message } });
        return;
      }

      signIn();
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <img src={SignInSImg} />
      <Card extraStyles={styles.subContainer}>
        <div className={styles.title}>Let's Secure your PC</div>
        {step === 1 && (
          <Form
            handleSubmit={handleSubmit}
            inputs={[
              {
                type: 'TEXT',
                value: '',
                placeholder: 'Username',
                key: 'username',
              },
              {
                type: 'PASSWORD',
                value: '',
                placeholder: 'Password',
                key: 'password',
              },
            ]}
            submitLabel="Log in"
            isLoading={isLoading}
            submitFlex={true}
          />
        )}

        {step === 2 && (
          <Form
            handleSubmit={handleSecondSubmit}
            inputs={[
              {
                type: 'TEXT',
                value: '',
                placeholder: 'Key',
                key: 'key',
              },
            ]}
            submitLabel="Add Key"
            isLoading={isLoading}
            submitFlex={true}
          />
        )}
      </Card>
    </div>
  );
};

export default SignIn;
