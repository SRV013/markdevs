const STORAGE_KEY = "generalaGame";

export const loadGame = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    return JSON.parse(saved);
  } catch {
    return null;
  }
};

export const saveGame = (players, gameState, turnIndex, activeTabId) => {
  const data = {
    players,
    gameState,
    turnIndex,
    activeTabId,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const clearGame = () => {
  localStorage.removeItem(STORAGE_KEY);
};