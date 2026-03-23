import { useState } from 'react';

const KEYS = { fijos: 'mg_fijos', variables: 'mg_variables' };

function load(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function useGastos() {
  const [fijos, setFijosState] = useState(() => load(KEYS.fijos));
  const [variables, setVariablesState] = useState(() => load(KEYS.variables));

  const setFijos = (data) => { setFijosState(data); save(KEYS.fijos, data); };
  const setVariables = (data) => { setVariablesState(data); save(KEYS.variables, data); };

  return {
    fijos,
    addFijo: (g) => setFijos([...fijos, { ...g, id: uid(), activo: true }]),
    editFijo: (id, g) => setFijos(fijos.map(f => f.id === id ? { ...f, ...g } : f)),
    deleteFijo: (id) => setFijos(fijos.filter(f => f.id !== id)),
    toggleFijo: (id) => setFijos(fijos.map(f => f.id === id ? { ...f, activo: !f.activo } : f)),

    variables,
    addVariable: (g) => setVariables([...variables, { ...g, id: uid() }]),
    editVariable: (id, g) => setVariables(variables.map(v => v.id === id ? { ...v, ...g } : v)),
    deleteVariable: (id) => setVariables(variables.filter(v => v.id !== id)),
  };
}
