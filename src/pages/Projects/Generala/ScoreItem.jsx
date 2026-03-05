import React, { useState, useRef, useEffect } from "react";
import styles from "./Generala.module.css";

export const ScoreItem = ({ cat, id, scoreValue, onSave, onModify }) => {
  const isScored = scoreValue;
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const gridMap = {
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    escalera: "escalera",
    full: "full",
    poker: "poker",
    generala: "generala",
    generala_doble: "generala_doble",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
      <div
        style={{ gridArea: gridMap[id] }}
        className={`${styles.interactiveRow} ${styles.scoredOpacity}`}
        onClick={() => onModify?.(cat.id)}
      >
        <span className={styles.jugada}>{cat.name}</span>
        <span className={styles.jugadaResult}>
          {scoreValue === 0 ? "X" : scoreValue}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{ gridArea: gridMap[id] }}
      className={styles.interactiveRow}
      ref={contentRef}
      onClick={toggleOpen}
    >
      <span className={styles.jugada}>{cat.name}</span>
      <span className={styles.jugadaResult}>
        {scoreValue === 0 ? "X" : scoreValue}
      </span>

      {isOpen && (
        <div
          className={styles.scorePopover}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.scoreOptionsGrid}>
            {[...cat.options]
              .sort((a, b) => {
                if (a === 0) return 1;
                if (b === 0) return -1;
                return a - b;
              })
              .map((opt) => {
                let label = opt;
                let isServida = false;

                if (opt === 0) {
                  label = "Tachar X";
                } else if (cat.id === "escalera" && opt === 25) {
                  label = "25 | Servida";
                  isServida = true;
                } else if (cat.id === "full" && opt === 35) {
                  label = "35 | Servida";
                  isServida = true;
                } else if (cat.id === "poker" && opt === 45) {
                  label = "45 | Servida";
                  isServida = true;
                }

                return (
                  <button
                    key={opt}
                    className={`${styles.scoreOptionBtn} ${
                      opt === 0 ? styles.scoreOptionCross : ""
                    } ${isServida ? styles.scoreOptionServida : ""}`}
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