import styles from './DayPicker.module.css';

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export function DayPicker({ value, onChange }) {
  return (
    <div className={styles.grid}>
      {DAYS.map(d => (
        <button
          key={d}
          type="button"
          className={`${styles.day} ${value === d ? styles.selected : ''}`}
          onClick={() => onChange(d)}
        >
          {d}
        </button>
      ))}
    </div>
  );
}
