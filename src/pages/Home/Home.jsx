import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Card from '../../components/UI/Card/Card';
import { FrontendIcon, BackendIcon, FullStackIcon } from '../../components/Icons/Icons';
import ProjectCard from '../../components/UI/ProjectCard/ProjectCard';
import { projects } from '../../data/projects';

const Home = () => {
    const services = [
        // ... (this part can stay or be moved, but since it's only for Home, staying is fine)
        {
            title: 'Desarrollo Frontend',
            description: 'Creación de interfaces de usuario responsivas, interactivas y de alto rendimiento usando React y CSS moderno.',
            icon: <FrontendIcon />
        },
        {
            title: 'Arquitectura Backend',
            description: 'Construcción de APIs robustas y esquemas de base de datos escalables para potenciar aplicaciones complejas.',
            icon: <BackendIcon />
        },
        {
            title: 'Soluciones Full Stack',
            description: 'Desarrollo integral desde el concepto hasta el despliegue, asegurando una integración perfecta.',
            icon: <FullStackIcon />
        }
    ];

    // Mostrar solo los primeros 3 proyectos en el Home
    const featuredProjects = projects.slice(0, 3);

    return (
        <div className={styles.home}>
            <section className={styles.hero}>
                <h1 className={styles.title}>
                    Creando Experiencias Digitales <span className={styles.accent}>No Solo Sitios Web.</span>
                </h1>
                <p className={styles.description}>
                    Soy un desarrollador full-stack especializado en construir experiencias digitales excepcionales.
                    Con mas de 20 proyectos exitosos, doy vida a las ideas con tecnologías modernas.
                </p>
                <div className={styles.actions}>
                    <Button variant="primary">Ver proyectos</Button>
                    <Button variant="secondary">Contactar</Button>
                </div>
            </section>

            <section className={styles.services}>
                <div className={styles.servicesGrid}>
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                        />
                    ))}
                </div>
            </section>

            <section className={styles.projects}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Proyectos Destacados</h2>
                    <div className={styles.sectionDivider}></div>
                </div>

                <div className={styles.projectsGrid}>
                    {featuredProjects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            {...project}
                        />
                    ))}
                </div>

                <div className={styles.viewMoreContainer}>
                    <Link to="/proyectos">
                        <Button variant="primary">Ver todos los proyectos</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
