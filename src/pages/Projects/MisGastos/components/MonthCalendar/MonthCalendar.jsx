import { useState } from 'react';
import styles from './MonthCalendar.module.css';

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DOW = ['Lu','Ma','Mi','Ju','Vi','Sá','Do'];

/**
 * mode="day"  → value: number 1–31,  onChange(day: number)   — día recurrente mensual
 * mode="date" → value: "YYYY-MM-DD", onChange(date: string)  — fecha específica
 */
export function MonthCalendar({ mode, value, onChange }) {
  const today = new Date();

  const [view, setView] = useState(() => {
    if (mode === 'date' && value) {
      const d = new Date(value + 'T00:00:00');
      return { year: d.getFullYear(), month: d.getMonth() };
    }
    return { year: today.getFullYear(), month: today.getMonth() };
  });

  const { year, month } = view;
  const firstDow   = (new Date(year, month, 1).getDay() + 6) % 7; // lunes=0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prev = () => setView(v => { const d = new Date(v.year, v.month - 1); return { year: d.getFullYear(), month: d.getMonth() }; });
  const next = () => setView(v => { const d = new Date(v.year, v.month + 1); return { year: d.getFullYear(), month: d.getMonth() }; });

  const isSelected = (day) => {
    if (mode === 'day') return value === day;
    if (mode === 'date' && value) {
      const s = new Date(value + 'T00:00:00');
      return s.getFullYear() === year && s.getMonth() === month && s.getDate() === day;
    }
    return false;
  };

  const isToday = (day) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  const handleClick = (day) => {
    if (mode === 'day') onChange(day);
    else onChange(new Date(year, month, day).toISOString().slice(0, 10));
  };

  const cells = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <button type="button" className={styles.navBtn} onClick={prev}>‹</button>
        <span className={styles.navTitle}>{MONTHS[month]} {year}</span>
        <button type="button" className={styles.navBtn} onClick={next}>›</button>
      </div>

      <div className={styles.dow}>
        {DOW.map(d => <span key={d} className={styles.dowCell}>{d}</span>)}
      </div>

      <div className={styles.grid}>
        {cells.map((day, i) =>
          day === null
            ? <span key={`e${i}`} />
            : (
              <button
                key={day}
                type="button"
                className={`${styles.day} ${isSelected(day) ? styles.selected : ''} ${isToday(day) && !isSelected(day) ? styles.today : ''}`}
                onClick={() => handleClick(day)}
              >
                {day}
              </button>
            )
        )}
      </div>
    </div>
  );
}
