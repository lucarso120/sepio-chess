'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../firebaseConfig';
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';
import styles from './AddGame.module.css'; 

export default function AddGame() {
  const [players, setPlayers] = useState([]);
  const [player1Username, setPlayer1Username] = useState('');
  const [player2Username, setPlayer2Username] = useState('');
  const [winnerUsername, setWinnerUsername] = useState('');
  const [pieceColors, setPieceColors] = useState({ player1: '', player2: '' });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'players'), (snapshot) => {
      const playersData = snapshot.docs.map((doc) => ({
        username: doc.id,
        ...doc.data(),
      }));
      setPlayers(playersData);
    });

    return () => unsubscribe();
  }, []);

  const calculateElo = (winnerElo, loserElo) => {
    const k = 32;
    const expectedWinner = 1 / (1 + 10 ** ((loserElo - winnerElo) / 400));
    const expectedLoser = 1 / (1 + 10 ** ((winnerElo - loserElo) / 400));

    return {
      winnerNewElo: winnerElo + k * (1 - expectedWinner),
      loserNewElo: loserElo + k * (0 - expectedLoser),
    };
  };

  const handleAddGame = async () => {
    if (
      !player1Username ||
      !player2Username ||
      !winnerUsername ||
      !pieceColors.player1 ||
      !pieceColors.player2
    ) {
      alert('Please fill in all fields.');
      return;
    }
    if (player1Username === player2Username) {
      alert('Player 1 and Player 2 cannot be the same.');
      return;
    }

    try {
      const player1Doc = await getDoc(doc(db, 'players', player1Username));
      const player2Doc = await getDoc(doc(db, 'players', player2Username));

      if (!player1Doc.exists() || !player2Doc.exists()) {
        alert('One of the selected players does not exist.');
        return;
      }

      const player1Data = player1Doc.data();
      const player2Data = player2Doc.data();

      const winnerData = winnerUsername === player1Username ? player1Data : player2Data;
      const loserData = winnerUsername === player1Username ? player2Data : player1Data;

      const { winnerNewElo, loserNewElo } = calculateElo(winnerData.elo, loserData.elo);

      await updateDoc(doc(db, 'players', winnerUsername), { elo: winnerNewElo });
      const loserUsername =
        winnerUsername === player1Username ? player2Username : player1Username;
      await updateDoc(doc(db, 'players', loserUsername), { elo: loserNewElo });

      await addDoc(collection(db, 'games'), {
        player1Username,
        player2Username,
        winnerUsername,
        datetime: serverTimestamp(),
        pieceColors,
      });

      alert('Game logged successfully!');
      setPlayer1Username('');
      setPlayer2Username('');
      setWinnerUsername('');
      setPieceColors({ player1: '', player2: '' });
    } catch (error) {
      alert(`Error adding game: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Add Game</h2>
      <div className={styles.formGroup}>
        <label>
          Player 1:
          <select value={player1Username} onChange={(e) => setPlayer1Username(e.target.value)} className={styles.select}>
            <option value="">Select Player 1</option>
            {players.map((player) => (
              <option key={player.username} value={player.username}>
                {player.username}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Player 2:
          <select value={player2Username} onChange={(e) => setPlayer2Username(e.target.value)} className={styles.select}>
            <option value="">Select Player 2</option>
            {players.map((player) => (
              <option key={player.username} value={player.username}>
                {player.username}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Winner:
          <select value={winnerUsername} onChange={(e) => setWinnerUsername(e.target.value)} className={styles.select}>
            <option value="">Select Winner</option>
            {[player1Username, player2Username].map(
              (username) =>
                username && (
                  <option key={username} value={username}>
                    {username}
                  </option>
                )
            )}
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          {player1Username || 'Player 1'}&#39;s Piece Color:
          <select
            value={pieceColors.player1}
            onChange={(e) =>
              setPieceColors((prevColors) => ({
                ...prevColors,
                player1: e.target.value,
              }))
            }
            className={styles.select}
          >
            <option value="">Select Color</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          {player2Username || 'Player 2'}&#39;s Piece Color:
          <select
            value={pieceColors.player2}
            onChange={(e) =>
              setPieceColors((prevColors) => ({
                ...prevColors,
                player2: e.target.value,
              }))
            }
            className={styles.select}
          >
            <option value="">Select Color</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
          </select>
        </label>
      </div>
      <button onClick={handleAddGame} className={styles.button}>Add Game</button>
    </div>
  );
}