import styles from './PageTabs.module.css';

const PageTabs = ({ tabs, active, onChange }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${active === tab.id ? styles.tabActive : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon && tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export { PageTabs };
