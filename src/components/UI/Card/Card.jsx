import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, description, icon, className = '' }) => {
    return (
        <div className={`${styles.card} ${className}`}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </div>
    );
};

export default Card;
