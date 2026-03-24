import { useState } from 'react';
import { formatMonto, getMontoPagadoMes, isPaidThisMonth } from '../../utils';
import { MontoInput } from '../MontoInput/MontoInput';
import styles from './PagoModal.module.css';

export function PagoModal({ gasto, onClose, onPagar, onPagarParcial }) {
  const paid = isPaidThisMonth(gasto.pagadoFecha);
  const montoPagado = getMontoPagadoMes(gasto);
  const restante = Math.max(0, gasto.monto - montoPagado);
  const pct = gasto.monto > 0 ? Math.min(100, Math.round((montoPagado / gasto.monto) * 100)) : 0;
  const [amount, setAmount] = useState(0);

  const handleRegistrar = () => {
    if (!amount || amount <= 0) return;
    if (amount >= restante) {
      onPagar(gasto.id);
    } else {
      onPagarParcial(gasto.id, amount);
    }
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <span className={styles.nombre}>{gasto.nombre}</span>
            <span className={styles.total}>{formatMonto(gasto.monto)}</span>
          </div>
          <button className={styles.closeBtn} type="button" onClick={onClose}>✕</button>
        </div>

        {paid ? (
          <div className={styles.paidSection}>
            <span className={styles.paidBadge}>Pagado completo ✓</span>
            <button
              className={styles.btnDanger}
              type="button"
              onClick={() => { onPagar(gasto.id); onClose(); }}
            >
              Desmarcar como pagado
            </button>
          </div>
        ) : (
          <>
            {montoPagado > 0 && (
              <div className={styles.progressSection}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${pct}%` }} />
                </div>
                <div className={styles.progressInfo}>
                  <span className={styles.paidAmount}>{formatMonto(montoPagado)} pagado ({pct}%)</span>
                  <span className={styles.restAmount}>{formatMonto(restante)} restante</span>
                </div>
              </div>
            )}

            <div className={styles.inputSection}>
              <label className={styles.inputLabel}>
                {montoPagado > 0 ? 'Próximo pago' : 'Monto a pagar'}
              </label>
              <div className={styles.inputWrap}>
                <span className={styles.currencySign}>$</span>
                <MontoInput key="pago-input" value={amount} onChange={setAmount} />
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={styles.btnSecondary}
                type="button"
                onClick={() => { onPagar(gasto.id); onClose(); }}
              >
                Pagar completo
              </button>
              <button
                className={styles.btnPrimary}
                type="button"
                onClick={handleRegistrar}
                disabled={!amount || amount <= 0}
              >
                Registrar pago
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
