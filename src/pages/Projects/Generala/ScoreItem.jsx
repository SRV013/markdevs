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

export const ScoreItem = ({
  cat,
  scoreValue,
  isDisabled,
  onSave,
  onDelete,
}) => {
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
  };

 
  // Clears the score and closes popover
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(cat.id);
    setIsOpen(false);
  };

  const stateClass = (f) =>
    isServida ? styles[`${f}Servida`] : isTrue ? styles[`${f}True`] : isFalse ? styles[`${f}False`] : "";

  const rowClass = [
    styles.interactiveRow,
    styles[areaClass],
    stateClass("interactiveRow"),
    isDisabled ? styles.interactiveRowDisabled : "",
  ].join(" ");

  return (
    <div className={rowClass} ref={contentRef} onClick={toggleOpen}>
      {cat.icon && (
        <span className={`${styles.gameIcon} ${stateClass("gameIcon")}`}>
          <cat.icon />
        </span>
      )}
      <span className={`${styles.gameName} ${stateClass("gameName")}`}>
        {cat.name}
      </span>
      <span className={`${styles.gameOption} ${stateClass("gameOption")}`}>
        {isFalse ? "X" : isTrue ? scoreValue : cat.options[1]}
      </span>


      {isOpen && (
        <div
          className={styles.gamePopover}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.close} onClick={() => setIsOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6l-12 12" /><path d="M6 6l12 12" />
            </svg>
          </button>
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
          {isScored && (
            <button className={styles.delete} onClick={handleDelete}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
