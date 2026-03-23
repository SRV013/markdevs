import { useState } from 'react';
import styles from './MontoInput.module.css';

function toDisplay(num) {
  if (!num && num !== 0) return '';
  const [int, dec] = num.toFixed(2).split('.');
  const formattedInt = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formattedInt},${dec}`;
}

function toNumber(raw) {
  const clean = raw.replace(/\./g, '').replace(',', '.');
  const n = parseFloat(clean);
  return isNaN(n) ? 0 : n;
}

export function MontoInput({ value, onChange }) {
  const [display, setDisplay] = useState(() => value ? toDisplay(value) : '');

  const handleChange = (e) => {
    let raw = e.target.value;
    raw = raw.replace(/\./g, '');
    raw = raw.replace(/[^\d,]/g, '');
    const parts = raw.split(',');
    if (parts.length > 2) return;
    if (parts[1] !== undefined && parts[1].length > 2) return;

    const formattedInt = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const newDisplay = parts[1] !== undefined ? `${formattedInt},${parts[1]}` : formattedInt;
    setDisplay(newDisplay);
    onChange(toNumber(raw));
  };

  const handleBlur = () => {
    const num = toNumber(display.replace(/\./g, ''));
    setDisplay(num > 0 ? toDisplay(num) : '');
  };

  return (
    <input
      className={styles.input}
      type="text"
      inputMode="decimal"
      value={display}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="0,00"
    />
  );
}
