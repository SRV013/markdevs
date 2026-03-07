import React, { useState } from "react";
import styles from "./Generala.module.css";
import { Card, Button } from "@/components";

export const GeneralaSetup = ({ players, setPlayers, onStart }) => {
  const [playerNameInput, setPlayerNameInput] = useState("");

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (playerNameInput.trim()) {
      setPlayers([
        ...players,
        { id: Date.now().toString(), name: playerNameInput.trim(), scores: {} },
      ]);
      setPlayerNameInput("");
    }
  };

  const handleRemovePlayer = (id) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  const handleStartGame = () => {
    if (players.length >= 2) {
      onStart();
    } else {
      alert("Mínimo 2 jugadores para iniciar.");
    }
  };

  return (
    <Card className={styles.setupCard}>
      <h3>Configuración de la Partida</h3>
      <form onSubmit={handleAddPlayer} className={styles.addPlayerForm}>
        <input
          type="text"
          value={playerNameInput}
          onChange={(e) => setPlayerNameInput(e.target.value)}
          placeholder="Nombre del jugador"
          className={styles.input}
        />
        <Button type="submit" variant="primary">
          Añadir
        </Button>
      </form>

      <ul className={styles.playerList}>
        {players.map((p, index) => (
          <li key={p.id} className={styles.playerItem}>
            <span className={styles.playerItemName}>
              Jugador {index + 1}: <strong>{p.name}</strong>
            </span>
            <div className={styles.iconWrapper}>
              <button
                onClick={() => handleRemovePlayer(p.id)}
                className={styles.removeBtn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {players.length < 2 && (
        <p className={styles.warningText}>
          Añade al menos {2 - players.length} jugador(es) más para comenzar.
        </p>
      )}
      <Button
        variant="primary"
        className={styles.startBtn}
        onClick={handleStartGame}
        disabled={players.length < 2}
      >
        Comenzar Partida
      </Button>
    </Card>
  );
};
