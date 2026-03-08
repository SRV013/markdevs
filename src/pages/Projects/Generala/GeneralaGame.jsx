import { useState } from "react";
import styles from "./Generala.module.css";
import { UserIcon, RefreshIcon, XCircleIcon, SettingsIcon } from "@/components";
import { ScoreItem } from "./ScoreItem";
import { jugadas } from "./util/data";

export const GeneralaGame = ({
  players,
  turnIndex,
  activeTabId,
  setActiveTabId,
  handleSaveScore,
  handleModifyScore,
  handleNextTurn,
  handleResetGame,
  handleAbandonGame,
}) => {
  const activePlayer = players.find((p) => p.id === activeTabId) || players[0];
  const playerWithTurn = players[turnIndex];
  const isViewingTurnPlayer = activePlayer?.id === playerWithTurn?.id;

  // { playerId, categoryId } — tracks one edit per session regardless of which player is viewed
  const [currentTurnCat, setCurrentTurnCat] = useState(null);
  const [configOpen, setConfigOpen] = useState(false);

  // Only "active" for the currently viewed player
  const activeTurnCat =
    currentTurnCat?.playerId === activePlayer?.id ? currentTurnCat.categoryId : null;

  const handleSaveForTurn = (playerId, categoryId, value) => {
    handleSaveScore(playerId, categoryId, value);
    setCurrentTurnCat({ playerId, categoryId });
  };

  const handleConfirmTurn = () => {
    setCurrentTurnCat(null);
    if (isViewingTurnPlayer) {
      handleNextTurn();
    }
  };

  // Cancel removes the score that was just made
  const handleCancelTurn = () => {
    if (currentTurnCat) {
      handleModifyScore(currentTurnCat.playerId, currentTurnCat.categoryId);
      setCurrentTurnCat(null);
    }
  };

  const handleClearItem = (playerId, categoryId) => {
    handleModifyScore(playerId, categoryId);
    if (currentTurnCat?.playerId === playerId && currentTurnCat?.categoryId === categoryId) {
      setCurrentTurnCat(null);
    }
  };

  // Show confirm row for turn player always, for others only when they have a pending change
  const showConfirmRow = isViewingTurnPlayer || activeTurnCat !== null;

  const orderedPlayers = [
    ...players.slice(turnIndex),
    ...players.slice(0, turnIndex),
  ];

  return (
    <div className={styles.gameArea}>
      <div className={styles.grid}>
        <div className={styles.controlsCol}>
          <JugasGrid
            jugadas={jugadas}
            activePlayer={activePlayer}
            activeTurnCat={activeTurnCat}
            handleSaveScore={handleSaveForTurn}
            handleModifyScore={handleModifyScore}
            handleClearItem={handleClearItem}
          />
          {showConfirmRow && (
            <div className={styles.confirmRow}>
              {activeTurnCat && (
                <button className={styles.clearTurnBtn} onClick={handleCancelTurn}>
                  Cancelar
                </button>
              )}
              <button
                className={`${styles.confirmTurnBtn} ${!activeTurnCat ? styles.confirmTurnBtnDisabled : ""}`}
                onClick={handleConfirmTurn}
                disabled={!activeTurnCat}
              >
                {isViewingTurnPlayer ? "Confirmar jugada" : "Guardar cambio"}
              </button>
            </div>
          )}
        </div>

        <div className={styles.sideCol}>
          {/* Mobile-only player switcher */}
          <div className={styles.mobilePlayerTabs}>
            {orderedPlayers.map((p) => {
              const hasTurn = players[turnIndex]?.id === p.id;
              const isActive = p.id === activeTabId;
              return (
                <button
                  key={p.id}
                  className={`${styles.mobilePlayerTab} ${isActive ? styles.mobilePlayerTabActive : ""} ${hasTurn ? styles.mobilePlayerTabTurn : ""}`}
                  onClick={() => setActiveTabId(p.id)}
                >
                  {hasTurn && "▶ "}{p.name}
                </button>
              );
            })}
          </div>

          {orderedPlayers.map((p) => {
            const pScores = Object.values(p.scores).filter((v) => v != null);
            const pMoves = pScores.length;
            const pTotal = pScores.filter((v) => v > 0).reduce((a, b) => a + b, 0);
            const isViewing = p.id === activeTabId;
            const hasTurn = players[turnIndex]?.id === p.id;
            return (
              <div
                key={p.id}
                className={`${styles.result} ${isViewing ? styles.resultActive : ""} ${hasTurn ? styles.resultTurn : ""} ${!hasTurn ? styles.resultWaiting : ""} ${!isViewing ? styles.resultHiddenMobile : ""}`}
                onClick={() => setActiveTabId(p.id)}
              >
                <div className={styles.resultLeft}>
                  <span className={styles.resultLabel}>Puntaje</span>
                  <span className={styles.resultPoint}>{pTotal}</span>
                  {hasTurn && (
                    <span className={styles.resultLabel}>
                      Ronda <strong>{pMoves}</strong> / 11
                    </span>
                  )}
                  <span className={styles.resultName}>{p.name}</span>
                </div>
                <div
                  className={styles.resultIconRing}
                  style={{ "--progress": Math.round((pMoves / 11) * 100) }}
                >
                  <div className={styles.resultIconInner}>
                    <UserIcon size={hasTurn ? 28 : 18} />
                  </div>
                </div>
              </div>
            );
          })}

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
              <button onClick={handleResetGame} className={styles.actionBtnSecondary}>
                <RefreshIcon size={18} />
                Reiniciar partida
              </button>
              <button onClick={handleAbandonGame} className={styles.actionBtnDanger}>
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
  activeTurnCat,
  handleSaveScore,
  handleModifyScore,
  handleClearItem,
}) {
  const generalaDobleAvailable = activePlayer.scores["generala"] > 0;
  const gridClass = `${styles.jugadasGrid} ${generalaDobleAvailable ? styles.jugadasGridWithDoble : ""}`;

  return (
    <div className={gridClass}>
      {jugadas.map((e) => {
        const isScored = activePlayer.scores[e.id] != null;
        // Lock unscored items once one is already selected this session
        const isDisabled = activeTurnCat !== null && e.id !== activeTurnCat && !isScored;
        // Generala doble: hide entirely until generala común is scored with value > 0
        if (e.id === "generala_doble" && !generalaDobleAvailable) return null;

        return (
          <ScoreItem
            key={e.id}
            cat={e}
            scoreValue={activePlayer.scores[e.id]}
            isDisabled={isDisabled}
            onSave={(id, val) => handleSaveScore(activePlayer.id, id, val)}
            onModify={(id) => handleModifyScore(activePlayer.id, id)}
            onClear={(id) => handleClearItem(activePlayer.id, id)}
          />
        );
      })}
    </div>
  );
}
