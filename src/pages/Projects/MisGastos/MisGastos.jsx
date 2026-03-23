import { useState } from 'react';
import { ProjectPage, PageHeader, PageTabs } from '@/components';
import { useGastos } from './hooks/useGastos';
import { formatMonto, getNextDueDate, isSameMonth, isPaidThisMonth } from './utils';
import { Gastos } from './components/Gastos/Gastos';
import { Historial } from './components/Historial/Historial';
import { GastoModal } from './components/GastoModal/GastoModal';
import styles from './MisGastos.module.css';

const TABS = [
  { id: 'gastos', label: 'Gastos' },
  { id: 'historial', label: 'Historial' },
];

function StripCard({ label, value, count, detail, mod }) {
  return (
    <div className={`${styles.stripCard} ${mod ? styles[mod] : ''}`}>
      <div className={styles.stripTop}>
        <span className={styles.stripLabel}>{label}</span>
        <span className={styles.stripCount}>{count}</span>
      </div>
      <span className={styles.stripValue}>{value}</span>
      {detail && <span className={styles.stripDetail}>{detail}</span>}
    </div>
  );
}

function StatsStrip({ gastos, tab }) {
  const now = new Date();
  const fijosActivos = gastos.filter(g => g.tipo === 'fijo' && g.activo);
  const variables = gastos.filter(g => g.tipo === 'variable');

  if (tab === 'historial') {
    const totalFijos = fijosActivos.reduce((s, g) => s + g.monto, 0);
    const totalVariables = variables.reduce((s, g) => s + g.monto, 0);
    const totalAll = totalFijos + totalVariables;
    const fijosPausados = gastos.filter(g => g.tipo === 'fijo' && !g.activo).length;

    return (
      <div className={styles.strip}>
        <StripCard
          label="Fijos activos / mes"
          value={formatMonto(totalFijos)}
          count={`${fijosActivos.length} registros`}
          detail={fijosPausados > 0 ? `${fijosPausados} pausado${fijosPausados > 1 ? 's' : ''}` : 'Todos activos'}
        />
        <StripCard
          label="Variables registrado"
          value={formatMonto(totalVariables)}
          count={`${variables.length} registros`}
          detail={variables.length > 0 ? `Promedio ${formatMonto(Math.round(totalVariables / variables.length))}` : 'Sin registros'}
        />
        <StripCard
          label="Total acumulado"
          value={formatMonto(totalAll)}
          count={`${gastos.length} registros`}
          detail={`${fijosActivos.length} fijos · ${variables.length} variables`}
        />
      </div>
    );
  }

  const variablesMes = gastos.filter(g => g.tipo === 'variable' && isSameMonth(g.fecha, now.getFullYear(), now.getMonth()));
  const totalMes =
    fijosActivos.reduce((s, g) => s + g.monto, 0) +
    variablesMes.reduce((s, g) => s + g.monto, 0);

  const atrasadosList = fijosActivos.filter(g => g.diaCobro < now.getDate());
  const proximosList = fijosActivos.filter(g => getNextDueDate(g.diaCobro).days <= 7);

  const toDetail = (list) => {
    if (list.length === 0) return null;
    const names = list.slice(0, 2).map(g => g.nombre).join(', ');
    return list.length > 2 ? `${names} +${list.length - 2} más` : names;
  };

  return (
    <div className={styles.strip}>
      <StripCard
        label="Total del mes"
        value={formatMonto(totalMes)}
        count={`${fijosActivos.length + variablesMes.length} registros`}
        detail={`${fijosActivos.length} fijos · ${variablesMes.length} variables`}
      />
      <StripCard
        label="Vencidos este mes"
        value={formatMonto(atrasadosList.reduce((s, g) => s + g.monto, 0))}
        count={`${atrasadosList.length} de ${fijosActivos.length} fijos`}
        detail={toDetail(atrasadosList)}
        mod={atrasadosList.length > 0 ? 'stripDanger' : ''}
      />
      <StripCard
        label="Vencen en 7 días"
        value={formatMonto(proximosList.reduce((s, g) => s + g.monto, 0))}
        count={`${proximosList.length} de ${fijosActivos.length} fijos`}
        detail={toDetail(proximosList)}
        mod={proximosList.length > 0 ? 'stripWarn' : ''}
      />
    </div>
  );
}

export function MisGastos() {
  const [tab, setTab] = useState('gastos');
  const [modal, setModal] = useState({ open: false, editing: null });
  const { gastos, addGasto, editGasto, deleteGasto, pagarGasto } = useGastos();

  const openAdd  = () => setModal({ open: true, editing: null });
  const openEdit = (g) => setModal({ open: true, editing: g });
  const closeModal = () => setModal({ open: false, editing: null });

  const handleSave = (data) => {
    if (modal.editing) editGasto(modal.editing.id, data);
    else addGasto(data);
  };

  return (
    <ProjectPage>
      <PageHeader
        preText="Mis"
        accent="Gastos"
        subtitle="Organizá tus gastos fijos, variables y vencimientos en un solo lugar."
      />

      <PageTabs tabs={TABS} active={tab} onChange={setTab} />

      <StatsStrip gastos={gastos} tab={tab} />

      {tab === 'gastos' && (
        <Gastos
          gastos={gastos}
          onOpenAdd={openAdd}
          onOpenEdit={openEdit}
          onPagar={pagarGasto}
        />
      )}
{tab === 'historial' && <Historial gastos={gastos} />}

      <GastoModal
        open={modal.open}
        onClose={closeModal}
        onSave={handleSave}
        onDelete={deleteGasto}
        initial={modal.editing}
      />
    </ProjectPage>
  );
}
