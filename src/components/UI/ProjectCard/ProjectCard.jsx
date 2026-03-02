import React from 'react';
import styles from './ProjectCard.module.css';
import Button from '../Button/Button';

const ProjectCard = ({ image, category, title, description, tags = [], link = '#' }) => {
    return (
        <div className={styles.projectCard}>
            <div className={styles.imageWrapper}>
                <img src={image} alt={title} className={styles.image} />
                <div className={styles.categoryBadge}>{category}</div>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.tags}>
                    {tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>{tag}</span>
                    ))}
                </div>
                <Button variant="secondary" className={styles.detailsBtn} onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}>
                    Ver detalles
                </Button>
            </div>
        </div>
    );
};

export default ProjectCard;
