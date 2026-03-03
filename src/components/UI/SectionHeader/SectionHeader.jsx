import React from 'react';
import styles from './SectionHeader.module.css';

const SectionHeader = ({
    title,
    subtitle,
    divider = true,
    centered = false,
    className = ''
}) => {
    return (
        <header className={`${styles.header} ${centered ? styles.centered : ''} ${className}`}>
            <h2 className={styles.title}>{title}</h2>
            {divider && <div className={styles.divider}></div>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </header>
    );
};

export { SectionHeader };
