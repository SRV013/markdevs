import styles from './Tag.module.css';

const Tag = ({ children, className, onClick, active }) => {
    const cls = `${styles.tag} ${active ? styles.active : ''} ${onClick ? styles.clickable : ''} ${className || ''}`.trim();
    const El = onClick ? 'button' : 'span';
    return (
        <El type={onClick ? 'button' : undefined} className={cls} onClick={onClick}>
            {children}
        </El>
    );
};

export { Tag };
