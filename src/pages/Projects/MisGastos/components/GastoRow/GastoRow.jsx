import { formatMonto, getNextDueDate, formatDate } from '../../utils';
import styles from './GastoRow.module.css';

function DaysBadge({ days, overdue }) {
  if (overdue) return <span className={`${styles.badge} ${styles.overdueBadge}`}>Venció {days}d</span>;
  if (days === 0) return <span className={`${styles.badge} ${styles.today}`}>Hoy</span>;
  if (days === 1) return <span className={`${styles.badge} ${styles.tomorrow}`}>Mañana</span>;
  if (days <= 3) return <span className={`${styles.badge} ${styles.urgent}`}>En {days} días</span>;
  if (days <= 7) return <span className={`${styles.badge} ${styles.soon}`}>En {days} días</span>;
  return <span className={`${styles.badge} ${styles.normal}`}>En {days} días</span>;
}

export function GastoRow({ gasto: g, onClick }) {
  const isFijo = g.tipo === 'fijo';
  const dueInfo = isFijo ? getNextDueDate(g.diaCobro) : null;

  return (
    <li
      className={`${styles.item} ${!g.activo ? styles.inactive : ''} ${dueInfo?.overdue ? styles.overdue : ''}`}
      onClick={onClick}
    >
      <div className={styles.colTipo}>
        <span className={`${styles.tipoBadge} ${isFijo ? styles.fijoBadge : styles.varBadge}`}>
          {isFijo ? 'Fijo' : 'Variable'}
        </span>
      </div>

      <div className={styles.colDetail}>
        <span className={styles.catBadge}>{g.categoria}</span>
        <span className={styles.nombre}>{g.nombre}</span>
      </div>

      <span className={styles.monto}>{formatMonto(g.monto)}</span>

      <div className={styles.colDays}>
        {isFijo
          ? <DaysBadge days={dueInfo.days} overdue={dueInfo.overdue} />
          : <span className={styles.badge}>{formatDate(g.fecha)}</span>
        }
      </div>
    </li>
  );
}
