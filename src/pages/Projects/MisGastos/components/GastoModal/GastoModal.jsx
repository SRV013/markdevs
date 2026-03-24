import { useState } from 'react';
import { Button, ToggleGroup } from '@/components';
import { DayPicker } from '../DayPicker/DayPicker';
import { MontoInput } from '../MontoInput/MontoInput';
import styles from './GastoModal.module.css';

const CATEGORIAS = ['Alquiler', 'Servicios', 'Telefonía/Internet', 'Suscripciones', 'Seguros',
  'Cuotas/Crédito', 'Gimnasio', 'Educación', 'Supermercado', 'Restaurantes',
  'Transporte', 'Salud/Farmacia', 'Ropa', 'Entretenimiento', 'Hogar', 'Regalos', 'Otro'];

const EMPTY = {
  tipo: 'fijo',
  nombre: '',
  monto: 0,
  categoria: 'Servicios',
  categoriaCustom: '',
  diaCobro: 1,
  nota: '',
};

function buildForm(initial) {
  if (!initial) return EMPTY;
  const isCustom = !CATEGORIAS.includes(initial.categoria);
  return {
    ...EMPTY,
    ...initial,
    categoria:       isCustom ? 'Otro' : initial.categoria,
    categoriaCustom: isCustom ? initial.categoria : '',
  };
}

export function GastoModal({ open, onClose, onSave, onDelete, initial }) {
  const [form, setForm] = useState(() => buildForm(initial));

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

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>{initial ? 'Editar' : 'Nuevo'} gasto</h3>
          <button className={styles.closeBtn} type="button" onClick={onClose}>✕</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>

          {/* Tipo */}
          <ToggleGroup
            options={[{ id: 'fijo', label: 'Fijo' }, { id: 'variable', label: 'Variable' }]}
            value={form.tipo}
            onChange={v => set('tipo', v)}
          />

          {/* Nombre */}
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

          {/* Monto + Categoría */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Monto ($)</label>
              <MontoInput key={`${initial?.id}-${open}`} value={form.monto} onChange={v => set('monto', v)} />
            </div>
            <div className={styles.field}>
              <label>Categoría</label>
              <select value={form.categoria} onChange={e => set('categoria', e.target.value)}>
                {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
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

          {/* Día de cobro — mismo para fijo y variable */}
          <div className={styles.field}>
            <label>Día de cobro</label>
            <DayPicker value={form.diaCobro} onChange={v => set('diaCobro', v)} />
          </div>

          {/* Nota */}
          <div className={styles.field}>
            <label>Nota (opcional)</label>
            <textarea
              value={form.nota}
              onChange={e => set('nota', e.target.value)}
              placeholder="Detalles adicionales..."
              rows={2}
            />
          </div>

          <div className={styles.actions}>
            {initial && onDelete && (
              <Button type="button" variant="danger" size="md" onClick={() => { onDelete(initial.id); onClose(); }}>
                Eliminar
              </Button>
            )}
            <div className={styles.actionsRight}>
              <Button type="button" variant="neutral" size="md" onClick={onClose}>Cancelar</Button>
              <Button type="submit" size="md">
                {initial ? 'Guardar' : 'Agregar'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
