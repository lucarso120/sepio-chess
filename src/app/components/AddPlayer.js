'use client';

import { useState } from 'react';
import { db } from '../../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function AddPlayer() {
  const [username, setUsername] = useState('');

  const handleAddPlayer = async () => {
    try {
      if (!username) {
        alert('Please enter a username.');
        return;
      }

      const usernameRegex = /^[a-zA-Z0-9._-]+$/;
      if (!usernameRegex.test(username)) {
        alert(
          'Username can only contain letters, numbers, dots, underscores, and hyphens.'
        );
        return;
      }

      const userDocRef = doc(db, 'players', username);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        alert('Username is already taken.');
        return;
      }

      await setDoc(userDocRef, {
        username,
        elo: 900,
      });

      alert('Player added successfully!');
      setUsername(''); 
    } catch (error) {
      console.error('Error adding player:', error);
      alert(`Failed to add player: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Add Player</h2>
      <input
        type="text"
        placeholder="Player Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ color: 'black' }} 
      />
      <button onClick={handleAddPlayer} style={{ color: 'black' }}>Add Player</button> 
    </div>
  );
}
