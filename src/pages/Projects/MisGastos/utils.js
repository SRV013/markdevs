export function formatMonto(monto) {
  return `$ ${Number(monto).toLocaleString('es-AR')}`;
}

export function getNextDueDate(diaCobro) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const year = today.getFullYear();
  const month = today.getMonth();

  const due = new Date(year, month, diaCobro);
  const days = Math.round((due - today) / (1000 * 60 * 60 * 24));

  if (days < 0) {
    // Ya venció este mes — días transcurridos desde el vencimiento
    return { date: due, days: Math.abs(days), overdue: true };
  }

  return { date: due, days, overdue: false };
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

export function isPaidThisMonth(pagadoFecha) {
  if (!pagadoFecha) return false;
  const now = new Date();
  return isSameMonth(pagadoFecha, now.getFullYear(), now.getMonth());
}
