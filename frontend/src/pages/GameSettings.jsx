import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function GameSettings() {
  const gameId = Cookies.get("gameId");
  const navigate = useNavigate();

  const handleDeleteGame = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/games/${gameId}/delete/`, {
        withCredentials: true
      });

      Cookies.remove("gameId");
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 px-4 py-10">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-xl font-bold mb-4">⚙️ Paramètres de la Partie</h1>
        <p className="text-sm text-gray-600 mb-6">Attention, cette action est définitive.</p>
        <button className="btn btn-error" onClick={handleDeleteGame}>
          ❌ Supprimer la Partie
        </button>
      </div>
    </div>
  );
}

export default GameSettings;