import { getNextDueDate, formatMonto } from '../../utils';
import styles from './Vencimientos.module.css';

function DaysBadge({ days }) {
  if (days === 0) return <span className={`${styles.badge} ${styles.today}`}>Hoy</span>;
  if (days === 1) return <span className={`${styles.badge} ${styles.tomorrow}`}>Mañana</span>;
  if (days <= 3) return <span className={`${styles.badge} ${styles.urgent}`}>En {days} días</span>;
  if (days <= 7) return <span className={`${styles.badge} ${styles.soon}`}>En {days} días</span>;
  return <span className={`${styles.badge} ${styles.normal}`}>En {days} días</span>;
}

export function Vencimientos({ gastos }) {
  const fijosActivos = gastos.filter(g => g.tipo === 'fijo' && g.activo);

  if (fijosActivos.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No hay gastos fijos activos para mostrar vencimientos.</p>
      </div>
    );
  }

  const withDue = fijosActivos
    .map(g => ({ ...g, ...getNextDueDate(g.diaCobro) }))
    .sort((a, b) => a.days - b.days);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {withDue.map(g => (
          <li key={g.id} className={styles.item}>
            <div className={styles.itemLeft}>
              <span className={styles.name}>{g.nombre}</span>
              <span className={styles.category}>{g.categoria}</span>
            </div>
            <div className={styles.itemRight}>
              <span className={styles.amount}>{formatMonto(g.monto)}</span>
              <DaysBadge days={g.days} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
