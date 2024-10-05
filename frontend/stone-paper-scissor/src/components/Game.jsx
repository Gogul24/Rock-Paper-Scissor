import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Game.css';

const Game = ({onSaveResults}) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Submitted, setPlayer1Submitted] = useState("");
  const [player2Submitted, setPlayer2Submitted] = useState("");
  const [winner, setWinner] = useState("");
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");
  const [rounds, setRounds] = useState(0);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const navigate = useNavigate();

  const handlePlayer1Submit = () => {
    setPlayer1Submitted(player1);
    setPlayer1("");
  };

  const handlePlayer2Submit = () => {
    setPlayer2Submitted(player2);
    setPlayer2("");
  };

  const handleResult = () => {
    setRounds((prevRounds) => prevRounds + 1);

    if (player1Choice === player2Choice) {
      setWinner("tie");
    } else if (
      (player1Choice === "rock" && player2Choice === "scissor") ||
      (player1Choice === "scissor" && player2Choice === "paper") ||
      (player1Choice === "paper" && player2Choice === "rock")
    ) {
      setWinner(player1Submitted);
      setScore1((prev) => prev + 1);
    } else {
      setWinner(player2Submitted);
      setScore2((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const handleHistoryRedirect = async () => {
    const results = {
        player1: player1Submitted,
        player2: player2Submitted,
        score1: score1,
        score2: score2,
        winner: score1 > score2 ? player1Submitted : (score1 < score2 ? player2Submitted : "It's a tie!"),
    };

    try {
        await fetch('http://localhost:3001/save-results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(results),
        });
        navigate("/game-history");
    } catch (error) {
        console.error('Error saving results:', error);
    }
};

  const isGameOver = rounds >= 6;

  return (
    <div className="game-container">
      <h2 className="title">Rock Paper Scissor</h2>

      {!player1Submitted && (
        <label htmlFor="player1">
          <input
            className="input-field"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            type="text"
            name="player1"
            id="player1"
            placeholder="Enter name (Player 1)"
          />
          <button className="submit-button" type="button" onClick={handlePlayer1Submit}>
            Submit Player 1
          </button>
        </label>
      )}

      <br />
      <br />

      {!player2Submitted && (
        <label htmlFor="player2">
          <input
            className="input-field"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            type="text"
            name="player2"
            id="player2"
            placeholder="Enter name (Player 2)"
          />
          <button className="submit-button" type="button" onClick={handlePlayer2Submit}>
            Submit Player 2
          </button>
        </label>
      )}

      {player1Submitted && player2Submitted && !isGameOver && (
        <div>
          <div>
            <h3 className="player-title">{player1Submitted} (player1)</h3>
            <button className="choice-button" onClick={() => setPlayer1Choice("rock")}>Rock</button>
            <button className="choice-button" onClick={() => setPlayer1Choice("paper")}>Paper</button>
            <button className="choice-button" onClick={() => setPlayer1Choice("scissor")}>Scissor</button>
          </div>

          <div>
            <h3 className="player-title">{player2Submitted} (player2)</h3>
            <button className="choice-button" onClick={() => setPlayer2Choice("rock")}>Rock</button>
            <button className="choice-button" onClick={() => setPlayer2Choice("paper")}>Paper</button>
            <button className="choice-button" onClick={() => setPlayer2Choice("scissor")}>Scissor</button>
          </div>

          <br />
          <br />
          <br />
          <button className="result-button" onClick={handleResult}>Result</button>

          <div>
            <h3 className="winner-title">Winner</h3>
            <h2>{winner}</h2>
            <p>Round: {rounds}</p>
            <h3>Score</h3>
            <p>{player1Submitted}: {score1}</p>
            <p>{player2Submitted}: {score2}</p>
          </div>
        </div>
      )}

      {isGameOver && (
        <div>
          <h2>Congrats!</h2>
          {score1 === score2 ? (
            <h3>It's a tie!</h3>
          ) : (
            <h3>{score1 > score2 ? player1Submitted : player2Submitted} is the overall winner!</h3>
          )}
          <button className="restart-button" onClick={handleRestart}>Start Over</button>
        </div>
      )}
      <br /><br />
      <button className="history-button" onClick={handleHistoryRedirect}>View Game History</button>
    </div>
  );
};

export default Game;
