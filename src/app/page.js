// app/page.js
'use client';

import { useState } from 'react';
import Leaderboard from './components/Leaderboard';
import AddGame from './components/AddGame';
import MatchHistory from './components/MatchHistory';
import AddPlayer from './components/AddPlayer';

export default function HomePage() {
  const [view, setView] = useState('leaderboard');

  return (
    <div>
      <h1>Elo Tracker</h1>
      <nav>
        <button onClick={() => setView('leaderboard')}>Leaderboard</button>
        <button onClick={() => setView('addPlayer')}>Add Player</button>
        <button onClick={() => setView('addGame')}>Add Game</button>
        <button onClick={() => setView('history')}>Match History</button>
      </nav>
      {view === 'leaderboard' && <Leaderboard />}
      {view === 'addPlayer' && <AddPlayer />}
      {view === 'addGame' && <AddGame />}
      {view === 'history' && <MatchHistory />}
    </div>
  );
}
