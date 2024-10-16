// app/components/MatchHistory.js
'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import styles from './MatchHistory.module.css'; // Import CSS module

export default function MatchHistory() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch games
    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, orderBy('datetime', 'desc'));
    const unsubscribeGames = onSnapshot(q, (snapshot) => {
      const gamesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGames(gamesList);
    });

    return () => {
      unsubscribeGames();
    };
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Match History</h2>
      <ul className={styles.list}>
        {games.map((game) => {
          const datetime = game.datetime
            ? game.datetime.toDate().toLocaleString()
            : '';

          return (
            <li key={game.id} className={styles.listItem}>
              {datetime}: {game.winnerUsername} won against{' '}
              {game.winnerUsername === game.player1Username
                ? game.player2Username
                : game.player1Username}
              .<br />
              {game.player1Username} played as{' '}
              {game.pieceColors?.player1 || 'unknown'},{' '}
              {game.player2Username} played as{' '}
              {game.pieceColors?.player2 || 'unknown'}.
            </li>
          );
        })}
      </ul>
    </div>
  );
}