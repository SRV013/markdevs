import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Sobre mí', href: '/sobre-mi' },
    { label: 'Contacto', href: '/contacto' }
];

const SharpIcon = (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="14" height="14" rx="0" />
    </svg>
);

const RoundedIcon = (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="14" height="14" rx="5" />
    </svg>
);

const SunIcon = (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
);

const MoonIcon = (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [style, setStyle] = useState(() => localStorage.getItem('style') || 'brutalist');
    const location = useLocation();
    const navRef = useRef(null);
    const menuButtonRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        if (style === 'rounded') {
            document.documentElement.setAttribute('data-style', 'rounded');
        } else {
            document.documentElement.removeAttribute('data-style');
        }
        localStorage.setItem('style', style);
    }, [style]);

    useEffect(() => {
        if (!isMenuOpen) return;
        const handleClickOutside = (e) => {
            if (
                navRef.current &&
                !navRef.current.contains(e.target) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(e.target)
            ) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
    const toggleStyle = () => setStyle(prev => prev === 'brutalist' ? 'rounded' : 'brutalist');

    const scrollToSection = (id) => {
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNavClick = (e, item) => {
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

            <nav ref={navRef} className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
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
                <button className={styles.styleToggle} onClick={toggleStyle} aria-label="Cambiar estilo">
                    {style === 'brutalist' ? RoundedIcon : SharpIcon}
                </button>

                <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Cambiar tema">
                    {theme === 'dark' ? SunIcon : MoonIcon}
                </button>

                <button
                    ref={menuButtonRef}
                    className={styles.menuButton}
                    onClick={toggleMenu}
                    aria-label="Menú"
                    aria-expanded={isMenuOpen}
                >
                    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {isMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
                    </svg>
                </button>
            </div>
        </div>
    );
};

export { Header };
