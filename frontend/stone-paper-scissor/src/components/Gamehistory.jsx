import React, { useEffect, useState } from 'react';
import './Gamehistory.css';

const Gamehistory = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchGameHistory = async () => {
            try {
                const response = await fetch('http://localhost:3001/game-history');
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching game history:', error);
            }
        };

        fetchGameHistory();
    }, []);

    return (
        <div className="history-container">
            <h2 className="history-title">Game History</h2>
            {results.length > 0 ? (
                results.map((game, index) => (
                    <div key={index} className="game-result">
                        <h3>{game.player1} vs {game.player2}</h3>
                        <p>{game.player1}: {game.score1}</p>
                        <p>{game.player2}: {game.score2}</p>
                        <h3>{game.finalWinner} is the winner!</h3>
                    </div>
                ))
            ) : (
                <h2>No game history available.</h2>
            )}
        </div>
    );
};

export default Gamehistory;
