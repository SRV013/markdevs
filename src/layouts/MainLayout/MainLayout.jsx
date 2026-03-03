import React from 'react';
import { Header, Footer } from '@/components';
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <header className={styles.headerWrapper}>
                <div className={styles.container}>
                    <Header />
                </div>
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footerWrapper}>
                <div className={styles.container}>
                    <Footer />
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
