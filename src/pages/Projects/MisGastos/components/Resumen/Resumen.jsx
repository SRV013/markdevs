import { formatMonto, getNextDueDate, isSameMonth } from '../../utils';
import styles from './Resumen.module.css';

export function Resumen({ fijos, variables }) {
  const now = new Date();
  const totalFijos = fijos
    .filter(f => f.activo)
    .reduce((sum, f) => sum + f.monto, 0);

  const totalVariables = variables
    .filter(v => isSameMonth(v.fecha, now.getFullYear(), now.getMonth()))
    .reduce((sum, v) => sum + v.monto, 0);

  const proxVencimientos = fijos
    .filter(f => f.activo)
    .map(f => ({ ...f, ...getNextDueDate(f.diaCobro) }))
    .filter(f => f.days <= 7)
    .length;

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <span className={styles.label}>Gastos fijos / mes</span>
        <span className={styles.amount}>{formatMonto(totalFijos)}</span>
        <span className={styles.sub}>{fijos.filter(f => f.activo).length} activos</span>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>Variables este mes</span>
        <span className={styles.amount}>{formatMonto(totalVariables)}</span>
        <span className={styles.sub}>{variables.filter(v => isSameMonth(v.fecha, now.getFullYear(), now.getMonth())).length} gastos</span>
      </div>
      <div className={`${styles.card} ${proxVencimientos > 0 ? styles.cardAlert : ''}`}>
        <span className={styles.label}>Vencen en 7 días</span>
        <span className={styles.amount}>{proxVencimientos}</span>
        <span className={styles.sub}>{proxVencimientos === 0 ? 'todo al día' : 'próximos pagos'}</span>
      </div>
    </div>
  );
}
