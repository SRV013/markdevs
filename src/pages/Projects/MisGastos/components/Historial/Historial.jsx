import { formatMonto, isSameMonth } from '../../utils';
import styles from './Historial.module.css';

const MONTH_NAMES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

function getLast6Months() {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return {
      year: d.getFullYear(),
      month: d.getMonth(),
      label: MONTH_NAMES[d.getMonth()],
      yearLabel: String(d.getFullYear()).slice(2),
      isCurrent: d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth(),
    };
  });
}

function BarChart({ data }) {
  const maxVal = Math.max(...data.map(d => d.value), 1);
  const H = 150;
  const barW = 38;
  const gap = 14;
  const cols = data.length;
  const svgW = cols * (barW + gap) - gap + 16;

  return (
    <svg viewBox={`0 0 ${svgW} ${H + 38}`} width="100%" style={{ display: 'block' }}>
      {data.map((d, i) => {
        const x = 8 + i * (barW + gap);
        const barH = Math.max(d.value > 0 ? (d.value / maxVal) * H : 0, d.value > 0 ? 4 : 0);
        const y = H - barH;
        const kVal = d.value >= 1000 ? `${(d.value / 1000).toFixed(0)}k` : d.value > 0 ? String(d.value) : '';
        return (
          <g key={i}>
            <rect
              x={x} y={y} width={barW} height={barH}
              fill="var(--accent-color)"
              rx="5"
              opacity={d.isCurrent ? 1 : 0.55}
            />
            {kVal && (
              <text x={x + barW / 2} y={y - 5} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
                {kVal}
              </text>
            )}
            <text x={x + barW / 2} y={H + 16} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
              {d.label}
            </text>
            <text
              x={x + barW / 2} y={H + 30}
              textAnchor="middle" fontSize="10"
              fill={d.isCurrent ? 'var(--accent-color)' : 'var(--text-secondary)'}
              fontWeight={d.isCurrent ? '700' : '400'}
            >
              {d.yearLabel}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Historial({ gastos }) {
  const now = new Date();
  const months = getLast6Months();

  const chartData = months.map(m => ({
    ...m,
    value: gastos
      .filter(g => g.tipo === 'variable' && isSameMonth(g.fecha, m.year, m.month))
      .reduce((sum, g) => sum + g.monto, 0),
  }));

  const byCat = {};
  gastos.forEach(g => {
    if (!byCat[g.categoria]) byCat[g.categoria] = 0;
    byCat[g.categoria] += g.monto;
  });
  const catList = Object.entries(byCat)
    .map(([cat, total]) => ({ cat, total }))
    .sort((a, b) => b.total - a.total);
  const totalAll = catList.reduce((s, c) => s + c.total, 0);

  const monthlyVals = chartData.map(d => d.value);
  const avgMonthly = monthlyVals.reduce((s, v) => s + v, 0) / 6;
  const maxMonthly = Math.max(...monthlyVals, 0);
  const totalVariables = gastos.filter(g => g.tipo === 'variable').reduce((s, g) => s + g.monto, 0);

  if (gastos.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No hay datos suficientes para mostrar estadísticas.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Variables — últimos 6 meses</h3>
        <div className={styles.chartCard}>
          <BarChart data={chartData} />
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Promedio mensual</span>
          <span className={styles.statValue}>{formatMonto(avgMonthly)}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Mes más alto</span>
          <span className={styles.statValue}>{formatMonto(maxMonthly)}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total variables</span>
          <span className={styles.statValue}>{formatMonto(totalVariables)}</span>
        </div>
      </div>

      {catList.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Por categoría — acumulado</h3>
          <ul className={styles.catList}>
            {catList.map(({ cat, total }) => (
              <li key={cat} className={styles.catItem}>
                <div className={styles.catInfo}>
                  <span className={styles.catName}>{cat}</span>
                  <span className={styles.catAmount}>{formatMonto(total)}</span>
                </div>
                <div className={styles.catBarRow}>
                  <div className={styles.catBar}>
                    <div
                      className={styles.catBarFill}
                      style={{ width: `${totalAll > 0 ? (total / totalAll) * 100 : 0}%` }}
                    />
                  </div>
                  <span className={styles.catPct}>
                    {totalAll > 0 ? `${((total / totalAll) * 100).toFixed(1)}%` : '0%'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
