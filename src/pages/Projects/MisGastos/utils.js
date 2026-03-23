export function formatMonto(monto) {
  return `$ ${Number(monto).toLocaleString('es-AR')}`;
}

export function getNextDueDate(diaCobro) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = today.getFullYear();
  const month = today.getMonth();

  let due = new Date(year, month, diaCobro);
  if (due < today) {
    due = new Date(year, month + 1, diaCobro);
  }

  const days = Math.round((due - today) / (1000 * 60 * 60 * 24));
  return { date: due, days };
}

export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
}

export function isSameMonth(isoString, year, month) {
  const d = new Date(isoString);
  return d.getFullYear() === year && d.getMonth() === month;
}
