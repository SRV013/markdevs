import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                © {new Date().getFullYear()} Mi Proyecto. Todos los derechos reservados.
            </p>
        </footer>
    );
};

export { Footer };
