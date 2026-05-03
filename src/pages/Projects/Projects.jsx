import React, { useEffect, useState, useMemo } from 'react';
import styles from './Projects.module.css';
import { ProjectCard, SectionHeader, Page, SEO } from '@/components';
import { projects } from '@/data';

const ALL = 'Todos';

const Projects = () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState(ALL);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    // Derive unique categories
    const categories = useMemo(() => {
        const cats = [...new Set(projects.map((p) => p.category))];
        return [ALL, ...cats];
    }, []);

    // Filter by category + search
    const filtered = useMemo(() => {
        return projects.filter((p) => {
            const matchCat = activeCategory === ALL || p.category === activeCategory;
            const term = search.toLowerCase();
            const matchSearch =
                !term ||
                p.title.toLowerCase().includes(term) ||
                p.description.toLowerCase().includes(term) ||
                p.tags.some((t) => t.toLowerCase().includes(term));
            return matchCat && matchSearch;
        });
    }, [search, activeCategory]);

    return (
        <Page>
            <SEO
                title="Proyectos"
                path="/proyectos"
                description="Explorá mis proyectos de desarrollo web: aplicaciones full-stack, herramientas y soluciones digitales a medida."
            />
            <SectionHeader
                title="Mis Proyectos"
                subtitle="Una selección de mis trabajos más recientes en desarrollo web, aplicaciones y soluciones digitales."
            />

            {/* Search */}
            <div className={styles.searchWrapper}>
                <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Buscar por nombre, descripción o tecnología..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <button className={styles.clearBtn} onClick={() => setSearch('')} aria-label="Limpiar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                )}
            </div>

            {/* Category filter */}
            <div className={styles.categories}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`${styles.categoryTag} ${activeCategory === cat ? styles.categoryActive : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
                <section className={styles.projectsGrid}>
                    {filtered.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </section>
            ) : (
                <div className={styles.empty}>
                    <p>No se encontraron proyectos para <strong>"{search}"</strong>.</p>
                </div>
            )}
        </Page>
    );
};

export { Projects };
