import { getNextDueDate, getMontoPagadoMes, isPaidThisMonth } from '../../utils';
import { GastoRow } from '../GastoRow/GastoRow';
import styles from './Vencimientos.module.css';

export function Vencimientos({ gastos, onEdit }) {
  const pendientes = gastos.filter(
    g => g.tipo === 'fijo' && g.activo && !isPaidThisMonth(g.pagadoFecha)
  );

  if (pendientes.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No hay vencimientos pendientes este mes.</p>
      </div>
    );
  }

  const withDue = pendientes
    .map(g => {
      const pagado = getMontoPagadoMes(g);
      return {
        ...g,
        ...getNextDueDate(g.diaCobro),
        // saldo restante a pagar
        monto: g.monto - pagado,
        // limpiar para que GastoRow no muestre barra de progreso parcial
        pagos: [],
        pagadoFecha: null,
      };
    })
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
              <GastoRow
                key={g.id}
                gasto={g}
                onClick={() => onEdit?.(gastos.find(x => x.id === g.id))}
              />
            ))}
          </ul>
        </section>
      )}

      {proximos.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Próximos vencimientos</h3>
          <ul className={styles.list}>
            {proximos.map(g => (
              <GastoRow
                key={g.id}
                gasto={g}
                onClick={() => onEdit?.(gastos.find(x => x.id === g.id))}
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
