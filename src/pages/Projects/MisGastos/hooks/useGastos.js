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
    addGasto:    (g) => set([...gastos, { ...g, id: uid(), activo: true }]),
    editGasto:   (id, g) => set(gastos.map(x => x.id === id ? { ...x, ...g } : x)),
    deleteGasto: (id) => set(gastos.filter(x => x.id !== id)),
    toggleGasto: (id) => set(gastos.map(x => x.id === id ? { ...x, activo: !x.activo } : x)),
  };
}
