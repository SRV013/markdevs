import { formatMonto, getNextDueDate, isSameMonth } from '../../utils';
import styles from './Resumen.module.css';

export function Resumen({ gastos }) {
  const now = new Date();
  const fijosActivos = gastos.filter(g => g.tipo === 'fijo' && g.activo);
  const variablesEsteM = gastos.filter(g => g.tipo === 'variable' && isSameMonth(g.fecha, now.getFullYear(), now.getMonth()));

  const totalFijos = fijosActivos.reduce((sum, g) => sum + g.monto, 0);
  const totalVariables = variablesEsteM.reduce((sum, g) => sum + g.monto, 0);
  const proxVenc = fijosActivos.filter(g => getNextDueDate(g.diaCobro).days <= 7).length;

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <span className={styles.label}>Gastos fijos / mes</span>
        <span className={styles.amount}>{formatMonto(totalFijos)}</span>
        <span className={styles.sub}>{fijosActivos.length} activos</span>
      </div>
      <div className={styles.card}>
        <span className={styles.label}>Variables este mes</span>
        <span className={styles.amount}>{formatMonto(totalVariables)}</span>
        <span className={styles.sub}>{variablesEsteM.length} gastos</span>
      </div>
      <div className={`${styles.card} ${proxVenc > 0 ? styles.cardAlert : ''}`}>
        <span className={styles.label}>Vencen en 7 días</span>
        <span className={styles.amount}>{proxVenc}</span>
        <span className={styles.sub}>{proxVenc === 0 ? 'todo al día' : 'próximos pagos'}</span>
      </div>
    </div>
  );
}
