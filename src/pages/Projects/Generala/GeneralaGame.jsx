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
  handleRestoreScores,
  handleNextTurn,
  handleResetGame,
  handleAbandonGame,
}) => {
  const activePlayer = players.find((p) => p.id === activeTabId) || players[0];
  const playerWithTurn = players[turnIndex];
  const isViewingTurnPlayer = activePlayer?.id === playerWithTurn?.id;

  // turnAction: null | { playerId, categoryId, initialScores, deletedCategory? }
  // initialScores: snapshot of player scores before any change this turn
  // deletedCategory: set when action started with a delete (requires replacement before confirm)
  const [turnAction, setTurnAction] = useState(null);
  const [configOpen, setConfigOpen] = useState(false);

  const activeTurnCat =
    turnAction?.playerId === activePlayer?.id ? turnAction.categoryId : null;

  // Confirm is blocked if user deleted a score and hasn't picked a replacement yet
  const isPendingReplacement =
    turnAction?.deletedCategory != null &&
    turnAction.deletedCategory === turnAction.categoryId;

  const handleSaveForTurn = (playerId, categoryId, value) => {
    const initialScores =
      turnAction?.initialScores ??
      { ...players.find((p) => p.id === playerId)?.scores };
    handleSaveScore(playerId, categoryId, value);
    setTurnAction({
      playerId,
      categoryId,
      initialScores,
      deletedCategory: turnAction?.deletedCategory,
    });
  };

  const handleDeleteForTurn = (playerId, categoryId) => {
    const player = players.find((p) => p.id === playerId);
    const initialScores = { ...player?.scores };
    handleModifyScore(playerId, categoryId);
    setTurnAction({ playerId, categoryId, initialScores, deletedCategory: categoryId });
  };

  // Restore to the snapshot taken at the start of this turn action
  const handleCancelTurn = () => {
    if (turnAction) {
      handleRestoreScores(turnAction.playerId, turnAction.initialScores);
    }
    setTurnAction(null);
  };

  const handleConfirmTurn = () => {
    setTurnAction(null);
    if (isViewingTurnPlayer) {
      handleNextTurn();
    } else {
      setActiveTabId(playerWithTurn.id);
    }
  };

  const showConfirmRow = isViewingTurnPlayer || activeTurnCat !== null;
  const confirmDisabled = !activeTurnCat || isPendingReplacement;

  const orderedPlayers = [
    ...players.slice(turnIndex),
    ...players.slice(0, turnIndex),
  ];

  const activeIndex = orderedPlayers.findIndex((p) => p.id === activeTabId);
  const goTo = (dir) => {
    const next = (activeIndex + dir + orderedPlayers.length) % orderedPlayers.length;
    setActiveTabId(orderedPlayers[next].id);
  };

  return (
    <div className={styles.gameArea}>
      <div className={styles.grid}>
        <div className={styles.controlsCol}>
          <JugasGrid
            jugadas={jugadas}
            activePlayer={activePlayer}
            activeTurnCat={activeTurnCat}
            isPendingReplacement={isPendingReplacement}
            handleSaveScore={handleSaveForTurn}
            handleDeleteScore={handleDeleteForTurn}
          />
          <div className={`${styles.confirmRow} ${!showConfirmRow ? styles.confirmRowMobileOnly : ""}`}>
            {configOpen && <div className={styles.configBackdrop} onClick={() => setConfigOpen(false)} />}
            {activeTurnCat && (
              <button className={styles.clearTurnBtn} onClick={handleCancelTurn}>
                Cancelar
              </button>
            )}
            {showConfirmRow && (
              <button
                className={`${styles.confirmTurnBtn} ${confirmDisabled ? styles.confirmTurnBtnDisabled : ""}`}
                onClick={handleConfirmTurn}
                disabled={confirmDisabled}
              >
                {isViewingTurnPlayer ? "Confirmar jugada" : "Guardar cambio"}
              </button>
            )}
            <div className={styles.mobileConfigBar}>
              <button className={styles.mobileConfigBtn} onClick={() => setConfigOpen((v) => !v)}>
                <SettingsIcon size={16} />
              </button>
              {configOpen && (
                <div className={styles.configDropdown}>
                  <button onClick={() => { handleResetGame(); setConfigOpen(false); }} className={styles.actionBtnSecondary}>
                    <RefreshIcon size={16} /> Reiniciar
                  </button>
                  <button onClick={handleAbandonGame} className={styles.actionBtnDanger}>
                    <XCircleIcon size={16} /> Abandonar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.sideCol}>

          {orderedPlayers.map((p) => {
            // Display scores from the initial snapshot while an action is in progress
            const displayScores =
              turnAction?.playerId === p.id ? turnAction.initialScores : p.scores;
            const pMoves = Object.values(displayScores).filter((v) => v != null).length;
            const pTotal = Object.values(displayScores).filter((v) => v > 0).reduce((a, b) => a + b, 0);
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
                  <span className={styles.resultName}>{p.name}</span>
                </div>
                <div className={styles.resultIconWithNav}>
                  <div className={styles.resultNavRow}>
                    <button className={styles.resultNavArrow} onClick={(e) => { e.stopPropagation(); goTo(-1); }}>‹</button>
                    <div
                      className={styles.resultIconRing}
                      style={{ "--progress": Math.round((pMoves / jugadas.length) * 100) }}
                    >
                      <div className={styles.resultIconInner}>
                        <UserIcon size={hasTurn ? 28 : 18} />
                      </div>
                    </div>
                    <button className={styles.resultNavArrow} onClick={(e) => { e.stopPropagation(); goTo(1); }}>›</button>
                  </div>
                  <span className={styles.resultLabel}>
                    Ronda <strong>{pMoves}</strong> / {jugadas.length}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Desktop config card */}
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
                <RefreshIcon size={18} /> Reiniciar partida
              </button>
              <button onClick={handleAbandonGame} className={styles.actionBtnDanger}>
                <XCircleIcon size={18} /> Abandonar juego
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
  isPendingReplacement,
  handleSaveScore,
  handleDeleteScore,
}) {
  const generalaDobleAvailable = activePlayer.scores["generala"] > 0;
  const gridClass = `${styles.jugadasGrid} ${generalaDobleAvailable ? styles.jugadasGridWithDoble : ""}`;

  return (
    <div className={gridClass}>
      {jugadas.map((e) => {
        const isScored = activePlayer.scores[e.id] != null;
        // After a deletion: scored items are locked, unscored ones are free to pick
        // Normal mode: everything else is locked once an action is in progress
        const isDisabled = isPendingReplacement
          ? isScored
          : activeTurnCat !== null && e.id !== activeTurnCat;
        if (e.id === "generala_doble" && !generalaDobleAvailable) return null;

        return (
          <ScoreItem
            key={e.id}
            cat={e}
            scoreValue={activePlayer.scores[e.id]}
            isDisabled={isDisabled}
            onSave={(id, val) => handleSaveScore(activePlayer.id, id, val)}
            onDelete={(id) => handleDeleteScore(activePlayer.id, id)}
          />
        );
      })}
    </div>
  );
}
