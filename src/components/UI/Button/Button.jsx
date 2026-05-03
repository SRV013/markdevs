import { Link } from 'react-router-dom';
import styles from './Button.module.css';

const Button = ({ children, variant = 'primary', size, onClick, className = '', to, href, ...props }) => {
    const buttonClass = `${styles.button} ${styles[variant]} ${size ? styles[size] : ''} ${className}`.trim();

    if (to) {
        return <Link to={to} className={buttonClass} {...props}>{children}</Link>;
    }
    if (href) {
        return <a href={href} className={buttonClass} {...props}>{children}</a>;
    }
    return (
        <button className={buttonClass} onClick={onClick} {...props}>
            {children}
        </button>
    );
};

export { Button };
