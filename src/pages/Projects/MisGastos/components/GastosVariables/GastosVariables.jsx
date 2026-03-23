import { useState } from 'react';
import { GastoModal } from '../GastoModal/GastoModal';
import { formatMonto, formatDate, isSameMonth } from '../../utils';
import styles from './GastosVariables.module.css';

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

export function GastosVariables({ variables, onAdd, onEdit, onDelete }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [modal, setModal] = useState({ open: false, editing: null });

  const filtered = variables.filter(v => isSameMonth(v.fecha, year, month));
  const total = filtered.reduce((sum, v) => sum + v.monto, 0);

  const openAdd = () => setModal({ open: true, editing: null });
  const openEdit = (v) => setModal({ open: true, editing: v });
  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = (data) => {
    if (modal.editing) onEdit(modal.editing.id, data);
    else onAdd(data);
  };

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.monthNav}>
          <button onClick={prevMonth} className={styles.navBtn}>‹</button>
          <span className={styles.monthLabel}>{MONTHS[month]} {year}</span>
          <button onClick={nextMonth} className={styles.navBtn}>›</button>
        </div>
        <div className={styles.headerRight}>
          {filtered.length > 0 && (
            <span className={styles.monthTotal}>Total: {formatMonto(total)}</span>
          )}
          <button className={styles.addBtn} onClick={openAdd}>+ Agregar</button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No hay gastos variables en {MONTHS[month].toLowerCase()}.</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {filtered
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
            .map(v => (
              <li key={v.id} className={styles.item}>
                <div className={styles.dateCol}>
                  <span>{formatDate(v.fecha)}</span>
                </div>
                <div className={styles.itemCenter}>
                  <span className={styles.category}>{v.categoria}</span>
                  <span className={styles.name}>{v.nombre}</span>
                  {v.nota && <span className={styles.nota}>{v.nota}</span>}
                </div>
                <div className={styles.itemRight}>
                  <span className={styles.amount}>{formatMonto(v.monto)}</span>
                  <div className={styles.actions}>
                    <button className={styles.iconBtn} onClick={() => openEdit(v)} title="Editar">✏️</button>
                    <button className={styles.iconBtn} onClick={() => onDelete(v.id)} title="Eliminar">🗑️</button>
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
        tipo="variable"
        initial={modal.editing}
      />
    </div>
  );
}
