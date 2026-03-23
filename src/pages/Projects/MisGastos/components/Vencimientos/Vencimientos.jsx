import { getNextDueDate } from '../../utils';
import { GastoRow } from '../GastoRow/GastoRow';
import styles from './Vencimientos.module.css';

export function Vencimientos({ gastos, onEdit }) {
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
    .sort((a, b) => {
      if (a.overdue && !b.overdue) return -1;
      if (!a.overdue && b.overdue) return 1;
      return a.days - b.days;
    });

  const vencidos = withDue.filter(g => g.overdue);
  const proximos = withDue.filter(g => !g.overdue);

  return (
    <div className={styles.wrapper}>
      {vencidos.length > 0 && (
        <section className={styles.section}>
          <h3 className={`${styles.sectionTitle} ${styles.titleDanger}`}>Vencidos este mes</h3>
          <ul className={styles.list}>
            {vencidos.map(g => (
              <GastoRow key={g.id} gasto={g} onClick={() => onEdit?.(g)} />
            ))}
          </ul>
        </section>
      )}

      {proximos.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Próximos vencimientos</h3>
          <ul className={styles.list}>
            {proximos.map(g => (
              <GastoRow key={g.id} gasto={g} onClick={() => onEdit?.(g)} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
