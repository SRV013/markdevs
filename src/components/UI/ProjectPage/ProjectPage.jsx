import { Page } from '@/components/UI/Page/Page';
import styles from './ProjectPage.module.css';

const ProjectPage = ({ children }) => {
  return (
    <Page>
      <div className={styles.wrapper}>
        {children}
      </div>
    </Page>
  );
};

export { ProjectPage };
