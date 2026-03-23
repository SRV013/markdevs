import { useState } from 'react';
import { GastoModal } from '../GastoModal/GastoModal';
import { formatMonto } from '../../utils';
import styles from './GastosFijos.module.css';

export function GastosFijos({ fijos, onAdd, onEdit, onDelete, onToggle }) {
  const [modal, setModal] = useState({ open: false, editing: null });

  const openAdd = () => setModal({ open: true, editing: null });
  const openEdit = (f) => setModal({ open: true, editing: f });
  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = (data) => {
    if (modal.editing) onEdit(modal.editing.id, data);
    else onAdd(data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.count}>{fijos.length} gastos</span>
        <button className={styles.addBtn} onClick={openAdd}>+ Agregar fijo</button>
      </div>

      {fijos.length === 0 ? (
        <div className={styles.empty}>
          <p>No hay gastos fijos. Agregá uno para empezar.</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {fijos.map(f => (
            <li key={f.id} className={`${styles.item} ${!f.activo ? styles.inactive : ''}`}>
              <div className={styles.itemLeft}>
                <span className={styles.category}>{f.categoria}</span>
                <span className={styles.name}>{f.nombre}</span>
                <span className={styles.due}>Vence el {f.diaCobro}</span>
              </div>
              <div className={styles.itemRight}>
                <span className={styles.amount}>{formatMonto(f.monto)}</span>
                <div className={styles.actions}>
                  <button
                    className={`${styles.toggle} ${f.activo ? styles.toggleOn : styles.toggleOff}`}
                    onClick={() => onToggle(f.id)}
                    title={f.activo ? 'Desactivar' : 'Activar'}
                  >
                    {f.activo ? 'Activo' : 'Pausado'}
                  </button>
                  <button className={styles.iconBtn} onClick={() => openEdit(f)} title="Editar">✏️</button>
                  <button className={styles.iconBtn} onClick={() => onDelete(f.id)} title="Eliminar">🗑️</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <GastoModal
        open={modal.open}
        onClose={closeModal}
        onSave={handleSave}
        tipo="fijo"
        initial={modal.editing}
      />
    </div>
  );
}
