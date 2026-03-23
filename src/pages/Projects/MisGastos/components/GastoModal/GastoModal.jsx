import { useState, useEffect } from 'react';
import styles from './GastoModal.module.css';

const CATEGORIAS_FIJO = ['Alquiler', 'Servicios', 'Telefonía/Internet', 'Suscripciones', 'Seguros', 'Cuotas/Crédito', 'Gimnasio', 'Educación', 'Transporte', 'Otro'];
const CATEGORIAS_VARIABLE = ['Supermercado', 'Restaurantes', 'Transporte', 'Salud/Farmacia', 'Ropa', 'Entretenimiento', 'Hogar', 'Regalos', 'Otro'];

const today = () => new Date().toISOString().slice(0, 10);

export function GastoModal({ open, onClose, onSave, tipo, initial }) {
  const emptyFijo = { nombre: '', monto: '', categoria: 'Servicios', diaCobro: 1 };
  const emptyVar = { nombre: '', monto: '', categoria: 'Supermercado', fecha: today(), nota: '' };

  const [form, setForm] = useState(tipo === 'fijo' ? emptyFijo : emptyVar);

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...initial } : (tipo === 'fijo' ? emptyFijo : emptyVar));
    }
  }, [open, initial, tipo]);

  if (!open) return null;

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.monto) return;
    onSave({ ...form, monto: parseFloat(form.monto) });
    onClose();
  };

  const categorias = tipo === 'fijo' ? CATEGORIAS_FIJO : CATEGORIAS_VARIABLE;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {initial ? 'Editar' : 'Agregar'} gasto {tipo === 'fijo' ? 'fijo' : 'variable'}
          </h3>
          <button className={styles.closeBtn} type="button" onClick={onClose}>✕</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Nombre</label>
            <input
              type="text"
              value={form.nombre}
              onChange={e => set('nombre', e.target.value)}
              placeholder="Ej: Netflix, Alquiler..."
              autoFocus
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Monto ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.monto}
                onChange={e => set('monto', e.target.value)}
                placeholder="0"
              />
            </div>
            <div className={styles.field}>
              <label>Categoría</label>
              <select value={form.categoria} onChange={e => set('categoria', e.target.value)}>
                {categorias.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {tipo === 'fijo' && (
            <div className={styles.field}>
              <label>Día de vencimiento (1-31)</label>
              <input
                type="number"
                min="1"
                max="31"
                value={form.diaCobro}
                onChange={e => set('diaCobro', parseInt(e.target.value) || 1)}
              />
            </div>
          )}

          {tipo === 'variable' && (
            <>
              <div className={styles.field}>
                <label>Fecha</label>
                <input
                  type="date"
                  value={form.fecha}
                  onChange={e => set('fecha', e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label>Nota (opcional)</label>
                <textarea
                  value={form.nota}
                  onChange={e => set('nota', e.target.value)}
                  placeholder="Detalles adicionales..."
                  rows={2}
                />
              </div>
            </>
          )}

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancelar</button>
            <button type="submit" className={styles.saveBtn}>
              {initial ? 'Guardar cambios' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
