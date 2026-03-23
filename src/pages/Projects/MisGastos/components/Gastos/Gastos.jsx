import { useState } from 'react';
import { GastoModal } from '../GastoModal/GastoModal';
import { formatMonto, getNextDueDate, formatDate } from '../../utils';
import styles from './Gastos.module.css';

function DaysBadge({ days }) {
  if (days === 0) return <span className={`${styles.badge} ${styles.today}`}>Hoy</span>;
  if (days === 1) return <span className={`${styles.badge} ${styles.tomorrow}`}>Mañana</span>;
  if (days <= 3) return <span className={`${styles.badge} ${styles.urgent}`}>En {days} días</span>;
  if (days <= 7) return <span className={`${styles.badge} ${styles.soon}`}>En {days} días</span>;
  return <span className={`${styles.badge} ${styles.normal}`}>En {days} días</span>;
}

export function Gastos({ gastos, onAdd, onEdit, onDelete }) {
  const [modal, setModal] = useState({ open: false, editing: null });

  const openAdd = () => setModal({ open: true, editing: null });
  const openEdit = (g) => setModal({ open: true, editing: g });
  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = (data) => {
    if (modal.editing) onEdit(modal.editing.id, data);
    else onAdd(data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.count}>{gastos.length} gastos registrados</span>
        <button className={styles.addBtn} onClick={openAdd}>+ Agregar gasto</button>
      </div>

      {gastos.length === 0 ? (
        <div className={styles.empty}>
          <p>No hay gastos registrados. Agregá uno para empezar.</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {gastos.map((g) => {
            const isFijo = g.tipo === 'fijo';
            const days = isFijo ? getNextDueDate(g.diaCobro).days : null;

            return (
              <li
                key={g.id}
                className={`${styles.item} ${!g.activo ? styles.inactive : ''}`}
                onClick={() => openEdit(g)}
              >
                {/* Col 1: Tipo */}
                <div className={styles.col}>
                  <span className={`${styles.tipoBadge} ${isFijo ? styles.fijoBadge : styles.varBadge}`}>
                    {isFijo ? 'Fijo' : 'Variable'}
                  </span>
                </div>

                {/* Col 2: Categoría + nombre */}
                <div className={styles.col}>
                  <span className={styles.catBadge}>{g.categoria}</span>
                  <span className={styles.nombre}>{g.nombre}</span>
                </div>

                {/* Col 3: Precio */}
                <span className={styles.monto}>{formatMonto(g.monto)}</span>

                {/* Col 4: Días restantes */}
                <div className={styles.colDays}>
                  {isFijo
                    ? <DaysBadge days={days} />
                    : <span className={styles.badge}>{formatDate(g.fecha)}</span>
                  }
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <GastoModal
        open={modal.open}
        onClose={closeModal}
        onSave={handleSave}
        onDelete={onDelete}
        initial={modal.editing}
      />
    </div>
  );
}
