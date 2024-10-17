'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import styles from './Leaderboard.module.css'; 

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
    <div className={styles.container}>
      <h2 className={styles.header}>Leaderboard</h2>
      <ol className={styles.list}>
        {players.map((player) => (
          <li key={player.username} className={styles.listItem}>
            {player.username}: {Math.round(player.elo)}
          </li>
        ))}
      </ol>
    </div>
  );
}