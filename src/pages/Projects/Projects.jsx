import React, { useEffect } from 'react';
import styles from './Projects.module.css';
import { ProjectCard, SectionHeader, Page } from '@/components';
import { projects } from '@/data';

const Projects = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Page>
            <SectionHeader
                title="Mis Proyectos"
                subtitle="Una selección de mis trabajos más recientes en desarrollo web, aplicaciones y soluciones digitales."
            />
            <section className={styles.projectsGrid}>
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        {...project}
                    />
                ))}
            </section>
        </Page>
    );
};

export default Projects;
