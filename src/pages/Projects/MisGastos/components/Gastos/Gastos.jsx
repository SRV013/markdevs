import { GastoRow } from '../GastoRow/GastoRow';
import styles from './Gastos.module.css';

export function Gastos({ gastos, onOpenAdd, onOpenEdit, onPagar }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.count}>{gastos.length} gastos registrados</span>
        <button className={styles.addBtn} onClick={onOpenAdd}>+ Agregar gasto</button>
      </div>

      {gastos.length === 0 ? (
        <div className={styles.empty}>
          <p>No hay gastos registrados. Agregá uno para empezar.</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {gastos.map((g) => (
            <GastoRow key={g.id} gasto={g} onClick={() => onOpenEdit(g)} onPagar={onPagar} />
          ))}
        </ul>
      )}
    </div>
  );
}
