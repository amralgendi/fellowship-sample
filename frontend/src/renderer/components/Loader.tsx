import styles from './Loader.module.css';

const Loader = ({
  width,
  height,
  strokeWidth,
  children,
}: {
  width?: number;
  height?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}) => {
  width = width || 24;
  strokeWidth = strokeWidth || 3;
  return (
    <div style={{ width, height }} className={styles.loaderContainer}>
      <div
        style={{
          WebkitMask: `radial-gradient(farthest-side, #0000 calc(100% - ${strokeWidth}px), #000 0)`,
          background: `radial-gradient(farthest-side, #0c81ee ${
            100 - strokeWidth
          }%, #0000) top/${strokeWidth}px ${strokeWidth}px no-repeat,
      conic-gradient(#0000 30%, #0c81ee)`,
        }}
        className={styles.loader}
      ></div>

      <div>{children}</div>
    </div>
  );
};

export default Loader;
