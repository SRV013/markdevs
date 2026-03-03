import React from 'react';
import styles from './Page.module.css';

const Page = ({ children, className = '', containerClassName = '', contentClassName = '', title }) => {
    return (
        <div className={`${styles.page} ${className}`}>
            <div className={`${styles.container} ${containerClassName}`}>
                <div className={`${styles.content} ${contentClassName}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export { Page };
