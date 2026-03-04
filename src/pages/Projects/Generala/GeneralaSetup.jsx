import React, { useState } from 'react';
import styles from './Generala.module.css';
import { Card, Button } from '@/components';

export const GeneralaSetup = ({ players, setPlayers, onStart }) => {
    const [playerNameInput, setPlayerNameInput] = useState('');

    const handleAddPlayer = (e) => {
        e.preventDefault();
        if (playerNameInput.trim()) {
            setPlayers([...players, { id: Date.now().toString(), name: playerNameInput.trim(), scores: {} }]);
            setPlayerNameInput('');
        }
    };

    const handleRemovePlayer = (id) => {
        setPlayers(players.filter(p => p.id !== id));
    };

    const handleStartGame = () => {
        if (players.length >= 2) {
            onStart();
        } else {
            alert('Mínimo 2 jugadores para iniciar.');
        }
    };

    return (
        <Card className={styles.setupCard}>
            <h3>Configuración de la Partida</h3>
            <form onSubmit={handleAddPlayer} className={styles.addPlayerForm}>
                <input
                    type="text"
                    value={playerNameInput}
                    onChange={(e) => setPlayerNameInput(e.target.value)}
                    placeholder="Nombre del jugador"
                    className={styles.input}
                />
                <Button type="submit" variant="primary">Añadir</Button>
            </form>

            <ul className={styles.playerList}>
                {players.map((p, index) => (
                    <li key={p.id} className={styles.playerItem}>
                        <span className={styles.playerItemName}>
                            Jugador {index + 1}: <strong>{p.name}</strong>
                        </span>
                        <button onClick={() => handleRemovePlayer(p.id)} className={styles.removeBtn}>✕</button>
                    </li>
                ))}
            </ul>

            {players.length < 2 && (
                <p className={styles.warningText}>Añade al menos {2 - players.length} jugador(es) más para comenzar.</p>
            )}

            <Button
                variant="primary"
                className={styles.startBtn}
                onClick={handleStartGame}
                disabled={players.length < 2}
            >
                Comenzar Partida
            </Button>
        </Card>
    );
};
