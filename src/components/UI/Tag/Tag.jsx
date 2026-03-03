import React from 'react';
import styles from './Tag.module.css';

const Tag = ({ children, className }) => {
    return (
        <span className={`${styles.tag} ${className || ''}`}>
            {children}
        </span>
    );
};

export default Tag;
