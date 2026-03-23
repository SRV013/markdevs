import { useState } from 'react';
import { ProjectPage, PageHeader, PageTabs } from '@/components';
import { useGastos } from './hooks/useGastos';
import { Resumen } from './components/Resumen/Resumen';
import { GastosFijos } from './components/GastosFijos/GastosFijos';
import { GastosVariables } from './components/GastosVariables/GastosVariables';
import { Vencimientos } from './components/Vencimientos/Vencimientos';

const TABS = [
  { id: 'fijos', label: 'Fijos' },
  { id: 'variables', label: 'Variables' },
  { id: 'vencimientos', label: 'Vencimientos' },
];

export function MisGastos() {
  const [tab, setTab] = useState('fijos');
  const {
    fijos, addFijo, editFijo, deleteFijo, toggleFijo,
    variables, addVariable, editVariable, deleteVariable,
  } = useGastos();

  return (
    <ProjectPage>
      <PageHeader
        preText="Mis"
        accent="Gastos"
        subtitle="Organizá tus gastos fijos, variables y vencimientos en un solo lugar."
      />

      <Resumen fijos={fijos} variables={variables} />

      <PageTabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'fijos' && (
        <GastosFijos
          fijos={fijos}
          onAdd={addFijo}
          onEdit={editFijo}
          onDelete={deleteFijo}
          onToggle={toggleFijo}
        />
      )}
      {tab === 'variables' && (
        <GastosVariables
          variables={variables}
          onAdd={addVariable}
          onEdit={editVariable}
          onDelete={deleteVariable}
        />
      )}
      {tab === 'vencimientos' && (
        <Vencimientos fijos={fijos} />
      )}
    </ProjectPage>
  );
}
