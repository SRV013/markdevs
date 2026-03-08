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

export const ScoreItem = ({ cat, scoreValue, onSave, onModify }) => {
  const areaClass = idToClass[cat.id] ?? cat.id;
  const isScored = scoreValue != null;
  const isTrue = isScored && scoreValue > 0;
  const isFalse = isScored && scoreValue === 0;
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

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

  const toggleOpen = (id) => {
    if (!isOpen) setIsOpen(true);
    onModify?.(id);
  };

  return (
    <div
      key={cat.id}
      className={`${styles.interactiveRow} ${styles[areaClass]} ${isFalse ? styles.interactiveRowFalse : isTrue ? styles.interactiveRowTrue : ""}`}
      ref={contentRef}
      onClick={() => toggleOpen(cat.id)}
    >
      {cat.icon && (
        <span className={`${styles.gameIcon} ${isTrue ? styles.gameIconTrue : isFalse ? styles.gameIconFalse : ""}`}>
          <cat.icon />
        </span>
      )}
      <span className={`${styles.gameName} ${isTrue ? styles.gameNameTrue : isFalse ? styles.gameNameFalse : ""}`}>
        {cat.name}
      </span>
      <span className={`${styles.gameOption} ${isTrue ? styles.gameOptionTrue : isFalse ? styles.gameOptionFalse : ""}`}>
        {isFalse ? "X" : isTrue ? scoreValue : cat.options[1]}
      </span>

      {isOpen && (
        <div
          className={styles.gamePopover}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.gamePopeverGrid}>
            {[...cat.options]
              .sort((a, b) => {
                if (a === 0) return 1;
                if (b === 0) return -1;
                return a - b;
              })
              .map((opt) => {
                let label = opt;

                if (opt === 0) {
                  label = "0";
                } else if (cat.id === "escalera" && opt === 25) {
                  label = "25";
                } else if (cat.id === "full" && opt === 35) {
                  label = "35";
                } else if (cat.id === "poker" && opt === 45) {
                  label = "45";
                }
                return (
                  <button
                    key={opt}
                    className={
                      opt === 0
                        ? styles.gamePoeverBtnTacha
                        : styles.gamePoeverBtn
                    }
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
