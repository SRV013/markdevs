import React from "react";
import styles from "./Generala.module.css";
import { UserIcon, RefreshIcon, XCircleIcon, SettingsIcon } from "@/components";
import { ScoreItem } from "./ScoreItem";
import { jugadas } from "./util/data";

export const GeneralaGame = ({
  players,
  turnIndex,
  activeTabId,
  activeTotal,
  playedMoves,
  setActiveTabId,
  handleSaveScore,
  handleModifyScore,
  handleResetGame,
  handleAbandonGame,
}) => {
  const activePlayer = players.find((p) => p.id === activeTabId) || players[0];
  const playerWithTurn = players[turnIndex];

  return (
    <div className={styles.gameArea}>
      {/* Mode tabs for players */}
      <div className={styles.tabs}>
        {players.map((p) => (
          <button
            key={p.id}
            className={`${styles.tab} ${activeTabId === p.id ? styles.tabActive : ""}`}
            onClick={() => setActiveTabId(p.id)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {/* Column 1: Play Form */}
        <div className={styles.controlsCol}>
          <JugasGrid
            jugadas={jugadas}
            activePlayer={activePlayer}
            handleSaveScore={handleSaveScore}
            handleModifyScore={handleModifyScore}
          />
        </div>
        {/* Column 2: Turn Info and Actions */}
        <div className={styles.sideCol}>
          <div className={styles.turnCardWrapper}>
            <div className={styles.turnCardHeader}>
              <div className={styles.iconWrapperTurn}>
                <UserIcon size={20} />
              </div>
              <span className={styles.configTitle}>Detalle del Juego</span>
            </div>
            <div className={styles.turnContent}>
              <div className={styles.turnName}>
                <span className={styles.activePlayerName}>
                  {playerWithTurn?.name}
                </span>
                <span className={styles.activePlayerGame}>
                  {" "}
                  {playedMoves} / 11 jugadas
                </span>
              </div>
              <div className={styles.turnPointsBox}>
                <div className={styles.turnPointsLabel}>Pts</div>
                <div className={styles.turnPointsData}>{activeTotal}</div>
              </div>
            </div>
          </div>
          <div className={styles.configCardWrapper}>
            <div className={styles.configHeader}>
              <div className={styles.iconWrapperTurn}>
                <SettingsIcon size={20} />
              </div>
              <span className={styles.configTitle}>Opciones de Juego</span>
            </div>
            <p className={styles.configSubtitle}>
              Administra el estado de la partida actual. Desde aquí puedes
              reiniciar los puntajes o abandonar el juego por completo.
            </p>
            <div className={styles.actionsBox}>
              <button
                onClick={handleResetGame}
                className={styles.actionBtnSecondary}
              >
                <RefreshIcon size={18} />
                Reiniciar partida
              </button>
              <button
                onClick={handleAbandonGame}
                className={styles.actionBtnDanger}
              >
                <XCircleIcon size={18} />
                Abandonar juego
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function JugasGrid({
  jugadas,
  activePlayer,
  handleSaveScore,
  handleModifyScore,
  isViewingOtherPlayer,
}) {
  return (
    <div className={styles.jugadasGrid}>
      {jugadas.map((e) => (
        <ScoreItem
          key={e.id}
          id={e.id}
          cat={e}
          scoreValue={activePlayer.scores[e.id]}
          onSave={(id, val) => handleSaveScore(activePlayer.id, id, val)}
          onModify={
            !isViewingOtherPlayer
              ? (id) => handleModifyScore(activePlayer.id, id)
              : undefined
          }
          isViewingOther={isViewingOtherPlayer}
        />
      ))}
    </div>
  );
}
