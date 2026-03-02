import React from 'react';
import styles from './Home.module.css';
import Button from '../../components/UI/Button/Button';
import Card from '../../components/UI/Card/Card';
import { FrontendIcon, BackendIcon, FullStackIcon } from '../../components/Icons/Icons';
import ProjectCard from '../../components/UI/ProjectCard/ProjectCard';

// Importar imágenes de proyectos
import imgProyecto1 from '../../assets/projects/proyecto1.jpg';
import imgProyecto2 from '../../assets/projects/proyecto2.jpg';
import imgProyecto3 from '../../assets/projects/proyecto3.jpg';

const Home = () => {
    const services = [
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

    const projects = [
        {
            title: 'YaMiPC',
            category: 'E-commerce',
            description: 'Tienda online especializada en hardware y servicios técnicos personalizados.',
            tags: ['JavaScript', 'Node.js', 'React', 'MySQL'],
            image: imgProyecto1,
            link: 'https://yamipc.com'
        },
        {
            title: 'Provemix',
            category: 'Catálogo & Institucional',
            description: 'Plataforma institucional y catálogo completo para servicios de veterinaria.',
            tags: ['React', 'JavaScript', 'CSS Modules'],
            image: imgProyecto2,
            link: 'https://provemix.com.ar'
        },
        {
            title: 'Estudio Contable RDB',
            category: 'Institucional',
            description: 'Sitio institucional profesional para estudio contable y asesoría integral.',
            tags: ['Astro', 'Tailwind'],
            image: imgProyecto3,
            link: 'https://estudiordb.com.ar'
        }
    ];

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
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            {...project}
                        />
                    ))}
                </div>

                <div className={styles.viewMoreContainer}>
                    <Button variant="primary">Ver todos los proyectos</Button>
                </div>
            </section>
        </div>
    );
};

export default Home;
