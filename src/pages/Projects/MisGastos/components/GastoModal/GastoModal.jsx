import { useState, useEffect } from 'react';
import { DayPicker } from '../DayPicker/DayPicker';
import { MontoInput } from '../MontoInput/MontoInput';
import styles from './GastoModal.module.css';

const CATEGORIAS_FIJO = ['Alquiler', 'Servicios', 'Telefonía/Internet', 'Suscripciones', 'Seguros', 'Cuotas/Crédito', 'Gimnasio', 'Educación', 'Transporte', 'Otro'];
const CATEGORIAS_VARIABLE = ['Supermercado', 'Restaurantes', 'Transporte', 'Salud/Farmacia', 'Ropa', 'Entretenimiento', 'Hogar', 'Regalos', 'Otro'];
const ALL_STANDARD_CATS = [...new Set([...CATEGORIAS_FIJO, ...CATEGORIAS_VARIABLE])];

const today = () => new Date().toISOString().slice(0, 10);

const EMPTY = {
  tipo: 'fijo',
  nombre: '',
  monto: 0,
  categoria: 'Servicios',
  categoriaCustom: '',
  diaCobro: 1,
  fecha: today(),
  nota: '',
};

export function GastoModal({ open, onClose, onSave, onDelete, initial }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (!open) return;
    if (initial) {
      const isCustom = !ALL_STANDARD_CATS.includes(initial.categoria);
      setForm({
        ...EMPTY,
        ...initial,
        categoria: isCustom ? 'Otro' : initial.categoria,
        categoriaCustom: isCustom ? initial.categoria : '',
      });
    } else {
      setForm(EMPTY);
    }
  }, [open, initial]);

  if (!open) return null;

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.monto) return;
    const categoria = form.categoria === 'Otro' && form.categoriaCustom.trim()
      ? form.categoriaCustom.trim()
      : form.categoria;
    onSave({ ...form, categoria });
    onClose();
  };

  const categorias = form.tipo === 'fijo' ? CATEGORIAS_FIJO : CATEGORIAS_VARIABLE;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{initial ? 'Editar' : 'Nuevo'} gasto</h3>
          <button className={styles.closeBtn} type="button" onClick={onClose}>✕</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.tipoRow}>
            <button
              type="button"
              className={`${styles.tipoBtn} ${form.tipo === 'fijo' ? styles.tipoBtnActive : ''}`}
              onClick={() => set('tipo', 'fijo')}
            >
              Fijo
            </button>
            <button
              type="button"
              className={`${styles.tipoBtn} ${form.tipo === 'variable' ? styles.tipoBtnActive : ''}`}
              onClick={() => set('tipo', 'variable')}
            >
              Variable
            </button>
          </div>

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
              <MontoInput key={`${initial?.id}-${open}`} value={form.monto} onChange={v => set('monto', v)} />
            </div>
            <div className={styles.field}>
              <label>Categoría</label>
              <select value={form.categoria} onChange={e => set('categoria', e.target.value)}>
                {categorias.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {form.categoria === 'Otro' && (
            <div className={styles.field}>
              <label>Nombre de la categoría</label>
              <input
                type="text"
                value={form.categoriaCustom}
                onChange={e => set('categoriaCustom', e.target.value)}
                placeholder="Ej: Mascotas, Hobby..."
              />
            </div>
          )}

          {form.tipo === 'fijo' && (
            <div className={styles.field}>
              <label>
                Día de vencimiento — <strong>día {form.diaCobro}</strong> de cada mes
              </label>
              <DayPicker value={form.diaCobro} onChange={v => set('diaCobro', v)} />
            </div>
          )}

          {form.tipo === 'variable' && (
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
            {initial && onDelete && (
              <button type="button" className={styles.deleteBtn} onClick={() => { onDelete(initial.id); onClose(); }}>
                Eliminar
              </button>
            )}
            <div className={styles.actionsRight}>
              <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancelar</button>
              <button type="submit" className={styles.saveBtn}>
                {initial ? 'Guardar cambios' : 'Agregar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
