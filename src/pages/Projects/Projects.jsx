import React, { useEffect } from 'react';
import styles from './Projects.module.css';
import ProjectCard from '../../components/UI/ProjectCard/ProjectCard';
import { projects } from '../../data/projects';

const Projects = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.projectsPage}>
            <header className={styles.header}>
                <h1 className={styles.title}>Mis Proyectos</h1>
                <p className={styles.subtitle}>
                    Una selección de mis trabajos más recientes en desarrollo web,
                    aplicaciones y soluciones digitales.
                </p>
                <div className={styles.divider}></div>
            </header>

            <section className={styles.projectsGridSection}>
                <div className={styles.projectsGrid}>
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            {...project}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Projects;
