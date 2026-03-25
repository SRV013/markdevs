import { useState } from 'react';
import { formatMonto, getNextDueDate, isPaidThisMonth, getMontoPagadoMes } from '../../utils';
import { PagoModal } from '../PagoModal/PagoModal';
import styles from './GastoRow.module.css';

function DaysBadge({ days, overdue }) {
  if (overdue) return <span className={`${styles.badge} ${styles.overdueBadge}`}>Venció {days}d</span>;
  if (days === 0) return <span className={`${styles.badge} ${styles.today}`}>Hoy</span>;
  if (days === 1) return <span className={`${styles.badge} ${styles.tomorrow}`}>Mañana</span>;
  if (days <= 3) return <span className={`${styles.badge} ${styles.urgent}`}>En {days} días</span>;
  if (days <= 7) return <span className={`${styles.badge} ${styles.soon}`}>En {days} días</span>;
  return <span className={`${styles.badge} ${styles.normal}`}>En {days} días</span>;
}

export function GastoRow({ gasto: g, onClick, onPagar, onPagarParcial }) {
  const [pagoOpen, setPagoOpen] = useState(false);
  const isFijo      = g.tipo === 'fijo';
  const dueInfo     = getNextDueDate(g.diaCobro);
  const paid        = isPaidThisMonth(g.pagadoFecha);
  const montoPagado = getMontoPagadoMes(g);
  const hasPartial  = montoPagado > 0 && !paid;
  const pct         = g.monto > 0 ? Math.min(100, Math.round((montoPagado / g.monto) * 100)) : 0;

  return (
    <>
      <li
        className={`${styles.item} ${!g.activo ? styles.inactive : ''} ${paid ? styles.paid : hasPartial ? styles.partial : dueInfo.overdue ? styles.overdue : ''}`}
        onClick={onClick}
      >
        <div className={styles.colTipo}>
          <span className={`${styles.tipoDot} ${isFijo ? styles.fijoDot : styles.varDot}`} title={isFijo ? 'Fijo' : 'Variable'} />
        </div>

        <div className={styles.colDetail}>
          <span className={styles.catBadge}>{g.categoria}</span>
          <span className={styles.nombre}>{g.nombre}</span>
        </div>

        <span className={styles.monto}>{formatMonto(g.monto)}</span>

        <div className={styles.colDays}>
          {paid
            ? <span className={`${styles.badge} ${styles.paidBadge}`}>Pagado ✓</span>
            : hasPartial
              ? <span className={`${styles.badge} ${styles.partialBadge}`}>{pct}% pagado</span>
              : <DaysBadge days={dueInfo.days} overdue={dueInfo.overdue} />
          }
        </div>

        {onPagar && (
          <button
            className={`${styles.payBtn} ${paid ? styles.payBtnPaid : hasPartial ? styles.payBtnPartial : ''}`}
            type="button"
            title="Registrar pago"
            onClick={e => { e.stopPropagation(); setPagoOpen(true); }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </button>
        )}

        {hasPartial && (
          <div className={styles.progressWrap}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
      </li>

      {pagoOpen && (
        <PagoModal
          gasto={g}
          onClose={() => setPagoOpen(false)}
          onPagar={onPagar}
          onPagarParcial={onPagarParcial}
        />
      )}
    </>
  );
}
