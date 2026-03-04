import React, { useState } from 'react';
import styles from './Generala.module.css';
import { Page, Card, Button, UserIcon } from '@/components';
import { GeneralaSetup } from './GeneralaSetup';
import { GeneralaGame, CATEGORIES } from './GeneralaGame';

export const Generala = () => {
    const [players, setPlayers] = useState([]);
    const [gameState, setGameState] = useState('setup');
    const [turnIndex, setTurnIndex] = useState(0);
    const [activeTabId, setActiveTabId] = useState('');

    const handleStartGame = () => {
        setGameState('playing');
        setTurnIndex(0);
        setActiveTabId(players[0].id);
    };

    const handleResetGame = () => {
        if (window.confirm('¿Estás seguro de reiniciar los puntos? La partida volverá a empezar con los mismos jugadores.')) {
            const resetPlayers = players.map(p => ({ ...p, scores: {} }));
            setPlayers(resetPlayers);
            setTurnIndex(0);
            setActiveTabId(players[0].id);
            setGameState('playing');
        }
    };

    const handleAbandonGame = () => {
        if (window.confirm('¿Estás seguro de abandonar el juego entero? Perderás todos los puntos y jugadores.')) {
            setGameState('setup');
            setPlayers([]);
            setTurnIndex(0);
            setActiveTabId('');
        }
    };

    const calculateTotal = (scores) => {
        return Object.values(scores).reduce((acc, val) => acc + (val || 0), 0);
    };

    const handleSaveScore = (playerId, categoryId, value) => {
        const scoreValue = Number(value);
        const newPlayers = [...players];
        const playerIndex = newPlayers.findIndex(p => p.id === playerId);

        newPlayers[playerIndex].scores[categoryId] = scoreValue;
        setPlayers(newPlayers);

        const isGameFinished = newPlayers.every(p => Object.keys(p.scores).length === CATEGORIES.length);

        if (isGameFinished) {
            setGameState('finished');
        } else {
            if (playerId === players[turnIndex].id) {
                const nextTurn = (turnIndex + 1) % newPlayers.length;
                setTurnIndex(nextTurn);
                setActiveTabId(newPlayers[nextTurn].id);
            }
        }
    };

    const handleModifyScore = (playerId, categoryId) => {
        const newPlayers = [...players];
        const playerIndex = newPlayers.findIndex(p => p.id === playerId);

        delete newPlayers[playerIndex].scores[categoryId];
        setPlayers(newPlayers);
    };

    const sortedPlayers = [...players].sort((a, b) => calculateTotal(b.scores) - calculateTotal(a.scores));

    return (
        <Page>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Anotador de <span className={styles.accent}>Generala</span></h1>
                    <p className={styles.subtitle}>Lleva los puntos de tus partidas con tus amigos de forma ágil y rápida.</p>
                </div>

                {gameState === 'setup' && (
                    <GeneralaSetup
                        players={players}
                        setPlayers={setPlayers}
                        onStart={handleStartGame}
                    />
                )}

                {gameState === 'playing' && (
                    <GeneralaGame
                        players={players}
                        turnIndex={turnIndex}
                        activeTabId={activeTabId}
                        setActiveTabId={setActiveTabId}
                        handleSaveScore={handleSaveScore}
                        handleModifyScore={handleModifyScore}
                        handleResetGame={handleResetGame}
                        handleAbandonGame={handleAbandonGame}
                        calculateTotal={calculateTotal}
                    />
                )}

                {gameState === 'finished' && (
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
                                    <span className={styles.rankScore}>{calculateTotal(player.scores)} Pts</span>
                                </div>
                            ))}
                        </div>
                        <Button variant="primary" onClick={handleAbandonGame} className={styles.startBtn}>
                            Terminar y Volver
                        </Button>
                    </Card>
                )}
            </div>
        </Page>
    );
};
