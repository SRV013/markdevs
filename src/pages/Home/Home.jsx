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

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div id="inicio" className={styles.home}>
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
                    <Button variant="secondary" onClick={() => scrollToSection('contacto')}>
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

            <section id="contacto" className={styles.contact}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Trabajemos Juntos</h2>
                    <div className={styles.sectionDivider}></div>
                    <p className={styles.sectionSubtitle}>
                        ¿Tienes un proyecto en mente? Me encantaría escuchar sobre él.
                        Envíame un mensaje y te responderé lo antes posible.
                    </p>
                </div>

                <div className={styles.contactGrid}>
                    <div className={styles.contactCard}>
                        <div className={styles.contactIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        </div>
                        <h3>Email</h3>
                        <p>srv013@gmail.com</p>
                    </div>

                    <div className={styles.contactCard}>
                        <div className={styles.contactIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        </div>
                        <h3>Teléfono</h3>
                        <p>2235910296</p>
                    </div>

                    <div className={styles.contactCard}>
                        <div className={styles.contactIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        </div>
                        <h3>Ubicación</h3>
                        <p>Mar del Plata, Argentina</p>
                    </div>
                </div>

                <div className={styles.contactAction}>
                    <Button
                        variant="primary"
                        onClick={() => window.location.href = 'mailto:srv013@gmail.com'}
                    >
                        Enviar mail
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Home;
