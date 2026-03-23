import { ProjectPage, PageHeader } from '@/components';
import styles from './MisGastos.module.css';

export function MisGastos() {
  return (
    <ProjectPage>
      <PageHeader
        preText="Mis"
        accent="Gastos"
        subtitle="Registrá, organizá y visualizá tus gastos personales de forma simple y rápida."
      />

      <div className={styles.comingSoon}>
        <span className={styles.comingSoonText}>Próximamente</span>
        <p className={styles.comingSoonDesc}>
          Esta sección está en desarrollo. Volvé pronto.
        </p>
      </div>
    </ProjectPage>
  );
}
