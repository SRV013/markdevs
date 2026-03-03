import React from 'react';
import styles from './Card.module.css';

const Card = ({
    children,
    title,
    description,
    icon,
    className = '',
    padding = 'medium',
    hover = true,
    hoverEffect = 'none',
    variant = 'glass',
    noBorder = false
}) => {
    const cardClasses = [
        styles.card,
        styles[`padding-${padding}`],
        hover ? styles.hoverable : '',
        styles[`hover-${hoverEffect}`],
        styles[variant],
        noBorder ? styles.noBorder : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={cardClasses}>
            {icon && <div className={styles.iconWrapper}>{icon}</div>}
            {title && <h3 className={styles.cardTitle}>{title}</h3>}
            {description && <p className={styles.cardDescription}>{description}</p>}
            {children}
        </div>
    );
};

export { Card };
