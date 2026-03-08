import styles from "./Generala.module.css";
import { Page, Card, Button, UserIcon } from "@/components";
import { GeneralaSetup } from "./GeneralaSetup";
import { GeneralaGame } from "./GeneralaGame";
import { useGeneralaGame } from "./util/hook";
export const Generala = () => {
  const {
    players,
    setPlayers,
    gameState,
    turnIndex,
    activeTabId,
    setActiveTabId,
    activeTotal,
    playedMoves,
    sortedPlayers,
    handleStartGame,
    handleResetGame,
    handleAbandonGame,
    handleSaveScore,
    handleModifyScore,
    calculateTotal,
  } = useGeneralaGame();

  return (
    <Page>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Anotador de <span className={styles.accent}>Generala</span>
          </h1>
          <p className={styles.subtitle}>
            Lleva los puntos de tus partidas con tus amigos de forma ágil y
            rápida.
          </p>
        </div>

        {gameState === "setup" && (
          <GeneralaSetup
            players={players}
            setPlayers={setPlayers}
            onStart={handleStartGame}
          />
        )}

        {gameState === "playing" && (
          <GeneralaGame
            players={players}
            turnIndex={turnIndex}
            activeTabId={activeTabId}
            setActiveTabId={setActiveTabId}
            handleSaveScore={handleSaveScore}
            handleModifyScore={handleModifyScore}
            handleResetGame={handleResetGame}
            handleAbandonGame={handleAbandonGame}
            activeTotal={activeTotal}
            playedMoves={playedMoves}
          />
        )}

        {gameState === "finished" && (
          <Card className={styles.finishedCard}>
            <h2 className={styles.rankingTitle}>¡Partida Terminada!</h2>
            <div className={styles.rankingList}>
              {sortedPlayers.map((player, index) => (
                <div key={player.id} className={styles.rankingRow}>
                  <span className={styles.rankBadge}>{index + 1}</span>
                  <span className={styles.rankName}>
                    <UserIcon size={20} className={styles.iconSpaced} />
                    {player.name}
                  </span>
                  <span className={styles.rankScore}>
                    {calculateTotal(player.scores)} Pts
                  </span>
                </div>
              ))}
            </div>
            <Button
              variant="primary"
              onClick={handleAbandonGame}
              className={styles.startBtn}
            >
              Terminar y Volver
            </Button>
          </Card>
        )}
      </div>
    </Page>
  );
};
