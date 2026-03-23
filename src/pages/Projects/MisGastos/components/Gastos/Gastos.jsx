import { useState } from 'react';
import { GastoModal } from '../GastoModal/GastoModal';
import { formatMonto, formatDate } from '../../utils';
import styles from './Gastos.module.css';

export function Gastos({ gastos, onAdd, onEdit, onDelete, onToggle }) {
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
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thNum}>#</th>
                <th>Vencimiento</th>
                <th>Tipo de gasto</th>
                <th>Precio</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {gastos.map((g, i) => {
                const venc = g.tipo === 'fijo' ? `Día ${g.diaCobro}` : formatDate(g.fecha);
                return (
                  <tr key={g.id} className={!g.activo ? styles.inactive : ''}>
                    <td className={styles.tdNum}>{i + 1}</td>
                    <td>
                      <div className={styles.vencCell}>
                        <span className={`${styles.tipoBadge} ${g.tipo === 'fijo' ? styles.fijoBadge : styles.varBadge}`}>
                          {g.tipo === 'fijo' ? 'Fijo' : 'Variable'}
                        </span>
                        <span className={styles.vencText}>{venc}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.catCell}>
                        <span className={styles.catBadge}>{g.categoria}</span>
                        <span className={styles.nombre}>{g.nombre}</span>
                      </div>
                    </td>
                    <td className={styles.monto}>{formatMonto(g.monto)}</td>
                    <td>
                      <div className={styles.actions}>
                        {g.tipo === 'fijo' && (
                          <button
                            className={`${styles.toggleBtn} ${g.activo ? styles.on : styles.off}`}
                            onClick={() => onToggle(g.id)}
                          >
                            {g.activo ? 'Activo' : 'Pausado'}
                          </button>
                        )}
                        <button className={styles.iconBtn} onClick={() => openEdit(g)} title="Editar">✏️</button>
                        <button className={styles.iconBtn} onClick={() => onDelete(g.id)} title="Eliminar">🗑️</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <GastoModal
        open={modal.open}
        onClose={closeModal}
        onSave={handleSave}
        initial={modal.editing}
      />
    </div>
  );
}
