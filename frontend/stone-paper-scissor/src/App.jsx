import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import Gamehistory from './components/Gamehistory';

const App = () => {

  const [gameResults , setGameResults] = useState(null);

  const saveGameResults = (results)=>{
    setGameResults(results);
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Game onSaveResults={saveGameResults}/>} />
          <Route path="/game-history" element={<Gamehistory results={gameResults}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
