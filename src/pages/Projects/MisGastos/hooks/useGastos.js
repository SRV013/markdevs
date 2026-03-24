import { useState } from 'react';

const KEY = 'mg_gastos';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function useGastos() {
  const [gastos, setGastosState] = useState(() => load());

  const set = (data) => { setGastosState(data); save(data); };

  return {
    gastos,
    addGasto:    (g) => set([...gastos, { ...g, id: uid(), activo: true, pagadoFecha: null, pagos: [] }]),
    editGasto:   (id, g) => set(gastos.map(x => x.id === id ? { ...x, ...g } : x)),
    deleteGasto: (id) => set(gastos.filter(x => x.id !== id)),
    toggleGasto: (id) => set(gastos.map(x => x.id === id ? { ...x, activo: !x.activo } : x)),
    pagarGasto:  (id) => set(gastos.map(x => {
      if (x.id !== id) return x;
      if (x.pagadoFecha) {
        const now = new Date();
        const pagos = (x.pagos || []).filter(p => {
          const d = new Date(p.fecha);
          return !(d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth());
        });
        return { ...x, pagadoFecha: null, pagos };
      }
      return { ...x, pagadoFecha: new Date().toISOString() };
    })),
    pagarParcial: (id, monto) => set(gastos.map(x => {
      if (x.id !== id) return x;
      const now = new Date();
      const pagos = [...(x.pagos || []), { monto, fecha: now.toISOString() }];
      const totalMes = pagos
        .filter(p => { const d = new Date(p.fecha); return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth(); })
        .reduce((s, p) => s + p.monto, 0);
      const pagadoFecha = totalMes >= x.monto ? now.toISOString() : x.pagadoFecha;
      return { ...x, pagos, pagadoFecha };
    })),
  };
}
