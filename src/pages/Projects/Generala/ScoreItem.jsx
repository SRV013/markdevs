import React, { useState, useRef, useEffect } from "react";
import styles from "./Generala.module.css";

const idToClass = {
  1: "uno",
  2: "dos",
  3: "tres",
  4: "cuatro",
  5: "cinco",
  6: "seis",
};

const SERVIDA_VALUE = {
  escalera: 25,
  full: 35,
  poker: 45,
  generala: 50,
  generala_doble: 100,
};

export const ScoreItem = ({ cat, scoreValue, isDisabled, onSave, onModify }) => {
  const areaClass = idToClass[cat.id] ?? cat.id;
  const isScored = scoreValue != null;
  const isTrue = isScored && scoreValue > 0;
  const isFalse = isScored && scoreValue === 0;
  const isServida = isTrue && SERVIDA_VALUE[cat.id] === scoreValue;
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (val, e) => {
    e.stopPropagation();
    onSave?.(cat.id, val);
    setIsOpen(false);
  };

  const toggleOpen = () => {
    if (isDisabled) return;
    if (!isOpen) setIsOpen(true);
    if (isScored) onModify?.(cat.id);
  };

  const rowClass = [
    styles.interactiveRow,
    styles[areaClass],
    isServida ? styles.interactiveRowServida
      : isFalse ? styles.interactiveRowFalse
      : isTrue ? styles.interactiveRowTrue
      : "",
    isDisabled ? styles.interactiveRowDisabled : "",
  ].join(" ");

  return (
    <div className={rowClass} ref={contentRef} onClick={toggleOpen}>
      {cat.icon && (
        <span className={`${styles.gameIcon} ${isServida ? styles.gameIconServida : isTrue ? styles.gameIconTrue : isFalse ? styles.gameIconFalse : ""}`}>
          <cat.icon />
        </span>
      )}
      <span className={`${styles.gameName} ${isServida ? styles.gameNameServida : isTrue ? styles.gameNameTrue : isFalse ? styles.gameNameFalse : ""}`}>
        {cat.name}
      </span>
      <span className={`${styles.gameOption} ${isServida ? styles.gameOptionServida : isTrue ? styles.gameOptionTrue : isFalse ? styles.gameOptionFalse : ""}`}>
        {isFalse ? "X" : isTrue ? scoreValue : cat.options[1]}
      </span>

      {isOpen && (
        <div className={styles.gamePopover} onClick={(e) => e.stopPropagation()}>
          {[...cat.options]
            .sort((a, b) => {
              if (a === 0) return 1;
              if (b === 0) return -1;
              return a - b;
            })
            .map((opt) => {
              let label = opt;
              if (opt === 0) label = "Tachar";
              else if (cat.id === "escalera" && opt === 25) label = "Servida (25)";
              else if (cat.id === "full" && opt === 35) label = "Servida (35)";
              else if (cat.id === "poker" && opt === 45) label = "Servida (45)";
              return (
                <button
                  key={opt}
                  className={opt === 0 ? styles.gamePoeverBtnTacha : styles.gamePoeverBtn}
                  onClick={(e) => handleSelect(opt, e)}
                >
                  {label}
                </button>
              );
            })}
          <button className={styles.close} onClick={() => setIsOpen(false)}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};
