import styles from "./Generala.module.css";
import { Page, Button, UserIcon } from "@/components";
import { GeneralaSetup } from "./GeneralaSetup";
import { GeneralaGame } from "./GeneralaGame";
import { useGeneralaGame } from "./util/hook";
import { General } from "./util/icon";
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
    handleNextTurn,
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
            handleNextTurn={handleNextTurn}
            handleResetGame={handleResetGame}
            handleAbandonGame={handleAbandonGame}
            activeTotal={activeTotal}
            playedMoves={playedMoves}
          />
        )}

        {gameState === "finished" && (
          <div className={styles.finishedArea}>
            <h2 className={styles.leaderboardTitle}>Final de la Partida</h2>

            <div className={styles.leaderboardList}>
              {sortedPlayers.map((player, index) => {
                const rank = index + 1;
                const pTotal = calculateTotal(player.scores);
                const isWinner = rank === 1;
                const rankClass = rank <= 3 ? styles[`leaderboardRow${rank}`] : styles.leaderboardRowRest;
                return (
                  <div
                    key={player.id}
                    className={`${styles.leaderboardRow} ${rankClass}`}
                  >
                    <div className={styles.leaderboardLeft}>
                      <div className={styles.leaderboardAvatarCircle}>
                        <UserIcon size={22} />
                      </div>
                      <div className={styles.leaderboardInfo}>
                        <span className={styles.leaderboardName}>{player.name.charAt(0).toUpperCase() + player.name.slice(1)}</span>
                        <span className={styles.leaderboardScore}>{pTotal} PTS</span>
                      </div>
                    </div>
                    <div className={styles.leaderboardRight}>
                      {isWinner
                        ? <span className={styles.leaderboardIconWinner}><General /></span>
                        : <span className={styles.leaderboardRankBadge}>#{rank}</span>
                      }
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              variant="primary"
              onClick={handleAbandonGame}
              className={styles.startBtn}
            >
              Terminar y Volver
            </Button>
          </div>
        )}
      </div>
    </Page>
  );
};
