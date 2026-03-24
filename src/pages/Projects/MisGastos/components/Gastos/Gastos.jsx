import { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '@/components';
import { GastoRow } from '../GastoRow/GastoRow';
import { getNextDueDate, isPaidThisMonth } from '../../utils';
import styles from './Gastos.module.css';

const SORT_OPTIONS = [
  { id: 'vencimiento', label: 'Vencimiento' },
  { id: 'nombre',      label: 'Nombre' },
  { id: 'tipo',        label: 'Tipo' },
  { id: 'estado',      label: 'Estado' },
];

export function Gastos({ gastos, onOpenAdd, onOpenEdit, onPagar }) {
  const [search,   setSearch]   = useState('');
  const [sort,     setSort]     = useState('vencimiento');
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  // Cerrar al click fuera
  useEffect(() => {
    if (!sortOpen) return;
    const handler = (e) => { if (!sortRef.current?.contains(e.target)) setSortOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [sortOpen]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let list = q
      ? gastos.filter(g =>
          g.nombre.toLowerCase().includes(q) ||
          g.categoria.toLowerCase().includes(q) ||
          g.tipo.toLowerCase().includes(q)
        )
      : [...gastos];

    list.sort((a, b) => {
      if (sort === 'nombre') return a.nombre.localeCompare(b.nombre);
      if (sort === 'tipo')   return a.tipo.localeCompare(b.tipo);
      if (sort === 'estado') {
        const pa = isPaidThisMonth(a.pagadoFecha) ? 1 : 0;
        const pb = isPaidThisMonth(b.pagadoFecha) ? 1 : 0;
        return pa - pb;
      }
      return getNextDueDate(a.diaCobro).days - getNextDueDate(b.diaCobro).days;
    });

    return list;
  }, [gastos, search, sort]);

  const sortLabel = SORT_OPTIONS.find(o => o.id === sort)?.label;

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchRow}>
        <div className={styles.searchBox}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className={styles.searchClear} onClick={() => setSearch('')}>✕</button>
          )}

          {/* Sort button inside search */}
          <div className={styles.sortWrap} ref={sortRef}>
            <button
              className={`${styles.sortTrigger} ${sortOpen ? styles.sortTriggerOpen : ''}`}
              onClick={() => setSortOpen(o => !o)}
              title={`Ordenar por: ${sortLabel}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6"  x2="21" y2="6"/>
                <line x1="6" y1="12" x2="18" y2="12"/>
                <line x1="9" y1="18" x2="15" y2="18"/>
              </svg>
              <span className={styles.sortLabel}>{sortLabel}</span>
            </button>

            {sortOpen && (
              <div className={styles.sortDropdown}>
                {SORT_OPTIONS.map(o => (
                  <button
                    key={o.id}
                    className={`${styles.sortOption} ${sort === o.id ? styles.sortOptionActive : ''}`}
                    onClick={() => { setSort(o.id); setSortOpen(false); }}
                  >
                    {o.label}
                    {sort === o.id && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:'auto'}}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button size="md" onClick={onOpenAdd}>+ Agregar</Button>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          {search
            ? <p>Sin resultados para "<strong>{search}</strong>"</p>
            : <p>No hay gastos registrados. Agregá uno para empezar.</p>
          }
        </div>
      ) : (
        <ul className={styles.list}>
          {filtered.map((g) => (
            <GastoRow key={g.id} gasto={g} onClick={() => onOpenEdit(g)} onPagar={onPagar} />
          ))}
        </ul>
      )}
    </div>
  );
}
