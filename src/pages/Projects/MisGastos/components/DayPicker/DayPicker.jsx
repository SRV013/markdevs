import { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './DayPicker.module.css';

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export function DayPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const select = (d) => { onChange(d); setOpen(false); };

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(true)}
      >
        día <strong>{value}</strong>
        <span className={styles.arrow}>▼</span>
      </button>

      {open && createPortal(
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <div className={styles.panel} onClick={e => e.stopPropagation()}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Seleccioná el día</span>
              <button type="button" className={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className={styles.grid}>
              {DAYS.map(d => (
                <button
                  key={d}
                  type="button"
                  className={`${styles.day} ${value === d ? styles.selected : ''}`}
                  onClick={() => select(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
