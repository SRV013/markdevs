import styles from './PageHeader.module.css';

const PageHeader = ({ preText, accent, subtitle }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        {preText} <span className={styles.accent}>{accent}</span>
      </h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

export { PageHeader };
