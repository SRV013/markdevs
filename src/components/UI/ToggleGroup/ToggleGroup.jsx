import styles from './ToggleGroup.module.css';

/**
 * ToggleGroup — selector de opción única tipo segmented control.
 * Props:
 *   options: [{ id, label }]
 *   value:   id activo
 *   onChange: (id) => void
 */
const ToggleGroup = ({ options, value, onChange }) => {
  return (
    <div className={styles.group}>
      {options.map(opt => (
        <button
          key={opt.id}
          type="button"
          className={`${styles.btn} ${value === opt.id ? styles.active : ''}`}
          onClick={() => onChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export { ToggleGroup };
