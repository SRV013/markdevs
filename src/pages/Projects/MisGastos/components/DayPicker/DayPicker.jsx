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
        <span className={styles.triggerLabel}>Día de vencimiento programado</span>
        <strong className={styles.triggerDay}>{value}</strong>
        <svg className={styles.triggerEdit} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
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
