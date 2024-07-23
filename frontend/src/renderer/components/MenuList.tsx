import { useEffect, useRef } from 'react';
import styles from './MenuList.module.css';

type ProfileSettingsProps = {
  isOpen: boolean;
  settings: {
    label: string;
    icon?: React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
        title?: string | undefined;
        titleId?: string | undefined;
      } & React.RefAttributes<SVGSVGElement>
    >;
    action: () => void;
  }[];
  containerStyles?: string;
  menuStyles?: string;
  setOpen: (isOpen: boolean) => void;
};

const MenuList = ({
  isOpen,
  settings,
  containerStyles,
  menuStyles,
  setOpen,
}: ProfileSettingsProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    divRef.current?.addEventListener('mouseleave', handleClose);

    return () => {
      divRef.current?.removeEventListener('mouseleave', handleClose);
    };
  }, []);

  return (
    <>
      <div
        ref={divRef}
        className={`${styles.menuContainer} ${
          isOpen ? '' : styles.hidden
        } ${containerStyles}`}
      >
        {settings.map((s) => (
          <div
            onClick={() => {
              s.action();
              handleClose();
            }}
            className={`${styles.menu} ${menuStyles}`}
            key={s.label}
          >
            {s.icon && <s.icon width={24} height={24} fill="black" />}
            <div>{s.label}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuList;
