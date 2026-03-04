import React, { useState, useRef, useEffect } from 'react';
import styles from './Generala.module.css';
import { XCircleIcon } from '@/components';

export const ScoreItem = ({ cat, scoreValue, onSave, onModify, isViewingOther }) => {
    const isScored = scoreValue !== undefined;
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contentRef.current && !contentRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (val, e) => {
        e.stopPropagation();
        onSave(cat.id, val);
        setIsOpen(false);
    };

    const toggleOpen = () => {
        if (!isOpen) setIsOpen(true);
    };

    if (isScored) {
        return (
            <div className={`${styles.categoryInputRow} ${styles.scoredOpacity}`}>
                <div className={styles.catLeft}>
                    <span className={`${styles.catInputName} ${scoreValue === 0 ? styles.crossedText : ''}`}>{cat.name}</span>
                </div>

                <div className={styles.catCenter}>
                    {!isViewingOther && (
                        <button className={styles.deleteIconBtn} onClick={() => onModify(cat.id)} title="Modificar/Eliminar jugada">
                            <XCircleIcon size={16} />
                        </button>
                    )}
                </div>

                <div className={styles.catRight}>
                    <span className={styles.scoreResult}>
                        {scoreValue === 0 ? 'Tachado' : scoreValue}
                    </span>
                </div>
            </div>
        );
    }

    if (isViewingOther) {
        return (
            <div className={styles.categoryInputRow}>
                <div className={styles.catLeft}>
                    <span className={styles.catInputName}>{cat.name}</span>
                </div>
                <div className={styles.catRight}>
                    <span className={styles.emptyScoreLabel}>--</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.categoryInputRow} ${styles.interactiveRow}`} ref={contentRef} onClick={toggleOpen}>
            <div className={styles.catLeft}>
                <span className={styles.catInputName}>{cat.name}</span>
            </div>
            <div className={styles.catRight}>
                <span className={styles.addScoreHint}>Anotar...</span>
            </div>

            {isOpen && (
                <div className={styles.scorePopover} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.scoreOptionsGrid}>
                        {[...cat.options].sort((a, b) => {
                            if (a === 0) return 1;
                            if (b === 0) return -1;
                            return a - b;
                        }).map(opt => {
                            let label = opt;
                            let isServida = false;

                            if (opt === 0) {
                                label = 'Tachar';
                            } else if (cat.id === 'escalera' && opt === 25) {
                                label = '25 (Servida)';
                                isServida = true;
                            } else if (cat.id === 'full' && opt === 35) {
                                label = '35 (Servida)';
                                isServida = true;
                            } else if (cat.id === 'poker' && opt === 45) {
                                label = '45 (Servida)';
                                isServida = true;
                            }

                            return (
                                <button
                                    key={opt}
                                    className={`${styles.scoreOptionBtn} ${opt === 0 ? styles.scoreOptionCross : ''} ${isServida ? styles.scoreOptionServida : ''}`}
                                    onClick={(e) => handleSelect(opt, e)}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
