import { useState, useRef, useEffect } from "react";
import styles from "./Generala.module.css";
import { Button } from "@/components";

export const GeneralaSetup = ({ players, setPlayers, onStart }) => {
  const [addingPlayer, setAddingPlayer] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (addingPlayer) inputRef.current?.focus();
  }, [addingPlayer]);

  const commitAdd = () => {
    if (playerNameInput.trim()) {
      setPlayers([
        ...players,
        { id: Date.now().toString(), name: playerNameInput.trim(), scores: {} },
      ]);
      setPlayerNameInput("");
    }
    setAddingPlayer(false);
  };

  const cancelAdd = () => {
    setPlayerNameInput("");
    setAddingPlayer(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") commitAdd();
    if (e.key === "Escape") cancelAdd();
  };

  const handleRemovePlayer = (id) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  return (
    <div className={styles.setupCard}>
      <h3>Configuración de la Partida</h3>

      <div className={styles.playerGrid}>
        {players.map((p, index) => (
          <div key={p.id} className={styles.playerChip}>
            <span className={styles.playerChipIndex}>{index + 1}</span>
            <span className={styles.playerChipName}>{p.name}</span>
            <button className={styles.playerChipRemove} onClick={() => handleRemovePlayer(p.id)}>×</button>
          </div>
        ))}

        {addingPlayer ? (
          <div className={styles.playerChipAdding}>
            <input
              ref={inputRef}
              type="text"
              value={playerNameInput}
              onChange={(e) => setPlayerNameInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nombre del jugador..."
              className={styles.playerChipInput}
            />
            <button className={styles.playerChipConfirm} onClick={commitAdd}>✓</button>
            <button className={styles.playerChipCancel} onClick={cancelAdd}>×</button>
          </div>
        ) : (
          <button className={styles.addPlayerBtn} onClick={() => setAddingPlayer(true)}>
            <span className={styles.addPlayerBtnPlus}>+</span>
            Agregar jugador
          </button>
        )}
      </div>

      {players.length < 2 && (
        <p className={styles.warningText}>
          {players.length === 0
            ? "Añade al menos 2 jugadores para comenzar."
            : "Añade 1 jugador más para comenzar."}
        </p>
      )}

      <Button
        variant="primary"
        className={styles.startBtn}
        onClick={onStart}
        disabled={players.length < 2}
      >
        Comenzar Partida
      </Button>
    </div>
  );
};
