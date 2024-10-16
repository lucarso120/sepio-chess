// app/components/Leaderboard.js
'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const playersRef = collection(db, 'players');
    const q = query(playersRef, orderBy('elo', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const playersList = snapshot.docs.map((doc) => ({
        username: doc.id,
        ...doc.data(),
      }));
      setPlayers(playersList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {players.map((player) => (
          <li key={player.username}>
            {player.username}: {Math.round(player.elo)}
          </li>
        ))}
      </ol>
    </div>
  );
}
