import { useState } from 'react';
import { ProjectPage, PageHeader, PageTabs } from '@/components';
import { useGastos } from './hooks/useGastos';
import { Resumen } from './components/Resumen/Resumen';
import { Gastos } from './components/Gastos/Gastos';
import { Vencimientos } from './components/Vencimientos/Vencimientos';
import { Historial } from './components/Historial/Historial';

const TABS = [
  { id: 'gastos', label: 'Gastos' },
  { id: 'vencimientos', label: 'Vencimientos' },
  { id: 'historial', label: 'Historial' },
];

export function MisGastos() {
  const [tab, setTab] = useState('gastos');
  const { gastos, addGasto, editGasto, deleteGasto, toggleGasto } = useGastos();

  return (
    <ProjectPage>
      <PageHeader
        preText="Mis"
        accent="Gastos"
        subtitle="Organizá tus gastos fijos, variables y vencimientos en un solo lugar."
      />

      <Resumen gastos={gastos} />

      <PageTabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'gastos' && (
        <Gastos
          gastos={gastos}
          onAdd={addGasto}
          onEdit={editGasto}
          onDelete={deleteGasto}
          onToggle={toggleGasto}
        />
      )}
      {tab === 'vencimientos' && <Vencimientos gastos={gastos} />}
      {tab === 'historial' && <Historial gastos={gastos} />}
    </ProjectPage>
  );
}
