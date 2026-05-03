import React from 'react';
import styles from './Home.module.css';
import { Button, Card, SectionHeader, Page, ProjectCard, FrontendIcon, BackendIcon, FullStackIcon, SEO } from '@/components';
import { projects, homeData } from '@/data';

const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'markdevs',
    jobTitle: 'Desarrollador Full-Stack',
    description: 'Analista de Sistemas con más de 20 años de experiencia en desarrollo de software.',
    knowsAbout: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'PHP', 'MySQL'],
};

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
            <SEO
                path="/"
                description="Desarrollador full-stack especializado en construir experiencias digitales excepcionales. Más de 20 años de experiencia y 50 proyectos completados."
                jsonLd={personJsonLd}
            />
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
                    <Button variant="secondary" to="/contacto">
                        Contactar
                    </Button>
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
                    <Button variant="primary" to="/proyectos">Ver todos los proyectos</Button>
                </div>
            </section>
        </Page>
    );
};

export { Home };
