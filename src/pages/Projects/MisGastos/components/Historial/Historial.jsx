import { formatMonto } from '../../utils';
import styles from './Historial.module.css';

const PALETTE = [
  '#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6',
  '#a855f7', '#f97316', '#14b8a6', '#ec4899', '#84cc16',
];

function DonutChart({ slices, total }) {
  const SIZE = 200;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const R = 80;
  const r = 50;

  let angle = -Math.PI / 2;

  const paths = slices.map((s, i) => {
    const sweep = (s.total / total) * 2 * Math.PI;
    const end = angle + sweep;
    const large = sweep > Math.PI ? 1 : 0;

    const x1 = cx + R * Math.cos(angle);
    const y1 = cy + R * Math.sin(angle);
    const x2 = cx + R * Math.cos(end);
    const y2 = cy + R * Math.sin(end);
    const ix1 = cx + r * Math.cos(angle);
    const iy1 = cy + r * Math.sin(angle);
    const ix2 = cx + r * Math.cos(end);
    const iy2 = cy + r * Math.sin(end);

    const d = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${r} ${r} 0 ${large} 0 ${ix1} ${iy1} Z`;
    angle = end;
    return { d, color: PALETTE[i % PALETTE.length] };
  });

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={styles.donut}>
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.color} stroke="var(--bg-color)" strokeWidth="2" />
      ))}
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontWeight="600">
        TOTAL
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="12" fill="var(--text-primary)" fontWeight="800">
        {slices.length} cat.
      </text>
    </svg>
  );
}

export function Historial({ gastos }) {
  const byCat = {};
  gastos.forEach(g => {
    if (!byCat[g.categoria]) byCat[g.categoria] = 0;
    byCat[g.categoria] += g.monto;
  });

  const catList = Object.entries(byCat)
    .map(([cat, total]) => ({ cat, total }))
    .sort((a, b) => b.total - a.total);

  const totalAll = catList.reduce((s, c) => s + c.total, 0);

  if (gastos.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No hay datos suficientes para mostrar estadísticas.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {catList.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Distribución por categoría</h3>
          <div className={styles.chartCard}>
            <div className={styles.chartLayout}>
              <div className={styles.donutWrapper}>
                <DonutChart slices={catList} total={totalAll} />
              </div>
              <ul className={styles.legend}>
                {catList.map(({ cat, total }, i) => (
                  <li key={cat} className={styles.legendItem}>
                    <span
                      className={styles.legendDot}
                      style={{ background: PALETTE[i % PALETTE.length] }}
                    />
                    <span className={styles.legendName}>{cat}</span>
                    <span className={styles.legendPct}>
                      {totalAll > 0 ? `${((total / totalAll) * 100).toFixed(1)}%` : '0%'}
                    </span>
                    <span className={styles.legendAmount}>{formatMonto(total)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
