import { useState, useEffect } from "react";
import {
  resetPlayersScores,
  checkGameFinished,
  hasRemainingMoves,
  saveScore,
  removeScore,
  sortPlayers,
} from "./functions";

import { loadGame, saveGame, clearGame } from "./state";

export const useGeneralaGame = () => {

  const [players, setPlayers] = useState(() => loadGame()?.players || []);
  const [gameState, setGameState] = useState(() => loadGame()?.gameState || "setup");
  const [turnIndex, setTurnIndex] = useState(() => loadGame()?.turnIndex || 0);
  const [activeTabId, setActiveTabId] = useState(() => loadGame()?.activeTabId || "");

  useEffect(() => {
    saveGame(players, gameState, turnIndex, activeTabId);
  }, [players, gameState, turnIndex, activeTabId]);

  const handleStartGame = () => {
    setGameState("playing");
    setTurnIndex(0);
    setActiveTabId(players[0]?.id || "");
  };

  const handleResetGame = () => {
    if (
      window.confirm(
        "¿Estás seguro de reiniciar los puntos? La partida volverá a empezar con los mismos jugadores.",
      )
    ) {
      const resetPlayers = resetPlayersScores(players);

      setPlayers(resetPlayers);
      setTurnIndex(0);
      setActiveTabId(resetPlayers[0]?.id || "");
      setGameState("playing");
    }
  };

  const handleAbandonGame = () => {
    if (
      window.confirm(
        "¿Estás seguro de abandonar el juego entero? Perderás todos los puntos y jugadores.",
      )
    ) {
      clearGame();
      setGameState("setup");
      setPlayers([]);
      setTurnIndex(0);
      setActiveTabId("");
    }
  };

  const handleSaveScore = (playerId, categoryId, value) => {
    const newPlayers = saveScore(players, playerId, categoryId, value);
    setPlayers(newPlayers);
    if (checkGameFinished(newPlayers)) {
      setGameState("finished");
    }
  };

  const handleNextTurn = () => {
    const total = players.length;
    let next = (turnIndex + 1) % total;
    let skipped = 0;

    while (skipped < total && !hasRemainingMoves(players[next])) {
      next = (next + 1) % total;
      skipped++;
    }

    if (skipped >= total || !hasRemainingMoves(players[next])) {
      setGameState("finished");
      return;
    }

    setTurnIndex(next);
    setActiveTabId(players[next].id);
  };

  const handleModifyScore = (playerId, categoryId) => {
    const newPlayers = removeScore(players, playerId, categoryId);
    setPlayers(newPlayers);
  };

  const handleRestoreScores = (playerId: string, scores: Record<string, number>) => {
    setPlayers((prev) => prev.map((p) => (p.id === playerId ? { ...p, scores } : p)));
  };

  const sortedPlayers = sortPlayers(players);

  return {
    players,
    setPlayers,
    gameState,
    turnIndex,
    activeTabId,
    setActiveTabId,
    sortedPlayers,
    handleStartGame,
    handleResetGame,
    handleAbandonGame,
    handleSaveScore,
    handleModifyScore,
    handleRestoreScores,
    handleNextTurn,
  };
};