import React from 'react';
import styles from './Generala.module.css';
import { UserIcon, RefreshIcon, XCircleIcon, SettingsIcon } from '@/components';
import { ScoreItem } from './ScoreItem';

export const CATEGORIES = [
    { id: '1', name: '1', options: [0, 1, 2, 3, 4, 5] },
    { id: '2', name: '2', options: [0, 2, 4, 6, 8, 10] },
    { id: '3', name: '3', options: [0, 3, 6, 9, 12, 15] },
    { id: '4', name: '4', options: [0, 4, 8, 12, 16, 20] },
    { id: '5', name: '5', options: [0, 5, 10, 15, 20, 25] },
    { id: '6', name: '6', options: [0, 6, 12, 18, 24, 30] },
    { id: 'escalera', name: 'Escalera', options: [0, 20, 25] },
    { id: 'full', name: 'Full', options: [0, 30, 35] },
    { id: 'poker', name: 'Póker', options: [0, 40, 45] },
    { id: 'generala', name: 'Generala', options: [0, 50] },
    { id: 'generala_doble', name: 'Generala Doble', options: [0, 60, 100] },
];

export const GeneralaGame = ({
    players,
    turnIndex,
    activeTabId,
    setActiveTabId,
    handleSaveScore,
    handleModifyScore,
    handleResetGame,
    handleAbandonGame,
    calculateTotal
}) => {
    const activePlayer = players.find(p => p.id === activeTabId) || players[0];
    const playerWithTurn = players[turnIndex];

    const isViewingOtherPlayer = playerWithTurn && activePlayer ? playerWithTurn.id !== activePlayer.id : false;

    // Split categories
    const leftCategories = CATEGORIES.slice(0, 6);
    const rightCategories = CATEGORIES.slice(6);

    return (
        <div className={styles.gameArea}>
            {/* Mode tabs for players */}
            <div className={styles.tabs}>
                {players.map((p) => (
                    <button
                        key={p.id}
                        className={`${styles.tab} ${activeTabId === p.id ? styles.tabActive : ''}`}
                        onClick={() => setActiveTabId(p.id)}
                    >
                        {p.name}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {/* Column 1: Play Form */}
                <div className={styles.controlsCol}>
                    {isViewingOtherPlayer && (
                        <div className={styles.viewingWarning}>
                            Estás viendo el tablero de {activePlayer.name}.
                            <button onClick={() => setActiveTabId(playerWithTurn.id)} className={styles.returnToTurnBtn}>
                                Volver turnos
                            </button>
                        </div>
                    )}

                    <div className={styles.categoriesGrid}>
                        <div className={styles.categoriesGridCol}>
                            {leftCategories.map(cat => (
                                <ScoreItem
                                    key={cat.id}
                                    cat={cat}
                                    scoreValue={activePlayer.scores[cat.id]}
                                    onSave={(id, val) => handleSaveScore(activePlayer.id, id, val)}
                                    onModify={(id) => handleModifyScore(activePlayer.id, id)}
                                    isViewingOther={isViewingOtherPlayer}
                                />
                            ))}
                        </div>
                        <div className={styles.categoriesGridCol}>
                            {rightCategories.map(cat => (
                                <ScoreItem
                                    key={cat.id}
                                    cat={cat}
                                    scoreValue={activePlayer.scores[cat.id]}
                                    onSave={(id, val) => handleSaveScore(activePlayer.id, id, val)}
                                    onModify={(id) => handleModifyScore(activePlayer.id, id)}
                                    isViewingOther={isViewingOtherPlayer}
                                />
                            ))}
                        </div>
                    </div>
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
                                <span className={styles.activePlayerName}>Turno: {playerWithTurn?.name}</span>
                            </div>
                            <div className={styles.turnPointsBox}>
                                <div className={styles.turnPointsLabel}>Pts</div>
                                <div className={styles.turnPointsData}>{calculateTotal(playerWithTurn?.scores)}</div>
                            </div>
                        </div>

                        {isViewingOtherPlayer && (
                            <div className={styles.activeScoreBox}>
                                <div className={styles.turnPointsLabel}>Pts de {activePlayer.name}</div>
                                <div className={styles.turnPointsData} style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>{calculateTotal(activePlayer.scores)}</div>
                            </div>
                        )}
                    </div>

                    <div className={styles.configCardWrapper}>
                        <div className={styles.configHeader}>
                            <div className={styles.iconWrapperTurn}>
                                <SettingsIcon size={20} />
                            </div>
                            <span className={styles.configTitle}>Opciones de Juego</span>
                        </div>
                        <p className={styles.configSubtitle}>
                            Administra el estado de la partida actual. Desde aquí puedes reiniciar los puntajes o abandonar el juego por completo.
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
