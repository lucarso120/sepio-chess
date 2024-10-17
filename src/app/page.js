'use client';

import { useState } from 'react';
import Leaderboard from './components/Leaderboard';
import AddPlayer from './components/AddPlayer';
import AddGame from './components/AddGame';
import MatchHistory from './components/MatchHistory';

export default function HomePage() {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: 'url(https://media.istockphoto.com/id/1202205418/pt/foto/find-the-shortest-path-between-points-a-and-b.jpg?s=1024x1024&w=is&k=20&c=fMnE_XRgMGW74I5pLoUzwBINW89ZeM14JZk53JtcbII=)', // Use the background image URL you find
        backgroundSize: 'cover',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)', // Darken the image
          backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent 50%, rgba(0, 0, 0, 0.5))', // Fade on the corners
        }}
      ></div>
      <h1 className="text-4xl font-bold text-center text-white mb-10 z-10">SEPIO CHESS</h1>
      
      {/* Buttons */}
      <div className="flex flex-col space-y-4 z-10">
        <button
          onClick={() => setActiveModal('leaderboard')}
          className="px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-800"
        >
          leaderboard
        </button>
        <button
          onClick={() => setActiveModal('addPlayer')}
          className="px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-800"
        >
          add player
        </button>
        <button
          onClick={() => setActiveModal('addGame')}
          className="px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-800"
        >
          add game
        </button>
        <button
          onClick={() => setActiveModal('matchHistory')}
          className="px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-800"
        >
          match history
        </button>
      </div>

      {/* Modals */}
      {activeModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black"
            >
              ✕
            </button>

            {activeModal === 'leaderboard' && <Leaderboard />}
            {activeModal === 'addPlayer' && <AddPlayer />}
            {activeModal === 'addGame' && <AddGame />}
            {activeModal === 'matchHistory' && <MatchHistory />}
          </div>
        </div>
      )}
    </div>
  );
}
