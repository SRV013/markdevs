import React from 'react';
import styles from './About.module.css';
import { Tag, Card, SectionHeader, Page, SEO } from '@/components';
import { aboutData } from '@/data';

const About = () => {
    const { experience, skills, stats, bio } = aboutData;

    return (
        <Page>
            <SEO
                title="Sobre Mí"
                path="/sobre-mi"
                description="Analista de Sistemas con más de 20 años de experiencia en desarrollo full-stack. Conocé mi trayectoria, habilidades y proyectos."
            />
            <div className={styles.topSection}>
                <div className={styles.leftCol}>
                    <SectionHeader
                        title="Sobre Mí"
                        divider={true}
                    />
                    <div className={styles.bio}>
                        <p className={styles.bioHighlight}>
                            {bio[0]}
                        </p>
                        {bio.slice(1).map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                <div className={styles.rightCol}>
                    <Card className={styles.aboutCard}>
                        <h2 className={styles.cardTitle}>Experiencia</h2>
                        <div className={styles.experienceList}>
                            {experience.map((item, index) => (
                                <div key={index} className={styles.experienceItem}>
                                    <span className={styles.role}>{item.role}</span>
                                    <span className={styles.period}>{item.period}</span>
                                    <span className={styles.detail}>{item.detail}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className={styles.aboutCard}>
                        <h2 className={styles.cardTitle}>Habilidades</h2>
                        <div className={styles.skillsGrid}>
                            {skills.map((skill, index) => (
                                <Tag key={index}>{skill}</Tag>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            <Card padding="large" hover={false} variant="flat">
                <div className={styles.statsSection}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </Page>
    );
};

export { About };
