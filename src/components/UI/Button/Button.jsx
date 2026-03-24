import styles from './Button.module.css';

const Button = ({ children, variant = 'primary', size, onClick, className = '', ...props }) => {
    const buttonClass = `${styles.button} ${styles[variant]} ${size ? styles[size] : ''} ${className}`.trim();

    return (
        <button className={buttonClass} onClick={onClick} {...props}>
            {children}
        </button>
    );
};

export { Button };
