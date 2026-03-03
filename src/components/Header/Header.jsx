import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const location = useLocation();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const navItems = [
        { label: 'Inicio', href: '/' },
        { label: 'Proyectos', href: '/#proyectos' },
        { label: 'Sobre mí', href: '/sobre-mi' },
        { label: 'Contacto', href: '/contacto' }
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    const handleNavClick = (e, item) => {
        // Solo anclas del Home
        if (location.pathname === '/' && item.href.includes('#')) {
            const anchorId = item.href.split('#')[1];
            scrollToSection(anchorId);
            e.preventDefault();
        } else if (item.href === '/' && location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsMenuOpen(false);
            e.preventDefault();
        } else {
            setIsMenuOpen(false);
        }
    };

    return (
        <div className={styles.headerContent}>
            <div className={styles.left}>
                <Link to="/" className={styles.logo} onClick={(e) => handleNavClick(e, { href: '/' })}>
                    <span className={styles.logoBracket}>{`</>`}</span>
                    <span className={styles.logoText}>markdevs</span>
                </Link>
            </div>

            <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        to={item.href}
                        className={`${styles.navLink} ${(location.pathname === item.href || (location.pathname === '/' && item.href.includes('#'))) ? styles.active : ''}`}
                        onClick={(e) => handleNavClick(e, item)}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className={styles.right}>
                <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Cambiar tema">
                    {theme === 'dark' ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
                    ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                    )}
                </button>

                <button className={styles.menuButton} onClick={toggleMenu} aria-label="Menú">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {isMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Header;
