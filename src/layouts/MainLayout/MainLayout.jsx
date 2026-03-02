import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
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
                <div className={styles.container}>
                    {children}
                </div>
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
