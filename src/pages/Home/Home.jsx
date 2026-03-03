import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { Button, Card, SectionHeader, Page, ProjectCard, FrontendIcon, BackendIcon, FullStackIcon } from '@/components';
import { projects, homeData } from '@/data';

const Home = () => {
    const { services } = homeData;

    // Mostrar solo los primeros 3 proyectos en el Home
    const featuredProjects = projects.slice(0, 3);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Page>
            <section className={styles.hero}>
                <h1 className={styles.title}>
                    Creando Experiencias Digitales <span className={styles.accent}>No Solo Sitios Web.</span>
                </h1>
                <p className={styles.description}>
                    Soy un desarrollador full-stack especializado en construir experiencias digitales excepcionales.
                    Con mas de 20 proyectos exitosos, doy vida a las ideas con tecnologías modernas.
                </p>
                <div className={styles.actions}>
                    <Button variant="primary" onClick={() => scrollToSection('proyectos')}>
                        Ver proyectos
                    </Button>
                    <Link to="/contacto">
                        <Button variant="secondary">
                            Contactar
                        </Button>
                    </Link>
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

            <section id="proyectos" className={styles.projects}>
                <SectionHeader
                    title="Proyectos Destacados"
                    centered
                />

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
        </Page>
    );
};

export { Home };
