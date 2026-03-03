import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, variant = 'primary', onClick, className = '', ...props }) => {
    const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

    return (
        <button className={buttonClass} onClick={onClick} {...props}>
            {children}
        </button>
    );
};

export { Button };
