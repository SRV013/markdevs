import { jugadas } from "./data";

export const calculateTotal = (scores: Record<string, number>) => {
  return Object.values(scores).reduce((acc, val) => acc + (val || 0), 0);
};

export const resetPlayersScores = (players) => {
  return players.map((p) => ({
    ...p,
    scores: {},
  }));
};

export const checkGameFinished = (players) => {
  return players.every(
    (p) => Object.keys(p.scores).length === jugadas.length
  );
};

export const saveScore = (players, playerId, categoryId, value) => {
  const scoreValue = Number(value);

  const newPlayers = [...players];
  const playerIndex = newPlayers.findIndex((p) => p.id === playerId);

  newPlayers[playerIndex].scores[categoryId] = scoreValue;

  return newPlayers;
};

export const removeScore = (players, playerId, categoryId) => {
  const newPlayers = [...players];
  const playerIndex = newPlayers.findIndex((p) => p.id === playerId);

  delete newPlayers[playerIndex].scores[categoryId];

  return newPlayers;
};

export const sortPlayers = (players) => {
  return [...players].sort(
    (a, b) => calculateTotal(b.scores) - calculateTotal(a.scores)
  );
};